import { createStore } from 'vuex'
import verifyuser from './modules/verifyuser'
import activatePassword from './modules/activatePassword'
import login from './modules/login'

export default createStore({

  modules: {
    verifyuser,
    login,
    activatePassword
  }
})