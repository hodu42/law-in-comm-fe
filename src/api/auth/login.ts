import { api } from '../index';

export const login = async (username: string, password: string) => {
  return api.post<any>('/login', { username, password });
}; 