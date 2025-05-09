import { api } from '../index';
import { ClientData } from '@/types/client';

export const registerGeneral = async (userData: ClientData) => {
  return api.post<any>('/users/join/general', userData);
};

export const registerLawyer = async (formData: FormData) => {
  return api.post<any>('/users/join/lawyer', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}; 