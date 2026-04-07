import React, { useEffect, useState, useRef } from "react";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { useNavigation } from "@/hooks/useNavigation";
import {
  getClientMypageData,
  updateClientMypageData,
} from "@/api/users/client";
import { MobileBackButton } from "@/components/MobileBackButton";

export const ClientMyPageModify = (): React.JSX.Element => {
  const { goToClientMyPage } = useNavigation();
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  const loadClientMypageData = async () => {
    try {
      const response = await getClientMypageData();
      setName(response.data.name);
      setNickname(response.data.nickname);
      setBirth(response.data.birthDate);
    } catch (error) {
      alert("정보를 불러오는데 실패했습니다.");
      goToClientMyPage();
    }
  };

  useEffect(() => {
    loadClientMypageData();
  }, []);

  const handleModify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateClientMypageData(name, nickname, birth);
      alert("정보가 수정되었습니다.");
      goToClientMyPage();
    } catch (error) {
      alert("정보를 수정하는데 실패했습니다.");
      goToClientMyPage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-white overflow-x-hidden">
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
              내 정보 수정
            </div>

            {/* 균형을 위한 빈 공간 */}
            <div className="pc:hidden w-6"></div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full flex-grow px-6 items-center pt-[36px]">
        <form
          onSubmit={handleModify}
          className="flex flex-col gap-12 w-full pc:max-w-[570px] pc:mx-auto mt-10 pc:mt-16 px-5 py-[72px]"
        >
          <div className="flex flex-col gap-y-10">
            <div className="bg-[#D9D9D9] rounded-md px-4 py-2 text-[16px] pc:text-[18px] font-bold">
              수정할 항목
            </div>
            <div className="flex flex-col px-6 gap-y-14">
              {/* 이름 수정 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
                  이름
                </label>
                <input
                  required
                  type="text"
                  placeholder="수정할 이름을 입력해주세요."
                  className="transition-colors border-b-2 pl-[10px] pc:pl-4 placeholder:text-[15px] text-[15px] pc:placeholder:text-[17px] pc:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* 닉네임 수정 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold">
                  닉네임
                </label>
                <input
                  required
                  type="text"
                  placeholder="수정할 닉네임을 입력해주세요."
                  className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[17px] placeholder:text-[15px] pc:placeholder:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
              {/* 생년월일 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
                  생년월일
                </label>
                <input
                  required
                  type="date"
                  ref={dateInputRef}
                  className={`transition-colors border-b-2 pl-[10px] pc:pl-4 py-[10px] pc:py-4 text-[15px] pc:text-[17px] border-[#E2E4E5] focus:outline-none focus:border-[#A9BE8C] placeholder-[#A9BE8C] hover:cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                    birth ? "text-black" : "text-[#E2E4E5]"
                  }`}
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                  onClick={() => dateInputRef.current?.showPicker()}
                />
              </div>
            </div>
          </div>
          {/* 내 정보 수정 버튼 */}
          <button
            type="submit"
            className="transition-colors inline-block bg-[#CBD8B7] text-black font-bold text-[16px] pc:text-[18px] mb-10 pc:mb-0 py-3 rounded-md hover:bg-[#A9BE8C]"
          >
            수정하기
          </button>
        </form>
      </div>
      {/* 모바일 하단 네비게이션 */}
      <MobileNav />
    </div>
  );
};
