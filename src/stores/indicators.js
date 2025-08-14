import { defineStore } from "pinia";
import axios from "@/api";
export const useIndicatorsStore = defineStore('indicators', {
    state: () => ({
        indicators: [],
        loading: false
    }),
    actions: {
        async getIndicators() {
            this.loading = true
            try {
                const response = await axios.get('scientificmetrics', {
                    params: { source: 0 }
                });
                this.indicators = response.data

            } catch (err) {
                console.log(err)
            }
            finally {
                this.loading = false
            }
        }
    }, 
    getters: {
        hirschIndicators(state) {
            return state.indicators.filter(i => i.code.toLowerCase().includes('hirsch'))
        },
        selfCitedIndicators(state) {
            return state.indicators.filter(i => i.code.toLowerCase().includes('selfcited'))
        },
        citIndicators(state){
            return state.indicators.filter(i => i.code.toLowerCase().includes('cit'))
        }
    }
})