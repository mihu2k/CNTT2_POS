import qs from 'qs';
import httpRequest from '../common/utils/httpRequest';

export const ProductService = {
  async getAll(query) {
    const response = await httpRequest.get('/product', {
      params: query,
      paramsSerializer: (params) => qs.stringify(params),
    });
    console.log(response, 'RESPONSE');
    return response;
  },

  async create(data) {
    const response = await httpRequest.post('/product', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },
};
