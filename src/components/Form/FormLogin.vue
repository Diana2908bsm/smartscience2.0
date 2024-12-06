<template>
  <form class="auth-form" @submit.prevent="submitLogin">
    <div class="input-field">
      <label>Email</label>
      <ui-input type="text"
                v-model="email"
                :error="error"
                autocomplete="username email"
                @input="clear_error" required
                @blur="validate" />
      <span v-if="error" class="error">Кажется, адрес почты некорректный</span>
    </div>
    <input v-model="password" type="password" autocomplete="current-password" class="d-none" hidden />
    <div class="auth-button">
      <iu-button type="submit" sample="primary" size="lg" :disabled="!can_continue">Войти</iu-button>
    </div>
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>
  </form>
</template>
<script>
import validateEmail from '@/utils/email-validation.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      email: '',
      error: false,
      password: ''
    }
  },
  methods: {
    ...mapActions(['verifyuser']),
    validate () {
      if (this.email) {
        this.error = !validateEmail(this.email)
      }
    },
    clear_error () {
      this.error = false,
      this.$store.commit('SET_ERROR_MESSAGE', '');
    },
    async submitLogin () {
      this.validate()
      try {
        await this.verifyuser({ email: this.email })
      } catch (error) {
        this.error = true
      }
    }
  },
  computed: {
    can_continue () {
      return !this.error && this.email.length >= 3
    },
    ...mapGetters(['errorMessage'])
  }
}
</script>