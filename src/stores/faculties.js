import { defineStore } from "pinia";
import axios from "@/api";
export const useFacultiesStore = defineStore('faculties', {
    state: () => ({
        faculties: [],
        loading: false
    }),
    actions: {
        async getAllFaculties() {
            this.loading = true
            try {
                const response = await axios.get('faculties')
                this.faculties = response.data.data

            } catch (err) {
                console.log(err)

            } finally {
                this.loading = false
            }
        },
        async newAddFaculties(payload) {
            this.loading = true
            try {
                const response = await axios.post('faculties', payload)
                const facultyId = response.data.data
                console.log(facultyId)
                const newFaculty = { ...payload, facultyId }
                this.faculties.push(newFaculty)
                return response.data.data
            } catch (err) {
                console.error('Ошибка при создании факультета:', err)
                throw err
            } finally {
                this.loading = false
            }
        },
        async removeFaculties(id) {
            this.loading = true
            try {
                const response = await axios.delete(`faculties/${id}`)
                this.faculties = this.faculties.filter(f => f.facultyId !== id)
                return response.data
            } catch (err) {
                console.error('Ошибка при удалении факультета:', err)
                throw err
            } finally {
                this.loading = false
            }
        },
        async updateFaculties( payload) {
            console.log(payload)
            this.loading = true
       
            try {
                const response = await axios.put(`faculties`, payload)
                // const index = this.faculties.findIndex(f => f.facultyId === id)
                // if (index !== -1) {
                //     this.faculties[index] = response.data
                // }

            } catch (err) {
                console.error('Ошибка при изменении факультета:', err)
                throw err
            } finally {
                this.loading = false;
            }

        }
    }

})