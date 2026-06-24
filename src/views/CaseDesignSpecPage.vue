<template>
  <div v-if="item" class="spec-page" :class="{ 'is-dark': isDarkMode }">
    <nav class="spec-topbar" aria-label="设计规范页导航">
      <div class="topbar-left">
        <RouterLink class="portfolio-brand" to="/">
          <span class="brand-avatar">
            <img :src="avatarCaoLan" alt="" aria-hidden="true" />
            <em>曹</em>
          </span>
          <strong>曹兰+简历作品集</strong>
        </RouterLink>

        <div class="case-nav-actions">
          <RouterLink class="case-return" :to="`/cases/${item.id}`">
            返回设备健康管理平台
          </RouterLink>
          <RouterLink class="mobile-spec-switch" :to="`/cases/${item.id}/mobile-design-system`">移动端规范</RouterLink>
        </div>
      </div>

      <div class="topbar-right">
        <a href="#color">色彩</a>
        <a href="#typography">字体</a>
        <a href="#components">组件</a>
        <button class="theme-toggle" type="button" :aria-pressed="isDarkMode" @click="toggleTheme">
          <span>{{ isDarkMode ? '☾' : '☼' }}</span>
          {{ isDarkMode ? 'Dark' : 'Light' }}
        </button>
      </div>
    </nav>

    <main class="spec-main">
      <section class="hero-grid" aria-labelledby="spec-title">
        <div class="hero-copy">
          <span class="version-pill"><i></i> Design System · v1.0.0 · 2026</span>
          <h1 id="spec-title">视觉规范·PC</h1>
          <strong>设备健康管理平台</strong>
          <p>设计系统与组件资产展示 · Industrial IoT SaaS</p>
          <div class="hero-tags">
            <span>浅色模式</span>
            <span>深色模式</span>
            <span>工业级 SaaS</span>
            <span>WCAG AA</span>
          </div>
        </div>

        <img class="hero-art" :src="heroCard" alt="设备健康管理平台设计规范视觉卡片" />

        <div class="hero-stats" aria-label="设计系统摘要">
          <article v-for="stat in stats" :key="stat.label">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </article>
        </div>
      </section>

      <section class="feature-grid" aria-label="设计系统能力">
        <article v-for="feature in features" :key="feature.title" class="feature-card">
          <span :class="['feature-icon', feature.tone]">
            <img class="feature-icon-light" :src="feature.icon" alt="" aria-hidden="true" />
            <img class="feature-icon-dark" :src="feature.darkIcon" alt="" aria-hidden="true" />
          </span>
          <strong>{{ feature.title }}</strong>
          <p>{{ feature.caption }}</p>
        </article>
      </section>

      <div class="preview-divider">
        <span></span>
        <strong>VISUAL PREVIEW</strong>
        <span></span>
      </div>

      <section class="preview-grid">
        <article id="color" class="preview-card color-card">
          <header>
            <h2>色彩系统</h2>
            <p>Primary Blue · Semantic Tokens</p>
          </header>

          <div class="primary-ramp" aria-label="Primary blue color ramp">
            <span v-for="color in primaryRamp" :key="color.name" :style="{ background: color.hex }">
              <b>{{ color.name }}</b>
            </span>
          </div>

          <div class="semantic-row">
            <article v-for="color in semanticColors" :key="color.name" :style="{ background: color.bg }">
              <i :style="{ background: color.hex }"></i>
              <strong :style="{ color: color.hex }">{{ color.name }}</strong>
              <span>{{ color.hex }}</span>
            </article>
          </div>
        </article>

        <article id="typography" class="preview-card type-card">
          <header>
            <h2>字体层级</h2>
            <p>Inter + Noto Sans SC · Roboto Mono</p>
          </header>

          <div class="type-list">
            <article v-for="type in typeScale" :key="type.name">
              <strong :style="{ fontSize: type.size, fontWeight: type.weight }">{{ type.name }}</strong>
              <span>{{ type.meta }}</span>
            </article>
            <article class="mono-line">
              <strong>2024-05-01 · PUMP-01-AC12</strong>
              <span>13px Mono</span>
            </article>
          </div>
        </article>

        <article id="components" class="preview-card component-card">
          <header>
            <h2>组件示例</h2>
            <p>Button · Status Tag · Input · Capsule</p>
          </header>

          <div class="component-zone">
            <section>
              <span>按钮 Button</span>
              <div class="button-row">
                <button type="button" class="ds-btn primary">主要操作</button>
                <button type="button" class="ds-btn secondary">次要操作</button>
                <button type="button" class="ds-btn text">默认</button>
              </div>
            </section>

            <section>
              <span>状态标签 Status</span>
              <div class="tag-row">
                <i class="tag success">正常运行</i>
                <i class="tag danger">设备告警</i>
                <i class="tag warning">临期提醒</i>
                <i class="tag info">计划中</i>
                <i class="tag neutral">已处理</i>
              </div>
            </section>

            <section>
              <span>Capsule · Input</span>
              <div class="capsule-input-row">
                <div class="capsule-row">
                  <i>30天</i>
                  <i>90天</i>
                  <i>180天</i>
                </div>
                <label class="input-demo"><input value="搜索设备编号..." readonly /></label>
              </div>
            </section>
          </div>
        </article>

        <article class="preview-card chart-card">
          <header>
            <h2>图表规范</h2>
            <p>Smooth Area Chart · Glow · Monospaced Axis</p>
          </header>

          <div class="chart-legend">
            <span><i class="blue"></i>点检异常</span>
            <span><i class="green"></i>在线异常</span>
          </div>

          <svg class="chart-demo" viewBox="0 0 520 230" role="img" aria-label="图表规范示例">
            <g class="grid-lines">
              <line x1="42" y1="42" x2="498" y2="42" />
              <line x1="42" y1="82" x2="498" y2="82" />
              <line x1="42" y1="122" x2="498" y2="122" />
              <line x1="42" y1="162" x2="498" y2="162" />
              <line x1="42" y1="202" x2="498" y2="202" />
            </g>
            <path class="area-blue" d="M42 170 C90 134 126 116 176 138 C226 162 260 54 314 78 C366 102 396 144 452 94 C474 72 492 64 498 58 L498 202 L42 202 Z" />
            <path class="area-green" d="M42 188 C94 150 134 166 182 122 C230 78 264 136 318 106 C372 76 410 96 456 68 C478 54 492 60 498 76 L498 202 L42 202 Z" />
            <path class="line-blue" d="M42 170 C90 134 126 116 176 138 C226 162 260 54 314 78 C366 102 396 144 452 94 C474 72 492 64 498 58" />
            <path class="line-green" d="M42 188 C94 150 134 166 182 122 C230 78 264 136 318 106 C372 76 410 96 456 68 C478 54 492 60 498 76" />
          </svg>
        </article>
      </section>
    </main>
  </div>

  <div v-else class="container page">
    <SectionTitle title="设计规范不存在" description="该案例可能尚未补充设计规范，或页面已被移动。" />
    <RouterLink class="button primary" :to="caseDetailPath">返回案例详情</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import SectionTitle from '@/components/SectionTitle.vue'
