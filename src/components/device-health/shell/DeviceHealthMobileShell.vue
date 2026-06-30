<template>
  <Suspense>
    <DeviceHealthMobileView />
    <template #fallback>
      <div class="device-health-shell" aria-label="设备健康移动端预览加载中"></div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useDeviceHealthRuntime } from '@/hooks/useDeviceHealthRuntime'

useDeviceHealthRuntime()

const DeviceHealthMobileView = defineAsyncComponent({
  loader: () => import('../view/DeviceHealthMobileView.vue'),
  delay: 120,
})
</script>

<style scoped>
.device-health-shell {
  min-height: 100dvh;
  background: #f5f8ff;
}
</style>
