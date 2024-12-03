<template>
    <form class="auth-form" @submit.prevent="submitCreatePassword">
      <input type="text" autocomplete="username email" :value="email" hidden class="d-none" />
      <div class="input-field">
        <label for="password">Пароль</label>
        <ui-input type="password" v-model="password" required :error="error" autocomplete="current-password"
          @input="clear_error" />
      </div>
      <div class="password-strength">
        <div class="password-box">
          <v-icon :class="`text-${strength.length ? 'success' : 'muted'}`">
            {{ strength.length ? 'mdi-check' : 'mdi-close' }}
          </v-icon>
          <p :class="`title-${strength.length ? 'success' : 'muted'}`">Хотя бы 8 символов</p>
        </div>
        <div class="password-box">
          <p :class="`title-${strength.uc_char ? 'success' : 'muted'}`">Хотя бы одну заглавную букву</p>
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
        uc_char: this.password.toLowerCase() !== this.password
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
  