import { cases } from '@/data/cases'
import avatarCaoLan from '@/assets/avatar-cao-lan-320.jpg'
import heroCard from '@/assets/device-health-design-spec-hero-card.png'
import featureChartDarkIcon from '@/assets/spec-feature-chart-dark.svg'
import featureChartIcon from '@/assets/spec-feature-chart.svg'
import featureCodeDarkIcon from '@/assets/spec-feature-code-dark.svg'
import featureCodeIcon from '@/assets/spec-feature-code.svg'
import featureGridDarkIcon from '@/assets/spec-feature-grid-dark.svg'
import featureGridIcon from '@/assets/spec-feature-grid.svg'
import featureLayersDarkIcon from '@/assets/spec-feature-layers-dark.svg'
import featureLayersIcon from '@/assets/spec-feature-layers.svg'
import featureMonitorDarkIcon from '@/assets/spec-feature-monitor-dark.svg'
import featureMonitorIcon from '@/assets/spec-feature-monitor.svg'
import featurePaletteIcon from '@/assets/spec-feature-palette.svg'
import featureTokenDarkIcon from '@/assets/spec-feature-token-dark.svg'

const route = useRoute()
const item = computed(() => cases.find((caseItem) => caseItem.id === route.params.id))
const caseDetailPath = computed(() => (typeof route.params.id === 'string' ? `/cases/${route.params.id}` : '/cases'))
const isDarkMode = ref(true)

