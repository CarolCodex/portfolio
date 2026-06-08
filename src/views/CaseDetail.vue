<template>
  <LiangxuanCase v-if="isLiangxuanCase" />
  <div v-else-if="item" class="container page">
    <section class="detail-hero">
      <div>
        <span class="eyebrow">{{ item.year }} · {{ item.category }}</span>
        <h1>{{ item.title }}</h1>
        <p>{{ item.subtitle }}</p>
        <div class="skill-cloud">
          <SkillTag v-for="tag in item.tags" :key="tag">{{ tag }}</SkillTag>
        </div>
      </div>
      <div class="detail-cover" :style="{ background: item.cover }" />
    </section>

    <section class="detail-grid">
      <article class="content-panel">
        <h2>项目背景</h2>
        <p>{{ item.background }}</p>
      </article>
      <article class="content-panel">
        <h2>我的角色</h2>
        <p>{{ item.role }}</p>
        <p>{{ item.platform }}</p>
      </article>
    </section>

    <section class="section">
      <SectionTitle title="设计挑战" />
      <div class="list-grid">
        <div v-for="challenge in item.challenges" :key="challenge" class="content-panel">
          {{ challenge }}
        </div>
      </div>
    </section>

    <section class="section">
      <SectionTitle title="解决方案" />
      <div class="list-grid">
        <div v-for="solution in item.solutions" :key="solution" class="content-panel">
          {{ solution }}
        </div>
      </div>
    </section>

    <section class="section">
      <SectionTitle
        title="高保真界面占位"
        description="当前使用本地渐变占位，后续可以替换为真实项目截图或脱敏后的界面图。"
      />
      <BeforeAfter />
    </section>

    <section class="detail-grid">
      <article class="content-panel">
        <h2>前端实现说明</h2>
        <ul>
          <li v-for="work in item.frontendWork" :key="work">{{ work }}</li>
        </ul>
      </article>
      <article class="content-panel">
        <h2>AI 工具参与流程</h2>
        <ul>
          <li v-for="flow in item.aiWorkflow" :key="flow">{{ flow }}</li>
        </ul>
      </article>
    </section>

    <section class="section content-panel">
      <h2>后续作品集深化计划</h2>
      <ul>
        <li v-for="plan in item.redesignPlan" :key="plan">{{ plan }}</li>
      </ul>
    </section>

    <section class="section content-panel">
      <h2>复盘总结</h2>
      <p>{{ item.review }}</p>
    </section>
  </div>
  <div v-else-if="!isLiangxuanCase" class="container page">
    <SectionTitle title="案例不存在" description="该案例可能已被移动或尚未添加。" />
    <RouterLink class="button primary" to="/cases">返回案例列表</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BeforeAfter from '@/components/BeforeAfter.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SkillTag from '@/components/SkillTag.vue'
import LiangxuanCase from '@/cases/liangxuan-mini-program/LiangxuanCase.vue'
import { cases } from '@/data/cases'

const route = useRoute()
const item = computed(() => cases.find((caseItem) => caseItem.id === route.params.id))
const isLiangxuanCase = computed(() => route.params.id === 'liangxuan-mini-program' || route.params.id === 'mini-program')
</script>
