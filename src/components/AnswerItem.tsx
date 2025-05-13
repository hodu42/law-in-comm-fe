import React from "react";
import { Link } from "react-router-dom";
import { WrittenAnswer } from "@/types/answer";
import { formatDate } from "@/utils/dateFormat";
import { LegalSpecialityLabels } from "@/types/speciality";
import { LegalSpeciality } from "@/types/speciality";

export const AnswerItem: React.FC<{
  answer: WrittenAnswer;
}> = ({ answer }) => {
  return (
    <Link
      to={`/question/${answer.questionId}`}
      className="bg-white rounded-[10px] shadow-sm mb-10 p-[20px] pc:p-[30px] border-2 border-transparent hover:border-[#9CB395] transition-colors"
    >
      <div className="flex flex-col justify-between gap-[15px]">
        <div className="flex items-center text-sm px-2">
          <span className="mr-4 text-[1rem] pc:text-[1.1rem] text-[#848484]">
            {
              LegalSpecialityLabels[
                answer.questionLegalSpeciality as LegalSpeciality
              ]
            }
          </span>
          <span className="ml-auto text-[0.81rem] pc:text-[1rem] text-[#999999]">
            {answer.updatedAt
              ? formatDate(answer.updatedAt)
              : formatDate(answer.createdAt)}
          </span>
        </div>
        <h3 className="text-[1.12rem] pc:text-[1.31rem]">
          {answer.questionTitle}
        </h3>
        <p className="text-[0.81rem] pc:text-[1.06rem] text-[#333333] line-clamp-2 mb-2">
          {answer.content}
        </p>
        <div className="flex justify-end items-center text-xs text-[#B4B4B4]">
          <div className="flex justify-between items-center">
            <span className="text-[0.81rem] pc:text-[1rem] mr-[6px]">
              신고 {answer.reportCount}
            </span>
            <svg
              className="w-[13px] h-[14px] pc:w-[16px] pc:h-[17px] flex-shrink-0 translate-y-[1px]"
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
      </div>
    </Link>
  );
};
