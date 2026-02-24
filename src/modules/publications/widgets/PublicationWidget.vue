<script setup>
import axios from "@/api";
const loading = ref(false)
const publications = ref([])

async function getPublications() {
    try {
        loading.value = true
        const response = await axios.get('publications/get')
        publications.value = response.data.data
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
onMounted(async()=>{
    await getPublications()
})
</script>

<template>
    <Spinner v-if="loading" />
    <AppLayoutProfile title="Статьи научного сотрудника">
        <template #headerAside>
        </template>
        <template #content>
            <div class="grid-filter">
                <PublicationsWorks :publications="publications" />
            </div>
        </template>
    </AppLayoutProfile>
</template>