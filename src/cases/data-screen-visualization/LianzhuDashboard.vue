<template>
  <div v-if="config" class="lianzhu-page">
    <div ref="stageRef" class="lianzhu-stage" :data-dashboard-id="config.id">
      <video
        v-if="shouldUseSceneVideo"
        ref="sceneVideoRef"
        class="scene-image model-video"
        :src="config.video"
        :poster="config.poster"
        :aria-label="config.sceneAlt"
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        @error="handleSceneVideoError"
      ></video>
      <img
        v-else
        class="scene-image"
        :src="config.poster"
        :alt="config.sceneAlt"
        width="1600"
        height="900"
        loading="eager"
        decoding="async"
      />

      <header class="figma-title-bar">
        <img
          class="title-bg"
          src="/case-assets/data-screen-visualization/lianzhu-title-bg.png"
          alt=""
          width="1024"
          height="88"
          loading="eager"
          decoding="async"
          data-node-id="1:4599"
        />
        <RouterLink class="back-link" to="/cases/data-screen-visualization">返回项目列表</RouterLink>
        <h1 data-node-id="0:8472">{{ config.title }}</h1>
      </header>

      <section
        class="figma-kpi-row"
        :class="{ 'has-extra-kpi': config.kpiBar.productionHeat }"
        :aria-label="`${config.processName}核心指标`"
        data-node-id="1:3573"
      >
        <article class="kpi-status is-live" data-node-id="1:3604">
          <span class="play-dot" aria-hidden="true"></span>
          <div>
            <small>{{ config.kpiBar.status.label }}</small>
            <strong>{{ config.kpiBar.status.value }}</strong>
          </div>
        </article>
        <i class="kpi-divider divider-1" data-node-id="1:3647"></i>
        <article class="figma-kpi speed-kpi is-live" data-node-id="1:3605">
          <small>{{ config.kpiBar.speed.label }}</small>
          <strong>
            <span :data-kpi-field="config.kpiBar.speed.field">{{ config.kpiBar.speed.value }}</span>
            <em v-if="config.kpiBar.speed.unit">{{ config.kpiBar.speed.unit }}</em>
          </strong>
        </article>
        <i class="kpi-divider divider-2" data-node-id="1:3648"></i>
        <article class="figma-kpi cast-time-kpi is-live" data-node-id="1:3617">
          <small>{{ config.kpiBar.castDuration.label }}</small>
          <strong :data-kpi-field="config.kpiBar.castDuration.field">{{ config.kpiBar.castDuration.value }}</strong>
        </article>
        <i class="kpi-divider divider-3" data-node-id="1:3650"></i>
        <article class="figma-kpi output-kpi is-live" data-node-id="1:3623">
          <small>{{ config.kpiBar.furnaceOutput.label }}</small>
          <strong>
            <span :data-kpi-field="config.kpiBar.furnaceOutput.field">{{ config.kpiBar.furnaceOutput.value }}</span>
            <em v-if="config.kpiBar.furnaceOutput.unit">{{ config.kpiBar.furnaceOutput.unit }}</em>
          </strong>
        </article>
        <i class="kpi-divider divider-4" data-node-id="1:3652"></i>
        <article class="figma-kpi day-output-kpi is-live" data-node-id="1:3629">
          <small>{{ config.kpiBar.dayOutput.label }}</small>
          <strong>
            <span :data-kpi-field="config.kpiBar.dayOutput.field">{{ config.kpiBar.dayOutput.value }}</span>
            <em v-if="config.kpiBar.dayOutput.unit">{{ config.kpiBar.dayOutput.unit }}</em>
          </strong>
        </article>
        <i class="kpi-divider divider-5" data-node-id="1:3654"></i>
        <article class="figma-kpi steel-kpi" data-node-id="1:3635">
          <small>{{ config.kpiBar.steel.label }}</small>
          <strong>{{ config.kpiBar.steel.value }}<em v-if="config.kpiBar.steel.unit">{{ config.kpiBar.steel.unit }}</em></strong>
        </article>
        <i class="kpi-divider divider-6" data-node-id="1:3656"></i>
        <article class="figma-kpi spec-kpi" data-node-id="1:3641">
          <small>{{ config.kpiBar.spec.label }}</small>
          <strong>{{ config.kpiBar.spec.value }}<em v-if="config.kpiBar.spec.unit">{{ config.kpiBar.spec.unit }}</em></strong>
        </article>
        <template v-if="config.kpiBar.productionHeat">
          <i class="kpi-divider divider-7"></i>
          <article class="figma-kpi heat-kpi">
            <small>{{ config.kpiBar.productionHeat.label }}</small>
            <strong>
              {{ config.kpiBar.productionHeat.value }}
              <em v-if="config.kpiBar.productionHeat.unit">{{ config.kpiBar.productionHeat.unit }}</em>
            </strong>
          </article>
        </template>
      </section>

      <section class="side-info-group left-info-group" :aria-label="`${config.processName}左侧参数面板`">
        <article
          v-for="panel in config.leftInfoPanels"
          :key="panel.title"
          class="figma-info-box"
          :data-node-id="panel.nodeId"
        >
          <h2 :data-node-id="panel.titleNodeId">
            <img
              src="/case-assets/data-screen-visualization/info-title-bg.png"
              alt=""
              width="275"
              height="39"
              loading="eager"
              decoding="async"
            />
            <span>{{ panel.title }}</span>
          </h2>
          <div
            class="info-body"
            :class="getInfoBodyClass(panel)"
            :data-node-id="panel.bodyNodeId"
          >
            <VacuumGaugeCard
              v-if="config.id === 'vd' && panel.title === '真空系统状态'"
              :value="Number(config.kpiBar.furnaceOutput.value)"
              :field="config.kpiBar.furnaceOutput.field"
              :items="panel.items"
            />
            <template v-else-if="config.id === 'lf' && panel.layout === 'split'">
              <div class="lf-info-columns">
                <div class="lf-info-column is-left">
                  <div v-for="item in getPanelItems(panel, 'left')" :key="item.label" class="info-row lf-info-row">
                    <span>{{ item.label }}</span>
                    <strong v-if="item.field" :data-kpi-field="item.field">{{ item.value }}</strong>
                    <strong v-else>{{ item.value }}</strong>
                    <small>{{ item.unit ?? '' }}</small>
                  </div>
                </div>
                <div class="lf-info-column is-right">
                  <div v-for="item in getPanelItems(panel, 'right')" :key="item.label" class="info-row lf-info-row">
                    <span>{{ item.label }}</span>
                    <strong v-if="item.field" :data-kpi-field="item.field">{{ item.value }}</strong>
                    <strong v-else>{{ item.value }}</strong>
                    <small>{{ item.unit ?? '' }}</small>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="config.id === 'lf' && panel.layout === 'gauge'">
              <div class="lf-current-layout">
                <div class="lf-current-list">
                  <div v-for="item in getPanelItems(panel, 'left')" :key="item.label" class="info-row lf-info-row">
                    <span>{{ item.label }}</span>
                    <strong v-if="item.field" :data-kpi-field="item.field">{{ item.value }}</strong>
                    <strong v-else>{{ item.value }}</strong>
                    <small>{{ item.unit ?? '' }}</small>
                  </div>
                </div>
                <div v-if="panel.gauge" class="lf-current-gauge" aria-hidden="true">
                  <div class="lf-current-gauge-core">
                    <strong>{{ panel.gauge.value }}<small>{{ panel.gauge.unit ?? '' }}</small></strong>
                    <span>{{ panel.gauge.label }}</span>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="panel.layout === 'overview'">
              <div v-if="panel.gauge" class="overview-dial" aria-label="炉况健康优良运行稳定">
                <img
                  src="/case-assets/data-screen-visualization/gaolu-status-overview-bg.png"
                  alt=""
                  width="158"
                  height="118"
                  loading="eager"
                  decoding="async"
                />
                <div class="overview-dial-copy">
                  <span data-node-id="4:3919">{{ panel.gauge.label }}</span>
                  <strong data-node-id="4:3918">{{ panel.gauge.value }}</strong>
                  <small data-node-id="4:3926">{{ panel.gauge.unit }}</small>
                </div>
              </div>
              <div class="overview-metrics">
                <div v-for="item in panel.items" :key="item.label" class="overview-row">
                  <span>{{ item.label }}</span>
                  <strong>{{ item.value }}</strong>
                  <small>{{ item.unit ?? '' }}</small>
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="item in panel.items" :key="item.label" class="info-row">
                <span>{{ item.label }}</span>
                <strong v-if="item.field" :data-kpi-field="item.field">{{ item.value }}</strong>
                <strong v-else>{{ item.value }}</strong>
                <small>{{ item.unit ?? '' }}</small>
              </div>
              <div v-if="panel.chart" class="info-line-chart" aria-label="温度趋势图">
                <RealtimeLineChart
                  :field="panel.chart.field"
                  :y-labels="panel.chart.yLabels"
                  :x-labels="panel.chart.xLabels"
                  :min="panel.chart.min"
                  :max="panel.chart.max"
                />
              </div>
            </template>
            <img
              class="box-bottom"
              src="/case-assets/data-screen-visualization/info-box-bottom.png"
              alt=""
              width="276"
              height="8"
              loading="eager"
              decoding="async"
            />
          </div>
        </article>
      </section>

      <section class="side-info-group right-info-group" :aria-label="`${config.processName}右侧数据面板`">
        <article
          v-for="panel in config.rightInfoPanels"
          :key="panel.title"
          class="figma-info-box"
          :data-node-id="panel.nodeId"
        >
          <h2 :data-node-id="panel.titleNodeId">
            <img
              src="/case-assets/data-screen-visualization/info-title-bg.png"
              alt=""
              width="275"
              height="39"
              loading="eager"
              decoding="async"
            />
            <span>{{ panel.title }}</span>
          </h2>
          <div
            class="info-body"
            :class="{ 'is-vd-argon-body': config.id === 'vd' && panel.title === '氩气用量记录' }"
            :data-node-id="panel.bodyNodeId"
          >
            <template v-if="config.id === 'vd' && panel.title === '氩气用量记录'">
              <div class="vd-argon-layout">
                <div class="vd-argon-metrics">
                  <div v-for="item in panel.items" :key="item.label" class="vd-argon-row">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.value }}</strong>
                    <small>{{ item.unit ?? '' }}</small>
                  </div>
                </div>
                <div class="vd-argon-chart" aria-hidden="true">
                  <div class="vd-argon-chart-head">
                    <span>氩气流量趋势 (m³/h)</span>
                    <strong>实时</strong>
                  </div>
                  <RealtimeLineChart
                    field="flowSpeed0"
                    :y-labels="['30', '20', '10', '0']"
                    :x-labels="['09:54', '10:04', '10:24']"
                    :min="0"
                    :max="30"
                    variant="argon"
                  />
                </div>
              </div>
            </template>
            <template v-else>
              <div v-for="item in panel.items" :key="item.label" class="info-row">
                <span>{{ item.label }}</span>
                <strong v-if="item.field" :data-kpi-field="item.field">{{ item.value }}</strong>
                <strong v-else>{{ item.value }}</strong>
                <small>{{ item.unit ?? '' }}</small>
              </div>
            </template>
            <img
              class="box-bottom"
              src="/case-assets/data-screen-visualization/info-box-bottom.png"
              alt=""
              width="276"
              height="8"
              loading="eager"
              decoding="async"
            />
          </div>
        </article>

        <article v-if="config.id === 'vd'" class="figma-info-box vd-cooling-card" aria-label="冷却水回水温度">
          <h2>
            <img
              src="/case-assets/data-screen-visualization/info-title-bg.png"
              alt=""
              width="275"
              height="39"
              loading="eager"
              decoding="async"
            />
            <span>冷却水回水温度</span>
          </h2>
          <div class="vd-cooling-body">
            <div class="vd-cooling-list">
              <div v-for="item in coolingWaterItems" :key="item.label" class="vd-cooling-row">
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
                <small>{{ item.unit }}</small>
              </div>
            </div>
            <img
              class="vd-cooling-thermometer"
              src="/case-assets/data-screen-visualization/icons/cooling-water-temperature.svg"
              alt=""
              width="131"
              height="131"
              loading="eager"
              decoding="async"
            />
            <img
              class="box-bottom vd-cooling-bottom"
              src="/case-assets/data-screen-visualization/info-box-bottom.png"
              alt=""
              width="276"
              height="8"
              loading="eager"
              decoding="async"
            />
          </div>
        </article>

        <section v-if="config.id !== 'vd'" class="flow-speed-box" data-node-id="1:4228">
          <h2 data-node-id="1:4243">
            <img
              src="/case-assets/data-screen-visualization/info-title-bg.png"
              alt=""
              width="574"
              height="39"
              loading="eager"
              decoding="async"
            />
            <span data-node-id="1:4245">{{ config.flowSpeedTitle }}</span>
          </h2>
          <div class="speed-table" data-node-id="1:4230">
            <div v-for="speed in config.flowSpeedItems" :key="speed.field">
              <strong>{{ speed.label }}</strong>
              <span :data-kpi-field="speed.field">{{ speed.value }}</span>
            </div>
            <img
              class="box-bottom"
              src="/case-assets/data-screen-visualization/info-box-bottom.png"
              alt=""
              width="574"
              height="8"
              loading="eager"
              decoding="async"
              data-node-id="1:4242"
            />
          </div>
        </section>
      </section>

      <section class="figma-process-flow" :aria-label="`${config.processName}工艺流程`">
        <template v-for="(step, index) in config.processSteps" :key="step.label">
          <article
            class="process-step-card"
            :class="`is-${getStepStatus(index)}`"
            :style="{ left: `${step.left}%` }"
            :data-process-step-index="index"
            :data-node-id="step.cardNode"
          >
            <img
              class="process-step-icon"
              :src="step.icon"
              alt=""
              width="60"
              height="60"
              loading="eager"
              decoding="async"
              :data-node-id="step.iconNode"
            />
            <span :data-node-id="step.textNode">{{ step.label }}</span>
          </article>
          <img
            v-if="index < config.processSteps.length - 1"
            class="process-arrow"
            :class="`is-${getArrowStatus(index)}`"
            :style="{ left: `${step.arrowLeft}%` }"
            src="/case-assets/data-screen-visualization/process/arrow.svg?v=2"
            alt=""
            width="23"
            height="24"
            loading="eager"
            decoding="async"
            :data-process-arrow-index="index"
            :data-node-id="step.arrowNode"
          />
        </template>
      </section>
    </div>
  </div>
  <div v-else class="missing-dashboard">
    <RouterLink to="/cases/data-screen-visualization">返回项目列表</RouterLink>
    <h1>系统不存在</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getDashboardConfig } from './PageConfig'
