<template>
  <component
    :is="cardComponent"
    class="case-card"
    :class="{ 'case-card--coming-soon': isComingSoon }"
    v-bind="cardAttrs"
  >
    <span class="case-index">{{ displayIndex }}</span>
    <span
      class="case-cover"
      :class="{ 'case-cover--liangxuan': isLiangxuanCase, 'case-cover--image': hasCoverImage }"
      :style="coverStyle"
    >
      <DeviceHealthCaseCoverVisual v-if="isDeviceHealthCase" />
      <img
        v-else-if="hasCoverImage"
        class="case-cover-image"
        :src="item.coverImage"
        :alt="`${item.title}封面`"
        loading="lazy"
        decoding="async"
      />
      <LiangxuanCaseCoverVisual v-else-if="isLiangxuanCase" />
      <span v-else class="case-category">{{ item.category }}</span>
      <span v-if="isComingSoon" class="case-coming-soon-label">项目筹备中</span>
    </span>
    <span class="case-card-body">
      <strong>{{ item.title }}</strong>
      <span class="case-summary">{{ item.summary }}</span>
      <span class="case-tags">
        <small v-for="tag in item.tags.slice(0, 4)" :key="tag">{{ tag }}</small>
      </span>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import DeviceHealthCaseCoverVisual from '@/cases/device-health-management-platform/DeviceHealthCaseCoverVisual.vue'
import LiangxuanCaseCoverVisual from '@/cases/liangxuan-mini-program/LiangxuanCaseCoverVisual.vue'
import type { CaseItem } from '@/data/cases'

const props = defineProps<{
  item: CaseItem
  index?: number
}>()

const displayIndex = computed(() => String((props.index ?? 0) + 1).padStart(2, '0'))
const isComingSoon = computed(() => props.item.comingSoon || props.item.status === 'coming-soon')
const isLiangxuanCase = computed(() => props.item.id === 'liangxuan-mini-program' || props.item.id === 'mini-program')
const isDeviceHealthCase = computed(() => props.item.id === 'device-health-management-platform')
const hasCoverImage = computed(() => Boolean(props.item.coverImage))
const coverStyle = computed(() => (isLiangxuanCase.value || hasCoverImage.value ? undefined : { background: props.item.cover }))
const cardComponent = computed(() => (isComingSoon.value ? 'article' : RouterLink))
const cardAttrs = computed(() =>
  isComingSoon.value
    ? {
        'aria-disabled': 'true',
        tabindex: '-1',
      }
    : {
        to: props.item.link ?? `/cases/${props.item.id}`,
      },
)
</script>

<style scoped>
.case-card {
  --showcase-radius: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-top: 34px;
  border-radius: var(--showcase-radius);
  color: inherit;
}

.case-card--coming-soon {
  cursor: default;
}

.case-index {
  position: absolute;
  top: 9px;
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

.case-cover {
  position: relative;
  z-index: 1;
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10.2;
  border: 1px solid rgba(9, 43, 102, 0.08);
  border-radius: var(--showcase-radius);
  background-blend-mode: screen;
  box-shadow: 0 18px 44px rgba(15, 42, 95, 0.08);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.case-card--coming-soon .case-cover {
  border-color: rgba(55, 118, 186, 0.1);
  background-blend-mode: luminosity, screen;
  box-shadow: 0 16px 38px rgba(15, 42, 95, 0.06);
}

.case-card--coming-soon .case-cover::before {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.76), rgba(237, 247, 255, 0.48)),
    radial-gradient(circle at 76% 34%, rgba(255, 255, 255, 0.66), transparent 30%);
}

.case-card--coming-soon .case-cover::after {
  background: rgba(255, 255, 255, 0.58);
}

.case-card--coming-soon .case-cover > :not(.case-coming-soon-label) {
  filter: saturate(0.38) brightness(1.06);
  opacity: 0.62;
}

.case-cover::before {
  content: '';
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(255, 255, 255, 0.68);
  border-radius: calc(var(--showcase-radius) - 4px);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.12)),
    radial-gradient(circle at 76% 34%, rgba(255, 255, 255, 0.58), transparent 30%);
}

.case-cover::after {
  content: '';
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: 42%;
  height: 38%;
  border: 1px solid rgba(255, 255, 255, 0.64);
  border-radius: calc(var(--showcase-radius) - 4px);
  background: rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(12px);
}

.case-cover--liangxuan {
  background: transparent;
}

.case-cover--image {
  background: #f7fbff;
}

.case-cover--liangxuan::before,
.case-cover--liangxuan::after,
.case-cover--image::before,
.case-cover--image::after {
  display: none;
}

.case-cover-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
}

.case-category {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  max-width: calc(100% - 32px);
  border-radius: var(--showcase-radius);
  color: rgba(9, 43, 102, 0.56);
  font-size: 11px;
  font-weight: 800;
  line-height: 1.45;
}

.case-coming-soon-label {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 4;
  display: inline-flex;
  min-width: 118px;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  padding: 7px 16px;
  border: 1px solid rgba(44, 132, 219, 0.22);
  border-radius: 999px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(230, 244, 255, 0.82)),
    rgba(255, 255, 255, 0.78);
  box-shadow:
    0 10px 24px rgba(25, 97, 170, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.86);
  color: #256497;
  font-size: 13px;
  font-weight: 850;
  line-height: 1.2;
  letter-spacing: 0;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(12px);
}

.case-card-body {
  display: flex;
  flex-direction: column;
  padding-top: 24px;
}

.case-card-body strong {
  display: block;
  color: #12233b;
  font-size: 24px;
  font-weight: 850;
  line-height: 1.28;
}

.case-summary {
  display: block;
  margin-top: 12px;
  margin-bottom: 18px;
  color: #66788e;
  font-size: 14px;
  line-height: 1.7;
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 0;
}

.case-tags small {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 5px 10px;
  border: 1px solid rgba(9, 43, 102, 0.14);
  border-radius: var(--showcase-radius);
  color: #4f6278;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
}

.case-card:hover .case-cover {
  box-shadow: 0 24px 58px rgba(15, 42, 95, 0.12);
  transform: translateY(-4px);
}

.case-card--coming-soon:hover .case-cover {
  box-shadow: 0 16px 38px rgba(15, 42, 95, 0.06);
  transform: none;
}

@media (max-width: 640px) {
  .case-card {
    padding-top: 32px;
  }

  .case-card-body strong {
    font-size: 22px;
  }
}
</style>
