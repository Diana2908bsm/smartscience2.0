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
          <div v-if="user">
            <div class="header__person-name">{{ user.firstName }} {{ user.lastName }}</div>
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
<script>
import { manyIcon } from '../icons'
import { mapGetters, mapActions } from 'vuex'
import UiBurger from '../UI/uiBurger.vue'
import Navbar from '@/components/NavBar/NavBar.vue'

export default {
  name: 'headerPages',
  components: {
    manyIcon,
    UiBurger,
    Navbar
  },
  data (){
    return {
      isMenuOpen : false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    ...mapActions(['getInfo']),
    ...mapActions('login', ['logout']),
    toggleMenu () {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
</script>