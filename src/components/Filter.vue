<template>
    <div class="filter">
        <div class="filter__box">
            <div class="filter__box--header">
                <div class="filter__name">Найти</div>
                <ui-input v-model="searchArticles" class="filter__input" />
            </div>
        </div>
        <div class="filter__box">
            <div class="filter__box--header">
                <div class="filter__name">По году</div>
                <div class="filter__box--checkbox">
                    <label class="filter__box--label">
                        <ui-input type="checkbox" v-model="search" class="filter__input--checkbox" />
                        2014
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex' 
import uiInput from './UI/uiInput.vue'

const searchArticles = ref('')
const store = useStore()

watch(searchArticles, (newVal) => {
    store.dispatch('filterSearch', newVal)
})
</script>