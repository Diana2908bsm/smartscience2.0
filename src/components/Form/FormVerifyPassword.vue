<template>
  <form class="auth-form" @submit.prevent="submitVerifyPassword">
    <input type="text" autocomplete="username email" :value="email" hidden class="d-none" />
    <div class="input-field">
      <label for="password">Пароль</label>
      <ui-input :type=inputType v-model="password" required :error="error" autocomplete="current-password"
        @input="clear_error" />
      <i :class="['fa', 'icon-eye', is_eye_opened ? 'fa-eye' : 'fa-eye-slash']" @click="toggle_eye"></i>
    </div>
    <span style="display: block;text-align: left;font-size: 11px;" v-if="apiErrorMessage" class="error">{{ apiErrorMessage }}</span>
    <div class="input-field" style="text-align: right; padding: 0;">
      <router-link to="/auth/recover-password" class="recover-password">Забыли пароль?</router-link>
    </div>
    <div class="auth-button">
      <iu-button type="submit" sample="primary" :disabled="!can_continue" size="lg">Войти</iu-button>
    </div>
  </form>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      password: '',
      error: false,
      email: '',
      is_eye_opened: false
    }
  },
  methods: {
    ...mapActions('login',['login']),
    clear_error() {
      this.error = false;
      this.$store.commit('login/SET_ERROR_MESSAGE', '');
    },
    toggle_eye() {
      this.is_eye_opened = !this.is_eye_opened;
    },
    async submitVerifyPassword() {
      try {
        await this.login({ password: this.password })
      } catch (e) {
        this.error = true;
        this.$store.commit('login/SET_ERROR_MESSAGE', 'Ошибка при входе');
      }
    }
  },
  watch: {
    password() {
      this.clear_error();
    },
  },
  computed: {
    can_continue() {
      return !this.apiErrorMessage && this.password.length >= 3
    },
    inputType() {
      return this.is_eye_opened ? 'text' : 'password'
    },
    ...mapGetters('login', ['apiErrorMessage']),
  }
}
</script>