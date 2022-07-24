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

export const createProductRequest = (data) => async (dispatch) => {
  dispatch({ type: types.CREATE_PRODUCT_REQUEST });

  try {
    const response = await ProductService.create(data);
    dispatch({ type: types.CREATE_PRODUCT_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.CREATE_PRODUCT_FAILURE, payload: error });
  }
};

export const deleteProductRequest = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });

  try {
    const response = await ProductService.delete(id);
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: error });
  }
};

export const updateProductRequest = (updateData, id) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });

  try {
    const response = await ProductService.update(updateData, id);
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: error });
  }
};

export const getProductRequest = (id) => async (dispatch) => {
  dispatch({ type: types.GET_PRODUCT_REQUEST });
  try {
    const response = await ProductService.getProduct(id);
    dispatch({ type: types.GET_PRODUCT_SUCCESS, payload: response });
    console.log('SUCCESS-TEST', response);
  } catch (error) {
    dispatch({ type: types.GET_PRODUCT_FAILURE, payload: error });
  }
};
