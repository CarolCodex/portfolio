<template>
  <div v-if="item" class="container page case-detail-page" :class="{ 'device-case-page': isDeviceHealthCase }">
    <template v-if="isDeviceHealthCase">
      <section class="device-case-hero">
        <div class="device-case-intro">
          <span class="eyebrow">{{ item.year }} · {{ item.category }}</span>
          <h1>{{ item.title }}</h1>
          <p>{{ item.subtitle }}</p>
          <div class="device-main-nav" aria-label="设备健康案例大分类">
            <button
              v-for="view in mainViewTabs"
              :key="view.key"
              class="device-main-nav-button"
              :class="{ active: activeMainView === view.key }"
              :aria-pressed="activeMainView === view.key"
              :aria-expanded="view.key === 'spec' ? specMenuOpen : undefined"
              type="button"
              @click="handleMainViewClick(view.key)"
            >
              {{ view.label }}
            </button>

            <Transition name="device-spec-menu">
              <div v-if="specMenuOpen" class="device-spec-dropdown" role="menu" aria-label="设计规范分类">
                <button
                  v-for="option in specSubViewTabs"
                  :key="option.key"
                  type="button"
                  role="menuitemradio"
                  :aria-checked="activeMainView === 'spec' && activeSpecSubView === option.key"
                  :class="{ active: activeMainView === 'spec' && activeSpecSubView === option.key }"
                  @click="setSpecSubView(option.key)"
                >
                  <span>{{ option.label }}</span>
                  <small>{{ option.description }}</small>
                </button>
              </div>
            </Transition>
          </div>
        </div>

        <div class="device-showcase-row">
          <aside class="device-case-copy">
            <template v-if="activeMainView === 'app'">
              <div class="device-switcher" aria-label="案例模块切换">
                <button
                  v-for="tab in devicePanelTabs"
                  :key="tab.key"
                  class="device-switch-button"
                  :class="{ active: activeDevicePanel === tab.key }"
                  :aria-pressed="activeDevicePanel === tab.key"
                  type="button"
                  @click="setActiveDevicePanel(tab.key)"
                >
                  {{ tab.label }}
                </button>
              </div>

              <article class="device-current-card" aria-live="polite">
                <span>{{ activeDevicePanelContent.label }}</span>
                <h2>{{ activeDevicePanelContent.title }}</h2>
                <p>{{ activeDevicePanelContent.description }}</p>
              </article>

              <div class="device-highlights" :class="{ 'is-login-highlights': activeDevicePanel === 'login' }" aria-label="案例亮点">
                <article v-for="highlight in activeDeviceHighlights" :key="highlight.title">
                  <strong>{{ highlight.title }}</strong>
                  <span>{{ highlight.description }}</span>
                </article>
              </div>
            </template>

            <template v-else>
              <article class="device-current-card" aria-live="polite">
                <span>{{ activeMainViewContent.label }}</span>
                <h2>{{ activeMainViewContent.title }}</h2>
                <p>{{ activeMainViewContent.description }}</p>
              </article>

              <div class="device-highlights is-main-view-highlights" aria-label="分类亮点">
                <article v-for="highlight in activeMainViewHighlights" :key="highlight.title">
                  <strong>{{ highlight.title }}</strong>
                  <span>{{ highlight.description }}</span>
                </article>
              </div>
            </template>
          </aside>

          <div class="device-platform-stage" :data-main-view="activeMainView" :data-panel="activeDevicePanel">
            <div v-if="activeMainView === 'app'" class="device-app-demo">
              <div class="device-app-viewport">
                <DeviceHealthMobileDemo :preview-page="activeDevicePanel" />
              </div>
            </div>

            <article v-else class="device-view-placeholder" :class="`is-${activeMainView}`">
              <span>{{ activeMainViewContent.mediaLabel }}</span>
              <h3>{{ activeMainViewContent.mediaTitle }}</h3>
              <p>{{ activeMainViewContent.mediaDescription }}</p>
              <div class="device-placeholder-grid" aria-hidden="true">
                <i v-for="index in 4" :key="index" />
              </div>
            </article>
          </div>
        </div>
      </section>

    </template>

    <template v-else>
      <section class="detail-hero">
        <div>
          <span class="eyebrow">{{ item.year }} · {{ item.category }}</span>
          <h1>{{ item.title }}</h1>
          <p>{{ item.subtitle }}</p>
          <div class="hero-actions">
            <div class="skill-cloud">
              <SkillTag v-for="tag in item.tags" :key="tag">{{ tag }}</SkillTag>
            </div>
            <RouterLink v-if="item.designSpec" class="spec-link-button" :to="`/cases/${item.id}/design-spec`">
              设计规范
            </RouterLink>
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
    </template>
  </div>
  <div v-else class="container page">
    <SectionTitle title="案例不存在" description="该案例可能已被移动或尚未添加。" />
    <RouterLink class="button primary" to="/cases">返回案例列表</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BeforeAfter from '@/components/BeforeAfter.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SkillTag from '@/components/SkillTag.vue'
