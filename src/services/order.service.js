import qs from 'qs';
import httpRequest from '../common/utils/httpRequest';

export const OrderService = {
  async create(data) {
    const response = await httpRequest.post('/order/pos', data);
    return response;
  },

  async getAll(query) {
    const response = await httpRequest.get('/order/admin', {
      params: query,
      paramsSerializer: (params) => qs.stringify(params),
    });
    return response;
  },

  async getAllForPos(query) {
    const response = await httpRequest.get('/order/pos', {
      params: query,
      paramsSerializer: (params) => qs.stringify(params),
    });
    return response;
  },

  async getOneById(id) {
    const response = await httpRequest.get(`/order/${id}`);
    return response;
  },

  async getOneByIdForPos(id) {
    const response = await httpRequest.get(`/order/pos/${id}`);
    return response;
  },

  async updateStatus(orderId, status) {
    const response = await httpRequest.patch(`/order/status/${orderId}`, {
      status,
    });
    return response;
  },
};
