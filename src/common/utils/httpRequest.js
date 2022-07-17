import axios from 'axios';

const httpRequest = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_ENDPOINT,
});

httpRequest.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default httpRequest;
