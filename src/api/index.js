import axios from 'axios'
axios.defaults.baseURL = 'https://necessarily-las-rebate-collecting.trycloudflare.com/api/'
axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token')
export default axios
