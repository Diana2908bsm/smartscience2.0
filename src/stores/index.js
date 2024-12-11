import { createStore } from 'vuex'
import verifyuser from './modules/verifyuser'
import activatePassword from './modules/activatePassword'
import login from './modules/login'
import user from './modules/user'

export default createStore({

  modules: {
    verifyuser,
    login,
    activatePassword,
    user
  }
})