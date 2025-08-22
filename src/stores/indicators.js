import { defineStore } from "pinia";
import axios from "@/api";
export const useIndicatorsStore = defineStore('indicators', {
    state: () => ({
        indicators: [],
        indicatorsYears: [],
        loading: false
    }),
    actions: {
        async getIndicators() {
            this.loading = true
            try {
                const response = await axios.get('scientificmetrics', {
                    params: { source: 0 }
                });
                let data = response.data
                const map = new Map(data.map(i => [i.code, i]))

                // пересобираем массив
                data = data.map(item => {
                    const percentItem = map.get(item.code + "Prc")

                    if (percentItem) {
                        return {
                            ...item,
                            value: `${item.value} (${percentItem.value}%)`
                        }
                    }
                    return item
                })
                data = data.filter(i => !i.code.toLowerCase().endsWith("prc"))

                this.indicators = data
                console.log(data)


            } catch (err) {
                console.log(err)
            }
            finally {
                this.loading = false
            }
        },
        async getIndicatorsYears() {
            this.loading = true
            try {
                const response = await axios.get('scientificmetrics', {
                    params: { source: 0, yearDivide: true }
                });
                this.indicatorsYears = response.data
            } catch (err) {
                console.log(err)
            }
            finally {
                this.loading = false;
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
        citIndicators(state) {
            return state.indicators.filter(i => i.code.toLowerCase().includes('cit'))
        },
        numIndicators(state) {
            return state.indicators.filter(i => i.code.toLowerCase().includes('num'))
        },
        publIndicators(state) {
            return state.indicators.filter(i => i.code.toLowerCase().includes('publ'))
        }
    }
})