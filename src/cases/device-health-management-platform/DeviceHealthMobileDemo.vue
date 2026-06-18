<template>
  <div class="device-mobile-demo" :class="{ 'is-login': !isAuthenticated }" :data-page="isAuthenticated ? activeTab : 'login'">
    <section v-if="!isAuthenticated" class="login-screen" aria-label="设备健康管理登录">
      <img
        class="login-bg"
        src="/case-assets/device-health-management-platform/login-bg-mobile.jpg"
        alt=""
        width="706"
        height="1254"
        aria-hidden="true"
        loading="eager"
        decoding="async"
      />

      <header class="login-brand">
        <div class="login-logo">
          <img src="/case-assets/device-health-management-platform/login-logo-mark.svg" alt="" aria-hidden="true" />
        </div>
        <h2>设备健康管理</h2>
      </header>

      <form class="login-form" @submit.prevent="handleLogin">
        <section class="login-card">
          <label class="login-field login-field-select">
            <input v-model="enterpriseName" type="text" autocomplete="organization" placeholder="请选择企业名称" />
            <img src="/case-assets/device-health-management-platform/login-select-arrow.svg" alt="" aria-hidden="true" />
          </label>

          <label class="login-field">
            <input v-model="username" type="text" autocomplete="username" placeholder="请输入用户名" />
          </label>

          <label class="login-field login-password-field">
            <input
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="••••••••"
            />
            <button type="button" aria-label="切换密码可见性" @click="passwordVisible = !passwordVisible">
              <img src="/case-assets/device-health-management-platform/login-eye.svg" alt="" aria-hidden="true" />
            </button>
          </label>

          <div class="login-options">
            <label>
              <input v-model="rememberPassword" type="checkbox" />
              <span>
                <img src="/case-assets/device-health-management-platform/login-checkbox.svg" alt="" aria-hidden="true" />
              </span>
              记住密码
            </label>
            <button type="button">企业配置</button>
          </div>
        </section>

        <div class="login-bottom-action">
          <button type="submit">登录</button>
        </div>
      </form>
    </section>

    <template v-else>
      <header class="mobile-header">
        <button class="icon-button menu-button" type="button" aria-label="打开设备菜单" @click="menuOpen = !menuOpen">
          <span />
          <span />
          <span />
        </button>
        <strong>{{ currentPageTitle }}</strong>
        <button class="icon-button notify-button" type="button" :aria-label="headerActionLabel" @click="searchOpen = !searchOpen">
          <img :src="headerActionIcon" alt="" />
        </button>
      </header>

    <div v-if="searchOpen" class="search-panel">
      <input v-model="searchQuery" type="search" placeholder="搜索设备、工单或告警" />
      <button type="button" @click="clearSearch">清空</button>
    </div>

    <main class="mobile-main">
      <section v-if="activeTab === 'home'" class="page-stack">
        <article class="welcome-card">
          <div>
            <span>你好，运维工程师 👋</span>
            <h2>{{ activeHealthState.title }}</h2>
            <p><i aria-hidden="true" />持续守护，让设备高效运行</p>
          </div>
        </article>

        <section class="score-card">
          <div>
            <span>系统健康评分 <i aria-hidden="true">?</i></span>
            <strong>{{ activeHealthState.score }}<small>分</small></strong>
            <em :class="activeHealthState.tone">{{ activeHealthState.change }}</em>
            <small>较上周</small>
          </div>
          <button class="score-ring" type="button" aria-label="切换健康状态" :style="scoreRingStyle" @click="cycleHealthMode">
            <span>
              <img src="/case-assets/device-health-management-platform/health-heart.svg" alt="" />
            </span>
          </button>
        </section>

        <section class="stat-grid" aria-label="设备统计">
          <article v-for="stat in currentStats" :key="stat.label">
            <img class="stat-icon" :src="statIcons[stat.tone]" alt="" aria-hidden="true" />
            <div>
              <span>{{ stat.label }}</span>
              <strong>{{ stat.value }}</strong>
              <small>{{ stat.detail }}</small>
            </div>
            <b aria-hidden="true" />
          </article>
        </section>

        <section class="chart-grid">
          <article class="trend-card">
            <div class="card-title">
              <strong>近 7 日告警趋势</strong>
              <button type="button" @click="activeTab = 'tasks'">查看全部</button>
            </div>
            <div class="trend-line-chart" aria-label="近 7 日告警趋势">
              <svg viewBox="0 0 326 120" role="img" aria-hidden="true">
                <line x1="18" y1="18" x2="306" y2="18" />
                <line x1="18" y1="58" x2="306" y2="58" />
                <line x1="18" y1="98" x2="306" y2="98" />
                <polyline points="18,98 66,66 114,92 162,38 210,100 258,72 306,56" />
                <circle
                  v-for="point in trendPoints"
                  :key="point.day"
                  :cx="point.x"
                  :cy="point.y"
                  :class="{ active: selectedTrendDay === point.day }"
                  r="5"
                />
              </svg>
              <div class="trend-y-axis">
                <span>30</span>
                <span>20</span>
                <span>10</span>
              </div>
              <div class="trend-x-axis">
                <span v-for="point in trendPoints" :key="point.date">{{ point.date }}</span>
              </div>
              <button
                v-for="point in trendPoints"
                :key="point.day"
                type="button"
                :class="{ active: selectedTrendDay === point.day }"
                :style="{ '--point-x': `${point.x / 3.26}%`, '--point-y': `${point.y / 1.2}%` }"
                @click="selectedTrendDay = point.day"
              >
                {{ point.day }}
              </button>
            </div>
            <div class="trend-chart" aria-hidden="true">
              <button
                v-for="bar in activeHealthState.trend"
                :key="bar.day"
                type="button"
                :class="{ active: selectedTrendDay === bar.day }"
                :style="{ '--bar-height': `${bar.value}px` }"
                @click="selectedTrendDay = bar.day"
              >
                <i />
                <span>{{ bar.day }}</span>
              </button>
            </div>
          </article>

          <article class="status-card">
            <strong>设备状态分布</strong>
            <div class="status-body">
              <button class="status-ring" type="button" @click="selectedStatus = nextStatus">
                <span>1,204</span>
                <small>总设备</small>
              </button>
              <ul>
                <li
                  v-for="status in statusItems"
                  :key="status.key"
                  :class="{ active: selectedStatus === status.key }"
                  @click="selectedStatus = status.key"
                >
                  <i :class="status.key" />
                  <span>{{ status.label }}</span>
                  <em>{{ status.value }}</em>
                </li>
              </ul>
            </div>
          </article>
        </section>

        <section class="alert-card">
          <div class="card-title">
            <strong>最新告警</strong>
            <button type="button" @click="activeTab = 'tasks'">查看全部</button>
          </div>
          <article v-for="alert in filteredAlerts" :key="alert.id" :class="{ active: selectedAlertId === alert.id }">
            <button type="button" class="alert-dot" :class="alert.level" @click="selectedAlertId = alert.id">
              <img :src="alert.icon" alt="" aria-hidden="true" />
            </button>
            <div>
              <strong>{{ alert.title }}</strong>
              <p>{{ alert.desc }}</p>
            </div>
            <aside>
              <time>{{ alert.time }}</time>
              <span :class="alert.level">{{ alert.label }}</span>
            </aside>
          </article>
        </section>
      </section>

      <section v-else-if="activeTab === 'tasks'" class="page-stack">
        <div class="task-filter" aria-label="工单筛选">
          <button
            v-for="filter in taskFilters"
            :key="filter.key"
            type="button"
            :class="{ active: activeTaskFilter === filter.key }"
            @click="activeTaskFilter = filter.key"
          >
            {{ filter.label }}
          </button>
        </div>

        <article v-for="task in visibleTasks" :key="task.id" class="task-card" :class="{ done: task.done }">
          <div>
            <span :class="['priority-pill', task.priority]">{{ task.priorityLabel }}</span>
            <strong>{{ task.title }}</strong>
            <p>{{ task.desc }}</p>
          </div>
          <button type="button" @click="toggleTask(task.id)">
            {{ task.done ? '复核' : '处理' }}
          </button>
        </article>

        <article v-if="visibleTasks.length === 0" class="empty-card">
          <strong>没有匹配工单</strong>
          <span>调整搜索词或筛选条件后再查看。</span>
        </article>
      </section>

      <section v-else-if="activeTab === 'workbench'" class="page-stack">
        <section class="action-grid">
          <button
            v-for="action in workbenchActions"
            :key="action.key"
            type="button"
            :class="{ active: selectedAction === action.key }"
            @click="selectedAction = action.key"
          >
            <i :class="action.key" aria-hidden="true" />
            <span>{{ action.label }}</span>
          </button>
        </section>

        <article class="workbench-panel">
          <span>{{ selectedActionContent.label }}</span>
          <strong>{{ selectedActionContent.title }}</strong>
          <p>{{ selectedActionContent.desc }}</p>
        </article>

        <section class="site-list">
          <article v-for="site in sites" :key="site.name">
            <div>
              <strong>{{ site.name }}</strong>
              <span>{{ site.desc }}</span>
            </div>
            <em :class="site.tone">{{ site.state }}</em>
          </article>
        </section>
      </section>

      <section v-else class="profile-page">
        <article class="profile-hero-card">
          <span class="profile-card-glow" aria-hidden="true" />
          <div class="profile-user-row">
            <img
              class="profile-avatar"
              src="/case-assets/device-health-management-platform/profile-avatar-160.jpg"
              alt=""
              width="160"
              height="160"
              loading="lazy"
              decoding="async"
            />
            <div class="profile-user-copy">
              <div class="profile-name-row">
                <strong>曹兰</strong>
                <img src="/case-assets/device-health-management-platform/profile-verified.svg" alt="" aria-hidden="true" />
              </div>
              <span>设备运维工程师</span>
            </div>
          </div>

          <div class="profile-info-list">
            <button type="button" class="profile-info-row">
              <span>
                <img src="/case-assets/device-health-management-platform/profile-org.svg" alt="" aria-hidden="true" />
                所属组织
              </span>
              <strong>环球科技工业</strong>
              <img src="/case-assets/device-health-management-platform/profile-chevron.svg" alt="" aria-hidden="true" />
            </button>
            <button type="button" class="profile-info-row">
              <span>
                <img src="/case-assets/device-health-management-platform/profile-site.svg" alt="" aria-hidden="true" />
                当前站点
              </span>
              <strong>Alpha 设备 • 7 区</strong>
              <img src="/case-assets/device-health-management-platform/profile-sync.svg" alt="" aria-hidden="true" />
            </button>
          </div>
        </article>

        <section class="profile-settings-card" aria-label="个人中心设置">
          <div v-for="row in profileSettings" :key="row.key" class="profile-setting-row">
            <span class="profile-setting-icon">
              <i v-if="row.hasDot" aria-hidden="true" />
              <img :src="row.icon" alt="" aria-hidden="true" />
            </span>
            <span class="profile-setting-copy">
              <strong>{{ row.label }}</strong>
              <small v-if="row.detail">{{ row.detail }}</small>
            </span>
            <button
              v-if="row.key === 'compatible'"
              class="profile-toggle"
              :class="{ active: compatibilityMode }"
              type="button"
              aria-label="兼容模式"
              :aria-pressed="compatibilityMode"
              @click.stop="compatibilityMode = !compatibilityMode"
            >
              <i aria-hidden="true" />
            </button>
            <img v-else src="/case-assets/device-health-management-platform/profile-chevron.svg" alt="" aria-hidden="true" />
          </div>
        </section>

        <button class="profile-logout-button" type="button" @click="handleLogout">
          <img src="/case-assets/device-health-management-platform/profile-logout.svg" alt="" aria-hidden="true" />
          退出登录
        </button>
      </section>
    </main>

    <nav class="mobile-tabbar" aria-label="设备健康 APP 导航">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        :class="{ active: activeTab === tab.key }"
        @click="setActiveTab(tab.key)"
      >
        <img :src="activeTab === tab.key ? tab.activeIcon : tab.icon" alt="" aria-hidden="true" />
        <span>{{ tab.label }}</span>
      </button>
    </nav>

      <aside v-if="menuOpen" class="device-drawer">
        <div class="drawer-head">
          <strong>设备分组</strong>
          <button type="button" aria-label="关闭设备菜单" @click="menuOpen = false">×</button>
        </div>
        <button v-for="group in drawerGroups" :key="group.name" type="button" @click="selectDrawerGroup(group.name)">
          <span>{{ group.name }}</span>
          <em>{{ group.count }}</em>
        </button>
      </aside>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

