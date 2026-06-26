<template>
  <div
    ref="chartRoot"
    class="realtime-line-chart"
    :class="`is-${variant}`"
    :data-realtime-chart="field"
  >
    <svg :viewBox="`0 0 ${geometry.width} ${geometry.height}`" role="img" focusable="false">
      <defs>
        <linearGradient :id="fillId" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.48" />
          <stop offset="100%" stop-color="#00d4ff" stop-opacity="0.04" />
        </linearGradient>
      </defs>
      <g class="realtime-grid">
        <path
          v-for="line in geometry.gridY"
          :key="line"
          :d="`M${geometry.left} ${line}H${geometry.right}`"
        />
      </g>
      <g class="realtime-axis">
        <text
          v-for="(label, index) in yLabels"
          :key="`y-${label}`"
          :x="geometry.yLabelX"
          :y="geometry.yLabelY[index]"
        >
          {{ label }}
        </text>
        <path :d="`M${geometry.left} ${geometry.bottom}H${geometry.right}`" />
        <text
          v-for="(label, index) in xLabels"
          :key="`x-${label}`"
          :x="xLabelPositions[index]"
          :y="geometry.xLabelY"
        >
          {{ label }}
        </text>
      </g>
      <path ref="areaRef" class="realtime-area" :fill="`url(#${fillId})`" />
      <path ref="lineRef" class="realtime-line" />
      <g class="realtime-markers">
        <circle
          v-for="marker in markerCount"
          :key="marker"
          ref="markerRefs"
          r="3"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { KpiField, KpiFrame } from './dataEngine'

type ChartVariant = 'panel' | 'argon'
type ChartFrameEvent = CustomEvent<{ frame: KpiFrame }>
type ChartPoint = { x: number, y: number }

const props = withDefaults(defineProps<{
  field: KpiField
  yLabels: string[]
  xLabels: string[]
  min: number
  max: number
  variant?: ChartVariant
}>(), {
  variant: 'panel',
})

const chartRoot = ref<HTMLElement | null>(null)
const lineRef = ref<SVGPathElement | null>(null)
const areaRef = ref<SVGPathElement | null>(null)
const markerRefs = ref<SVGCircleElement[]>([])
const series: number[] = []
let displaySeries: number[] = []
let updateIndex = 0
let animationFrame = 0

const geometry = computed(() => {
  if (props.variant === 'argon') {
    return {
      width: 210,
      height: 140,
      left: 42,
      right: 194,
      top: 20,
      bottom: 128,
      gridY: [20, 63, 106],
      yLabelX: 12,
      yLabelY: [25, 68, 111, 134],
      xLabelY: 139,
      points: 12,
      markerIndexes: [5, 8, 10, 11],
    }
  }

  return {
    width: 420,
    height: 136,
    left: 42,
    right: 402,
    top: 20,
    bottom: 106,
    gridY: [34, 70, 106],
    yLabelX: 0,
    yLabelY: [38, 74, 110],
    xLabelY: 130,
    points: 14,
    markerIndexes: [7, 10, 13],
  }
})

const markerCount = computed(() => geometry.value.markerIndexes.length)

const xLabelPositions = computed(() => {
  const { left, right } = geometry.value
  const count = Math.max(props.xLabels.length - 1, 1)

  return props.xLabels.map((_, index) => left + ((right - left) / count) * index)
})

const fillId = computed(() => `realtime-fill-${props.variant}-${props.field}`)

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const valueToY = (value: number) => {
  const { top, bottom } = geometry.value
  const range = props.max - props.min || 1
  const ratio = (clamp(value, props.min, props.max) - props.min) / range

  return bottom - ratio * (bottom - top)
}

const toPoints = (values: number[]): ChartPoint[] => {
  const { left, right } = geometry.value
  const count = Math.max(values.length - 1, 1)

  return values.map((value, index) => ({
    x: left + ((right - left) / count) * index,
    y: valueToY(value),
  }))
}

const buildSmoothPath = (points: ChartPoint[]) => {
  if (!points.length) return ''
  if (points.length === 1) return `M${points[0].x} ${points[0].y}`

  return points.reduce((path, point, index) => {
    if (index === 0) return `M${point.x} ${point.y}`

    const previous = points[index - 1]
    const controlGap = (point.x - previous.x) * 0.5

    return `${path} C${previous.x + controlGap} ${previous.y}, ${point.x - controlGap} ${point.y}, ${point.x} ${point.y}`
  }, '')
}

