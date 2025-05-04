import { api } from '../index';

export const deleteQuestion = async (id: string) => {
  return api.delete<any>(`/questions/${id}`);
};

export const getQuestion = async (id: string) => {
  return api.get<any>(`/questions/${id}`);
};

export const searchQuestion = async (keyword: string, legalSpeciality: string, page: number, size: number) => {
  return api.get<any>(`/questions/search`, { keyword, legalSpeciality, page, size });
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

export const updateQuestion = async (id: number, title: string, legalSpeciality: string, content: string, firstOccurenceDate: string, isAnonymous: boolean) => {
  return api.put<any>(`/questions/${id}`, {
    title: title,
    legalSpeciality: legalSpeciality,
    content: content,
    firstOccurenceDate: firstOccurenceDate,
    anonymous: isAnonymous,
  });
};
