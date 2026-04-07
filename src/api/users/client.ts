import { api } from "../index";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

export const getClientQuestions = async (page: number = DEFAULT_PAGE) => {
  return api.get<any>(`/users/my-page/questions`, {
    page: page,
    size: DEFAULT_SIZE,
  });
};

export const getClientMypageData = async () => {
  return api.get<any>(`/users/my-page`);
};

export const updateClientMypageData = async (
  name: string,
  nickname: string,
  birth: string
) => {
  return api.put<any>(`/users/my-page`, {
    name: name,
    nickname: nickname,
    birth: birth,
  });
};
