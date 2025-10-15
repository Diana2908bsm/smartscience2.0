<script setup>
import AppLayoutAuth from '@/layouts/AppLayoutAuth.vue';
import validateEmail from '@/utils/email-validation.js'
import { useAuthStore } from '@/stores/auth';
import { ref, computed } from 'vue';

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref(false)


const validate = () => {
  if (email.value) {
    error.value = !validateEmail(email.value)
  }
}
const clear_error = () => {
  error.value = false;
}
const submitLogin = async () => {
  validate();
  if (error.value) return;
  await authStore.login(email.value)
}
const can_continue = computed(() => email.value.length >= 3 && !error.value)
</script>
<template>
  <AppLayoutAuth>
    <template #name>
      Научные сотрудники ВУЗа
    </template>
    <template #title>
      Вход
    </template>
    <template #form>
      <form class="auth-form" @submit.prevent="submitLogin">
        <div class="input-field">
          <label>Email</label>
          <ui-input type="text" v-model="email" :error="error" autocomplete="username email" @input="clear_error"
            required @blur="validate" />
          <span v-if="error" class="error">Кажется, адрес почты некорректный</span>
        </div>
        <input v-model="password" type="password" autocomplete="current-password" class="d-none" hidden />
        <div class="auth-button">
          <iu-button type="submit" sample="primary" size="lg" :loading="authStore.loading"
            :disabled="!can_continue">Войти</iu-button>
        </div>
        <div v-if="authStore.errorMessage" class="error">
          {{ authStore.errorMessage }}
        </div>
      </form>
    </template>
  </AppLayoutAuth>
</template>
