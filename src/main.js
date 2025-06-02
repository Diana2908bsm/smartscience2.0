import './assets/global.scss'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'font-awesome/css/font-awesome.css';

// вывод UI компонентов
import components from '@/components/UI'
const app = createApp(App)
app.use(createPinia())
// Регистрация UI компонентов
Object.values(components).forEach(component => {
    app.component(component.name, component)
})


app.use(router)

app.mount('#app')
