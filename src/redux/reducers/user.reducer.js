import * as types from '../types';

const initialState = {
  user: null,
  users: [],
  status: null,
  totalPage: 1,
  totalRecord: 0,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_EMPLOYEES_REQUEST:
      return {
        ...state,
        status: types.GET_EMPLOYEES_REQUEST,
      };
    case types.GET_EMPLOYEES_SUCCESS: {
      const users = action.payload.data?.data ?? [];
      const totalPage = action.payload.data?.totalPage ?? 1;
      const totalRecord = action.payload.data?.totalRecord ?? 0;
      return {
        ...state,
        status: types.GET_EMPLOYEES_SUCCESS,
        users,
        totalPage,
        totalRecord,
      };
    }
    case types.GET_EMPLOYEES_FAILURE:
      return {
        ...state,
        users: [],
        totalPage: 1,
        totalRecord: 0,
        status: types.GET_EMPLOYEES_FAILURE,
      };
    // get single product
    // case types.GET_PRODUCT_REQUEST:
    //   return {
    //     ...state,
    //     status: types.GET_PRODUCT_REQUEST,
    //   };
    // case types.GET_PRODUCT_SUCCESS: {
    //   return {
    //     ...state,
    //     status: types.GET_PRODUCT_SUCCESS,
    //     product: action.payload?.data,
    //   };
    // }
    // case types.GET_PRODUCT_FAILURE:
    //   return {
    //     ...state,
    //     status: types.GET_PRODUCT_FAILURE,
    //     product: null,
    //   };
    case types.CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        status: types.CREATE_EMPLOYEE_REQUEST,
      };
    case types.CREATE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        status: types.CREATE_EMPLOYEE_SUCCESS,
      };
    }
    case types.CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        status: types.CREATE_EMPLOYEE_FAILURE,
      };
    // // delete product
    // case types.DELETE_PRODUCT_REQUEST:
    //   return {
    //     ...state,
    //     status: types.DELETE_PRODUCT_REQUEST,
    //   };
    // case types.DELETE_PRODUCT_SUCCESS: {
    //   return {
    //     ...state,
    //     status: types.DELETE_PRODUCT_SUCCESS,
    //   };
    // }
    // case types.DELETE_PRODUCT_FAILURE:
    //   return {
    //     ...state,
    //     status: types.DELETE_PRODUCT_FAILURE,
    //   };
    case types.UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        status: types.UPDATE_EMPLOYEE_REQUEST,
      };
    case types.UPDATE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        status: types.UPDATE_EMPLOYEE_SUCCESS,
      };
    }
    case types.UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        status: types.UPDATE_EMPLOYEE_FAILURE,
      };

    default:
      return { ...state };
  }
}
