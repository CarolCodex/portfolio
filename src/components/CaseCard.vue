<template>
  <article class="case-card">
    <span class="case-index">{{ displayIndex }}</span>
    <RouterLink class="cover" :style="{ background: item.cover }" :to="`/cases/${item.id}`">
      <span>{{ item.year }}</span>
    </RouterLink>
    <div class="case-content">
      <div class="case-meta">
        <span>{{ item.category }}</span>
      </div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.summary }}</p>
      <div class="tag-row">
        <SkillTag v-for="tag in item.tags.slice(0, 3)" :key="tag">{{ tag }}</SkillTag>
      </div>
      <RouterLink class="text-link" :to="`/cases/${item.id}`">查看详情</RouterLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SkillTag from '@/components/SkillTag.vue'
import type { CaseItem } from '@/data/cases'

const props = defineProps<{
  item: CaseItem
  index?: number
}>()

const displayIndex = String((props.index ?? 0) + 1).padStart(2, '0')
</script>

<style scoped>
.case-card {
  --case-radius: 18px;
  position: relative;
  min-width: 0;
  padding-top: 34px;
  border-radius: var(--case-radius);
  transition: transform 0.22s ease;
}

.case-card:hover {
  transform: translateY(-4px);
}

.case-index {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 0;
  color: transparent;
  -webkit-text-stroke: 1px rgba(9, 43, 102, 0.075);
  font-size: clamp(54px, 5.2vw, 82px);
  font-weight: 850;
  line-height: 0.8;
  transform: translateY(-34%);
  pointer-events: none;
}

.cover {
  position: relative;
  display: block;
  z-index: 1;
  overflow: hidden;
  aspect-ratio: 16 / 10.2;
  border: 1px solid rgba(9, 43, 102, 0.08);
  border-radius: var(--case-radius);
  background-blend-mode: screen;
  box-shadow: 0 18px 44px rgba(15, 42, 95, 0.08);
  isolation: isolate;
  transition: box-shadow 0.22s ease;
}

.case-card:hover .cover {
  box-shadow: 0 24px 58px rgba(15, 42, 95, 0.12);
}

.cover::before {
  content: '';
  position: absolute;
  z-index: 1;
  inset: 14px;
  width: auto;
  height: auto;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: calc(var(--case-radius) - 4px);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.12)),
    radial-gradient(circle at 76% 34%, rgba(255, 255, 255, 0.58), transparent 30%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

.cover::after {
  content: '';
  position: absolute;
  z-index: 2;
  right: 18px;
  bottom: 18px;
  width: 42%;
  height: 38%;
  border: 1px solid rgba(255, 255, 255, 0.64);
  border-radius: calc(var(--case-radius) - 4px);
  background: rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(14px);
}

.cover span {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 5px 10px;
  border-radius: var(--case-radius);
  z-index: 3;
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.68);
  color: #1268d6;
  font-size: 12px;
  font-weight: 800;
  backdrop-filter: blur(12px);
}

.case-content {
  padding: 22px 0 0;
}

.case-meta {
  color: #1268d6;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.45;
}

h3 {
  margin: 10px 0 9px;
  color: #12233b;
  font-size: 24px;
  font-weight: 850;
  line-height: 1.28;
}

p {
  display: -webkit-box;
  min-height: 72px;
  margin: 0;
  color: var(--color-muted);
  overflow: hidden;
  line-height: 1.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0 16px;
}

.tag-row :deep(.skill-tag) {
  min-height: 28px;
  padding: 5px 10px;
  border-color: rgba(9, 43, 102, 0.14);
  border-radius: var(--case-radius);
  background: rgba(255, 255, 255, 0.38);
  color: #4f6278;
  font-size: 12px;
  font-weight: 700;
  box-shadow: none;
}

.text-link {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 7px 12px;
  border-radius: var(--case-radius);
  background: rgba(13, 110, 253, 0.1);
  color: #0b5dcc;
  font-size: 14px;
  font-weight: 700;
}

.text-link:hover {
  background: #0d6efd;
  color: #fff;
}
</style>