import RealtimeLineChart from './RealtimeLineChart.vue'
import { useRealtimeKPI } from './hooks/useRealtimeKPI'
import type { DashboardInfoPanel } from './types'
import VacuumGaugeCard from './vacuum/VacuumGaugeCard.vue'

const route = useRoute()
const config = computed(() => getDashboardConfig(String(route.meta.dashboardId ?? 'lianzhu')))
const { stageRef, getStepStatus, getArrowStatus } = useRealtimeKPI(config)
const sceneVideoRef = ref<HTMLVideoElement | null>(null)
const shouldUseSceneVideo = ref(true)
let sceneVisibilityObserver: IntersectionObserver | undefined
let sceneIsVisible = true
let documentIsVisible = true
let reducedMotionQuery: MediaQueryList | undefined

const getInfoBodyClass = (panel: DashboardInfoPanel) => ({
  'is-vacuum-gauge-body': config.value?.id === 'vd' && panel.title === '真空系统状态',
  'is-lf-split-body': config.value?.id === 'lf' && panel.layout === 'split',
  'is-lf-gauge-body': config.value?.id === 'lf' && panel.layout === 'gauge',
  'is-overview-body': panel.layout === 'overview',
  'has-panel-chart': Boolean(panel.chart),
})

const getPanelItems = (panel: DashboardInfoPanel, column: 'left' | 'right') =>
  panel.items.filter((item) => (item.column ?? 'left') === column)

