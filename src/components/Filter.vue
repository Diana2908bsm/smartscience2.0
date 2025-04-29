<template>
    <div class="filter">
        <div class="filter__box">
            <div class="filter__box--header">
                <div class="filter__name">Найти</div>
                <ui-input v-model="filters.searchArticles" class="filter__input" />
            </div>
        </div>
        <div class="filter__box">
            <div class="filter__box--header">
                <div class="filter__name">По году</div>
                <div v-if="publicationYears.length === 0">
                    <span>Ничего не найдено</span>
                </div>
                <div class="filter__box--checkbox" v-for="year in publicationYears" :key="year">
                    <label class="filter__box--label">
                        <input v-model="filters.selectedYears" :value="year" type="checkbox"
                            class="filter__input--checkbox" />
                        {{ year }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import uiInput from './UI/uiInput.vue'
import { debounce } from 'lodash'

const store = useStore()
const route = useRoute()
const router = useRouter()
const filters = ref ({
    searchArticles:'',
    selectedYears: []
})

onMounted(()=>{
    const { search, years } = route.query // Извлекаются параметры из url
    filters.value.searchArticles = search || ''
    filters.value.selectedYears =  years ? years.split(',').map(Number) : []
    fetchFilteredData()
})

watch (filters, ()=> {
    router.replace({
        query:{
            search: filters.value.searchArticles || undefined,
            years: filters.value.selectedYears.length ? filters.value.selectedYears.join(',') : undefined
        }
    })
    fetchFilteredData()
}, { deep: true })

const publicationYears = computed(() => {
    const years = store.getters.works.map(w => w.year);
    return [...new Set(years)].sort((a, b) => a - b);
})
const fetchFilteredData = debounce (()=> {
    store.dispatch('filterArticles',{
        title: filters.value.searchArticles,
        years: filters.value.selectedYears
    })
},500)
</script>