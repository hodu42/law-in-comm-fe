import {Sort} from "./page";
import {LegalSpeciality} from "./speciality";

export interface QuestionList {
    totalElements: number,
    totalPages: number,
    first: boolean,
    last: boolean,
    size: number,
    content: Question[],
    number: number,
    sort: Sort[],
    numberOfElements: number,
    pageable: {
        pageNumber: number,
        offset: number,
        sort: [
            {
                direction: string,
                nullHandling: string,
                ascending: boolean,
                property: string,
                ignoreCase: boolean
            }
        ],
        pageSize: number,
        paged: boolean,
        unpaged: boolean
    }
}

export interface Question {
    questionId: number,
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
    isAnonymous: boolean,
}