import React from "react";
import { Question } from "@/types/question";
import { LegalSpecialityLabels } from "@/types/speciality";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/dateFormat";

export const RecentQuestionsContent = ({
  anonymous: isAnonymous,
  authorName,
  questionId,
  legalSpeciality,
  title,
  content,
  createdAt,
  updatedAt,
  viewCount,
  reportCount,
}: Question): React.JSX.Element => {
  return (
    <Link
      to={`/question/${questionId}`}
      className="block w-[350px] min-h-[250px] pc:w-[848px] pc:h-[396px] bg-white hover:bg-[#F5F7F3] rounded-[10px] p-[20px] pc:p-[30px] border-2 border-[#5C6E56] transition-all relative"
    >
      <div className="flex flex-col gap-[15px] h-full">
        <div className="flex items-center justify-between text-sm px-2">
          <span className="text-[0.9rem] pc:text-[1.1rem] text-[#848484]">
            {LegalSpecialityLabels[legalSpeciality]}
          </span>
          <span className="text-[0.8rem] pc:text-[1.1rem] text-[#999999] whitespace-nowrap">
            {updatedAt ? formatDate(updatedAt) : formatDate(createdAt)}
          </span>
        </div>

        {!isAnonymous && authorName && (
          <div className="text-[0.9rem] pc:text-[1.06rem] font-bold text-[#555555]">
            <span className="mr-1 text-[#5C6E56]">작성자</span> {authorName}
          </div>
        )}

        <h3 className="text-[1rem] pc:text-[1.31rem] font-medium break-words line-clamp-1">
          {title}
        </h3>
        <p className="text-[0.85rem] pc:text-[1.06rem] text-[#848484] line-clamp-3 pc:line-clamp-5 break-words">
          {content}
        </p>
      </div>
      <div className="mt-4 absolute bottom-1 pc:bottom-0 right-0 p-[15px] pc:p-[30px] flex justify-end items-center gap-4 text-[0.8rem] pc:text-[1rem] text-[#B4B4B4]">
        <span>조회수 {viewCount}</span>
        <div className="flex items-center gap-1">
          <span>신고 {reportCount}</span>
          <svg
            className="w-[13px] h-[14px] pc:w-[16px] pc:h-[17px] flex-shrink-0 translate-y-[1px]"
            viewBox="0 0 16 17"
            fill="none"
          >
            <path
              fill="#EF4242"
              stroke="#EF4242"
              d="M12 12.167H4V7.5a4 4 0 0 1 8 0v4.667Z"
            />
            <path
              stroke="#EF4242"
              d="M2.667 14.5h10.666m-12-9.666 1 .333m2-3.333.334 1m-1.333 1-1-1"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
