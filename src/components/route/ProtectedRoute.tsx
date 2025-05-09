import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();

  if (location.pathname === '/') {
    return <Navigate to="/main" replace />;
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
