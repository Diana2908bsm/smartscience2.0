import axios from 'axios'
import { useAuthStore } from '@/stores/auth';

axios.defaults.baseURL = 'https://smartsciencebackendtest.loca.lt/api/';
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
      authStore.token = newTokens.data.token
    } catch (err) {
      console.log(err)
      authStore.logout()
    }
  }
})


export default axios;