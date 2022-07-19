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

    default:
      return { ...state };
  }
}