const stats = [
  { value: '3', label: '核心页面' },
  { value: '24+', label: '组件类型' },
  { value: '48', label: '设计令牌' },
  { value: '2', label: '主题模式' },
]

const features = [
  { title: '设计令牌', caption: '颜色 · 字体 · 间距', tone: 'blue', icon: featurePaletteIcon, darkIcon: featureTokenDarkIcon },
  { title: '组件体系', caption: '24+ 原子组件', tone: 'purple', icon: featureLayersIcon, darkIcon: featureLayersDarkIcon },
  { title: '栅格系统', caption: '12 列弹性布局', tone: 'cyan', icon: featureGridIcon, darkIcon: featureGridDarkIcon },
  { title: '数据可视化', caption: '图表规范体系', tone: 'green', icon: featureChartIcon, darkIcon: featureChartDarkIcon },
  { title: '多端一致性', caption: 'PC · Mobile · 大屏', tone: 'orange', icon: featureMonitorIcon, darkIcon: featureMonitorDarkIcon },
  { title: '工程化映射', caption: 'Token → CSS Var', tone: 'pink', icon: featureCodeIcon, darkIcon: featureCodeDarkIcon },
]

const primaryRamp = [
  { name: '50', hex: '#EBF2FF' },
  { name: '150', hex: '#D6E6FF' },
  { name: '250', hex: '#AECFFF' },
  { name: '350', hex: '#80B4FF' },
  { name: '450', hex: '#5B9BFF' },
  { name: '550', hex: '#1671EE' },
  { name: '650', hex: '#1259CC' },
  { name: '750', hex: '#0D42A8' },
  { name: '850', hex: '#092D82' },
  { name: '950', hex: '#051B5C' },
]

const semanticColors = [
  { name: 'Primary', hex: '#1671EE', bg: '#1671EE18' },
  { name: 'Success', hex: '#25C99A', bg: '#25C99A18' },
  { name: 'Warning', hex: '#F59E0B', bg: '#F59E0B18' },
  { name: 'Danger', hex: '#EF4444', bg: '#EF444418' },
  { name: 'Neutral', hex: '#6B7280', bg: '#6B728018' },
]

const typeScale = [
  { name: 'H1 主标题', size: '24px', weight: 700, meta: '24px / Bold' },
  { name: 'H2 模块标题', size: '18px', weight: 600, meta: '18px / SemiBold' },
  { name: 'Body 表格正文', size: '14px', weight: 400, meta: '14px / Regular' },
  { name: 'Caption 说明文字', size: '12px', weight: 400, meta: '12px / Regular' },
]

function applyTheme(nextTheme: boolean) {
  isDarkMode.value = nextTheme
  document.documentElement.classList.toggle('dark', nextTheme)
  document.documentElement.style.colorScheme = nextTheme ? 'dark' : 'light'
  localStorage.setItem('device-health-spec-theme', nextTheme ? 'dark' : 'light')
}

function toggleTheme() {
  applyTheme(!isDarkMode.value)
}

onMounted(() => {
  applyTheme(true)
})
</script>

