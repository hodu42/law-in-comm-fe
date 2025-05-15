import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    alert("로그인이 필요한 기능입니다.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
