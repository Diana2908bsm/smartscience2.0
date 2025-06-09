import axios from 'axios'
import store from '../stores';

axios.defaults.baseURL = 'https://smartsciencebackendtest.loca.lt/api/';
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.common['bypass-tunnel-reminder'] = 'true';
// Перехватчик запросов для добавления токена
axios.interceptors.request.use(config => {
  const token = store.getters['auth/token'];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Перехватчик ответов для обработки ошибок 401
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await store.dispatch('login/refreshTokens');
        const newToken = store.getters['login/token'];
        console.log('Новый токен:', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Не удалось обновить токен:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;