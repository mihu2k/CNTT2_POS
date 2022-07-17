import { Navigate, Outlet, useLocation } from 'react-router-dom';
import routes from './list.route';

const ProtectedRoutes = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
