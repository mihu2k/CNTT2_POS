import { showToastMsg } from '../../common/utils';
import routes from '../../router/list.route';
import { AuthService } from '../../services/auth.service';
import * as types from '../types';

export const loginRequest = (data) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });

  try {
    const response = await AuthService.login(data);
    console.log('SUCCESS', response);
    dispatch({ type: types.LOGIN_SUCCESS, payload: response });
  } catch (error) {
    console.log(error, 'ERROR REQ');
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
    const msg = error.response?.data?.message ?? 'Đăng nhập thất bại.';
    showToastMsg('error', msg, { toastId: error.response?.data?.status });
  }
};

export const logoutRequest = () => (dispatch) => {
  dispatch({ type: types.LOGOUT });
};