const coolingWaterItems = [
  { label: '2#水冷管道', value: '31.1', unit: '℃' },
  { label: '1#水冷管道', value: '31.5', unit: '℃' },
  { label: '真空盖水冷', value: '33.2', unit: '℃' },
  { label: '水冷防溅盖', value: '30.8', unit: '℃' },
]

const canPlaySceneVideo = () =>
  shouldUseSceneVideo.value &&
  documentIsVisible &&
  sceneIsVisible &&
  !reducedMotionQuery?.matches

const syncSceneVideoPlayback = () => {
  const video = sceneVideoRef.value
  if (!video) return

  if (!canPlaySceneVideo()) {
    video.pause()
    return
  }

  void video.play().catch(() => {
    video.pause()
  })
}

const setupSceneVisibilityObserver = () => {
  sceneVisibilityObserver?.disconnect()
  sceneVisibilityObserver = undefined

  if (!stageRef.value || !('IntersectionObserver' in window)) return

  sceneVisibilityObserver = new IntersectionObserver(
    ([entry]) => {
      sceneIsVisible = entry.isIntersecting
      syncSceneVideoPlayback()
    },
    { threshold: 0.01 },
  )
  sceneVisibilityObserver.observe(stageRef.value)
}

const handleDocumentVisibilityChange = () => {
  documentIsVisible = document.visibilityState !== 'hidden'
  syncSceneVideoPlayback()
}

const handleReducedMotionChange = () => {
  syncSceneVideoPlayback()
}

const handleSceneVideoError = () => {
  shouldUseSceneVideo.value = false
}

watch(config, () => {
  shouldUseSceneVideo.value = true
  void nextTick(() => {
    setupSceneVisibilityObserver()
    syncSceneVideoPlayback()
  })
})

onMounted(() => {
  documentIsVisible = document.visibilityState !== 'hidden'
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  document.addEventListener('visibilitychange', handleDocumentVisibilityChange)
  reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
  setupSceneVisibilityObserver()
  syncSceneVideoPlayback()
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleDocumentVisibilityChange)
  reducedMotionQuery?.removeEventListener('change', handleReducedMotionChange)
  sceneVisibilityObserver?.disconnect()
  sceneVideoRef.value?.pause()
})
</script>

<style scoped>
.lianzhu-page {
  display: grid;
  width: 100vw;
  min-height: 100vh;
  place-items: center;
  overflow: hidden;
  background: #020b1e;
  color: rgba(255, 255, 255, 0.95);
}

