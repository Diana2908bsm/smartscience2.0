<script setup>
import AppLayoutProfile from '@/layouts/AppLayoutProfile.vue';
import Spinner from '@/components/UI/spinner/Spinner.vue';
import InfoPerson from '@/components/Info/InfoPerson.vue';
import { manyIcon } from '../components/icons'
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const useUserInfo = useUserStore()
onMounted( async()=>{
  await useUserInfo.getInfo()
})
</script>
<template>
  <spinner v-if="useUserInfo.loading"></spinner>
  <AppLayoutProfile v-else>
    <template #profile-top>
      <h1 class="profile">Личный кабинет сотруника</h1>
      <router-link to="/edit-password" class="profile__setting">
        <many-icon name="personSetting"></many-icon>
        <span>Настройка</span>
      </router-link>
    </template>
    <template #info>
      <info-person :userInfo="useUserInfo.userInfo"></info-person>
    </template>
  </AppLayoutProfile>
</template>
