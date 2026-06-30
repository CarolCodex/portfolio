<template>
  <div class="gauge-chart-wrap" aria-hidden="true">
    <div v-if="chartFailed" class="gauge-static-card">VAC</div>
    <div v-else ref="chartRef" class="gauge-chart"></div>
    <div class="scada-scale-labels">
      <span class="scale-start">0</span>
      <span class="scale-mid">50</span>
      <span class="scale-end">100</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { rafThrottle } from '@/utils/performance'
import type { ECharts, EChartsCoreOption } from 'echarts/core'
import { useInjectedDashboardRuntime } from '../hooks/useDashboardRuntime'

type EchartsCoreModule = typeof import('echarts/core')
type EchartsRenderersModule = typeof import('echarts/renderers')

const props = withDefaults(defineProps<{
  value: number
}>(), {
  value: 0,
})

const chartRef = ref<HTMLDivElement | null>(null)
const chartFailed = ref(false)
const runtime = useInjectedDashboardRuntime()
let chart: ECharts | null = null
let resizeObserver: ResizeObserver | null = null
let visibilityObserver: IntersectionObserver | null = null
let echartsApi: EchartsCoreModule | null = null
let echartsLoadPromise: Promise<EchartsCoreModule> | null = null
let mounted = false
let visible = true
const resizeChart = rafThrottle(() => chart?.resize())

const loadEcharts = async () => {
  if (echartsApi) return echartsApi

  echartsLoadPromise ??= Promise.all([
    import('echarts/core'),
    import('echarts/lib/chart/gauge'),
    import('echarts/renderers'),
  ]).then(([core, _gauge, renderers]: [EchartsCoreModule, unknown, EchartsRenderersModule]) => {
    core.use([renderers.CanvasRenderer])
    echartsApi = core
    return core
  })

  return echartsLoadPromise
}

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
          color: echartsApi
            ? new echartsApi.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#00d4ff' },
            { offset: 1, color: 'rgba(0, 212, 255, 0.72)' },
            ])
            : '#00d4ff',
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

const renderChart = async () => {
  if (chartFailed.value || !chartRef.value || !visible || (runtime && !runtime.scheduler.running)) {
    return
  }

  try {
    const echarts = await loadEcharts()
    if (!mounted || !chartRef.value || !visible) return

    chart ??= echarts.init(chartRef.value, undefined, { renderer: 'canvas' })
    chart.setOption(createOption(normalizedValue.value), { lazyUpdate: true })
  } catch {
    chartFailed.value = true
    chart?.dispose()
    chart = null
  }
}

const updateChartValue = () => {
  if (!chart) {
    void renderChart()
    return
  }

  try {
    chart.setOption(createValueOption(normalizedValue.value), { lazyUpdate: true })
  } catch {
    chartFailed.value = true
    chart?.dispose()
    chart = null
  }
}

onMounted(() => {
  mounted = true

  if ('IntersectionObserver' in window && chartRef.value) {
    visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          void renderChart()
        } else {
          chart?.getZr().animation.stop()
        }
      },
      { rootMargin: '120px', threshold: 0.01 },
    )
    visibilityObserver.observe(chartRef.value)
  } else {
    void renderChart()
  }

  runtime?.onPause(() => chart?.getZr().animation.stop())
  runtime?.onResume(() => {
    void renderChart()
  })

  if (chartRef.value) {
    resizeObserver = new ResizeObserver(resizeChart)
    resizeObserver.observe(chartRef.value)
  }
})

watch(normalizedValue, updateChartValue)

onBeforeUnmount(() => {
  mounted = false
  resizeChart.cancel()
  visibilityObserver?.disconnect()
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

.gauge-static-card {
  position: absolute;
  inset: 12%;
  z-index: 1;
  display: grid;
  place-items: center;
  border: 1px solid rgba(0, 212, 255, 0.28);
  border-radius: 999px 999px 8px 8px;
  background: rgba(0, 68, 122, 0.28);
  color: #00d4ff;
  font-size: clamp(14px, 1.4cqw, 22px);
  font-weight: 800;
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
