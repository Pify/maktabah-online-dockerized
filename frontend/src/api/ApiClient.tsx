import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../auth/AuthStore";

const instance = axios.create({
  baseURL: "/api",
});

// Interceptor to add token only to protected routes
instance.interceptors.request.use(
  (config) => {
    // List of public routes (where we don't want to attach the token)
    const publicRoutes = ['/auth/login', '/auth/register'];
    const isPublic = publicRoutes.some((route) => config.url === route);

    if (!isPublic) {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to catch auth errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      toast.error("Session expired. Please sign in again");
    }

    return Promise.reject(error);
  }
);

export default instance;