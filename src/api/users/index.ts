import { api } from "../index";

export const checkNicknameDuplication = async (nickname: string) => {
  return api.get<any>("/users/join/nickname/dupe-check", { nickname });
};

export const checkUsernameDuplication = async (id: string) => {
  return api.get<any>("/users/join/id/dupe-check", { id });
};

export const getLegalSpecialities = async () => {
  return api.get<any>("/users/legal-speciality");
};

export const getUserInfo = async (userId: number) => {
  return api.get<any>(`/users/info/${userId}`);
};

export const getUserProfileImage = async (userId: number) => {
  const userInfoResponse = await api.get<any>(`/users/info/${userId}`);
  return userInfoResponse.data.profileImage;
};
