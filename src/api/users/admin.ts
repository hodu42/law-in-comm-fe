import { api } from "../index";

export const approveLawyerRegister = async (
  lawyerId: number,
  isApprove: boolean
) => {
  return api.post<any>(`/users/admin/confirmations/lawyers/${lawyerId}`, {
    isApprove,
  });
};

export const getPendingLawyers = async (page: number, size: number) => {
  return api.get<any>("/users/admin/confirmations/lawyers", { page, size });
};

export const getPendingLawyerDetail = async (lawyerId: number) => {
  return api.get<any>(`/users/admin/confirmations/lawyers/${lawyerId}`);
};

export const getReportQuestions = async (
  threshold: number,
  page: number,
  size: number = 5
) => {
  return api.get<any>(`/users/admin/reports/questions`, {
    threshold,
    page,
    size,
  });
};

export const getReportMessages = async (
  questionId: number,
  page: number,
  size: number = 3
) => {
  return api.get<any>(`/reports/question/details/${questionId}`, {
    page,
    size,
  });
};

export const deleteQuestions = async (questionIds: number[]) => {
  return api.delete<any>(`/users/admin/questions`, {
    data: { questionIds },
  });
};
