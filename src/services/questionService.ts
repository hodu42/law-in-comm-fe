import { QuestionWithAnswerList } from "@/types/questionWithAnswer";
import { searchQuestion } from "@/api/questions";
import { Question } from "@/types/question";
import { getAnswers } from "@/api/answers";
import { PageResponse } from "@/types/page";
import { getClientQuestions } from "@/api/users/client";

const DEFAULT_PAGE = 0;
export const DEFAULT_SIZE = 10;

export const fetchQuestionsWithAnswers = async (
  page: number = DEFAULT_PAGE,
  legalSpeciality: string,
  keyword: string
): Promise<PageResponse<QuestionWithAnswerList>> => {
  // undefined인 경우 빈 문자열로 처리
  const speciality = legalSpeciality || "";
  const searchKeyword = keyword || "";

  const questionResponse = await searchQuestion(
    searchKeyword,
    speciality,
    page,
    DEFAULT_SIZE
  );

  const questions = questionResponse.data.content;

  const questionsWithAnswers = await Promise.all(
    questions.map(async (question: Question) => {
      const answerResponse = await getAnswers(
        String(question.questionId),
        String(DEFAULT_PAGE),
        String(DEFAULT_SIZE)
      );
      const answers = answerResponse.data.content;

      return {
        question,
        answers: answers || null,
      };
    })
  );

  return {
    ...questionResponse.data,
    content: questionsWithAnswers,
  };
};

export const fetchClientQuestionsWithAnswers = async (
  page: number = DEFAULT_PAGE
): Promise<PageResponse<QuestionWithAnswerList>> => {
  const questionResponse = await getClientQuestions(page);

  const questions = questionResponse.data.content;

  const questionsWithAnswers = await Promise.all(
    questions.map(async (question: Question) => {
      const answerResponse = await getAnswers(
        String(question.questionId),
        String(DEFAULT_PAGE),
        String(DEFAULT_SIZE)
      );
      const answers = answerResponse.data.content;

      return {
        question,
        answers: answers || null,
      };
    })
  );

  return {
    ...questionResponse.data,
    content: questionsWithAnswers,
  };
};
