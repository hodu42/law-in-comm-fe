import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MobileNav } from '@/components/MobileNav';
import { MainHeader } from '@/components/MainHeader';
import { QuestionItem } from '@/components/QuestionItem';
import { fetchQuestionsWithAnswers } from '@/services/questionService';
import { QuestionWithAnswer } from '@/types/questionWithAnswer';
import { PageResponse } from '@/types/page';
import { LegalSpecialityLabels } from '@/types/speciality';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';

export const QuestionListPage = (): React.JSX.Element => {
  const [questionList, setQuestionList] = useState<PageResponse<QuestionWithAnswer>>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const { category: selectedSpeciality, keyword: searchKeyword } = useAppSelector();
  const { setKeyword, setCategory } = useAppDispatch();
  const [localKeyword, setLocalKeyword] = useState<string>(searchKeyword);

  const loadQuestions = async () => {
    const response = await fetchQuestionsWithAnswers(currentPage, selectedSpeciality, searchKeyword);
    console.log(response);
    setQuestionList(response);
    setTotalPages(response.totalPages);
    setIsFirstPage(response.first);
    setIsLastPage(response.last);
  };

  useEffect(() => {
    loadQuestions();
  }, [currentPage, selectedSpeciality, searchKeyword]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0); // 검색 시 첫 페이지로 이동
    setKeyword(localKeyword);
    loadQuestions();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <MainHeader/>

      {/* 모바일 검색창 */}
      <div className="block pc:hidden fixed top-[72px] left-0 right-0 z-10 bg-white p-4 shadow-md">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={localKeyword}
            onChange={(e) => setLocalKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="w-full p-2 pl-10 border-2 border-[#9CB395] rounded-full text-sm focus:border-[#5C6E56] focus:outline-none"
          />
          <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto mt-[30px] px-4 pb-20 flex-grow">
        <div className="flex flex-col justify-between max-w-[800px] mx-auto mt-[144px]">
          {/* 분야 필터 */}
          <div className="mb-6">
            <label htmlFor="speciality" className="block text-sm font-medium text-[#555555] mb-2">
              법률 분야
            </label>
            <div className="relative">
              <select
                id="speciality"
                value={selectedSpeciality}
                onChange={(e) => setCategory(e.target.value)}
                className="appearance-none w-full px-4 py-2 border-2 border-[#CFCFCF] rounded-[10px] bg-white focus:outline-none focus:border-[#9CB395]"
              >
                <option value="">전체</option>
                {Object.entries(LegalSpecialityLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg className="h-5 w-5 text-[#555555]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* 질문 목록 */}
          {questionList?.content.map(({ question, answer }) => (
            <QuestionItem 
              key={question.questionId} 
              question={question}
              answer={answer ?? null}
            />
          ))}

          {/* 페이지네이션 */}
          <div className="mt-8 mb-10 pc:mb-0 flex justify-center">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={isFirstPage}
                className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    page === currentPage 
                      ? 'bg-[#C9D8B7] text-gray-700' 
                      : 'text-gray-700 hover:bg-[#C9D8B7]'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={isLastPage}
                className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 플로팅 작성 버튼 (모바일) */}
      <div className="pc:hidden fixed bottom-[100px] right-[20px] z-10">
        <Link to="/question/write" className="flex items-center justify-center w-[60px] h-[60px] bg-[#9CB395] rounded-full shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <MobileNav />
    </div>
  );
}; 