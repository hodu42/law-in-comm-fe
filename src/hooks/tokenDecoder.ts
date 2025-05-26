import { TokenPayload } from "@/types/token";
import { jwtDecode } from "jwt-decode";

const getCurrentAccessToken = (): TokenPayload | null => {
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

const getCurrentRefreshToken = (): TokenPayload | null => {
  const token = localStorage.getItem("refreshToken");
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
  const payload = getCurrentAccessToken();
  if (payload) {
    const role = payload.role;
    return role;
  } else {
    return "";
  }
};

export const getCurrentUsername = (): string => {
  const payload = getCurrentAccessToken();
  if (payload) {
    const username = payload.jti;
    return username;
  } else {
    return "";
  }
};

export const isAccessTokenExpired = (): boolean => {
  const payload = getCurrentAccessToken();
  if (payload) {
    return payload.exp < Date.now() / 1000;
  }
  return true;
};

export const isRefreshTokenExpired = (): boolean => {
  const payload = getCurrentRefreshToken();
  if (payload) {
    return payload.exp < Date.now() / 1000;
  }
  return true;
};
