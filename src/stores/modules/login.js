import axios from '@/api'
import router from '@/router'

export default {
  state: {
    errorMessage: '',
    userId: localStorage.getItem('userId') || '',
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || ''
  },
  mutations: {
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message;
    },
    SET_AUTH_TOKENS(state, { token, refreshToken }) {
      state.token = token;
      state.refreshToken = refreshToken;
    },
    SET_USERID(state, userId) {
      state.userId = userId;
    },
    CLEAR_AUTH_DATA(state) {
      state.token = '';
      state.refreshToken = '';
      state.userId = '';
    }
  },
  getters: {
    apiErrorMessage: state => state.errorMessage,
    token: state => state.token,
    refreshToken: state => state.refreshToken,
    userId: state => state.userId
  },
  actions: {
    async login({ commit, rootState, state }, authData) {
      try {
        const email = rootState.verifyuser.email;
        const response = await axios.post('auth/login', {
          ...authData,
          email
        });
        const { userId, tokenInfo } = response.data
        const { token, refreshToken } = tokenInfo;

        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        commit('SET_AUTH_TOKENS', { token, refreshToken });
        commit('SET_USERID', userId);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        router.push('/');
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Ошибка при регистрации';
        commit('SET_ERROR_MESSAGE', errorMessage);
        commit('CLEAR_AUTH_DATA');
        localStorage.clear();
        router.push('/login')
      }
    },
    async refreshTokens({ state, commit }) {
      try {
        const response = await axios.post('auth/refreshtoken', {
          refreshToken: state.refreshToken,
          jwtToken:state.token
        });
        const newToken = response.data;
        commit('SET_AUTH_TOKENS', { token: newToken, refreshToken: state.refreshToken });
    
        localStorage.setItem('token', newToken);
    
        axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        console.error('Ошибка обновления токенов:', error);
        commit('CLEAR_AUTH_DATA');
        localStorage.clear();
        router.push('/login');
      }
    },
    logout ({ commit }){
      commit('CLEAR_AUTH_DATA');
      localStorage.clear();
      console.log('Данные после очистки localStorage:', localStorage.getItem('userId'), localStorage.getItem('token'), localStorage.getItem('refreshToken'));
      router.push('/login');
    }
  },
  namespaced: true
}