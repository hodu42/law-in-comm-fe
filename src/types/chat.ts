export interface Message {
  id: number | string;
  sender: "me" | "other" | "system";
  content: string;
  timestamp?: string;
}

export interface ChatRoom {
  id: string | number;
  name: string;
  lastMessage?: string; // 목록에 표시될 마지막 메시지 (선택 사항)
  unreadCount?: number; // 안 읽은 메시지 수 (선택 사항)
}
