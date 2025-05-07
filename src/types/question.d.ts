import {Sort} from "./page";
import {LegalSpeciality} from "./speciality";
import { QuestionWithAnswer } from "./questionWithAnswer";

export interface Question {
    questionId: number,
    author: boolean,
    title: string,
    content: string,
    authorId: string | null,
    authorName: string | null,
    createdAt: string,
    updatedAt: string,
    legalSpeciality: LegalSpeciality,
    firstOccurrenceDate: string,
    viewCount: number,
    reportCount: number,
    anonymous: boolean,
}