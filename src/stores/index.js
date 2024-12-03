import { createStore } from 'vuex'
// import info from './modules/info'
import login from './modules/login'

export default createStore({

  modules: {
    login,
  }
})