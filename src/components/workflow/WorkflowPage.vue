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
    title: '任务拆解',
    icon: 'brief',
    description: '拿到任务后，先用 ChatGPT 或 Gemini 梳理业务背景、页面目标、用户路径和关键约束，避免一开始就直接画界面。',
  },
  {
    title: '初稿设计',
    icon: 'draft',
    description: '基于已梳理的信息，用 Figma Make 或 Stitch 快速生成初版页面，先验证大方向，包括布局、模块顺序和主要信息层级。',
  },
  {
    title: '设计精修',
    icon: 'refine',
    description: '进入 Figma 手动调整视觉细节，包括间距、字体、颜色、组件状态、页面节奏和整体一致性，形成可交付设计稿。',
  },
  {
    title: '前端实现',
    icon: 'code',
    description: '将设计稿交给 Codex 辅助实现前端页面，重点处理布局结构、组件拆分、样式规范和响应式适配。',
  },
  {
    title: '还原走查',
    icon: 'inspect',
    description: '对照设计稿检查页面还原度，重点看字号、间距、颜色、圆角、阴影、状态反馈和移动端适配。',
  },
  {
    title: '接口联调',
    icon: 'connect',
    description: '根据接口字段和参数结构接入真实数据，处理 loading、空状态、异常状态、字段缺失和数据展示边界。',
  },
  {
    title: '问题修复',
    icon: 'fix',
    description: '联调后集中处理样式错位、交互异常、接口兼容和移动端适配问题，并在发布前完成图片压缩、懒加载、代码分包和资源清理，提升页面加载速度。',
  },
  {
    title: '代码提交',
    icon: 'commit',
    description: '拉取最新代码，确认无冲突后整理提交内容，完成 commit，保证本次任务改动清晰、可追踪。',
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
