import axios from 'axios';
const URL_API = 'https://sandbox.revobank.com.br/revobank/api';

export const api = axios.create({
  baseURL: URL_API,
});

api.interceptors.request.use(response => {
  return response;
});
