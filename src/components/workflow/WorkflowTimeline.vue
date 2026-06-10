<template>
  <ol class="workflow-timeline" aria-label="AI 辅助设计工作流步骤">
    <li v-for="(item, index) in items" :key="item.title" class="workflow-timeline__item">
      <WorkflowStepCard :item="item" :index="index" />
    </li>
  </ol>
</template>

<script setup lang="ts">
import WorkflowStepCard from './WorkflowStepCard.vue'
import type { WorkflowStep } from './workflowTypes'

defineProps<{
  items: WorkflowStep[]
}>()
</script>

<style scoped>
.workflow-timeline {
  position: relative;
  display: grid;
  max-width: 900px;
  margin: 0 auto;
  padding: 6px 0;
  gap: 24px;
  list-style: none;
}

.workflow-timeline__item {
  position: relative;
  z-index: 2;
}

@media (max-width: 720px) {
  .workflow-timeline {
    gap: 20px;
  }
}
</style>
