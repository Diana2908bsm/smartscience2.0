<template>
    <form class="auth-form" @submit.prevent="submitVerifyPassword">
      <input type="text" autocomplete="username email" :value="email" hidden class="d-none"/>
      <div class="input-field">
        <label for="password">Пароль</label>
        <ui-input type="password"
                  v-model="password"
                  required
                  :error="error"
                  autocomplete="current-password"
                  @input="clear_error"
                  />
        <span style="display: block;" v-if="error" class="error">Неверный пароль. Проверь раскладку и клавишу Caps Lock</span>
        <router-link to="/auth/recover-password">Забыли пароль?</router-link>
      </div>
      <div class="auth-button">
        <iu-button type="submit" sample="primary" :disabled="!can_continue" size="lg">Войти</iu-button>
      </div>
    </form>
  </template>
  <script>
  
  import { mapActions, mapGetters } from 'vuex'
  
  export default {
    data () {
      return {
        password: '',
        error: false,
        email: ''
      }
    },
    methods: {
      ...mapActions(['verify-password']),
      clear_error () {
        this.error = false
      },
      async submitVerifyPassword () {
  
      }
    },
    computed: {
      can_continue () {
        return !this.error && this.password.length >= 3
      },
      ...mapGetters(['errorMessage, email'])
    }
  }
  </script>