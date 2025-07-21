import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000/';
    }
    return 'https://infusroy-1.onrender.com';
  }
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;
