<template>
    <form class="auth-form" @submit.prevent="submitCreatePassword">
      <input type="text" autocomplete="username email" :value="email" hidden class="d-none" />
      <div class="input-field">
        <label for="password">Пароль</label>
        <ui-input type="password" v-model="password" required :error="error" autocomplete="current-password"
          @input="clear_error" />
      </div>
      <div class="password-strength" :class="{success: !is_invalid}">
        <p>Пароль должен содержать:</p>
        <div class="password-box">
          <i :class="['fa', 'fa-check', strength.length ? 'password-success' : 'password-muted']"></i>
          <p :class="['text-password', strength.length ? 'text-success' : 'text-muted']">8 символов</p>
        </div>
        <div class="password-box">
          <i :class="['fa', 'fa-check', strength.number ? 'password-success' : 'password-muted']"></i>
          <p :class="['text-password', strength.number? 'text-success' : 'text-muted']">Одну цифру</p>
        </div>
        <div class="password-box">
          <i :class="['fa', 'fa-check', strength.uc_char ? 'password-success' : 'password-muted']"></i>
          <p :class="['text-password', strength.uc_char ? 'text-success' : 'text-muted']">Одну заглавную букву</p>
        </div>
        <div class="password-box">
          <i :class="['fa', 'fa-check', strength.special_char ? 'password-success' : 'password-muted']"></i>
          <p :class="['text-password', strength.special_char ? 'text-success' : 'text-muted']">Неалфавитные символы(!? и т.д)</p>
        </div>
      </div>
      <div class="auth-button">
        <iu-button type="submit" sample="primary" :disabled="is_invalid" size="lg">Войти</iu-button>
      </div>
      <!-- <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div> -->
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
    ...mapActions(['create-password']),
    clear_error () {
      this.error = false
    },
    async submitCreatePassword () {

    }
  },
  computed: {
    strength () {
      return {
        length: this.password.length >= 8,
        uc_char: this.password.toLowerCase() !== this.password,
        number: /d/.test(this.password),
        special_char: /[!@#$%^&*(),.?":{}|<>]/.test(this.password)
      }
    },
    errors () {
      const result = {}
      if (!this.strength.length || !this.strength.uc_char) {
        result.password = true
      }
      return result
    },
    is_invalid () {
      return Object.values(this.errors).length > 0
    },
    ...mapGetters(['errorMessage'])
  }
}
</script>
  