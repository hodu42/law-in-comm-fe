import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
  useCallback,
} from "react";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { BackIcon } from "./icons/BackIcon";
import { Message, ChatRoom } from "@/types/chat";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { chatWidgetActions } from "@/store/chatWidget";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { WEBSOCKET_URL } from "@/config/Config";
import { getChatRooms } from "@/api/chat";
import { IMAGE_URL } from "@/config/Config";
import { getPreviousChatMessages } from "@/api/chat";
import { formatChatDate as formatChatTime } from "@/utils/dateFormat";

const ChatWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.chatWidget);
  const userRole = useAppSelector((state) => state.user.role);
  const username = useAppSelector((state) => state.user.username);
  const { selectedChatroomId } = useAppSelector((state) => state.chatWidget);
  const clientRef = useRef<Client | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isLoadingPrevMsg, setIsLoadingPrevMsg] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false); // 이전 메시지 로딩 중 상태
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true); // 더 불러올 메시지가 있는지 여부
  const [currentPage, setCurrentPage] = useState<number>(0); // 현재 메시지 페이지 (또는 마지막 메시지 ID/시간 등)

  const messageAreaRef = useRef<HTMLDivElement | null>(null); // 메시지 목록 컨테이너 div의 ref
  const prevScrollHeightRef = useRef<number | null>(null); // 스크롤 위치 유지를 위한 이전 scrollHeight 저장
  const activeChatRoom = React.useMemo(() => {
    if (!selectedChatroomId || !chatRooms || chatRooms.length === 0) {
      return null;
    }
    return chatRooms.find((room) => room.chatRoomId === selectedChatroomId);
  }, [selectedChatroomId, chatRooms]);

  const [messages, setMessages] = useState<Message[]>([]); // 선택된 방의 메시지
  const [newMessage, setNewMessage] = useState<string>(""); // 현재 입력된 메시지
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChat = () => {
    if (isOpen) {
      // 닫힐 때
      dispatch(chatWidgetActions.closeChat());
    } else {
      // 열릴 때
      dispatch(chatWidgetActions.openChat());
    }
  };

  const handleGoBackToRoomList = () => {
    dispatch(chatWidgetActions.clearChatroomId());
    clientRef.current?.unsubscribe(`/sub/chat/${selectedChatroomId}`); // 기존 채팅방 구독 해제
    setMessages([]); // 이전 방 메시지 초기화
    setCurrentPage(0); // 페이지 번호 초기화
    setHasMoreMessages(true); // 더 불러올 메시지가 있다고 가정
    setIsLoadingMore(false); // 로딩 상태 초기화
    prevScrollHeightRef.current = null; // 이전 스크롤 높이 초기화
    setIsLoadingPrevMsg(false); // 이전 메시지 로딩상태 초기화
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    if (clientRef.current && clientRef.current.active) {
      event.preventDefault();
      if (newMessage.trim() === "" || !selectedChatroomId) return;
      const messageToSend = {
        content: newMessage,
      };
      clientRef.current.publish({
        destination: `/pub/chat/${selectedChatroomId}`,
        body: JSON.stringify(messageToSend),
      });
      setNewMessage("");
    }
  };

  const getChatRoomList = async () => {
    const response = await getChatRooms();
    console.log("채팅방 목록 response : ", response);
    setChatRooms(response.data);
  };

  // 무한 스크롤
  const loadMorePreviousMessages = useCallback(async () => {
    if (isLoadingMore || !hasMoreMessages || selectedChatroomId === null)
      return;

    setIsLoadingMore(true);
    // 이전 scrollHeight 저장 (새 데이터 로드 후 스크롤 위치 조정을 위해)
    if (messageAreaRef.current) {
      prevScrollHeightRef.current = messageAreaRef.current.scrollHeight;
    }

    try {
      const nextPageToLoad = currentPage + 1; // 페이지 기반 페이징 예시
      console.log(
        `[무한스크롤] 이전 메시지 로드 시도 - Room ID: ${selectedChatroomId}, Page: ${nextPageToLoad}`
      );

      // getPreviousChatMessages는 (roomId, page, pageSize 등) 인자를 받을 수 있도록 수정 필요
      const response = await getPreviousChatMessages(
        selectedChatroomId,
        nextPageToLoad
      );
      const olderMessages = response.data?.content || []; // API 응답 구조에 맞게 content 배열 추출

      if (olderMessages.length > 0) {
        // API 응답이 최신순이라면 뒤집어서 오래된 것이 배열의 0번 인덱스가 되도록 함
        // 만약 API가 이미 오래된 순으로 보내준다면 .reverse() 불필요
        const newMessages = olderMessages.slice().reverse();

        setMessages((prevMessages) => [...newMessages, ...prevMessages]); // 새 메시지를 기존 메시지 배열의 맨 앞에 추가
        setCurrentPage(nextPageToLoad);
      } else {
        setHasMoreMessages(false); // 더 이상 불러올 메시지가 없음
        console.log("[무한스크롤] 더 이상 이전 메시지가 없습니다.");
      }
    } catch (error) {
      console.error("[무한스크롤] 이전 메시지 로드 실패:", error);
      // 필요시 에러 처리 UI
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    selectedChatroomId,
    currentPage,
    isLoadingMore,
    hasMoreMessages,
    getPreviousChatMessages,
    setMessages,
  ]); // 의존성 배열

  // STOMP 연결 부분
  useEffect(() => {
    const handleStompConnect = () => {
      // 로그인 했을 시 STOMP 연결 시작
      const token = {
        accessToken: localStorage.getItem("accessToken") || "",
        tokenType: localStorage.getItem("tokenType") || "",
        tokenHeader: localStorage.getItem("tokenHeader") || "",
      };
      const client = new Client({
        webSocketFactory: () => new SockJS(WEBSOCKET_URL),
        reconnectDelay: 5000,
        connectHeaders: {
          [token.tokenHeader]: `${token.tokenType}${token.accessToken}`,
        },
        onConnect: () => {
          client.subscribe(`/sub/chatRoomList/${username}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log("채팅방 목록 receivedMessage : ", receivedMessage);
            setChatRooms(receivedMessage);
          });
        },
        onStompError: (frame) => {
          console.error("STOMP ERROR: ", frame.headers.message);
        },
      });
      clientRef.current = client;
      client.activate();

      return () => {
        // cleanUp 함수를 리턴
        (async () => {
          if (clientRef.current && clientRef.current.active) {
            console.log("STOMP 연결 해제 중...");
            await clientRef.current.deactivate(); // 비동기 함수지만, cleanup은 Promise를 반환하면 안 됨
            console.log("STOMP 연결 해제 완료.");
          }
        })();
      };
    };
    if (userRole) {
      handleStompConnect();
      getChatRoomList();
    }
  }, [userRole, username]);

  useEffect(() => {
    if (isOpen && selectedChatroomId && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, selectedChatroomId]);

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      if (selectedChatroomId === null) return;
      setIsLoadingPrevMsg(true); // 이전 메시지 로딩
      const response = await getPreviousChatMessages(selectedChatroomId);
      console.log(
        `${selectedChatroomId}번 채팅방의 이전 메시지 response : `,
        response.data
      );
      setMessages(response.data.content.slice().reverse());
      setIsLoadingPrevMsg(false); // 이전 메시지 로딩 끝
    };
    const subscribeChatRoom = () => {
      clientRef.current?.subscribe(
        `/sub/chat/${selectedChatroomId}`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("채팅방 구독 후 receivedMessage : ", receivedMessage);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      );
    };
    if (
      selectedChatroomId !== null &&
      clientRef.current &&
      clientRef.current.active
    ) {
      fetchPreviousMessages();
      subscribeChatRoom();
    }
  }, [selectedChatroomId]);

  useEffect(() => {
    const area = messageAreaRef.current;
    if (!area) return;

    const handleScroll = () => {
      // 스크롤이 맨 위에 도달했는지 확인 (약간의 오차범위 허용)
      if (area.scrollTop < 50 && !isLoadingMore && hasMoreMessages) {
        loadMorePreviousMessages();
      }
    };

    area.addEventListener("scroll", handleScroll);
    return () => {
      area.removeEventListener("scroll", handleScroll);
    };
  }, [isLoadingMore, hasMoreMessages, loadMorePreviousMessages]); // 의존성 배열

  // 이전 메시지 로드 후 스크롤 위치 유지
  useEffect(() => {
    if (
      !isLoadingMore &&
      messageAreaRef.current &&
      prevScrollHeightRef.current !== null
    ) {
      const currentScrollHeight = messageAreaRef.current.scrollHeight;
      // 새로 로드된 메시지의 높이만큼 스크롤을 아래로 이동시켜 현재 보던 위치를 유지
      messageAreaRef.current.scrollTop +=
        currentScrollHeight - prevScrollHeightRef.current;
      prevScrollHeightRef.current = null; // 사용 후 초기화
    }
  }, [isLoadingMore]); // isLoadingMore가 false로 바뀔 때 (로딩 완료 시) 실행

  return (
    <>
      {/* 채팅 토글 버튼 */}
      {!isOpen && userRole && (
        <button
          onClick={toggleChat}
          aria-label="채팅 열기"
          className="fixed bottom-28 pc:bottom-10 right-5 pc:right-10 z-[10000] bg-[#C9D8B7] hover:bg-[#7D9277] text-gray-800 pc:text-black font-semibold py-3 px-5 rounded-full shadow-lg flex items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out hover:scale-105"
        >
          <span role="img" aria-label="chat">
            💬
          </span>
          채팅
        </button>
      )}

      {/* 채팅창 */}
      {isOpen && (
        <div
          className="fixed z-[10000] bg-white border border-gray-200 shadow-2xl flex flex-col overflow-hidden font-sans top-0 left-0 w-full h-screen pc:top-auto pc:left-auto pc:bottom-[90px] pc:right-5 pc:w-[360px] pc:h-[550px] pc:rounded-xl"
          role="log"
          aria-live="polite"
        >
          {/* 헤더 */}
          <div className="bg-slate-100 p-4 border-b border-gray-200 flex justify-between items-center shrink-0">
            {selectedChatroomId && (
              <button
                className="p-2 mr-2 text-[#7D9277] hover:text-[#5E6F5A] transition-colors duration-150 rounded-full"
                onClick={handleGoBackToRoomList}
                aria-label="채팅 목록으로"
              >
                <BackIcon className="w-6 h-6" />
              </button>
            )}
            <span
              className={`font-bold text-gray-800 text-lg ${
                selectedChatroomId ? "flex-grow text-center" : "flex-grow"
              }`}
            >
              {selectedChatroomId
                ? activeChatRoom?.otherMemberName
                : "채팅방 목록"}
            </span>
            {/* 오른쪽 정렬 및 중앙 정렬을 위한 공간 확보. Back 버튼이 없을 경우 공간을 덜 차지하도록 조정 */}
            <div
              className={`${selectedChatroomId} ? "w-10 pc:w-8" : "w-0"}`}
            ></div>
            <button
              className="p-1.5 text-[#7D9277] hover:text-[#5E6F5A] transition-colors duration-150 rounded-full" // 수정된 스타일
              onClick={toggleChat}
              aria-label="채팅 닫기"
            >
              <CloseIcon className="w-7 h-7 text-red-600" />{" "}
            </button>
          </div>

          {/* 선택된 채팅방 ID가 있으면 채팅방 / 없으면 채팅방 목록 */}
          {selectedChatroomId !== null ? (
            <>
              <div
                className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-3"
                ref={messageAreaRef}
              >
                {messages.map((msg) => {
                  if (msg.senderId === "system") {
                    return (
                      <div
                        key={msg.messageId}
                        className="w-full text-center my-2"
                      >
                        {" "}
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
                          {" "}
                          {msg.message}{" "}
                        </span>{" "}
                      </div>
                    );
                  }
                  const isMe = msg.senderId === username;
                  const messageBubble = (
                    <div
                      className={`max-w-[70%] p-3 rounded-lg break-words ${
                        isMe
                          ? "bg-[#C9D8B7] text-gray-800 rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {" "}
                      {msg.message}{" "}
                    </div>
                  );
                  const timestampDisplay = msg.createdAt ? (
                    <div className="text-xs text-gray-500 self-end pb-[2px] px-1 whitespace-nowrap">
                      {" "}
                      {formatChatTime(msg.createdAt)}{" "}
                    </div>
                  ) : null;
                  // 프로필 이미지 JSX (상대방 메시지일 경우에만), 없을시 기본 프로필 아이콘 출력
                  const profileImage = !isMe ? (
                    <div className="w-12 h-12 object-cover rounded-full">
                      {activeChatRoom?.otherMemberProfileImage?.path ? (
                        <img
                          className="w-12 h-12 object-cover rounded-full shrink-0" // 크기 조정 및 shrink-0 추가
                          src={
                            IMAGE_URL +
                            activeChatRoom.otherMemberProfileImage.path
                          }
                          alt={`${activeChatRoom.otherMemberName} profile`}
                        />
                      ) : (
                        <svg
                          className="rounded-full text-[#9CB395]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.22-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      )}
                    </div>
                  ) : null;

                  return (
                    <div
                      key={msg.messageId}
                      className={`flex items-end gap-2 ${
                        isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isMe && profileImage}
                      {isMe && timestampDisplay} {messageBubble}{" "}
                      {!isMe && timestampDisplay}{" "}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
                {isLoadingPrevMsg && (
                  <div className="text-center text-[#7D9277] py-2">
                    이전 대화를 불러오는 중...
                  </div>
                )}
              </div>
              <form
                className="p-3 border-t border-gray-200 bg-white flex items-center gap-2 shrink-0"
                onSubmit={handleSendMessage}
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleInputChange}
                  placeholder="메시지를 입력하세요..."
                  aria-label="메시지 입력"
                  className="flex-grow p-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#7D9277] focus:border-transparent outline-none text-sm"
                />
                <button
                  type="submit"
                  aria-label="메시지 전송"
                  className="bg-[#C9D8B7] hover:bg-[#7D9277] text-gray-800 pc:text-black font-semibold py-2.5 px-5 rounded-full transition-colors duration-200 text-sm"
                >
                  전송
                </button>
              </form>
            </>
          ) : (
            <>
              {chatRooms && chatRooms.length > 0 ? (
                // 채팅방 목록
                <div className="flex-grow p-3 overflow-y-auto bg-slate-50">
                  {chatRooms.map((room) => (
                    <div
                      key={room.chatRoomId}
                      className="flex items-center gap-3 p-4 mb-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm cursor-pointer border border-gray-200 transition-colors duration-150"
                      onClick={() => {
                        dispatch(
                          chatWidgetActions.setChatroomId(room.chatRoomId)
                        );
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        dispatch(
                          chatWidgetActions.setChatroomId(room.chatRoomId)
                        )
                      }
                    >
                      <div className="w-12 h-12 object-cover rounded-full">
                        {room.otherMemberProfileImage?.path ? (
                          <img
                            className="rounded-full"
                            src={IMAGE_URL + room.otherMemberProfileImage.path}
                            alt={room.otherMemberProfileImage.name}
                          />
                        ) : (
                          <svg
                            className="rounded-full text-[#9CB395]"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-700 text-md">
                            {room.otherMemberName}
                          </h3>
                          {room.lastMessageAt && (
                            <div className="text-xs text-gray-500 ml-2">
                              {formatChatTime(room.lastMessageAt)}
                            </div>
                          )}
                        </div>
                        {room.lastMessage && (
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {room.lastMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-grow p-3 overflow-y-auto bg-slate-50">
                  <div className="text-center text-gray-500 py-2">
                    참여한 채팅방이 없습니다.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
