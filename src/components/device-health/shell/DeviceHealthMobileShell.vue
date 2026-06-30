<template>
  <Suspense>
    <DeviceHealthMobileView />
    <template #fallback>
      <div class="device-health-shell" aria-label="设备健康移动端预览加载中"></div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent, defineComponent, h } from 'vue'
import { useDeviceHealthRuntime } from '@/hooks/useDeviceHealthRuntime'

useDeviceHealthRuntime()

const DeviceHealthFallback = defineComponent({
  name: 'DeviceHealthFallback',
  setup() {
    return () => h('div', { class: 'device-health-shell safe-skeleton', 'aria-label': '设备健康移动端预览降级显示' })
  },
})

const DeviceHealthMobileView = defineAsyncComponent({
  loader: () => import('../view/DeviceHealthMobileView.vue'),
  delay: 120,
  loadingComponent: DeviceHealthFallback,
  errorComponent: DeviceHealthFallback,
  timeout: 12000,
})
</script>

<style scoped>
.device-health-shell {
  min-height: 100dvh;
  background: #f5f8ff;
}
</style>
