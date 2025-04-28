import { QuestionWithAnswer } from '@/types/questionWithAnswer';
import { getQuestionList } from '@/api/questions';
import { Question } from '@/types/question';

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export const fetchQuestionsWithAnswers = async (page: number = DEFAULT_PAGE): Promise<PageResponse<QuestionWithAnswer>> => {
  // API 연동 전 임시 더미 데이터 반환

  const questionResponse = await getQuestionList(String(page), String(DEFAULT_SIZE));
  // const questions = questionResponse.data.content;
  // console.log("질문들 조회",questions);

  // Question 객체를 QuestionWithAnswer 형식으로 변환
  const questionsWithAnswers = questionResponse.data.content.map((question: Question) => ({
    question,
    answer: null // 답변이 없는 경우 null로 설정
  }));

  return (
    {
      ...questionResponse.data,
      content: questionsWithAnswers
    }
  )

  /* TODO: 답변들 조회가 작동 안함 확인 필요
  const questionsWithAnswers = await Promise.all(
    questions.map(async (question: Question) => {
      const answerResponse = await getAnswers(String(question.questionId), String(DEFAULT_PAGE), String(DEFAULT_SIZE));
      const answer = answerResponse.data.content[0];
      console.log("답변들 조회",answer);

      return {
        question,
        answer
      };
    })
  );
  return questionsWithAnswers;
  */  
}; 