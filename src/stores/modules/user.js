import axios from '@/api'

export default {
    state: {
        user: {},
        userId: localStorage.getItem('userId') || '',
        userType: null,
        loading: false

    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
            state.userType = user.userType
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    getters: {
        user: state => state.user,
        userType: state => state.userType,
        loading: state => state.loading
    },
    actions: {
        async getInfo({ commit, rootState}) {
            commit('SET_LOADING', true);
           
            try {
                const userResponse = await axios.get(`users/get/${rootState.login.userId}`)
                commit('SET_USER', userResponse.data.data)
            } catch (error) {
                commit('SET_LOADING', false);
                console.error('Ошибка при загрузке данных пользователя:', error)
            }
            finally {
                commit('SET_LOADING', false); 
            }
        }
    }
}