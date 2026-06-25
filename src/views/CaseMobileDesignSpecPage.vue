<template>
  <div v-if="item" class="mobile-spec-page">
    <nav class="mobile-spec-topbar" aria-label="移动端设计规范页导航">
      <div class="topbar-left">
        <RouterLink class="portfolio-brand" to="/">
          <span class="brand-avatar">
            <img :src="avatarCaoLan" alt="" aria-hidden="true" />
            <em>曹</em>
          </span>
          <strong>曹兰+简历作品集</strong>
        </RouterLink>

        <div class="case-nav-actions">
          <RouterLink class="case-nav-link case-return" :to="`/cases/${item.id}`">
            返回设备健康管理平台
          </RouterLink>
          <RouterLink class="case-nav-link pc-spec-switch" :to="`/cases/${item.id}/design-spec`">PC规范</RouterLink>
        </div>
      </div>
    </nav>

    <main class="mobile-spec-main">
      <section class="spec-board" aria-labelledby="mobile-spec-title">
        <section class="spec-intro-card">
          <aside class="spec-sidebar" aria-label="移动端设计规范目录">
            <div class="sidebar-mark" aria-hidden="true" />
            <a
              v-for="nav in navItems"
              :key="nav.href"
              :href="getNavHref(nav.href)"
              :class="{ active: activeNavHref === nav.href }"
              :aria-current="activeNavHref === nav.href ? 'location' : undefined"
              @click.prevent="handleNavClick(nav.href)"
            >
              <span aria-hidden="true" />
              {{ nav.label }}
            </a>
          </aside>

          <header id="overview" class="spec-hero">
            <div>
              <h1 id="mobile-spec-title">设计规范·APP</h1>
              <strong>设备健康管理平台</strong>
              <p>
                从 PC 设计规范页与 APP 设计文档中抽象统一设计系统，并定义移动端适配约束。本文档不生成 UI，
                只规定跨端继承、移动端重写、组件映射、页面结构与交互规则。
              </p>
              <div class="hero-actions" aria-label="规范关键原则">
                <span>跨端一致</span>
                <span>移动端重写</span>
                <span>令牌继承</span>
              </div>
            </div>

            <div class="hero-preview" aria-label="移动端规范摘要">
              <article>
                <small>基准</small>
                <strong>375px</strong>
                <span>仅作为移动端设计基准，不作为 PC 页面宽度。</span>
              </article>
              <article>
                <small>触控</small>
                <strong>44px</strong>
                <span>所有可点击元素触控热区必须不小于 44px。</span>
              </article>
              <article>
                <small>导航</small>
                <strong>64px</strong>
                <span>一级底部导航固定高度，二级业务页隐藏。</span>
              </article>
            </div>
          </header>
        </section>

        <div class="spec-content">
          <section id="principles" class="spec-section overview-grid" aria-label="设计原则摘要">
            <article v-for="item in overviewCards" :key="item.title" class="info-card">
              <span>{{ item.kicker }}</span>
              <strong>{{ item.title }}</strong>
              <p>{{ item.caption }}</p>
            </article>
          </section>

          <div class="foundation-grid">
            <section id="foundation" class="spec-section foundation-card color-foundation-card">
              <header class="section-heading">
                <span>01</span>
                <h2>色彩系统</h2>
              </header>
              <div class="color-grid">
                <article v-for="token in colorTokens" :key="token.name">
                  <i :style="{ background: token.value }" />
                  <strong>{{ token.name }}</strong>
                  <code>{{ token.value }}</code>
                  <span>{{ token.usage }}</span>
                </article>
              </div>
            </section>

            <section id="typography" class="spec-section foundation-card typography-foundation-card">
              <header class="section-heading">
                <span>02</span>
                <h2>字体与字号</h2>
              </header>
              <div class="typography-grid">
                <article class="doc-card">
                  <strong class="card-title">字号层级</strong>
                  <div class="type-table">
                    <div v-for="type in typographyTokens" :key="type.name">
                      <strong>{{ type.name }}</strong>
                      <span>{{ type.size }}</span>
                      <span>{{ type.line }}</span>
                      <em>{{ type.weight }}</em>
                    </div>
                  </div>
                </article>

                <article class="doc-card type-sample-card">
                  <strong class="card-title">字重与等宽示例</strong>
                  <div class="type-sample">
                    <span>等宽字段</span>
                    <strong>WO-2026-0618 · PUMP-A02</strong>
                    <p>日期、时间戳、设备 ID、工单号、资产编号使用等宽字体。</p>
                  </div>
                </article>
              </div>
            </section>
          </div>

          <section id="components" class="spec-section showcase-card component-showcase-card">
            <header class="section-heading">
              <span>03</span>
              <h2>组件规范补充</h2>
            </header>
            <div class="component-grid">
              <article v-for="component in componentSpecs" :key="component.name">
                <div>
                  <strong>{{ component.name }}</strong>
                  <small>{{ component.size }}</small>
                </div>
                <p>{{ component.rule }}</p>
                <footer>
                  <span v-for="state in component.states" :key="state">{{ state }}</span>
                </footer>
              </article>
            </div>
          </section>

          <section id="layout" class="spec-section showcase-card">
            <header class="section-heading">
              <span>04</span>
              <h2>布局与间距</h2>
            </header>
            <div class="rule-grid">
              <article v-for="rule in layoutRules" :key="rule.title">
                <strong>{{ rule.title }}</strong>
                <p>{{ rule.caption }}</p>
              </article>
            </div>
          </section>

          <section id="mapping" class="spec-section showcase-card">
            <header class="section-heading">
              <span>05</span>
              <h2>跨端映射</h2>
            </header>
            <div class="mapping-list">
              <article v-for="mapping in mappingRules" :key="mapping.from">
                <strong>{{ mapping.from }}</strong>
                <span aria-hidden="true">→</span>
                <p>{{ mapping.to }}</p>
              </article>
            </div>
          </section>

          <section id="pages" class="spec-section showcase-card">
            <header class="section-heading">
              <span>06</span>
              <h2>页面结构</h2>
            </header>
            <div class="page-grid">
              <article v-for="page in pageStructures" :key="page.name">
                <strong>{{ page.name }}</strong>
                <p>{{ page.rule }}</p>
              </article>
            </div>
          </section>

          <section id="states" class="spec-section showcase-card">
            <header class="section-heading">
              <span>07</span>
              <h2>状态系统</h2>
            </header>
            <div class="state-grid">
              <article
                v-for="state in primaryStateCards"
                :key="state.name"
                class="state-design-card"
                :class="`is-${state.tone}`"
              >
                <header class="state-card-heading">
                  <span class="state-title-mark" aria-hidden="true" />
                  <strong>{{ getStateBadge(state.name) }} {{ state.name }}</strong>
                </header>
                <p class="state-card-copy">{{ state.rule }}</p>

                <div v-if="state.name === '加载'" class="state-demo state-demo-loading" aria-hidden="true">
                  <span class="state-demo-spinner" />
                  <div>
                    <span />
                    <span />
                  </div>
                </div>

                <div v-else-if="state.name === '空状态'" class="state-demo state-demo-empty" aria-hidden="true">
                  <span class="state-empty-icon">{{ getStateIcon(state.name) }}</span>
                  <strong>{{ getStateFeedback(state.name) }}</strong>
                  <small>{{ state.rule }}</small>
                </div>

                <div v-else class="state-demo state-demo-error" aria-hidden="true">
                  <span class="state-error-icon">{{ getStateIcon(state.name) }}</span>
                  <div>
                    <strong>{{ getStateFeedback(state.name) }}</strong>
                    <small>{{ state.rule }}</small>
                  </div>
                  <button type="button" tabindex="-1">重试</button>
                </div>
              </article>

              <article class="state-design-card state-mapping-card">
                <header class="state-card-heading">
                  <span class="state-title-mark" aria-hidden="true" />
                  <strong>状态色映射 State Mapping</strong>
                </header>
                <footer class="state-mapping-list">
                  <div v-for="state in stateMappingRows" :key="state.name" :class="`is-${state.tone}`">
                    <i aria-hidden="true" />
                    <strong>{{ getStateBadge(state.name) }}</strong>
                    <span>{{ state.rule }}</span>
                  </div>
                </footer>
              </article>
            </div>
          </section>
        </div>
      </section>
    </main>
  </div>

  <div v-else class="container page">
    <SectionTitle title="移动端规范不存在" description="该案例可能尚未补充移动端组件展示规范。" />
    <RouterLink class="button primary" to="/cases">返回案例列表</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import avatarCaoLan from '@/assets/avatar-cao-lan-320.jpg'
