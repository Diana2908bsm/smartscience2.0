import './assets/global.scss'
import 'primeicons/primeicons.css'
import 'font-awesome/css/font-awesome.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import { MyCustomPreset } from '@/assets/presets/preset'  // импорт готового пресета

import { use } from 'echarts/core'
import ECharts from 'vue-echarts'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DataZoomComponent
} from 'echarts/components'

// tree-shaking для echarts
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

import components from '@/components/UI'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// PrimeVue с кастомной темой
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: MyCustomPreset
  }
})

app.use(ConfirmationService)

// Глобальные UI компоненты
Object.values(components).forEach(component => {
  app.component(component.name, component)
})

// ECharts
app.component('v-chart', ECharts)

app.mount('#app')