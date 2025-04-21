import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { MobileNav } from '@/components/MobileNav';
import { login } from '@/api/auth/login';

export const Login = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 아이디 또는 비밀번호가 입력되면 에러 메시지 초기화
  useEffect(() => {
    if (userId || password) {
      setError('');
    }
  }, [userId, password]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    try {
      await login(userId, password);
      navigate('/');
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('잘못된 아이디/비밀번호입니다.');
      } else {
        setError('로그인 중 오류가 발생했습니다');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-white overflow-x-hidden">
      
      {/* 헤더 영역 */}
      <header className="fixed top-0 left-0 right-0 w-full h-[72px] flex items-center justify-center bg-white z-20">
        <div className="relative w-full min-w-[355px] max-w-[1350px] mobile:w-[70.31%] h-full flex items-center">
          {/* 모바일 뒤로가기 버튼 */}
          <Link to="/" className="mobile:hidden flex items-center text-black z-10 ml-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
          </Link>
          {/* 데스크탑 로고 */}
          <Link to="/" className="hidden mobile:flex items-center absolute left-4 z-10">
            <div className="text-[#A9BE8C] font-bold text-2xl flex items-center">
              <Logo />
              <span className="ml-5 text-[#9CB395] text-[36px]">로인컴</span>
            </div>
          </Link>
            
          <div className="flex items-center justify-between w-full">
            {/* 타이틀 */}
            <div className="absolute left-1/2 -translate-x-1/2 text-[21px] font-bold">
              로그인
            </div>
            
            {/* 균형을 위한 빈 공간 */}
            <div className="mobile:hidden w-6"></div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full flex-grow px-6 items-center pt-[36px]">
        <form onSubmit={handleLogin} className="flex flex-col w-full mobile:max-w-[570px] mobile:mx-auto mt-10 mobile:mt-16 gap-y-20 px-5 py-[72px] border-b-[1.7px] border-[#B4B4B4]">
          {/* 아이디 입력 필드 */}
          <div className="flex flex-col gap-5 mobile:gap-6">
            <label className="text:black mobile:text-[#656565] text-[20px] font-bold">
              아이디
            </label>
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="font-NotoSansKR border-b-2 pl-[10px] mobile:pl-4 placeholder:text-[15px] text-[15px] mobile:placeholder:text-[19px] mobile:text-[19px] border-[#E2E4E5] py-[10px] mobile:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="relative flex flex-col gap-5 mobile:gap-6">
            <label className="text:black mobile:text-[#656565] text-[20px] font-bold">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="font-NotoSansKR border-b-2 pl-[10px] mobile:pl-4 placeholder:text-[15px] text-[15px] mobile:placeholder:text-[19px] mobile:text-[19px] border-[#E2E4E5] py-[10px] mobile:py-4 focus:outline-none focus:border-[#A9BE8C] placeholder-[#E2E4E5]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* 에러 메시지 표시 */}
            {error && (
              <div className="absolute text-red-500 text-sm bottom-[-1.8rem]">
                {error}
              </div>
            )}
          </div>
          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="inline-block bg-[#CBD8B7] text-black font-bold text-[20px] py-3 rounded-md hover:bg-[#A9BE8C] transition-colors"
          >
            로그인
          </button>
        </form>
        {/* 회원가입 링크 */}
        <div className="flex w-full mobile:w-[570px] justify-evenly my-[50px]">
          <span className="font-NotoSansKR text-[16px] mobile:text-[20px]">아직 회원이 아니신가요?</span>
          <Link to="/register" className="font-NotoSansKR text-[16px] mobile:text-[20px] text-[#A9BE8C] hover:text-[#9CB395] hover:underline transition-colors font-bold">
            회원가입
          </Link>
        </div>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <MobileNav/>
    </div>
  );
}; 