import { api } from '../index';

export const register = async (userData: any) => {
  return api.post<any>('/auth/register', userData);
};

export const registerGeneral = async (userData: any) => {
  return api.post<any>('/users/join/general', userData);
};

export const registerLawyer = async (formData: FormData) => {
  return api.post<any>('/users/join/lawyer', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}; 