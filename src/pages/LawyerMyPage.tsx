import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";
import { MobileNav } from "@/components/MobileNav";
import { getLawyerMypageData, getLawyerAnswers } from "@/api/users/lawyer";
import { LawyerInfo } from "@/types/lawyer";
import { AnswerItem } from "@/components/AnswerItem";
import { PageResponse } from "@/types/page";
import { WrittenAnswer } from "@/types/answer";
import { LegalSpecialityLabels } from "@/types/speciality";
import { LegalSpeciality } from "@/types/speciality";
import { getUserProfileImage } from "@/api/users";
import { IMAGE_URL } from "@/config/Config";
import { MobileBackButton } from "@/components/MobileBackButton";

export const LawyerMyPage = (): React.JSX.Element => {
  const [lawyerData, setLawyerData] = useState<LawyerInfo>();
  const [answerList, setAnswerList] = useState<PageResponse<WrittenAnswer>>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const loadLawyerMypageData = async () => {
    const lawyerDataResponse = await getLawyerMypageData();
    const lawyerMypageData = lawyerDataResponse.data;
    const lawyerProfileImage = await getUserProfileImage(lawyerMypageData.id);
    setLawyerData({
      ...lawyerMypageData,
      profileImage: lawyerProfileImage,
    });
  };

  const loadAnswers = async (currentPage: number) => {
    const response = await getLawyerAnswers(currentPage);
    setAnswerList(response.data);
    setTotalElements(response.data.totalElements);
    setTotalPages(response.data.totalPages);
    setIsFirstPage(response.data.first);
    setIsLastPage(response.data.last);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    loadLawyerMypageData();
  }, []);

  useEffect(() => {
    loadAnswers(currentPage);
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
            <div className="absolute left-1/2 -translate-x-1/2 text-[21px] font-bold">
              마이페이지
            </div>
            {/* 균형을 위한 빈 공간 */}
            <div className="pc:hidden w-6"></div>
          </div>
          <div className="mr-6 pc:mr-0">
            <div className="flex items-center gap-x-5">
              <Link
                to="/lawyer/my-page/modify"
                className="text-[14px] pc:text-[16px] hover:underline hover:text-[#9CB395] transition-colors text-nowrap"
              >
                내 정보 수정
              </Link>
              <button
                onClick={useLogout}
                className="text-[14px] pc:text-[16px] hover:underline hover:text-[#9CB395] transition-colors text-nowrap"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-[72px] px-4 pb-20 flex-grow">
        <div className="flex flex-col justify-between max-w-[700px] mx-auto mt-10">
          {/* 프로필 상단 영역 */}
          <div className="flex flex-col items-center w-full">
            {/* 프로필 이미지 + 자기소개 */}
            <div className="w-full relative mb-6">
              {/* 프로필 이미지 존재여부에 따라 이미지 렌더링 */}
              {lawyerData?.profileImage ? (
                <img
                  src={`${IMAGE_URL}${lawyerData.profileImage.path}`}
                  alt={lawyerData.profileImage.name}
                  className="w-full bg-black h-96 object-contain rounded-lg border border-[#E0E0E0]"
                />
              ) : (
                <div className="w-full bg-[#E0E0E0] h-96 object-cover rounded-lg border border-[#272424] flex items-center justify-center">
                  <span className="text-[#555] font-bold text-[25px] pc:text-[30px]">
                    등록된 사진이 없습니다.
                  </span>
                </div>
              )}
              {/* 자기소개 문구 오버레이 */}
              <div className="absolute left-0 bottom-0 w-ful rounded-b-lg p-6 flex flex-col justify-end">
                <div className="text-white text-[1.3rem] pc:text-[1.6rem] font-bold leading-snug">
                  {lawyerData?.description}
                </div>
              </div>
            </div>
            {/* 정보 카드 */}
            <div className="w-full max-w-[700px] bg-white rounded-lg border border-[#E0E0E0] p-7 flex justify-evenly">
              <div className="flex flex-col justify-evenly">
                <div className="flex flex-col gap-2">
                  {/* 이름 */}
                  <div className="text-[22px] font-bold">
                    {lawyerData?.name}
                  </div>
                  {/* 생년월일, 변호사 연락처 */}
                  <div className="flex flex-col gap-1 text-[15px]">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-[#B4B4B4]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 18V17.2C4 16.6333 4.146 16.1127 4.438 15.638C4.73 15.1633 5.11733 14.8007 5.6 14.55C6.63333 14.0333 7.68333 13.646 8.75 13.388C9.81667 13.13 10.9 13.0007 12 13C13.1 12.9993 14.1833 13.1287 15.25 13.388C16.3167 13.6473 17.3667 14.0347 18.4 14.55C18.8833 14.8 19.271 15.1627 19.563 15.638C19.855 16.1133 20.0007 16.634 20 17.2V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-[#555]">{lawyerData?.birth}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-[#B4B4B4]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M16 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V20C6 20.5304 6.21071 21.0391 6.58579 21.4142C6.96086 21.7893 7.46957 22 8 22H16C16.5304 22 17.0391 21.7893 17.4142 21.4142C17.7893 21.0391 18 20.5304 18 20V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2ZM13 21H11V20H13V21ZM16 19H8V5H16V19Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-[#555]">
                        {lawyerData?.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {/* 소속(법률사무소) */}
                  <div className="text-[20px] font-bold text-[#9CB395]">
                    {lawyerData?.officeInfo.officeName}
                  </div>
                  {/* 사무실 주소, 사무실 연락처 */}
                  <div className="flex flex-col gap-1 text-[15px]">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-[#B4B4B4]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-[#555]">
                        {lawyerData?.officeInfo.officeAddress}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-[#B4B4B4]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M16.5569 12.906L16.1019 13.359C16.1019 13.359 15.0189 14.435 12.0639 11.497C9.10886 8.55898 10.1919 7.48298 10.1919 7.48298L10.4779 7.19698C11.1849 6.49498 11.2519 5.36698 10.6349 4.54298L9.37486 2.85998C8.61086 1.83998 7.13586 1.70498 6.26086 2.57498L4.69086 4.13498C4.25786 4.56698 3.96786 5.12498 4.00286 5.74498C4.09286 7.33198 4.81086 10.745 8.81486 14.727C13.0619 18.949 17.0469 19.117 18.6759 18.965C19.1919 18.917 19.6399 18.655 20.0009 18.295L21.4209 16.883C22.3809 15.93 22.1109 14.295 20.8829 13.628L18.9729 12.589C18.1669 12.152 17.1869 12.28 16.5569 12.906Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="text-[#555]">
                        {lawyerData?.officeInfo.officePhoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 분야/경력/학력 */}
              <div className="flex flex-col gap-7 text-[15px] max-w-[50%]">
                <div className="flex flex-col gap-2">
                  <span className="font-bold w-12 inline-block whitespace-nowrap">
                    분야
                  </span>
                  <span className="ml-2 text-[#555] break-words">
                    {lawyerData?.legalSpecialties
                      .map(
                        (code) => LegalSpecialityLabels[code as LegalSpeciality]
                      )
                      .join(", ")}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold w-12 inline-block whitespace-nowrap">
                    경력
                  </span>
                  <span className="ml-2 text-[#555] flex flex-col">
                    {lawyerData?.careers.map((career, idx) => (
                      <span key={idx}>{career}</span>
                    ))}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold w-12 inline-block whitespace-nowrap">
                    학력
                  </span>
                  <span className="ml-2 text-[#555] flex flex-col">
                    {lawyerData?.educations.map((education, idx) => (
                      <span key={idx}>{education}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 pl-4">
            <h1 className="text-[1.4rem] pc:text-[1.8rem] font-bold">
              작성한 답변{" "}
              <span className="text-[#9CB395]">{totalElements}</span>개
            </h1>
          </div>
          {/* 답변 목록 */}
          {answerList?.content.map((answer) => (
            <AnswerItem key={answer.answerId} answer={answer} />
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
      <MobileNav />
    </div>
  );
};