.lianzhu-stage {
  position: relative;
  container-type: size;
  width: min(100vw, calc(100vh * 16 / 9));
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #001234;
  box-shadow: 0 0 0 1px rgba(0, 122, 255, 0.5);
  animation: lianzhu-enter 0.28s ease both;
}

.lianzhu-stage::before,
.lianzhu-stage::after {
  content: '';
  position: absolute;
  pointer-events: none;
}

.lianzhu-stage::before {
  inset: 8.15% 0 0;
  z-index: 0;
  background: linear-gradient(180deg, #001b45 0%, #001234 28%, #001234 100%);
}

.lianzhu-stage::after {
  inset: 8.15% 0 0;
  z-index: 2;
  background:
    linear-gradient(180deg, rgba(0, 18, 52, 0.24) 0%, rgba(0, 18, 52, 0) 18%, rgba(0, 18, 52, 0) 76%, rgba(0, 18, 52, 0.38) 100%),
    linear-gradient(90deg, rgba(0, 18, 52, 0.42) 0%, rgba(0, 18, 52, 0) 10%, rgba(0, 18, 52, 0) 88%, rgba(0, 18, 52, 0.54) 100%);
}

.scene-image {
  position: absolute;
  left: 4.64%;
  bottom: -3.06%;
  z-index: 1;
  width: 87.08%;
  height: 87.13%;
  object-fit: cover;
  pointer-events: none;
  filter: saturate(1.02) contrast(0.98);
  -webkit-mask-image:
    linear-gradient(90deg, transparent 0%, #000 6.5%, #000 93.5%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 5.5%, #000 91%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(90deg, transparent 0%, #000 6.5%, #000 93.5%, transparent 100%),
    linear-gradient(180deg, transparent 0%, #000 5.5%, #000 91%, transparent 100%);
  mask-composite: intersect;
}

.model-video {
  left: 4.64%;
  bottom: -3.06%;
  width: 87.08%;
  height: 87.13%;
  object-fit: cover;
}

.lianzhu-stage[data-dashboard-id='gaolu'] .model-video {
  transform: scale(0.9);
}

.figma-title-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 4;
  height: 8.15%;
  filter: drop-shadow(0 5px 11px rgba(0, 0, 0, 0.5));
}

.title-bg {
  position: absolute;
  inset: -3.41% 0 -9.09%;
  display: block;
  width: 100%;
  height: calc(100% + 12.5%);
  max-width: none;
  object-fit: fill;
  pointer-events: none;
}

.figma-title-bar h1 {
  position: absolute;
  top: 1.18vw;
  left: 50%;
  margin: 0;
  transform: translateX(-50%);
  background: linear-gradient(180deg, #ffffff 0%, #f8fdff 48%, #aeeaff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: clamp(20px, 2.4vw, 46px);
  font-weight: 600;
  letter-spacing: 0;
  line-height: normal;
  text-align: center;
  text-shadow: 0 4px 10px rgba(0, 26, 72, 0.32);
  white-space: nowrap;
}

.back-link {
  position: absolute;
  top: 16%;
  left: 2.4%;
  z-index: 2;
  border: 1px solid rgba(1, 227, 255, 0.36);
  border-radius: 999px;
  padding: 0.42vw 0.72vw;
  background: rgba(7, 27, 67, 0.42);
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(10px, 0.72vw, 14px);
  font-weight: 750;
}

.figma-kpi-row {
  position: absolute;
  top: 10.37%;
  left: 3.13%;
  z-index: 4;
  width: 92.71%;
  height: 11.11%;
  border: 1.2px solid rgba(0, 122, 255, 0.2);
  border-radius: 12px;
  background: rgba(28, 116, 254, 0.09);
}

.kpi-status,
.figma-kpi {
  position: absolute;
  display: flex;
  align-items: center;
  min-width: 0;
}

.kpi-status {
  top: 20%;
  left: 3.37%;
  height: 60%;
}

.kpi-status.is-live {
  animation: kpi-breathe 3.8s ease-in-out infinite;
}

.kpi-divider {
  position: absolute;
  top: 29.17%;
  width: 1px;
  height: 40%;
  background: rgba(255, 255, 255, 0.45);
}

.divider-1 {
  left: 15.17%;
}

.divider-2 {
  left: 29.04%;
}

.divider-3 {
  left: 42.92%;
}

.divider-4 {
  left: 56.8%;
}

.divider-5 {
  left: 70.67%;
}

.divider-6 {
  left: 84.55%;
}

.divider-7 {
  left: 84.6%;
}

.figma-kpi {
  top: 16%;
  height: 68%;
  flex-direction: column;
  justify-content: center;
  gap: 0.52vw;
  text-align: center;
}

.speed-kpi {
  left: 15.17%;
  width: 13.87%;
}

.cast-time-kpi {
  left: 29.04%;
  width: 13.88%;
}

.output-kpi {
  left: 42.92%;
  width: 13.88%;
}

.day-output-kpi {
  left: 56.8%;
  width: 13.87%;
}

.steel-kpi {
  left: 70.67%;
  width: 13.88%;
}

.spec-kpi {
  left: 84.55%;
  width: 15.45%;
}

.heat-kpi {
  left: 85.4%;
  width: 14.1%;
}

.figma-kpi-row.has-extra-kpi .divider-1 {
  left: 12.1%;
}

.figma-kpi-row.has-extra-kpi .divider-2 {
  left: 24.2%;
}

.figma-kpi-row.has-extra-kpi .divider-3 {
  left: 36.3%;
}

.figma-kpi-row.has-extra-kpi .divider-4 {
  left: 48.4%;
}

.figma-kpi-row.has-extra-kpi .divider-5 {
  left: 60.5%;
}

.figma-kpi-row.has-extra-kpi .divider-6 {
  left: 72.6%;
}

.figma-kpi-row.has-extra-kpi .kpi-status {
  left: 0;
  width: 12.1%;
  box-sizing: border-box;
  justify-content: center;
  padding-right: 1.1%;
}

.figma-kpi-row.has-extra-kpi .speed-kpi {
  left: 12.1%;
  width: 12.1%;
}

.figma-kpi-row.has-extra-kpi .cast-time-kpi {
  left: 24.2%;
  width: 12.1%;
}

.figma-kpi-row.has-extra-kpi .output-kpi {
  left: 36.3%;
  width: 12.1%;
}

.figma-kpi-row.has-extra-kpi .day-output-kpi {
  left: 48.4%;
  width: 12.1%;
}

.figma-kpi-row.has-extra-kpi .steel-kpi {
  left: 60.5%;
  width: 12.1%;
}

.figma-kpi-row.has-extra-kpi .spec-kpi {
  left: 72.6%;
  width: 12%;
}

.figma-kpi-row.has-extra-kpi .figma-kpi strong {
  font-size: clamp(16px, 1.46vw, 28px);
}

.play-dot {
  display: grid;
  width: clamp(20px, 2.08vw, 40px);
  height: clamp(20px, 2.08vw, 40px);
  flex: 0 0 auto;
  margin-right: 0.62vw;
  place-items: center;
  border: 2px solid #16de6e;
  border-radius: 50%;
  animation: status-pulse 1.8s ease-in-out infinite;
}

.play-dot::before {
  content: '';
  width: 0;
  height: 0;
  margin-left: 2px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 9px solid #16de6e;
}

.kpi-status small,
.figma-kpi small {
  display: block;
  flex: 0 0 auto;
  margin-right: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(10px, 0.83vw, 16px);
  font-weight: 500;
  letter-spacing: 1.5px;
  line-height: 1.2;
  white-space: nowrap;
}

.kpi-status strong,
.figma-kpi strong {
  display: block;
  color: #01e3ff;
  font-size: clamp(18px, 1.67vw, 32px);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  line-height: 1.05;
  white-space: nowrap;
}

.kpi-status strong {
  color: #16de6e;
}

.figma-kpi em {
  margin-left: 0.18vw;
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(10px, 0.83vw, 16px);
  font-style: normal;
}

.side-info-group,
.casting-info-group {
  position: absolute;
  z-index: 4;
  top: 23.7%;
  display: grid;
  width: 29.9%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25cqw;
  color: rgba(255, 255, 255, 0.95);
}

.left-info-group {
  left: 3.13%;
  width: 27.95%;
}

.lianzhu-stage[data-dashboard-id='lianzhu'] .left-info-group {
  width: calc((27.95% - 1.25cqw) / 2);
  grid-template-columns: minmax(0, 1fr);
}

.lianzhu-stage[data-dashboard-id='lf'] .left-info-group {
  width: 27.95%;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.05cqw;
}

.lianzhu-stage[data-dashboard-id='gaolu'] .left-info-group .figma-info-box:nth-child(2) {
  grid-column: 2;
  grid-row: 1 / span 2;
}

.lianzhu-stage[data-dashboard-id='gaolu'] .left-info-group .figma-info-box:nth-child(3) {
  grid-column: 1;
  grid-row: 2;
}

.right-info-group,
.casting-info-group {
  left: 68.92%;
  width: 27.95%;
}

.lianzhu-stage[data-dashboard-id='zhuanlu'] .right-info-group {
  right: 4.16%;
  left: auto;
}

.lianzhu-stage[data-dashboard-id='vd'] .side-info-group {
  top: 23.7%;
  width: 22.45%;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.25cqw;
}

.lianzhu-stage[data-dashboard-id='vd'] .left-info-group {
  left: 3.8%;
}

.lianzhu-stage[data-dashboard-id='vd'] .right-info-group {
  right: 3.8%;
  left: auto;
  width: 30.4%;
}

.lianzhu-stage[data-dashboard-id='vd'] .figma-info-box h2 {
  height: 2.03cqw;
}

.lianzhu-stage[data-dashboard-id='vd'] .info-body {
  height: 13.54cqw;
  padding: 4.9cqw 2.08cqw 0;
}

.lianzhu-stage[data-dashboard-id='vd'] .info-body.is-vacuum-gauge-body {
  height: clamp(300px, 22.1cqw, 332px);
  padding: 10px 14px;
}

.lianzhu-stage[data-dashboard-id='vd'] .info-body.is-vd-argon-body {
  height: 13.54cqw;
  padding: 0.94cqw 0.94cqw 0.78cqw;
}

.lianzhu-stage[data-dashboard-id='vd'] .info-row {
  grid-template-columns: minmax(0, 1fr) 6.8cqw 2.2cqw;
  height: 2.12cqw;
  gap: 0.42cqw;
}

.lianzhu-stage[data-dashboard-id='vd'] .info-row span,
.lianzhu-stage[data-dashboard-id='vd'] .info-row small {
  font-size: 0.78cqw;
  letter-spacing: 0;
}

.lianzhu-stage[data-dashboard-id='vd'] .info-row strong {
  font-size: 1.28cqw;
}

.vd-argon-layout {
  position: relative;
  z-index: 1;
  display: grid;
  height: 100%;
  min-height: 0;
  grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);
  gap: 0.94cqw;
}

.vd-argon-metrics {
  display: grid;
  min-width: 0;
  align-content: center;
  gap: 0.52cqw;
}

.vd-argon-row {
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(0, 1fr) max-content max-content;
  align-items: baseline;
  gap: 0.36cqw;
  font-variant-numeric: tabular-nums;
}

.vd-argon-row span {
  min-width: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(13px, 0.9cqw, 17px);
  font-weight: 650;
  letter-spacing: 0;
  line-height: 1;
  white-space: nowrap;
}

.vd-argon-row strong {
  color: #01e3ff;
  font-size: clamp(20px, 1.72cqw, 33px);
  font-weight: 700;
  line-height: 1;
  text-align: right;
  text-shadow: 0 0 8px rgba(1, 227, 255, 0.5);
  white-space: nowrap;
}

.vd-argon-row small {
  color: rgba(255, 255, 255, 0.86);
  font-size: clamp(11px, 0.82cqw, 16px);
  font-weight: 650;
  line-height: 1;
  white-space: nowrap;
}

.vd-argon-chart {
  display: grid;
  min-width: 0;
  grid-template-rows: auto minmax(0, 1fr);
  border-left: 1px solid rgba(111, 166, 222, 0.36);
  padding-left: 0.94cqw;
}

.vd-argon-chart-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.52cqw;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 650;
  line-height: 1;
}

.vd-argon-chart-head span {
  min-width: 0;
  overflow: hidden;
  font-size: clamp(11px, 0.82cqw, 15px);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vd-argon-chart-head strong {
  flex: 0 0 auto;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(11px, 0.82cqw, 15px);
  font-weight: 650;
}

.vd-argon-chart svg {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: visible;
}

.vd-argon-grid path {
  fill: none;
  stroke: rgba(37, 130, 203, 0.3);
  stroke-dasharray: 2 3;
  stroke-width: 1;
}

.vd-argon-axis path {
  fill: none;
  stroke: rgba(71, 156, 225, 0.4);
  stroke-width: 1;
}

.vd-argon-axis text {
  fill: rgba(255, 255, 255, 0.82);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  font-weight: 650;
}

.vd-argon-area {
  fill: url('#argonTrendFill');
}

.vd-argon-line {
  fill: none;
  stroke: #00d4ff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
  filter: drop-shadow(0 0 3px rgba(0, 212, 255, 0.56));
}

.vd-argon-markers circle {
  fill: #00d4ff;
  filter: drop-shadow(0 0 3px rgba(0, 212, 255, 0.62));
}

.vd-cooling-card {
  min-width: 0;
  height: 14.35cqw;
  overflow: hidden;
}

.vd-cooling-body {
  position: relative;
  z-index: 1;
  display: grid;
  height: calc(100% - 2.03cqw);
  min-height: 0;
  grid-template-columns: minmax(0, 1fr) 8.55cqw;
  align-items: center;
  gap: 1.15cqw;
  padding: 0.88cqw 1.15cqw 0.88cqw 1.6cqw;
  background:
    linear-gradient(0deg, rgba(23, 2, 215, 0.2) 0.97%, rgba(33, 106, 255, 0) 92.58%, rgba(32, 111, 255, 0.2) 99.03%),
    linear-gradient(180deg, rgba(7, 27, 67, 0.1) 0%, rgba(13, 46, 89, 0.2) 100%);
}

.vd-cooling-list {
  display: grid;
  min-width: 0;
  gap: 0.55cqw;
}

.vd-cooling-row {
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(0, 1fr) 3.3cqw 1.85cqw;
  align-items: baseline;
  gap: 0.52cqw;
  font-variant-numeric: tabular-nums;
}

.vd-cooling-row span {
  min-width: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(14px, 0.98cqw, 19px);
  font-weight: 650;
  line-height: 1;
  white-space: nowrap;
}

.vd-cooling-row strong {
  color: #01e3ff;
  font-size: clamp(20px, 1.72cqw, 33px);
  font-weight: 700;
  line-height: 1;
  text-align: right;
  text-shadow: 0 0 8px rgba(1, 227, 255, 0.48);
  white-space: nowrap;
}

.vd-cooling-row small {
  color: rgba(255, 255, 255, 0.86);
  font-size: clamp(12px, 0.86cqw, 16px);
  font-weight: 650;
  line-height: 1;
  white-space: nowrap;
}

.vd-cooling-thermometer {
  display: block;
  width: min(8.55cqw, 131px);
  height: min(8.55cqw, 131px);
  justify-self: center;
  object-fit: contain;
  filter: drop-shadow(0 0 12px rgba(0, 122, 255, 0.22));
}

.figma-info-box {
  min-width: 0;
}

.figma-info-box h2,
.flow-speed-box h2 {
  position: relative;
  height: 2.03cqw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-size: 0.94cqw;
  font-weight: 650;
  line-height: 1.2;
}

.figma-info-box h2 img,
.flow-speed-box h2 img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: fill;
}

.figma-info-box h2 span,
.flow-speed-box h2 span {
  position: absolute;
  top: 50%;
  left: 0.83cqw;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.94cqw;
  font-weight: 650;
  line-height: normal;
  transform: translateY(-50%);
  white-space: nowrap;
}

.info-body {
  position: relative;
  height: 5.94cqw;
  padding: 0.57cqw 0.68cqw 0;
  background:
    linear-gradient(0deg, rgba(23, 2, 215, 0.2) 0.97%, rgba(33, 106, 255, 0) 92.58%, rgba(32, 111, 255, 0.2) 99.03%),
    linear-gradient(180deg, rgba(7, 27, 67, 0.1) 0%, rgba(13, 46, 89, 0.2) 100%);
}

.info-body.has-panel-chart {
  height: 12.2cqw;
}

.info-body.is-overview-body {
  height: 14.8cqw;
  padding: 0.45cqw 0.94cqw 0;
}

.box-bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  height: auto;
  max-width: none;
  pointer-events: none;
}

