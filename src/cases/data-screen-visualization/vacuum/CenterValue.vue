<template>
  <div class="vacuum-center-value" aria-hidden="true">
    <div ref="numberRef" class="center-number">{{ value.toFixed(1) }}</div>
    <div class="center-unit">{{ unit }}</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  unit?: string
}>(), {
  unit: 'kPa',
})

const numberRef = ref<HTMLElement | null>(null)
let displayValue = props.value
let frame = 0

const writeDisplayValue = (value: number) => {
  displayValue = value
  if (numberRef.value) {
    numberRef.value.textContent = value.toFixed(1)
  }
}

const animateValue = (nextValue: number) => {
  cancelAnimationFrame(frame)

  if (!numberRef.value) {
    writeDisplayValue(nextValue)
    return
  }

  const startValue = displayValue
  const startTime = performance.now()
  const duration = 1200

  const tick = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    writeDisplayValue(startValue + (nextValue - startValue) * eased)

    if (progress < 1) {
      frame = requestAnimationFrame(tick)
    }
  }

  frame = requestAnimationFrame(tick)
}

watch(() => props.value, animateValue, { immediate: true })

onMounted(() => {
  writeDisplayValue(displayValue)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
})
</script>

<style scoped>
.vacuum-center-value {
  position: absolute;
  top: 43%;
  left: 50%;
  z-index: 2;
  width: 82%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.94);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  text-align: center;
  pointer-events: none;
}

.center-number {
  color: #00d4ff;
  font-size: clamp(36px, 3cqw, 48px);
  font-weight: 700;
  text-shadow: 0 0 8px rgba(0, 212, 255, 0.62);
}

.center-unit {
  margin-top: 6px;
  color: #00d4ff;
  font-size: clamp(14px, 0.95cqw, 16px);
  font-weight: 600;
}

</style>
