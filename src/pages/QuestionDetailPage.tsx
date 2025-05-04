import React, { useState, useEffect } from 'react';
import { MainHeader } from '@/components/MainHeader';
import { MobileNav } from '@/components/MobileNav';
import { useParams } from 'react-router-dom';
import { Question } from '@/types/question';
import { Answer } from '@/types/answer';
import { getQuestion } from '@/api/questions';
import { LegalSpecialityLabels } from '@/types/speciality';
import { reportQuestion } from '@/api/questions';
import { PageResponse } from '@/types/page';
import { getAnswers } from '@/api/answers';

export const QuestionDetailPage = (): React.JSX.Element => {
    const { questionId } = useParams();
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [question, setQuestion] = useState<Question>();
    const [answers, setAnswers] = useState<PageResponse<Answer>>();
    const [reportErrorMsg, setReportErrorMsg] = useState('');

    const fetchQuestion = async () => {
        const response = await getQuestion(String(questionId));
        setQuestion(response.data);
    };

    const fetchAnswers = async () => {
        const response = await getAnswers(String(questionId), '0', '10');
        console.log(response);
        setAnswers(response.data);
    };

    useEffect(() => {
        fetchQuestion();
        fetchAnswers();
    }, [questionId]);

    const handleReport = () => {
        setShowReportModal(true);
        setReportReason('');
        setReportErrorMsg('');
    };

    const handleQuestionReportSubmit = async () => {
        try {
            await reportQuestion(Number(questionId), reportReason);
            fetchQuestion();
            alert('신고 처리가 완료되었습니다.');
            setShowReportModal(false);
        } catch (error: any) {
            console.log(error);
            if (error.response.data.code === 4290703) {
                setReportErrorMsg(error.response.data.message);
            } else {
                setReportErrorMsg('신고 처리 중 오류가 발생했습니다.');
            }
        }
    };
    {/*TODO:답변 신고 로직 만들기*/}
    const handleAnswerReport = async (answerId:number) => {
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <MainHeader />
            {/* 메인 콘텐츠 */}
            <main className="w-full max-w-[800px] mx-auto mt-[200px]">
                {/* 질문 영역 */}
                {question && (
                    <article className="bg-white mb-4 rounded-[10px] shadow-sm">
                        <div className="flex flex-col gap-[30px] p-10">
                            <div className="flex justify-between items-start">
                                <span className="text-[22px] text-[#848484]">{LegalSpecialityLabels[question.legalSpeciality]}</span>
                                <div className="flex gap-2">
                                    <button className="p-2">
                                        <svg className="w-5 h-5 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
                                    <span>신고수 {question.reportCount}</span>
                                    <button onClick={handleReport}>
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
                <div className="bg-white rounded-[10px] shadow-sm">
                    <h3 className="p-4 text-lg border-b">답변 {answers?.totalElements || 0}개</h3>
                    {/* 답변이 있을 때만 렌더링*/}
                    {answers && answers.content.length > 0 && (
                        answers.content.map((answer) => (
                            <div key={answer.answerId} className="p-6 border-b last:border-b-0">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={ '/images/default-profile.png' }
                                        alt={`${answer.authorName} 프로필 사진`}
                                        className="w-12 h-12 rounded-full bg-gray-200"
                                    />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold">{answer.authorName}</h4>
                                            <div className="flex gap-2">
                                                <button className="p-1" title="수정하기">
                                                    <svg className="w-4 h-4 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button className="p-1" title="신고하기" onClick={() => handleAnswerReport(answer.answerId)}>
                                                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500">{new Date(answer.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <p className="text-gray-800 whitespace-pre-line">{answer.content}</p>
                                {answer.authorName === "김영희 변호사" && (
                                    <button className="mt-4 text-[#9CB395] text-sm">
                                        채팅 신청
                                    </button>
                                )}
                            </div>
                        )) 
                    )} 
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
                                onClick={() => setShowReportModal(false)}>
                                취소
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={handleQuestionReportSubmit}
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
