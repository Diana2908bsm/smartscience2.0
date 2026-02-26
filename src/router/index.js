import { createRouter, createWebHistory } from 'vue-router'
import SidebarLayout from '@/components/sideBar/sidebarLayot.vue'
import { useAuthStore } from '@/stores/auth';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: SidebarLayout,
      meta: { auth: true },
      children: [
        {
          path: 'faculties',
          component: import('@/modules/faculties/views/FacultiesView.vue')
        },
        {
          path: '/publications',
          component: import('@/modules/publications/view/PublicationView.vue')
        },
        {
          path: '/profile',
          component: import('@/modules/profile/view/ProfileView.vue')
        },
        {
          path: '/indicators/years',
          component: import('../views/IndicatorsYearsView.vue')
        },
        {
          path: '/indicators/actual',
          component: import('../views/IndicatorsView.vue')
        },
      ]

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
      path: '/create-password',
      name: 'CreatePassword',
      component: () => import('../views/CreatePassword.vue')
    },
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
