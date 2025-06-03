import { defineStore } from "pinia";
import axios from "@/api";

export const useUserStore = defineStore ('user',{
    state: ()=> ({
        loading:false,
        userInfo: null
    }),
    actions:{
        async getInfo(){
            this.loading = true
            try{
            const response = await axios.get('users/get')
            this.userInfo = response.data
            } catch (err){
                console.log(err)
            } finally{
                this.loading = false
            }

        }
    }
})