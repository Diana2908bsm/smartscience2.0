import { defineStore } from "pinia";
import router from '@/router'
import axios from "@/api";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        needToActivate: null,
        email: '',
        userId: '',
        refreshToken: '',
        token: '',
        loading: false,
        errorMessage: ''
    }),
    actions: {
        async login(email) {
            console.log(email)
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
        }
    }
})