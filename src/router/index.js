import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }// для этой страницы необходимо залогиниться
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
      path: '/works',
      name: 'WorksView',
      component: () => import('../views/WorksView.vue')
    },
    {
      path: '/indicators',
      name: 'IndicatorsView',
      component: () => import('../views/IndicatorsView.vue')
    }

  ],
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); 
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) { 
    next('/login'); 
  } else {
    next();
  }
});
export default router
