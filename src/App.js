import React from 'react';
import AppRouter from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import routes from './router/list.route';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    localStorage.getItem('token')
      ? navigate(
          location.pathname === '/' ? routes.dashboard : location.pathname,
        )
      : navigate(routes.login);
  }, []);

  return (
    <>
      <AppRouter />
      <ToastContainer limit={1} />
    </>
  );
}
