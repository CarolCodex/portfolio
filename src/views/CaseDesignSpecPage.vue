<template>
  <div v-if="item?.designSpec" class="container page">
    <RouterLink class="back-link" :to="`/cases/${item.id}`">返回案例详情</RouterLink>

    <section class="spec-hero content-panel">
      <span class="eyebrow">{{ item.year }} · {{ item.category }}</span>
      <h1>{{ item.title }}｜设计规范</h1>
      <p>{{ item.designSpec.summary }}</p>
    </section>

    <section class="section">
      <CaseDesignSpecBlock :spec="item.designSpec" :show-title="false" />
    </section>
  </div>

  <div v-else class="container page">
    <SectionTitle title="设计规范不存在" description="该案例可能尚未补充设计规范，或页面已被移动。" />
    <RouterLink class="button primary" :to="caseDetailPath">返回案例详情</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import CaseDesignSpecBlock from '@/components/CaseDesignSpecBlock.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { cases } from '@/data/cases'

const route = useRoute()
const item = computed(() => cases.find((caseItem) => caseItem.id === route.params.id))
const caseDetailPath = computed(() => (typeof route.params.id === 'string' ? `/cases/${route.params.id}` : '/cases'))
</script>

<style scoped>
.spec-hero {
  padding: 34px;
}

.spec-hero h1 {
  margin: 14px 0;
  color: var(--color-ink);
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.08;
}

.spec-hero p {
  max-width: 980px;
  margin: 0;
  color: var(--color-muted);
  font-size: 17px;
  line-height: 1.8;
}

@media (max-width: 720px) {
  .spec-hero {
    padding: 28px;
  }
}
</style>
