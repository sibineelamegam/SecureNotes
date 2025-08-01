// src/api/axios.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies like access/refresh token
});

export default axiosInstance;
