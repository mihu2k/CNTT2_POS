import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '../components/loading/loading.component';
import SignInSide from '../pages/sign-in/sign-in.component';
import HomePage from '../pages/home';
import PosPage from '../pages/pos';
import ProductsPage from '../pages/products';
const pages = (path) => lazy(() => import(`../pages/${path}`));

const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />}>
          {/* <Route index element={<Loading />} /> */}
          <Route path="*" element={<Loading />} />
        </Route>
        <Route path="/login" element={<SignInSide />} />
        <Route path="/pos" element={<PosPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