import { cases } from '@/data/cases'

const route = useRoute()
const item = computed(() => cases.find((caseItem) => caseItem.id === route.params.id))
const DeviceHealthMobileDemo = defineAsyncComponent(() =>
  import('@/cases/device-health-management-platform/DeviceHealthMobileDemo.vue'),
)

type DevicePanelKey = 'login' | 'home' | 'workbench' | 'tasks' | 'inspection' | 'defect' | 'repair' | 'profile'
type MainViewKey = 'app' | 'pc' | 'spec'
type SpecSubViewKey = 'mobile' | 'pc'

const activeDevicePanel = ref<DevicePanelKey>('login')
const activeMainView = ref<MainViewKey>('app')
const activeSpecSubView = ref<SpecSubViewKey>('mobile')
const specMenuOpen = ref(false)
const isDeviceHealthCase = computed(() => item.value?.id === 'device-health-management-platform')
const mainViewTabs: Array<{ key: MainViewKey; label: string }> = [
  { key: 'app', label: 'APP' },
  { key: 'pc', label: 'PC后台' },
  { key: 'spec', label: '设计规范' },
]
const specSubViewTabs: Array<{ key: SpecSubViewKey; label: string; description: string }> = [
  { key: 'mobile', label: '移动端设计规范', description: 'APP 组件、状态与页面规则' },
  { key: 'pc', label: 'PC后台设计规范', description: '后台布局、表格与业务组件规则' },
]
const devicePanelTabs: Array<{ key: DevicePanelKey; label: string }> = [
  { key: 'login', label: '查看登录页' },
  { key: 'home', label: '查看首页' },
  { key: 'workbench', label: '查看工作台' },
  { key: 'tasks', label: '查看待办' },
  { key: 'inspection', label: '查看点检管理' },
  { key: 'defect', label: '查看缺陷管理' },
  { key: 'repair', label: '查看检修管理' },
  { key: 'profile', label: '查看我的' },
]

function setActiveDevicePanel(panel: DevicePanelKey) {
  activeDevicePanel.value = panel
}

function handleMainViewClick(view: MainViewKey) {
  if (view === 'spec') {
    specMenuOpen.value = !specMenuOpen.value
    return
  }

  activeMainView.value = view
  specMenuOpen.value = false
}

function setSpecSubView(view: SpecSubViewKey) {
  activeMainView.value = 'spec'
  activeSpecSubView.value = view
  specMenuOpen.value = false
}

const highlightDescriptions: Record<string, string> = {
  设备健康评分: '用统一评分和趋势状态帮助管理者快速判断设备风险。',
  告警分级: '区分一般、异常、预警和危险，提升处理优先级判断效率。',
  资产详情模板: '将设备档案、状态、告警和任务收束到稳定的信息框架。',
  'PC + APP 一致性规范': '让管理端和现场端共用颜色、标签、组件与状态语言。',
}

const loginHighlights = [
  {
    title: '视觉重构',
    description: '从旧稿的简陋输入框升级为大厂标准的极简卡片，顶部融入科技感工业风力发电机 3D 浮雕，增强工业软件辨识度。',
  },
  {
    title: '交互细节',
    description: '增加一键明暗码切换、企业配置下钻入口以及“记住密码”状态拦截，降低一线人员误操作率。',
  },
  {
    title: '一致性规范',
    description: '登录主按钮采用系统高饱和度标准蓝，规范字体层级，首屏视觉聚焦于核心操作流。',
  },
]

