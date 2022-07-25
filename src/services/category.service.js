import httpRequest from '../common/utils/httpRequest';

export const CategoryService = {
  async getAll(query) {
    const response = await httpRequest.get('/category', { params: query });
    return response;
  },
};