type TabKey = 'home' | 'tasks' | 'workbench' | 'profile'
type HealthModeKey = 'stable' | 'observe' | 'risk'
type TaskFilterKey = 'all' | 'urgent' | 'pending' | 'done'
type StatusKey = 'running' | 'warning' | 'offline'
type ActionKey = 'scan' | 'inspect' | 'report' | 'asset'

const tabKeys: TabKey[] = ['home', 'tasks', 'workbench', 'profile']
const initialTab = getInitialTab()

const statIcons: Record<string, string> = {
  total: '/case-assets/device-health-management-platform/stat-total.svg',
  online: '/case-assets/device-health-management-platform/stat-online.svg',
  warning: '/case-assets/device-health-management-platform/stat-warning.svg',
  task: '/case-assets/device-health-management-platform/stat-task.svg',
}

const tabs: Array<{ key: TabKey; label: string; icon: string; activeIcon: string }> = [
  {
    key: 'home',
    label: '首页',
    icon: '/case-assets/device-health-management-platform/tab-home.svg',
    activeIcon: '/case-assets/device-health-management-platform/tab-home-active.svg',
  },
  {
    key: 'tasks',
    label: '待办',
    icon: '/case-assets/device-health-management-platform/tab-task.svg',
    activeIcon: '/case-assets/device-health-management-platform/tab-task.svg',
  },
  {
    key: 'workbench',
    label: '工作台',
    icon: '/case-assets/device-health-management-platform/tab-workbench.svg',
    activeIcon: '/case-assets/device-health-management-platform/tab-workbench.svg',
  },
  {
    key: 'profile',
    label: '我的',
    icon: '/case-assets/device-health-management-platform/tab-profile.svg',
    activeIcon: '/case-assets/device-health-management-platform/tab-profile-active.svg',
  },
]

const activeTab = ref<TabKey>(initialTab)
const isAuthenticated = ref(initialTab !== 'home')
const menuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const enterpriseName = ref('')
const username = ref('')
const password = ref('')
const passwordVisible = ref(false)
const rememberPassword = ref(true)
const activeHealthMode = ref<HealthModeKey>('stable')
const selectedTrendDay = ref('周四')
const selectedStatus = ref<StatusKey>('running')
const selectedAlertId = ref('a1')
const activeTaskFilter = ref<TaskFilterKey>('all')
const selectedAction = ref<ActionKey>('scan')
const compatibilityMode = ref(true)

