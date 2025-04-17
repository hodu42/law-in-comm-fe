import { api } from '../index';
import { AxiosResponse } from 'axios';

export const setTokens = (accessToken: string, refreshToken: string, tokenType: string, tokenHeader: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('tokenType', tokenType);
  localStorage.setItem('tokenHeader', tokenHeader);
};

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    tokenType: localStorage.getItem('tokenType'),
    tokenHeader: localStorage.getItem('tokenHeader'),
  };
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('tokenType');
  localStorage.removeItem('tokenHeader');
};

export const updateTokens = async (): Promise<string> => {
  const { refreshToken: currentRefreshToken } = getTokens();
  
  if (!currentRefreshToken) {
    throw new Error('리프레시 토큰이 없습니다');
  }

  try {
    const response: AxiosResponse = await api.post('/auth/token/refresh', {
      refreshToken: currentRefreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken, tokenType, headerType } = response.data;
    if (accessToken && newRefreshToken && tokenType && headerType) {
      setTokens(accessToken, newRefreshToken, tokenType, headerType);
    } 
    return accessToken;
  } catch (error) {
    clearTokens();
    throw error;
  }
}; 