.info-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 5.2cqw 1.8cqw;
  align-items: baseline;
  height: 1.67cqw;
  gap: 0.25cqw;
}

.info-row span,
.info-row small {
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.73cqw;
  letter-spacing: 0.068cqw;
  white-space: nowrap;
}

.info-row small {
  text-align: right;
}

.info-row strong {
  color: #01e3ff;
  font-size: 1.25cqw;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  line-height: 1.17;
  white-space: nowrap;
}

.info-line-chart {
  position: relative;
  z-index: 1;
  height: 5.35cqw;
  margin-top: 0.3cqw;
}

.info-line-chart svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.info-line-chart-grid path {
  fill: none;
  stroke: rgba(37, 130, 203, 0.28);
  stroke-dasharray: 3 4;
  stroke-width: 1;
}

.info-line-chart-axis path {
  fill: none;
  stroke: rgba(71, 156, 225, 0.42);
  stroke-width: 1;
}

.info-line-chart-axis text {
  fill: rgba(255, 255, 255, 0.7);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 15px;
  font-weight: 650;
}

.info-line-chart-area {
  fill: rgba(0, 174, 255, 0.12);
}

.info-line-chart-path {
  fill: none;
  stroke: #00d4ff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 4;
  filter: drop-shadow(0 0 4px rgba(0, 212, 255, 0.55));
}

