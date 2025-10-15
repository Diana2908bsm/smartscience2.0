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
import { usePublicationsStore} from '@/stores/publications';
import uiInput from './UI/uiInput.vue'
import { debounce } from 'lodash'

const PublicationsStore = usePublicationsStore()
const route = useRoute()
const router = useRouter()
const filters = ref ({
    searchArticles:'',
    selectedYears: []
})

const publicationYears = computed(() => {
    const years = PublicationsStore.publications.map(w => w.year);
    return [...new Set(years)].sort((a, b) => a - b);
})
const selectedYearsString = computed(() =>
  filters.value.selectedYears.join(',')
)
onMounted(()=>{
    const { search, years } = route.query 
    filters.value.searchArticles = search || ''
    filters.value.selectedYears = years ? years.split(',') : [];
    fetchFilteredData()
})

watch (filters, ()=> {
    router.replace({
        query:{
            search: filters.value.searchArticles || undefined,
            years: filters.value.selectedYears.length ? selectedYearsString.value : undefined
        }
    })
    fetchFilteredData()
}, { deep: true })


const fetchFilteredData = debounce (()=> {
   PublicationsStore.filterArticles(filters.value.searchArticles,selectedYearsString.value)
},500)
</script>