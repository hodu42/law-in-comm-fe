import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Question } from "@/types/question";
import { Answer } from "@/types/answer";
import { PageResponse } from "@/types/page";
import { TargetItemInfo } from "@/types/targetItemInfo";
import { LegalSpecialityLabels } from "@/types/speciality";
import { getQuestion, reportQuestion, deleteQuestion } from "@/api/questions";
import {
  getAnswers,
  reportAnswer,
  deleteAnswer,
  createAnswer,
  updateAnswer,
} from "@/api/answers";
import { useNavigation } from "@/hooks/useNavigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { IMAGE_URL } from "@/config/Config";
import { formatDate } from "@/utils/dateFormat";
import { AI_ASSISTANT_ID } from "@/config/Config";
import ReactMarkdown from "react-markdown";
import { createChatRequest } from "@/api/chat";
import { chatWidgetActions } from "@/store/chatWidget";

const ANSWER_DEFAULT_SIZE = 5;

export const QuestionDetailPage = (): React.JSX.Element => {
  const navigate = useNavigation();
  const { questionId } = useParams();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<PageResponse<Answer>>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [targetItem, setTargetItem] = useState<TargetItemInfo>({
    type: null,
    id: null,
  });
  const [answerContent, setAnswerContent] = useState("");
  const [editingAnswerId, setEditingAnswerId] = useState<number>(-1);
  const [editedAnswer, setEditedAnswer] = useState("");
  const userRole = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [questionId]);

  useEffect(() => {
    fetchAnswers();
  }, [currentPage]);

  const fetchQuestion = async () => {
    const response = await getQuestion(String(questionId));
    setQuestion(response.data);
  };

  const fetchAnswers = async () => {
    const response = await getAnswers(
      String(questionId),
      String(currentPage),
      String(ANSWER_DEFAULT_SIZE)
    );
    setAnswers(response.data);
    setTotalPages(response.data.totalPages);
    setIsFirstPage(response.data.first);
    setIsLastPage(response.data.last);
  };

  const openReportModal = (reportingItem: TargetItemInfo) => {
    setShowReportModal(true);
    setReportReason("");
    setErrorMsg("");
    setTargetItem(reportingItem);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setTargetItem({ type: null, id: null });
  };

  const openDeleteModal = (deletingItem: TargetItemInfo) => {
    setShowDeleteModal(true);
    setErrorMsg("");
    setTargetItem(deletingItem);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTargetItem({ type: null, id: null });
  };

  const handleQuestionReportSubmit = async () => {
    try {
      await reportQuestion(Number(targetItem.id), reportReason);
      fetchQuestion(); // 질문 다시 불러오기
      alert("신고 처리가 완료되었습니다.");
      setShowReportModal(false);
      setTargetItem({ type: null, id: null });
    } catch (error: any) {
      if (error.response.data.code === 4290703) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("신고 처리 중 오류가 발생했습니다.");
      }
    }
  };

  const handleQuestionDelete = async () => {
    try {
      await deleteQuestion(String(targetItem.id));
      alert("삭제가 완료되었습니다.");
      setShowDeleteModal(false);
      setTargetItem({ type: null, id: null });
      navigate.goToQuestionList(); // 질문 목록으로 페이지 이동
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    }
  };

  const handleAnswerDelete = async () => {
    try {
      await deleteAnswer(String(targetItem.id));
      fetchAnswers(); // 답변 다시 불러오기
      alert("삭제가 완료되었습니다.");
      setShowDeleteModal(false);
      setTargetItem({ type: null, id: null });
    } catch (error: any) {
      setErrorMsg(error.reponse.data.message);
    }
  };

  const handleAnswerReportSubmit = async () => {
    try {
      await reportAnswer(Number(targetItem.id), reportReason);
      fetchAnswers(); // 답변 다시 불러오기
      alert("신고 처리가 완료되었습니다.");
      setShowReportModal(false);
      setTargetItem({ type: null, id: null });
    } catch (error: any) {
      if (error.response.data.code === 4290703) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("신고 처리 중 오류가 발생했습니다.");
      }
    }
  };

  const handleReportSubmit = async () => {
    if (targetItem.type === "question") {
      handleQuestionReportSubmit();
    } else {
      handleAnswerReportSubmit();
    }
  };

  const handleDelete = async () => {
    if (targetItem.type === "question") {
      handleQuestionDelete();
    } else {
      handleAnswerDelete();
    }
  };

  const handleAnswerSubmit = async () => {
    try {
      await createAnswer(String(questionId), answerContent);
      window.location.reload();
    } catch (error: any) {
      setErrorMsg(error.reponse.data.message);
    }
  };

  const setEditInfo = (answerId: number, content: string) => {
    setEditingAnswerId(answerId);
    setEditedAnswer(content);
  };

  const cancelEdit = () => {
    setEditInfo(-1, "");
  };

  const handleAnswerEdit = async () => {
    try {
      await updateAnswer(editingAnswerId, editedAnswer);
      setEditInfo(-1, "");
      fetchAnswers();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChatRequest = async (otherUserId: number) => {
    try {
      const response = await createChatRequest(otherUserId); // 채팅방 생성 테스트 필요
      dispatch(chatWidgetActions.setChatroomId(response.data.chatRoomId)); // 선택된 채팅방 id 상태 설정
      dispatch(chatWidgetActions.openChat());
    } catch (error: any) {
      console.log(error);
      if (
        error.response.status === 409 &&
        error.response.data.code === 4090800
      ) {
        // 채팅방이 이미 존재하는 경우
      }
    }
  };

  return (
    <>
      {/* 메인 콘텐츠 */}
      <main className="w-full px-4 max-w-[800px] mx-auto mt-[72px] pc:mt-[144px]">
        {/* 질문 영역 */}
        {question && (
          <article className="bg-white my-10 rounded-[10px] shadow-sm">
            <div className="flex flex-col p-8">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[18px] pc:text-[16px] text-[#848484]">
                    {LegalSpecialityLabels[question.legalSpeciality]}
                  </span>
                  {question.author && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate.goToQuestionModify(String(questionId))
                        }
                        className="mr-2"
                      >
                        <svg
                          className="w-6 h-6 text-[#9CB395]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          openDeleteModal({
                            type: "question",
                            id: question.questionId,
                          })
                        }
                      >
                        <svg
                          className="w-7 h-7 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-[21px] pc:text-[27px] font-bold mr-2">
                  {question.title}
                </h2>
                <div className="flex flex-col pl-3">
                  {question.authorName && (
                    <div className="flex text-[12px] pc:text-[14px]">
                      <span className="font-bold text-[#5C6E56] mr-2">
                        작성자
                      </span>
                      <h1 className="font-bold text-[#555]">
                        {question.authorName}
                      </h1>
                    </div>
                  )}
                  <div className="flex text-[14px] pc:text-[16px] text-[#999]">
                    <span className="mr-6">최초 사건 발생일</span>
                    <p>{question.firstOccurrenceDate}</p>
                  </div>
                </div>
                <p className="text-[#656565] text-[15px] pc:text-[17px] whitespace-pre-line">
                  {question.content}
                </p>
              </div>
              <div className="flex mt-5 text-[14px] pc:text-[16px] text-[#B4B4B4] justify-end">
                <span className="mr-3">
                  {question.updatedAt
                    ? formatDate(question.updatedAt)
                    : formatDate(question.createdAt)}
                </span>
                <span className="mr-3">조회수 {question.viewCount}</span>
                <div className="flex items-center gap-2">
                  <span>신고 {question.reportCount}</span>
                  <button
                    onClick={() =>
                      openReportModal({
                        type: "question",
                        id: question.questionId,
                      })
                    }
                  >
                    <svg
                      className="w-[14px] h-[14px] pc:w-[18px] pc:h-[18px] text-[#EF4242] hover:text-[#D63030] transition-colors flex-shrink-0"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        stroke="currentColor"
                        d="M12 12.167H4V7.5a4 4 0 0 1 8 0v4.667Z"
                      />
                      <path
                        stroke="currentColor"
                        d="M2.667 14.5h10.666m-12-9.666 1 .333m2-3.333.334 1m-1.333 1-1-1"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* 답변 영역 */}
        <div>
          <h3 className="pl-5 py-10 text-[26px] pc:text-[28px] font-bold border-t-[1px] border-[#CFCFCF]">
            답변{" "}
            <span className="text-[#9CB395]">
              {answers?.totalElements || 0}
            </span>
            개
          </h3>
          {/* 답변이 있을 때만 렌더링*/}
          {answers &&
            answers.content.length > 0 &&
            answers.content.map((answer) => (
              <div
                key={answer.answerId}
                className="flex flex-col gap-4 bg-white p-8 rounded-[10px] shadow-sm border-2 border-[#9CB395] mb-20"
              >
                <div className="flex items-center gap-6 mb-4 px-4">
                  {/* 프로필 사진 존재 할 시 프로필 사진 출력, 없을 시 기본 프로필 아이콘 출력 */}
                  <div className="rounded-full flex w-16 h-16 pc:w-20 pc:h-20 overflow-hidden flex-shrink-0">
                    {answer.profileImage ? (
                      <img
                        src={`${IMAGE_URL}${answer.profileImage.path}`}
                        alt={answer.profileImage.name}
                        className="rounded-full object-cover border-2 border-[#9CB395]"
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
                  <div className="flex flex-col w-full gap-1 justify-center">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[19px] pc:text-[21px] font-bold">
                        {answer.authorId === AI_ASSISTANT_ID
                          ? `${answer.authorName}`
                          : `${answer.authorName} 변호사`}
                      </h4>
                      {answer.author && (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() =>
                              setEditInfo(answer.answerId, answer.content)
                            }
                            className="mr-2"
                          >
                            <svg
                              className="w-6 h-6 text-[#9CB395]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              openDeleteModal({
                                type: "answer",
                                id: answer.answerId,
                              })
                            }
                          >
                            <svg
                              className="w-7 h-7 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="text-[14px] pc:text-[16px] text-gray-500">
                      {answer.updatedAt
                        ? formatDate(answer.updatedAt)
                        : formatDate(answer.createdAt)}
                    </p>
                  </div>
                </div>
                {/*답변 수정 id와 답변의 id가 일치하면*/}
                {answer.answerId === editingAnswerId ? (
                  <textarea
                    id="content"
                    rows={4}
                    placeholder="내용을 입력하세요."
                    className="w-full px-4 py-3 text-[18px] border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#9CB395]"
                    value={editedAnswer || ""}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                  ></textarea>
                ) : (
                  <div className="text-[15px] pc:text-[17px] text-[#555]">
                    <ReactMarkdown
                      components={{
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            className="text-[#9CB395] hover:text-[#8AA082] underline"
                          >
                            {children}
                          </a>
                        ),
                        ul: ({ children }) => (
                          <ul className="my-2">{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li className="my-6">{children}</li>
                        ),
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold my-4">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-bold my-3">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-bold my-2">{children}</h3>
                        ),
                        ol: ({ children }) => (
                          <ol className="my-2 list-decimal">{children}</ol>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-gray-300 my-4">
                            {children}
                          </blockquote>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                        p: ({ children }) => (
                          <span className="my-2">{children}</span>
                        ),
                      }}
                    >
                      {answer.content}
                    </ReactMarkdown>
                  </div>
                )}
                {/*답변 수정 id와 답변의 id의 일치 여부에 따른 조건부 렌더링*/}
                {answer.answerId === editingAnswerId && (
                  <div className="flex justify-end gap-2 mt-3 mb-9">
                    <button
                      className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-[#e5e7eb] rounded"
                      onClick={cancelEdit}
                    >
                      취소
                    </button>
                    <button
                      className="px-4 py-2 bg-[#9CB395] text-white rounded hover:bg-[#8AA082]"
                      onClick={handleAnswerEdit}
                    >
                      수정
                    </button>
                  </div>
                )}
                <div className="flex text-[14px] pc:text-[16px] text-[#B4B4B4] justify-end items-center gap-2">
                  <div className="flex mr-3 gap-2">
                    <span>신고 {answer.reportCount}</span>
                    <button
                      onClick={() =>
                        openReportModal({ type: "answer", id: answer.answerId })
                      }
                    >
                      <svg
                        className="w-[14px] h-[14px] pc:w-[18px] pc:h-[18px] text-[#EF4242] hover:text-[#D63030] transition-colors flex-shrink-0"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="currentColor"
                          stroke="currentColor"
                          d="M12 12.167H4V7.5a4 4 0 0 1 8 0v4.667Z"
                        />
                        <path
                          stroke="currentColor"
                          d="M2.667 14.5h10.666m-12-9.666 1 .333m2-3.333.334 1m-1.333 1-1-1"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* AI 답변이 아니고 해당 질문의 작성자 일때 */}
                  {answer.authorId !== AI_ASSISTANT_ID && question?.author && (
                    <button
                      onClick={() => handleChatRequest(answer.authorId)}
                      className="flex items-center gap-2 bg-[#9CB395] hover:bg-[#8AA082] transition-colors p-2 rounded-[10px] text-white"
                    >
                      <svg
                        className="w-6 h-6 pc:w-6 pc:h-6"
                        fill="none"
                        viewBox="0 0 50 50"
                      >
                        <path
                          fill="currentColor"
                          d="M25 6.25c11.459 0 20.834 7.458 20.834 16.667 0 9.208-9.375 16.666-20.834 16.666-2.583 0-5.062-.375-7.354-1.041C11.563 43.75 4.167 43.75 4.167 43.75c4.854-4.854 5.625-8.125 5.73-9.375-3.543-2.98-5.73-7.02-5.73-11.458C4.167 13.708 13.542 6.25 25 6.25Z"
                        />
                      </svg>
                      <span className="text-[14px] pc:text-[16px]">
                        채팅 신청
                      </span>
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
        {/* 페이지네이션 */}
        <div className="mb-32 pc:mb-10 flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={isFirstPage}
              className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lt;
            </button>
            {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    pageNum === currentPage
                      ? "bg-[#C9D8B7] text-gray-700"
                      : "text-gray-700 hover:bg-[#C9D8B7]"
                  }`}
                >
                  {pageNum + 1}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
              }
              disabled={isLastPage}
              className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &gt;
            </button>
          </div>
        </div>
        {userRole === "ROLE_LAWYER" && (
          <form
            onSubmit={handleAnswerSubmit}
            className="flex flex-col max-w-3xl mx-auto mt-9 justify-end border-t-[1px] py-10 border-[#CFCFCF]"
          >
            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-[22px] font-medium mb-5 px-4"
              >
                답변 내용
              </label>
              <textarea
                id="content"
                rows={8}
                placeholder="답변을 입력하세요."
                className="w-full px-4 py-3 text-[18px] border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#9CB395]"
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#9CB395] hover:bg-[#8AA082] text-white text-[14px] pc:text-[16px] p-3 rounded-lg m-4"
            >
              답변 작성
            </button>
          </form>
        )}
      </main>

      {/* 신고 모달 */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">신고 사유를 작성해주세요</h2>
            <textarea
              className="w-full h-32 border-2 rounded-[10px] p-2 mb-4 resize-none focus:outline-none focus:border-[#9CB395]"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="신고 사유를 입력하세요"
            />
            <div className="text-red-500 text-sm">{errorMsg}</div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors "
                onClick={closeReportModal}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={handleReportSubmit}
              >
                신고하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">정말로 삭제하시겠습니까?</h2>
            <div className="text-red-500 text-sm">{errorMsg}</div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={closeDeleteModal}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
