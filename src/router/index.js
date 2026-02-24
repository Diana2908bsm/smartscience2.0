import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/modules/profile/view/ProfileView.vue'),
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
      component: () => import('@/modules/publications/view/PublicationView.vue'),
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
      name: 'CreatePassword',
      component: () => import('../views/CreatePassword.vue')
    },
    {
      path: '/faculties',
      name: 'Faculties',
      component: () => import('../modules/faculties/views/FacultiesView.vue')
    }

  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.auth && !authStore.token) {
    next('/login')
  }
  else {
    next();
  }
});
export default router
