import { api } from '../index';
import { setTokens } from './token';

export const login = async (username: string, password: string) => {
  const response = await api.post<any>('/login', { username, password });
  const { accessToken, refreshToken, type: tokenType, header: tokenHeader } = response.data;
  setTokens(accessToken, refreshToken, tokenType, tokenHeader);
  return response;
};