import { defineStore } from "pinia";
import router from '@/router'
import axios from "@/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        needToActivate: null,
        email: localStorage.getItem('email') || '',
        userId: '',
        refreshToken: '',
        token: '',
        loading: false,
        errorMessage: ''
    }),
    actions: {
        async login(email) {
            this.loading = true;
            try {
                const response = await axios.get('auth/verifyuser', { params: { email } })

                this.needToActivate = response.data.needToActivate
                this.email = email;
                if (this.needToActivate) {
                    router.push('/create-password')
                } else {
                    router.push('/verify-password')
                }
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Ошибка при регистрации'
            } finally {
                this.loading = false;
            }
        },
        async password(password){
            this.loading = true
            try{
                const response = await axios.post('auth/login', {  
                    password,
                    email: this.email
                })
                const {tokenInfo, userId} = response.data
                console.log(tokenInfo.token)
                this.token = tokenInfo.token
                this.refreshToken = tokenInfo.refreshToken
                this.userId = userId
                // router.push('/');
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Ошибка при регистрации'
            } finally{
                this.loading = false
            }

        }
    }
})