import { useState, useEffect } from "react";
import { MainHeader } from "@/components/MainHeader";
import { fetchPendingLawyers } from "@/services/pendingLawyersService";
import { PageResponse } from "@/types/page";
import { PendingLawyers } from "@/types/admin";

export const ManageLawyerRegister = (): React.JSX.Element => {
  const [totalElements, setTotalElements] = useState<number>(0);
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFirstPage, setIsFirstPage] = useState<boolean>(true);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pendingLawyers, setPendingLawyers] =
    useState<PageResponse<PendingLawyers>>();
  const [isOpenedLawyer, setIsOpenedLawyer] = useState<boolean[]>([]);

  const handleImageClick = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  const loadPendingLawyers = async () => {
    const response = await fetchPendingLawyers(currentPage);
    setPendingLawyers(response);
    setTotalElements(response.totalElements);
    setIsFirstPage(response.first);
    setIsLastPage(response.last);
    setTotalPages(response.totalPages);
  };

  useEffect(() => {
    loadPendingLawyers();
  }, [currentPage]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainHeader />
      {/* 메인 콘텐츠 */}
      <main className="container mx-auto mt-[72px] pc:mt-[144px] px-4 pb-20 flex-grow">
        <div className="mt-10 pl-4">
          <h1 className="text-[1.4rem] pc:text-[1.8rem] font-bold">
            대기중인 변호사{" "}
            <span className="text-[#9CB395]">{totalElements}</span>명
          </h1>
        </div>
        <div
          onClick={() => {}}
          className="flex flex-col justify-between max-w-[800px] mx-auto mt-10 cursor-pointer"
        >
          <div className="bg-white rounded-b-[10px]">
            {/* 변호사 정보 */}
            <div className="relative bg-[#D9D9D9] py-2 px-4 rounded-[10px] text-[0.9rem] pc:text-[1.1rem] font-bold">
              <span>변호사 정보</span>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg
                  className="h-5 w-5 text-black"
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
            <div className="flex flex-col gap-4 px-6 my-4">
              {/* 이름 */}
              <div className="flex items-center">
                <div className="w-16 text-[15px] pc:text-[17px] font-bold">
                  이름
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">홍길동</div>
              </div>
              {/* 아이디 */}
              <div className="flex items-center">
                <div className="w-16 text-[15px] pc:text-[17px] font-bold">
                  아이디
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">abcde</div>
              </div>
              {/* 전화번호 */}
              <div className="flex items-center">
                <div className="w-16 text-[15px] pc:text-[17px] font-bold">
                  전화번호
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">
                  010-1234-5678
                </div>
              </div>
              {/* 생년월일 */}
              <div className="flex items-center">
                <div className="w-16 text-[15px] pc:text-[17px] font-bold">
                  생년월일
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">
                  1990-01-01
                </div>
              </div>
              {/* 자기소개 */}
              <div className="flex flex-col gap-3">
                <div className="w-16 text-[15px] pc:text-[17px] font-bold">
                  자기소개
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">
                  안녕하세요. 홍길동입니다. 홍길동입니다. 홍길동입니다.
                  홍길동입니다. 홍길동입니다. 홍길동입니다. 홍길동입니다.
                  홍길동입니다. 홍길동입니다. 홍길동입니다. 홍길동입니다.
                  홍길동입니다. 홍길동입니다. 홍길동입니다. 홍길동입니다.
                  홍길동입니다. 홍길동입니다. 홍길동입니다. 홍길동입니다.
                  홍길동입니다. 홍길동입니다. 홍길동입니다. 홍길동입니다.
                  홍길동입니다. 홍길동입니다. 홍길동입니다. 홍길동입니다.
                  홍길동입니다. 홍길동입니다. 홍길동입니다. 홍길동입니다.
                  홍길동입니다. 홍길동입니다. 홍길동입니다.
                </div>
              </div>
              {/* 변호사 사진 */}
              <div className="flex flex-col items-center">
                <div className="w-full text-[15px] pc:text-[17px] font-bold">
                  변호사 사진 (눌러서 확대)
                </div>
                <div
                  onClick={handleImageClick}
                  className={`w-full ${
                    isImageZoomed ? "max-w-[300px]" : "max-w-[100px]"
                  } my-9`}
                >
                  <img
                    src="https://static.cdn.soomgo.com/upload/portfolio/515c31a1-c1e6-4aca-b6e8-a201e81c9d84.jpg?webp=1"
                    alt="변호사 사진"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              {/* 합격 증명서 */}
              <div className="flex flex-col items-center">
                <div className="w-full text-[15px] pc:text-[17px] font-bold">
                  합격 증명서 (눌러서 확대)
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick();
                  }}
                  className={`w-full ${
                    isImageZoomed ? "max-w-[300px]" : "max-w-[100px]"
                  } my-9`}
                >
                  <img
                    src="https://static.cdn.soomgo.com/upload/portfolio/515c31a1-c1e6-4aca-b6e8-a201e81c9d84.jpg?webp=1"
                    alt="합격 증명서"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              {/* 분야 */}
              <div className="flex flex-col gap-3">
                <div className="w-full text-[15px] pc:text-[17px] font-bold">
                  분야
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">법률 분야</div>
              </div>
              {/* 경력 */}
              <div className="flex flex-col gap-3">
                <div className="w-full text-[15px] pc:text-[17px] font-bold">
                  경력
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">10년</div>
              </div>
              {/* 학력 */}
              <div className="flex flex-col gap-3">
                <div className="w-full text-[15px] pc:text-[17px] font-bold">
                  학력
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">
                  대학교 졸업
                </div>
              </div>
            </div>
            {/* 사무실 정보 */}
            <div className="relative bg-[#D9D9D9] py-2 px-4 rounded-[10px] text-[0.9rem] pc:text-[1.1rem] font-bold">
              <span>사무실 정보</span>
            </div>
            <div className="flex flex-col gap-4 px-6 my-4">
              {/* 사무실 이름 */}
              <div className="flex items-center">
                <div className="w-16 text-[15px] pc:text-[17px] font-bold">
                  이름
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">홍길동</div>
              </div>
              {/* 사무실 주소 */}
              <div className="flex items-center">
                <div className="w-16 text-[15px] pc:text-[17px] font-bold">
                  주소
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">
                  서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층
                </div>
              </div>
              {/* 사무실 전화번호 */}
              <div className="flex items-center">
                <div className="w-16 text-[15px] pc:text-[17px] font-bold">
                  전화번호
                </div>
                <div className="text-[15px] pc:text-[17px] ml-5">
                  010-1234-5678
                </div>
              </div>
            </div>
            <div className="flex w-[70%] justify-center items-center mx-auto my-7 font-bold">
              <button className="bg-[#FF8787] w-full px-4 py-2 rounded-l hover:bg-[#FF6B6B] transition-colors duration-200">
                거절
              </button>
              <button className="bg-[#9CB395] w-full px-4 py-2 rounded-r hover:bg-[#8BA385] transition-colors duration-200">
                승인
              </button>
            </div>
          </div>
        </div>
        {/* 페이지네이션 */}
        <div className="mt-8 mb-10 pc:mb-0 flex justify-center">
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
      </main>
    </div>
  );
};