const activeDeviceHighlights = computed(() => {
  const currentItem = item.value

  if (activeDevicePanel.value === 'login') {
    return loginHighlights
  }

  return (currentItem?.highlights ?? []).map((highlight) => ({
    title: highlight,
    description: highlightDescriptions[highlight] ?? '围绕业务场景沉淀可复用的界面与规范能力。',
  }))
})

const activeDevicePanelContent = computed(() => {
  const currentItem = item.value

  if (!currentItem) {
    return {
      label: '',
      title: '',
      description: '',
      points: [],
    }
  }

  const contentMap: Record<DevicePanelKey, {
    label: string
    title: string
    description: string
    points: string[]
  }> = {
    login: {
      label: '安全门户 Demo',
      title: '多租户安全登录与企业底衬',
      description: '围绕一线设备运维人员的入口场景，重构登录页的视觉识别、输入效率和安全感知。',
      points: [
        '视觉重构：从旧稿的简陋输入框升级为大厂标准的极简卡片，顶部融入科技感工业风力发电机 3D 浮雕，增强工业软件辨识度。',
        '交互细节：增加一键明暗码切换、企业配置下钻入口以及“记住密码”状态拦截，降低一线人员误操作率。',
        '一致性规范：登录主按钮采用系统高饱和度标准蓝，规范字体层级，首屏视觉聚焦于核心操作流。',
      ],
    },
    home: {
      label: '设备总览 Demo',
      title: '首页状态总览与风险判断',
      description: currentItem.background,
      points: ['资产、状态、告警、巡检任务需要在同一系统内协同', '信息架构需要降低管理端和现场端的理解成本'],
    },
    workbench: {
      label: '工作台 Demo',
      title: '按任务链路重构设备管理入口',
      description: currentItem.summary,
      points: currentItem.solutions,
    },
    tasks: {
      label: '待办 Demo',
      title: '告警与任务的优先级处理',
      description: '将高风险告警、巡检复核和维修同步收束到同一个待办队列，帮助现场人员快速判断处理顺序。',
      points: ['按紧急、待处理、已处理筛选任务', '保留处理和复核入口，承接告警闭环'],
    },
    inspection: {
      label: '点检管理 Demo',
      title: '点检计划与现场执行',
      description: '对应工作台设备管理模块中的点检管理入口，承载点检计划、扫码巡检和现场执行链路。',
      points: ['左侧入口与 APP 工作台图标状态联动', '突出点检计划与现场执行的主入口'],
    },
    defect: {
      label: '缺陷管理 Demo',
      title: '缺陷上报与跟踪闭环',
      description: '对应工作台设备管理模块中的缺陷管理入口，用于缺陷上报、风险识别和跟踪闭环。',
      points: ['左侧入口与 APP 工作台图标状态联动', '强化缺陷上报与跟踪闭环的入口识别'],
    },
    repair: {
      label: '检修管理 Demo',
      title: '检修计划与记录沉淀',
      description: '对应工作台设备管理模块中的检修管理入口，聚焦检修计划、执行记录和归档信息。',
      points: ['左侧入口与 APP 工作台图标状态联动', '明确检修计划与记录沉淀的入口位置'],
    },
    profile: {
      label: '我的 Demo',
      title: '组织、站点和系统设置聚合',
      description: currentItem.platform,
      points: ['统一个人身份、组织、站点与系统设置入口', '关于系统可进入独立页面，沉淀服务协议和版本检查'],
    },
  }

  return contentMap[activeDevicePanel.value]
})

