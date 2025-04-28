import { getQuestionList } from '@/api/questions';
import { getAnswers } from '@/api/answers';
import { QuestionWithAnswer } from '@/types/questionWithAnswer.d';
import { Question } from '@/types/question.d';

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;
/*TODO: 답변 조회 오류 해결 필요 */
export const fetchQuestionsWithAnswers = async (): Promise<QuestionWithAnswer[]> => {
  const questionResponse = await getQuestionList(String(DEFAULT_PAGE), String(DEFAULT_SIZE));
  const questions = questionResponse.data.content;
  console.log("질문들 조회",questions);
  
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
}; 