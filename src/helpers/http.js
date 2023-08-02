import axios from 'axios';
// import {BACKEND_URL} from '@env';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const instance = axios.create({
    // baseURL: BACKEND_URL,
    baseURL: 'https://nervous-waders-cod.cyclic.app',
    headers,
  });

  return instance;
};

export default http;
