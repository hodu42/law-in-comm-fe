import React from "react";
import {Question} from "@typings/question";
export const RecentQuestionsContent = ({legalSpeciality, title, content, firstOccurrenceDate, viewCount, url}:Question):React.JSX.Element => {
    return (
        <article className="max-w-[848px] min-[960px]:h-[396px] rounded-[10px] min-[960px]:border-2 border-[#5C6E56]  bg-white">
            <a className="flex flex-col gap-[18px] w-full h-full px-[47px] py-[27px]" href={url}>
                <div className="flex w-full px-2">
                    <h6 className="w-full text-[#848484] text-[16px] min-[960px]:text-[19px] font-normal">{legalSpeciality}</h6>
                    <span className="text-[#999] text-[13px] min-[960px]:text-[16px] font-normal block whitespace-nowrap">{firstOccurrenceDate}</span>
                </div>
                <h1 className="text-black text-ellipsis text-[18px] min-[960px]:text-[21px] font-normal">{title}</h1>
                <p className="questionContents w-full max-h-[195px] text-[#555] text-[14px] min-[960px]:text-[16px] font-normal text-ellipsis overflow-hidden">{content}</p>
                <span className="block text-[#B4B4B4] text-right text-[13px] min-[960px]:text-[17px] font-normal">조회수 {viewCount}</span>
            </a>
        </article>
    )
}