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

export const getReportedQuestions = async (
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

export const getReportedQuestionsMessages = async (
  questionId: number,
  page: number,
  size: number = 3
) => {
  return api.get<any>(`/reports/question/details/${questionId}`, {
    page,
    size,
  });
};

export const getReportedAnswers = async (
  threshold: number,
  page: number,
  size: number = 5
) => {
  return api.get<any>(`/users/admin/reports/answers`, {
    threshold,
    page,
    size,
  });
};

export const getReportedAnswersMessages = async (
  answerId: number,
  page: number,
  size: number = 3
) => {
  return api.get<any>(`/reports/answer/details/${answerId}`, {
    page,
    size,
  });
};

export const deleteQuestions = async (questionIds: number[]) => {
  return api.delete<any>(`/users/admin/questions`, {
    data: { questionIds },
  });
};

export const deleteAnswers = async (answerIds: number[]) => {
  return api.delete<any>(`/users/admin/answers`, {
    data: { answerIds },
  });
};
