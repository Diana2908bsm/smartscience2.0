<script setup lang="ts">
import HeaderPage from '../header/HeaderPage.vue';
import sideBar from '@/components/sideBar/sideBar.vue'

</script>

<template>
    <HeaderPage />
    <div class="flex">
        <sideBar />
        <div class="w-full">
            <RouterView />
        </div>

    </div>
</template>