const healthModes = [
  {
    key: 'stable',
    label: '稳定',
    title: '今日设备运行稳定',
    subtitle: '系统守护中 · 设备高效运行',
    score: 95,
    change: '↑ 2 分',
    tone: 'good',
    stats: [
      { label: '设备总数', value: '1,204', detail: '全部设备', tone: 'total' },
      { label: '在线设备', value: '1,150', detail: '在线率 95.5%', tone: 'online' },
      { label: '异常设备', value: '14 台', detail: '需尽快处理', tone: 'warning' },
      { label: '待处理工单', value: '32 单', detail: '较昨日 +6', tone: 'task' },
    ],
    trend: [
      { day: '周一', value: 32 },
      { day: '周二', value: 54 },
      { day: '周三', value: 39 },
      { day: '周四', value: 68 },
      { day: '周五', value: 34 },
      { day: '周六', value: 50 },
      { day: '周日', value: 58 },
    ],
  },
  {
    key: 'observe',
    label: '关注',
    title: '巡检任务需要跟进',
    subtitle: '华东线有 3 个节点待复核',
    score: 88,
    change: '↓ 3 分',
    tone: 'watch',
    stats: [
      { label: '设备总数', value: '1,204', detail: '全部设备', tone: 'total' },
      { label: '在线设备', value: '1,126', detail: '在线率 93.5%', tone: 'online' },
      { label: '异常设备', value: '28 台', detail: '需排班处理', tone: 'warning' },
      { label: '待处理工单', value: '46 单', detail: '较昨日 +12', tone: 'task' },
    ],
    trend: [
      { day: '周一', value: 40 },
      { day: '周二', value: 46 },
      { day: '周三', value: 56 },
      { day: '周四', value: 70 },
      { day: '周五', value: 62 },
      { day: '周六', value: 48 },
      { day: '周日', value: 52 },
    ],
  },
  {
    key: 'risk',
    label: '风险',
    title: '重点设备进入预警',
    subtitle: '请优先处理高温与振动异常',
    score: 76,
    change: '↓ 9 分',
    tone: 'risk',
    stats: [
      { label: '设备总数', value: '1,204', detail: '全部设备', tone: 'total' },
      { label: '在线设备', value: '1,096', detail: '在线率 91.0%', tone: 'online' },
      { label: '异常设备', value: '43 台', detail: '含 6 台高危', tone: 'warning' },
      { label: '待处理工单', value: '61 单', detail: '较昨日 +19', tone: 'task' },
    ],
    trend: [
      { day: '周一', value: 52 },
      { day: '周二', value: 66 },
      { day: '周三', value: 70 },
      { day: '周四', value: 82 },
      { day: '周五', value: 74 },
      { day: '周六', value: 62 },
      { day: '周日', value: 76 },
    ],
  },
] as const

const alerts = [
  {
    id: 'a1',
    title: '压缩机 C-102 高温预警',
    desc: '温度持续超过设定阈值，建议检查冷却系统',
    time: '10 分钟前',
    label: '严重',
    level: 'severe',
    icon: '/case-assets/device-health-management-platform/alert-severe.svg',
  },
  {
    id: 'a2',
    title: '输送带 B 电机振动异常',
    desc: '振动幅值超出正常范围，请及时排查',
    time: '1 小时前',
    label: '预警',
    level: 'mild',
    icon: '/case-assets/device-health-management-platform/alert-warning.svg',
  },
  {
    id: 'a3',
    title: '冷却塔 T-05 水位过低',
    desc: '水位低于下限，可能影响散热效率',
    time: '3 小时前',
    label: '预警',
    level: 'mild',
    icon: '/case-assets/device-health-management-platform/alert-warning.svg',
  },
]

const taskFilters: Array<{ key: TaskFilterKey; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'urgent', label: '紧急' },
  { key: 'pending', label: '待处理' },
  { key: 'done', label: '已处理' },
]

const tasks = reactive([
  {
    id: 't1',
    title: '复核压缩机 C-102',
    desc: '高温预警已持续 18 分钟',
    priority: 'urgent',
    priorityLabel: '紧急',
    done: false,
  },
  {
    id: 't2',
    title: '确认华南线巡检记录',
    desc: '3 台设备缺少振动采样',
    priority: 'normal',
    priorityLabel: '待处理',
    done: false,
  },
  {
    id: 't3',
    title: '同步冷却泵维护结果',
    desc: '维修人员已提交现场照片',
    priority: 'done',
    priorityLabel: '已处理',
    done: true,
  },
])

const workbenchActions = [
  { key: 'scan', label: '扫码建档' },
  { key: 'inspect', label: '巡检填报' },
  { key: 'report', label: '告警上报' },
  { key: 'asset', label: '资产模板' },
] as const

const actionContent: Record<ActionKey, { label: string; title: string; desc: string }> = {
  scan: {
    label: '快速入口',
    title: '扫描设备铭牌并补全档案',
    desc: '支持现场快速绑定设备、产线、负责人和状态标签。',
  },
  inspect: {
    label: '巡检任务',
    title: '按线路批量提交巡检结果',
    desc: '将温度、振动、照片和备注统一收束到任务链路。',
  },
  report: {
    label: '异常闭环',
    title: '告警升级与处理进度同步',
    desc: '严重告警会同步到管理端，并生成待处理工单。',
  },
  asset: {
    label: '规范沉淀',
    title: '复用资产详情信息模板',
    desc: '让 PC 与 APP 使用一致的字段、状态和组件语言。',
  },
}

const sites = [
  { name: '华东一厂', desc: '328 台设备 · 4 条产线', state: '稳定', tone: 'good' },
  { name: '华南冷链仓', desc: '186 台设备 · 2 条产线', state: '关注', tone: 'watch' },
  { name: '西南物流线', desc: '242 台设备 · 5 条产线', state: '预警', tone: 'risk' },
]

const profileSettings = [
  {
    key: 'message',
    label: '消息通知',
    icon: '/case-assets/device-health-management-platform/profile-message.svg',
    hasDot: true,
  },
  {
    key: 'server',
    label: '服务器设置',
    icon: '/case-assets/device-health-management-platform/profile-server.svg',
  },
  {
    key: 'compatible',
    label: '兼容模式',
    detail: '旧版设备支持',
    icon: '/case-assets/device-health-management-platform/profile-compatible.svg',
  },
  {
    key: 'about',
    label: '关于系统',
    detail: 'v2.4.1 (版本 4092)',
    icon: '/case-assets/device-health-management-platform/profile-about.svg',
  },
  {
    key: 'help',
    label: '帮助与反馈',
    icon: '/case-assets/device-health-management-platform/profile-help.svg',
  },
]

const drawerGroups = [
  { name: '全部设备', count: '1,204' },
  { name: '重点关注', count: '43' },
  { name: '离线设备', count: '18' },
]

const statusItems = [
  { key: 'running', label: '运行中', value: '1,150 (95.5%)' },
  { key: 'warning', label: '预警', value: '28 (2.3%)' },
  { key: 'offline', label: '离线', value: '18 (1.5%)' },
] as const

