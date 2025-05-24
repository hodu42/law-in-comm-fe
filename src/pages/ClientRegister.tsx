import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { registerGeneral } from "@/api/auth/register";
import { checkNicknameDuplication } from "@/api/users";
import { useNavigation } from "@/hooks/useNavigation";
import { ClientData } from "@/types/client";
import { MobileBackButton } from "@/components/MobileBackButton";

export const ClientRegister = (): React.JSX.Element => {
  const { goToLogin } = useNavigation();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [nicknameDuplicateMessage, setNicknameDuplicateMessage] =
    useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  // 아이디 또는 비밀번호가 입력되면 에러 메시지 초기화
  useEffect(() => {
    if (userId || password) {
      setError("");
    }
  }, [userId, password]);
  // 닉네임 입력 시 에러 메시지 초기화
  useEffect(() => {
    if (nickname) {
      setNicknameDuplicateMessage("");
    }
  }, [nickname]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const userData: ClientData = {
        username: userId,
        name: name,
        nickname: nickname,
        password: password,
        birth: birthDate,
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

  const checkNicknameDuplicate = async () => {
    try {
      const response = await checkNicknameDuplication(nickname);
      if (response.data) {
        setNicknameDuplicateMessage(
          `${nickname}은 이미 사용중인 닉네임입니다.`
        );
      } else {
        setNicknameDuplicateMessage(`${nickname}은 사용 가능한 닉네임입니다.`);
      }
    } catch (error: any) {
      if (error.response.data.code === 4000009) {
        const errorMessage = error.response.data.message.split(": ")[1];
        setNicknameDuplicateMessage(errorMessage);
      } else {
        setNicknameDuplicateMessage("알 수 없는 오류가 발생했습니다.");
      }
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
            <div className="absolute left-1/2 -translate-x-1/2 text-[21px] font-bold">
              회원가입
            </div>

            {/* 균형을 위한 빈 공간 */}
            <div className="pc:hidden w-6"></div>
          </div>
          <div className="mr-6 pc:mr-0">
            <div className="flex items-center justify-center">
              <Link
                to="/users/join/lawyer"
                className="text-[14px] pc:text-[16px] text-[#5C6E56] hover:text-[#3F4D3B] transition-colors text-nowrap underline"
              >
                변호사 회원가입
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full flex-grow px-6 items-center pt-[36px]">
        <form
          onSubmit={handleRegister}
          className="flex flex-col w-full pc:max-w-[570px] pc:mx-auto mt-10 pc:mt-16 gap-y-20 px-5 py-[72px] border-b-[1.7px] border-[#B4B4B4]"
        >
          {/* 아이디 입력 필드 */}
          <div className="flex flex-col gap-5 pc:gap-6">
            <label className="text-[#656565] text-[18px] pc:text-[20px] font-bold text-nowrap">
              아이디
            </label>
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="transition-colors border-b-2 pl-[10px] pc:pl-4 placeholder:text-[15px] text-[18px] pc:placeholder:text-[19px] pc:text-[19px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="relative flex flex-col gap-5 pc:gap-6">
            <label className="text-[#656565] text-[18px] pc:text-[20px] font-bold text-nowrap">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="transition-colors border-b-2 pl-[10px] pc:pl-4 placeholder:text-[15px] text-[18px] pc:placeholder:text-[19px] pc:text-[19px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
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
            <label className="text-[#656565] text-[18px] pc:text-[20px] font-bold">
              이름
            </label>
            <input
              type="text"
              placeholder="이름을 입력해주세요."
              className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[19px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* 닉네임 입력 필드 */}
          <div className="flex flex-col gap-5 pc:gap-6">
            <div className="flex items-center gap-6">
              <label className="text-[#656565] text-[18px] pc:text-[20px] font-bold text-nowrap">
                닉네임
              </label>
              <div className="text-[14px] pc:text-[16px] text-[#A9BE8C] text-nowrap">
                2~8자의 한글, 영문 대소문자, 숫자로 이루어져야 합니다.
              </div>
            </div>
            <div className="flex flex-col group">
              <input
                type="text"
                placeholder="닉네임을 입력해주세요."
                className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[19px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            {nicknameDuplicateMessage && (
              <div
                className={`text-sm pl-4 ${
                  nicknameDuplicateMessage.includes("사용 가능한")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {nicknameDuplicateMessage}
              </div>
            )}
            <button
              type="button"
              onClick={() => checkNicknameDuplicate()}
              className="transition-colors inline-block w-[120px] mx-auto mt-6 bg-[#CBD8B7] text-black font-bold text-[16px] py-2 rounded-md hover:bg-[#A9BE8C]"
            >
              중복확인
            </button>
          </div>
          {/* 생년월일 입력 필드 */}
          <div className="flex flex-col gap-5 pc:gap-6">
            <label className="text-[#656565] text-[18px] pc:text-[20px] font-bold text-nowrap">
              생년월일
            </label>
            <input
              type="date"
              ref={dateInputRef}
              className={`transition-colors border-b-2 pl-[10px] pc:pl-4 py-[10px] pc:py-4 text-[15px] pc:text-[19px] border-[#E2E4E5] focus:outline-none focus:border-[#A9BE8C] placeholder-[#A9BE8C] hover:cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                birthDate ? "text-black" : "text-[#E2E4E5]"
              }`}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              onClick={() => dateInputRef.current?.showPicker()}
            />
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
