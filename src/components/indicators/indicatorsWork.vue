<script setup>
const props = defineProps({
    indicators: {
        type: Object,
        default: () => ({})
    },
    title: String
})
</script>

<template>
    <div class="indicators">
        <div class="indicator__box">
            <h3 class="indicator__title">{{ title }}</h3>
            <div v-for="indicator of indicators" :key="indicator.id" class="indicator__list">
                <div class="indicator__name">{{ indicator.name }}</div>
                <div class="indicator__number">{{ indicator.value }}</div>
            </div>
        </div>
    </div>
</template>
