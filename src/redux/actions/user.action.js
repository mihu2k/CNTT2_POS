import { trackPromise } from 'react-promise-tracker';
import { showToastMsg } from '../../common/utils';
import { UserService } from '../../services/user.service';
import * as types from '../types';

export const getEmployeesRequest = (query) => async (dispatch) => {
  dispatch({ type: types.GET_EMPLOYEES_REQUEST });

  try {
    const response = await trackPromise(UserService.getEmployees(query));
    dispatch({ type: types.GET_EMPLOYEES_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.GET_EMPLOYEES_FAILURE, payload: error });
  }
};

export const createEmployeeRequest =
  (data, cb = () => {}) =>
  async (dispatch) => {
    dispatch({ type: types.CREATE_EMPLOYEE_REQUEST });

    try {
      const response = await trackPromise(UserService.createEmployee(data));
      dispatch({ type: types.CREATE_EMPLOYEE_SUCCESS, payload: response });
      showToastMsg('success', 'Tạo thành công.', {
        toastId: 'MH',
        autoClose: 2500,
        onClose: cb,
      });
    } catch (error) {
      dispatch({ type: types.CREATE_EMPLOYEE_FAILURE, payload: error });
      showToastMsg('error', 'Tạo thất bại.', {
        toastId: 'MH',
        autoClose: 2500,
      });
    }
  };

export const updateEmployeeRequest =
  (id, updateData, cb = () => {}) =>
  async (dispatch) => {
    dispatch({ type: types.UPDATE_EMPLOYEE_REQUEST });

    try {
      const response = await trackPromise(
        UserService.updateEmployee(id, updateData),
      );
      dispatch({ type: types.UPDATE_EMPLOYEE_SUCCESS, payload: response });
      showToastMsg('success', 'Cập nhật thành công.', {
        toastId: id,
        autoClose: 2500,
        onClose: cb,
      });
    } catch (error) {
      dispatch({ type: types.UPDATE_EMPLOYEE_FAILURE, payload: error });
      showToastMsg('error', 'Cập nhật thất bại.', {
        toastId: id,
        autoClose: 2500,
      });
    }
  };
