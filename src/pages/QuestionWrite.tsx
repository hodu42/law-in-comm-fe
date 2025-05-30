import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { createQuestion } from "@/api/questions";
import { LegalSpecialityLabels } from "@/types/speciality";
import { MobileBackButton } from "@/components/MobileBackButton";

export const QuestionWrite = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [legalSpeciality, setLegalSpeciality] = useState<string>(
    Object.keys(LegalSpecialityLabels)[0]
  );
  const [occurenceDate, setEventDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [content, setContent] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    try {
      const response = await createQuestion(
        title,
        legalSpeciality,
        content,
        occurenceDate,
        isAnonymous
      );
      navigate(`/question/${response.data.questionId}`);
    } catch (error) {
      console.error("질문 생성 오류", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 question-form-container">
      {/* 헤더 */}
      <header className="fixed shadow-md top-0 left-0 right-0 w-full h-[72px] flex items-center justify-center bg-white z-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* 모바일 뒤로가기 버튼 */}
          <MobileBackButton />
          <div className="relative w-full min-w-[355px] max-w-[1350px] pc:w-[70.31%] h-full flex items-center">
            <Logo />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-[19px] pc:text-[21px] font-bold">
            질문 작성
          </div>
          {/* PC 등록하기 버튼 */}
          <button
            onClick={handleSubmit}
            className="hidden pc:flex items-center group"
          >
            <svg
              className="text-[#9CB395] group-hover:text-[#7D9277] transition-colors"
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                fill="currentColor"
                d="m26 12 10 10-19.014 19.014a3.532 3.532 0 0 1-.024-4.97l-.006-.006a3.527 3.527 0 0 1-5.042-4.934l-.016-.016a3.53 3.53 0 0 1-4.91-.072L26 12Zm15.172-.828-4.344-4.344a4 4 0 0 0-5.656 0L28 10l10 10 3.172-3.172a4 4 0 0 0 0-5.656ZM6 36v6h6a6 6 0 0 0-6-6Z"
              />
            </svg>
            <span className="text-[#9CB395] text-[21px] font-bold ml-2 group-hover:text-[#7D9277] transition-colors">
              등록하기
            </span>
          </button>
          {/* 모바일 등록하기 버튼 */}
          <button
            onClick={handleSubmit}
            className="pc:hidden items-center bg-[#C9D8B7] text-black px-4 py-2 rounded-[10px] text-nowrap text-[16px] hover:bg-[#A9BE8C] font-medium transition-colors"
          >
            등록
          </button>
        </div>
      </header>

      {/* 메인 폼 */}
      <main className="flex-grow container mx-auto px-4 py-12 mt-[72px]">
        <form className="max-w-3xl mx-auto">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-[18px] pc:text-[20px] font-medium mb-2"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9CB395] text-[16px] pc:text-[18px] transition-colors"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-[18px] pc:text-[20px] font-medium mb-2"
            >
              분야
            </label>
            <div className="relative">
              <select
                id="category"
                value={legalSpeciality}
                onChange={(e) => setLegalSpeciality(e.target.value)}
                className="appearance-none w-full px-4 py-3 text-[16px] pc:text-[18px] border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#9CB395] transition-colors"
              >
                {Object.entries(LegalSpecialityLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="eventDate"
              className="block text-[18px] pc:text-[20px] font-medium mb-2"
            >
              최초 사건 발생일자
            </label>
            <div className="relative">
              <input
                type="date"
                id="eventDate"
                ref={dateInputRef}
                value={occurenceDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-4 py-3 text-[16px] pc:text-[18px] border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#9CB395] cursor-pointer transition-colors"
                onClick={() => dateInputRef.current?.showPicker()}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-[18px] pc:text-[20px] font-medium mb-2"
            >
              내용
            </label>
            <textarea
              id="content"
              rows={8}
              placeholder="내용을 입력하세요."
              className="w-full px-4 py-3 text-[16px] pc:text-[18px] border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#9CB395] transition-colors"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-start items-center mb-6">
            <label
              htmlFor="anonymous"
              className="mr-2 text-[16px] pc:text-[18px]"
            >
              익명으로 작성
            </label>
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
              className="w-4 h-4 pc:w-5 pc:h-5 accent-[#9CB395]"
            />
          </div>
        </form>
      </main>

      {/* 모바일 하단 네비게이션 */}
      <MobileNav />
    </div>
  );
};
