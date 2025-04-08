import { api } from '../index';

export const approveLawyerRegister = async (lawyerId: number, isApprove: boolean) => {
  return api.post<any>(`/users/admin/confirmations/lawyers/${lawyerId}`, { isApprove });
};

export const getPendingLawyers = async (page: number, size: number) => {
  return api.get<any>('/users/admin/confirmations/lawyers', { page, size });
};

export const getPendingLawyerDetail = async (lawyerId: number) => {
  return api.get<any>(`/users/admin/confirmations/lawyers/${lawyerId}`);
}; 