<template>
  <div
    v-if="item"
    class="container page case-detail-page"
    :class="{ 'device-case-page': isDeviceHealthCase, 'data-screen-case-page': isDataScreenCase }"
  >
    <template v-if="isDataScreenCase">
      <GalleryPage />
    </template>

    <template v-else-if="isDeviceHealthCase">
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
                <template v-for="option in specSubViewTabs" :key="option.key">
                  <RouterLink
                    role="menuitem"
                    :to="option.key === 'mobile' ? `/cases/${item.id}/mobile-design-system` : `/cases/${item.id}/design-spec`"
                    @click="specMenuOpen = false"
                  >
                    <span>{{ option.label }}</span>
                    <small>{{ option.description }}</small>
                  </RouterLink>
                </template>
              </div>
            </Transition>
          </div>
        </div>

        <div class="device-showcase-row" :data-main-view="activeMainView">
          <template v-if="activeMainView === 'app'">
            <aside class="device-app-nav-panel" aria-label="产品使用路径">
              <header class="device-stage-header" aria-live="polite">
                <h2>{{ activeDeviceStage.title }}</h2>
                <p>{{ activeDeviceStage.caption }}</p>
              </header>

              <span>核心页面</span>
              <div class="device-story-steps" aria-label="产品使用路径">
                <div v-for="(step, index) in deviceStorySteps" :key="step.key" class="device-story-step-group">
                  <button
                    class="device-story-step"
                    :class="{ active: activeStoryStep === step.key }"
                    :aria-current="activeStoryStep === step.key ? 'step' : undefined"
                    type="button"
                    @click="setDemoPage(step.page)"
                  >
                    <i>{{ String(index + 1).padStart(2, '0') }}</i>
                    <span>
                      <strong>{{ step.label }}</strong>
                      <small>{{ step.caption }}</small>
                    </span>
                  </button>

                  <div v-if="step.key === 'operate'" class="device-story-substeps" aria-label="工作台子功能入口">
                    <button
                      v-for="entry in workbenchStoryEntries"
                      :key="entry.page"
                      type="button"
                      :class="{ active: demoPage === entry.page }"
                      :aria-pressed="demoPage === entry.page"
                      @click="setDemoPage(entry.page)"
                    >
                      <strong>{{ entry.label }}</strong>
                      <small>{{ entry.caption }}</small>
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <div class="device-platform-stage" :data-main-view="activeMainView" :data-panel="activeDevicePanel">
              <div class="device-app-demo">
                <div class="device-app-viewport">
                  <DeviceHealthMobileDemo :preview-page="activeDevicePanel" @page-change="setActiveDevicePanel" />
                </div>
              </div>
            </div>

            <aside class="device-case-copy device-app-copy device-insights-panel" aria-label="设计洞察">
              <span class="device-insights-eyebrow">设计说明</span>
              <div class="device-insight-stack" aria-live="polite">
                <article class="device-insight-card is-primary">
                  <span>{{ activeDeviceInsights.primary.kicker }}</span>
                  <h2>{{ activeDeviceInsights.primary.title }}</h2>
                  <p>{{ activeDeviceInsights.primary.description }}</p>
                </article>

                <article v-for="insight in activeDeviceInsights.supporting" :key="insight.title" class="device-insight-card">
                  <span>{{ insight.kicker }}</span>
                  <strong>{{ insight.title }}</strong>
                  <p>{{ insight.description }}</p>
                </article>
              </div>
            </aside>
          </template>

          <template v-else>
            <aside class="device-case-copy">
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
            </aside>

            <div class="device-platform-stage" :data-main-view="activeMainView" :data-panel="activeDevicePanel">
              <LaptopMockup
                v-if="activeMainView === 'pc'"
                class="device-pc-laptop"
                :src="deviceHealthPcPreviewSrc"
                title="设备健康管理平台 PC 后台预览"
              />

              <article v-else class="device-view-placeholder" :class="`is-${activeMainView}`">
                <span>{{ activeMainViewContent.mediaLabel }}</span>
                <h3>{{ activeMainViewContent.mediaTitle }}</h3>
                <p>{{ activeMainViewContent.mediaDescription }}</p>
                <div class="device-placeholder-grid" aria-hidden="true">
                  <i v-for="index in 4" :key="index" />
                </div>
              </article>
            </div>
          </template>
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
import GalleryPage from '@/cases/data-screen-visualization/GalleryPage.vue'
import BeforeAfter from '@/components/BeforeAfter.vue'
import LaptopMockup from '@/components/LaptopMockup.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SkillTag from '@/components/SkillTag.vue'
import { cases } from '@/data/cases'

