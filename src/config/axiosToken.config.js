// src/config/axiosToken.config.ts
import axios from 'axios';
import { Decrypt_User } from '@/services/Storage_Service';

const getToken = () => {
  try {
    const user = Decrypt_User();

    if (user?.Token) {
      return user.Token;
    }

    const token = localStorage.getItem('token');

    if (token) {
      return token;
    }

    return null;
  } catch {
    return localStorage.getItem('token');
  }
};

axios.interceptors.request.use(
  (config) => {
    const token = getToken();

    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);