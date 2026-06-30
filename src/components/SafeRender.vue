<template>
  <slot v-if="!hasError" />
  <section v-else class="safe-render-fallback" role="status" aria-live="polite">
    <strong>页面正在降级显示</strong>
    <span>核心内容暂时不可用，请返回首页或稍后刷新。</span>
    <RouterLink class="safe-render-link" to="/">返回首页</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import { RouterLink } from 'vue-router'

const hasError = ref(false)

onErrorCaptured(() => {
  hasError.value = true
  return false
})
</script>

<style scoped>
.safe-render-fallback {
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 12px;
  min-height: 52vh;
  padding: 48px 24px;
  color: #0f2a5f;
  text-align: center;
}

.safe-render-fallback strong {
  font-size: 24px;
  line-height: 1.3;
}

.safe-render-fallback span {
  max-width: 360px;
  color: #5d728f;
  line-height: 1.7;
}

.safe-render-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 10px 16px;
  border: 1px solid rgba(13, 110, 253, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: #0d6efd;
  font-weight: 800;
}
</style>