const route = useRoute()
const item = computed(() => cases.find((caseItem) => caseItem.id === route.params.id))
const DeviceHealthMobileDemo = defineAsyncComponent(() =>
  import('@/cases/device-health-management-platform/DeviceHealthMobileDemo.vue'),
)

type DevicePanelKey = 'login' | 'home' | 'workbench' | 'tasks' | 'inspection' | 'defect' | 'repair' | 'profile'
type DemoPageKey = 'login' | 'home' | 'workbench' | 'todo' | 'mine' | 'inspection' | 'defect' | 'repair'
type MainViewKey = 'app' | 'pc' | 'spec'
type SpecSubViewKey = 'mobile' | 'pc'
type DeviceStoryStepKey = 'login' | 'operate' | 'tasks' | 'profile'
type DeviceInsightCard = {
  kicker: string
  title: string
  description: string
}

const demoPageToDevicePanel: Record<DemoPageKey, DevicePanelKey> = {
  login: 'login',
  home: 'home',
  workbench: 'workbench',
  todo: 'tasks',
  mine: 'profile',
  inspection: 'inspection',
  defect: 'defect',
  repair: 'repair',
}
const devicePanelToDemoPage: Record<DevicePanelKey, DemoPageKey> = {
  login: 'login',
  home: 'home',
  workbench: 'workbench',
  tasks: 'todo',
  inspection: 'inspection',
  defect: 'defect',
  repair: 'repair',
  profile: 'mine',
}
const demoPage = ref<DemoPageKey>(getInitialDemoPage())
const activeDevicePanel = computed<DevicePanelKey>(() => demoPageToDevicePanel[demoPage.value])
const activeMainView = ref<MainViewKey>('app')
const activeSpecSubView = ref<SpecSubViewKey>('mobile')
const specMenuOpen = ref(false)
const isDeviceHealthCase = computed(() => item.value?.id === 'device-health-management-platform')
const isDataScreenCase = computed(() => item.value?.id === 'data-screen-visualization')
const deviceHealthPcPreviewSrc = computed(() => {
  const previewPath = 'cases/device-health-management-platform/pc-preview'
  const basePath = import.meta.env.BASE_URL || '/'

  return import.meta.env.PROD ? `${basePath}#/${previewPath}` : `${basePath}${previewPath}`
})
const mainViewTabs: Array<{ key: MainViewKey; label: string }> = [
  { key: 'app', label: 'APP' },
  { key: 'pc', label: 'PC后台' },
  { key: 'spec', label: '设计规范' },
]
const specSubViewTabs: Array<{ key: SpecSubViewKey; label: string; description: string }> = [
  { key: 'mobile', label: '移动端设计规范', description: 'APP 组件、状态与页面规则' },
  { key: 'pc', label: 'PC后台设计规范', description: '后台布局、表格与业务组件规则' },
]
const deviceStorySteps: Array<{ key: DeviceStoryStepKey; page: DemoPageKey; label: string; caption: string }> = [
  { key: 'login', page: 'login', label: '登录', caption: '身份与企业配置入场' },
  { key: 'operate', page: 'workbench', label: '工作台', caption: '设备作业与运维入口' },
  { key: 'tasks', page: 'todo', label: '待办', caption: '告警与工单优先处理' },
  { key: 'profile', page: 'mine', label: '我的', caption: '组织、站点与系统设置' },
]
const workbenchStoryEntries: Array<{ page: DemoPageKey; label: string; caption: string }> = [
  { page: 'inspection', label: '点检管理', caption: '点检计划与执行' },
  { page: 'defect', label: '缺陷管理', caption: '缺陷上报与跟踪' },
  { page: 'repair', label: '检修管理', caption: '检修计划与记录' },
]

