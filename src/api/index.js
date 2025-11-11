import axios from 'axios'
import { useAuthStore } from '@/stores/auth';

let baseUrl = 'https://smartsciencebackendtest.loca.lt/api/';

axios.defaults.baseURL = baseUrl;

const EXCLUDED_URLS = [
  'auth/verifyuser',
  'auth/login',
  'auth/activate',
  'auth/refreshtoken',
  'faculties'
];
//Добавляет к каждому запросу userId
axios.interceptors.request.use((config) => {
    const isExcluded = EXCLUDED_URLS.some(url => config.url.includes(url));
  if (!isExcluded) {
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