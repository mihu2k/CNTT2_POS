import { Navigate, Outlet, useLocation } from 'react-router-dom';
import routes from './list.route';

const PublicRoutes = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Outlet />;
  }
  return <Navigate to={routes.dashboard} state={{ from: location }} replace />;
};

export default PublicRoutes;
