<template>
  <div class="section-title">
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()
</script>

<style scoped>
.section-title {
  max-width: 780px;
  margin-bottom: 32px;
}

.eyebrow {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  padding: 6px 11px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
  color: #1268d6;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  box-shadow: 0 12px 28px rgba(43, 112, 198, 0.08);
  backdrop-filter: blur(14px);
}

h2 {
  margin: 0;
  color: #092b66;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 850;
  line-height: 1.16;
}

p {
  margin: 14px 0 0;
  color: var(--color-muted);
  font-size: 16px;
  line-height: 1.8;
}
</style>
