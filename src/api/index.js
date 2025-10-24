import axios from 'axios'
import { useAuthStore } from '@/stores/auth';

let baseUrl = process.env.NODE_ENV === 'development' ? 'https://localhost:7236/api' : 'https://smartsciencebackendtest.loca.lt/api/';

axios.defaults.baseURL = baseUrl;
//Добавляет к каждому запросу userId
axios.interceptors.request.use((config) => {
  if (!config.url.includes('auth/verifyuser') && !config.url.includes('auth/login') && !config.url.includes('auth/activate') && !config.url.includes('auth/refreshtoken')) {
    const authStore = useAuthStore()
    const userId = authStore.userId;
    if (userId && !config.url.includes(userId)) {
      const baseUrl = config.url.replace(/\/$/, '');
      config.url = `${baseUrl}/${userId}`;
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
  }
  return config
})
axios.defaults.headers.common['bypass-tunnel-reminder'] = 'true';
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
      authStore.token = newTokens.data
      localStorage.setItem('userInfo', JSON.stringify({
        token: authStore.token,
        refreshToken: authStore.refreshToken,
        userId: authStore.userId
      }))
      originalRequest.headers['Authorization'] = `Bearer ${authStore.token}`;
      return axios(originalRequest);
    } catch (err) {
      console.log(err)
      authStore.logout()
    }
  }
})


export default axios;