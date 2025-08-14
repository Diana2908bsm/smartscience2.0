<script setup>
import AppLayoutProfile from '@/layouts/AppLayoutProfile.vue';
import indicatorsWork from '@/components/indicators/indicatorsWork.vue';
import { useIndicatorsStore } from '@/stores/indicators'
import { onMounted } from 'vue';

const indicatorsWorkStore = useIndicatorsStore()

onMounted(() => {
    indicatorsWorkStore.getIndicators()
})
</script>

<template>
    <div class="publication">
        <AppLayoutProfile>
            <template #profile-top>
                <h1 class="profile">Общие показатели сотрудника</h1>
            </template>
            <template #info>
                <indicatorsWork :indicators="indicatorsWorkStore.hirschIndicators" title="Индекс Хирша"></indicatorsWork>
                <indicatorsWork :indicators="indicatorsWorkStore.citIndicators" title="Цитирование"></indicatorsWork>
            </template>
        </AppLayoutProfile>
    </div>
</template>