import SectionTitle from '@/components/SectionTitle.vue'
import { cases } from '@/data/cases'

const route = useRoute()
const router = useRouter()
const item = computed(() => cases.find((caseItem) => caseItem.id === route.params.id))

const navItems = [
  { label: '概览', href: '#principles' },
  { label: '基础', href: '#foundation' },
  { label: '组件', href: '#components' },
  { label: '布局', href: '#layout' },
  { label: '映射', href: '#mapping' },
  { label: '页面', href: '#pages' },
  { label: '状态', href: '#states' },
]

const activeNavHref = ref(navItems[0].href)

const getNavHref = (hash: string) => router.resolve({ path: route.path, query: route.query, hash }).href

const syncActiveNavFromHash = () => {
    const matchedNav = navItems.find((nav) => nav.href === route.hash)
    activeNavHref.value = matchedNav?.href ?? navItems[0].href
}

const syncActiveNavFromScroll = () => {
    const activationOffset = 140
    const activeItem = [...navItems].reverse().find((nav) => {
        const section = document.getElementById(nav.href.slice(1))
        return section ? section.getBoundingClientRect().top <= activationOffset : false
    })

    activeNavHref.value = activeItem?.href ?? navItems[0].href
}

const handleNavClick = (href: string) => {
    activeNavHref.value = href
    router.push({ path: route.path, query: route.query, hash: href })
}