const trendPoints = [
  { day: '周三', date: '05/08', x: 18, y: 98 },
  { day: '周四', date: '05/09', x: 66, y: 66 },
  { day: '周五', date: '05/10', x: 114, y: 92 },
  { day: '周六', date: '05/11', x: 162, y: 38 },
  { day: '周日', date: '05/12', x: 210, y: 100 },
  { day: '周一', date: '05/13', x: 258, y: 72 },
  { day: '周二', date: '05/14', x: 306, y: 56 },
]

const currentPageTitle = computed(() => {
  if (activeTab.value === 'home') {
    return '设备健康管理'
  }

  if (activeTab.value === 'profile') {
    return '设备健康'
  }

  return tabs.find((tab) => tab.key === activeTab.value)?.label ?? '设备健康'
})
const headerActionIcon = computed(() =>
  activeTab.value === 'profile'
    ? '/case-assets/device-health-management-platform/profile-search.svg'
    : '/case-assets/device-health-management-platform/notification-bell.svg',
)
const headerActionLabel = computed(() => (activeTab.value === 'profile' ? '搜索' : '查看通知'))
const activeHealthState = computed(() => healthModes.find((mode) => mode.key === activeHealthMode.value) ?? healthModes[0])
const scoreRingStyle = computed(() => {
  const score = Math.max(0, Math.min(100, activeHealthState.value.score))
  const isElevated = activeHealthState.value.tone === 'watch' || activeHealthState.value.tone === 'risk'

  return {
    '--score-angle': `${score * 3.6}deg`,
    '--score-outline': isElevated ? '#faad14' : 'transparent',
  }
})
const currentStats = computed(() => activeHealthState.value.stats)
const selectedStatusItem = computed(() => statusItems.find((item) => item.key === selectedStatus.value) ?? statusItems[0])
const selectedActionContent = computed(() => actionContent[selectedAction.value])
const nextStatus = computed<StatusKey>(() => {
  const currentIndex = statusItems.findIndex((item) => item.key === selectedStatus.value)
  return statusItems[(currentIndex + 1) % statusItems.length].key
})

const filteredAlerts = computed(() => {
  const keyword = searchQuery.value.trim()

  if (!keyword) {
    return alerts
  }

  return alerts.filter((alert) => `${alert.title}${alert.desc}${alert.label}`.includes(keyword))
})

const visibleTasks = computed(() => {
  const keyword = searchQuery.value.trim()

  return tasks.filter((task) => {
    const matchesFilter =
      activeTaskFilter.value === 'all' ||
      (activeTaskFilter.value === 'urgent' && task.priority === 'urgent' && !task.done) ||
      (activeTaskFilter.value === 'pending' && !task.done) ||
      (activeTaskFilter.value === 'done' && task.done)
    const matchesSearch = !keyword || `${task.title}${task.desc}${task.priorityLabel}`.includes(keyword)

    return matchesFilter && matchesSearch
  })
})

function setActiveTab(tab: TabKey) {
  activeTab.value = tab
  menuOpen.value = false
}

function handleLogin() {
  isAuthenticated.value = true
  activeTab.value = 'home'
  menuOpen.value = false
  searchOpen.value = false
}

function handleLogout() {
  isAuthenticated.value = false
  activeTab.value = 'home'
  menuOpen.value = false
  searchOpen.value = false
}

function cycleHealthMode() {
  const index = healthModes.findIndex((mode) => mode.key === activeHealthMode.value)
  activeHealthMode.value = healthModes[(index + 1) % healthModes.length].key
}

function clearSearch() {
  searchQuery.value = ''
  searchOpen.value = false
}

function toggleTask(taskId: string) {
  const task = tasks.find((taskItem) => taskItem.id === taskId)

  if (task) {
    task.done = !task.done
  }
}

function selectDrawerGroup(groupName: string) {
  searchQuery.value = groupName === '全部设备' ? '' : groupName
  activeTab.value = groupName === '重点关注' ? 'tasks' : 'home'
  menuOpen.value = false
}

function getInitialTab(): TabKey {
  const tab = new URLSearchParams(window.location.search).get('mobileTab') as TabKey | null

  return tab && tabKeys.includes(tab) ? tab : 'home'
}
</script>

<style scoped>
.device-mobile-demo {
  position: relative;
  display: grid;
  grid-template-rows: 88px minmax(0, 1fr) 66px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f4f7fb;
  color: #1d2939;
  font-family:
    "PingFang SC", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

.device-mobile-demo.is-login {
  display: block;
  background: #f7fafd;
}

.login-screen {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #f7fafd;
}

.login-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 884px;
  opacity: 0.6;
  object-fit: cover;
  pointer-events: none;
}

.login-brand {
  position: absolute;
  top: 295px;
  right: 16px;
  left: 16px;
  display: grid;
  justify-items: center;
  align-content: start;
  height: 158px;
  margin: 0;
}

.login-logo {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  padding: 1px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 22px;
  background: linear-gradient(135deg, #60a5fa 0%, #0057ff 100%);
  box-shadow: 0 16px 32px rgba(0, 87, 255, 0.18);
  backdrop-filter: blur(6px);
}

.login-logo img {
  display: block;
  width: 31px;
  height: 36px;
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.06)) drop-shadow(0 4px 1.5px rgba(0, 0, 0, 0.07));
}

.login-brand h2 {
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 30px;
  white-space: nowrap;
}

.login-form {
  position: absolute;
  inset: 0;
}

.login-card {
  position: absolute;
  top: 453px;
  right: 16px;
  left: 16px;
  height: 250px;
  padding: 16px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.login-field {
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
}

.login-field + .login-field {
  margin-top: 16px;
}

.login-field input {
  width: 100%;
  min-width: 0;
  height: 100%;
  border: 0;
  background: transparent;
  color: #111827;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  outline: 0;
  padding: 0 13px;
}

.login-field input::placeholder {
  color: #9ca3af;
  opacity: 1;
}

.login-field-select input {
  padding-right: 41px;
}

.login-field-select > img {
  position: absolute;
  right: 12px;
  width: 20px;
  height: 20px;
  pointer-events: none;
}

.login-password-field input {
  padding-right: 41px;
}

.login-password-field > button {
  position: absolute;
  right: 0;
  display: grid;
  place-items: center;
  width: 44px;
  height: 48px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.login-password-field > button img {
  width: 20px;
  height: 20px;
}

.login-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 8px;
}

.login-options label {
  display: flex;
  align-items: center;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
}

.login-options input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.login-options label span {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border: 1px solid transparent;
  background: #2563eb;
}

.login-options label span img {
  width: 16px;
  height: 16px;
}

.login-options input:not(:checked) + span {
  border-color: #d1d5db;
  background: #fff;
}

.login-options input:not(:checked) + span img {
  opacity: 0;
}

.login-options > button {
  border: 0;
  background: transparent;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
}

.login-bottom-action {
  position: absolute;
  right: 0;
  bottom: -14px;
  left: 0;
  padding: 16px 16px 32px;
  background: rgba(247, 248, 250, 0.9);
  backdrop-filter: blur(2px);
}

.login-bottom-action button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 52px;
  border: 0;
  border-radius: 12px;
  background: #2864ff;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
}

.mobile-header {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 44px;
  align-items: center;
  gap: 10px;
  padding: 32px 18px 16px;
  background: #eaf6ff;
}

.mobile-header strong {
  color: #111827;
  font-size: 16px;
  font-weight: 850;
  text-align: center;
}

.icon-button {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #344054;
  cursor: pointer;
}