.info-line-chart-dots circle {
  fill: #063c7a;
  stroke: #00d4ff;
  stroke-width: 3;
  filter: drop-shadow(0 0 3px rgba(0, 212, 255, 0.6));
}

.overview-dial {
  position: relative;
  z-index: 1;
  display: grid;
  height: 6.65cqw;
  place-items: center;
  overflow: hidden;
}

.overview-dial img {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  display: block;
  width: min(8.2cqw, 158px);
  aspect-ratio: 158 / 118;
  height: auto;
  max-width: none;
  transform: translate(-50%, -50%);
  opacity: 0.96;
  object-fit: contain;
  filter: saturate(1.12) drop-shadow(0 0 10px rgba(0, 174, 255, 0.32));
  pointer-events: none;
}

.overview-dial-copy {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  margin-top: 0.18cqw;
  text-align: center;
}

.overview-dial-copy span {
  color: #00ff1e;
  font-size: 0.62cqw;
  font-weight: 650;
  line-height: 1.1;
}

.overview-dial-copy strong {
  color: #00ff1e;
  font-family: 'DIN Alternate', 'DIN Condensed', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 1.48cqw;
  font-weight: 700;
  line-height: 1.05;
  text-shadow: 0 0 9px rgba(0, 255, 30, 0.42);
}

