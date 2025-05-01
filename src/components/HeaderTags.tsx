import React from "react";
import { Link } from "react-router-dom";
import { headerPaths } from "@/routes/routes";

export const HeaderTags = ():React.JSX.Element => {
    return (
        // 현재 선택된 페이지에 스타일 적용하도록 만들기
        <nav className="hidden absolute pc:flex items-center w-full h-[72px] gap-[50px]">
            {headerPaths.map((path, idx) => (
                <Link 
                    key={idx} 
                    to={path.link} 
                    className={`text-[#CECFD3] text-[24px] font-bold py-4 h-full hover:text-black hover:border-b-black hover:border-b-2`}
                >
                    {path.title}
                </Link>
            ))}
        </nav>
    );
};