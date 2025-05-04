import React from 'react';
import { Link } from 'react-router-dom';
import { LegalSpecialityLabels } from '@/types/speciality';
import { Question } from '@/types/question';
import { Answer } from '@/types/answer';

export const QuestionItem: React.FC<{ question: Question; answers: Answer[] | null }> = ({ question, answers }) => {
  return (
    <Link to={`/question/${question.questionId}`} className="bg-white rounded-[10px] shadow-sm mb-10 p-[20px] pc:p-[30px] border-2 border-transparent hover:border-[#9CB395]">
      <div className="flex flex-col justify-between gap-[15px]">
        <div className="flex items-center text-sm px-2">
          <span className="mr-4 text-[1rem] pc:text-[1.1rem] text-[#848484]">{LegalSpecialityLabels[question.legalSpeciality]}</span>
          <span className="ml-auto text-[0.81rem] pc:text-[1rem] text-[#999999]">{question.firstOccurrenceDate}</span>
        </div>

        {!question.isAnonymous && question.authorName && (
          <div className="text-[14px] pc:text-[1.06rem] font-bold text-[#555555]">
            <span className="mr-1 text-[#5C6E56]">작성자</span> {question.authorName}
          </div>
        )}
        
        <h3 className="text-[1.12rem] pc:text-[1.31rem]">{question.title}</h3>
        {/* 답변 있는 경우 */}
        {answers && answers.length > 0 && (
          <>
            <div className="text-[0.81rem] pc:text-[1.06rem] text-[#555555]">
              <span className="mr-1 text-[0.81rem] pc:text-[1rem] text-[#5C6E56] font-bold">답변</span> {answers[0].authorName}
            </div>
            <p className="text-[0.81rem] pc:text-[1.06rem] text-[#848484] line-clamp-2 mb-2">
              {answers[0].content}
            </p>
          </>
        )}
        <div className="flex justify-end items-center text-xs text-[#B4B4B4]">
          <span className="text-[0.81rem] pc:text-[1rem] mr-2">조회수 {question.viewCount}</span>
          <div className="flex justify-between items-center">
            <span className="text-[0.81rem] pc:text-[1rem] mr-[6px]">
              신고 {question.reportCount}
            </span>
            <svg className="w-[13px] h-[14px] pc:w-[16px] pc:h-[17px] flex-shrink-0 translate-y-[1px]" fill="none">
              <path fill="#EF4242" stroke="#EF4242" d="M12 12.167H4V7.5a4 4 0 0 1 8 0v4.667Z"/>
              <path stroke="#EF4242" d="M2.667 14.5h10.666m-12-9.666 1 .333m2-3.333.334 1m-1.333 1-1-1"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}; 