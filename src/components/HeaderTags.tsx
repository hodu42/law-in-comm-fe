import React from "react";

export const HeaderTags = ():React.JSX.Element => {
    return (
        // 현재 선택된 페이지에 스타일 적용하도록 만들기
        <nav className="hidden absolute mobile:flex items-center w-full h-[72px] gap-[50px]">
            <a href="#" className="text-[#CECFD3] text-[24px] font-bold py-4 h-full hover:text-black hover:border-b-black hover:border-b-2" aria-current="page">홈</a>
            <a href="#" className="text-[#CECFD3] text-[24px] font-bold py-4 h-full hover:text-black hover:border-b-black hover:border-b-2">질문 목록</a>
            <a href="#" className="text-[#CECFD3] text-[24px] font-bold py-4 h-full hover:text-black hover:border-b-black hover:border-b-2">질문 작성</a>
        </nav>
    )
}