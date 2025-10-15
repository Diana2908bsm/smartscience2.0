<script setup>
import { ref } from 'vue'
import { manyIcon } from '../icons'
import UiBurger from '../UI/uiBurger.vue'
import Navbar from '@/components/NavBar/NavBar.vue'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

const userStore = useUserStore()
const useAuth = useAuthStore()

const isMenuOpen = ref(false)
const toggleMenu = ()=>{
  isMenuOpen.value = !isMenuOpen.value
}
const logout = () => {
  useAuth.logout()
}
</script>
<template>
  <header class="header">
    <div class="header__container">
      <div class="header__column">
        <div class="header__item">
          <many-icon name="mainLogo"></many-icon>
          <div class="header__name">SmartScience</div>
        </div>
        <div class="header__item">
          <many-icon name="headerPerson"></many-icon>
          <div>
            <div class="header__person-name">{{ userStore.userInfo.firstName }} {{ userStore.userInfo.lastName }}</div>
          </div>
          <div class="header__enter">
            <many-icon @click="logout" name="enterIcons"></many-icon>
          </div>
          <ui-burger class="burger-menu" @click="toggleMenu"></ui-burger>
        </div>
      </div>
    </div>
    <div class="burger-navbar">
      <navbar v-if="isMenuOpen" @closeMenu="toggleMenu"></navbar>
    </div>
  </header>
</template>
