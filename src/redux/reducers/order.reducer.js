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

    default:
      return { ...state };
  }
}
