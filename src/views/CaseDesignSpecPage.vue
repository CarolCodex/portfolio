<template>
  <div v-if="item" class="container page">
    <RouterLink class="back-link" :to="`/cases/${item.id}`">返回案例详情</RouterLink>

    <section class="spec-hero content-panel">
      <span class="eyebrow">{{ item.year }} · {{ item.category }}</span>
      <h1>{{ item.title }}｜设计规范</h1>
      <p>设计规范内容占位，后续重新整理。</p>
    </section>

    <section class="section placeholder-section">
      <article class="content-panel spec-placeholder">
        <span>Design Spec Placeholder</span>
        <h2>设计规范待补充</h2>
        <p>这里先保留页面位置，后续可重新整理视觉规范、组件规则、状态说明和页面结构。</p>
      </article>
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

.placeholder-section {
  margin-top: 32px;
}

.spec-placeholder {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-style: dashed;
  text-align: center;
}

.spec-placeholder span {
  color: #1268d6;
  font-size: 13px;
  font-weight: 850;
  letter-spacing: 0;
}

.spec-placeholder h2 {
  margin: 14px 0 10px;
  color: var(--color-ink);
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.15;
}

.spec-placeholder p {
  max-width: 640px;
  margin: 0 auto;
  color: var(--color-muted);
  font-size: 16px;
  line-height: 1.8;
}

@media (max-width: 720px) {
  .spec-hero {
    padding: 28px;
  }
}
</style>
