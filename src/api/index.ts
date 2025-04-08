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
     return api.get<any>('/questions', { page, size });
   };

   // 질문 상세 가져오기
   export const getQuestion = async (id: number) => {
     return api.get<any>(`/questions/${id}`);
   };

   // 질문 작성하기
   export const createQuestion = async (data: any) => {
     return api.post<any>('/questions', data);
   };

   // 로그인
   export const login = async (username: string, password: string) => {
     return api.post<any>('/login', { username, password });
   };

   // 회원가입
   export const register = async (userData: any) => {
     return api.post<any>('/auth/register', userData);
   };

   // 일반 사용자 회원가입
   export const registerGeneral = async (userData: any) => {
     return api.post<any>('/users/join/general', userData);
   };

   // 변호사 회원가입
   export const registerLawyer = async (formData: FormData) => {
     return api.post<any>('/users/join/lawyer', formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     });
   };

   // 닉네임 중복 체크
   export const checkNicknameDuplication = async (nickname: string) => {
     return api.get<any>('/users/join/nickname/dupe-check', { nickname });
   };

   // 법률 전문 분야 조회
   export const getLegalSpecialities = async () => {
     return api.get<any>('/users/legal-speciality');
   };

   // 변호사 승인 대기 목록 조회
   export const getPendingLawyers = async (page: number, size: number) => {
     return api.get<any>('/users/admin/confirmations/lawyers', { page, size });
   };

   // 변호사 승인 대기 상세 조회
   export const getPendingLawyerDetail = async (lawyerId: number) => {
     return api.get<any>(`/users/admin/confirmations/lawyers/${lawyerId}`);
   };

   // 질문 신고하기
   export const reportQuestion = async (questionId: number, reason: string) => {
     return api.post<any>(`/reports/questions/${questionId}`, { reason });
   };

   // 사용자 정보 조회
   export const getUserInfo = async (userId: number) => {
     return api.get<any>(`/users/info/${userId}`);
   };