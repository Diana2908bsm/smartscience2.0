
import axios from '@/api'
import router from '@/router'

export default {
  state: {
    needToActivate: null,
    errorMessage: '',
    email: localStorage.getItem('email') || ''
  },
  mutations: {
    SET_ERROR_MESSAGE (state, message) {
      state.errorMessage = message
    },
    SET_EMAIL (state, email) {
      state.email = email
      localStorage.setItem('email', email);
    },
    SET_needToActivate (state, needToActivate) {
      state.needToActivate = needToActivate
    }
  },
  getters: {
    errorMessage: state => state.errorMessage,
    email: state => state.email,
    needToActivate: state => state.needToActivate
  },
  actions: {
    async verifyuser ({ commit }, authData) {
      try {
        commit('SET_EMAIL', authData.email)
        const response = await axios.get('auth/verifyuser', {
          params: authData
        })
        const { needToActivate } = response.data
        commit('SET_needToActivate', needToActivate)

        if (needToActivate) {
          router.push('/create-password')
        } else {
          router.push('/verify-password')
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Ошибка при регистрации'
        commit('SET_ERROR_MESSAGE', errorMessage)
      }
    }
  }
}
