import { api } from "@/api/index";

export const createChatRequest = async (otherUserId: number) => {
  return api.post<any>(`/chat/room`, { otherPersonId: otherUserId });
};

export const getChatRooms = async () => {
  return api.get<any>(`/chatRooms`);
};

export const getPreviousChatMessages = async (
  chatRoomId: number,
  page: number = 0,
  size: number = 10
) => {
  return api.get<any>(`/chat/room/${chatRoomId}`, { page, size });
};
