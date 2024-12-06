import axios from 'axios'
import store from '../stores';

axios.defaults.baseURL = 'https://feels-arrive-vehicles-lobby.trycloudflare.com/api/'

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`

// Добавление перехватчика запросов
axios.interceptors.request.use((config) => {
    const token = store.getters.token || localStorage.getItem('token'); // Получение токена из Vuex или localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
// Добавление перехватчика ответов
axios.interceptors.response.use(
    (response) => response, // Возвращаем ответ, если всё в порядке
    async (error) => {
      const originalRequest = error.config;
  
      // Проверяем, если это ошибка 401 и токен ещё не обновлялся
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Помечаем запрос, чтобы избежать повторных попыток
  
        try {
          // Запрашиваем обновление токенов через Vuex
          await store.dispatch('refreshTokens');
  
          // Повторяем запрос с обновлённым токеном
          const newToken = store.getters.token || localStorage.getItem('token');
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
  
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Ошибка при обновлении токена', refreshError);
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error); // Возвращаем исходную ошибку, если она не связана с 401
    }
  );
  
  export default axios;
