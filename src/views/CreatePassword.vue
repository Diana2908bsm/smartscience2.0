<script setup>
import { manyIcon } from '@/components/icons'
import AppLayoutAuth from '@/layouts/AppLayoutAuth.vue';
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const useAuth = useAuthStore()
const newPassword = ref('')
const email = ref('')
const is_eye_opened = ref(false)
const error = ref(null)

const clear_error = () => {
  error.value = null
}
const toggle_eye = () => {
  is_eye_opened.value = !is_eye_opened.value
}
const inputType = computed(()=> is_eye_opened.value ? 'text':'password')
const strength = computed(() => {
  const value = newPassword.value
  return {
    length: value.length >= 8,
    number: /[0-9]/.test(value),
    uc_char: /[A-ZА-Я]/.test(value),
    special_char: /[^a-zA-Zа-яА-Я0-9]/.test(value),
  }
})
const is_invalid = computed(()=>{
  return !(strength.value.length && strength.value.number && strength.value.uc_char && strength.value.special_char)
})

const submitCreatePassword = async() =>{
  await useAuth.createPassword(newPassword.value)
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
      Cоздание пароля
    </template>
    <template #form>
  <form class="auth-form" @submit.prevent="submitCreatePassword">
    <input type="text" autocomplete="username email" :value="email" hidden class="d-none" />
    <div class="input-field input-eye">
      <label for="password">Пароль</label>
      <ui-input :type="inputType" v-model="newPassword" required :error="error" autocomplete="current-password"
        @input="clear_error" />
      <i :class="['fa', 'icon-eye', is_eye_opened ? 'fa-eye' : 'fa-eye-slash']" @click="toggle_eye"></i>
    </div>
    <div class="password-strength" :class="{ success: !is_invalid }">
      <p>Пароль должен содержать:</p>
      <div class="password-box">
        <i :class="['fa', 'fa-check', strength.length ? 'password-success' : 'password-muted']"></i>
        <p :class="['text-password', strength.length ? 'text-success' : 'text-muted']">8 символов</p>
      </div>
      <div class="password-box">
        <i :class="['fa', 'fa-check', strength.number ? 'password-success' : 'password-muted']"></i>
        <p :class="['text-password', strength.number ? 'text-success' : 'text-muted']">Одну цифру</p>
      </div>
      <div class="password-box">
        <i :class="['fa', 'fa-check', strength.uc_char ? 'password-success' : 'password-muted']"></i>
        <p :class="['text-password', strength.uc_char ? 'text-success' : 'text-muted']">Одну заглавную букву</p>
      </div>
      <div class="password-box">
        <i :class="['fa', 'fa-check', strength.special_char ? 'password-success' : 'password-muted']"></i>
        <p :class="['text-password', strength.special_char ? 'text-success' : 'text-muted']">Неалфавитные символы(!? и
          т.д)</p>
      </div>
    </div>
    <div class="auth-button">
      <iu-button type="submit" sample="primary" :loading="useAuth.loading" :disabled="is_invalid" size="lg">Войти</iu-button>
    </div>
  </form>
    </template>
  </AppLayoutAuth>
</template>
