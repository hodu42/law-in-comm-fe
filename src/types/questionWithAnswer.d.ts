import { Question } from './question.d';
import { Answer } from './answer.d';

export interface QuestionWithAnswer {
  question: Question;
  answer: Answer | null;
} 