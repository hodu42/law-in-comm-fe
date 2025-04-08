import { api } from '../index';

export const getQuestions = async (page: number, size: number) => {
  return api.get<any>('/questions', { page, size });
};

export const getQuestion = async (id: number) => {
  return api.get<any>(`/questions/${id}`);
};

export const createQuestion = async (data: any) => {
  return api.post<any>('/questions', data);
}; 