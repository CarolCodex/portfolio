<template>
  <div class="demo-page">
    <section class="demo-hero">
      <div class="demo-intro">
        <h1>靓轩小程序可交互 Demo</h1>
        <p>
          基于真实零售小程序流程搭建高保真交互演示，覆盖首页浏览、分类筛选、活动商品、购物车结算等核心路径。点击下方模块，可切换右侧手机 Demo 查看对应页面。
        </p>
      </div>

      <div class="demo-showcase-row">
        <aside class="demo-copy">
          <div class="demo-switcher" aria-label="Demo 切换">
            <button
              v-for="item in demoOptions"
              :key="item.key"
              class="demo-switch-button"
              :class="{ active: activeDemo === item.key }"
              type="button"
              @click="handleDemoSwitch(item.key)"
            >
              {{ item.label }}
            </button>
          </div>

          <section class="current-demo-card" aria-live="polite">
            <span>{{ currentDemo.label }}</span>
            <h2>{{ currentDemo.title }}</h2>
            <nav v-if="activeDemo === 'activity'" class="activity-entry-links" aria-label="活动入口">
              <button
                v-for="item in activityTabs"
                :key="item.type"
                type="button"
                :class="{ active: activeActivityType === item.type }"
                :aria-current="activeActivityType === item.type ? 'true' : undefined"
                @click="handleActivityEntry(item.type)"
              >
                {{ item.label }}
              </button>
            </nav>
            <p>{{ currentDemo.description }}</p>
            <div>
              <strong>交互提示</strong>
              <small>{{ currentDemo.hint }}</small>
            </div>
          </section>

          <div class="experience-highlights" aria-label="体验亮点">
            <article v-for="item in experienceHighlights" :key="item.title">
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
import { computed, ref } from 'vue'
import MiniProgramVisualSpec from '@/cases/liangxuan-mini-program/MiniProgramVisualSpec.vue'
import MiniAppShell from './components/MiniAppShell.vue'
import PhoneFrame from './components/PhoneFrame.vue'
import { activityTabs, type ActivityType } from './mock/activity'

const appShellRef = ref<InstanceType<typeof MiniAppShell> | null>(null)
type DemoKey = 'home' | 'category' | 'activity' | 'cart'

const activeDemo = ref<DemoKey>('home')
const activeActivityType = ref<ActivityType>('hot')

const demoOptions: Array<{ key: DemoKey; label: string }> = [
  { key: 'home', label: '查看首页' },
  { key: 'category', label: '查看分类' },
  { key: 'activity', label: '查看活动商品' },
  { key: 'cart', label: '查看购物车' },
]

const demoContent: Record<DemoKey, {
  label: string
  title: string
  description: string
  hint: string
}> = {
  home: {
    label: '首页 Demo',
    title: '首页商品流与营销入口',
    description: '还原红色商城首页结构，包含顶部地址、搜索栏、新人专区、分类金刚区、活动商品入口和底部 Tab 导航。',
    hint: '可点击商品加购、切换底部 Tab，查看首页到购物车的转化路径。',
  },
  category: {
    label: '分类 Demo',
    title: '分类筛选与商品列表',
    description: '展示顶部搜索、横向一级分类、左侧垂直分类导航、商品列表和筛选排序区域。',
    hint: '可切换左侧分类，点击商品加购，观察购物车数量同步变化。',
  },
  activity: {
    label: '活动商品 Demo',
    title: '活动商品与多状态卡片',
    description: '展示团购、预售、秒杀、热卖四类活动商品卡片，包含价格、标签、倒计时、进度条和行动按钮。',
    hint: '可切换顶部活动 Tab；点击加入购物车后，小红点以抛物线飞入底部购物车。',
  },
  cart: {
    label: '购物车 Demo',
    title: '购物车分组与结算链路',
    description: '展示购物车有数据状态和空状态，包括地址栏、配送分组、商品数量加减、推荐和底部结算栏。',
    hint: '可调整商品数量、清空购物车、查看空状态，也可从推荐商品重新加入购物车。',
  },
}

const currentDemo = computed(() => demoContent[activeDemo.value])

const experienceHighlights = [
  { title: '页面还原', description: '基于 Figma 高保真稿还原真实零售小程序界面。' },
  { title: '基础交互', description: '支持 Tab 切换、分类筛选、商品加购、购物车数量同步。' },
  { title: '加购反馈', description: '点击加购后，小红点抛物线飞入购物车，强化操作反馈。' },
]

