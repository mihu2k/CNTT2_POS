import qs from 'qs';
import httpRequest from '../common/utils/httpRequest';

export const OrderService = {
  async create(data) {
    const response = await httpRequest.post('/order/pos', data);
    return response;
  },
  async getAllForPos(query) {
    const response = await httpRequest.get('/order/pos', {
      params: query,
      paramsSerializer: (params) => qs.stringify(params),
    });
    return response;
  },
};
