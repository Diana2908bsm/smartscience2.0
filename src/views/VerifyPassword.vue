<template>
    <div class="auth">
      <div class="auth__wrapper">
        <div class="auth__header">
          <div class="auth__logo">
            <many-icon name="mainLogo"></many-icon>
            <span>Научные сотрудники ВУЗа</span>
          </div>
          <div class="auth__email-box">
            <many-icon name="emailIcon"></many-icon>
            <span>{{ email }}</span>
          </div>
          <div class="auth__title">Введите пароль</div>
        </div>
        <form-password></form-password>
      </div>
    </div>
  </template>
  <script>
  import { manyIcon } from '@/components/icons'
  import FormPassword from '@/components/Form/FormVerifyPassword.vue'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      manyIcon,
      FormPassword
    },
    computed: {
      ...mapGetters(['email'])
    }
  }
  </script>
  