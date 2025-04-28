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
  report: number;
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
      views: 0,
      report: 0
    },
    {
      id: 2,
      category: '탐방',
      title: '동료에게 폭행당한 경우의 법적 대응 방법',
      content: '1. 상담자님도 때린 적이 있다면 쌍방폭행이 성립할 가능성이 높습니다.\n2. 상담자님이 기억하는 그대로 경찰에 이야기한 것이라면 무고죄로 처벌되지는 않으니 안심하셔도 됩니다. ...',
      lawyer: '김영희 변호사',
      date: '2025-02-27',
      views: 0,
      report: 0
    },
    {
      id: 3,
      category: '분야',
      title: '제목',
      content: '',
      lawyer: '',
      date: '2025-02-27',
      views: 0,
      report: 0
    },
    {
      id: 4,
      category: '분야',
      title: '제목',
      content: '',
      lawyer: '',
      date: '2025-02-27',
      views: 0,
      report: 0
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 */}
      <MainHeader/>

      {/* 모바일 검색창 */}
      <div className="block pc:hidden fixed top-[72px] left-0 right-0 z-10 bg-white p-4">
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

      {/* 탭 메뉴
      <div className="fixed top-[72px] pc:top-[72px] left-0 right-0 bg-white z-10 border-b border-[#CFCFCF] pc:hidden">
        <div className="container mx-auto">
          <div className="flex pc:border-b pc:border-[#CFCFCF]">
            <Link to="/question/list" className="py-4 px-6 border-b-2 border-black text-black font-medium">
              질문 목록
            </Link>
            <Link to="/question/write" className="py-4 px-6 text-gray-500 font-medium">
              질문 작성
            </Link>
          </div>
        </div>
      </div> */}

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto pc:mt-[30px] px-4 pb-20 flex-grow">
        <div className="flex flex-col justify-between max-w-[800px] mx-auto mt-[144px]">
          {/* 질문 목록 */}
          {questions.map((question) => (
            <div key={question.id} className="flex flex-col justify-between gap-[15px] bg-white rounded-[10px] shadow-sm mb-10 pc:p-[30px]">
              <div className="flex items-center text-sm px-2">
                <span className="mr-4 text-[1.18rem] text-[#848484]">{question.category}</span>
                <span className="ml-auto text-[1rem] text-[#999999]">{question.date}</span>
              </div>
              
              <h3 className="text-[16px] pc:text-[1.31rem]">{question.title}</h3>
              
              {question.lawyer && (
                <div className="text-[14px] pc:text-[1.06rem] text-[#555555]">
                  <span className="mr-[15px] text-[#5C6E56] font-bold">답변</span> {question.lawyer}
                </div>
              )}
              
              {question.content && (
                <p className="text-[14px] pc:text-[1rem] text-[#848484] line-clamp-2">
                  {question.content}
                </p>
              )}
              
              <div className="flex justify-end items-center text-xs text-[#B4B4B4]">
                <span className="text-[1rem] mr-2">조회수 {question.views}</span>
                <div className="flex justify-between items-center">
                  <span className="text-[1rem] mr-[6px]">
                    신고 {question.report}
                  </span>
                  <svg width="16" height="17" fill="none">
                    <path fill="#EF4242" stroke="#EF4242" d="M12 12.167H4V7.5a4 4 0 0 1 8 0v4.667Z"/>
                    <path stroke="#EF4242" d="M2.667 14.5h10.666m-12-9.666 1 .333m2-3.333.334 1m-1.333 1-1-1"/>
                  </svg>
                </div>
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