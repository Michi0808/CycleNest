import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/register" replace />;
}
