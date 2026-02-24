<script setup>
const props = defineProps({
  title: String,
  titleClass: String
})
</script>
<template>
  <div class="profile">
    <div class="profile__container">
      <div class="profile__column">
        <div class="profile__title"> {{ props.title }}</div>
           <slot name="headerAside" />
      </div>
      <div class="profile__box">
        <slot name="content">
        </slot>
      </div>
    </div>
  </div>


</template>