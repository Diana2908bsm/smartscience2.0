import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { auth: true } // для этой страницы необходимо залогиниться
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/verify-password',
      name: 'VerifyPassword',
      component: () => import('@/views/VerifyPassword.vue')
    },
    {
      path: '/publications',
      name: 'Publications',
      component: () => import('../views/PublicationsView.vue'),
      meta: { auth: true }
    },
    {
      path: '/indicators/actual',
      name: 'IndicatorsView',
      component: () => import('../views/IndicatorsView.vue'),
      meta: { auth: true }
    },
    {
      path: '/indicators/years',
      name: 'IndicatorsYearsView',
      component: () => import('../views/IndicatorsYearsView.vue'),
      meta: { auth: true }
    },
    {
      path: '/create-password',
      name: 'CreatePasswprd',
      component: () => import('../views/CreatePassword.vue')
    }
    
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.auth && !authStore.token){
    next('/login')
  }
  else {
     next();
  }
});
export default router
