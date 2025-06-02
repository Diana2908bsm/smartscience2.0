<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

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
</template>
