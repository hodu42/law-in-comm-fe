import React, { useState, useEffect } from 'react';
import { MainHeader } from '@/components/MainHeader';
import { MobileNav } from '@/components/MobileNav';
import { useParams } from 'react-router-dom';
import { Question } from '@/types/question';
import { Answer } from '@/types/answer';
import { getQuestion } from '@/api/questions';
import { LegalSpecialityLabels } from '@/types/speciality';
import { reportQuestion } from '@/api/questions';
import { reportAnswer } from '@/api/answers'
import { PageResponse } from '@/types/page';
import { getAnswers } from '@/api/answers';
import { ReportingItem } from '@/types/report';
import { DEFAULT_SIZE } from '@/services/questionService';

export const QuestionDetailPage = (): React.JSX.Element => {
    const { questionId } = useParams();
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [question, setQuestion] = useState<Question>();
    const [answers, setAnswers] = useState<PageResponse<Answer>>();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);
    const [reportErrorMsg, setReportErrorMsg] = useState('');
    const [reportingItem, setReportingItem] = useState<ReportingItem>({ type: null, id: null });

    const fetchQuestion = async () => {
        const response = await getQuestion(String(questionId));
        setQuestion(response.data);
    };

    const fetchAnswers = async () => {
        const response = await getAnswers(String(questionId), String(currentPage), String(DEFAULT_SIZE));
        console.log(response);
        setAnswers(response.data);
        setTotalPages(response.data.totalPages);
        setIsFirstPage(response.data.first);
        setIsLastPage(response.data.last);
    };

    useEffect(() => {
        fetchQuestion();
        fetchAnswers();
    }, [questionId, answers]);

    const openReportModal = (reportingItem: ReportingItem) => {
        setShowReportModal(true);
        setReportReason('');
        setReportErrorMsg('');
        setReportingItem(reportingItem);
    };

    const closeReportModal = () => {
        setShowReportModal(false);
        setReportingItem({ type: null, id: null });
    }

    const handleQuestionReportSubmit = async () => {
        try {
            await reportQuestion(Number(reportingItem.id), reportReason);
            fetchQuestion(); // 질문 다시 불러오기
            alert('신고 처리가 완료되었습니다.');
            setShowReportModal(false);
            setReportingItem({ type: null, id: null });
        } catch (error: any) {
            console.log(error);
            if (error.response.data.code === 4290703) {
                setReportErrorMsg(error.response.data.message);
            } else {
                setReportErrorMsg('신고 처리 중 오류가 발생했습니다.');
            }
        }
    };

    const handleAnswerReportSubmit = async () => {
        try {
            await reportAnswer(Number(reportingItem.id), reportReason);
            fetchAnswers(); // 답변 다시 불러오기
            alert('신고 처리가 완료되었습니다.');
            setShowReportModal(false);
            setReportingItem({ type: null, id: null });
        } catch (error: any) {
            console.log(error);
            if (error.response.data.code === 4290703) {
                setReportErrorMsg(error.response.data.message);
            } else {
                setReportErrorMsg('신고 처리 중 오류가 발생했습니다.');
            }
        }
    }

    const handleReportSubmit = async () => {
        if (reportingItem.type === 'question') {
            handleQuestionReportSubmit();
        } else {
            handleAnswerReportSubmit();
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <MainHeader />
            {/* 메인 콘텐츠 */}
            <main className="w-full max-w-[800px] mx-auto mt-[200px]">
                {/* 질문 영역 */}
                {question && (
                    <article className="bg-white mb-12 rounded-[10px] shadow-sm">
                        <div className="flex flex-col gap-[30px] p-10">
                            <div className="flex justify-between items-start">
                                <span className="text-[22px] text-[#848484]">{LegalSpecialityLabels[question.legalSpeciality]}</span>
                                <div className="flex gap-2">
                                    {/*TODO:질문 수정 기능 만들기*/}
                                    <button className='mr-2'>
                                        <svg className="w-6 h-6 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    {/*TODO:질문 삭제 기능 만들기*/}
                                    <button>
                                        <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between text-[20px] text-[#999]">
                                <span className="">최초 시간발생일</span>
                                <p>{question.firstOccurrenceDate}</p>
                            </div>
                            <div className='flex text-[20px]'>
                                <span className="font-bold text-[#5C6E56] mr-2">작성자</span>
                                <h1 className='font-bold text-[#555]'>{question.authorName}</h1>
                            </div>
                            <h2 className="text-[23px] font-bold">{question.title}</h2>
                            <p className="text-[#656565] text-[19px] whitespace-pre-line">{question.content}</p>
                            <div className='flex text-[20px] text-[#B4B4B4] justify-end'>
                                <span className='mr-3'>{question.createdAt.split('T')[0]}</span>
                                <span className='mr-3'>조회수 {question.viewCount}</span>
                                <div className='flex items-center gap-2'>
                                    <span>신고 {question.reportCount}</span>
                                    <button onClick={() => openReportModal({ type: 'question', id: question.questionId })}>
                                        <svg
                                            className="w-[13px] h-[14px] pc:w-[20px] pc:h-[20px] flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 16 16"
                                        >
                                            <path fill="#EF4242" stroke="#EF4242" d="M12 12.167H4V7.5a4 4 0 0 1 8 0v4.667Z" />
                                            <path stroke="#EF4242" d="M2.667 14.5h10.666m-12-9.666 1 .333m2-3.333.334 1m-1.333 1-1-1" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                )}

                {/* 답변 작성 버튼, 권한에 따라 안보이도록 하기 */}
                {false && (
                    <button className="w-full bg-[#9CB395] text-white py-3 rounded-lg mb-4">
                        답변 작성
                    </button>
                )}
                {/* 답변 영역 */}
                <div>
                    <h3 className="pl-5 py-10 text-[30px] font-bold border-t-[1px] border-[#CFCFCF]">답변 <span className='text-[#9CB395]'>{answers?.totalElements || 0}</span>개</h3>
                    {/* 답변이 있을 때만 렌더링*/}
                    {answers && answers.content.length > 0 && (
                        answers.content.map((answer) => (
                            <div key={answer.answerId} className="flex flex-col gap-8 bg-white p-10 rounded-[10px] shadow-sm border-2 border-[#9CB395] mb-10">
                                <div className="flex items-center gap-6 mb-4">
                                    <img
                                        src={'/images/default-profile.png'}
                                        alt={`프로필 사진`}
                                        className="w-20 h-20 rounded-full bg-gray-200"
                                    />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-[25px] font-bold">{answer.authorName}</h4>
                                            <div className="flex gap-2">
                                                {/*TODO:답변 수정 기능 만들기*/}
                                                <button className='mr-2'>
                                                    <svg className="w-6 h-6 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                {/*TODO:답변 삭제 기능 만들기*/}
                                                <button>
                                                    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-[20px] text-gray-500">{answer.createdAt.split('T')[0]}</p>
                                    </div>
                                </div>
                                <p className="text-[19px] text-[#555] whitespace-pre-line">{answer.content}</p>
                                <div className='flex text-[20px] text-[#B4B4B4] justify-end items-center gap-2'>
                                    <div className='flex mr-3 gap-2'>
                                        <span>신고 {answer.reportCount}</span>
                                        <button onClick={() => openReportModal({ type: 'answer', id: answer.answerId })}>
                                            <svg
                                                className="w-[13px] h-[14px] pc:w-[20px] pc:h-[20px] flex-shrink-0"
                                                fill="none"
                                                viewBox="0 0 16 16"
                                            >
                                                <path fill="#EF4242" stroke="#EF4242" d="M12 12.167H4V7.5a4 4 0 0 1 8 0v4.667Z" />
                                                <path stroke="#EF4242" d="M2.667 14.5h10.666m-12-9.666 1 .333m2-3.333.334 1m-1.333 1-1-1" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button className="flex items-center gap-2 bg-[#9CB395] p-2 rounded-[10px] text-white">
                                        <svg className='w-8 h-8' fill="none" viewBox="0 0 50 50"><path fill="currentColor" d="M25 6.25c11.459 0 20.834 7.458 20.834 16.667 0 9.208-9.375 16.666-20.834 16.666-2.583 0-5.062-.375-7.354-1.041C11.563 43.75 4.167 43.75 4.167 43.75c4.854-4.854 5.625-8.125 5.73-9.375-3.543-2.98-5.73-7.02-5.73-11.458C4.167 13.708 13.542 6.25 25 6.25Z" /></svg>
                                        <span className='text-[19px]'>채팅 신청</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* 페이지네이션 */}
                <div className="mt-8 mb-10 flex justify-center">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                            disabled={isFirstPage}
                            className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &lt;
                        </button>
                        {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-1 rounded ${pageNum === currentPage
                                    ? 'bg-[#C9D8B7] text-gray-700'
                                    : 'text-gray-700 hover:bg-[#C9D8B7]'
                                    }`}
                            >
                                {pageNum + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                            disabled={isLastPage}
                            className="px-3 py-1 rounded text-gray-700 hover:bg-[#C9D8B7] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </main>

            {/* 신고 모달 */}
            {showReportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">신고 사유를 작성해주세요</h2>
                        <textarea
                            className="w-full h-32 border-2 rounded-[10px] p-2 mb-4 resize-none focus:outline-none focus:border-[#9CB395]"
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="신고 사유를 입력하세요"
                        />
                        <div className="text-red-500 text-sm">
                            {reportErrorMsg}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                onClick={closeReportModal}>
                                취소
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={handleReportSubmit}
                            >
                                신고하기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <MobileNav />
        </div>
    );
};
