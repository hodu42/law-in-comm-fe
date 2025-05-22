import { api } from "@/api/index";

export const createChatRequest = async (otherUserId: number) => {
  return api.post<any>(`/chat/room`, { otherPersonId: otherUserId });
};
