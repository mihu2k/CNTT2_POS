import httpRequest from '../common/utils/httpRequest';
import qs from 'qs';

export const UserService = {
  async getEmployees(query) {
    const response = await httpRequest.get('/user/employee', {
      params: query,
      paramsSerializer: (params) => qs.stringify(params),
    });
    return response;
  },

  async createEmployee(data) {
    const response = await httpRequest.post('/user/employee', data);
    return response;
  },

  async updateEmployee(id, data) {
    const response = await httpRequest.put(`/user/employee/${id}`, data);
    return response;
  },
};
