import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "yyyy.MM.dd HH:mm:ss");
};

export const formatChatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "a h:mm", { locale: ko });
};
