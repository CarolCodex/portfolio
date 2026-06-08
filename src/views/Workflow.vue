<template>
  <div class="container page">
    <SectionTitle
      title="AI 不是替代设计判断，而是扩展探索半径"
      description="在作品集中突出 AI 辅助研究、概念探索、交互推演、界面表达和前端验证的流程能力，展示更快到达高质量方案的方式。"
    />

    <Timeline :items="workflowItems" />
  </div>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'
import Timeline from '@/components/Timeline.vue'

const workflowItems = [
  {
    title: '输入业务上下文',
    description: '整理目标用户、核心任务、业务指标和技术约束，先定义问题再使用工具。',
  },
  {
    title: 'AI 辅助发散',
    description: '生成场景脚本、竞品观察、流程草案和文案备选，快速扩大方案候选集。',
  },
  {
    title: '设计筛选与重组',
    description: '基于体验目标、品牌调性和实现成本筛选，转化为信息架构、组件和页面方案。',
  },
  {
    title: '前端 Demo 验证',
    description: '使用 Vue、HTML/CSS 或小程序页面验证布局、交互状态和移动端适配。',
  },
  {
    title: '复盘沉淀',
    description: '将有效提示词、组件规则和设计判断整理为可复用资产，服务下一轮项目。',
  },
]
</script>
