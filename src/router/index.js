import { Route, Routes } from 'react-router-dom';
import Loading from '../components/loading/loading.component';
import HomePage from '../pages/home';
import OrdersPage from '../pages/orders';
import PosPage from '../pages/pos';
import ProductsPage from '../pages/products';
import EmployeePage from '../pages/employee';
import SignInSide from '../pages/sign-in/sign-in.component';
import ProtectedRoutes from './protected.route';
import PublicRoutes from './public.route';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<HomePage />} />
        <Route path="pos" element={<PosPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="employee" element={<EmployeePage />} />
      </Route>

      <Route path="/" element={<PublicRoutes />}>
        <Route index path="login" element={<SignInSide />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
