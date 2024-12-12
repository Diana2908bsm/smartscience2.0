<template>
    <div class="page">
        <div class="page__container">
            <headerPage></headerPage>
        </div>
    </div>
</template>
<script>
import headerPage from '../components/header/HeaderPage.vue'
export default {
    name:'WorksView',
    components: {
        headerPage,
        
    }
}
</script>