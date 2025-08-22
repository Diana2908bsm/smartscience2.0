import './assets/global.scss'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'font-awesome/css/font-awesome.css';


import { use } from 'echarts/core'
import ECharts from 'vue-echarts' // компонент
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DataZoomComponent
} from 'echarts/components'

// включаем только то, что нужно (tree-shaking)
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DataZoomComponent
])

// вывод UI компонентов
import components from '@/components/UI'
const app = createApp(App)
app.use(createPinia())
// Регистрация UI компонентов
Object.values(components).forEach(component => {
    app.component(component.name, component)
})


app.use(router)
app.component('v-chart', ECharts)
app.mount('#app')
