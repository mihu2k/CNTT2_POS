import qs from 'qs';
import httpRequest from '../common/utils/httpRequest';

export const OrderService = {
  async create(data) {
    const response = await httpRequest.post('/order/pos', data);
    return response;
  },
};
