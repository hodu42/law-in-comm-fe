import React, { useState } from 'react';
import { MainHeader } from '@/components/MainHeader';
import { MobileNav } from '@/components/MobileNav';
import { useParams } from 'react-router-dom';

interface Answer {
    answerId: number;
    content: string;
    createdAt: string;
    lawyer: {
        name: string;
        imageUrl: string;
    };
}

interface Question {
    questionId: number;
    title: string;
    content: string;
    createdAt: string;
    writer: {
        name: string;
    };
}

export const QuestionDetailPage = (): React.JSX.Element => {
    const { questionId } = useParams();
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    
    // 실제로는 API로 데이터를 가져와야 합니다
    const question: Question = {
        questionId: 1,
        title: "동료에게 폭행당한 경우의 법적 대응 방법",
        content: "제가 동료원대 3월9일 오후 9시50분이후 동료원대 맞았는데 경찰은 cctv가없나봤다고 합니다...",
        createdAt: "2025-02-20",
        writer: {
            name: "김의뢰인"
        }
    };

    const answers: Answer[] = [
        {
            answerId: 1,
            content: "1. 형사 고소: 상해진단서(고막 파열)를 바탕으로 동료를 형사 고소하십시오...",
            createdAt: "2025-02-27",
            lawyer: {
                name: "AI 변호사",
                imageUrl: "/ai-lawyer.png"
            }
        },
        {
            answerId: 2,
            content: "1. 상담자님도 매한 것이 있다면 쌍방폭행이 성립할 가능성이 높습니다...",
            createdAt: "2025-02-27",
            lawyer: {
                name: "김영희 변호사",
                imageUrl: "/lawyer-profile.png"
            }
        }
    ];

    const handleReport = () => {
        setShowReportModal(true);
    };

    const handleSubmitReport = () => {
        // 신고 처리 로직
        console.log('신고 내용:', reportReason);
        setShowReportModal(false);
        setReportReason('');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <MainHeader />
            
            <main className="w-full max-w-[800px] mx-auto mt-[120px] px-4">
                {/* 상단 네비게이션 */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-gray-400">질문 목록</span>
                    <span className="text-gray-800">질문 작성</span>
                </div>
                <article className="bg-white mb-4">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-sm text-gray-500">작성자</span>
                                <h1 className="font-bold text-lg">{question.writer.name}</h1>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2">
                                    <svg className="w-5 h-5 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button className="p-2" onClick={handleReport}>
                                    <svg className="w-5 h-5 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="text-sm text-gray-500">최초 시간발생일</span>
                            <p>{question.createdAt}</p>
                        </div>
                        <h2 className="text-xl font-bold mb-4">{question.title}</h2>
                        <p className="text-gray-800 whitespace-pre-line">{question.content}</p>
                    </div>
                </article>

                {/* 답변 작성 버튼 */}
                <button className="w-full bg-[#9CB395] text-white py-3 rounded-lg mb-4">
                    답변 작성
                </button>

                {/* 답변 영역 */}
                <div className="bg-white">
                    <h3 className="p-4 text-lg border-b">답변 {answers.length}개</h3>
                    {answers.map((answer) => (
                        <div key={answer.answerId} className="p-6 border-b">
                            <div className="flex items-center gap-4 mb-4">
                                <img 
                                    src={answer.lawyer.imageUrl} 
                                    alt={answer.lawyer.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold">{answer.lawyer.name}</h4>
                                        <div className="flex gap-2">
                                            <button className="p-1">
                                                <svg className="w-4 h-4 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <button className="p-1" onClick={handleReport}>
                                                <svg className="w-4 h-4 text-[#9CB395]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">{answer.createdAt}</p>
                                </div>
                            </div>
                            <p className="text-gray-800 whitespace-pre-line">{answer.content}</p>
                            {answer.lawyer.name === "김영희 변호사" && (
                                <button className="mt-4 text-[#9CB395] text-sm">
                                    채팅 신청
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            {/* 신고 모달 */}
            {showReportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4">신고 사유를 작성해주세요</h2>
                        <textarea
                            className="w-full h-32 border rounded p-2 mb-4 resize-none"
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="신고 사유를 입력하세요"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                onClick={() => setShowReportModal(false)}
                            >
                                취소
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={handleSubmitReport}
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
