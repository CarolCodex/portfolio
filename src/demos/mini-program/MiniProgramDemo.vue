<template>
  <div class="demo-page">
    <section class="demo-hero">
      <aside class="demo-copy">
        <h1>靓轩小程序可交互Demo</h1>
        <p>
          第一阶段优先还原 Figma 首页：红色商城头部、新人专区、分类金刚区、营销模块、双列商品流和小程序底部导航。
        </p>
        <div class="demo-actions">
          <button class="button primary" type="button" @click="appShellRef?.setTab('home')">查看首页</button>
          <button class="button secondary" type="button" @click="appShellRef?.setTab('category')">查看分类占位</button>
        </div>
        <div class="interaction-notes" aria-label="交互状态说明">
          <article v-for="item in interactionNotes" :key="item.title">
            <strong>{{ item.title }}</strong>
            <span>{{ item.description }}</span>
          </article>
        </div>
      </aside>

      <div class="demo-phone-stage">
        <PhoneFrame>
          <MiniAppShell ref="appShellRef" />
        </PhoneFrame>
      </div>
    </section>

    <section id="mini-program-visual-spec" class="demo-visual-spec">
      <div class="demo-section-title">
        <h2>视觉规范</h2>
      </div>
      <MiniProgramVisualSpec />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MiniProgramVisualSpec from '@/cases/liangxuan-mini-program/MiniProgramVisualSpec.vue'
import MiniAppShell from './components/MiniAppShell.vue'
import PhoneFrame from './components/PhoneFrame.vue'

const appShellRef = ref<InstanceType<typeof MiniAppShell> | null>(null)

const interactionNotes = [
  { title: '首页还原', description: '手机内部首页以 Figma node-id=200:2 为视觉基准。' },
  { title: '基础交互', description: '底部 Tab 可切换，分类图标可进入分类占位页。' },
  { title: '加购反馈', description: '点击商品加号累加购物车角标，并保留轻微按压反馈。' },
]
</script>

<style scoped>
.demo-page {
  width: 100%;
  min-height: calc(100vh - 76px);
  padding: 0;
  overflow-x: hidden;
}

.demo-hero {
  display: grid;
  grid-template-columns: minmax(420px, 1fr) minmax(360px, 460px);
  width: min(100% - 96px, 1320px);
  margin: 0 auto;
  gap: clamp(64px, 7vw, 112px);
  align-items: center;
  padding: 72px 0 88px;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.demo-copy {
  min-width: 0;
  max-width: 620px;
}

.demo-phone-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
  overflow: visible;
}

h1 {
  max-width: 680px;
  margin: 0 0 18px;
  color: #0f2a5f;
  font-size: clamp(34px, 5vw, 58px);
  line-height: 1.12;
}

p {
  max-width: 640px;
  margin: 0;
  color: #5d728f;
  line-height: 1.8;
}

.demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.demo-actions button,
.demo-actions a {
  cursor: pointer;
}

.demo-actions a {
  text-decoration: none;
}

.interaction-notes {
  display: grid;
  gap: 12px;
  max-width: 620px;
  margin-top: 34px;
}

.interaction-notes article {
  display: grid;
  gap: 6px;
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 18px 42px rgba(43, 112, 198, 0.08);
}

.interaction-notes strong {
  color: #0f2a5f;
}

.interaction-notes span {
  color: #5d728f;
  font-size: 14px;
  line-height: 1.6;
}

.demo-visual-spec {
  width: min(100% - 96px, 1320px);
  margin: 0 auto;
  padding: 8px 0 120px;
  scroll-margin-top: 104px;
}

.demo-section-title {
  margin-bottom: 26px;
}

.demo-section-title h2 {
  margin: 0;
  color: #0f2a5f;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.16;
}

@media (max-width: 940px) {
  .demo-hero {
    grid-template-columns: 1fr;
    width: min(100% - 48px, 720px);
    gap: 40px;
    padding: 48px 0 72px;
  }

  .demo-copy {
    order: 2;
    max-width: none;
  }

  .demo-phone-stage {
    justify-content: center;
  }

  .demo-visual-spec {
    width: min(100% - 48px, 720px);
    padding-bottom: 88px;
  }
}

@media (max-width: 520px) {
  .demo-page {
    min-height: calc(100vh - 66px);
  }

  .demo-hero {
    width: min(100% - 40px, 720px);
    padding: 32px 0 64px;
  }

  .demo-visual-spec {
    width: min(100% - 40px, 720px);
    padding-bottom: 72px;
  }
}
</style>
