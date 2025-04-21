import React from "react";
import {Logo} from './Logo'
import {SearchBoxPC} from "./SearchBoxPC";
import {HeaderTags} from "./HeaderTags";
import { clearTokens } from '@/api/auth/token';

export const MainHeader = ():React.JSX.Element => {

    const handleLogout = () => {
        clearTokens();
        window.location.reload();
    }

    return (
        <div className="z-10 fixed flex w-full justify-center bg-white border-b-borderGray shadow-sm">
            <header className="flex-col min-w-[355px] max-w-[1350px] w-[70.31%] h-[72px] mobile:h-[144px] bg-white justify-between items-center border-b-borderGray">
                <div className="flex w-full h-4.5 items-center">
                    <div className="flex w-full">
                        <a className="flex justify-between items-center gap-x-5" href="">
                            <Logo/>
                            <p className="hidden mobile:block whitespace-nowrap font-NotoSansKR font-bold text-4xl mr-[50px] text-lightGreen">로인컴</p>
                        </a>
                        <SearchBoxPC/>
                    </div>
                    {
                        localStorage.getItem('accessToken') ? (
                            <div className="flex gap-x-5">
                            <a className="whitespace-nowrap font-NotoSansKR font-normal text-16px" href="/mypage">
                                마이페이지
                            </a>
                            <button className="whitespace-nowrap font-NotoSansKR font-normal text-16px underline" onClick={handleLogout}>
                                로그아웃
                            </button>   
                            </div>
                            
                        ) : (
                            <a className="whitespace-nowrap font-NotoSansKR font-normal text-16px underline" href="/login">
                                로그인 / 회원가입
                            </a>
                        )
                    }
                </div>
                <HeaderTags/>
            </header>
        </div>
    )
}