watch(() => route.hash, syncActiveNavFromHash)

onMounted(() => {
    syncActiveNavFromHash()
    syncActiveNavFromScroll()
    window.addEventListener('scroll', syncActiveNavFromScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', syncActiveNavFromScroll)
})

const overviewCards = [
  {
    kicker: '原则',
    title: 'PC 与移动端共用语义令牌',
    caption: '不因端差异新增同义颜色、状态或圆角语义，业务状态跨端保持一致。',
  },
  {
    kicker: '重写',
    title: '移动端只重写尺寸与触控',
    caption: '移动端新增令牌只描述触控、安全区、布局和组件尺寸，不新增业务语义。',
  },
  {
    kicker: '密度',
    title: '单任务优先，信息折叠展示',
    caption: '移动端以首屏概览、卡片摘要、列表详情和子页展开为默认密度模型。',
  },
]

const colorTokens = [
  { name: '主色', value: '#1671EE', usage: 'PC 主按钮、链接、图表主线' },
  { name: 'APP 主色', value: '#0057FF', usage: 'APP 主按钮、底部导航选中态、任务操作' },
  { name: '成功色', value: '#009966', usage: '正常、运行中、已处理' },
  { name: '警告色', value: '#E17100', usage: '预警、待处理、临期' },
  { name: '错误色', value: '#E7000B', usage: '错误、高危、逾期、删除' },
  { name: '深色文本', value: '#111827', usage: '主标题、关键正文' },
  { name: '页面背景', value: '#F4F7FB', usage: 'APP 普通页面背景' },
  { name: '表层容器', value: '#FFFFFF', usage: '卡片、表格、表单容器' },
  { name: '边框色', value: '#E4EAF3', usage: '输入框、筛选按钮、表格容器' },
]

const typographyTokens = [
  { name: '页面标题', size: '20px', line: '28px', weight: '500-650' },
  { name: '模块标题', size: '18px', line: '27px', weight: '600' },
  { name: '正文', size: '14px', line: '21px', weight: '400-500' },
  { name: '说明文字', size: '12px', line: '16-18px', weight: '400-500' },
  { name: '徽标文字', size: '10px', line: '15px', weight: '500-800' },
  { name: '数字', size: '52px', line: '48px', weight: '900' },
]

const componentSpecs = [
  { name: '顶部导航', size: '96px', rule: '页头三栏布局：40px / 1fr / 40px，顶部预留状态栏空间。', states: ['默认', '返回', '操作'] },
  { name: '按钮', size: '52 / 33px', rule: '主操作 52px；任务操作 33px；视觉小于 44px 时仍需扩展触控热区。', states: ['默认', '激活', '禁用', '加载'] },
  { name: '搜索 / 输入框', size: '46 / 48px', rule: '搜索 46px，登录输入 48px；同一表单内高度和圆角统一。', states: ['默认', '聚焦', '错误'] },
  { name: '页签', size: '46px', rule: '页内页签使用 46px 高度，选中态使用颜色或 32x2px 指示条。', states: ['默认', '选中', '禁用'] },
  { name: '卡片', size: '14-16px 内边距', rule: '标准卡片 8px 圆角；移动端卡片聚焦单一信息组，不做复杂嵌套。', states: ['默认', '激活'] },
  { name: '设备卡片', size: '双列', rule: '设备摘要按状态、标题、关键元信息组织，状态色继承语义令牌。', states: ['在线', '离线', '告警'] },
  { name: '状态标签', size: '20-26px', rule: '状态标签使用成功、警告、危险、信息、中性色语义映射。', states: ['成功', '警告', '错误', '处理中'] },
  { name: '列表项', size: '60-80px', rule: '移动端列表项使用标题、状态、元信息、右侧操作或箭头。', states: ['默认', '激活', '禁用'] },
  { name: '弹窗 / 底部弹层', size: '顶部圆角 16px', rule: 'PC 弹窗在移动端转换为底部弹层或全屏子页。', states: ['默认', '警告', '错误'] },
  { name: '轻提示', size: '圆角 8-12px', rule: '轻提示用于短反馈，不能承载复杂表单、长说明或关键二次确认。', states: ['成功', '警告', '错误', '加载'] },
  { name: '加载 / 骨架屏', size: '16px 加载图标', rule: '加载状态必须保持组件原尺寸，不允许引发布局跳动。', states: ['加载', '骨架屏'] },
  { name: '底部导航', size: '64px', rule: '一级页面展示 4 项底部导航；二级详情页、通知、点检等页面隐藏。', states: ['首页', '待办', '工作台', '我的'] },
]

const layoutRules = [
  { title: '375px 基准', caption: '375px 是移动端设计和实现基准，不是 PC 展示页容器宽度。' },
  { title: '安全区', caption: '页头顶部默认内边距 48px，底部操作区保留 32px 安全留白。' },
  { title: '触控热区 ≥ 44px', caption: '所有可点击元素触控热区必须不小于 44px。' },
  { title: '模块间距', caption: '页面纵向堆叠默认间距 12px，模块间距使用 16px。' },
  { title: '卡片内边距', caption: '移动端卡片默认内边距 14-16px，个人中心可使用 20px。' },
  { title: '移动端堆叠', caption: '移动端默认页头 / 内容 / 底部导航，内容区单列优先。' },
]

const mappingRules = [
  { from: '表格', to: '列表 / 卡片：列字段按标题、状态、元信息折叠。' },
  { from: '弹窗', to: '底部弹层：短表单底部弹层，长表单全屏子页。' },
  { from: '提示气泡', to: '轻提示 / 行内帮助 / 信息面板。' },
  { from: 'PC 栅格', to: '移动端堆叠：多列看板折叠为纵向卡片流。' },
  { from: '悬停', to: '触控反馈：使用按压透明度、缩放或轻提示。' },
]

const pageStructures = [
  { name: '登录页', rule: '品牌区 + 表单卡片 + 底部单一主按钮，不展示底部导航。' },
  { name: '首页', rule: '常规页头；先概览和核心指标，再趋势、状态分布、最新告警。' },
  { name: '待办页', rule: '概览横幅、状态页签、搜索筛选、任务列表，任务卡保留单一主操作。' },
  { name: '工作台', rule: '工作台横幅后按业务域分组，入口卡整体可点击且等高。' },
  { name: '我的', rule: '用户信息卡、信息列表、设置列表、退出操作；水平内边距 20px。' },
]

const stateRules = [
  { name: '加载', tone: 'info', rule: '保持组件原宽高，按钮使用 16px 加载图标或同尺寸图标位。' },
  { name: '空状态', tone: 'neutral', rule: '使用独立卡片或列表占位行，文案说明当前为空对象。' },
  { name: '错误', tone: 'danger', rule: '使用危险色与危险浅色；表单错误显示在字段下方。' },
  { name: '警告', tone: 'warning', rule: '用于预警、临期、待处理，不用于错误或删除。' },
  { name: '成功', tone: 'success', rule: '用于正常、运行中、已处理、同步成功，不使用大面积绿色背景。' },
  { name: '禁用', tone: 'neutral', rule: '移除悬停、激活、点击行为，使用弱文本和低强调表层。' },
]

const stateIcons: Record<string, string> = {
    加载: '⟳',
    空状态: '∅',
    错误: '!',
    警告: '△',
    成功: '✓',
    禁用: '–',
}

const stateBadges: Record<string, string> = {
    加载: 'Loading',
    空状态: 'Empty',
    错误: 'Error',
    警告: 'Warning',
    成功: 'Success',
    禁用: 'Disabled',
}

const stateToneLabels: Record<string, string> = {
    info: '信息态',
    neutral: '中性态',
    danger: '危险态',
    warning: '警告态',
    success: '成功态',
}

const stateFeedbacks: Record<string, string> = {
    加载: '保留原尺寸',
    空状态: '说明当前为空',
    错误: '字段下方提示',
    警告: '预警与临期',
    成功: '轻量正反馈',
    禁用: '移除交互行为',
}

const primaryStateCards = computed(() => stateRules.filter((state) => ['加载', '空状态', '错误'].includes(state.name)))
const stateMappingRows = computed(() => {
    const order = ['成功', '警告', '错误', '禁用']
    return order.map((name) => stateRules.find((state) => state.name === name)).filter((state) => state !== undefined)
})

const getStateIcon = (name: string) => stateIcons[name] ?? '•'
const getStateBadge = (name: string) => stateBadges[name] ?? 'State'
const getStateToneLabel = (tone: string) => stateToneLabels[tone] ?? '业务态'
const getStateFeedback = (name: string) => stateFeedbacks[name] ?? '状态反馈'
</script>

<style scoped>
.mobile-spec-page {
  min-height: 100vh;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 16% 4%, rgba(157, 206, 255, 0.34), transparent 26%),
    radial-gradient(circle at 86% 8%, rgba(123, 176, 255, 0.2), transparent 28%),
    linear-gradient(180deg, #eef6ff 0%, #f8fbff 46%, #edf6ff 100%);
  color: #191c1e;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.mobile-spec-topbar {
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
  border-bottom: 1px solid rgb(210 224 243 / 72%);
  background: rgb(255 255 255 / 72%);
  padding: 0 max(40px, calc((100vw - 1240px) / 2));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.topbar-left,
.case-nav-actions {
  display: flex;
  min-width: 0;
  align-items: center;
}

.topbar-left {
  gap: 24px;
}

.case-nav-actions {
  gap: 14px;
}

.portfolio-brand,
.case-nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  border-radius: 999px;
  font-weight: 800;
  text-decoration: none;
}

.case-nav-link {
  min-height: 52px;
  border: 1px solid #d7e7fb;
  background: rgb(255 255 255 / 78%);
  box-shadow: 0 12px 30px rgb(62 119 185 / 12%);
  color: #0d3a70;
  font-size: 15px;
  padding: 0 28px;
}

.portfolio-brand {
  gap: 10px;
  color: #0d2d5c;
}

.brand-avatar {
  display: grid;
  overflow: hidden;
  width: 54px;
  height: 54px;
  place-items: center;
  border: 2px solid rgb(255 255 255 / 88%);
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 12px 28px rgb(39 99 164 / 14%);
  font-size: 14px;
}

.brand-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-avatar em {
  display: none;
  font-style: normal;
}

.case-return::before {
  content: '←';
  color: #1671ee;
  margin-right: 8px;
}

.pc-spec-switch {
  justify-content: center;
}

.mobile-spec-main {
  width: 100%;
  padding: 142px max(40px, calc((100vw - 1280px) / 2)) 96px;
}

.spec-board {
  display: grid;
  gap: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  overflow: visible;
}

.spec-intro-card {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 18px 60px rgba(25, 28, 30, 0.08);
  padding: 36px;
  backdrop-filter: blur(18px);
}

.spec-sidebar {
  position: static;
  display: grid;
  align-content: start;
  gap: 8px;
  height: fit-content;
  border: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  padding: 0 28px 0 0;
  backdrop-filter: none;
}

.sidebar-mark {
  width: 96px;
  height: 32px;
  border-radius: 6px;
  background: #1671ee;
  margin-bottom: 24px;
}

.spec-sidebar a {
  display: flex;
  min-height: 36px;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  line-height: 20px;
  padding: 8px 12px;
  text-decoration: none;
}

.spec-sidebar a span {
  width: 11px;
  height: 11px;
  border: 1.5px solid currentcolor;
  border-radius: 999px;
}

.spec-sidebar a.active {
  background: #ddf0ff;
  color: #2864ff;
}

.spec-content {
  display: grid;
  gap: 16px;
  min-width: 0;
  padding: 0;
}

.spec-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 328px;
  gap: 16px;
  align-items: stretch;
}

