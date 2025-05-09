import { Navigate, Outlet } from 'react-router-dom';

/*TODO: protected route 적용 할 예정*/
export const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
