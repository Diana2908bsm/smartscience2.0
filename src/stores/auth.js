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
                localStorage.setItem('email', email)
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
        async password(password) {
            this.loading = true
            try {
                const response = await axios.post('auth/login', {
                    password,
                    email: this.email
                })
                const { tokenInfo, userId } = response.data
                this.token = tokenInfo.token
                this.refreshToken = tokenInfo.refreshToken
                this.userId = userId
                localStorage.setItem('userInfo', JSON.stringify({
                    token: this.token,
                    refreshToken: this.refreshToken,
                    userId: this.userId
                }))
                router.push('/');
            } catch (error) {
                this.errorMessage = error.response?.data?.message || 'Ошибка при регистрации'
            } finally {
                this.loading = false
            }

        },
        async createPassword(newPassword) {
            this.loading = true
            try {
                const response = await axios.post('auth/activate', {
                    newPassword,
                    email: this.email
                })
                router.push('/login');
            } catch {
                this.errorMessage = error.response?.data?.message || 'Ошибка при регистрации'
            }
            finally{
                this.loading = false
            }

        },
        logout() {
            this.email = '',
                this.userId = '',
                this.refreshToken = '',
                this.token = ''
            localStorage.removeItem('userInfo')
            router.push('/login');
        }
    }
})