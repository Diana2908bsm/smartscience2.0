<script setup>
import PublicationsWorks from '@/components/PublicationsWorks/PublicationsWorks.vue'
import AppLayoutProfile from '@/layouts/AppLayoutProfile.vue';
import { usePublicationsStore } from '@/stores/publications'
import Spinner from '@/components/UI/spinner/Spinner.vue';
import Filter from '@/components/Filter.vue';
import { onMounted } from 'vue';

const PublicationsStore = usePublicationsStore()

onMounted(() => {
    PublicationsStore.getPublications()
})
</script>

<template>
    <spinner v-if="PublicationsStore.loading"></spinner>
    <div v-else class="publication">
        <AppLayoutProfile>
            <template #profile-top>
                <h1 class="profile">Статьи научного сотрудника</h1>
            </template>
            <template #info>
                <div class="grid-filter">
                    <PublicationsWorks :publications="PublicationsStore.publications"></PublicationsWorks>
                    <Filter></Filter>
                </div>
            </template>
        </AppLayoutProfile>

    </div>
</template>
