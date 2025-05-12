import { Question } from "./question.d";
import { Answer } from "./answer.d";

export interface QuestionWithAnswerList {
  question: Question;
  answers: Answer[] | null;
}

export interface QuestionWithAnswer {
  question: Question;
  answer: Answer | null;
}