.spec-hero h1 {
  margin: 0 0 12px;
  color: #191c1e;
  font-size: clamp(42px, 4.4vw, 64px);
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
}

.spec-hero strong {
  display: block;
  color: #2864ff;
  font-size: 20px;
  font-weight: 900;
  line-height: 28px;
}

.spec-hero p {
  max-width: 760px;
  margin: 18px 0 0;
  color: rgba(0, 0, 0, 0.6);
  font-size: 15px;
  line-height: 28px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.hero-actions span {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  background: #fff;
  color: #191c1e;
  font-size: 14px;
  font-weight: 800;
  padding: 0 18px;
}

.hero-actions span:first-child {
  border-color: #2864ff;
  background: #2864ff;
  color: #fff;
}

.hero-preview {
  display: grid;
  gap: 16px;
}

.hero-preview article,
.info-card,
.doc-card,
.foundation-card,
.showcase-card,
.color-grid article,
.component-grid article,
.rule-grid article,
.page-grid article,
.state-grid article,
.mapping-list article {
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 34px rgba(25, 28, 30, 0.055);
}

.hero-preview article {
  padding: 24px;
}

.hero-preview small,
.info-card span {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  font-weight: 800;
}

.hero-preview strong {
  margin: 5px 0;
  color: #2864ff;
  font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 28px;
  line-height: 34px;
}

.hero-preview span,
.info-card p,
.doc-card p {
  color: rgba(0, 0, 0, 0.58);
  font-size: 13px;
  line-height: 21px;
}

.spec-section {
  min-width: 0;
  scroll-margin-top: 110px;
}

.section-heading {
  display: flex;
  align-items: end;
  gap: 14px;
  margin-bottom: 22px;
}

.section-heading span {
  color: #2864ff;
  font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  font-weight: 900;
  line-height: 24px;
}

.section-heading h2 {
  margin: 0;
  color: #191c1e;
  font-size: 28px;
  font-weight: 900;
  line-height: 36px;
}

.overview-grid {
  display: grid;
  gap: 16px;
}

.overview-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.info-card {
  padding: 24px;
}

.info-card strong {
  display: block;
  margin-top: 8px;
  color: #191c1e;
  font-size: 18px;
  font-weight: 900;
  line-height: 26px;
}

.info-card p {
  margin: 8px 0 0;
}

.doc-card {
  padding: 24px;
}

.foundation-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
}

