import { ProductService } from '../../services/product.service';
import * as types from '../types';

export const getProductsRequest = (query) => async (dispatch) => {
  dispatch({ type: types.GET_PRODUCTS_REQUEST });

  try {
    const response = await ProductService.getAll(query);
    dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: response });
    console.log('SUCCESS', response);
  } catch (error) {
    dispatch({ type: types.GET_PRODUCTS_FAILURE, payload: error });
    console.log(error, 'ERROR REQ');
  }
};
