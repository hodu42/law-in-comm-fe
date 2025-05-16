import { LegalSpecialityLabels } from "@/types/speciality";
import { Question } from "@/types/question";
import { formatDate } from "@/utils/dateFormat";
import { useState, useEffect } from "react";
import { PageResponse } from "@/types/page";
import { getReportQuestions } from "@/api/users/admin";
import { ReportMessageComponent } from "@/components/ReportMessageComponent";
import { deleteQuestions } from "@/api/users/admin";

export const ManageQuestions = (): React.JSX.Element => {
  const [threshold, setThreshold] = useState<number>(1);
  const [reportedQuestions, setReportedQuestions] =
    useState<PageResponse<Question>>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(
    new Set()
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isAllSelected =
    reportedQuestions?.content &&
    reportedQuestions.content.length > 0 &&
    reportedQuestions.content.every((question) =>
      selectedQuestions.has(question.questionId)
    );

  const loadReportedQuestions = async () => {
    const response = await getReportQuestions(threshold, currentPage);
    setReportedQuestions(response.data);
    setTotalPages(response.data.totalPages);
    setIsFirstPage(response.data.first);
    setIsLastPage(response.data.last);
  };

  const handleSelectQuestion = (questionId: number) => {
    setSelectedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.has(questionId)
        ? newSet.delete(questionId)
        : newSet.add(questionId);
      return newSet;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const allQuestionIds =
        reportedQuestions?.content.map((question) => question.questionId) || [];
      setSelectedQuestions(new Set(allQuestionIds));
    } else {
      setSelectedQuestions(new Set());
    }
  };

  const deleteSelectedQuestions = async () => {
    try {
      const response = await deleteQuestions(Array.from(selectedQuestions));
      if (response.status === 200) {
        alert(`${response.data.removedCount}개의 질문이 삭제되었습니다.`);
        setShowDeleteModal(false);
        setSelectedQuestions(new Set());
        loadReportedQuestions();
      }
    } catch (error) {
      setErrorMsg("질문 삭제 중 오류가 발생했습니다.");
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    loadReportedQuestions();
  }, [currentPage]);

  return (
    <main className="w-full max-w-[800px] mx-auto mt-[72px] pc:mt-[144px] px-4">
      {/* 신고 횟수 필터 영역 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadReportedQuestions();
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
              !reportedQuestions?.content ||
              reportedQuestions.content.length === 0
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
          disabled={selectedQuestions.size === 0}
          className="bg-red-500 hover:bg-red-700 text-white text-[1rem] font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          선택 삭제 ({selectedQuestions.size})
        </button>
      </div>
      {/* 질문 영역 */}
      {reportedQuestions?.content &&
        reportedQuestions.content.map((question) => (
          <article
            key={question.questionId}
            className={`bg-white my-4 rounded-[10px] shadow-sm transition-colors ${
              selectedQuestions.has(question.questionId) ? "bg-green-50" : ""
            }`}
          >
            <div className="flex items-start p-4">
              {/* 개별 질문 선택 체크박스 */}
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 flex-shrink-0" // mt-1은 제목과의 수직 정렬을 위함
                checked={selectedQuestions.has(question.questionId)}
                onChange={() => handleSelectQuestion(question.questionId)}
              />
              <div className="flex flex-grow flex-col p-8">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[18px] pc:text-[16px] text-[#848484]">
                      {LegalSpecialityLabels[question.legalSpeciality]}
                    </span>
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
            {question.reportCount > 0 && (
              <ReportMessageComponent questionId={question.questionId} />
            )}
          </article>
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
              선택된 {selectedQuestions.size}개의 질문을 삭제하시겠습니까?
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
                onClick={deleteSelectedQuestions}
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