const renderSeries = (values: number[]) => {
  const points = toPoints(values)
  const linePath = buildSmoothPath(points)
  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]

  lineRef.value?.setAttribute('d', linePath)

  if (firstPoint && lastPoint) {
    areaRef.value?.setAttribute(
      'd',
      `${linePath} L${lastPoint.x} ${geometry.value.bottom} L${firstPoint.x} ${geometry.value.bottom} Z`,
    )
  }

  geometry.value.markerIndexes.forEach((pointIndex, markerIndex) => {
    const marker = markerRefs.value[markerIndex]
    const point = points[Math.min(pointIndex, points.length - 1)]
    if (!marker || !point) return

    marker.setAttribute('cx', String(point.x))
    marker.setAttribute('cy', String(point.y))
  })
}

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3)

const animateSeries = (fromValues: number[], toValues: number[]) => {
  cancelAnimationFrame(animationFrame)

  const startTime = performance.now()
  const duration = 1200
  const from = toValues.map((target, index) => fromValues[index] ?? target)

  const tick = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1)
    const eased = easeOutCubic(progress)
    displaySeries = toValues.map((target, index) => from[index] + (target - from[index]) * eased)
    renderSeries(displaySeries)

    if (progress < 1) {
      animationFrame = requestAnimationFrame(tick)
    }
  }

  animationFrame = requestAnimationFrame(tick)
}

const seedSeries = (value: number) => {
  const { points } = geometry.value
  const span = Math.max((props.max - props.min) * 0.012, Math.abs(value) * 0.004, 0.1)

  series.splice(0, series.length)
  for (let index = 0; index < points; index += 1) {
    const wave = Math.sin((index + updateIndex) * 0.82) * span
    series.push(clamp(value + wave, props.min, props.max))
  }

  displaySeries = [...series]
}

const pushValue = (value: number) => {
  if (series.length === 0) {
    seedSeries(value)
  }

  const previousSeries = [...displaySeries]
  updateIndex += 1
  series.push(value)
  while (series.length > geometry.value.points) {
    series.shift()
  }

  animateSeries(previousSeries, [...series])
}

const handleChartFrame = (event: Event) => {
  const frame = (event as ChartFrameEvent).detail?.frame
  const value = Number(frame?.[props.field])

  if (Number.isFinite(value)) {
    pushValue(value)
  }
}

onMounted(() => {
  chartRoot.value?.addEventListener('dashboard:chart-frame', handleChartFrame)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  chartRoot.value?.removeEventListener('dashboard:chart-frame', handleChartFrame)
})
</script>

<style scoped>
.realtime-line-chart {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.realtime-line-chart svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.realtime-grid path {
  fill: none;
  stroke: rgba(37, 130, 203, 0.28);
  stroke-dasharray: 3 4;
  stroke-width: 1;
}

.is-argon .realtime-grid path {
  stroke: rgba(37, 130, 203, 0.3);
  stroke-dasharray: 2 3;
}

.realtime-axis path {
  fill: none;
  stroke: rgba(71, 156, 225, 0.42);
  stroke-width: 1;
}

.realtime-axis text {
  fill: rgba(255, 255, 255, 0.72);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 15px;
  font-weight: 650;
}

.is-argon .realtime-axis text {
  fill: rgba(255, 255, 255, 0.82);
  font-size: 14px;
}

.realtime-area {
  opacity: 0.82;
  transition: d 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.realtime-line {
  fill: none;
  stroke: #00d4ff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 4;
  filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.55));
  transition: d 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-argon .realtime-line {
  stroke-width: 2;
  filter: drop-shadow(0 0 3px rgba(0, 212, 255, 0.56));
}

.realtime-markers circle {
  fill: #063c7a;
  stroke: #00d4ff;
  stroke-width: 3;
  filter: drop-shadow(0 0 3px rgba(0, 212, 255, 0.6));
  transition:
    cx 1.2s cubic-bezier(0.22, 1, 0.36, 1),
    cy 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.is-argon .realtime-markers circle {
  fill: #001d4a;
  stroke-width: 2;
}
</style>
