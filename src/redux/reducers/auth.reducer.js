import * as types from '../types';

const initialState = {
  profile: null,
  status: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        status: types.LOGIN_REQUEST,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        status: types.LOGIN_SUCCESS,
        profile: action.payload.data,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        status: types.LOGIN_FAILURE,
        profile: null,
      };

    // case types.LOGOUT:
    //   localStorage.removeItem('profile');
    //   return {
    //     ...state,
    //     status: null,
    //     profile: null,
    //   };
    // case types.CHECK_TOKEN_REQUEST:
    //   return {
    //     ...state,
    //     status: 'pending',
    //   };
    // case types.CHECK_TOKEN_SUCCESS:
    //   return {
    //     ...state,
    //     status: types.CHECK_TOKEN_SUCCESS,
    //     profile: action.payload?.data?.data,
    //   };
    // case types.CHECK_TOKEN_FAILURE:
    //   return {
    //     ...state,
    //     status: 'failure',
    //     profile: null,
    //   };

    default:
      return { ...state };
  }
}
