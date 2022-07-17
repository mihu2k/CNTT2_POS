import React from 'react';
import { ToastContainer } from 'react-toastify';
import AppRouter from './router';

export default function App() {
  // React.useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     localStorage.setItem('token', null);
  //   }
  // }, []);

  return (
    <div>
      <AppRouter />
      <ToastContainer limit={1} />
    </div>
  );
}