.overview-dial-copy small {
  color: #ddf2ff;
  font-size: 0.7cqw;
  font-weight: 650;
  line-height: 1.2;
}

.overview-metrics {
  position: relative;
  z-index: 1;
  display: grid;
  margin-top: 0.7cqw;
  gap: 0;
}

.overview-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) max-content max-content;
  align-items: baseline;
  min-height: 1.52cqw;
  border-top: 1px solid rgba(72, 128, 190, 0.2);
  gap: 0.34cqw;
  font-variant-numeric: tabular-nums;
}

.overview-row span {
  min-width: 0;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.7cqw;
  font-weight: 650;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.overview-row strong {
  color: #8ad7ff;
  font-size: 1.08cqw;
  font-weight: 700;
  line-height: 1.1;
  text-align: right;
  white-space: nowrap;
}

.overview-row:nth-child(n + 2) strong {
  color: #01e3ff;
}

.overview-row small {
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.72cqw;
  white-space: nowrap;
}

.lianzhu-stage[data-dashboard-id='lf'] .left-info-group .figma-info-box:nth-child(1) .info-body {
  height: clamp(196px, 11.8cqw, 236px);
}

.lianzhu-stage[data-dashboard-id='lf'] .left-info-group .figma-info-box:nth-child(2) .info-body {
  height: clamp(164px, 9.6cqw, 192px);
}

.lianzhu-stage[data-dashboard-id='lf'] .left-info-group .figma-info-box:nth-child(3) .info-body {
  height: clamp(94px, 5cqw, 108px);
}

.lianzhu-stage[data-dashboard-id='lf'] .left-info-group .info-body {
  padding: 0.68cqw 1.2cqw 0;
}

.lf-info-columns,
.lf-current-layout {
  position: relative;
  z-index: 1;
  height: 100%;
}

.lf-info-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.15cqw;
}

.lf-info-column,
.lf-current-list {
  display: grid;
  min-width: 0;
  align-content: start;
  gap: 0.08cqw;
}

.lf-info-column.is-right {
  border-left: 1px solid rgba(87, 154, 218, 0.5);
  padding-left: 1.15cqw;
}

.lianzhu-stage[data-dashboard-id='lf'] .left-info-group .figma-info-box:first-child .lf-info-column.is-right .lf-info-row:nth-child(4) {
  margin-top: 0.42cqw;
  border-top: 1px solid rgba(87, 154, 218, 0.36);
  padding-top: 0.48cqw;
}

.lianzhu-stage[data-dashboard-id='lf'] .lf-info-row {
  grid-template-columns: minmax(0, 1fr) max-content max-content;
  height: auto;
  min-height: 1.5cqw;
  gap: 0.34cqw;
}

.lianzhu-stage[data-dashboard-id='lf'] .lf-info-row span,
.lianzhu-stage[data-dashboard-id='lf'] .lf-info-row small {
  overflow: visible;
  font-size: 0.78cqw;
  letter-spacing: 0;
  text-overflow: clip;
}

.lianzhu-stage[data-dashboard-id='lf'] .lf-info-row strong {
  font-size: 1.12cqw;
}

.lf-current-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 8.6cqw;
  align-items: center;
  column-gap: 1.1cqw;
}

.lianzhu-stage[data-dashboard-id='lf'] .left-info-group .figma-info-box:nth-child(2) .lf-current-list {
  align-content: center;
}

.lf-current-gauge {
  position: relative;
  display: grid;
  width: clamp(108px, 7.8cqw, 150px);
  aspect-ratio: 1;
  justify-self: center;
  place-items: center;
  border-radius: 50%;
  background:
    conic-gradient(from -90deg, #058cff 0 76%, rgba(63, 143, 224, 0.55) 76% 100%);
  box-shadow:
    0 0 18px rgba(0, 122, 255, 0.22),
    inset 0 0 12px rgba(3, 184, 255, 0.28);
}

.lf-current-gauge::before {
  content: '';
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  background: #041d42;
  box-shadow: inset 0 0 18px rgba(0, 122, 255, 0.28);
}

.lf-current-gauge-core {
  position: relative;
  z-index: 1;
  text-align: center;
}

.lf-current-gauge-core strong {
  display: block;
  color: #01e3ff;
  font-size: 1.28cqw;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  line-height: 1.1;
}

.lf-current-gauge-core small {
  margin-left: 0.22cqw;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.73cqw;
  font-weight: 500;
}

.lf-current-gauge-core span {
  display: block;
  margin-top: 0.44cqw;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.78cqw;
}

.flow-speed-box {
  grid-column: 1 / -1;
}

.speed-table {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 5.83cqw;
  padding: 0.83cqw;
  background:
    linear-gradient(0deg, rgba(23, 2, 215, 0.2) 0.97%, rgba(33, 106, 255, 0) 92.58%, rgba(32, 111, 255, 0.2) 99.03%),
    linear-gradient(180deg, rgba(7, 27, 67, 0.1) 0%, rgba(13, 46, 89, 0.2) 100%);
}

.speed-table::before {
  content: '';
  position: absolute;
  top: 0.83cqw;
  right: 0.83cqw;
  left: 0.83cqw;
  height: 2.08cqw;
  background: rgba(28, 116, 254, 0.2);
}

.speed-table div {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: repeat(2, 2.08cqw);
  place-items: center;
  color: #fff;
  font-size: 0.63cqw;
  line-height: 1;
  white-space: nowrap;
}

.speed-table strong,
.speed-table span {
  font-weight: 400;
}

.speed-table strong {
  font-weight: 650;
  opacity: 0.95;
}

.figma-process-flow {
  position: absolute;
  top: 83.89%;
  left: 9.38%;
  z-index: 4;
  width: 81.25%;
  height: 11.11%;
  border: 1.2px solid rgba(0, 122, 255, 0.2);
  border-radius: 12px;
  background:
    linear-gradient(180deg, rgba(10, 37, 83, 0.72) 0%, rgba(7, 27, 67, 0.8) 100%),
    rgba(7, 27, 67, 0.8);
  box-shadow:
    inset 0 0 28px rgba(0, 122, 255, 0.12),
    0 0 24px rgba(0, 54, 160, 0.2);
}

.figma-process-flow:has(.process-step-card:nth-of-type(7)) {
  left: 3.8%;
  width: 92.4%;
}

.figma-process-flow:has(.process-step-card:nth-of-type(7)) .process-step-card {
  width: 12%;
}

.lianzhu-stage[data-dashboard-id='gaolu'] .process-step-card {
  width: 13.65%;
  padding: 0 0.3vw;
}

.process-step-card {
  position: absolute;
  top: 16.67%;
  display: flex;
  width: 12.88%;
  height: 66.67%;
  align-items: center;
  justify-content: center;
  border: 1.2px solid rgba(255, 255, 255, 0.42);
  border-radius: 12px;
  padding: 0 0.4vw;
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0.14) 0%, rgba(73, 92, 125, 0.36) 56%, rgba(12, 27, 55, 0.68) 100%),
    rgba(255, 255, 255, 0.05);
  box-shadow:
    inset 0 0 18px rgba(255, 255, 255, 0.05),
    0 0 12px rgba(0, 18, 52, 0.18);
  opacity: 0.82;
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.process-step-card.is-active {
  border-color: rgba(0, 122, 255, 0.86);
  background:
    linear-gradient(115deg, rgba(0, 122, 255, 0.22) 0%, rgba(9, 40, 90, 0.76) 56%, rgba(8, 24, 55, 0.92) 100%),
    rgba(28, 116, 254, 0.09);
  box-shadow:
    inset 0 0 22px rgba(0, 122, 255, 0.2),
    0 0 16px rgba(0, 122, 255, 0.18);
  opacity: 1;
  animation: process-active-glow 1.8s ease-in-out infinite;
}

