<script setup>
import { ref, computed } from 'vue';
import { manyIcon } from '@/components/icons'
import AppLayoutAuth from '@/layouts/AppLayoutAuth.vue';
import { useAuthStore } from '@/stores/auth';

const useAuth = useAuthStore()
const password = ref('')
const email = ref('')
const is_eye_opened = ref(false)
const error = ref(false)

const clear_error = () => {
  error.value = false;
}
const can_continue = computed(() =>
  password.value.length >= 3 && !error.value
)
const toggle_eye = () => {
  is_eye_opened.value = !is_eye_opened.value
}
const inputType = computed(() => is_eye_opened.value ? 'text' : 'password')
const submitVerifyPassword = async () => {
  useAuth.password(password.value)
}
</script>
<template>
  <AppLayoutAuth>
    <template #name>
      Научные сотрудники ВУЗа

      <div class="auth__email-box">
        <many-icon name="emailIcon"></many-icon>
        <span> {{ useAuth.email }}</span>
      </div>
    </template>
    <template #title>
      Введите пароль
    </template>
    <template #form>
      <form class="auth-form" @submit.prevent="submitVerifyPassword">
        <input type="text" autocomplete="username email" :value="email" hidden class="d-none" />
        <div class="input-field">
          <label for="password">Пароль</label>
          <ui-input :type=inputType v-model="password" required :error="error" autocomplete="current-password"
            @input="clear_error" />
          <i :class="['fa', 'icon-eye', is_eye_opened ? 'fa-eye' : 'fa-eye-slash']" @click="toggle_eye"></i>
        </div>
        <span style="display: block;text-align: left;font-size: 11px;" v-if="useAuth.errorMessage" class="error">{{
          useAuth.errorMessage }}</span>
        <div class="input-field" style="text-align: right; padding: 0;">
          <router-link to="/auth/recover-password" class="recover-password">Забыли пароль?</router-link>
        </div>
        <div class="auth-button">
          <iu-button type="submit" sample="primary" :disabled="!can_continue" :loading="useAuth.loading"
            size="lg">Войти</iu-button>
        </div>
      </form>
    </template>
  </AppLayoutAuth>
</template>
