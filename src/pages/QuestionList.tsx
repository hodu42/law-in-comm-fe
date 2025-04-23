import React from 'react';
import { Link } from 'react-router-dom';
import { MobileNav } from '@/components/MobileNav';
import { MainHeader } from '@/components/MainHeader';

interface Question {
  id: number;
  category: string;
  title: string;
  content: string;
  lawyer: string;
  date: string;
  views: number;
}

export const QuestionList = (): React.JSX.Element => {
  // 임시 데이터
  const questions: Question[] = [
    {
      id: 1,
      category: '탐방',
      title: '동료에게 폭행당한 경우의 법적 대응 방법',
      content: '1. 상담자님도 때린 적이 있다면 쌍방폭행이 성립할 가능성이 높습니다.\n2. 상담자님이 기억하는 그대로 경찰에 이야기한 것이라면 무고죄로 처벌되지는 않으니 안심하셔도 됩니다. ...',
      lawyer: '김영희 변호사',
      date: '2025-02-27',
      views: 0
    },
    {
      id: 2,
      category: '탐방',
      title: '동료에게 폭행당한 경우의 법적 대응 방법',
      content: '1. 상담자님도 때린 적이 있다면 쌍방폭행이 성립할 가능성이 높습니다.\n2. 상담자님이 기억하는 그대로 경찰에 이야기한 것이라면 무고죄로 처벌되지는 않으니 안심하셔도 됩니다. ...',
      lawyer: '김영희 변호사',
      date: '2025-02-27',
      views: 0
    },
    {
      id: 3,
      category: '분야',
      title: '제목',
      content: '',
      lawyer: '',
      date: '2025-02-27',
      views: 0
    },
    {
      id: 4,
      category: '분야',
      title: '제목',
      content: '',
      lawyer: '',
      date: '2025-02-27',
      views: 0
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <MainHeader/>

      {/* 모바일 검색창 */}
      <div className="mobile:hidden fixed top-[72px] left-0 right-0 z-10 bg-white p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full p-2 pl-10 border border-gray-300 rounded-full text-sm"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="fixed top-[72px] mobile:top-[72px] left-0 right-0 bg-white z-10 border-b border-[#CFCFCF] mobile:hidden">
        <div className="container mx-auto">
          <div className="flex mobile:border-b mobile:border-[#CFCFCF]">
            <Link to="/question/list" className="py-4 px-6 border-b-2 border-black text-black font-medium">
              질문 목록
            </Link>
            <Link to="/question/write" className="py-4 px-6 text-gray-500 font-medium">
              질문 작성
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto pt-[140px] mobile:pt-[90px] px-4 pb-20 flex-grow">
        <div className="max-w-[800px] mx-auto">
          {/* PC 전용 메뉴 */}
          <div className="hidden mobile:flex mb-6 border-b border-[#CFCFCF]">
            <Link to="/question/list" className="py-4 px-6 border-b-2 border-black text-black font-medium">
              질문 목록
            </Link>
            <Link to="/question/write" className="py-4 px-6 text-gray-500 font-medium">
              질문 작성
            </Link>
          </div>

          {/* 질문 목록 */}
          {questions.map((question) => (
            <div key={question.id} className="bg-white rounded-lg shadow-sm mb-4 p-4 mobile:p-6">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="mr-4">{question.category}</span>
                <span className="ml-auto">{question.date}</span>
              </div>
              
              <h3 className="text-[16px] mobile:text-[20px] font-bold mb-2">{question.title}</h3>
              
              {question.lawyer && (
                <div className="text-[14px] mobile:text-[16px] text-gray-700 mb-2">
                  담당: {question.lawyer}
                </div>
              )}
              
              {question.content && (
                <p className="text-[14px] mobile:text-[16px] text-gray-600 mb-3 line-clamp-2">
                  {question.content}
                </p>
              )}
              
              <div className="flex justify-end items-center text-xs text-gray-500">
                <span className="flex items-center mr-2">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  신고 0
                </span>
                <span>조회수 n</span>
              </div>
            </div>
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
      <div className="mobile:hidden fixed bottom-[100px] right-[20px] z-10">
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