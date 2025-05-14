import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { QuestionItem } from "@/components/QuestionItem";
import { fetchQuestionsWithAnswers } from "@/services/questionService";
import { QuestionWithAnswerList } from "@/types/questionWithAnswer";
import { PageResponse } from "@/types/page";
import { LegalSpecialityLabels } from "@/types/speciality";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export const QuestionListPage = (): React.JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { keyword: currentKeyword } = useAppSelector();
  const { setKeyword } = useAppDispatch();
  const [questionList, setQuestionList] =
    useState<PageResponse<QuestionWithAnswerList>>();
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  // URL 파라미터에서 값 가져오기
  const prevKeyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const currentPage = Number(searchParams.get("page")) || 0;

  const loadQuestions = async () => {
    const response = await fetchQuestionsWithAnswers(
      currentPage,
      category,
      prevKeyword
    );
    setQuestionList(response);
    setTotalPages(response.totalPages);
    setIsFirstPage(response.first);
    setIsLastPage(response.last);
  };

  // URL 파라미터 변경 시 데이터 로드
  useEffect(() => {
    loadQuestions();
  }, [searchParams]);

  // 모바일 검색용
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      keyword: currentKeyword,
      category: category,
      page: "0",
    });
  };
  // 카테고리 변경 시
  const handleCategoryChange = (newCategory: string) => {
    setSearchParams({
      keyword: currentKeyword,
      category: newCategory,
      page: "0",
    });
  };
  // 페이지 변경 시
  const handlePageChange = (newPage: number) => {
    setSearchParams({
      keyword: prevKeyword,
      category: category,
      page: String(newPage),
    });
  };

  return (
    <>
      {/* 모바일 검색창 */}
      <div className="block pc:hidden fixed top-[72px] left-0 right-0 z-10 bg-white p-4 shadow-md">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={currentKeyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="w-full p-2 pl-10 border-2 border-gray-200 rounded-[10px] text-sm focus:border-[#9CB395] focus:outline-none placeholder:text-[#E2E4E5]"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          >
            <svg
              className="w-5 h-5 text-[#9CB395]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto mt-[30px] px-4 pb-20 flex-grow">
        <div className="flex flex-col justify-between max-w-[800px] mx-auto mt-[144px]">
          {/* 분야 필터 */}
          <div className="mb-6">
            <label
              htmlFor="speciality"
              className="block text-[1.5rem] font-bold text-[#9CB395] mb-3 pl-4"
            >
              분야 선택
            </label>
            <div className="relative">
              <select
                id="speciality"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="appearance-none w-full px-4 py-2 border-2 text-[1.1rem] border-[#CFCFCF] rounded-[10px] bg-white focus:outline-none focus:border-[#9CB395] hover:border-[#9CB395] hover:cursor-pointer transition-colors"
              >
                <option value="">전체</option>
                {Object.entries(LegalSpecialityLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg
                  className="h-5 w-5 text-[#555555]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 질문 목록 */}
          {questionList?.content.map(({ question, answers }) => (
            <QuestionItem
              key={question.questionId}
              question={question}
              answers={answers ?? null}
            />
          ))}

          {/* 페이지네이션 */}
          <div className="mt-8 mb-10 pc:mb-0 flex justify-center">
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
        </div>
      </main>

      {/* 플로팅 작성 버튼 (모바일) */}
      <div className="pc:hidden fixed bottom-[100px] right-[20px] z-10">
        <Link
          to="/question/write"
          className="flex items-center justify-center w-[60px] h-[60px] bg-[#9CB395] rounded-full shadow-lg"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};
