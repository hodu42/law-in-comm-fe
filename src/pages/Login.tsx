import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { login } from "@/api/auth/login";
import { useNavigation } from "@/hooks/useNavigation";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { userActions } from "@/store/user";
import { MobileBackButton } from "@/components/MobileBackButton";

export const Login = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { goToMain } = useNavigation();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  // 아이디 또는 비밀번호가 입력되면 에러 메시지 초기화
  useEffect(() => {
    if (userId || password) {
      setError("");
    }
  }, [userId, password]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      await login(userId, password);
      dispatch(userActions.login());
      goToMain();
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("잘못된 아이디/비밀번호입니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다");
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
              로그인
            </div>

            {/* 균형을 위한 빈 공간 */}
            <div className="pc:hidden w-6"></div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full flex-grow px-6 justify-center items-center mt-[72px] mb-20 pc:mb-0">
        <div className="flex flex-col items-center w-full gap-6">
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-full pc:max-w-[570px] pc:mx-auto mt-10 pc:mb-10 gap-y-20 px-5"
          >
            {/* 아이디 입력 필드 */}
            <div className="flex flex-col gap-5 pc:gap-6">
              <label className="text-[#656565] text-[17px] pc:text-[20px] font-bold">
                아이디
              </label>
              <input
                type="text"
                placeholder="아이디를 입력해주세요."
                className="font-NotoSansKR border-b-2 pl-[10px] pc:pl-4 text-[15px] pc:text-[19px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            {/* 비밀번호 입력 필드 */}
            <div className="relative flex flex-col gap-5 pc:gap-6">
              <label className="text-[#656565] text-[17px] pc:text-[20px] font-bold">
                비밀번호
              </label>
              <div className="relative">
                <input
                  required
                  type={isShow ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  className="w-full border-b-2 pl-[10px] pc:pl-4 pr-9 text-[15px] pc:text-[19px] border-[#E2E4E5] py-[10px] pc:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="absolute w-6 h-6 pc:w-7 pc:h-7 top-1/2 -translate-y-1/2 right-0 "
                  onClick={(e) => {
                    e.preventDefault();
                    setIsShow(!isShow);
                  }}
                >
                  <svg
                    className="w-full h-full text-[#A9BE8C]"
                    viewBox="0 0 24 24"
                  >
                    {isShow ? (
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
            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="inline-block bg-[#CBD8B7] text-black font-bold text-[16px] pc:text-[20px] py-3 rounded-md hover:bg-[#A9BE8C] transition-colors"
            >
              로그인
            </button>
          </form>
          {/* 회원가입 링크 */}
          <div className="flex w-full pc:w-[570px] justify-evenly py-9 border-t-[1.7px] border-[#B4B4B4]">
            <span className="font-NotoSansKR text-[16px] pc:text-[20px]">
              아직 회원이 아니신가요?
            </span>
            {/* <Link
              to="/users/join/general"
              className="font-NotoSansKR text-[16px] pc:text-[20px] text-[#A9BE8C] hover:text-[#9CB395] hover:underline transition-colors font-bold"
            >
              회원가입
            </Link> */}
            {/* TODO: 회원가입 방식 변경하기  */}
            <button
              onClick={() => setShowRegisterModal(!showRegisterModal)}
              className="font-NotoSansKR text-[16px] pc:text-[20px] text-[#A9BE8C] hover:text-[#9CB395] hover:underline transition-colors font-bold"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>

      {/* 회원가입 모달 */}
      {showRegisterModal && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowRegisterModal(!showRegisterModal);
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="relative bg-white flex items-center justify-evenly rounded-lg w-[90%] h-[40%] pc:w-[30%] pc:h-[40%]">
            <Link
              className="flex flex-col w-[35%] items-center gap-4 bg-[#CBD8B7] hover:bg-[#A9BE8C] font-bold text-[20px] pc:text-[25px] text-[#5C6E56] p-5 pc:p-8 rounded-lg transition-colors"
              to="/users/join/general"
            >
              <svg
                className="w-14 h-14 pc:w-16 pc:h-16"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M1.573 1.573A.25.25 0 0 1 1.75 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5A1.75 1.75 0 0 0 0 1.75v1.5a.75.75 0 1 0 1.5 0v-1.5a.25.25 0 0 1 .073-.177ZM14 10.75a.75.75 0 1 0-1.5 0v1.5a.25.25 0 0 1-.25.25h-1.5a.75.75 0 1 0 0 1.5h1.5A1.75 1.75 0 0 0 14 12.25v-1.5ZM.75 10a.75.75 0 0 1 .75.75v1.5a.25.25 0 0 0 .25.25h1.5a.75.75 0 1 1 0 1.5h-1.5A1.75 1.75 0 0 1 0 12.25v-1.5A.75.75 0 0 1 .75 10Zm10-10a.75.75 0 1 0 0 1.5h1.5a.25.25 0 0 1 .25.25v1.5a.75.75 0 1 0 1.5 0v-1.5A1.75 1.75 0 0 0 12.25 0h-1.5ZM7 7.776a4.42 4.42 0 0 0-4.145 2.879c-.112.299.127.595.446.595h7.397c.319 0 .557-.296.445-.595A4.42 4.42 0 0 0 7 7.776Zm2.208-3.315a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="text-nowrap">의뢰인</p>
            </Link>
            <Link
              className="flex flex-col w-[35%] items-center gap-4 bg-[#CBD8B7] hover:bg-[#A9BE8C] font-bold text-[20px] pc:text-[25px] text-[#5C6E56] p-5 pc:p-8 rounded-lg transition-colors"
              to="/users/join/lawyer"
            >
              <svg className="w-14 h-14 pc:w-16 pc:h-16" viewBox="0 0 48 49">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M41.95 3.029a2.25 2.25 0 0 1-1.729 2.67l-13.97 2.994V39.5h7.5a2.25 2.25 0 0 1 0 4.5h-19.5a2.25 2.25 0 0 1 0-4.5h7.5V9.659l-13.03 2.79a2.251 2.251 0 1 1-.942-4.398l31.5-6.75a2.25 2.25 0 0 1 2.67 1.728Zm-7.02 20.175.02.054a4.362 4.362 0 0 0 8.1 0l.021-.054-4.07-8.142-4.072 8.142ZM39 9.5c-1.38 0-2.64.78-3.255 2.01L30.6 21.797a3 3 0 0 0-.102 2.457l.27.678a8.862 8.862 0 0 0 16.458 0l.27-.678a3 3 0 0 0-.102-2.457l-5.142-10.281A3.63 3.63 0 0 0 39 9.5ZM4.93 29.204l.02.054a4.362 4.362 0 0 0 8.1 0l.021-.054-4.07-8.142-4.072 8.142ZM9 15.5c-1.38 0-2.64.78-3.255 2.01L.6 27.797a3 3 0 0 0-.102 2.457l.27.678a8.862 8.862 0 0 0 16.458 0l.27-.678a3 3 0 0 0-.102-2.457l-5.139-10.284A3.63 3.63 0 0 0 9 15.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-nowrap">변호사</p>
            </Link>
          </div>
        </div>
      )}

      {/* 모바일 하단 네비게이션 */}
      <MobileNav />
    </div>
  );
};