.menu-button {
  align-content: center;
  gap: 4px;
}

.menu-button span {
  width: 15px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
}

.search-button span {
  position: relative;
  width: 17px;
  height: 17px;
  border: 3px solid currentColor;
  border-radius: 999px;
}

.search-button span::after {
  content: '';
  position: absolute;
  right: -7px;
  bottom: -5px;
  width: 8px;
  height: 3px;
  border-radius: 999px;
  background: currentColor;
  transform: rotate(45deg);
}

.search-panel {
  position: absolute;
  z-index: 5;
  top: 76px;
  right: 16px;
  left: 16px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  padding: 8px;
  border: 1px solid rgba(52, 120, 246, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 14px 28px rgba(43, 112, 198, 0.14);
}

.search-panel input {
  min-width: 0;
  height: 34px;
  border: 0;
  border-radius: 8px;
  background: #f4f7fb;
  color: #1d2939;
  font-size: 13px;
  outline: 0;
  padding: 0 10px;
}

.search-panel button,
.card-title button,
.task-card > button {
  border: 0;
  border-radius: 999px;
  background: rgba(52, 120, 246, 0.1);
  color: #3478f6;
  font-size: 12px;
  font-weight: 850;
  cursor: pointer;
}

.search-panel button {
  padding: 0 10px;
}

.mobile-main {
  min-height: 0;
  overflow: auto;
  padding: 14px 16px 16px;
}

.page-stack {
  display: grid;
  align-content: start;
  gap: 12px;
}

.welcome-card,
.score-card,
.stat-grid article,
.chart-grid article,
.alert-card,
.task-card,
.empty-card,
.workbench-panel,
.site-list article,
.profile-card,
.profile-stats article,
.settings-list {
  border: 1px solid rgba(16, 24, 40, 0.04);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 10px 28px rgba(34, 54, 88, 0.06);
}

.welcome-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 86px;
  align-items: center;
  min-height: 106px;
  gap: 10px;
  overflow: hidden;
  padding: 17px 15px;
  background:
    linear-gradient(90deg, rgba(246, 207, 112, 0.96), rgba(153, 128, 72, 0.9) 52%, rgba(48, 61, 43, 0.96));
}

.welcome-card span,
.score-card span,
.stat-grid span,
.site-list span,
.settings-list span,
.profile-card span,
.profile-stats span {
  color: #697586;
  font-size: 12px;
  font-weight: 700;
}

.welcome-card h2 {
  margin: 8px 0 9px;
  color: #111827;
  font-size: 19px;
  line-height: 1.18;
}

.welcome-card p {
  margin: 0;
  color: rgba(40, 100, 255, 0.68);
  font-size: 12px;
  font-weight: 850;
}

.radar-mark {
  width: 80px;
  height: 80px;
  border: 1px solid rgba(128, 214, 135, 0.2);
  border-radius: 999px;
  background:
    radial-gradient(circle, rgba(129, 219, 141, 0.24) 0 18%, transparent 19%),
    repeating-radial-gradient(circle, rgba(129, 219, 141, 0.22) 0 1px, transparent 2px 18px);
}

