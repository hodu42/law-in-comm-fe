// src/api/index.ts
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BACKEND_URL } from "@/config/Config";
import { getTokens, updateTokens } from "./auth/token";
import { userActions } from "@/store/user";
import { searchActions } from "@/store/search";
import { store } from "@/store/index";
import { clearTokens } from "./auth/token";

let isRefreshing = false;

// API 클라이언트 클래스
export class ApiClient {
  private axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BACKEND_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 요청 인터셉터
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // 공개 API는 토큰 추가하지 않음
        if (
          config.url?.includes("/login") ||
          config.url?.includes("/register") ||
          config.url?.includes("/register-lawyer") ||
          config.url?.includes("/auth/token/refresh") ||
          config.url?.includes("/users/join/nickname/dupe-check") ||
          config.url?.includes("/users/join/id/dupe-check") ||
          config.url?.includes("/question/:questionId/answers") ||
          config.url?.includes("/questions/:id")
        ) {
          return config;
        }

        const { accessToken, refreshToken, tokenType, tokenHeader } =
          getTokens();
        if (accessToken && refreshToken && tokenType && tokenHeader) {
          config.headers[tokenHeader] = `${tokenType}${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 응답 인터셉터
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // 로그인 요청은 토큰 갱신을 시도하지 않음
        if (originalRequest.url?.includes("/login")) {
          return Promise.reject(error);
        }
        const isAccessTokenExpired =
          error.response?.status === 401 &&
          error.response?.data?.code === 4010605;
        // 액세스 토큰 만료 에러이고 재시도하지 않은 요청인 경우
        if (isAccessTokenExpired && !originalRequest._retry) {
          if (isRefreshing) {
            return Promise.reject(error);
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const newToken = await updateTokens();
            const { tokenType, tokenHeader } = getTokens();
            if (tokenType && tokenHeader) {
              originalRequest.headers[tokenHeader] = `${tokenType}${newToken}`;
            }
            store.dispatch(userActions.login());
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            clearTokens();
            store.dispatch(searchActions.setKeyword(""));
            store.dispatch(userActions.logout());
            alert("로그인 상태가 만료되어 로그인 페이지로 이동합니다.");
            window.location.href = "/login";
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // GET 요청
  async get<T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.get(url, { params, ...config });
    return response.data;
  }

  // POST 요청
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  // PUT 요청
  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  // DELETE 요청
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete(url, config);
    return response.data;
  }
}

// API 인스턴스 생성
export const api = new ApiClient();
