<template>
  <div class="container page cases-page">
    <SectionTitle
      title="精选作品案例"
      description="以目录视角呈现移动端、小程序、终端设备与 B 端系统项目，突出设计判断、结构能力与前端落地过程。"
    />
    <div class="cases-showcase-grid">
      <CaseCard v-for="(item, index) in featuredCases" :key="item.id" :item="item" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CaseCard from '@/components/CaseCard.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { featuredCases } from '@/data/cases'
</script>

<style scoped>
.cases-page {
  padding-top: 104px;
}

.cases-showcase-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 56px 34px;
  margin-top: 44px;
}

@media (max-width: 1120px) {
  .cases-showcase-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .cases-page {
    padding-top: 72px;
  }

  .cases-showcase-grid {
    grid-template-columns: 1fr;
    gap: 34px;
  }
}
</style>
