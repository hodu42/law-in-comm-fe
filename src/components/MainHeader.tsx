import React from "react";
import {Logo} from './Logo'
import {SearchBoxPC} from "./SearchBoxPC";
import {HeaderTags} from "./HeaderTags";

export const MainHeader = ():React.JSX.Element => {
    return (
        <div className="z-10 fixed flex w-full justify-center bg-white border-b-borderGray border-b-[1px]">
            <header className="flex-col min-w-[355px] max-w-[1350px] w-[70.31%] h-[72px] min-[960px]:h-[144px] bg-white justify-between items-center border-b-borderGray">
                <div className="flex w-full h-4.5 items-center">
                    <div className="flex w-full">
                        <a className="flex justify-between items-center gap-x-5" href="">
                            <Logo/>
                            <p className="hidden min-[960px]:block whitespace-nowrap font-NotoSansKR font-bold text-4xl mr-[50px] text-lightGreen">로인컴</p>
                        </a>
                        <SearchBoxPC/>
                    </div>
                    <a className="whitespace-nowrap font-NotoSansKR font-normal text-16px" href="">
                        로그인 / 회원가입
                    </a>
                </div>
                <HeaderTags/>
            </header>
        </div>
    )
}