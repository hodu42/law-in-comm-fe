import React from "react";
import { Logo } from "./Logo";
import { SearchBoxPC } from "./SearchBoxPC";
import { HeaderTags } from "./HeaderTags";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { getCurrentRole } from "@/hooks/tokenDecoder";
import { Role } from "@/types/role";
import { useLogout } from "@/hooks/useLogout";
import { searchActions } from "@/store/search";

export const MainHeader = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const userRole = getCurrentRole();
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
              <Logo />
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
