import React from "react";
import { Logo } from "./Logo";
import { SearchBoxPC } from "./SearchBoxPC";
import { HeaderTags } from "./HeaderTags";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Role } from "@/types/role";
import { useLogout } from "@/hooks/useLogout";
import { searchActions } from "@/store/search";

export const MainHeader = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.role);
  const { handleLogout } = useLogout();

  return (
    <div className="z-10 shadow-md pc:shadow-sm fixed flex w-full justify-center bg-white border-b-borderGray">
      <header className="flex-col min-w-[355px] max-w-[1350px] w-[70.31%] h-[72px] pc:h-[144px] bg-white justify-between items-center border-b-borderGray">
        <div className="flex w-full h-4.5 items-center">
          <div className="flex w-full">
            <Link
              className="flex justify-between items-center gap-x-5"
              to="/main"
              onClick={() => {
                dispatch(searchActions.setKeyword(""));
              }}
            >
              <svg
                id="animated-scale"
                className="text-[#9CB395]"
                width="48"
                height="49"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M41.95 3.029a2.25 2.25 0 0 1-1.729 2.67l-13.97 2.994V39.5h7.5a2.25 2.25 0 0 1 0 4.5h-19.5a2.25 2.25 0 0 1 0-4.5h7.5V9.659l-13.03 2.79a2.251 2.251 0 1 1-.942-4.398l31.5-6.75a2.25 2.25 0 0 1 2.67 1.728Zm-7.02 20.175.02.054a4.362 4.362 0 0 0 8.1 0l.021-.054-4.07-8.142-4.072 8.142ZM39 9.5c-1.38 0-2.64.78-3.255 2.01L30.6 21.797a3 3 0 0 0-.102 2.457l.27.678a8.862 8.862 0 0 0 16.458 0l.27-.678a3 3 0 0 0-.102-2.457l-5.142-10.281A3.63 3.63 0 0 0 39 9.5ZM4.93 29.204l.02.054a4.362 4.362 0 0 0 8.1 0l.021-.054-4.07-8.142-4.072 8.142ZM9 15.5c-1.38 0-2.64.78-3.255 2.01L.6 27.797a3 3 0 0 0-.102 2.457l.27.678a8.862 8.862 0 0 0 16.458 0l.27-.678a3 3 0 0 0-.102-2.457l-5.139-10.284A3.63 3.63 0 0 0 9 15.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="hidden pc:block whitespace-nowrap font-NotoSansKR font-bold text-4xl mr-[50px] text-lightGreen">
                로인컴
              </p>
            </Link>
            <SearchBoxPC />
          </div>
          {localStorage.getItem("accessToken") ? (
            <div className="flex gap-x-5">
              {userRole !== Role.ADMIN && (
                <Link
                  className="whitespace-nowrap font-NotoSansKR font-normal text-16px hover:underline hover:text-[#9CB395] transition-colors"
                  to={
                    userRole === Role.USER
                      ? "/client/my-page"
                      : "/lawyer/my-page"
                  }
                >
                  마이페이지
                </Link>
              )}
              <button
                className="whitespace-nowrap font-NotoSansKR font-normal text-16px hover:underline hover:text-[#9CB395] transition-colors"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link
              className="whitespace-nowrap font-NotoSansKR font-normal text-16px underline"
              to="/login"
            >
              로그인 / 회원가입
            </Link>
          )}
        </div>
        <HeaderTags />
      </header>
    </div>
  );
};
