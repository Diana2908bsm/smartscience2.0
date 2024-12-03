import './assets/global.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import store from './stores'

import App from './App.vue'
import router from './router'

// вывод UI компонентов
import components from '@/components/UI'
const app = createApp(App)

// Регистрация UI компонентов
Object.values(components).forEach(component => {
    app.component(component.name, component)
})

app.use(createPinia())
app.use(router)
app.use(store)

app.mount('#app')
