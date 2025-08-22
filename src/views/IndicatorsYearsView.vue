<script setup>
import AppLayoutProfile from '@/layouts/AppLayoutProfile.vue';
import { useIndicatorsStore } from '@/stores/indicators'
import Spinner from '@/components/UI/spinner/Spinner.vue';
import MetricsChart from '@/components/Metrics/MetricsChart.vue';
import { onMounted } from 'vue';

const indicatorsWorkStore = useIndicatorsStore()

onMounted(() => {
    indicatorsWorkStore.getIndicatorsYears()
})
</script>

<template>
    <spinner v-if="indicatorsWorkStore.loading" />
    <div v-else class="publication">
        <AppLayoutProfile>
            <template #profile-top>
                <h1 class="profile">Общие показатели сотрудника</h1>
            </template>
            <template #info>
                <MetricsChart :items="indicatorsWorkStore.indicatorsYears" theme="custom" />
            </template>
        </AppLayoutProfile>
    </div>
</template>