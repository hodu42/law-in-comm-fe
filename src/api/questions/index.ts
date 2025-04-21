import { api } from '../index';

export const getQuestions = async (page: number, size: number) => {
  return api.get<any>('/questions', { page, size });
};

export const getQuestion = async (id: number) => {
  return api.get<any>(`/questions/${id}`);
};

export const createQuestion = async (title: string, legalSpeciality: string, content: string, firstOccurenceDate: string, isAnonymous: boolean) => {
  return api.post<any>('/questions', {
    title: title,
    legalSpeciality: legalSpeciality,
    content: content,
    firstOccurrenceDate: firstOccurenceDate,
    anonymous: isAnonymous,
  });
}; 