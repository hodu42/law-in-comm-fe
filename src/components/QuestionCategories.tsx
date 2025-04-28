import React from "react";
import { CategoryItem } from "./CategoryItem";

export const QuestionCategories = ():React.JSX.Element => {
    const categories = [
        { title: "성범죄", link: "#" },
        { title: "재산 범죄", link: "#" },
        { title: "폭행/협박", link: "#" },
        { title: "가족", link: "#" },
        { title: "회사", link: "#" },
        { title: "교통사고/범죄", link: "#" },
        { title: "명예훼손/모욕", link: "#" }
    ];

    return (
        <div className="flex w-[90%] justify-center py-[30px] mb-[80px] pc:m-0 mt-[3rem]">
            <nav className="flex flex-col gap-[28px] w-full justify-center max-w-1350px">
                <h1 className="text-[#1F2225] text-[20px] pc:text-[28px] font-bold">분야별 질문글 찾기</h1>
                <ul className="question-categories-container flex w-full gap-[20px] justify-between px-[19px] pb-[20px] overflow-auto">
                    {categories.map((category, index) => (
                        <CategoryItem 
                            key={index} 
                            title={category.title} 
                            link={category.link} 
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );
}