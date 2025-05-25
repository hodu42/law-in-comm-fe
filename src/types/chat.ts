export interface Message {
  messageId?: number;
  senderId?: string;
  senderName?: string;
  message: string;
  createdAt: string;
  read?: boolean;
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
  lastMessage: string;
  lastMessageAt: string;
  unreadMessageCount?: number;
}
