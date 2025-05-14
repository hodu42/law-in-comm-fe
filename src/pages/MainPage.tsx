import React, { useEffect, useState } from "react";
import { RecentQuestions } from "@/components/RecentQuestions";
import { QuestionCategories } from "@/components/QuestionCategories";
import { MobileSearch } from "@/components/MobileSearch";
import { searchQuestion } from "@/api/questions";
import { Question } from "@/types/question";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Link } from "react-router-dom";

export const MainPage = (): React.JSX.Element => {
  const [recentQuestions, setRecentQuestions] = useState<Question[]>([]);
  const { clearKeyword } = useAppDispatch();

  useEffect(() => {
    const fetchRecentQuestions = async () => {
      const response = await searchQuestion();
      setRecentQuestions(response.data.content);
    };
    fetchRecentQuestions();
  }, []);

  return (
    <>
      <MobileSearch />
      <RecentQuestions recentQuestions={recentQuestions} />
      <div className="w-[90%] pc:hidden flex justify-between px-[20px]">
        <Link
          to="/question/write"
          className="w-[155px] flex justify-evenly items-center bg-[#C9D8B7] px-[10px] py-[5px] rounded-10px"
        >
          <svg className="text-[#5C6E56]" width="40" height="40">
            <path
              fill="currentColor"
              d="M21.667 10 30 18.333 14.155 34.178a2.943 2.943 0 0 1-.02-4.141l-.005-.005a2.94 2.94 0 0 1-4.202-4.112l-.013-.013a2.942 2.942 0 0 1-4.092-.06L21.667 10Zm12.643-.69-3.62-3.62a3.333 3.333 0 0 0-4.713 0l-2.644 2.643 8.334 8.334 2.643-2.644a3.333 3.333 0 0 0 0-4.713ZM5 30v5h5a5 5 0 0 0-5-5Z"
            />
          </svg>
          <span className="inline-block text-black text-center text-[18px] font-bold">
            질문 작성
          </span>
        </Link>
        <Link
          to="/questions?keyword=&category=&page=0"
          onClick={clearKeyword}
          className="w-[155px] flex justify-evenly items-center bg-[#C9D8B7] px-[10px] py-[5px] rounded-10px"
        >
          <svg className="text-[#5C6E56]" width="40" height="40">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M5.417 11.667a1.25 1.25 0 0 1 1.25-1.25h26.666a1.25 1.25 0 0 1 0 2.5H6.667a1.25 1.25 0 0 1-1.25-1.25Zm0 8.333a1.25 1.25 0 0 1 1.25-1.25H25a1.25 1.25 0 1 1 0 2.5H6.666A1.25 1.25 0 0 1 5.416 20Zm0 8.333a1.25 1.25 0 0 1 1.25-1.25H15a1.25 1.25 0 1 1 0 2.5H6.666a1.25 1.25 0 0 1-1.25-1.25Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="inline-block text-black text-center text-[18px] font-bold">
            질문 목록
          </span>
        </Link>
      </div>
      <QuestionCategories />
    </>
  );
};
