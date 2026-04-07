import { useState, useEffect } from "react";
import { PageResponse } from "@/types/page";
import { AnswerReportMessage } from "@/types/report";
import { formatDate } from "@/utils/dateFormat";
import {
  getReportedAnswersMessages,
  getReportedQuestionsMessages,
} from "@/api/users/admin";

export const ReportMessageComponent = ({
  questionId,
  answerId,
}: {
  questionId?: number;
  answerId?: number;
}) => {
  const [reportMessages, setReportMessages] =
    useState<PageResponse<AnswerReportMessage>>();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const loadReportMessages = async () => {
    if (questionId) {
      try {
        const response = await getReportedQuestionsMessages(
          questionId,
          currentPage
        );
        setReportMessages(response.data);
        setTotalPages(response.data.totalPages);
        setIsFirstPage(response.data.first);
        setIsLastPage(response.data.last);
      } catch (error) {
        console.error(error);
      }
    } else if (answerId) {
      try {
        const response = await getReportedAnswersMessages(
          answerId,
          currentPage
        );
        setReportMessages(response.data);
        setTotalPages(response.data.totalPages);
        setIsFirstPage(response.data.first);
        setIsLastPage(response.data.last);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    loadReportMessages();
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-2 mb-5 p-8">
      {reportMessages?.content.map((message) => (
        <div
          key={message.reportId}
          className="flex flex-col gap-2 bg-gray-100 rounded-[10px] p-4"
        >
          <div className="flex gap-3 text-[14px] pc:text-[16px]">
            <p className="text-[#5C6E56] font-bold">{message.reporterName}</p>
            <p className="text-[#999]">{formatDate(message.createdAt)}</p>
          </div>
          <p className="whitespace-pre-wrap break-words" key={message.reportId}>
            {message.reportContent}
          </p>
        </div>
      ))}
      {/* 신고 메시지 페이지네이션 */}
      <div className="mt-8 mb-10 pc:mb-0 flex justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            disabled={isFirstPage}
            className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &lt;
          </button>
          {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded ${
                  pageNum === currentPage
                    ? "bg-[#C9D8B7] text-gray-700"
                    : "text-gray-700 hover:bg-[#C9D8B7] transition-colors"
                }`}
              >
                {pageNum + 1}
              </button>
            )
          )}
          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={isLastPage}
            className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
