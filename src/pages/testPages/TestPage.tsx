import React from "react";
import { useNavigate } from "react-router-dom";
import { testRoutes } from "@/routes/routes";

export const TestPage = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold mb-4">페이지 테스트</h1>
      <div className="grid grid-cols-2 gap-4">
        {testRoutes.map((route) => (
          <button
            key={route.path}
            onClick={() => navigate(route.path ?? "")}
            className="bg-lightGreen hover:bg-green-500 text-black font-medium py-3 px-4 rounded-md transition-colors"
          >
            {route.path}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestPage; 