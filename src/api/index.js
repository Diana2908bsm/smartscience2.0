import axios from 'axios'
import { useAuthStore } from '@/stores/auth';
// import store from '../stores';

axios.defaults.baseURL = 'https://gotta-shift-hydrogen-gui.trycloudflare.com/api/';
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
//Добавляет к каждому запросу userId
axios.interceptors.request.use((config) => {
  if (!config.url.includes('auth/verifyuser') && !config.url.includes('auth/login') && !config.url.includes('auth/activate') && !config.url.includes('auth/refreshtoken')) {
    const authStore = useAuthStore()
    let params = new URLSearchParams()
    if (authStore.userId) {
      const baseUrl = config.url.replace(/\/$/, '');
      config.url = `${baseUrl}/${authStore.userId}`;
    }
    if (authStore.token) {
      config.headers['Authorization'] = `Bearer ${authStore.token}`
    }

  }
  return config
})

axios.interceptors.response.use((response) => {

  return response
}, async function (error) {
  const authStore = useAuthStore()
  const originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    try {
      const newTokens = await axios.post(`auth/refreshtoken`, {
        refreshToken: JSON.parse(localStorage.getItem('userInfo')).refreshToken,
        jwtToken: JSON.parse(localStorage.getItem('userInfo')).token
      })
      authStore.token = newTokens.data.token
    } catch (err) {
      console.log(err)
    }
  }
})

// // Перехватчик ответов для обработки ошибок 401
// axios.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await store.dispatch('login/refreshTokens');
//         const newToken = store.getters['login/token'];
//         console.log('Новый токен:', newToken);
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         console.error('Не удалось обновить токен:', refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axios;