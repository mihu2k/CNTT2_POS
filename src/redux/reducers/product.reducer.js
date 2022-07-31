import * as types from '../types';

const initialState = {
  product: null,
  products: [],
  status: null,
  totalPage: 1,
  totalRecord: 0,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    //get products
    case types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        status: types.GET_PRODUCTS_REQUEST,
      };
    case types.GET_PRODUCTS_SUCCESS: {
      const products = action.payload.data?.data ?? [];
      const totalPage = action.payload.data?.total_page ?? 1;
      const totalRecord = action.payload.data?.totalRecord ?? 0;
      return {
        ...state,
        status: types.GET_PRODUCTS_SUCCESS,
        products,
        totalPage,
        totalRecord,
      };
    }
    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        totalPage: 1,
        totalRecord: 0,
        status: types.GET_PRODUCTS_FAILURE,
      };
    // get single product
    case types.GET_PRODUCT_REQUEST:
      return {
        ...state,
        status: types.GET_PRODUCT_REQUEST,
      };
    case types.GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        status: types.GET_PRODUCT_SUCCESS,
        product: action.payload?.data,
      };
    }
    case types.GET_PRODUCT_FAILURE:
      return {
        ...state,
        status: types.GET_PRODUCT_FAILURE,
        product: null,
      };
    // create product
    case types.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        status: types.CREATE_PRODUCT_REQUEST,
      };
    case types.CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        status: types.CREATE_PRODUCT_SUCCESS,
      };
    }
    case types.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        status: types.CREATE_PRODUCT_FAILURE,
      };
    // delete product
    case types.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        status: types.DELETE_PRODUCT_REQUEST,
      };
    case types.DELETE_PRODUCT_SUCCESS: {
      const products = action.payload.data?.data ?? [];
      return {
        ...state,
        status: types.DELETE_PRODUCT_SUCCESS,
        products,
      };
    }
    case types.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        status: types.DELETE_PRODUCT_FAILURE,
      };

    // update product
    case types.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        status: types.UPDATE_PRODUCT_REQUEST,
      };
    case types.UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        status: types.UPDATE_PRODUCT_SUCCESS,
      };
    }
    case types.UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        status: types.UPDATE_PRODUCT_FAILURE,
      };

    default:
      return { ...state };
  }
}
