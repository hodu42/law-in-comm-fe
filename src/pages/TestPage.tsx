import React from "react";
import { useNavigate } from "react-router-dom";

export const TestPage = (): React.JSX.Element => {
  const navigate = useNavigate();

  const routes = [
    { path: "/", name: "메인 페이지" },
    { path: "/test", name: "테스트" },
    { path: "/register", name: "회원가입" },
    { path: "/register-lawyer", name: "변호사 회원가입" },
    { path: "/pending-lawyers", name: "대기 중인 변호사" },
    { path: "/write", name: "글쓰기" },
    { path: "/questions", name: "질문 목록" },
    { path: "/answer/write", name: "답변 작성" },
  ];

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold mb-4">페이지 테스트</h1>
      <div className="grid grid-cols-2 gap-4">
        {routes.map((route) => (
          <button
            key={route.path}
            onClick={() => navigate(route.path)}
            className="bg-lightGreen hover:bg-green-500 text-black font-medium py-3 px-4 rounded-md transition-colors"
          >
            {route.name} ({route.path})
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestPage; 