   // src/api/index.ts
   import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
   import { BACKEND_URL } from '@/config/Config';

   // API 클라이언트 클래스
   export class ApiClient {
     private axiosInstance: AxiosInstance;

     constructor() {
       this.axiosInstance = axios.create({
         baseURL: BACKEND_URL,
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