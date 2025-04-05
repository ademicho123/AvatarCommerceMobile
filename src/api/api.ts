// api.ts - All API endpoints and calls
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api';
const api = axios.create({ baseURL: BASE_URL });

// Auth API
export const registerUser = (userData) => 
  api.post('/auth/register', userData);

export const loginUser = (credentials) => 
  api.post('/auth/login', credentials);

// Avatar API
export const createAvatar = (formData, token) => 
  api.post('/avatar/create', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });

// Affiliate API
export const addAffiliate = (data, token) => 
  api.post('/affiliate', data, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

export const getAffiliates = (token) => 
  api.get('/affiliate', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

// Chat API
export const sendChatMessage = (data) => 
  api.post('/chat', data);

export const getChatInfo = (username) => 
  api.get(`/chat/${username}`);

// Analytics API
export const getDashboardData = (token) => 
  api.get('/analytics/dashboard', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

// Request interceptor for adding token
export const setAuthToken = (token) => {
  api.interceptors.request.use(
    config => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
};

export default api;