const activeStoryStep = computed<DeviceStoryStepKey>(() => {
  if (activeDevicePanel.value === 'login') {
    return 'login'
  }

  if (activeDevicePanel.value === 'tasks') {
    return 'tasks'
  }

  if (activeDevicePanel.value === 'profile') {
    return 'profile'
  }

  return 'operate'
})

const activeDeviceStage = computed(() => {
  const stageMap: Record<DevicePanelKey, { label: string; title: string; caption: string }> = {
    login: {
      label: 'System Entry',
      title: '安全登录',
      caption: '从身份、企业配置开始建立可信作业上下文。',
    },
    home: {
      label: 'System Overview',
      title: '首页总览',
      caption: '将健康度、趋势和风险聚合为管理者的一眼判断。',
    },
    workbench: {
      label: 'Operation Hub',
      title: '工作台',
      caption: '把设备、点检、缺陷和检修收束为现场作业入口。',
    },
    tasks: {
      label: 'Priority Queue',
      title: '待办中心',
      caption: '按风险与时效组织任务，让处理顺序更清晰。',
    },
    inspection: {
      label: 'Field Execution',
      title: '点检管理',
      caption: '将计划、核对和现场执行压缩到同一条作业链路。',
    },
    defect: {
      label: 'Risk Loop',
      title: '缺陷管理',
      caption: '异常从上报到跟踪闭环，状态始终可追溯。',
    },
    repair: {
      label: 'Maintenance Loop',
      title: '检修管理',
      caption: '检修任务从指派、处理到归档形成完整记录。',
    },
    profile: {
      label: 'System Profile',
      title: '我的',
      caption: '把个人身份、组织站点和系统配置集中管理。',
    },
  }

  return stageMap[activeDevicePanel.value]
})

function getInitialDemoPage(): DemoPageKey {
  const panel = new URLSearchParams(window.location.search).get('mobileTab') as DevicePanelKey | null
  const validPanels: DevicePanelKey[] = ['login', 'home', 'workbench', 'tasks', 'inspection', 'defect', 'repair', 'profile']

  return panel && validPanels.includes(panel) ? devicePanelToDemoPage[panel] : 'login'
}

function setDemoPage(page: DemoPageKey) {
  demoPage.value = page
}

function setActiveDevicePanel(panel: DevicePanelKey) {
  demoPage.value = devicePanelToDemoPage[panel]
}

function handleMainViewClick(view: MainViewKey) {
  if (view === 'spec') {
    specMenuOpen.value = !specMenuOpen.value
    return
  }

  activeMainView.value = view
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
    description: '顶部引入3D场景建模相关元素，直击“设备健康”业务主题。表单区采用卡片悬浮设计，提升界面通透感与质感。',
  },
  {
    title: '交互细节',
    description: '增加一键明暗码切换、企业配置下钻入口以及“记住密码”状态拦截，降低一线人员误操作率。',
  },
  {
    title: '一致性规范',
    description: '严格收敛首屏视觉焦点，引导用户视线自然垂直下落至核心输入区，保障基础转化率。',
  },
]

const homeHighlights = [
  {
    title: '结构化卡片设计',
    description: '工业现场高强度作业下的视觉疲劳。整体采用大圆角卡片对各类图表、列表、指标进行归纳隔离，信息密度高却不拥挤，有效缓解',
  },
  {
    title: '扁平化信息架构',
    description: '将健康度评分、核心数据、趋势、分布以及实时告警收拢在单个长滚页内，通过垂直滑动即可完成对整个厂区运行状态的快速巡检。',
  },
  {
    title: '轻量化组件设计',
    description: '界面内的 ECharts及进度环均作了轻量化抽离，确保在低配工业手持PDA或弱网户外环境下，页面依然能保持流畅的渲染和滚动体验。',
  },
]

