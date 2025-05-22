export interface Message {
  id: number | string;
  sender: "me" | "other" | "system";
  content: string;
  timestamp?: string;
}

export interface ChatRoom {
  chatRoomId: number;
  otherMemberName: string;
  otherMemberProfileImage?: {
    id: number;
    name: string;
    contentType: string;
    size: number;
    path: string;
  };
  lastMessageAt: string;
  unreadMessageCount?: number;
}
