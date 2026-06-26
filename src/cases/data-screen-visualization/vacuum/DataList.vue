<template>
  <div class="vacuum-data-list">
    <div v-for="item in items" :key="item.label" class="vacuum-data-row">
      <span>{{ item.label }}</span>
      <strong>
        {{ item.value }}
        <small v-if="item.unit">{{ item.unit }}</small>
      </strong>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface VacuumDataItem {
  label: string
  value: string
  unit?: string
}

defineProps<{
  items: VacuumDataItem[]
}>()
</script>

<style scoped>
.vacuum-data-list {
  position: relative;
  z-index: 2;
  display: grid;
  min-height: 0;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgba(56, 152, 255, 0.18);
}

.vacuum-data-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  height: clamp(28px, 2cqw, 34px);
  min-height: 0;
  gap: 12px;
  border-bottom: 1px solid rgba(89, 175, 255, 0.14);
  font-variant-numeric: tabular-nums;
}

.vacuum-data-row:last-child {
  border-bottom: 0;
}

.vacuum-data-row span {
  min-width: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(13px, 0.86cqw, 16px);
  font-weight: 500;
  letter-spacing: 0;
  white-space: nowrap;
}

.vacuum-data-row strong {
  color: #00d4ff;
  font-size: clamp(20px, 1.46cqw, 28px);
  font-weight: 700;
  line-height: 1;
  text-align: right;
  text-shadow: 0 0 8px rgba(0, 212, 255, 0.45);
  white-space: nowrap;
}

.vacuum-data-row small {
  margin-left: 0.42cqw;
  color: rgba(255, 255, 255, 0.84);
  font-size: clamp(11px, 0.74cqw, 14px);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
}
</style>
