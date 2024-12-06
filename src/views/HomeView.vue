<template>
  <div class="page">
    <div class="page__container">
      <headerPage></headerPage>
      <div class="page__main">
        <div class="page__grid">
          <div class="page__navbar">
            <navbar></navbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerPage from '../components/header/HeaderPage.vue'
import Navbar from '../components/Navbar/Navbar.vue'
export default {
  name: 'HomeView',
  components: {
    headerPage,
    Navbar
  }
}
</script>
