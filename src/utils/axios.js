import axios from "axios";
import { store } from "../store/store";



const api = axios.create({
      // baseURL: "http://127.0.0.1:8000/api/",

  baseURL: "https://phplaravel-1626350-6427540.cloudwaysapps.com/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 10000,
});

export const setApiLanguage = (language) => {
  api.defaults.headers.common["Accept-Language"] = language;
};

api.interceptors.request.use(
  (config) => {
    const publicEndpoints = ["/login"];
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint),
    );

    if (!isPublicEndpoint) {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn("No authentication token found for protected endpoint");
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.error("Unauthorized access - redirecting to login");
      } else if (error.response?.status === 403) {
        console.error("Forbidden access");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
