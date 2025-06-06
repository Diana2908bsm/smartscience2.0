<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useUserStore } from './stores/user';
import { onMounted } from 'vue';
const authStore = useAuthStore()
const useUserInfo = useUserStore()
const Info = JSON.parse(localStorage.getItem('userInfo'))
if (Info) {
  authStore.token = Info.token
  authStore.refreshToken = Info.refreshToken
  authStore.userId = Info.userId
}
onMounted(()=>{
   useUserInfo.getInfo()
})

</script>
<template>
  <RouterView />
</template>
