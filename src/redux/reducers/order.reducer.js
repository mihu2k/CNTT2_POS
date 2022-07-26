import * as types from '../types';

const initialState = {
  order: null,
  orders: [],
  status: null,
  totalPage: 1,
  totalRecord: 0,
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_ORDER_REQUEST:
      return {
        ...state,
        status: types.CREATE_ORDER_REQUEST,
      };
    case types.CREATE_ORDER_SUCCESS:
      const order = action.payload.data?.data;
      return {
        ...state,
        status: types.CREATE_ORDER_SUCCESS,
        order,
      };
    case types.CREATE_ORDER_FAILURE:
      return {
        ...state,
        status: types.CREATE_ORDER_FAILURE,
        order: null,
      };
    case types.GET_ALL_ORDERS_POS_REQUEST:
      return {
        ...state,
        status: types.GET_ALL_ORDERS_POS_REQUEST,
      };
    case types.GET_ALL_ORDERS_POS_SUCCESS: {
      const orders = action.payload.data?.data;
      return {
        ...state,
        status: types.GET_ALL_ORDERS_POS_SUCCESS,
        orders,
        totalPage: action.payload.data?.totalPage ?? 1,
        totalRecord: action.payload.data?.totalRecord ?? 0,
      };
    }
    case types.GET_ALL_ORDERS_POS_FAILURE:
      return {
        ...state,
        status: types.GET_ALL_ORDERS_POS_FAILURE,
        orders: [],
      };
    case types.GET_ORDER_POS_BY_ID_REQUEST:
      return {
        ...state,
        status: types.GET_ORDER_POS_BY_ID_REQUEST,
      };
    case types.GET_ORDER_POS_BY_ID_SUCCESS: {
      const order = action.payload.data?.data;
      return {
        ...state,
        status: types.GET_ORDER_POS_BY_ID_SUCCESS,
        order,
      };
    }
    case types.GET_ORDER_POS_BY_ID_FAILURE:
      return {
        ...state,
        status: types.GET_ORDER_POS_BY_ID_FAILURE,
        order: null,
      };

    default:
      return { ...state };
  }
}
