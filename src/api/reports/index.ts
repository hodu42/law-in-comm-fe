import { api } from '../index';

export const reportQuestion = async (questionId: number, reason: string) => {
  return api.post<any>(`/reports/questions/${questionId}`, { reason });
}; 