const activeMainViewContent = computed(() => {
  if (activeMainView.value === 'pc') {
    return {
      label: 'PC后台占位',
      title: 'PC后台运维管理视图',
      description: '后台端内容已预留位置，后续用于展示设备台账、告警处置、检修计划和数据报表等管理端页面。',
      mediaLabel: 'PC Console',
      mediaTitle: '后台页面占位',
      mediaDescription: '先保留 PC 后台展示区，后续按设计稿补齐仪表盘、列表、详情和配置页面。',
    }
  }

  if (activeSpecSubView.value === 'pc') {
    return {
      label: 'PC后台设计规范',
      title: '后台布局、表格与业务组件规范',
      description: '用于沉淀 PC 管理端的导航结构、筛选区、数据表格、状态标签、批量操作和弹窗表单规则。',
      mediaLabel: 'PC Spec',
      mediaTitle: 'PC后台设计规范占位',
      mediaDescription: '页面先占位，后续补充后台端组件库、表格规则、筛选规则和页面模板。',
    }
  }

  return {
    label: '移动端设计规范',
    title: '移动端组件、状态与页面规则',
    description: '用于沉淀 APP 端的颜色、字体、图标、卡片、底部导航、状态反馈和业务表单规则。',
    mediaLabel: 'Mobile Spec',
    mediaTitle: '移动端设计规范占位',
    mediaDescription: '页面先占位，后续补充移动端组件、页面结构、状态色和交互规范。',
  }
})

const activeMainViewHighlights = computed(() => {
  if (activeMainView.value === 'pc') {
    return [
      {
        title: '后台信息架构',
        description: '预留设备台账、告警中心、检修计划和报表分析入口，承接管理端高频操作。',
      },
      {
        title: '数据密度控制',
        description: '后续以表格、筛选、批量操作和详情抽屉为核心，保证大屏信息可扫描。',
      },
      {
        title: '与 APP 任务闭环',
        description: 'PC 端负责管理配置与数据复核，APP 端负责现场执行，状态链路保持一致。',
      },
    ]
  }

  if (activeSpecSubView.value === 'pc') {
    return [
      {
        title: '布局规范',
        description: '沉淀后台导航、页头、筛选区、表格区和操作区的间距与响应规则。',
      },
      {
        title: '表格与筛选',
        description: '统一字段密度、状态标签、空态、加载态和批量操作反馈。',
      },
      {
        title: '业务组件',
        description: '为设备详情、告警处理、检修计划和资产配置沉淀可复用模块。',
      },
    ]
  }

  return [
    {
      title: '视觉基础',
      description: '沉淀移动端主色、背景、文字层级、图标尺寸和卡片样式。',
    },
    {
      title: '组件规则',
      description: '统一导航、按钮、列表、表单、弹层、状态徽标和底部 Tab 的使用方式。',
    },
    {
      title: '业务状态',
      description: '覆盖设备健康、告警分级、点检任务、缺陷处理和检修记录等状态表达。',
    },
  ]
})
</script>

<style scoped>
.device-case-page {
  width: min(100% - 96px, 1320px);
  padding-top: 64px;
}

@supports (content-visibility: auto) {
  .case-detail-page > .section,
  .case-detail-page > .detail-grid,
  .device-case-page > .device-section {
    content-visibility: auto;
    contain-intrinsic-size: auto 520px;
  }
}

.hero-actions {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.spec-link-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 10px 18px;
  border: 1px solid rgba(13, 110, 253, 0.18);
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(13, 110, 253, 0.96), rgba(80, 168, 255, 0.96));
  color: #fff;
  font-size: 14px;
  font-weight: 850;
  box-shadow: 0 16px 34px rgba(13, 110, 253, 0.22);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.spec-link-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 42px rgba(13, 110, 253, 0.28);
}

.device-case-hero {
  display: grid;
  gap: 42px;
  align-items: start;
  justify-items: center;
}

.device-case-intro {
  display: grid;
  width: min(100%, 1040px);
  justify-items: center;
  text-align: center;
}

.device-case-intro h1 {
  max-width: 760px;
  margin: 14px 0 18px;
  color: #0f2a5f;
  font-size: clamp(38px, 5.2vw, 64px);
  line-height: 1.08;
}

.device-case-intro p {
  max-width: 820px;
  margin: 0 0 24px;
  color: #5d728f;
  font-size: 18px;
  line-height: 1.8;
}

.device-case-intro .skill-cloud {
  justify-content: center;
}

.device-main-nav {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.52);
  box-shadow: 0 14px 34px rgba(43, 112, 198, 0.1);
  backdrop-filter: blur(16px);
}

