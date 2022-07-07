import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '../components/loading/loading.component';
import SignInSide from '../pages/sign-in/sign-in.component';
import HomePage from '../pages/home-page/home-page.component';
import PosPage from '../pages/pos-page';
const pages = (path) => lazy(() => import(`../pages/${path}`));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />}>
          {/* <Route index element={<Loading />} /> */}
          <Route path="about" element={<Loading />} />
          <Route path="dashboard" element={<Loading />} />
          <Route path="*" element={<Loading />} />
        </Route>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/pos" element={<PosPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