function handleDemoSwitch(key: DemoKey) {
  activeDemo.value = key

  if (key === 'home' || key === 'category' || key === 'cart') {
    appShellRef.value?.setTab(key)
    return
  }

  if (key === 'activity') {
    appShellRef.value?.setActivityDemo(activeActivityType.value)
  }
}

function handleActivityEntry(type: ActivityType) {
  activeDemo.value = 'activity'
  activeActivityType.value = type
  appShellRef.value?.setActivityDemo(type)
}
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
  grid-template-columns: minmax(0, 1fr);
  width: min(100% - 96px, 1320px);
  margin: 0 auto;
  gap: 42px;
  align-items: start;
  justify-items: center;
  padding: 64px 0 88px;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.demo-intro {
  display: grid;
  min-width: 0;
  width: min(100%, 1040px);
  max-width: none;
  justify-items: center;
  text-align: center;
}

.demo-showcase-row {
  display: grid;
  grid-template-columns: minmax(640px, 1fr) minmax(360px, 460px);
  align-items: center;
  gap: clamp(52px, 6vw, 96px);
  width: 100%;
}

.demo-copy {
  display: grid;
  min-width: 0;
  width: 100%;
  max-width: 760px;
  justify-self: end;
  justify-items: stretch;
  text-align: left;
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
  max-width: 780px;
  margin: 0;
  color: #5d728f;
  line-height: 1.8;
}

.demo-switcher {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 100%;
  margin-top: 0;
}

.demo-switch-button {
  flex: 0 0 auto;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 12px 28px rgba(43, 112, 198, 0.08);
  color: #17528f;
  font-size: 15px;
  font-weight: 800;
  line-height: 22px;
  cursor: pointer;
  transition:
    background 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.demo-switch-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 34px rgba(43, 112, 198, 0.12);
}

.demo-switch-button.active {
  border-color: rgba(27, 124, 238, 0.45);
  background: linear-gradient(135deg, #0f6ce8 0%, #28b7ff 100%);
  box-shadow: 0 18px 34px rgba(33, 136, 239, 0.28);
  color: #fff;
}

.current-demo-card {
  display: grid;
  gap: 10px;
  width: 100%;
  max-width: none;
  margin-top: 24px;
  padding: 22px 24px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 20px 46px rgba(43, 112, 198, 0.1);
  text-align: left;
}

.current-demo-card > span {
  justify-self: start;
  height: 24px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(36, 137, 239, 0.1);
  color: #0f6ce8;
  font-size: 12px;
  font-weight: 900;
  line-height: 16px;
}

.current-demo-card h2 {
  margin: 0;
  color: #0f2a5f;
  font-size: 24px;
  line-height: 1.28;
}

.activity-entry-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: -2px;
}

.activity-entry-links button {
  min-height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(27, 124, 238, 0.18);
  border-radius: 999px;
  background: rgba(237, 247, 255, 0.86);
  color: #17528f;
  font-size: 13px;
  font-weight: 800;
  line-height: 18px;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.activity-entry-links button:hover {
  transform: translateY(-1px);
  border-color: rgba(27, 124, 238, 0.32);
  background: #fff;
}

.activity-entry-links button.active {
  border-color: rgba(244, 52, 27, 0.26);
  background: #fff2ee;
  color: #f4341b;
}

.current-demo-card p {
  max-width: none;
  color: #5d728f;
  font-size: 14px;
  line-height: 1.72;
}

.current-demo-card div {
  display: grid;
  gap: 4px;
  margin-top: 2px;
  padding-top: 12px;
  border-top: 1px solid rgba(47, 113, 190, 0.12);
}

.current-demo-card strong {
  color: #0f2a5f;
  font-size: 14px;
}

.current-demo-card small {
  color: #6a82a0;
  font-size: 13px;
  line-height: 1.6;
}

.experience-highlights {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  max-width: none;
  margin-top: 16px;
  text-align: left;
}

.experience-highlights article {
  display: grid;
  gap: 6px;
  padding: 16px 18px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 18px 42px rgba(43, 112, 198, 0.08);
}

.experience-highlights strong {
  color: #0f2a5f;
}

.experience-highlights span {
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
    width: min(100% - 48px, 720px);
    gap: 40px;
    padding: 48px 0 72px;
  }

  .demo-showcase-row {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .demo-copy {
    max-width: none;
    justify-self: stretch;
    text-align: left;
  }

  .experience-highlights {
    grid-template-columns: 1fr;
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