<style scoped>
.spec-page {
  --spec-bg: #eff6ff;
  --spec-topbar: rgb(255 255 255 / 72%);
  --spec-topbar-border: rgb(210 224 243 / 72%);
  --spec-card: #ffffff;
  --spec-card-soft: #f7fbff;
  --spec-card-border: #e2ecf8;
  --spec-text: #111827;
  --spec-subtext: #64748b;
  --spec-muted: #9aa8bc;
  --spec-primary: #1671ee;
  --spec-primary-soft: #eaf3ff;
  --spec-shadow: 0 18px 54px rgb(42 79 128 / 12%);
  min-height: 100vh;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 18% 4%, rgb(157 206 255 / 30%), transparent 26%),
    radial-gradient(circle at 82% 8%, rgb(123 176 255 / 24%), transparent 28%),
    var(--spec-bg);
  color: var(--spec-text);
  font-family: Inter, 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;
  padding: 128px 40px 72px;
}

.spec-page.is-dark {
  --spec-bg: #07111f;
  --spec-topbar: rgb(255 255 255 / 68%);
  --spec-topbar-border: rgb(255 255 255 / 16%);
  --spec-card: #1e293b;
  --spec-card-soft: #ffffff0d;
  --spec-card-border: #ffffff0d;
  --spec-text: #f3f4f6;
  --spec-subtext: #8390a4;
  --spec-muted: #94a3b8;
  --spec-primary: #5b9bff;
  --spec-primary-soft: #5b9bff26;
  --spec-shadow: none;
  background: #07111f;
}

.spec-topbar {
  position: fixed;
  z-index: 50;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  height: 86px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid var(--spec-topbar-border);
  background: var(--spec-topbar);
  padding: 0 max(40px, calc((100vw - 1240px) / 2));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.topbar-left,
.topbar-right,
.case-nav-actions {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 14px;
}

.spec-page:not(.is-dark) .topbar-left {
  gap: 24px;
}

.portfolio-brand,
.case-return,
.mobile-spec-switch,
.topbar-right a {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  border-radius: 999px;
  font-weight: 800;
  text-decoration: none;
}

.portfolio-brand {
  gap: 10px;
  color: #ffffff;
}

.spec-page:not(.is-dark) .portfolio-brand {
  color: #0d2d5c;
}

.brand-avatar {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 22%);
  border-radius: 999px;
  background: #14233d;
  box-shadow: 0 12px 28px rgb(7 17 31 / 22%);
  color: #9cc5ff;
  font-size: 14px;
}

.brand-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-avatar em {
  font-style: normal;
  display: none;
}

.spec-page:not(.is-dark) .brand-avatar {
  overflow: hidden;
  width: 54px;
  height: 54px;
  border: 2px solid rgb(255 255 255 / 88%);
  background: #ffffff;
  box-shadow: 0 12px 28px rgb(39 99 164 / 14%);
}

.is-dark .brand-avatar {
  overflow: hidden;
  width: 54px;
  height: 54px;
  border: 2px solid rgb(255 255 255 / 18%);
  background: #1e293b;
  box-shadow: none;
}

.spec-page:not(.is-dark) .brand-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-return,
.mobile-spec-switch {
  border: 1px solid rgb(44 89 150 / 32%);
  background: #11223f;
  box-shadow: 0 10px 24px rgb(5 14 28 / 22%);
  color: #7db0ff;
  padding: 0 20px;
  font-size: 14px;
}

.is-dark .case-return,
.is-dark .mobile-spec-switch {
  min-height: 52px;
  border-color: #ffffff14;
  background: #1e293b;
  box-shadow: none;
  color: #cbd5e1;
  padding: 0 28px;
  font-size: 15px;
}

.spec-page:not(.is-dark) .case-return,
.spec-page:not(.is-dark) .mobile-spec-switch {
  min-height: 52px;
  border: 1px solid #d7e7fb;
  background: rgb(255 255 255 / 78%);
  box-shadow: 0 12px 30px rgb(62 119 185 / 12%);
  color: #0d3a70;
  padding: 0 28px;
  font-size: 15px;
}

