import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '../components/loading/loading.component';
import MiniDrawer from '../components/sidebar/sidebar.component';
import SignInSide from '../pages/sign-in/sign-in.component';

const pages = (path) => lazy(() => import(`../pages/${path}`));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MiniDrawer />}>
          {/* <Route index element={<Loading />} /> */}
          <Route path="about" element={<Loading />} />
          <Route path="dashboard" element={<Loading />} />
          <Route path="*" element={<Loading />} />
        </Route>
        <Route path="/login" element={<SignInSide />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
