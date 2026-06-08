<template>
  <div class="container page cases-page">
    <SectionTitle
      title="项目案例"
      description="以下案例均使用脱敏描述和渐变占位图，重点展示设计思路、问题拆解、AI 参与方式与前端落地能力。"
    />
    <div class="case-grid">
      <CaseCard v-for="(item, index) in cases" :key="item.id" :item="item" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CaseCard from '@/components/CaseCard.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { cases } from '@/data/cases'
</script>

<style scoped>
.cases-page .case-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 38px 34px;
  margin-top: 36px;
}

@media (max-width: 1120px) {
  .cases-page .case-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .cases-page .case-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }
}
</style>
