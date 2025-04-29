import { QuestionWithAnswer } from '@/types/questionWithAnswer';
import { getQuestionList } from '@/api/questions';
import { Question } from '@/types/question';
import { getAnswers } from '@/api/answers';

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

/* TODO: 답변들 조회가 작동 안함 확인 필요*/
export const fetchQuestionsWithAnswers = async (
  page: number = DEFAULT_PAGE,
  legalSpeciality?: string,
  keyword?: string
): Promise<PageResponse<QuestionWithAnswer>> => {
  const questionResponse = await getQuestionList(String(page), String(DEFAULT_SIZE), legalSpeciality, keyword);
  const questions = questionResponse.data.content;

  const questionsWithAnswers = await Promise.all(
    questions.map(async (question: Question) => {
      const answerResponse = await getAnswers(String(question.questionId), String(DEFAULT_PAGE), String(DEFAULT_SIZE));
      const answer = answerResponse.data.content[0];

      return {
        question,
        answer: answer || null
      };
    })
  );
  return (
    {
      ...questionResponse.data,
      content: questionsWithAnswers
    }
  )
}; 