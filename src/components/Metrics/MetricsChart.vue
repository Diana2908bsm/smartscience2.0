<template>
  <div class="space-y-10">
    <div v-for="metric in metrics" :key="metric.code" class="p-4 bg-white rounded-xl shadow">
      <h3 class="text-lg font-semibold mb-4">{{ metric.name }}</h3>

      <v-chart
        :option="getOption(metric)"
        :autoresize="true"
        class="w-full"
        style="height:400px"
        :theme="theme"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  items: { type: Array, required: true },
  theme: { type: String, default: 'custom' }
})

/** список метрик без дублей */
const metrics = computed(() => {
  const map = new Map()
  for (const it of props.items) {
    if (!map.has(it.code)) map.set(it.code, it.name)
  }
  return Array.from(map, ([code, name]) => ({ code, name }))
})

/** утилита для преобразования значений в число */
function toNum(val) {
  if (val === null || val === undefined) return null
  const num = parseFloat(String(val).replace(',', '.'))
  return Number.isFinite(num) ? num : null
}

/** опции для графика по одной метрике */
function getOption(metric) {
  const rows = props.items
    .filter(it => it.code === metric.code)
    .sort((a, b) => a.year - b.year)

  const years = rows.map(r => r.year)
  const values = rows.map(r => toNum(r.value))

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: { left: 56, right: 20, top: 20, bottom: 56 },
    xAxis: {
      type: 'category',
      data: years,
      axisTick: { alignWithLabel: true }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: v =>
          new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(v)
      }
    },
    series: [
      {
        name: metric.name,
        type: 'bar',
        barMaxWidth: 40,
        itemStyle: {
          borderRadius: [6, 6, 0, 0]
        },
        data: values
      }
    ],
    animationDuration: 600
  }
}
</script>