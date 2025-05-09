import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { registerGeneral } from "@/api/auth/register";
import { useNavigation } from "@/hooks/useNavigation";
import { ClientData } from "@/types/client";
import { LegalSpecialityLabels } from "@/types/speciality";

export const LawyerRegister = (): React.JSX.Element => {
  const { goToMain, goToPreviousPage, goToLogin } = useNavigation();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [licenseImage, setLicenseImage] = useState<File | string>("");
  const [error, setError] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  // 아이디 또는 비밀번호가 입력되면 에러 메시지 초기화
  useEffect(() => {
    if (userId || password) {
      setError("");
    }
  }, [userId, password]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!licenseImage) {
      setError("증명서 이미지를 첨부해주세요.");
      return;
    }

    try {
      const userData: ClientData = {
        username: userId,
        name: name,
        nickname: nickname,
        password: password,
        birthDate: birthDate,
      };
      await registerGeneral(userData);
      alert("회원가입이 완료되었습니다.");
      goToLogin();
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("잘못된 아이디/비밀번호입니다.");
      } else {
        setError("회원가입 중 오류가 발생했습니다");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLicenseImage(e.target.files[0]);
    } else {
      setLicenseImage("");
    }
  };

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }

    return;
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-white overflow-x-hidden">
      {/* 헤더 영역 */}
      <header className="fixed top-0 left-0 right-0 w-full h-[72px] flex items-center justify-center bg-white z-20 shadow-sm">
        <div className="relative w-full min-w-[355px] max-w-[1350px] pc:w-[70.31%] h-full flex items-center">
          {/* 모바일 뒤로가기 버튼 */}
          <button
            onClick={() => goToPreviousPage()}
            className="pc:hidden flex items-center text-black z-10 ml-6"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          {/* 데스크탑 로고 */}
          <Link
            to="/main"
            className="hidden pc:flex items-center absolute left-4 z-10"
          >
            <div className="text-[#A9BE8C] font-bold text-2xl flex items-center">
              <Logo />
              <span className="ml-5 text-[#9CB395] text-[36px]">로인컴</span>
            </div>
          </Link>

          <div className="flex items-center justify-between w-full">
            {/* 타이틀 */}
            <div className="absolute left-1/2 -translate-x-1/2 text-[21px] font-bold">
              변호사 회원가입
            </div>

            {/* 균형을 위한 빈 공간 */}
            <div className="pc:hidden w-6"></div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full flex-grow px-6 items-center pt-[36px]">
        <form
          onSubmit={handleRegister}
          className="flex flex-col w-full pc:max-w-[570px] pc:mx-auto mt-10 pc:mt-16 px-5 py-[72px] border-b-[1.7px] border-[#B4B4B4]"
        >
          <div className="flex flex-col gap-y-10">
            <div className="bg-[#D9D9D9] rounded-md px-4 py-2 text-[18px] font-bold">
              계정 정보
            </div>
            <div className="flex flex-col px-6 gap-y-20">
              {/* 아이디 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
                  아이디
                </label>
                <input
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  className="transition-colors border-b-2 pl-[10px] pc:pl-4 placeholder:text-[15px] text-[15px] pc:placeholder:text-[17px] pc:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>

              {/* 비밀번호 입력 필드 */}
              <div className="relative flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
                  비밀번호
                </label>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  className="transition-colors border-b-2 pl-[10px] pc:pl-4 placeholder:text-[15px] text-[15px] pc:placeholder:text-[17px] pc:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* 에러 메시지 표시 */}
                {error && (
                  <div className="absolute text-red-500 text-sm bottom-[-1.8rem]">
                    {error}
                  </div>
                )}
              </div>
              {/* 이름 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold">
                  이름
                </label>
                <input
                  type="text"
                  placeholder="이름을 입력해주세요."
                  className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[17px] placeholder:text-[15px] pc:placeholder:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* 닉네임 입력 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
                  휴대폰 번호
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center px-3 text-[#E2E4E5] group-focus-within:text-[#A9BE8C] transition-colors">
                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="currentColor"
                      className="absolute"
                    >
                      <path
                        fill="currentColor"
                        d="M21.951 24.66h-12.5V7.16h12.5m0-5h-12.5a2.491 2.491 0 0 0-2.5 2.5v22.5a2.5 2.5 0 0 0 2.5 2.5h12.5a2.5 2.5 0 0 0 2.5-2.5V4.66a2.5 2.5 0 0 0-2.5-2.5Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="휴대폰 번호를 입력해주세요."
                    className="transition-colors border-b-2 w-full pl-10 pc:pl-16 text-[15px] pc:text-[17px] placeholder:text-[15px] pc:placeholder:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
              </div>
              {/* 증명서 첨부 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
                  합격 증명서 첨부
                </label>
                <div className="w-full h-[200px] border-2 border-dashed border-[#E2E4E5] rounded-lg flex items-center justify-center overflow-hidden">
                  {licenseImage ? (
                    <img
                      src={
                        typeof licenseImage === "string"
                          ? licenseImage
                          : URL.createObjectURL(licenseImage)
                      }
                      alt="증명서 미리보기"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-[#B4B4B4] text-[14px] pc:text-[16px]">
                      이미지를 첨부하세요
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="bg-[#CBD8B7] hover:bg-[#A9BE8C] transition-colors mx-auto mt-2 w-[90px] text-black font-bold text-[14px] pc:text-[16px] py-2 rounded-md"
                  onClick={() => fileInputRef.current?.click()}
                >
                  파일 첨부
                </button>
              </div>
              {/* 분야선택 필드 */}
              <div className="flex flex-col gap-5 pc:gap-6">
                <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
                  분야
                </label>
                <div className="grid grid-cols-2 pc:grid-cols-3 gap-x-8 gap-y-4">
                  {Object.entries(LegalSpecialityLabels).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={checkedList.includes(key)}
                        onChange={(e) => checkHandler(e, key)}
                        className="transition-colors w-4 h-4 text-[#A9BE8C] border-[#E2E4E5] rounded focus:ring-[#A9BE8C] focus:ring-offset-0"
                      />
                      <label
                        htmlFor={key}
                        className={`transition-colors text-[14px] pc:text-[16px] cursor-pointer text-nowrap hover:text-[#A9BE8C] ${
                          checkedList.includes(key) ? "text-[#A9BE8C]" : "text-[#656565]"
                        }`}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
                <span className="block text-center text-[#A9BE8C] text-[16px] font-bold pc:text-[18px] mt-5">
                  해당하는 분야들을 모두 체크하세요.
                </span>
              </div>
            </div>
          </div>
          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="transition-colors inline-block bg-[#CBD8B7] text-black font-bold text-[16px] pc:text-[18px] mb-10 pc:mb-0 py-3 rounded-md hover:bg-[#A9BE8C]"
          >
            회원가입
          </button>
        </form>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <MobileNav />
    </div>
  );
};
