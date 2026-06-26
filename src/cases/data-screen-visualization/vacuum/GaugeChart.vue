<template>
  <div class="gauge-chart-wrap" aria-hidden="true">
    <div ref="chartRef" class="gauge-chart"></div>
    <div class="scada-scale-labels">
      <span class="scale-start">0</span>
      <span class="scale-mid">50</span>
      <span class="scale-end">100</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts/core'
import { GaugeChart as EchartsGaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { rafThrottle } from '@/utils/performance'
import type { ECharts, EChartsCoreOption } from 'echarts/core'

echarts.use([EchartsGaugeChart, CanvasRenderer])

const props = withDefaults(defineProps<{
  value: number
}>(), {
  value: 0,
})

const chartRef = ref<HTMLDivElement | null>(null)
let chart: ECharts | null = null
let resizeObserver: ResizeObserver | null = null
const resizeChart = rafThrottle(() => chart?.resize())

const normalizedValue = computed(() => {
  if (props.value <= 0) {
    return 0
  }

  return Math.min(100, Math.max(0, props.value))
})

const createOption = (value: number): EChartsCoreOption => ({
  animation: true,
  animationDuration: 1100,
  animationEasing: 'cubicOut',
  series: [
    {
      type: 'gauge',
      min: 0,
      max: 100,
      startAngle: 180,
      endAngle: 0,
      splitNumber: 2,
      radius: '94%',
      center: ['50%', '63%'],
      data: [{ value }],
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 8,
          color: [
            [1, 'rgba(0, 180, 255, 0.3)'],
          ],
        },
      },
      progress: {
        show: true,
        width: 8,
        roundCap: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#00d4ff' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.72)' },
          ]),
          shadowBlur: 8,
          shadowColor: 'rgba(0, 212, 255, 0.56)',
        },
      },
      pointer: {
        show: true,
        length: '42%',
        width: 4,
        itemStyle: {
          color: '#00d4ff',
        },
      },
      anchor: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        distance: -15,
        length: 11,
        lineStyle: {
          color: '#00d4ff',
          width: 1.5,
        },
      },
      axisLabel: {
        show: false,
      },
      detail: {
        show: false,
      },
      title: {
        show: false,
      },
    },
  ],
})

const createValueOption = (value: number): EChartsCoreOption => ({
  series: [
    {
      data: [{ value }],
    },
  ],
})

const renderChart = () => {
  if (!chartRef.value) {
    return
  }

  chart ??= echarts.init(chartRef.value, undefined, { renderer: 'canvas' })
  chart.setOption(createOption(normalizedValue.value), { lazyUpdate: true })
}

const updateChartValue = () => {
  if (!chart) {
    renderChart()
    return
  }

  chart.setOption(createValueOption(normalizedValue.value), { lazyUpdate: true })
}

onMounted(() => {
  renderChart()

  if (chartRef.value) {
    resizeObserver = new ResizeObserver(resizeChart)
    resizeObserver.observe(chartRef.value)
  }
})

watch(normalizedValue, updateChartValue)

onBeforeUnmount(() => {
  resizeChart.cancel()
  resizeObserver?.disconnect()
  chart?.dispose()
  chart = null
})
</script>

<style scoped>
.gauge-chart-wrap,
.gauge-chart {
  position: absolute;
  inset: 0;
  min-width: 0;
  min-height: 0;
}

.gauge-chart {
  z-index: 1;
}

.scada-scale-labels {
  position: absolute;
  inset: 0;
  z-index: 2;
  min-width: 0;
  min-height: 0;
  color: #00d4ff;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: clamp(9px, 0.7cqw, 13px);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  line-height: 1;
  pointer-events: none;
}

.scada-scale-labels span {
  position: absolute;
  text-shadow: 0 0 6px rgba(0, 212, 255, 0.44);
}

.scale-start {
  top: 59%;
  left: 13%;
}

.scale-mid {
  top: 21%;
  left: 50%;
  transform: translateX(-50%);
}

.scale-end {
  top: 59%;
  right: 13%;
}
</style>
