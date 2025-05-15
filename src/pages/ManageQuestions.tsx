import { LegalSpecialityLabels } from "@/types/speciality";
import { useNavigation } from "@/hooks/useNavigation";
import { Question } from "@/types/question";
import { formatDate } from "@/utils/dateFormat";
import { useState } from "react";

export const ManageQuestions = (): React.JSX.Element => {
  const navigate = useNavigation();
  const [threshold, setThreshold] = useState<number>(0);

  const question: Question = {
    questionId: 12345,
    author: true, // 이 질문의 작성자 정보를 시스템이 알고 있음 (현재 로그인 유저가 작성자인지는 별도 로직)
    title: "임대차 계약 만료 전 퇴거 통보 관련 법적 문의",
    content:
      "안녕하세요. 현재 거주 중인 아파트의 임대차 계약 만료일은 2025년 10월 30일입니다. 그런데 최근 집주인으로부터 8월 말까지 집을 비워달라는 연락을 받았습니다. 새로운 세입자와 이미 계약을 마쳤다고 하는데, 이런 경우 제가 반드시 따라야 하는 건가요? 주택임대차보호법에 따른 제 권리가 궁금합니다. 또한, 만약 이사하게 된다면 중개수수료나 이사비용을 청구할 수 있는지도 알고 싶습니다.",
    authorId: "user_abcdef_789",
    authorName: "김민준",
    createdAt: "2025-05-15T08:10:15.000Z", // 현재 KST 2025-05-15 17:10:15에 해당하는 UTC 시간
    updatedAt: "2025-05-15T08:10:15.000Z",
    legalSpeciality: "REAL_ESTATE_GENERAL", // 부동산 관련 문의
    firstOccurrenceDate: "2025-05-10T00:00:00.000Z", // 집주인으로부터 처음 연락 받은 날짜
    viewCount: 0, // 새로 생성된 질문이므로 조회수는 0
    reportCount: 0, // 새로 생성된 질문이므로 신고수도 0
    anonymous: false, // 익명 질문 아님
  };

  return (
    <main className="w-full px-4 max-w-[800px] mx-auto mt-[72px] pc:mt-[144px]">
      {/* 분야 필터 */}
      <div className="my-6">
        <label
          htmlFor="speciality"
          className="block text-[1.5rem] font-bold text-[#9CB395] mb-3 pl-4"
        >
          분야 선택
        </label>
        <div className="relative">
          <select
            id="speciality"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="appearance-none w-full px-4 py-2 border-2 text-[1.1rem] border-[#CFCFCF] rounded-[10px] bg-white focus:outline-none focus:border-[#9CB395] hover:border-[#9CB395] hover:cursor-pointer transition-colors"
          >
            <option value="">전체</option>
            {Object.entries(LegalSpecialityLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <svg
              className="h-5 w-5 text-[#555555]"
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
      {/* 질문 영역 */}
      {question && (
        <article className="bg-white my-10 rounded-[10px] shadow-sm">
          <div className="flex flex-col p-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[18px] pc:text-[16px] text-[#848484]">
                  {LegalSpecialityLabels[question.legalSpeciality]}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[21px] pc:text-[27px] font-bold mr-2">
                {question.title}
              </h2>
              <div className="flex flex-col pl-3">
                {question.authorName && (
                  <div className="flex text-[12px] pc:text-[14px]">
                    <span className="font-bold text-[#5C6E56] mr-2">
                      작성자
                    </span>
                    <h1 className="font-bold text-[#555]">
                      {question.authorName}
                    </h1>
                  </div>
                )}
                <div className="flex text-[14px] pc:text-[16px] text-[#999]">
                  <span className="mr-6">최초 사건 발생일</span>
                  <p>{question.firstOccurrenceDate}</p>
                </div>
              </div>
              <p className="text-[#656565] text-[15px] pc:text-[17px] whitespace-pre-line">
                {question.content}
              </p>
            </div>
            <div className="flex mt-5 text-[14px] pc:text-[16px] text-[#B4B4B4] justify-end">
              <span className="mr-3">
                {question.updatedAt
                  ? formatDate(question.updatedAt)
                  : formatDate(question.createdAt)}
              </span>
              <span className="mr-3">조회수 {question.viewCount}</span>
              <div className="flex items-center gap-2">
                <span>신고 {question.reportCount}</span>
                {/*TODO: 신고 버튼 누를시 페이지 로딩하도록 만들기*/}
                <button>
                  <svg
                    className="w-[14px] h-[14px] pc:w-[18px] pc:h-[18px] text-[#EF4242] hover:text-[#D63030] transition-colors flex-shrink-0"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      d="M12 12.167H4V7.5a4 4 0 0 1 8 0v4.667Z"
                    />
                    <path
                      stroke="currentColor"
                      d="M2.667 14.5h10.666m-12-9.666 1 .333m2-3.333.334 1m-1.333 1-1-1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </article>
      )}
    </main>
  );
};