.case-return::before {
  content: '←';
  margin-right: 8px;
}

.spec-page:not(.is-dark) .case-return::before {
  color: #1671ee;
}

.is-dark .case-return::before {
  color: #5b9bff;
}

.topbar-right {
  border: 1px solid rgb(226 236 248 / 86%);
  border-radius: 999px;
  background: rgb(255 255 255 / 82%);
  box-shadow: 0 18px 44px rgb(24 72 130 / 10%);
  padding: 6px;
}

.topbar-right a {
  padding: 0 18px;
  color: #71829a;
  font-size: 14px;
}

.theme-toggle {
  display: inline-flex;
  height: 38px;
  align-items: center;
  gap: 8px;
  border: 1px solid #dce9fb;
  border-radius: 999px;
  background: #f3f8ff;
  color: #1671ee;
  font-weight: 800;
  padding: 0 16px;
}

.theme-toggle span {
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  border-radius: 999px;
  background: #e8f2ff;
}

.spec-main {
  width: min(100%, 1240px);
  margin: 0 auto;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 520px;
  gap: 42px 72px;
  align-items: center;
}

.hero-copy {
  min-width: 0;
}

.version-pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 1px solid rgb(22 113 238 / 28%);
  border-radius: 999px;
  background: rgb(22 113 238 / 12%);
  color: #1671ee;
  padding: 6px 14px;
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 12px;
  font-weight: 700;
}

.version-pill i {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #1671ee;
}

.hero-copy h1 {
  margin: 20px 0 16px;
  color: var(--spec-text);
  font-size: 46px;
  font-weight: 900;
  line-height: 52.9px;
  letter-spacing: 0;
}

.is-dark .hero-copy h1 {
  color: #f3f4f6;
}

.hero-copy strong {
  display: block;
  color: #1671ee;
  font-size: 18px;
  font-weight: 900;
}

.hero-copy p {
  margin: 10px 0 0;
  color: var(--spec-subtext);
  font-size: 15px;
  line-height: 1.8;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
}

.hero-tags span {
  display: inline-flex;
  height: 26px;
  min-width: auto;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgb(255 255 255 / 80%);
  color: #5b6779;
  text-align: center;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.is-dark .hero-tags span {
  background: #ffffff0d;
  color: #cbd5e1;
}

.hero-art {
  display: block;
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}

.hero-stats {
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 36px;
}

.hero-stats strong {
  display: block;
  color: var(--spec-text);
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 34px;
  font-weight: 900;
  line-height: 1;
}

.hero-stats span {
  display: block;
  margin-top: 9px;
  color: var(--spec-subtext);
  font-size: 12px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 20px;
  margin-top: 50px;
}

.feature-card {
  min-height: 112px;
  border: 1px solid var(--spec-card-border);
  border-radius: 12px;
  background: var(--spec-card);
  padding: 18px;
}

.feature-icon {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 9px;
  margin-bottom: 16px;
}

.spec-page:not(.is-dark) .feature-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
}

.feature-icon img {
  display: block;
  width: 36px;
  height: 36px;
}

.feature-icon img.feature-icon-dark {
  display: none;
}

.is-dark .feature-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
}

.is-dark .feature-icon-light {
  display: none;
}

.is-dark .feature-icon img.feature-icon-dark {
  display: block;
}

.feature-icon::after {
  content: '';
  width: 15px;
  height: 15px;
  border: 3px solid currentColor;
  border-radius: 5px;
}

.spec-page:not(.is-dark) .feature-icon::after {
  display: none;
}

.is-dark .feature-icon::after {
  display: none;
}

