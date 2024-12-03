<template>
  <div class="auth">
    <div class="auth__wrapper">
      <div class="auth__header">
        <div class="auth__logo">
          <many-icon name="mainLogo"></many-icon>
          <span>Научные сотрудники ВУЗа</span>
        </div>
        <div class="auth__title">Вход</div>
      </div>
      <FormLogin></FormLogin>
    </div>
  </div>
</template>

<script setup>
import FormLogin from '@/components/Form/FormLogin.vue'
import { manyIcon } from '../components/icons'
</script>