.foundation-card {
  min-width: 0;
  padding: 28px;
}

.foundation-card .section-heading {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  padding-bottom: 20px;
}

.showcase-card {
  padding: 28px;
}

.showcase-card > .section-heading {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  padding-bottom: 20px;
}

.card-title {
  display: block;
  color: #191c1e;
  font-size: 16px;
  font-weight: 900;
  line-height: 24px;
  margin-bottom: 18px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.color-grid article {
  min-width: 0;
  padding: 14px;
  box-shadow: none;
}

.color-grid i {
  display: block;
  height: 52px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  margin-bottom: 16px;
}

.color-grid strong,
.component-grid strong,
.rule-grid strong,
.page-grid strong,
.state-grid strong {
  display: block;
  color: #191c1e;
  font-size: 14px;
  font-weight: 900;
  line-height: 20px;
}

.color-grid code {
  display: block;
  color: rgba(0, 0, 0, 0.5);
  font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  margin-top: 3px;
}

.color-grid article > span {
  display: block;
  color: rgba(0, 0, 0, 0.55);
  font-size: 12px;
  line-height: 18px;
  margin-top: 10px;
}

.typography-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.typography-foundation-card .doc-card {
  box-shadow: none;
}

.type-table {
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
}

.type-table div {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.8fr 0.8fr;
  align-items: center;
  min-height: 46px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0 16px;
}

.type-table div:last-child {
  border-bottom: 0;
}

.type-table strong,
.type-table span,
.type-table em {
  color: rgba(0, 0, 0, 0.62);
  font-size: 12px;
  font-style: normal;
}

.type-table strong {
  color: #191c1e;
  font-weight: 850;
}

.type-sample {
  border-radius: 18px;
  background: #f3f6fb;
  padding: 24px;
}

.type-sample-card {
  display: grid;
  align-content: start;
  gap: 18px;
}

.type-sample span {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  font-weight: 800;
}

.type-sample strong {
  display: block;
  color: #191c1e;
  font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 20px;
  line-height: 28px;
  margin-top: 6px;
}

.component-grid,
.rule-grid,
.page-grid,
.state-grid,
.mapping-list {
  display: grid;
  gap: 16px;
}

.component-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.rule-grid,
.page-grid,
.state-grid,
.mapping-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.component-grid article,
.rule-grid article,
.page-grid article,
.state-grid article {
  min-width: 0;
  padding: 24px;
}

.showcase-card .component-grid article,
.showcase-card .rule-grid article,
.showcase-card .page-grid article,
.showcase-card .mapping-list article,
.showcase-card .state-grid article {
  box-shadow: none;
}

.component-grid article > div {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 12px;
}

.component-grid small {
  flex: 0 0 auto;
  border-radius: 999px;
  background: #f3f6fb;
  color: rgba(0, 0, 0, 0.45);
  font-size: 11px;
  font-weight: 800;
  padding: 3px 8px;
}

.component-grid p,
.rule-grid p,
.page-grid p,
.state-grid p {
  margin: 10px 0 0;
  color: rgba(0, 0, 0, 0.58);
  font-size: 13px;
  line-height: 21px;
}

.component-grid footer {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
}

.component-grid footer span {
  border-radius: 6px;
  background: #fff;
  color: rgba(0, 0, 0, 0.46);
  font-size: 11px;
  font-weight: 750;
  padding: 4px 8px;
}

.mapping-list article {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 14px;
  min-height: 148px;
  padding: 24px;
}

.mapping-list strong {
  color: #191c1e;
  font-size: 14px;
  font-weight: 900;
}

.mapping-list span {
  color: #2864ff;
  font-size: 22px;
  font-weight: 900;
}

.mapping-list p {
  grid-column: 1 / -1;
  margin: 0;
}

.state-design-card {
  --state-accent: #1671ee;
  --state-soft: #f5f7fa;
  display: flex;
  min-width: 0;
  min-height: 160px;
  flex-direction: column;
  align-items: stretch;
  border-color: #f3f4f6;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 10px 14px rgba(34, 54, 88, 0.06);
  padding: 17px;
}

.state-design-card.is-danger {
  --state-accent: #e7000b;
  --state-soft: #fceaeb;
}

.state-design-card.is-neutral {
  --state-accent: #64748b;
  --state-soft: #f5f7fa;
}

.state-card-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.state-title-mark {
  display: block;
  width: 4px;
  height: 14px;
  flex: 0 0 auto;
  border-radius: 999px;
  background: #1671ee;
}

.state-card-heading strong {
  min-width: 0;
  color: #111827;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
}

.state-card-copy {
  display: -webkit-box;
  margin: 6px 0 0 12px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #6b7280;
  font-size: 11px;
  letter-spacing: 0;
  line-height: 16px;
}

.state-demo {
  margin-top: 12px;
}

.state-demo-loading {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  min-height: 40px;
}

.state-demo-loading > div {
  display: grid;
  gap: 8px;
}

.state-demo-loading > div span {
  display: block;
  height: 12px;
  border-radius: 6px;
  background: #f5f7fa;
}

.state-demo-loading > div span:first-child {
  width: 70%;
}

.state-demo-loading > div span:last-child {
  width: 45%;
}

.state-demo-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(22, 113, 238, 0.16);
  border-top-color: #1671ee;
  border-radius: 999px;
}

