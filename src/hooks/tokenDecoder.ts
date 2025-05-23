import { TokenPayload } from "@/types/token";
import { jwtDecode } from "jwt-decode";

const getCurrentPayload = (): TokenPayload | null => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      return jwtDecode<TokenPayload>(token);
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};

export const getCurrentRole = (): string => {
  const payload = getCurrentPayload();
  if (payload) {
    const role = payload.role;
    return role;
  } else {
    return "";
  }
};
