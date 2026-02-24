<script setup>
import axios from "@/api";

const loading = ref(false)
const personInfo = ref([])

async function getPersonInfo() {
    try {
        loading.value = true
        const response = await axios.get('users/get')
        personInfo.value = response.data.data
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
onMounted(async () => {
    await getPersonInfo()
})
</script>

<template>
    <Spinner v-if="loading" />
    <AppLayoutProfile v-else title="Личный кабинет сотруника">
        <template #headerAside>
            <router-link to="/edit-password" class="profile__setting">
                <many-icon name="personSetting"></many-icon>
                <span>Настройка</span>
            </router-link>
        </template>
        <template #content>
            <PersonInfo :user-info="personInfo"/>
        </template>
    </AppLayoutProfile>
</template>