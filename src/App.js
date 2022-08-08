import React from 'react';
import AppRouter from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import routes from './router/list.route';

export default function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.getItem('token')
      ? navigate(routes.dashboard)
      : navigate(routes.login);
  }, []);

  return (
    <>
      <AppRouter />
      <ToastContainer limit={1} />
    </>
  );
}
