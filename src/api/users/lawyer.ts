import { api } from "@/api/index";

export const fetchLawyerMypageData = async () => {
  return api.get<any>("users/my-page/lawyer");
};

export const getLawyerAnswers = async (page: number = 0, size: number = 5) => {
  return api.get<any>(`/users/my-page/lawyer/answers`, { page, size });
};
