import { api } from '../index';

export const deleteAnswer = async (answerId: string) => {
  return api.delete<any>(`/answers/${answerId}`);
};

export const getAnswers = async (questionId: string, page: string, size: string) => {
  return api.get<any>(`/question/${questionId}/answers`, { page, size });
};

export const createAnswer = async (questionId: string, content: string) => {
  return api.post<any>(`/question/${questionId}/answers`, { content });
};

export const updateAnswer = async (answerId: number, content: string) => {
  return api.put<any>(`/answers/${answerId}`, { content });
};

export const reportAnswer = async (id: number, reason: string) => {
  return api.post<any>(`/reports/answers/${id}`, { reason });
};
