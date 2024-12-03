import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/verify-password',
      name: 'verifyPassword',
      component: () => import('../views/VerifyPassword.vue')
    },
    {
      path: '/create-password',
      name: 'createPassword',
      component: () => import('../views/CreatePassword.vue')
    }

  ],
})

export default router