.state-demo-empty {
  display: flex;
  min-height: 122px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  background: #f5f7fa;
  padding: 20px;
  text-align: center;
}

.state-empty-icon {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  color: #c9d0da;
  font-size: 22px;
  font-weight: 800;
  line-height: 1;
}

.state-demo-empty strong,
.state-demo-error strong {
  color: #344054;
  font-size: 13px;
  font-weight: 650;
  line-height: 20px;
}

.state-demo-empty small,
.state-demo-error small {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: #6b7280;
  font-size: 11px;
  font-weight: 400;
  line-height: 17px;
}

.state-demo-error {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  min-height: 68px;
  border-radius: 8px;
  background: #fceaeb;
  padding: 16px;
}

.state-error-icon {
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  color: #e7000b;
  font-size: 14px;
  font-weight: 900;
}

.state-demo-error strong {
  color: #e7000b;
}

.state-demo-error button {
  display: inline-flex;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e7000b;
  border-radius: 999px;
  background: transparent;
  color: #e7000b;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  padding: 0 13px;
  pointer-events: none;
}

.state-mapping-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 12px;
}

.state-mapping-card {
  grid-column: 1 / -1;
  min-height: 118px;
}

.state-mapping-list div {
  --state-accent: #d1d5db;
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr);
  align-items: start;
  gap: 6px 10px;
  min-height: 54px;
}