.feature-icon.blue { background: #5b9bff26; color: #5b9bff; }
.feature-icon.purple { background: #a684ff26; color: #a684ff; }
.feature-icon.cyan { background: #00bcff26; color: #00bcff; }
.feature-icon.green { background: #00d49226; color: #00d492; }
.feature-icon.orange { background: #ffb90026; color: #ffb900; }
.feature-icon.pink { background: #ff637e26; color: #ff637e; }

.feature-card strong {
  display: block;
  color: var(--spec-text);
  font-size: 15px;
  font-weight: 900;
}

.feature-card p {
  margin: 6px 0 0;
  color: var(--spec-muted);
  font-size: 12px;
}

.preview-divider {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 26px;
  align-items: center;
  margin: 48px 0 28px;
}

.preview-divider span {
  height: 1px;
  background: #8b99ac;
}

.preview-divider strong {
  color: #8b99ac;
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.18em;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.preview-card {
  overflow: hidden;
  min-height: 340px;
  border: 1px solid var(--spec-card-border);
  border-radius: 12px;
  background: var(--spec-card);
  box-shadow: var(--spec-shadow);
  padding: 28px;
}

.preview-card header {
  margin-bottom: 22px;
}

.preview-card h2 {
  margin: 0;
  color: var(--spec-text);
  font-size: 16px;
  font-weight: 900;
}

.preview-card p {
  margin: 7px 0 0;
  color: var(--spec-muted);
  font-size: 12px;
}

.spec-page:not(.is-dark) .component-card h2 {
  color: #16213a;
  font-size: 13px;
  line-height: 19.5px;
}

.spec-page:not(.is-dark) .component-card p {
  color: #9aa5b5;
  font-size: 11px;
  line-height: 16.5px;
}

.primary-ramp {
  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(10, 1fr);
  height: 44px;
  border-radius: 8px;
}

.primary-ramp span {
  position: relative;
}

.primary-ramp b {
  position: absolute;
  bottom: 6px;
  left: 50%;
  color: #0d42a899;
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 8px;
  font-weight: 700;
  transform: translateX(-50%);
}

.primary-ramp span:nth-child(n + 6) b {
  color: #ffffffb2;
}

.semantic-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.semantic-row article {
  min-height: 77px;
  border-radius: 8px;
  padding: 10px;
}

.semantic-row i {
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.semantic-row strong,
.semantic-row span {
  display: block;
}

.semantic-row strong {
  color: var(--spec-text);
  font-size: 12px;
  font-weight: 900;
}

.semantic-row span {
  margin-top: 3px;
  color: var(--spec-muted);
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 11px;
}

.type-list article {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #ffffff0d;
  padding: 15px 0;
}

.type-list article:last-child {
  border-bottom: 0;
}

.type-list strong {
  color: var(--spec-text);
}

.type-list span {
  color: var(--spec-muted);
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 11px;
}

.mono-line strong {
  color: #1671ee;
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 14px;
}

.component-zone {
  display: grid;
  gap: 20px;
}

.component-zone section {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  border-bottom: 1px solid #edf2f7;
  padding-bottom: 20px;
}

.is-dark .component-zone section {
  border-bottom-color: #ffffff0d;
  padding-bottom: 18px;
}

.component-zone section > span {
  color: #9aa5b5;
  font-size: 10px;
  font-weight: 700;
  line-height: 15px;
}

.is-dark .component-zone section > span {
  color: #94a3b8;
}

.button-row,
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ds-btn {
  display: inline-flex;
  box-sizing: border-box;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  white-space: nowrap;
}

.ds-btn.primary {
  width: 80px;
  border: 0;
  background: #5b9bff;
  box-shadow: 0 4px 12px rgb(22 113 238 / 28%);
  color: #16213a;
}

.is-dark .ds-btn.primary {
  border: 0;
  background: #5b9bff;
  box-shadow: 0 4px 12px rgb(91 155 255 / 28%);
  color: #0f172a;
}

.ds-btn.secondary {
  width: 82px;
  border: 1px solid #5b9bff;
  background: transparent;
  color: #5b9bff;
}

.is-dark .ds-btn.secondary {
  border-color: #5b9bff;
  color: #7db0ff;
}

.ds-btn.text {
  width: 56px;
  border: 0;
  background: transparent;
  color: #9aa5b5;
}

.is-dark .ds-btn.text {
  background: transparent;
  color: #cbd5e1;
}

.tag {
  display: inline-flex;
  min-width: auto;
  height: 25px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 4px 10px;
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 16.5px;
}

.tag.success { background: #00bc7d26; color: #009966; }
.tag.warning { background: #ffb90026; color: #e17100; }
.tag.danger { background: #fb2c3626; color: #e7000b; }
.tag.info { background: #1671ee26; color: #1671ee; }
.tag.neutral { background: #90a1b926; color: #62748e; }

.is-dark .tag.success { background: #4ade8026; color: #4ade80; }
.is-dark .tag.warning { background: #fbbf2426; color: #fbbf24; }
.is-dark .tag.danger { background: #f8717126; color: #f87171; }
.is-dark .tag.info { background: #5b9bff26; color: #5b9bff; }
.is-dark .tag.neutral { background: #94a3b826; color: #94a3b8; }

.capsule-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.capsule-input-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.capsule-row i {
  display: inline-flex;
  height: 21px;
  min-width: 41px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #f5f7fa;
  color: #5b6779;
  font-family: 'Roboto Mono', ui-monospace, monospace;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 16.5px;
  padding: 2px 8px;
}

.capsule-row i:last-child {
  min-width: 47px;
}

.is-dark .capsule-row i {
  min-width: 52px;
  height: 28px;
  background: #ffffff0d;
  color: #cbd5e1;
  padding: 0;
}

.is-dark .capsule-row i:last-child {
  min-width: 52px;
}

.input-demo {
  display: flex;
  width: 102px;
  height: 32px;
  align-items: center;
  border: 1px solid #e4eaf3;
  border-radius: 8px;
  background: #f7f9fc;
  padding: 0 12px;
}

.is-dark .input-demo {
  width: auto;
  height: 36px;
  border-color: #ffffff14;
  border-radius: 5px;
  background: #0f172a;
}

.input-demo + .input-demo {
  margin-top: 10px;
}

.input-demo.focus {
  border-color: #1671ee;
  box-shadow: 0 0 0 3px rgb(22 113 238 / 14%);
}

.input-demo input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: #aab2bf;
  font-size: 11px;
  line-height: 16.5px;
}

.is-dark .input-demo input {
  color: #cbd5e1;
  font-size: 13px;
}

.chart-legend {
  display: flex;
  gap: 18px;
  margin-bottom: 12px;
  color: #cbd5e1;
  font-size: 12px;
}

.chart-legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.chart-legend i {
  width: 8px;
  height: 8px;
  border-radius: 999px;
}

.chart-legend .blue { background: #7db0ff; }
.chart-legend .green { background: #4ade80; }

.chart-demo {
  width: 100%;
  height: auto;
}

.grid-lines line {
  stroke: #ffffff0f;
}

.area-blue {
  fill: rgb(125 176 255 / 18%);
}

.area-green {
  fill: rgb(74 222 128 / 14%);
}

.line-blue,
.line-green {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
}

.line-blue {
  stroke: #7db0ff;
}

.line-green {
  stroke: #4ade80;
}

@media (max-width: 1100px) {
  .hero-grid,
  .preview-grid {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-column: auto;
  }

  .feature-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .spec-page {
    padding: 156px 16px 48px;
  }

  .spec-topbar {
    flex-direction: column;
    height: auto;
    padding: 12px 16px;
  }

  .topbar-left,
  .topbar-right {
    width: 100%;
    flex-wrap: wrap;
  }

  .case-nav-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .case-return,
  .mobile-spec-switch,
  .theme-toggle {
    flex: 1 1 100%;
    justify-content: center;
  }

  .hero-copy h1 {
    font-size: 42px;
  }

  .hero-stats,
  .feature-grid,
  .semantic-row,
  .component-zone section {
    grid-template-columns: 1fr;
  }
}
</style>
