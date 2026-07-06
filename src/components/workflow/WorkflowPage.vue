<template>
  <section class="workflow-page" aria-labelledby="workflow-title">
    <div class="workflow-background" aria-hidden="true">
      <span class="light-field light-field--blue"></span>
      <span class="light-field light-field--cyan"></span>
      <span class="light-field light-field--green"></span>
      <span class="light-field light-field--orange"></span>
      <span class="light-field light-field--violet"></span>
    </div>

    <div class="workflow-shell">
      <WorkflowHero />
      <WorkflowTimeline :items="workflowItems" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import WorkflowHero from './WorkflowHero.vue'
import WorkflowTimeline from './WorkflowTimeline.vue'
import type { WorkflowStep } from './workflowTypes'

const workflowRouteClass = 'workflow-route'

onMounted(() => {
  document.documentElement.classList.add(workflowRouteClass)
  document.body.classList.add(workflowRouteClass)
})

onUnmounted(() => {
  document.documentElement.classList.remove(workflowRouteClass)
  document.body.classList.remove(workflowRouteClass)
})

const workflowItems: WorkflowStep[] = [
  {
    title: '需求理解',
    icon: 'brief',
    description:
      '拿到需求后，先用 ChatGPT / Gemini 辅助梳理业务背景、目标用户、核心场景、页面目标和关键约束，快速判断页面真正要解决的问题。',
  },
  {
    title: '产品梳理',
    icon: 'draft',
    description:
      '围绕 B 端后台、C 端产品、移动端 App、小程序、大屏和终端设备等不同场景，梳理用户路径、信息架构、页面层级和关键操作流程。',
  },
  {
    title: '方案探索',
    icon: 'refine',
    description:
      '使用 Figma Make、Stitch、Gemini 等工具快速生成多版页面方向，辅助验证布局结构、模块顺序、视觉风格和内容表达，再由我筛选和调整可落地方案。',
  },
  {
    title: '交互原型',
    icon: 'code',
    description:
      '根据页面目标完善低保真 / 高保真原型，补充核心路径、按钮状态、表单规则、弹窗反馈、空状态、异常状态和操作边界，让方案更完整。',
  },
  {
    title: '视觉重构',
    icon: 'inspect',
    description:
      '进入 Figma 手动调整视觉细节，包括布局节奏、字号层级、颜色、图标、卡片、间距、圆角、阴影和动效反馈，保证页面美观、清晰且符合产品气质。',
  },
  {
    title: 'Design.MD',
    icon: 'connect',
    description:
      '将成熟页面拆解为可复用组件，沉淀颜色、字体、按钮、表单、表格、卡片、标签、商品卡、弹窗和状态规范，支持多页面持续扩展。',
  },
  {
    title: 'Codex还原',
    icon: 'fix',
    description:
      '长期使用 Codex / Cursor 辅助将设计稿转成可运行页面 Demo，重点验证布局还原、响应式适配、组件复用、交互状态和页面细节，提升设计与研发沟通效率。',
  },
  {
    title: '走查交付',
    icon: 'commit',
    description:
      '上线前对照设计稿检查页面还原度，重点关注字号、间距、颜色、圆角、阴影、状态反馈、真实数据、移动端适配和加载性能，减少交付偏差。',
  },
]
</script>

<style scoped>
:global(html.workflow-route),
:global(body.workflow-route) {
  background: #05070d;
}

:global(body.workflow-route::before) {
  opacity: 0;
}

:global(body.workflow-route main) {
  background: #05070d;
}

.workflow-page {
  position: relative;
  isolation: isolate;
  min-height: calc(100vh - 76px);
  overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 16%, rgba(47, 107, 255, 0.42), transparent 38rem),
    radial-gradient(ellipse at 50% 46%, rgba(39, 195, 255, 0.2), transparent 48rem),
    linear-gradient(180deg, #05070d 0%, #070b12 48%, #05070d 100%);
}

.workflow-page::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(rgba(91, 140, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(91, 140, 255, 0.045) 1px, transparent 1px);
  background-size: 82px 82px;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 72%);
}

.workflow-page::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(5, 7, 13, 0) 0%, rgba(5, 7, 13, 0.48) 82%),
    radial-gradient(ellipse at center, transparent 0%, rgba(3, 5, 10, 0.78) 76%);
  pointer-events: none;
}

.workflow-background {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.light-field {
  position: absolute;
  display: block;
  border-radius: 999px;
  filter: blur(64px);
  mix-blend-mode: screen;
  opacity: 0.36;
  transform: translate3d(0, 0, 0);
  animation: field-drift 18s ease-in-out infinite alternate;
}

.light-field--blue {
  width: 56vw;
  height: 30vw;
  left: 22%;
  top: 6%;
  background: rgba(47, 107, 255, 0.72);
}

.light-field--cyan {
  width: 34vw;
  height: 18vw;
  right: 8%;
  top: 31%;
  background: rgba(39, 195, 255, 0.42);
  animation-duration: 22s;
  animation-delay: -7s;
}

.light-field--green {
  width: 28vw;
  height: 16vw;
  left: 8%;
  top: 44%;
  background: rgba(56, 216, 165, 0.26);
  animation-duration: 24s;
  animation-delay: -5s;
}

.light-field--orange {
  width: 24vw;
  height: 12vw;
  left: 37%;
  top: 10%;
  background: rgba(255, 155, 74, 0.2);
  animation-duration: 26s;
  animation-delay: -11s;
}

.light-field--violet {
  width: 32vw;
  height: 18vw;
  right: 18%;
  bottom: 12%;
  background: rgba(139, 92, 255, 0.28);
  animation-duration: 21s;
  animation-delay: -9s;
}

.workflow-shell {
  width: min(100% - 40px, 1120px);
  margin-inline: auto;
  padding: 92px 0 128px;
}

@keyframes field-drift {
  0% {
    opacity: 0.22;
    transform: translate3d(-2%, -1%, 0) scale(0.94);
  }

  50% {
    opacity: 0.42;
    transform: translate3d(3%, 2%, 0) scale(1.04);
  }

  100% {
    opacity: 0.3;
    transform: translate3d(-1%, 3%, 0) scale(1.1);
  }
}

@media (max-width: 720px) {
  .workflow-page {
    min-height: calc(100vh - 66px);
  }

  .workflow-shell {
    width: min(100% - 28px, 1120px);
    padding: 58px 0 86px;
  }

  .light-field {
    filter: blur(48px);
  }

  .light-field--blue {
    width: 92vw;
    height: 56vw;
    left: 2%;
    top: 4%;
  }

  .light-field--cyan,
  .light-field--green,
  .light-field--orange,
  .light-field--violet {
    width: 68vw;
    height: 34vw;
  }
}

@media (prefers-reduced-motion: reduce) {
  .light-field {
    animation: none;
  }
}
</style>
