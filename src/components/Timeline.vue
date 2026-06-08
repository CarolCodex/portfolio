<template>
  <div class="timeline">
    <div v-for="(item, index) in items" :key="item.title" class="timeline-item">
      <span class="step">{{ String(index + 1).padStart(2, '0') }}</span>
      <div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{ title: string; description: string }>
}>()
</script>

<style scoped>
.timeline {
  display: grid;
  gap: 14px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 68px 1fr;
  gap: 18px;
  padding: 22px;
  border: 1px solid rgba(24, 34, 47, 0.08);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 16px 38px rgba(31, 42, 56, 0.06);
}

.step {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 16px;
  background: #17202b;
  color: #fff;
  font-weight: 700;
}

h3 {
  margin: 0 0 8px;
  color: var(--color-ink);
}

p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.7;
}

@media (max-width: 560px) {
  .timeline-item {
    grid-template-columns: 1fr;
  }
}
</style>
