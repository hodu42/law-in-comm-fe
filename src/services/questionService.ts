import { QuestionWithAnswer } from '@/types/questionWithAnswer';
import { getQuestionList } from '@/api/questions';
import { Question } from '@/types/question';
import { getAnswers } from '@/api/answers';
import { PageResponse } from '@/types/page';

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

export const fetchQuestionsWithAnswers = async (
  page: number = DEFAULT_PAGE,
  legalSpeciality?: string,
  keyword?: string
): Promise<PageResponse<QuestionWithAnswer>> => {
  // undefined인 경우 빈 문자열로 처리
  const speciality = legalSpeciality || '';
  const searchKeyword = keyword || '';
  
  const questionResponse = await getQuestionList(
    String(page), 
    String(DEFAULT_SIZE), 
    speciality, 
    searchKeyword
  );
  
  const questions = questionResponse.data.content;

  const questionsWithAnswers = await Promise.all(
    questions.map(async (question: Question) => {
      const answerResponse = await getAnswers(
        String(question.questionId), 
        String(DEFAULT_PAGE), 
        String(DEFAULT_SIZE)
      );
      const answer = answerResponse.data.content[0];

      return {
        question,
        answer: answer || null
      };
    })
  );

  return {
    ...questionResponse.data,
    content: questionsWithAnswers
  };
}; 