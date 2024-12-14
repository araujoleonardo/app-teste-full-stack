import axios from 'axios';
import { useAuthStore } from "@/stores/useAuth.js";

const baseURL = import.meta.env.NODE === 'production'
  ? window.location.origin
  : import.meta.env.VITE_BASE_URL;

const apiAuth = axios.create({
  baseURL: `${baseURL}/api`,
});

apiAuth.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token; // Obtem o token atualizado
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiAuth;
