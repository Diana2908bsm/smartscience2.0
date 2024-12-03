import { createStore } from 'vuex'
// import info from './modules/info'
import verifyuser from './modules/verifyuser'

export default createStore({

  modules: {
    verifyuser,
  }
})