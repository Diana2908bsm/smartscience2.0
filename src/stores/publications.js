import { defineStore } from "pinia";
import axios from "@/api";

export const usePublicationsStore = defineStore('publications', {
    state: () => ({
        loading: false,
        publications: []
    }),
    actions: {
        async getPublications() {
            this.loading = true
            try {
                const response = await axios.get('publications/get')
                this.publications = response.data.data
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false
            }
        },
        async filterArticles(title, years) {
            try {
                const data = await axios.get('publications/get', {
                    params: {
                        Title: title,
                        Years: years.join(',')
                    }
                })
            } catch (err) {
                console.log(err)
            }

        }
    }
})