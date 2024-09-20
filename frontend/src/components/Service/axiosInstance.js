import axios from 'axios';
import { getToken } from './tokenService';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Your base URL
});

// Interceptor to add the Authorization header
axiosInstance.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
