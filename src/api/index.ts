   // src/api/index.ts
   import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
   import { BASE_URL } from '../config/Config';

   // API 클라이언트 클래스
   export class ApiClient {
     private axiosInstance: AxiosInstance;

     constructor() {
       this.axiosInstance = axios.create({
         baseURL: BASE_URL,
         headers: {
           'Content-Type': 'application/json'
         }
       });

       // 요청 인터셉터 - 인증 토큰 추가
       this.axiosInstance.interceptors.request.use(
         (config) => {
           const tokenType = localStorage.getItem('tokenType');
           const accessToken = localStorage.getItem('accessToken');
           const headerType = localStorage.getItem('header');
           
           if (tokenType && accessToken && headerType) {
             config.headers[headerType] = `${tokenType}${accessToken}`;
           }
           return config;
         },
         (error) => Promise.reject(error)
       );
     }

     // GET 요청
     async get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
       const response = await this.axiosInstance.get(url, { params, ...config });
       return response.data;
     }

     // POST 요청
     async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
       const response = await this.axiosInstance.post(url, data, config);
       return response.data;
     }

     // PUT 요청
     async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
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

   // API 메서드들을 여기에 추가할 수 있습니다
   // 예: 질문 목록 가져오기
   export const getQuestions = async (page: number, size: number) => {
     return api.get<any>('/api/questions', { page, size });
   };

   // 질문 상세 가져오기
   export const getQuestion = async (id: number) => {
     return api.get<any>(`/api/questions/${id}`);
   };

   // 질문 작성하기
   export const createQuestion = async (data: any) => {
     return api.post<any>('/api/questions', data);
   };

   // 로그인
   export const login = async (username: string, password: string) => {
     return api.post<any>('/api/login', { username, password });
   };

   // 회원가입
   export const register = async (userData: any) => {
     return api.post<any>('/api/auth/register', userData);
   };