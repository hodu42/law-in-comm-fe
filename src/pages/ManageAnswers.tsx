import { formatDate } from "@/utils/dateFormat";
import { useState, useEffect } from "react";
import { PageResponse } from "@/types/page";
import { Link } from "react-router-dom";
import { getReportedAnswers } from "@/api/users/admin";
import { deleteAnswers } from "@/api/users/admin";
import { IMAGE_URL } from "@/config/Config";
import ReactMarkdown from "react-markdown";
import { Answer } from "@/types/answer";
import { AI_ASSISTANT_ID } from "@/config/Config";
import { ReportMessageComponent } from "@/components/ReportMessageComponent";

export const ManageAnswers = (): React.JSX.Element => {
  const [threshold, setThreshold] = useState<number>(1);
  const [reportedAnswers, setReportedAnswers] =
    useState<PageResponse<Answer>>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Set<number>>(
    new Set()
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isAllSelected =
    reportedAnswers?.content &&
    reportedAnswers.content.length > 0 &&
    reportedAnswers.content.every((answer) =>
      selectedAnswers.has(answer.answerId)
    );

  const loadReportedAnswers = async () => {
    const response = await getReportedAnswers(threshold, currentPage);
    setReportedAnswers(response.data);
    setTotalPages(response.data.totalPages);
    setIsFirstPage(response.data.first);
    setIsLastPage(response.data.last);
  };

  const handleSelectAnswer = (answerId: number) => {
    setSelectedAnswers((prev) => {
      const newSet = new Set(prev);
      newSet.has(answerId) ? newSet.delete(answerId) : newSet.add(answerId);
      return newSet;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const allAnswerIds =
        reportedAnswers?.content.map((answer) => answer.answerId) || [];
      setSelectedAnswers(new Set(allAnswerIds));
    } else {
      setSelectedAnswers(new Set());
    }
  };

  const deleteSelectedAnswers = async () => {
    try {
      const response = await deleteAnswers(Array.from(selectedAnswers));
      if (response.isSuccess) {
        alert(`${response.data.removedCount}개의 답변이 삭제되었습니다.`);
        setShowDeleteModal(false);
        setSelectedAnswers(new Set());
        loadReportedAnswers();
      }
    } catch (error) {
      setErrorMsg("답변 삭제 중 오류가 발생했습니다.");
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    loadReportedAnswers();
  }, [currentPage]);

  return (
    <main className="w-full max-w-[800px] mx-auto mt-[72px] pc:mt-[144px] px-4">
      {/* 신고 횟수 필터 영역 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadReportedAnswers();
        }}
        className="flex flex-col gap-2 my-6"
      >
        <label className="block pl-5 text-[1.5rem] font-bold text-[#9CB395]">
          최소 신고 횟수
        </label>
        <div className="flex justify-evenly items-center">
          <div className="flex items-center gap-2">
            <input
              className="w-[100px] h-auto text-[1.3rem] font-bold pb-1 bg-gray-50 border-b-2 border-[#9CB395] outline-none text-center"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={threshold}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "");
                setThreshold(value ? Number(value) : 0);
              }}
              placeholder="ex: 10"
            />
            <span className="text-[1.5rem] font-bold">회 이상</span>
          </div>
          <button className="bg-[#C9D8B7] hover:bg-[#A9BE8C] text-black font-bold px-4 py-2 rounded-[10px] text-nowrap text-[16px] transition-colors">
            조회
          </button>
        </div>
      </form>
      {/* "전체 선택" 체크박스 및 "선택 삭제" 버튼 */}
      <div className="flex items-center justify-between mt-10 mb-4 px-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="selectAll"
            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            checked={isAllSelected || false}
            onChange={handleSelectAll}
            disabled={
              !reportedAnswers?.content || reportedAnswers.content.length === 0
            }
          />
          <label
            htmlFor="selectAll"
            className="ml-2 text-sm font-medium text-gray-700"
          >
            전체 선택 (현재 페이지)
          </label>
        </div>
        <button
          onClick={() => setShowDeleteModal(true)}
          disabled={selectedAnswers.size === 0}
          className="bg-red-500 hover:bg-red-700 text-white text-[1rem] font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          선택 삭제 ({selectedAnswers.size})
        </button>
      </div>
      {/* 답변 영역*/}
      {reportedAnswers?.content &&
        reportedAnswers.content.map((answer) => (
          <div
            key={answer.answerId}
            className={`my-4 rounded-[10px] shadow-sm transition-colors ${
              selectedAnswers.has(answer.answerId) ? "bg-green-50" : "bg-white"
            }`}
          >
            <div className="flex items-start p-4">
              {/* 개별 질문 선택 체크박스 */}
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 flex-shrink-0" // mt-1은 제목과의 수직 정렬을 위함
                checked={selectedAnswers.has(answer.answerId)}
                onChange={() => handleSelectAnswer(answer.answerId)}
              />
              <div className="flex flex-grow flex-col p-8">
                <div className="flex items-center gap-6 mb-4 px-4">
                  {/* 프로필 사진 존재 할 시 프로필 사진 출력, 없을 시 기본 프로필 아이콘 출력 */}
                  <Link
                    className={
                      answer.authorId === AI_ASSISTANT_ID
                        ? "pointer-events-none cursor-not-allowed"
                        : ""
                    }
                    to={
                      answer.authorId === AI_ASSISTANT_ID
                        ? "#"
                        : `/users/lawyer/profile/${answer.authorId}`
                    }
                  >
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
                  </Link>
                  <div className="flex flex-col w-full gap-1 justify-center">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[19px] pc:text-[21px] font-bold">
                        {answer.authorId === AI_ASSISTANT_ID
                          ? `${answer.authorName}`
                          : `${answer.authorName} 변호사`}
                      </h4>
                    </div>
                    <p className="text-[14px] pc:text-[16px] text-gray-500">
                      {answer.updatedAt
                        ? formatDate(answer.updatedAt)
                        : formatDate(answer.createdAt)}
                    </p>
                  </div>
                </div>
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
                        <h1 className="text-2xl font-bold my-4">{children}</h1>
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
                <div className="flex text-[14px] pc:text-[16px] text-[#B4B4B4] justify-end items-center gap-2">
                  <div className="flex mr-3 gap-2">
                    <span>신고 {answer.reportCount}</span>
                    <div>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 신고 사유 영역 */}
            {answer.reportCount > 0 && (
              <ReportMessageComponent answerId={answer.answerId} />
            )}
          </div>
        ))}
      {/* 질문 페이지네이션 */}
      <div className="mt-8 mb-28 pc:mb-10 flex justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            disabled={isFirstPage}
            className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &lt;
          </button>
          {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded ${
                  pageNum === currentPage
                    ? "bg-[#C9D8B7] text-gray-700"
                    : "text-gray-700 hover:bg-[#C9D8B7] transition-colors"
                }`}
              >
                {pageNum + 1}
              </button>
            )
          )}
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={isLastPage}
            className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>
      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              선택된 {selectedAnswers.size}개의 답변을 삭제하시겠습니까?
            </h2>
            <div className="text-red-500 text-sm">{errorMsg}</div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={deleteSelectedAnswers}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
