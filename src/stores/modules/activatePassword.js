import axios from '@/api'
import router from '@/router'

export default {
  state: {
    errorMessages: '',

  },
  mutations: {
    SET_ERROR_MESSAGE(state, message) {
      state.errorMessage = message
    }
  },
  getters: {
    activetePasswordError: state => state.errorMessage,
  },
  actions: {
    async activate ({commit, rootState}, authData){
        try{
            const email = rootState.verifyuser.email;
            const response = await axios.post('auth/activate', {
                ...authData,
                email
            })
            console.log(response)
            router.push('/login');
        } catch (error){
            const errorMessage = error.response?.data?.message
            commit('SET_ERROR_MESSAGE', errorMessage)
        }
    }
  }
}
