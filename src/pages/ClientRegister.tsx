import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { registerGeneral } from "@/api/auth/register";
import {
  checkNicknameDuplication,
  checkUsernameDuplication,
} from "@/api/users";
import { useNavigation } from "@/hooks/useNavigation";
import { ClientData } from "@/types/client";
import { MobileBackButton } from "@/components/MobileBackButton";

export const ClientRegister = (): React.JSX.Element => {
  const { goToLogin } = useNavigation();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [nicknameDuplicateMessage, setNicknameDuplicateMessage] =
    useState<string>("");
  const [usernameDuplicateMessage, setUsernameDuplicateMessage] =
    useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordConfirmShow, setIsPasswordConfirmShow] =
    useState<boolean>(false);

  // 아이디 또는 비밀번호가 입력되면 에러 메시지 초기화
  useEffect(() => {
    if (userId || password) {
      setError("");
    }
  }, [userId, password, passwordConfirm]);

  // 닉네임 또는 아이디 입력 시 에러 메시지 초기화
  useEffect(() => {
    setNicknameDuplicateMessage("");
  }, [nickname]);

  useEffect(() => {
    setUsernameDuplicateMessage("");
  }, [userId]);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (password && passwordConfirm !== passwordConfirm) {
      setError("입력한 비밀번호가 서로 일치하지 않습니다.");
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

  const checkNicknameDuplicate = async () => {
    if (nickname.trim() === "") {
      setNicknameDuplicateMessage("닉네임을 입력하세요");
      return;
    }
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

  const checkUsernameDuplicate = async () => {
    if (userId.trim() === "") {
      setUsernameDuplicateMessage("아이디를 입력하세요");
      return;
    }
    try {
      const response = await checkUsernameDuplication(userId);
      if (response.data.isDup) {
        setUsernameDuplicateMessage(`${userId}은 이미 사용중인 아이디입니다.`);
      } else {
        setUsernameDuplicateMessage(`${userId}은 사용 가능한 아이디입니다.`);
      }
    } catch (error: any) {
      if (error.response.data.code === 4000009) {
        const errorMessage = error.response.data.message.split(": ")[1];
        setUsernameDuplicateMessage(errorMessage);
      } else {
        setUsernameDuplicateMessage("알 수 없는 오류가 발생했습니다.");
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
            <div className="absolute left-1/2 -translate-x-1/2 text-[19px] pc:text-[21px] font-bold">
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
      <div className="flex flex-col w-full flex-grow px-6 items-center mt-[72px]">
        <form
          onSubmit={handleRegister}
          className="flex flex-col w-full pc:max-w-[570px] pc:mx-auto mt-10 mb-20 pc:mt-10 pc:mb-10 gap-y-10 px-5"
        >
          {/* 아이디 입력 필드 */}
          <div className="flex flex-col gap-2">
            <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
              아이디 <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="아이디를 입력해주세요."
              className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            {usernameDuplicateMessage && (
              <div
                className={`text-sm pl-4 ${
                  usernameDuplicateMessage.includes("사용 가능한")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {usernameDuplicateMessage}
              </div>
            )}
            <button
              type="button"
              onClick={() => checkUsernameDuplicate()}
              className="transition-colors inline-block mx-auto mt-2 bg-[#CBD8B7] text-black font-bold text-[14px] pc:text-[16px] px-4 py-2 rounded-md hover:bg-[#A9BE8C]"
            >
              중복확인
            </button>
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="relative flex flex-col gap-2">
            <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                required
                type={isPasswordShow ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요."
                className="transition-colors border-b-2 w-full pl-[10px] pc:pl-4 pr-9 text-[15px] pc:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute w-6 h-6 pc:w-7 pc:h-7 top-1/2 -translate-y-1/2 right-0 "
                onClick={(e) => {
                  e.preventDefault();
                  setIsPasswordShow(!isPasswordShow);
                }}
              >
                <svg
                  className="w-full h-full text-[#A9BE8C]"
                  viewBox="0 0 24 24"
                >
                  {isPasswordShow ? (
                    <path
                      fill="currentColor"
                      d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
                    />
                  ) : (
                    <path
                      fill="currentColor"
                      d="M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5Z"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* 비밀번호 확인 입력 필드 */}
          <div className="relative flex flex-col gap-2">
            <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                required
                type={isPasswordConfirmShow ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요."
                className="transition-colors border-b-2 w-full pl-[10px] pc:pl-4 pr-9 text-[15px] pc:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                className="absolute w-6 h-6 pc:w-7 pc:h-7 top-1/2 -translate-y-1/2 right-0 "
                onClick={(e) => {
                  e.preventDefault();
                  setIsPasswordConfirmShow(!isPasswordConfirmShow);
                }}
              >
                <svg
                  className="w-full h-full text-[#A9BE8C]"
                  viewBox="0 0 24 24"
                >
                  {isPasswordConfirmShow ? (
                    <path
                      fill="currentColor"
                      d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
                    />
                  ) : (
                    <path
                      fill="currentColor"
                      d="M12 17.5c-3.8 0-7.2-2.1-8.8-5.5H1c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5h-2.2c-1.6 3.4-5 5.5-8.8 5.5Z"
                    />
                  )}
                </svg>
              </button>
            </div>
            {/* 에러 메시지 표시 */}
            {error && (
              <div className="absolute text-red-500 text-sm bottom-[-1.8rem]">
                {error}
              </div>
            )}
          </div>
          {/* 이름 입력 필드 */}
          <div className="flex flex-col gap-2">
            <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              placeholder="이름을 입력해주세요."
              className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* 닉네임 입력 필드 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
                닉네임 <span className="text-red-500">*</span>
              </label>
              <div className="text-[14px] pc:text-[16px] text-[#A9BE8C]">
                2~8자의 한글, 영문 대소문자, 숫자로 이루어져야 합니다.
              </div>
            </div>
            <div className="flex flex-col group">
              <input
                required
                type="text"
                placeholder="닉네임을 입력해주세요."
                className="transition-colors border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[17px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
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
              className="transition-colors inline-block mx-auto mt-2 bg-[#CBD8B7] text-black font-bold text-[14px] pc:text-[16px] px-4 py-2 rounded-md hover:bg-[#A9BE8C]"
            >
              중복확인
            </button>
          </div>
          {/* 생년월일 입력 필드 */}
          <div className="flex flex-col gap-2">
            <label className="text-[#656565] text-[16px] pc:text-[18px] font-bold text-nowrap">
              생년월일 <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="date"
              ref={dateInputRef}
              className={`appearance-none bg-white transition-colors border-b-2 pl-[10px] pc:pl-4 py-[10px] pc:py-4 text-[15px] pc:text-[17px] border-[#E2E4E5] focus:outline-none focus:border-[#A9BE8C] placeholder-[#A9BE8C] hover:cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer ${
                birthDate ? "text-black" : "text-[#E2E4E5]"
              }`}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              onClick={() => dateInputRef.current?.showPicker()}
              placeholder="연도-월-일"
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
