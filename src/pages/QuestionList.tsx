import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MobileNav } from '@/components/MobileNav';
import { MainHeader } from '@/components/MainHeader';
import { QuestionItem } from '@/components/QuestionItem';
import { QuestionWithAnswer } from '@/types/questionWithAnswer';
import { fetchQuestionsWithAnswers } from '@/services/questionService';

export const QuestionList = (): React.JSX.Element => {
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState<QuestionWithAnswer[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestionsWithAnswers();
      setQuestionsWithAnswers(data);
    };

    loadQuestions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <MainHeader/>

      {/* 모바일 검색창 */}
      <div className="block pc:hidden fixed top-[72px] left-0 right-0 z-10 bg-white p-4 shadow-md">
        <div className="relative">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full p-2 pl-10 border-2 border-[#9CB395] rounded-full text-sm focus:border-[#5C6E56] focus:outline-none"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto mt-[30px] px-4 pb-20 flex-grow">
        <div className="flex flex-col justify-between max-w-[800px] mx-auto mt-[144px]">
          {/* 질문 목록 */}
          {questionsWithAnswers.map(({ question, answer }) => (
            <QuestionItem 
              key={question.questionId} 
              question={question}
              answer={answer} 
            />
          ))}

          {/* 페이지네이션 */}
          <div className="mt-8 flex justify-center">
            <div className="bg-[#C9D8B7] rounded-lg p-1 flex">
              <Link to="#" className="px-2 py-1 mx-1 rounded text-gray-700">
                &lt; 이전 페이지
              </Link>
              <Link to="#" className="px-2 py-1 mx-1 rounded text-gray-700">
                다음 페이지 &gt;
              </Link>
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