import { showToastMsg } from '../../common/utils';
import { OrderService } from '../../services/order.service';
import * as types from '../types';
import { trackPromise } from 'react-promise-tracker';

export const createOrderRequest =
  (data, cb = () => {}) =>
  async (dispatch) => {
    dispatch({ type: types.CREATE_ORDER_REQUEST });

    try {
      const response = await trackPromise(OrderService.create(data));
      dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: response });
      cb();
    } catch (error) {
      dispatch({ type: types.CREATE_ORDER_FAILURE, payload: error });
    }
  };

export const getAllOrdersOfPosRequest = (query) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_ORDERS_POS_REQUEST });

  try {
    const response = await trackPromise(OrderService.getAllForPos(query));
    dispatch({ type: types.GET_ALL_ORDERS_POS_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.GET_ALL_ORDERS_POS_FAILURE, payload: error });
  }
};

export const getAllOrdersRequest = (query) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_ORDERS_REQUEST });

  try {
    const response = await trackPromise(OrderService.getAll(query));
    dispatch({ type: types.GET_ALL_ORDERS_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.GET_ALL_ORDERS_FAILURE, payload: error });
  }
};

export const getOrderByIdRequest = (id) => async (dispatch) => {
  dispatch({ type: types.GET_ORDER_BY_ID_REQUEST });

  try {
    const response = await OrderService.getOneById(id);
    dispatch({ type: types.GET_ORDER_BY_ID_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_BY_ID_FAILURE, payload: error });
  }
};

export const getOrderByIdOfPosRequest = (id) => async (dispatch) => {
  dispatch({ type: types.GET_ORDER_POS_BY_ID_REQUEST });

  try {
    const response = await trackPromise(OrderService.getOneByIdForPos(id));
    dispatch({ type: types.GET_ORDER_POS_BY_ID_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_POS_BY_ID_FAILURE, payload: error });
  }
};

export const updateOrderStatusRequest =
  (orderId, status) => async (dispatch) => {
    dispatch({ type: types.UPDATE_ORDER_STATUS_REQUEST });

    try {
      const response = await trackPromise(
        OrderService.updateStatus(orderId, status),
      );
      dispatch({ type: types.UPDATE_ORDER_STATUS_SUCCESS, payload: response });
      showToastMsg('success', 'Cập nhật trạng thái thành công.', {
        toastId: orderId,
        autoClose: 3000,
      });
    } catch (error) {
      dispatch({ type: types.UPDATE_ORDER_STATUS_FAILURE, payload: error });
      showToastMsg('error', 'Cập nhật trạng thái thất bại.', {
        toastId: orderId,
        autoClose: 3000,
      });
    }
  };
