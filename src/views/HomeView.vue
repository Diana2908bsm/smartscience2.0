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
                <h1 class="profile">Личный кабинет сотруника</h1>
                <router-link to="/edit-password" class="profile__setting">
                  <many-icon name="personSetting"></many-icon>
                  <span>Настройка</span>
                </router-link>
              </div>
              <div class="profile__box">
                <spinner v-if="loading"></spinner>
                <infoPerson  :firstName="user.firstName" :lastName="user.lastName" :middleName="user.lastName" :email="user.email" :elibraryId="user.elibraryId" :birthdate="user.birthdate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerPage from '../components/header/HeaderPage.vue'
import Spinner from '@/components/UI/spinner/Spinner.vue'
import Navbar from '@/components/NavBar/NavBar.vue'
import InfoPerson from '@/components/Info/InfoPerson.vue';
import { manyIcon } from '../components/icons'
import { mapActions, mapGetters} from 'vuex'
import UiButton from '@/components/UI/uiButton.vue';
export default {
  name: 'HomeView',
  components: {
    headerPage,
    Navbar,
    InfoPerson,
    manyIcon,
    UiButton,
    Spinner
  },
  methods: {
    ...mapActions(['getInfo','login/refreshTokens'])
  },
  created () {
    this.getInfo()
  },
  computed: {
    ...mapGetters(['user','loading'])
  }
}
</script>
