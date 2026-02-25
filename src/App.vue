<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import HeaderPage from './components/header/HeaderPage.vue';
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'   
const authStore = useAuthStore()
const Info = JSON.parse(localStorage.getItem('userInfo'))
if (Info) {
  authStore.token = Info.token
  authStore.refreshToken = Info.refreshToken
  authStore.userId = Info.userId
}
</script>
<template>
  <HeaderPage />
  <RouterView />
  <Toast />
  <ConfirmDialog />
</template>
