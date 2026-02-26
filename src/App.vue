<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import sidebarLayot from './components/sideBar/sidebarLayot.vue';
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'   
import SidebarLayot from './components/sideBar/sidebarLayot.vue';
const authStore = useAuthStore()
const Info = JSON.parse(localStorage.getItem('userInfo'))
if (Info) {
  authStore.token = Info.token
  authStore.refreshToken = Info.refreshToken
  authStore.userId = Info.userId
}
</script>
<template>
  <RouterView />
  <Toast />
  <ConfirmDialog />
</template>
