import axios from 'axios'
import { useAuthStore } from '@/stores/auth';
// import store from '../stores';

axios.defaults.baseURL = 'https://naturally-treo-message-instance.trycloudflare.com/api/';
// axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
//Добавляет к каждому запросу userId
axios.interceptors.request.use((config) => {
    console.log(config.url)
    if (!config.url.includes('auth/verifyuser') && !config.url.includes('auth/login') && !config.url.includes('auth/activate')) {
        const authStore = useAuthStore()
        let params = new URLSearchParams()
        if (authStore.userId) {
            console.log(authStore.userId)
            params.append('auth', authStore.userId)
            config.params = params
        }

    }
    return config
})

const axiosApiInstance = axios.create()

axiosApiInstance.interceptors.response.use((response) => {

    return response
}, async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && (originalRequest._retry)) {
        originalRequest._retry = true
        try {
            const newTokens = await axios.post(`auth/refreshtoken`, {
                refresh_token: JSON.parse(localStorage.getItem('userInfo')).refreshToken
            })
            console.log(newTokens.data)
        } catch (err) {
            console.log(err)
        }
    }
    console.log(error)
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