import React from 'react';
import AppRouter from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer limit={1} />
    </>
  );
}
