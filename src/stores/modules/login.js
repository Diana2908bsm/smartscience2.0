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

  },
  getters: {
    apiErrorMessage: state => state.errorMessage,
    token: state => state.token,
    refreshToken: state => state.refreshToken,
    userId: state => state.userId
  },
  actions: {
    async login({ commit, rootState }, authData) {
      try {
        const email = rootState.verifyuser.email;
        const response = await axios.post('auth/login', {
          ...authData,
          email
        });
        const { userId, tokenInfo } = response.data
        const { token, refreshToken } = tokenInfo;
        commit('SET_AUTH_TOKENS', { token, refreshToken });
        commit('SET_USERID', userId);

        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        router.push('/');
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Ошибка при регистрации';
        commit('SET_ERROR_MESSAGE', errorMessage);
      }
    },
    async refreshTokens({ state, commit }) {
      try {
        const response = await axios.post('auth/refreshtoken', {
          refreshToken: state.refreshToken
        });
        const { token, refreshToken } = response.data.tokenInfo;
        commit('SET_AUTH_TOKENS', { token, refreshToken });
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      } catch (error) {
        console.log(error)
      }
    }
  },
  namespaced: true
}