import { OrderService } from '../../services/order.service';
import * as types from '../types';

export const createOrderRequest =
  (data, navigate = null) =>
  async (dispatch) => {
    dispatch({ type: types.CREATE_ORDER_REQUEST });

    try {
      const response = await OrderService.create(data);
      dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: response });
      // navigate &&
      //   navigate(config.routes.orderConfirmation, {
      //     state: { orderId: response.data.data._id },
      //   });
    } catch (error) {
      dispatch({ type: types.CREATE_ORDER_FAILURE, payload: error });
    }
  };

export const getAllOrdersOfPosRequest = (query) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_ORDERS_POS_REQUEST });

  try {
    const response = await OrderService.getAllForPos(query);
    dispatch({ type: types.GET_ALL_ORDERS_POS_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.GET_ALL_ORDERS_POS_FAILURE, payload: error });
  }
};

export const getOrderByIdOfPosRequest = (id) => async (dispatch) => {
  dispatch({ type: types.GET_ORDER_POS_BY_ID_REQUEST });

  try {
    const response = await OrderService.getOneByIdForPos(id);
    dispatch({ type: types.GET_ORDER_POS_BY_ID_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.GET_ORDER_POS_BY_ID_FAILURE, payload: error });
  }
};