.state-mapping-list div.is-success {
  --state-accent: #009966;
}

.state-mapping-list div.is-warning {
  --state-accent: #e17100;
}

.state-mapping-list div.is-danger {
  --state-accent: #e7000b;
}

.state-mapping-list div.is-neutral {
  --state-accent: #d1d5db;
}

.state-mapping-list i {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--state-accent);
}

.state-mapping-list strong {
  color: var(--state-accent);
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
}

.state-mapping-list span {
  display: -webkit-box;
  min-width: 0;
  grid-column: 2;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #6b7280;
  font-size: 11px;
  line-height: 17px;
}

@media (max-width: 1180px) {
  .spec-intro-card {
    grid-template-columns: 1fr;
  }

  .spec-sidebar {
    display: flex;
    overflow-x: auto;
    border-right: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 0 0 20px;
  }

  .sidebar-mark {
    display: none;
  }

  .spec-sidebar a {
    flex: 0 0 auto;
  }

  .spec-hero,
  .foundation-grid,
  .typography-grid {
    grid-template-columns: 1fr;
  }

  .color-grid,
  .component-grid,
  .rule-grid,
  .page-grid,
  .state-grid,
  .mapping-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .state-mapping-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .mobile-spec-topbar {
    height: auto;
    flex-direction: column;
    align-items: stretch;
    padding: 12px 18px;
  }

  .topbar-left {
    width: 100%;
    flex-wrap: wrap;
  }

  .portfolio-brand {
    flex: 1 1 100%;
  }

  .case-return,
  .pc-spec-switch {
    flex: 1;
    justify-content: center;
  }

  .mobile-spec-main {
    padding: 190px 14px 56px;
  }

  .spec-intro-card {
    border-radius: 26px;
    padding: 22px;
  }

  .spec-content {
    padding: 0;
  }

  .spec-hero h1 {
    font-size: 38px;
    letter-spacing: -0.04em;
  }

  .color-grid,
  .component-grid,
  .rule-grid,
  .page-grid,
  .state-grid,
  .mapping-list,
  .foundation-grid,
  .typography-grid,
  .overview-grid {
    grid-template-columns: 1fr;
  }

  .mapping-list article,
  .type-table div {
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .state-mapping-list {
    grid-template-columns: 1fr;
  }
}
</style>
