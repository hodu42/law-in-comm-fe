import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { QuestionItem } from "@/components/QuestionItem";
import { PageResponse } from "@/types/page";
import { QuestionWithAnswerList } from "@/types/questionWithAnswer";
import { fetchClientQuestionsWithAnswers } from "@/services/questionService";
import { useLogout } from "@/hooks/useLogout";
import { ClientMypageData } from "@/types/client";
import { getClientMypageData } from "@/api/users/client";
import { MobileNav } from "@/components/MobileNav";
import { MobileBackButton } from "@/components/MobileBackButton";

export const ClientMyPage = (): React.JSX.Element => {
  const [totalElements, setTotalElements] = useState<number>(0);
  const [questionList, setQuestionList] =
    useState<PageResponse<QuestionWithAnswerList>>();
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [clientMypageData, setClientMypageData] = useState<ClientMypageData>();
  const handleLogout = useLogout();

  const loadQuestions = async (currentPage: number) => {
    const response = await fetchClientQuestionsWithAnswers(currentPage);
    setQuestionList(response);
    setTotalElements(response.totalElements);
    setTotalPages(response.totalPages);
    setIsFirstPage(response.first);
    setIsLastPage(response.last);
  };

  const loadClientMypageData = async () => {
    const response = await getClientMypageData();
    setClientMypageData(response.data);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    loadClientMypageData();
  }, []);

  useEffect(() => {
    loadQuestions(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 헤더 영역 */}
      <header className="fixed top-0 left-0 right-0 w-full h-[72px] flex items-center justify-center bg-white z-20 shadow-sm">
        <div className="relative w-full min-w-[355px] max-w-[1350px] pc:w-[70.31%] h-full flex items-center">
          {/* 모바일 뒤로가기 버튼 */}
          <MobileBackButton />
          {/* 데스크탑 로고 */}
          <Logo />
          <div className="flex items-center justify-between w-full">
            {/* 타이틀 */}
            <div className="absolute left-1/2 -translate-x-1/2 text-[19px] pc:text-[21px] font-bold">
              마이페이지
            </div>

            {/* 균형을 위한 빈 공간 */}
            <div className="pc:hidden w-6"></div>
          </div>
          <div className="mr-6 pc:mr-0">
            <div className="flex items-center gap-x-5">
              <button
                onClick={handleLogout}
                className="text-[14px] pc:text-[16px] hover:underline hover:text-[#9CB395] transition-colors text-nowrap"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-[72px] px-4 pb-20 flex-grow">
        <div className="flex flex-col justify-between max-w-[800px] mx-auto">
          <div>
            <div className="my-5 pl-4">
              <h1 className="text-[1.3rem] pc:text-[1.6rem] font-bold">
                내 정보
              </h1>
            </div>
            <div className="w-full pc:w-[40%] bg-white border-2 border-[#C9D8B7] rounded-lg p-4 mx-auto">
              <div className="flex flex-col gap-4 px-2 pc:px-6 my-4">
                <div className="flex items-center justify-between pc:justify-evenly">
                  <div className="w-16 text-[14px] text-[#5C6E56] pc:text-[17px] font-bold">
                    이름
                  </div>
                  <div className="text-[14px] pc:text-[17px] ml-2 pc:ml-5 break-all">
                    {clientMypageData?.name}
                  </div>
                </div>
                <div className="flex items-center justify-between pc:justify-evenly">
                  <div className="w-16 text-[14px] text-[#5C6E56] pc:text-[17px] font-bold">
                    닉네임
                  </div>
                  <div className="text-[14px] pc:text-[17px] ml-2 pc:ml-5 break-all">
                    {clientMypageData?.nickname}
                  </div>
                </div>
                <div className="flex items-center justify-between pc:justify-evenly">
                  <div className="w-16 text-[14px] text-[#5C6E56] pc:text-[17px] font-bold">
                    생년월일
                  </div>
                  <div className="text-[14px] pc:text-[17px] ml-2 pc:ml-5 break-all">
                    {clientMypageData?.birthDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            to="/client/my-page/modify"
            className="w-28 text-center mx-auto bg-[#CBD8B7] text-black font-bold text-[14px] pc:text-[18px] py-2 mt-5 rounded-md hover:bg-[#A9BE8C] transition-colors"
          >
            내 정보 수정
          </Link>
          <div className="my-5 pl-4">
            <h1 className="text-[1.3rem] pc:text-[1.6rem] font-bold">
              작성한 상담글{" "}
              <span className="text-[#9CB395]">{totalElements}</span>개
            </h1>
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
                className="px-3 py-1 rounded text-sm pc:text-base text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &lt;
              </button>
              {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded text-sm pc:text-base ${
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
                className="px-3 py-1 rounded text-sm pc:text-base text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};