.process-step-card.is-completed {
  border-color: rgba(1, 227, 255, 0.62);
  background:
    linear-gradient(115deg, rgba(1, 227, 255, 0.18) 0%, rgba(11, 73, 103, 0.62) 56%, rgba(8, 35, 57, 0.84) 100%),
    rgba(22, 222, 110, 0.08);
  box-shadow:
    inset 0 0 18px rgba(1, 227, 255, 0.14),
    0 0 12px rgba(22, 222, 110, 0.12);
  opacity: 0.95;
}

.process-step-card::before,
.process-step-card::after {
  content: '';
  position: absolute;
  width: 7px;
  height: 7px;
  pointer-events: none;
}

.process-step-card::before {
  top: -1px;
  left: -1px;
  border-top: 1.2px solid rgba(255, 255, 255, 0.5);
  border-left: 1.2px solid rgba(255, 255, 255, 0.5);
  border-radius: 12px 0 0;
}

.process-step-card::after {
  right: -1px;
  bottom: -1px;
  border-right: 1.2px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1.2px solid rgba(255, 255, 255, 0.5);
  border-radius: 0 0 12px;
}

.process-step-card.is-active::before,
.process-step-card.is-completed::before {
  border-top-color: #007aff;
  border-left-color: #007aff;
}

.process-step-card.is-active::after,
.process-step-card.is-completed::after {
  border-right-color: #007aff;
  border-bottom-color: #007aff;
}

.process-step-icon {
  display: block;
  width: min(3.13vw, 60px);
  height: min(3.13vw, 60px);
  flex: 0 0 auto;
  margin-right: 0.52vw;
  object-fit: contain;
  filter: grayscale(1) brightness(1.9) opacity(0.66);
  transition: filter 0.2s ease;
}

.process-step-card.is-active .process-step-icon {
  filter: drop-shadow(0 0 10px rgba(0, 171, 255, 0.52));
}

.process-step-card.is-completed .process-step-icon {
  filter: drop-shadow(0 0 8px rgba(22, 222, 110, 0.32)) brightness(1.18);
}

.process-step-card span {
  color: rgba(255, 255, 255, 0.74);
  font-size: clamp(11px, 0.94vw, 18px);
  font-weight: 650;
  line-height: 1.2;
  white-space: nowrap;
  text-shadow: none;
}

.process-step-card.is-active span {
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 0 8px rgba(0, 122, 255, 0.28);
}

.process-step-card.is-completed span {
  color: rgba(224, 255, 247, 0.92);
  text-shadow: 0 0 8px rgba(1, 227, 255, 0.2);
}

.process-arrow {
  position: absolute;
  top: 40%;
  display: block;
  width: 1.47%;
  height: 20%;
  object-fit: contain;
  filter: grayscale(1) brightness(1.8) opacity(0.58);
  pointer-events: none;
}

.process-arrow.is-completed {
  filter: drop-shadow(0 0 6px rgba(0, 208, 255, 0.68));
}

@keyframes lianzhu-enter {
  from {
    opacity: 0;
    transform: translateX(16px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes kpi-breathe {
  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(1, 227, 255, 0));
  }

  50% {
    filter: drop-shadow(0 0 10px rgba(1, 227, 255, 0.18));
  }
}

@keyframes status-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(22, 222, 110, 0);
  }

  50% {
    box-shadow: 0 0 18px rgba(22, 222, 110, 0.56);
  }
}

@keyframes process-active-glow {
  0% {
    box-shadow:
      inset 0 0 18px rgba(0, 122, 255, 0.14),
      0 0 10px rgba(0, 122, 255, 0.12);
  }

  50% {
    box-shadow:
      inset 0 0 26px rgba(0, 122, 255, 0.26),
      0 0 20px rgba(0, 171, 255, 0.26);
  }

  100% {
    box-shadow:
      inset 0 0 18px rgba(0, 122, 255, 0.14),
      0 0 10px rgba(0, 122, 255, 0.12);
  }
}

.missing-dashboard {
  display: grid;
  min-height: 100vh;
  place-content: center;
  gap: 16px;
  background: #04142d;
  color: #fff;
  text-align: center;
}

.missing-dashboard a {
  color: #18d6ff;
  font-weight: 900;
}
</style>
