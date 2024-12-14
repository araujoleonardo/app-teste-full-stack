import axios from 'axios';

const baseURL = import.meta.env.NODE === 'production'
  ? window.location.origin
  : import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseURL+'/api',
});

export default api;
