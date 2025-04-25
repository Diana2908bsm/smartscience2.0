<template>
    <div class="page">
        <div class="page__container">
            <headerPage></headerPage>
            <div class="page__main">
                <div class="page__grid grid-filter">
                    <div class="page__navbar">
                        <navbar></navbar>
                    </div>
                    <div class="profile">
                        <div class="profile__container">
                            <div class="profile__column">
                                <h1 class="profile">Статьи научного сотрудника</h1>
                            </div>
                            <div class="profile__box">
                                <spinner v-if="loading"></spinner>
                                <PublicationsWorks :publications="works" />
                            </div>
                        </div>
                    </div>
                    <div class="profile__filter">
                        <Filter />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headerPage from '../components/header/HeaderPage.vue'
import Navbar from '@/components/NavBar/NavBar.vue'
import { mapActions, mapGetters } from 'vuex'
import Spinner from '@/components/UI/spinner/Spinner.vue'
import PublicationsWorks from '@/components/PublicationsWorks/PublicationsWorks.vue'
import Filter from '@/components/Filter.vue'
export default {
    name: 'WorksView',
    components: {
        headerPage,
        Navbar,
        Spinner,
        PublicationsWorks,
        Filter
    },
    methods: {
        ...mapActions(['getWorks'])
    },
    created() {
        this.getWorks()
    },
    computed: {
        ...mapGetters(['works', 'loading'])
    }
}
</script>