const workbenchHighlights = [
  {
    title: '设备管理',
    description: '全盘设备台账动态总览',
  },
  {
    title: '点检管理：',
    description: '点检计划现场高效执行与核对。',
  },
  {
    title: '缺陷管理',
    description: '异常缺陷即时上报与全流程跟踪。',
  },
  {
    title: '检修管理',
    description: '检修任务指派与全生命周期记录。',
  },
]

const activeDeviceHighlights = computed(() => {
  const currentItem = item.value

  if (activeDevicePanel.value === 'login') {
    return loginHighlights
  }

  if (activeDevicePanel.value === 'home') {
    return homeHighlights
  }

  if (activeDevicePanel.value === 'workbench') {
    return workbenchHighlights
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
      description: '',
      points: [
        '视觉重构：顶部引入3D场景建模相关元素，直击“设备健康”业务主题。表单区采用卡片悬浮设计，提升界面通透感与质感。',
        '交互细节：增加一键明暗码切换、企业配置下钻入口以及“记住密码”状态拦截，降低一线人员误操作率。',
        '一致性规范：严格收敛首屏视觉焦点，引导用户视线自然垂直下落至核心输入区，保障基础转化率。',
      ],
    },
    home: {
      label: '首页 Demo',
      title: '健康度看板与核心运维指标',
      description: '',
      points: homeHighlights.map((highlight) => `${highlight.title}：${highlight.description}`),
    },
    workbench: {
      label: '工作台 Demo',
      title: '全生命周期的运维工作台',
      description: '围绕设备“看、检、报、修”完整链路，构建一站式现场作业入口。',
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

const activeDeviceInsights = computed<{ primary: DeviceInsightCard; supporting: DeviceInsightCard[] }>(() => {
  const insightMap: Record<DevicePanelKey, { primary: DeviceInsightCard; supporting: DeviceInsightCard[] }> = {
    login: {
      primary: {
        kicker: '设计原则',
        title: '先建立可信入口，再进入复杂业务',
        description: '登录页不再只是表单容器，而是通过企业配置、记住密码和安全视觉底衬建立工业系统的可信起点。',
      },
      supporting: [
        {
          kicker: '业务价值',
          title: '降低一线误操作',
          description: '把企业选择、账号输入和密码状态收束到同一视线流，减少现场登录成本。',
        },
        {
          kicker: '系统能力',
          title: '多租户可配置',
          description: '为不同企业、站点和人员身份预留统一入口。',
        },
      ],
    },
    home: {
      primary: {
        kicker: '设计原则',
        title: '把风险判断前置到首屏',
        description: '首页以健康度和核心指标承接管理者的第一眼判断，从单点状态查看转为持续风险洞察。',
      },
      supporting: [
        {
          kicker: '业务价值',
          title: '缩短巡检决策链',
          description: '设备数量、异常、告警趋势集中呈现，快速识别重点区域。',
        },
        {
          kicker: '系统能力',
          title: '状态聚合',
          description: '支持图表、原子指标和实时告警在同一信息层级内协同。',
        },
      ],
    },
    workbench: {
      primary: {
        kicker: '设计原则',
        title: '围绕真实作业路径组织入口',
        description: '工作台从“功能集合”重构为“看、检、报、修”的现场路径，让用户按工作流进入系统。',
      },
      supporting: [
        {
          kicker: '业务价值',
          title: '入口更少，路径更短',
          description: '设备、点检、缺陷和检修入口按业务阶段排列，减少现场查找成本。',
        },
        {
          kicker: '系统能力',
          title: '模块状态联动',
          description: '工作台入口可承接二级页面状态，保持 APP 与后台任务闭环一致。',
        },
      ],
    },
    tasks: {
      primary: {
        kicker: '设计原则',
        title: '任务先按风险排序，再进入处理',
        description: '待办中心将告警、复核和工单压成一条优先级队列，帮助现场人员先处理最重要的事。',
      },
      supporting: [
        {
          kicker: '业务价值',
          title: '减少漏办',
          description: '以紧急度和状态筛选任务，避免高风险事项被普通工单淹没。',
        },
        {
          kicker: '系统能力',
          title: '闭环追踪',
          description: '待处理、处理中、已完成的状态可承接后台复核。',
        },
      ],
    },
    inspection: {
      primary: {
        kicker: '设计原则',
        title: '点检执行要贴近现场节奏',
        description: '点检页强调计划、核对和跳转设置，让巡检人员少判断、多执行。',
      },
      supporting: [
        {
          kicker: '业务价值',
          title: '执行更连续',
          description: '自动跳转设备和巡检项，减少重复选择。',
        },
        {
          kicker: '系统能力',
          title: '离线作业准备',
          description: '上传、下载和本机信息入口为现场弱网环境预留操作空间。',
        },
      ],
    },
    defect: {
      primary: {
        kicker: '设计原则',
        title: '异常上报需要一眼进入闭环',
        description: '缺陷页把数量、状态和工单列表放在同一叙事区域，强调从发现到跟踪的完整链路。',
      },
      supporting: [
        {
          kicker: '业务价值',
          title: '风险更快暴露',
          description: '缺陷工单状态直接呈现，帮助管理者快速判断处理优先级。',
        },
        {
          kicker: '系统能力',
          title: '状态可追踪',
          description: '待处理、新建等标签为后续派发、处理和复核提供基础。',
        },
      ],
    },
    repair: {
      primary: {
        kicker: '设计原则',
        title: '检修不是一次操作，而是一段生命周期',
        description: '检修页围绕派发、处理、记录和归档组织信息，强化任务在系统内的持续流转。',
      },
      supporting: [
        {
          kicker: '业务价值',
          title: '职责更清楚',
          description: '检修状态标签帮助现场与管理端同步任务所处阶段。',
        },
        {
          kicker: '系统能力',
          title: '记录沉淀',
          description: '每条检修工单保留时间、状态和描述，为后续追溯提供依据。',
        },
      ],
    },
    profile: {
      primary: {
        kicker: '设计原则',
        title: '把系统配置放到工作流之后',
        description: '“我的”作为低频但必要的收束区，承载身份、组织、站点和系统信息，避免打断主作业链路。',
      },
      supporting: [
        {
          kicker: '业务价值',
          title: '减少主流程干扰',
          description: '配置入口后置，让一线人员优先完成任务。',
        },
        {
          kicker: '系统能力',
          title: '组织与版本管理',
          description: '个人中心可沉淀组织切换、系统说明和版本检查。',
        },
      ],
    },
  }

  return insightMap[activeDevicePanel.value]
})

const activeMainViewContent = computed(() => {
  if (activeMainView.value === 'pc') {
    return {
      label: 'PC后台 Demo',
      title: '设备健康管理 PC 后台',
      description:
        '基于 Vue / TypeScript 构建的设备运维管理后台，支持浅色与深色模式，覆盖设备台账、运行监测、点检任务、缺陷工单与数据看板，形成与 APP 端一致的运维闭环。',
      mediaLabel: 'PC Console',
      mediaTitle: 'PC后台运维管理视图',
      mediaDescription: '展示设备台账、告警处置、检修计划和数据报表等管理端页面。',
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
        title: '业务架构清晰',
        description:
          '围绕设备台账、点检管理、在线监测、润滑管理和缺陷工单组织导航结构，让管理端可以快速查看设备状态、任务进度和异常处理情况。',
      },
      {
        title: '双主题视觉体系',
        description:
          '浅色模式保证日常办公场景下的清晰阅读，深色模式适配监控大屏与长时间值守场景，统一卡片、表格、状态标签和图表视觉规范。',
      },
      {
        title: '组件化工程实现',
        description:
          '页面按 Sidebar、MetricCard、DataTable、ChartPanel、StatusTag 等模块拆分，便于后续扩展更多设备类型、统计指标和工单流程。',
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

<style scoped src="./CaseDetail.css"></style>
