<script setup>
import AppLayoutProfile from '@/layouts/AppLayoutProfile.vue';
import InfoPerson from '@/components/Info/InfoPerson.vue';
import { manyIcon } from '../components/icons'
import { useUserStore } from '@/stores/user';

const useUserInfo = useUserStore ()
</script>
<template>
  <AppLayoutProfile>
    <template #profile-top>
      <h1 class="profile">Личный кабинет сотруника</h1>
      <router-link to="/edit-password" class="profile__setting">
        <many-icon name="personSetting"></many-icon>
        <span>Настройка</span>
      </router-link>
    </template>
    <template #info>
      <spinner v-if="loading"></spinner> 
      <info-person :userInfo="useUserInfo.userInfo"></info-person>
    </template>
  </AppLayoutProfile>
</template>