.mode-switcher,
.task-filter {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.task-filter {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.mode-switcher button,
.task-filter button {
  min-height: 34px;
  border: 1px solid rgba(52, 120, 246, 0.12);
  border-radius: 999px;
  background: #fff;
  color: #52677f;
  font-size: 12px;
  font-weight: 850;
  cursor: pointer;
}

.mode-switcher button.active,
.task-filter button.active {
  border-color: transparent;
  background: #3478f6;
  color: #fff;
}

.score-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 112px;
  align-items: center;
  gap: 12px;
  min-height: 128px;
  padding: 17px;
}

.score-card strong {
  display: block;
  margin-top: 8px;
  color: #3478f6;
  font-size: 52px;
  font-weight: 900;
  line-height: 0.92;
}

.score-card strong small {
  margin-left: 3px;
  color: #344054;
  font-size: 16px;
  font-weight: 800;
}

.score-card em {
  display: inline-flex;
  margin-top: 9px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-style: normal;
  font-weight: 850;
}

.score-card em.good {
  background: rgba(0, 196, 134, 0.14);
  color: #12a866;
}

.score-card em.watch {
  background: rgba(255, 149, 0, 0.14);
  color: #d47a00;
}

.score-card em.risk {
  background: rgba(255, 69, 58, 0.12);
  color: #ff453a;
}

.score-card > div > small {
  margin-left: 8px;
  color: #98a2b3;
  font-size: 12px;
}

.score-ring,
.status-ring {
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
}

.score-ring {
  width: 108px;
  height: 108px;
  background: conic-gradient(#3478f6 0 82%, rgba(52, 120, 246, 0.12) 82% 100%);
}

.score-ring span {
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 999px;
  background: #fff;
  color: #3478f6;
  font-size: 18px;
  font-weight: 900;
}

.stat-grid,
.chart-grid,
.profile-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.stat-grid article {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  min-height: 78px;
  padding: 14px;
}

.stat-grid strong {
  display: block;
  margin: 3px 0 1px;
  color: #1d2939;
  font-size: 19px;
  line-height: 1.1;
}

.stat-grid small {
  color: #98a2b3;
  font-size: 10px;
  font-weight: 750;
}

.stat-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
}

.stat-icon::before {
  content: '';
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background: currentColor;
}

.stat-icon.total {
  background: rgba(52, 120, 246, 0.12);
  color: #3478f6;
}

.stat-icon.online {
  background: rgba(0, 196, 134, 0.12);
  color: #00c486;
}

.stat-icon.warning {
  background: rgba(255, 149, 0, 0.16);
  color: #ff9500;
}

.stat-icon.task {
  background: rgba(40, 100, 255, 0.12);
  color: #2864ff;
}

.chart-grid article {
  min-height: 148px;
  padding: 14px;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.card-title strong,
.status-card > strong,
.alert-card strong {
  color: #344054;
  font-size: 13px;
  font-weight: 900;
}

.card-title button {
  padding: 5px 8px;
}

.trend-chart {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  align-items: end;
  gap: 6px;
  height: 94px;
  margin-top: 14px;
  padding-bottom: 4px;
}

.trend-chart button {
  display: grid;
  justify-items: center;
  align-items: end;
  gap: 4px;
  min-width: 0;
  height: 100%;
  border: 0;
  background: transparent;
  color: #98a2b3;
  cursor: pointer;
  font-size: 9px;
  font-weight: 800;
}

.trend-chart i {
  width: 100%;
  height: var(--bar-height);
  border-radius: 999px 999px 4px 4px;
  background: linear-gradient(180deg, #4a8bff, #9fc3ff);
}

.trend-chart button.active i {
  background: linear-gradient(180deg, #00c486, #85e4c5);
}

.status-body {
  display: grid;
  grid-template-columns: 76px 1fr;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
}

.status-ring {
  width: 74px;
  height: 74px;
  background: conic-gradient(#3478f6 0 82%, #ff9500 82% 95%, #c3c3c3 95% 100%);
  color: #344054;
}

.status-ring span {
  display: block;
  width: 50px;
  padding-top: 10px;
  color: #344054;
  font-size: 12px;
  font-weight: 900;
  text-align: center;
}

.status-ring small {
  display: block;
  color: #98a2b3;
  font-size: 9px;
  font-weight: 750;
}

.status-card ul {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #697586;
  font-size: 10px;
  font-weight: 750;
  line-height: 1.25;
}

.status-card li {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.status-card li.active {
  color: #3478f6;
}

.status-card li i {
  width: 7px;
  height: 7px;
  border-radius: 999px;
}

.status-card li .running {
  background: #3478f6;
}

.status-card li .warning {
  background: #ff9500;
}

.status-card li .offline {
  background: #c3c3c3;
}

.alert-card {
  display: grid;
  gap: 10px;
  padding: 14px;
}

.alert-card article {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) auto;
  align-items: start;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(16, 24, 40, 0.06);
}

.alert-card article.active strong {
  color: #3478f6;
}

.alert-card article p {
  margin: 3px 0 0;
  color: #98a2b3;
  font-size: 10px;
  line-height: 1.35;
}

.alert-card article > span {
  align-self: start;
  padding: 3px 6px;
  border-radius: 5px;
  background: rgba(255, 69, 58, 0.1);
  color: #ff453a;
  font-size: 10px;
  font-weight: 850;
}

.alert-dot {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
}

.alert-dot::before {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: currentColor;
}

.alert-dot.severe {
  background: rgba(255, 69, 58, 0.12);
  color: #ff453a;
}

.alert-dot.mild {
  background: rgba(255, 149, 0, 0.12);
  color: #ff9500;
}

.alert-dot.offline {
  background: rgba(152, 162, 179, 0.18);
  color: #667085;
}

.task-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-height: 96px;
  padding: 14px;
}

.task-card.done {
  opacity: 0.68;
}

.task-card strong,
.workbench-panel strong,
.site-list strong,
.profile-card strong {
  display: block;
  color: #1d2939;
  font-size: 15px;
  font-weight: 900;
}

.task-card p,
.workbench-panel p {
  margin: 6px 0 0;
  color: #697586;
  font-size: 12px;
  line-height: 1.45;
}

.task-card > button {
  min-width: 56px;
  min-height: 34px;
}

.priority-pill {
  display: inline-flex;
  margin-bottom: 7px;
  padding: 3px 7px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 900;
}

.priority-pill.urgent {
  background: rgba(255, 69, 58, 0.1);
  color: #ff453a;
}

.priority-pill.normal {
  background: rgba(52, 120, 246, 0.1);
  color: #3478f6;
}

.priority-pill.done {
  background: rgba(0, 196, 134, 0.12);
  color: #12a866;
}

.empty-card {
  display: grid;
  gap: 6px;
  padding: 18px;
  color: #697586;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.action-grid button {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  min-height: 66px;
  border: 1px solid rgba(52, 120, 246, 0.12);
  border-radius: 8px;
  background: #fff;
  color: #344054;
  font-size: 13px;
  font-weight: 850;
  text-align: left;
  cursor: pointer;
}

.action-grid button.active {
  border-color: rgba(52, 120, 246, 0.3);
  box-shadow: 0 12px 26px rgba(52, 120, 246, 0.12);
}

.action-grid i {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin-left: 12px;
  border-radius: 8px;
  background: rgba(52, 120, 246, 0.1);
}

.action-grid i::before {
  content: '';
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: #3478f6;
}

.workbench-panel {
  display: grid;
  gap: 6px;
  min-height: 124px;
  padding: 16px;
}

.workbench-panel > span {
  justify-self: start;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(52, 120, 246, 0.1);
  color: #3478f6;
  font-size: 11px;
  font-weight: 900;
}

.site-list {
  display: grid;
  gap: 10px;
}

.site-list article {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 72px;
  padding: 14px;
}

.site-list em {
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-style: normal;
  font-weight: 900;
}

.site-list em.good {
  background: rgba(0, 196, 134, 0.12);
  color: #12a866;
}

.site-list em.watch {
  background: rgba(255, 149, 0, 0.14);
  color: #d47a00;
}

.site-list em.risk {
  background: rgba(255, 69, 58, 0.12);
  color: #ff453a;
}

.profile-card {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  min-height: 86px;
  padding: 15px;
}

.avatar {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 999px;
  background: #3478f6;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
}

.profile-stats {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.profile-stats article {
  display: grid;
  justify-items: center;
  gap: 4px;
  min-height: 78px;
  padding: 14px 8px;
}

.profile-stats strong {
  color: #3478f6;
  font-size: 22px;
  font-weight: 900;
}

.settings-list {
  display: grid;
  gap: 0;
  overflow: hidden;
}

.settings-list label {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 0 46px;
  align-items: center;
  min-height: 54px;
  padding: 0 14px;
  border-top: 1px solid rgba(16, 24, 40, 0.06);
  cursor: pointer;
}

.settings-list label:first-child {
  border-top: 0;
}

.settings-list input {
  width: 0;
  height: 0;
  opacity: 0;
}

.settings-list i {
  position: relative;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: #d0d5dd;
  transition: background 180ms ease;
}

.settings-list i::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #fff;
  transition: transform 180ms ease;
}

.settings-list input:checked + i {
  background: #3478f6;
}

.settings-list input:checked + i::after {
  transform: translateX(18px);
}

.mobile-tabbar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  border-top: 1px solid rgba(16, 24, 40, 0.06);
  background: rgba(255, 255, 255, 0.96);
}

.mobile-tabbar button {
  display: grid;
  justify-items: center;
  gap: 4px;
  border: 0;
  background: transparent;
  color: #98a2b3;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.mobile-tabbar button.active {
  color: #3478f6;
}

.mobile-tabbar i {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: currentColor;
  opacity: 0.82;
}

.device-drawer {
  position: absolute;
  z-index: 8;
  top: 0;
  bottom: 0;
  left: 0;
  display: grid;
  align-content: start;
  gap: 8px;
  width: 236px;
  padding: 28px 14px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 20px 0 46px rgba(15, 42, 95, 0.18);
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.drawer-head strong {
  color: #1d2939;
  font-size: 16px;
}

.drawer-head button,
.device-drawer > button {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.drawer-head button {
  width: 30px;
  height: 30px;
  color: #697586;
  font-size: 22px;
}

.device-drawer > button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 8px;
  background: #f4f7fb;
  color: #344054;
  font-size: 13px;
  font-weight: 850;
}

.device-drawer em {
  color: #3478f6;
  font-style: normal;
}

.device-mobile-demo {
  grid-template-rows: 96px minmax(0, 1fr) 64px;
  background:
    linear-gradient(180deg, #d4e5ff 0%, rgba(244, 249, 255, 0.96) 31%, rgba(255, 255, 255, 0.92) 100%);
  color: #191919;
}

.mobile-header {
  grid-template-columns: 40px minmax(0, 1fr) 40px;
  padding: 48px 16px 16px;
  background: transparent;
}

.mobile-header strong {
  color: #191919;
  font-size: 20px;
  font-weight: 650;
  line-height: 28px;
}

.icon-button {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #1f2937;
}

.menu-button {
  justify-self: start;
  gap: 3px;
}

.menu-button span {
  width: 17px;
  height: 2px;
  background: #1f2937;
}

.notify-button {
  position: relative;
  justify-self: end;
}

.notify-button img {
  display: block;
  width: 17.5px;
  height: 20px;
}

.mobile-main {
  padding: 16px;
}

.page-stack {
  gap: 16px;
}

.welcome-card,
.score-card,
.stat-grid article,
.chart-grid article,
.alert-card {
  border: 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.welcome-card {
  display: flex;
  align-items: flex-start;
  min-height: 136px;
  padding: 24px;
  background-image: url('/case-assets/device-health-management-platform/welcome-banner-mobile.jpg');
  background-position: center;
  background-size: cover;
}

.welcome-card > div {
  width: 207px;
}

.welcome-card span,
.score-card span,
.stat-grid span {
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.welcome-card h2 {
  margin: 4px 0 8px;
  color: #061549;
  font-size: 24px;
  font-weight: 650;
  letter-spacing: -0.6px;
  line-height: 32px;
}

.welcome-card p {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 5px 11px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  color: #6b7280;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.25px;
  line-height: 12px;
  backdrop-filter: blur(6px);
}

.welcome-card p i {
  width: 10px;
  height: 10px;
  border: 2px solid #0057ff;
  border-radius: 999px 999px 7px 7px;
}

.score-card {
  grid-template-columns: minmax(0, 1fr) 128px;
  min-height: 162px;
  padding: 16px;
}

.score-card span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
}

.score-card span i {
  display: grid;
  place-items: center;
  width: 12px;
  height: 12px;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 8px;
  font-style: normal;
  line-height: 1;
}

.score-card strong {
  margin-top: 8px;
  color: #0057ff;
  font-size: 60px;
  font-weight: 900;
  letter-spacing: -3px;
  line-height: 60px;
}

.score-card strong small {
  margin-left: 4px;
  color: #191919;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0;
}

.score-card em {
  margin-top: 8px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.score-card em.good {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}

.score-card > div > small {
  margin-left: 8px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
}

.score-ring {
  width: 128px;
  height: 128px;
  background: conic-gradient(from -90deg, #0057ff 0deg var(--score-angle), #dbe8ff var(--score-angle) 360deg);
  box-shadow: inset 0 0 0 2px var(--score-outline);
}

.score-ring span {
  position: relative;
  display: grid;
  place-items: center;
  width: 82px;
  height: 82px;
  background: #fff;
}

.score-ring span img {
  display: block;
  width: 24px;
  height: 21px;
}

.stat-grid {
  gap: 16px;
}

.stat-grid article {
  grid-template-columns: 52px minmax(0, 1fr) 10px;
  gap: 0;
  min-height: 91px;
  padding: 16px;
}

.stat-grid strong {
  margin: 0;
  color: #191919;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.stat-grid small {
  color: #6b7280;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
}

.stat-grid article b {
  width: 9px;
  height: 9px;
  border-top: 2px solid #c9d1dd;
  border-right: 2px solid #c9d1dd;
  transform: rotate(45deg);
}

.stat-icon {
  width: 40px;
  height: 40px;
}

.stat-grid img.stat-icon {
  display: block;
  object-fit: contain;
  border-radius: 999px;
  background: transparent;
}

.stat-icon::before {
  width: 16px;
  height: 14px;
  border-radius: 3px;
}

.stat-icon.total {
  background: rgba(0, 87, 255, 0.1);
  color: #0057ff;
}

.stat-icon.online {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}

.stat-icon.warning {
  background: rgba(250, 173, 20, 0.12);
  color: #faad14;
}

.stat-icon.task {
  background: rgba(0, 87, 255, 0.1);
  color: #0057ff;
}

.chart-grid {
  grid-template-columns: 1fr;
  gap: 16px;
}

.chart-grid article {
  padding: 16px;
}

.card-title strong,
.status-card > strong,
.alert-card .card-title strong {
  color: #191919;
  font-size: 18px;
  font-weight: 650;
  line-height: 28px;
}

.card-title button {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 0;
  background: transparent;
  color: #0057ff;
  font-size: 12px;
  font-weight: 600;
}

.card-title button::after {
  content: '';
  width: 6px;
  height: 6px;
  border-top: 1.5px solid currentColor;
  border-right: 1.5px solid currentColor;
  transform: rotate(45deg);
}

.trend-card .trend-chart {
  display: none;
}

.trend-line-chart {
  position: relative;
  height: 116px;
  margin-top: 12px;
  padding: 4px 4px 22px 28px;
}

.trend-line-chart svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.trend-line-chart line {
  stroke: #e5e7eb;
  stroke-width: 1;
}

.trend-line-chart polyline {
  fill: none;
  stroke: #0057ff;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
}

.trend-line-chart circle {
  fill: #fff;
  stroke: #0057ff;
  stroke-width: 3;
}

.trend-line-chart circle.active {
  fill: #0057ff;
}

.trend-y-axis,
.trend-x-axis {
  position: absolute;
  color: #9ca3af;
  font-size: 9px;
  font-weight: 500;
  line-height: 1;
}

.trend-y-axis {
  top: 14px;
  bottom: 26px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.trend-x-axis {
  right: 2px;
  bottom: 0;
  left: 28px;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  text-align: center;
}

.trend-line-chart > button {
  position: absolute;
  top: calc(var(--point-y) + 3px);
  left: calc(28px + ((100% - 32px) * var(--point-x) / 100));
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  background: transparent;
  color: transparent;
  cursor: pointer;
  transform: translate(-50%, -50%);
}

.status-card {
  min-height: 186px;
}

.status-body {
  grid-template-columns: 132px minmax(0, 1fr);
  gap: 18px;
  margin-top: 14px;
}

.status-ring {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 122px;
  height: 122px;
  overflow: hidden;
  background: conic-gradient(from -90deg, #0057ff 0deg 344deg, #faad14 344deg 353deg, #d1d5db 353deg 360deg);
}

.status-ring::before {
  content: '';
  position: absolute;
  inset: 16px;
  border-radius: 999px;
  background: #fff;
}

.status-ring span {
  position: relative;
  z-index: 1;
  width: auto;
  padding: 0;
  border-radius: 0;
  background: transparent;
  color: #191919;
  font-size: 20px;
  font-weight: 650;
  letter-spacing: -0.4px;
  line-height: 24px;
}

.status-ring small {
  position: relative;
  z-index: 1;
  margin-top: 1px;
  color: #6b7280;
  font-size: 10px;
  font-weight: 650;
  line-height: 15px;
}

.status-card ul {
  gap: 12px;
  color: #4b5563;
  font-size: 12px;
  font-weight: 500;
}

.status-card li {
  display: grid;
  grid-template-columns: 8px minmax(0, 1fr) auto;
  gap: 8px;
}

.status-card li em {
  color: #6b7280;
  font-style: normal;
}

.status-card li.active,
.status-card li.active em {
  color: #191919;
}

.status-card li .running {
  background: #0057ff;
}

.status-card li .warning {
  background: #faad14;
}

.status-card li .offline {
  background: #d1d5db;
}

.alert-card {
  gap: 0;
  padding: 16px;
}

.alert-card article {
  grid-template-columns: 36px minmax(0, 1fr) auto;
  gap: 8px;
  min-height: 57px;
  padding: 12px 0;
  border-top: 0;
  border-bottom: 1px solid #eef2f7;
}

.alert-card article:last-child {
  border-bottom: 0;
}

.alert-card article strong {
  color: #191919;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.alert-card article.active strong {
  color: #191919;
}

.alert-card article p {
  margin: 4px 0 0;
  color: #4b5563;
  font-size: 12px;
  line-height: 18px;
}

.alert-card aside {
  display: grid;
  justify-items: end;
  gap: 7px;
}

.alert-card time {
  color: #6b7280;
  font-size: 12px;
  line-height: 18px;
}

.alert-card aside span {
  padding: 2px 8px;
  border: 1px solid currentColor;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
}

.alert-card aside span.severe {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}

.alert-card aside span.mild {
  background: rgba(250, 173, 20, 0.1);
  color: #faad14;
}

.alert-dot {
  width: 32px;
  height: 32px;
}

.alert-dot::before {
  content: none;
}

.alert-dot img {
  display: block;
  width: 14px;
  height: 13px;
}

.alert-dot.severe {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}

.alert-dot.mild {
  background: rgba(250, 173, 20, 0.12);
  color: #faad14;
}

.mobile-tabbar {
  height: 64px;
  border-top-color: #f3f4f6;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(6px);
}

.mobile-tabbar button {
  gap: 3px;
  color: #6b7280;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
}

.mobile-tabbar button.active {
  color: #0057ff;
}

.mobile-tabbar img {
  display: block;
  object-fit: contain;
}

.mobile-tabbar button:nth-child(1) img {
  width: 16px;
  height: 22px;
}

.mobile-tabbar button:nth-child(2) img {
  width: 18px;
  height: 24px;
}

.mobile-tabbar button:nth-child(3) img {
  width: 18.5px;
  height: 22px;
}

.mobile-tabbar button:nth-child(4) img {
  width: 16px;
  height: 20px;
}

.mobile-tabbar i {
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 0;
  background: transparent;
  color: currentColor;
  opacity: 1;
}

.mobile-tabbar i::before,
.mobile-tabbar i::after {
  content: '';
  position: absolute;
  box-sizing: border-box;
}

.mobile-tabbar i.home::before {
  inset: 5px 4px 3px;
  border: 2px solid currentColor;
  border-top: 0;
  border-radius: 2px;
}

.mobile-tabbar i.home::after {
  top: 3px;
  left: 5px;
  width: 12px;
  height: 12px;
  border-top: 2px solid currentColor;
  border-left: 2px solid currentColor;
  transform: rotate(45deg);
}

.mobile-tabbar i.tasks::before {
  inset: 3px 5px 2px;
  border: 2px solid currentColor;
  border-radius: 3px;
}

.mobile-tabbar i.tasks::after {
  top: 7px;
  left: 9px;
  width: 7px;
  height: 4px;
  border-bottom: 2px solid currentColor;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
}

.mobile-tabbar i.workbench::before {
  top: 4px;
  left: 9px;
  width: 4px;
  height: 14px;
  border-radius: 999px;
  background: currentColor;
  transform: rotate(42deg);
}

.mobile-tabbar i.workbench::after {
  top: 4px;
  left: 9px;
  width: 4px;
  height: 14px;
  border-radius: 999px;
  background: currentColor;
  transform: rotate(-42deg);
}

.mobile-tabbar i.profile::before {
  top: 3px;
  left: 8px;
  width: 7px;
  height: 7px;
  border: 2px solid currentColor;
  border-radius: 999px;
}

.mobile-tabbar i.profile::after {
  right: 4px;
  bottom: 3px;
  left: 4px;
  height: 8px;
  border: 2px solid currentColor;
  border-radius: 999px 999px 3px 3px;
}

.device-mobile-demo[data-page='profile'] {
  grid-template-rows: 88px minmax(0, 1fr) 66px;
  background: #f4f7fd;
}

.device-mobile-demo[data-page='profile'] .mobile-header {
  padding: 32px 24px 16px;
  background: linear-gradient(180deg, #e1eaff 0%, #f4f7fd 100%);
}

.device-mobile-demo[data-page='profile'] .mobile-header strong {
  color: #1a1f36;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
}

.device-mobile-demo[data-page='profile'] .notify-button img {
  width: 20px;
  height: 20px;
}

.device-mobile-demo[data-page='profile'] .mobile-main {
  padding: 16px 20px 16px;
  background: #f4f7fd;
}

.profile-page {
  display: grid;
  align-content: start;
  gap: 16px;
}

.profile-hero-card {
  position: relative;
  display: grid;
  gap: 18px;
  overflow: hidden;
  min-height: 198px;
  padding: 20px;
  border: 0;
  border-radius: 24px;
  background: linear-gradient(135deg, #f8faff 0%, #eef3ff 100%);
  box-shadow: 0 8px 24px rgba(34, 54, 88, 0.06);
}

.profile-card-glow {
  position: absolute;
  top: -32px;
  right: -18px;
  width: 148px;
  height: 92px;
  border-radius: 999px;
  background: rgba(34, 96, 255, 0.12);
  filter: blur(10px);
}

.profile-user-row {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border: 3px solid rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  box-shadow: 0 10px 20px rgba(34, 96, 255, 0.16);
  object-fit: cover;
}

.profile-user-copy {
  display: grid;
  justify-items: start;
  gap: 8px;
  min-width: 0;
}

.profile-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.profile-name-row strong {
  color: #1a1f36;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
}

.profile-name-row img {
  width: 16px;
  height: 16px;
}

.profile-user-copy > span {
  min-height: 24px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0, 87, 255, 0.2);
  color: #2260ff;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

.profile-info-list {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 10px;
}

.profile-info-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto 16px;
  align-items: center;
  gap: 10px;
  min-height: 34px;
  border: 0;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  font: inherit;
  padding: 0;
}

.profile-info-row > span {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: #64748b;
  font-size: 14px;
  font-weight: 500;
}

.profile-info-row > span img {
  width: 20px;
  height: 20px;
}

.profile-info-row strong {
  color: #1a1f36;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
}

.profile-info-row > img {
  width: 16px;
  height: 16px;
}

.profile-settings-card {
  display: grid;
  overflow: hidden;
  padding: 8px 8px 32px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(34, 54, 88, 0.06);
}

.profile-setting-row {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  min-height: 64px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.7);
}

.profile-setting-row:last-child {
  border-bottom: 0;
}

.profile-setting-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: #eef3ff;
}

.profile-setting-icon img {
  width: 20px;
  height: 20px;
}

.profile-setting-icon i {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border: 2px solid #fff;
  border-radius: 999px;
  background: #ff4d4f;
}

.profile-setting-copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.profile-setting-copy strong {
  color: #1a1f36;
  font-size: 15px;
  font-weight: 600;
  line-height: 21px;
}

.profile-setting-copy small {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
  line-height: 17px;
}

.profile-setting-row > img {
  width: 16px;
  height: 16px;
}

.profile-toggle {
  position: relative;
  width: 48px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: #cbd5e1;
  cursor: pointer;
  padding: 0;
}

.profile-toggle i {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.18);
  transition: transform 180ms ease;
}

.profile-toggle.active {
  background: #2260ff;
}

.profile-toggle.active i {
  transform: translateX(20px);
}

.profile-logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 56px;
  border: 1.5px solid #ff4d4f;
  border-radius: 16px;
  background: #fff;
  color: #ff4d4f;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  cursor: pointer;
}

.profile-logout-button img {
  width: 18px;
  height: 18px;
}

.device-mobile-demo[data-page='profile'] .mobile-tabbar {
  height: 66px;
  overflow: hidden;
  border-top: 0;
  border-radius: 24px 24px 0 0;
  background: #fff;
  box-shadow: 0 -8px 24px rgba(34, 54, 88, 0.04);
  padding: 8px 24px 0;
}

.device-mobile-demo[data-page='profile'] .mobile-tabbar button {
  color: #64748b;
}

.device-mobile-demo[data-page='profile'] .mobile-tabbar button.active {
  color: #2260ff;
}
</style>