.device-main-nav-button {
  min-width: 116px;
  min-height: 40px;
  padding: 0 22px;
  border: 1px solid rgba(23, 82, 143, 0.08);
  border-radius: 999px;
  background: rgba(248, 251, 255, 0.82);
  color: #17528f;
  font: inherit;
  font-size: 15px;
  font-weight: 850;
  line-height: 22px;
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.device-main-nav-button:hover {
  transform: translateY(-1px) scale(1.02);
  border-color: rgba(27, 124, 238, 0.24);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 10px 22px rgba(43, 112, 198, 0.12);
}

.device-main-nav-button.active {
  border-color: rgba(27, 124, 238, 0.42);
  background: linear-gradient(135deg, #0f6ce8 0%, #28b7ff 100%);
  box-shadow: 0 16px 32px rgba(33, 136, 239, 0.28);
  color: #fff;
}

.device-spec-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 12;
  display: grid;
  gap: 8px;
  width: 246px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(18px);
}

.device-spec-dropdown button {
  display: grid;
  gap: 3px;
  width: 100%;
  padding: 12px 14px;
  border: 0;
  border-radius: 14px;
  background: rgba(242, 248, 255, 0.7);
  color: #17528f;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.device-spec-dropdown button:hover,
.device-spec-dropdown button.active {
  background: linear-gradient(135deg, rgba(15, 108, 232, 0.96), rgba(40, 183, 255, 0.96));
  color: #fff;
  transform: translateY(-1px);
}

.device-spec-dropdown span {
  font-size: 14px;
  font-weight: 850;
  line-height: 20px;
}

.device-spec-dropdown small {
  color: currentcolor;
  font-size: 12px;
  font-weight: 650;
  line-height: 18px;
  opacity: 0.72;
}

.device-spec-menu-enter-active,
.device-spec-menu-leave-active {
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.device-spec-menu-enter-from,
.device-spec-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.device-showcase-row {
  display: grid;
  grid-template-columns: minmax(620px, 1fr) minmax(380px, 490px);
  align-items: center;
  gap: clamp(52px, 6vw, 92px);
  width: 100%;
}

.device-case-copy {
  display: grid;
  min-width: 0;
  width: 100%;
  max-width: 780px;
  justify-self: end;
  text-align: left;
}

.device-switcher {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.device-switch-button {
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 12px 28px rgba(43, 112, 198, 0.08);
  color: #17528f;
  font-size: 15px;
  font-weight: 800;
  line-height: 22px;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.device-switch-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 34px rgba(43, 112, 198, 0.12);
}

.device-switch-button.active {
  border-color: rgba(27, 124, 238, 0.45);
  background: linear-gradient(135deg, #0f6ce8 0%, #28b7ff 100%);
  box-shadow: 0 18px 34px rgba(33, 136, 239, 0.28);
  color: #fff;
}

.device-current-card {
  display: grid;
  gap: 10px;
  width: 100%;
  margin-top: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 20px 46px rgba(43, 112, 198, 0.1);
}

.device-current-card > span {
  justify-self: start;
  min-height: 24px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(36, 137, 239, 0.1);
  color: #0f6ce8;
  font-size: 12px;
  font-weight: 900;
  line-height: 16px;
}

.device-current-card h2 {
  margin: 0;
  color: #0f2a5f;
  font-size: 24px;
  line-height: 1.28;
}

.device-current-card p {
  color: #5d728f;
  font-size: 14px;
  line-height: 1.72;
  margin: 0;
}

.device-highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  margin-top: 16px;
}

.device-highlights.is-login-highlights {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.device-highlights.is-main-view-highlights {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.device-highlights article {
  display: grid;
  gap: 6px;
  min-height: 118px;
  padding: 16px 18px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 18px 42px rgba(43, 112, 198, 0.08);
}

.device-highlights strong {
  color: #0f2a5f;
  font-size: 15px;
}

.device-highlights span {
  color: #5d728f;
  font-size: 14px;
  line-height: 1.6;
}

.device-actions {
  margin-top: 22px;
}

.device-platform-stage {
  position: relative;
  display: flex;
  container-type: inline-size;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 780px;
  overflow: visible;
}

.device-platform-stage[data-main-view='pc'],
.device-platform-stage[data-main-view='spec'] {
  min-height: 560px;
}

.device-app-demo {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: min(100%, 412px);
  aspect-ratio: 412 / 866;
  padding: 10px;
  border: 1px solid rgba(15, 42, 95, 0.12);
  border-radius: 42px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow:
    0 30px 70px rgba(43, 112, 198, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(18px);
}

.device-app-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 36px;
  background: #f4f8ff;
}

.device-view-placeholder {
  display: grid;
  align-content: center;
  justify-items: start;
  gap: 16px;
  width: min(100%, 468px);
  min-height: 420px;
  padding: 36px;
  border: 1px solid rgba(255, 255, 255, 0.76);
  border-radius: 32px;
  background:
    radial-gradient(circle at 80% 12%, rgba(40, 183, 255, 0.2), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(235, 246, 255, 0.76));
  box-shadow: 0 30px 70px rgba(43, 112, 198, 0.16);
  backdrop-filter: blur(18px);
}

.device-view-placeholder > span {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(36, 137, 239, 0.1);
  color: #0f6ce8;
  font-size: 12px;
  font-weight: 900;
  line-height: 18px;
}

.device-view-placeholder h3 {
  max-width: 340px;
  margin: 0;
  color: #0f2a5f;
  font-size: 34px;
  line-height: 1.16;
}

.device-view-placeholder p {
  max-width: 360px;
  margin: 0;
  color: #5d728f;
  font-size: 15px;
  line-height: 1.75;
}

.device-placeholder-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  margin-top: 12px;
}

.device-placeholder-grid i {
  min-height: 86px;
  border: 1px solid rgba(40, 137, 239, 0.12);
  border-radius: 18px;
  background:
    linear-gradient(90deg, rgba(15, 108, 232, 0.1), rgba(40, 183, 255, 0.04)),
    rgba(255, 255, 255, 0.68);
}

.device-view-placeholder.is-spec .device-placeholder-grid i:nth-child(1),
.device-view-placeholder.is-spec .device-placeholder-grid i:nth-child(4),
.device-view-placeholder.is-pc .device-placeholder-grid i:nth-child(2),
.device-view-placeholder.is-pc .device-placeholder-grid i:nth-child(3) {
  background:
    linear-gradient(135deg, rgba(15, 108, 232, 0.22), rgba(40, 183, 255, 0.1)),
    rgba(255, 255, 255, 0.72);
}

.device-section {
  margin-top: 86px;
}

.device-list-grid .content-panel {
  display: flex;
  align-items: center;
  min-height: 104px;
  color: #0f2a5f;
  font-weight: 750;
  line-height: 1.7;
}

.device-process-grid,
.device-review {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

@media (max-width: 640px) {
  .hero-actions {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 1040px) {
  .device-case-page {
    width: min(100% - 48px, 760px);
    padding-top: 48px;
  }

  .device-showcase-row {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .device-case-copy {
    max-width: none;
    justify-self: stretch;
  }

  .device-platform-stage {
    min-height: 840px;
  }
}

@media (max-width: 720px) {
  .device-case-page {
    width: min(100% - 40px, 720px);
    padding-top: 36px;
  }

  .device-case-hero {
    gap: 34px;
  }

  .device-case-intro {
    justify-items: start;
    text-align: left;
  }

  .device-case-intro h1 {
    font-size: clamp(34px, 12vw, 48px);
  }

  .device-case-intro .skill-cloud {
    justify-content: flex-start;
  }

  .device-main-nav {
    justify-content: flex-start;
    max-width: 100%;
  }

  .device-main-nav-button {
    min-width: 96px;
    padding: 0 16px;
  }

  .device-spec-dropdown {
    right: auto;
    left: 0;
  }

  .device-highlights,
  .device-highlights.is-main-view-highlights,
  .device-process-grid,
  .device-review {
    grid-template-columns: 1fr;
  }

  .device-switcher {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .device-platform-stage {
    min-height: 0;
    padding: 12px 0;
  }

  .device-app-demo {
    width: min(100%, 412px);
  }
}

@media (max-width: 480px) {
  .device-switch-button {
    flex: 1 1 calc(50% - 5px);
    padding: 0 14px;
  }

  .device-main-nav {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    border-radius: 24px;
  }

  .device-main-nav-button {
    width: 100%;
  }

  .device-spec-dropdown {
    width: min(100%, 280px);
  }

  .device-current-card {
    padding: 20px;
  }

  .device-platform-stage {
    padding: 10px 0;
  }

  .device-app-demo {
    padding: 8px;
  }
}
</style>
