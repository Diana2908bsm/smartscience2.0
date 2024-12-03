<template>
  <form class="auth-form" @submit.prevent="submitLogin">
    <div class="input-field">
      <ui-input type="text"
                v-model="email"
                :error="error"
                autocomplete="username email"
                @input="clearError" required
                @blur="validate" />
      <span v-if="error" class="error">Кажется, адрес почты некорректный</span>
    </div>
    <input v-model="password" type="password" autocomplete="current-password" class="d-none" hidden />
    <div class="auth-button">
      <iu-button type="submit" sample="primary" size="lg" :disabled="!canContinue">Войти</iu-button>
    </div>
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>
  </form>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import validateEmail from '@/utils/email-validation.js'

const store = useStore();

const email = ref('');
const error = ref(false);

const validate = () => {
  if (email.value) {
    error.value = !validateEmail(email.value);
  }
}
const clearError = () => {
  error.value = false;
}
const submitLogin = async () => {
  validate();
  try {
    await store.dispatch('login', { email: email.value, password: password.value });
  } catch (err) {
    error.value = true;
  }
}

const canContinue = computed(() => !error.value && email.value.length >= 3);
const errorMessage = computed(() => store.getters.errorMessage);
</script>