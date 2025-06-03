<script setup>
import HeaderPage from '@/components/header/HeaderPage.vue';
import navbar from '@/components/NavBar/NavBar.vue';
</script>
<template>
  <div class="page">
    <div class="page__container">
      <headerPage></headerPage>
      <div class="page__main">
        <div class="page__grid">
          <div class="page__navbar">
            <navbar></navbar>
          </div>
          <div class="profile">
            <div class="profile__container">
              <div class="profile__column">
                <slot name="profile-top"></slot>
              </div>
              <div class="profile__box">
                <slot name="info">
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>