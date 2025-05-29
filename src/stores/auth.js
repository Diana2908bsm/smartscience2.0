import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth',{
    state: () => ({
        email:'',
        userId : '',
        refreshToken: '',
        token: '',
        loading: false ,
        errorMessage:''
    }),
    actions: {
        async login(email) {
            console.log(email)
            this.loading = true;
            try {
                const response = await axios.post('auth/login', {email})
                this.email = email;
            } catch (error) {
            this.errorMessage = error.message
            this.errorMessages = error.response.data.message 
            } finally {
                this.loading = false;
            }
        }
    }
})