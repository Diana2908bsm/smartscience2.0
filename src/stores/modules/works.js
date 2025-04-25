import axios from "axios";
import { debounce } from "lodash";

export default {
    state:{
        works:{},
        userId:localStorage.getItem('userId') || '',
        loading: false,
    },
    mutations: {
        SET_WORKS(state,works){
            state.works = works
        },
        SET_LOADING(state,loading){
            state.loading = loading
        }
    },
    getters: {
        works: state=>state.works,
    },
    actions:{
        async getWorks({commit,rootState}){
            commit('SET_LOADING', true);

            try {
                const works = await axios.get(`publications/get?userId=${rootState.login.userId}`)
                commit('SET_WORKS', works.data.data)
            } catch (error){
                commit('SET_LOADING', false);
            } finally {
                commit('SET_LOADING',false)
            }


        },
        filterSearch: debounce( async ({commit,rootState},query)=>{
             try {
                const { data } = await axios.get(`publications/get?userId=${rootState.login.userId}&Title=${query}`)
                commit('SET_WORKS', data.data)
            } catch (error) {
                console.log('Ошибка при загрузке')
            }
        }, 500)
    }
}