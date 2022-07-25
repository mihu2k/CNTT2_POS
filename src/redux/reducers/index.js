import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import productReducer from './product.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  order: orderReducer,
  category: categoryReducer,
});

export default rootReducer;
