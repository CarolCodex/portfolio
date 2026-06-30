<template>
  <div v-if="config" class="lianzhu-page">
    <div ref="stageRef" class="lianzhu-stage" :data-dashboard-id="config.id">
      <video
        v-if="shouldUseSceneVideo"
        ref="sceneVideoRef"
        class="scene-image model-video"
        :data-src="config.video"
        :poster="config.poster"
        :aria-label="config.sceneAlt"
        autoplay
        muted
        loop
        playsinline
        preload="none"
        data-lazy="true"
        @canplay="handleSceneVideoReady"
        @loadeddata="handleSceneVideoReady"
        @stalled="handleSceneVideoStall"
        @error="handleSceneVideoError"
      >
        <source v-if="sceneVideoWebmSrc" :src="sceneVideoWebmSrc" type="video/webm" />
        <source v-if="sceneVideoSrc" :src="sceneVideoSrc" type="video/mp4" />
      </video>
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
          :src="screenImages.titleBg"
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
              :src="screenImages.infoTitleBg"
              alt=""
              width="275"
              height="39"
              loading="lazy"
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
                  :src="screenImages.gaoluStatusOverviewBg"
                  alt=""
                  width="158"
                  height="118"
                  loading="lazy"
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
              :src="screenImages.infoBoxBottom"
              alt=""
              width="276"
              height="8"
              loading="lazy"
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
              :src="screenImages.infoTitleBg"
              alt=""
              width="275"
              height="39"
              loading="lazy"
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
              :src="screenImages.infoBoxBottom"
              alt=""
              width="276"
              height="8"
              loading="lazy"
              decoding="async"
            />
          </div>
        </article>

        <article v-if="config.id === 'vd'" class="figma-info-box vd-cooling-card" aria-label="冷却水回水温度">
          <h2>
            <img
              :src="screenImages.infoTitleBg"
              alt=""
              width="275"
              height="39"
              loading="lazy"
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
              :src="screenImages.coolingWaterTemperature"
              alt=""
              width="131"
              height="131"
              loading="eager"
              decoding="async"
            />
            <img
              class="box-bottom vd-cooling-bottom"
              :src="screenImages.infoBoxBottom"
              alt=""
              width="276"
              height="8"
              loading="lazy"
              decoding="async"
            />
          </div>
        </article>

        <section v-if="config.id !== 'vd'" class="flow-speed-box" data-node-id="1:4228">
          <h2 data-node-id="1:4243">
            <img
              :src="screenImages.infoTitleBg"
              alt=""
              width="574"
              height="39"
              loading="lazy"
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
              :src="screenImages.infoBoxBottom"
              alt=""
              width="574"
              height="8"
              loading="lazy"
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
            :src="screenImages.processArrow"
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
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getDashboardConfig } from './PageConfig'
import RealtimeLineChart from './RealtimeLineChart.vue'
import { useDashboardRuntime } from './hooks/useDashboardRuntime'
import { useLazySceneVideo } from './hooks/useLazySceneVideo'
import { useRealtimeKPI } from './hooks/useRealtimeKPI'
import type { DashboardInfoPanel } from './types'
import VacuumGaugeCard from './vacuum/VacuumGaugeCard.vue'
import { dataScreenAssets } from '@/shared/assets'

const route = useRoute()
const config = computed(() => getDashboardConfig(String(route.meta.dashboardId ?? 'lianzhu')))
const screenImages = dataScreenAssets.images
const dashboardRuntime = useDashboardRuntime()
const { stageRef, getStepStatus, getArrowStatus } = useRealtimeKPI(config, dashboardRuntime)
const {
  sceneVideoRef,
  shouldUseSceneVideo,
  sceneVideoSrc,
  sceneVideoWebmSrc,
  handleSceneVideoReady,
  handleSceneVideoStall,
  handleSceneVideoError,
} = useLazySceneVideo(config, dashboardRuntime)

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
</script>

<style scoped src="./LianzhuDashboard.css"></style>
