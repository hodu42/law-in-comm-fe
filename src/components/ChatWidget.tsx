import React, {
  useState,
  useEffect,
  useRef,
  FormEvent,
  ChangeEvent,
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

const ChatWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.chatWidget);
  const userRole = useAppSelector((state) => state.user.role);
  const username = useAppSelector((state) => state.user.username);
  const { selectedChatroomId } = useAppSelector((state) => state.chatWidget);
  const clientRef = useRef<Client | null>(null);
  const chatRoomList = useState<ChatRoom[]>([]);

  // 실제 애플리케이션에서는 API 호출 등으로 데이터를 가져옵니다.
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      chatRoomId: 1,
      otherMemberName: "김민준",
      lastMessageAt: "네, 확인해 보겠습니다.",
    },
    {
      chatRoomId: 2,
      otherMemberName: "김명태",
      lastMessageAt: "수고하세요",
    },
    {
      chatRoomId: 3,
      otherMemberName: "김태명",
      lastMessageAt: "안녕하세요.",
    },
  ]);

  const testImg =
    "data:image/jpeg;base64,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";

  const [messages, setMessages] = useState<Message[]>([]); // 선택된 방의 메시지
  const [newMessage, setNewMessage] = useState<string>("");
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

  const handleRoomSelect = (roomId: number) => {
    dispatch(chatWidgetActions.setChatroomId(roomId));
    // TODO: 실제로는 여기서 roomId에 해당하는 메시지를 서버에서 가져옵니다.
    // STOMP 구독도 이 시점에서 해당 방 ID로 이루어져야 합니다.
    // 예시: 선택된 방에 따라 다른 테스트 메시지 로드
    if (roomId === 1) {
      setMessages([
        {
          id: 1,
          sender: "system",
          content: "일반 문의방입니다. 무엇을 도와드릴까요?",
        },
        {
          id: 2,
          sender: "other",
          content: "제품 A에 대해 궁금한 점이 있습니다.",
          timestamp: "오후 2:30",
        },
        {
          id: 3,
          sender: "me",
          content: "가격과 주요 기능이 궁금합니다.",
          timestamp: "오후 2:31",
        },
      ]);
    } else if (roomId === 2) {
      setMessages([
        { id: 1, sender: "system", content: "기술 지원팀입니다." },
        {
          id: 2,
          sender: "me",
          content: "로그인이 안돼요ㅠㅠ",
          timestamp: "오전 10:15",
        },
      ]);
    } else {
      setMessages([
        {
          id: "placeholder",
          sender: "system",
          content: `${
            chatRooms.find((r) => r.chatRoomId === roomId)?.otherMemberName ||
            ""
          } 채팅방입니다.`,
        },
      ]);
    }
  };

  const handleGoBackToRoomList = () => {
    dispatch(chatWidgetActions.clearChatroomId());
    setMessages([]); // 메시지 목록 초기화
    // TODO: 이전 STOMP 구독이 있었다면 여기서 해제(unsubscribe)해야 할 수 있습니다.
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage.trim() === "" || !selectedChatroomId) return;

    const messageToSend: Message = {
      id: `msg-${Date.now()}`, // 더 나은 ID 생성 방식 필요
      sender: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, messageToSend]);
    setNewMessage("");
    // TODO: 실제 STOMP client.publish(`/pub/chat/${selectedRoomId}`, {}, JSON.stringify(messageToSend)) 로직
  };

  //TODO:STOMP 연결 관련 진행중
  useEffect(() => {
    const handleStompConnect = () => {
      // 로그인 했을 시 STOMP 연결 시작
      const token = {
        accessToken: localStorage.getItem("accessToken") || "",
        tokenType: localStorage.getItem("tokenType") || "",
        tokenHeader: localStorage.getItem("tokenHeader") || "",
      };
      console.log(token);
      const client = new Client({
        webSocketFactory: () => new SockJS(WEBSOCKET_URL),
        reconnectDelay: 5000,
        connectHeaders: {
          [token.tokenHeader]: `${token.tokenType}${token.accessToken}`,
        },
        onConnect: () => {
          client.subscribe(`/sub/chatRoomList/${username}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log("receivedMessage : ", receivedMessage);
            setChatRooms(receivedMessage);
          });
        },
        onStompError: (frame) => {
          console.error("STOMP ERROR: ", frame.headers.message);
        },
      });
      console.log(client);
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
    const getChatRoomList = async () => {
      const response = await getChatRooms(0, 10);
      console.log("response : ", response);
      setChatRooms(response.data.content);
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

  const currentRoomName =
    chatRooms.find((room) => room.chatRoomId === selectedChatroomId)
      ?.otherMemberName || "채팅";

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
              {selectedChatroomId ? currentRoomName : "채팅방 목록"}
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
              <div className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-3">
                {messages.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} className="w-full text-center my-2">
                        {" "}
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
                          {" "}
                          {msg.content}{" "}
                        </span>{" "}
                      </div>
                    );
                  }
                  const isMe = msg.sender === "me";
                  const messageBubble = (
                    <div
                      className={`max-w-[70%] p-3 rounded-lg break-words ${
                        isMe
                          ? "bg-[#C9D8B7] text-gray-800 rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {" "}
                      {msg.content}{" "}
                    </div>
                  );
                  const timestampDisplay = msg.timestamp ? (
                    <div className="text-xs text-gray-500 self-end pb-[2px] px-1 whitespace-nowrap">
                      {" "}
                      {msg.timestamp}{" "}
                    </div>
                  ) : null;
                  // 프로필 이미지 JSX (상대방 메시지일 경우에만)
                  const profileImage = !isMe ? (
                    <img
                      className="w-12 h-12 object-cover rounded-full shrink-0" // 크기 조정 및 shrink-0 추가
                      src={testImg} // 실제로는 msg.profileImageUrl 등 사용
                      alt={`${msg.sender} profile`}
                    />
                  ) : null;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-x-2 ${
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
            // TODO:채팅방 목록 보여주기 (무한 스크롤로 구현 예정)
            <div className="flex-grow p-3 overflow-y-auto bg-slate-50">
              {chatRooms.map((room) => (
                <div
                  key={room.chatRoomId}
                  className="flex items-center gap-3 p-4 mb-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm cursor-pointer border border-gray-200 transition-colors duration-150"
                  onClick={() => handleRoomSelect(room.chatRoomId)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleRoomSelect(room.chatRoomId)
                  }
                >
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src={IMAGE_URL + room.otherMemberProfileImage?.path}
                  ></img>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-gray-700 text-md">
                      {room.otherMemberName}
                    </h3>
                    {room.lastMessageAt && (
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {room.lastMessageAt}
                      </p>
                    )}
                    {/* 예: {room.unreadCount > 0 && <span className="float-right bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{room.unreadCount}</span>} */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
