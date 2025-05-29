<script setup>
import { manyIcon } from '@/components/icons'
</script>
<template>
  <div class="auth">
    <div class="auth__wrapper">
      <div class="auth__header">
        <div class="auth__logo">
          <many-icon name="emailIcon"></many-icon>
          <slot name="name"></slot>
        </div>
        <div class="auth__title">
          <slot name="title"></slot>
        </div>
      </div>
      <slot name="form"></slot>
    </div>

  </div>
</template>