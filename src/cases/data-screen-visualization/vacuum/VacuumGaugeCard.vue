<template>
  <div ref="cardRef" class="vacuum-gauge-card" :data-gauge-field="field">
    <div class="gauge-zone">
      <GaugeChart :value="currentVacuum" />
      <CenterValue :value="currentVacuum" unit="kPa" />
      <div class="gauge-caption">当前真空度</div>
    </div>
    <DataList :items="items" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { KpiField } from '../dataEngine'
import CenterValue from './CenterValue.vue'
import DataList, { type VacuumDataItem } from './DataList.vue'
import GaugeChart from './GaugeChart.vue'

const props = withDefaults(defineProps<{
  value?: number
  field?: KpiField
  items?: VacuumDataItem[]
}>(), {
  value: 0,
  items: () => [
    { label: '高真空度', value: '1000.0', unit: 'Pa' },
    { label: '泵侧全程真空度', value: '100.0', unit: 'kPa' },
    { label: '保真空计时(<67Pa)', value: '17:49' },
    { label: '抽真空计时', value: '00:17:49' },
  ],
})

type GaugeValueEvent = CustomEvent<{ value: number }>

const cardRef = ref<HTMLElement | null>(null)
const currentVacuum = ref(0)

const updateGaugeValue = (event: Event) => {
  const value = (event as GaugeValueEvent).detail?.value
  if (Number.isFinite(value)) {
    currentVacuum.value = value
  }
}

onMounted(() => {
  currentVacuum.value = props.value
  cardRef.value?.addEventListener('dashboard:gauge-value', updateGaugeValue)
})

onBeforeUnmount(() => {
  cardRef.value?.removeEventListener('dashboard:gauge-value', updateGaugeValue)
})
</script>

<style scoped>
.vacuum-gauge-card {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  min-height: 0;
  grid-template-rows: minmax(164px, 1fr) auto;
  gap: 0;
  overflow: hidden;
  background: transparent;
}

.gauge-zone {
  position: relative;
  min-width: 0;
  height: 100%;
  min-height: 0;
}

.gauge-caption {
  position: absolute;
  bottom: clamp(10px, 0.82cqw, 16px);
  left: 50%;
  z-index: 3;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.94);
  font-size: clamp(12px, 0.86cqw, 14px);
  font-weight: 650;
  letter-spacing: 0;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
}
</style>
