import React from "react";
import {Question} from "@/types/question";
import { searchQuestion, getQuestion } from "@/api/questions";

export const QuestionsTest = ():React.JSX.Element => {
    const [page, setPage] = React.useState<number>(0);
    const [size, setSize] = React.useState<number>(0);
    const [questions, setQuestions] = React.useState<Question[]>([]);
    const [questionId, setQuestionId] = React.useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = React.useState<Question | null>(null);
    const [reason, setReason] = React.useState<string>("");

    const fetchQuestions = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await searchQuestion('', '', page, size);
            console.log(response.data);
            setQuestions(response.data.content);
        } catch (error:any) {
            if (error.response && error.response.status === 409) {
                alert("이미 신고한 게시글입니다.");
            } else {
                console.error(error);
            }
        }
    }

    const fetchSpecificQuestion = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await getQuestion(String(questionId));
            setCurrentQuestion(response.data);
        } catch (error:any) {
            if (error.response && error.response.status === 409) {
                alert("존재하지 않는 질문글입니다.");
            } else {
                console.error(error);
            }
        }
    }

    const reportQuestion = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentQuestion) {
            try {
                const { api } = await import('../../api'); // 동적 임포트
                const response = await api.post<any>(`/api/reports/questions/${currentQuestion.questionId}`, {
                    reason: reason,
                });
                alert(response.data);
            } catch (error:any) {
                if (error.response && error.response.status === 409) {
                    alert("이미 신고한 게시글입니다.");
                }
                console.error(error);
            }
        }
    }

    return (
        <div className="flex flex-col">
            <form onSubmit={fetchQuestions}>
                <input className="border-2 border-lightGreen rounded-10px" type={"number"} value={page} onChange={(e) => setPage(Number(e.target.value))} placeholder="페이지 번호"/>
                <input className="border-2 border-lightGreen rounded-10px" type={"number"} value={size} onChange={(e) => setSize(Number(e.target.value))} placeholder="페이지 크기"/>
                <button className="bg-lightGreen rounded-10px" type={"submit"}>질문글 목록 조회</button>
            </form>
            <>
                <h1>질문 목록들</h1>
                {questions ? (
                    questions.map((item:Question, idx) => (
                        <div className="border-2 border-black bg-lightGreen flex flex-col" key={idx}>
                            <p>{`질문 id : ${item.questionId}`}</p>
                            <p>{`익명 여부 : ${item.anonymous}`}</p>
                            <p>{`작성자 id : ${item.authorId}`}</p>
                            <p>{`작성자 이름 : ${item.authorName}`}</p>
                            <p>{`생성일 : ${item.createdAt}`}</p>
                            <p>{`업뎃일 : ${item.updatedAt}`}</p>
                            <p>{`카테고리 : ${item.legalSpeciality}`}</p>
                            <p>{`첫 발생일 : ${item.firstOccurrenceDate}`}</p>
                            <p>{`제목 : ${item.title}`}</p>
                            <p>{`내용 : ${item.content}`}</p>
                            <p>{`조회수 : ${item.viewCount}`}</p>
                            <p>{`신고수 : ${item.reportCount}`}</p>
                        </div>
                    ))
                ) : ''}
            </>
            <div>
                <div>
                    <form onSubmit={fetchSpecificQuestion}>
                        <label>세부 조회할 질문글 id</label>
                        <input className="border-2 border-lightGreen" type={"number"} value={questionId} onChange={(e) => setQuestionId(Number(e.target.value))}/>
                        <button className="bg-lightGreen rounded-10px" type={"submit"}>세부 조회하기</button>
                    </form>
                </div>
                <>
                    <h1>세부 조회한 질문</h1>
                    {
                        currentQuestion ? (
                            <div className="border-2 border-black bg-lightGreen flex flex-col">
                                <p>{`질문 id : ${currentQuestion.questionId}`}</p>
                                <p>{`익명 여부 : ${currentQuestion.anonymous}`}</p>
                                <p>{`작성자 id : ${currentQuestion.authorId}`}</p>
                                <p>{`작성자 이름 : ${currentQuestion.authorName}`}</p>
                                <p>{`생성일 : ${currentQuestion.createdAt}`}</p>
                                <p>{`업뎃일 : ${currentQuestion.updatedAt}`}</p>
                                <p>{`카테고리 : ${currentQuestion.legalSpeciality}`}</p>
                                <p>{`첫 발생일 : ${currentQuestion.firstOccurrenceDate}`}</p>
                                <p>{`제목 : ${currentQuestion.title}`}</p>
                                <p>{`내용 : ${currentQuestion.content}`}</p>
                                <p>{`조회수 : ${currentQuestion.viewCount}`}</p>
                                <p>{`신고수 : ${currentQuestion.reportCount}`}</p>
                                <form onSubmit={reportQuestion}>
                                    <input type={"text"} value={reason} onChange={(e) => setReason(e.target.value)}/>
                                    <label>신고 사유</label>
                                    <button type={"submit"}>신고하기</button>
                                </form>
                            </div>
                        ) : ''
                    }
                </>
            </div>
        </div>
    )
}