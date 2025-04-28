import { api } from '../index';

export const deleteQuestion = async (id: number) => {
  return api.delete<any>(`/questions/${id}`);
};

export const getQuestion = async (id: number) => {
  return api.get<any>(`/questions/${id}`);
};

export const getQuestionList = async (page: string, size: string) => {
  return api.get<any>('/questions', { page, size });
};

export const searchQuestion = async (keyword: string, page: number, size: number) => {
  return api.get<any>(`/questions/search`, { keyword, page, size });
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

{/*제대로 작동하는지 확인 필요*/}
export const updateQuestion = async (id: number, title: string, legalSpeciality: string, content: string, firstOccurenceDate: string, isAnonymous: boolean) => {
  return api.put<any>(`/questions/${id}`, {
    title: title,
    legalSpeciality: legalSpeciality,
    content: content,
    firstOccurenceDate: firstOccurenceDate,
    anonymous: isAnonymous,
  });
};
