<template>
  <div class="pc-preview-viewport" :style="{ '--pc-scale': previewScale }">
    <section
      v-if="!isLoggedIn"
      class="pc-login-page"
      :style="{ '--pc-scale': previewScale }"
      aria-label="设备健康管理系统登录页"
    >
      <aside class="pc-login-brand-panel" aria-label="设备健康管理系统">
        <div class="pc-login-brand">
          <img :src="appLogoMark" alt="" />
          <div>
            <strong>设备健康管理系统</strong>
          </div>
        </div>

        <div class="pc-login-ambient" aria-hidden="true">
          <span class="pc-flow-line is-one"></span>
          <span class="pc-flow-line is-two"></span>
          <span class="pc-flow-line is-three"></span>
          <i v-for="point in 9" :key="point"></i>
        </div>

        <div class="pc-login-brand-copy">
          <span>可信运维中台</span>
          <h1>统一接入设备台账、运行数据与运维任务，支撑现场与管理端高效协同。</h1>
        </div>

      </aside>

      <main class="pc-login-main">
        <form class="pc-login-card" @submit.prevent="handleLogin">
          <header class="pc-login-card-head">
            <span>企业账号登录</span>
            <h2>欢迎回来</h2>
            <p>登录设备健康管理系统，继续处理设备、告警与运维任务。</p>
          </header>

          <label class="pc-login-field">
            <span>账号</span>
            <div>
              <img :src="`${pcAssetBase}/icon-user.svg`" alt="" />
              <input v-model="loginAccount" autocomplete="username" placeholder="请输入账号" />
            </div>
          </label>

          <label class="pc-login-field">
            <span>密码</span>
            <div>
              <input
                v-model="loginPassword"
                :type="passwordVisible ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="请输入密码"
              />
              <button
                type="button"
                aria-label="切换密码可见性"
                @mousedown.prevent="togglePasswordVisible"
                @keydown.enter.prevent="togglePasswordVisible"
              >
                <img src="/case-assets/device-health-management-platform/login-eye.svg" alt="" />
              </button>
            </div>
          </label>

          <div class="pc-login-options">
            <label>
              <input v-model="rememberAccount" type="checkbox" />
              <span>记住密码</span>
            </label>
            <button type="button">忘记密码？</button>
          </div>

          <button class="pc-login-submit" type="submit">登录</button>

          <p class="pc-login-policy">
            登录即表示同意
            <a href="#" @click.prevent>隐私政策</a>
            与安全合规条款
          </p>
        </form>
      </main>
    </section>

    <div
      v-else
      class="pc-preview-page"
      :class="{ 'is-dark': isDarkMode }"
      :style="{ '--pc-scale': previewScale }"
    >
      <aside class="pc-sidebar" aria-label="后台菜单">
        <section class="pc-brand" aria-label="设备健康管理">
          <img :src="appLogoMark" alt="" />
          <div>
            <strong>设备健康管理</strong>
            <span>智能监测运维平台</span>
          </div>
        </section>

        <nav class="pc-nav" aria-label="后台导航">
          <button class="pc-nav-item is-muted" type="button">
            <img :src="modeAsset('icon-home.svg', 'dark-icon-home.svg')" alt="" />
            <span>首页</span>
          </button>

          <section class="pc-nav-group">
            <button class="pc-nav-item is-expanded" type="button">
              <img :src="modeAsset('icon-dashboard.svg', 'dark-icon-dashboard.svg')" alt="" />
              <span>数据驾驶舱</span>
              <img class="pc-nav-chevron" :src="modeAsset('icon-chevron-down.svg', 'dark-icon-chevron-down.svg')" alt="" />
            </button>

            <div class="pc-nav-children">
              <button
                v-for="item in dashboardChildren"
                :key="item"
                class="pc-nav-child"
                :class="{ 'is-active': activePcPage === 'dashboard' && item === activeDashboard }"
                type="button"
                @click="showDashboard(item)"
              >
                <img
                  :src="dashboardChildIcon(item)"
                  alt=""
                />
                <span>{{ item }}</span>
              </button>
            </div>
          </section>

          <button
            v-for="item in navItems"
            :key="item.label"
            class="pc-nav-item"
            :class="{ 'is-muted': item.muted }"
            type="button"
          >
            <img :src="modeAsset(item.icon, item.darkIcon)" alt="" />
            <span>{{ item.label }}</span>
          </button>

          <section class="pc-nav-group is-lube">
            <button class="pc-nav-item" :class="{ 'is-expanded': isLubricationPage }" type="button">
              <img :src="lubricationParentIcon" alt="" />
              <span>润滑管理</span>
              <img
                class="pc-nav-chevron"
                :src="modeAsset(isLubricationPage ? 'icon-chevron-down.svg' : 'icon-chevron-right.svg', isLubricationPage ? 'dark-icon-chevron-down.svg' : 'dark-icon-chevron-right.svg')"
                alt=""
              />
            </button>

            <div class="pc-nav-children is-compact">
              <button
                v-for="item in lubricationChildren"
                :key="item"
                class="pc-nav-child"
                :class="{ 'is-active': item === activeLubricationChild }"
                type="button"
                @click="showLubricationChild(item)"
              >
                <img :src="lubricationChildIcon(item)" alt="" />
                <span>{{ item }}</span>
              </button>
            </div>
          </section>
        </nav>
      </aside>

      <section class="pc-shell">
        <header class="pc-topbar">
          <nav class="pc-crumbs" aria-label="面包屑">
            <span>首页</span>
            <i>/</i>
            <span>{{ currentCrumbs.section }}</span>
            <i>/</i>
            <strong>{{ currentCrumbs.page }}</strong>
          </nav>

          <div class="pc-header-actions">
            <button
              class="pc-icon-button"
              type="button"
              :aria-label="isDarkMode ? '切换到浅色模式' : '切换到深色模式'"
              :aria-pressed="isDarkMode"
              @click="toggleTheme"
            >
              <img :src="`${pcAssetBase}/${isDarkMode ? 'icon-theme-sun.svg' : 'icon-theme-moon.svg'}`" alt="" />
            </button>
            <button class="pc-header-icon" type="button" aria-label="通知">
              <img :src="`${pcAssetBase}/icon-bell.svg`" alt="" />
            </button>
            <details class="pc-user-menu">
              <summary class="pc-user" aria-haspopup="menu" tabindex="0">
                <span><img :src="`${pcAssetBase}/icon-user.svg`" alt="" /></span>
                运维工程师
                <img :src="`${pcAssetBase}/icon-user-chevron-down.svg`" alt="" />
              </summary>

              <div class="pc-user-dropdown" role="menu">
                <div>
                  <strong>运维工程师</strong>
                  <span>综合管理部 · 在线</span>
                </div>
                <button type="button" role="menuitem">账号设置</button>
                <button type="button" role="menuitem">安全中心</button>
                <button class="is-danger" type="button" role="menuitem" @click="handleLogout">退出登录</button>
              </div>
            </details>
          </div>
        </header>

        <main class="pc-main">
          <div v-if="activePcPage === 'dashboard'" class="pc-content">
            <section class="pc-page-head">
              <h1>全生命周期看板</h1>
              <button class="pc-date-filter" type="button">
                <img :src="`${pcAssetBase}/icon-calendar.svg`" alt="" />
                <span>近 7 天</span>
                <span>2024-05-01 ~ 2024-05-07</span>
                <img :src="`${pcAssetBase}/icon-date-chevron.svg`" alt="" />
              </button>
            </section>

            <section class="pc-card pc-device-card" aria-label="设备详情">
              <img class="pc-device-image" :src="`${pcAssetBase}/device-pump.png`" alt="箕冷机液压站1号油泵" />
              <div class="pc-device-copy">
                <div class="pc-device-title-row">
                  <h2>箕冷机液压站1号油泵</h2>
                  <span class="pc-running-pill"><i></i>运行中</span>
                </div>

                <dl class="pc-device-grid">
                  <div v-for="item in deviceFacts" :key="item.label">
                    <dt>{{ item.label }}</dt>
                    <dd>{{ item.value }}</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section class="pc-stat-grid" aria-label="核心指标">
              <article
                v-for="stat in statCards"
                :key="stat.label"
                class="pc-card pc-stat-card"
                :style="{ '--stat-icon-bg': stat.iconBg, '--stat-dot': stat.dot, '--stat-dark-icon-bg': stat.darkIconBg }"
              >
                <div class="pc-stat-head">
                  <span>{{ stat.label }}</span>
                  <span class="pc-stat-icon">
                    <img :src="modeAsset(stat.icon, stat.darkIcon)" alt="" />
                  </span>
                </div>
                <strong>{{ stat.value }}</strong>
                <small>{{ stat.caption }}</small>
              </article>
            </section>

            <section class="pc-dashboard-grid">
              <article class="pc-card pc-chart-card">
                <header class="pc-panel-head">
                  <h2>7日报警趋势</h2>
                  <div class="pc-chart-legend">
                    <span><i class="is-blue"></i>点检异常</span>
                    <span><i class="is-green"></i>在线异常</span>
                  </div>
                </header>

                <div class="pc-chart-surface" aria-hidden="true">
                  <svg viewBox="0 0 486 248" role="img">
                    <defs>
                      <linearGradient id="inspectArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stop-color="#1671ee" stop-opacity="0.2" />
                        <stop offset="1" stop-color="#1671ee" stop-opacity="0" />
                      </linearGradient>
                      <linearGradient id="onlineArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stop-color="#00d492" stop-opacity="0.2" />
                        <stop offset="1" stop-color="#00d492" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                    <g class="pc-grid-lines">
                      <line v-for="line in chartGridY" :key="line" x1="42" x2="474" :y1="line" :y2="line" />
                    </g>
                    <g class="pc-y-labels">
                      <text x="0" y="188">0</text>
                      <text x="0" y="137">15</text>
                      <text x="0" y="86">30</text>
                      <text x="0" y="18">50</text>
                    </g>
                    <path
                      class="pc-chart-area is-online"
                      d="M42 170 C76 154, 102 148, 132 156 C170 167, 192 116, 224 112 C258 108, 278 135, 310 127 C350 116, 374 76, 414 66 C438 60, 456 72, 474 88 L474 188 L42 188 Z"
                    />
                    <path
                      class="pc-chart-area is-inspect"
                      d="M42 150 C74 138, 99 108, 132 116 C164 124, 191 72, 224 78 C257 84, 280 104, 310 92 C346 78, 373 122, 414 112 C440 106, 458 132, 474 126 L474 188 L42 188 Z"
                    />
                    <path
                      class="pc-chart-line is-online"
                      d="M42 170 C76 154, 102 148, 132 156 C170 167, 192 116, 224 112 C258 108, 278 135, 310 127 C350 116, 374 76, 414 66 C438 60, 456 72, 474 88"
                    />
                    <path
                      class="pc-chart-line is-inspect"
                      d="M42 150 C74 138, 99 108, 132 116 C164 124, 191 72, 224 78 C257 84, 280 104, 310 92 C346 78, 373 122, 414 112 C440 106, 458 132, 474 126"
                    />
                    <g class="pc-x-labels">
                      <text v-for="label in chartLabels" :key="label.text" :x="label.x" y="238">{{ label.text }}</text>
                    </g>
                  </svg>
                </div>
              </article>

              <article class="pc-card pc-table-card">
                <header class="pc-panel-head">
                  <h2>缺陷工单</h2>
                  <button type="button">更多</button>
                </header>

                <table>
                  <thead>
                    <tr>
                      <th>缺陷编号</th>
                      <th>缺陷内容</th>
                      <th>处理状态</th>
                      <th>创建时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in defectRows" :key="row.code">
                      <td>{{ row.code }}</td>
                      <td>{{ row.content }}</td>
                      <td>
                        <span class="pc-status" :class="`is-${row.tone}`">{{ row.status }}</span>
                      </td>
                      <td>{{ row.date }}</td>
                    </tr>
                  </tbody>
                </table>
              </article>
            </section>
          </div>

          <div v-else-if="activePcPage === 'lubrication-items'" class="pc-content pc-lube-content">
            <section class="pc-page-head pc-lube-page-head">
              <div>
                <h1>润滑项管理</h1>
                <p>管理设备关键部位的润滑标准与执行周期</p>
              </div>

              <button class="pc-primary-action" type="button">
                <img :src="`${pcAssetBase}/icon-plus-white.svg`" alt="" />
                <span>新增润滑项</span>
              </button>
            </section>

            <section class="pc-card pc-lube-table-card" aria-label="润滑项列表">
              <header class="pc-lube-toolbar">
                <div class="pc-lube-search">
                  <img :src="`${pcAssetBase}/icon-search-lube.svg`" alt="" />
                  <input v-model="lubricationSearch" placeholder="搜索润滑项名称或编号" />
                </div>

                <button class="pc-lube-filter" type="button">
                  <img :src="`${pcAssetBase}/icon-filter-lube.svg`" alt="" />
                  <span>筛选</span>
                </button>

                <span class="pc-lube-count">统计：共 {{ filteredLubricationRows.length }} 个润滑项</span>
              </header>

              <div class="pc-lube-table-wrap">
                <table class="pc-lube-table">
                  <colgroup>
                    <col style="width: 48px" />
                    <col style="width: 102px" />
                    <col style="width: 189px" />
                    <col style="width: 173px" />
                    <col style="width: 95px" />
                    <col style="width: 151px" />
                    <col style="width: 118px" />
                    <col style="width: 99px" />
                    <col style="width: 52px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>润滑项编号</th>
                      <th>润滑项名称</th>
                      <th>安装位置</th>
                      <th>润滑周期</th>
                      <th>润滑油品</th>
                      <th>下步计划</th>
                      <th>当前状态</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in filteredLubricationRows" :key="row.code">
                      <td>{{ row.index }}</td>
                      <td>{{ row.code }}</td>
                      <td>{{ row.name }}</td>
                      <td>{{ row.position }}</td>
                      <td><span class="pc-lube-cycle">{{ row.cycle }}</span></td>
                      <td>{{ row.oil }}</td>
                      <td>{{ row.nextPlan }}</td>
                      <td>
                        <span class="pc-lube-status" :class="`is-${row.tone}`">{{ row.status }}</span>
                      </td>
                      <td>
                        <button class="pc-lube-more" type="button" aria-label="更多操作">
                          <img :src="`${pcAssetBase}/icon-more-lube.svg`" alt="" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section class="pc-lube-metrics" aria-label="润滑项统计">
              <article
                v-for="metric in lubricationMetrics"
                :key="metric.label"
                class="pc-card pc-lube-metric-card"
                :style="{ '--metric-bg': metric.bg, '--metric-dark-bg': metric.darkBg }"
              >
                <span class="pc-lube-metric-icon">
                  <img :src="`${pcAssetBase}/${metric.icon}`" alt="" />
                </span>
                <div>
                  <span>{{ metric.label }}</span>
                  <strong>{{ metric.value }}</strong>
                </div>
              </article>
            </section>
          </div>

          <div v-else-if="activePcPage === 'lubrication-plan'" class="pc-content pc-lube-plan-content">
            <section class="pc-page-head pc-lube-plan-head">
              <h1>润滑计划</h1>
            </section>

            <section class="pc-lube-plan-layout" aria-label="润滑计划">
              <aside class="pc-card pc-lube-tree-card" aria-label="润滑列表">
                <h2>润滑列表</h2>

                <label class="pc-lube-tree-search">
                  <img :src="`${pcAssetBase}/icon-search-lube.svg`" alt="" />
                  <input v-model="lubricationOrgSearch" placeholder="输入关键字搜索" />
                </label>

                <div class="pc-lube-tree" role="tree">
                  <button
                    v-for="node in filteredLubricationTree"
                    :key="node.id"
                    class="pc-lube-tree-node"
                    :class="{ 'is-active': node.label === activeLubricationOrg, 'has-children': node.expanded }"
                    :style="{ '--node-indent': `${node.level * 16}px` }"
                    type="button"
                    role="treeitem"
                    :aria-selected="node.label === activeLubricationOrg"
                    @click="activeLubricationOrg = node.label"
                  >
                    <img
                      v-if="node.expanded"
                      :src="modeAsset('icon-chevron-down.svg', 'dark-icon-chevron-down.svg')"
                      alt=""
                    />
                    <span v-else class="pc-lube-tree-spacer"></span>
                    <span>{{ node.label }}</span>
                  </button>
                </div>
              </aside>

              <article class="pc-card pc-lube-plan-card" aria-label="润滑计划列表">
                <div class="pc-lube-plan-tabs" role="tablist" aria-label="润滑计划类型">
                  <button
                    v-for="tab in lubricationPlanTabs"
                    :key="tab.key"
                    type="button"
                    role="tab"
                    :aria-selected="activeLubricationPlanTab === tab.key"
                    :class="{ 'is-active': activeLubricationPlanTab === tab.key }"
                    @click="activeLubricationPlanTab = tab.key"
                  >
                    {{ tab.label }}
                  </button>
                </div>

                <div class="pc-lube-plan-table-wrap">
                  <table class="pc-lube-plan-table">
                    <colgroup>
                      <col style="width: 64px" />
                      <col style="width: 153px" />
                      <col style="width: 153px" />
                      <col style="width: 96px" />
                      <col style="width: 153px" />
                      <col style="width: 116px" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>计划开始时间</th>
                        <th>计划结束时间</th>
                        <th>创建人</th>
                        <th>创建时间</th>
                        <th>处理状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in visibleLubricationPlanRows" :key="`${activeLubricationPlanTab}-${row.index}`">
                        <td>{{ row.index }}</td>
                        <td>{{ row.startAt }}</td>
                        <td>{{ row.endAt }}</td>
                        <td>{{ row.creator }}</td>
                        <td>{{ row.createdAt }}</td>
                        <td>
                          <span class="pc-lube-plan-status" :class="`is-${row.tone}`">{{ row.status }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <footer class="pc-lube-pagination" aria-label="分页">
                  <span>合计 194 条</span>
                  <button type="button" aria-label="上一页" @click="goLubricationPlanPage(Math.max(1, lubricationPlanPage - 1))">
                    <img :src="modeAsset('icon-chevron-right.svg', 'dark-icon-chevron-right.svg')" alt="" />
                  </button>
                  <button
                    v-for="page in lubricationPlanPages"
                    :key="page"
                    type="button"
                    :class="{ 'is-active': lubricationPlanPage === page }"
                    :aria-current="lubricationPlanPage === page ? 'page' : undefined"
                    @click="goLubricationPlanPage(page)"
                  >
                    {{ page }}
                  </button>
                  <span class="pc-lube-page-ellipsis">···</span>
                  <button type="button" @click="goLubricationPlanPage(20)">20</button>
                  <button type="button" aria-label="下一页" @click="goLubricationPlanPage(Math.min(20, lubricationPlanPage + 1))">
                    <img :src="modeAsset('icon-chevron-right.svg', 'dark-icon-chevron-right.svg')" alt="" />
                  </button>
                  <label>
                    跳至
                    <input v-model="lubricationPlanJump" inputmode="numeric" aria-label="跳转页码" @change="jumpLubricationPlanPage" />
                    页
                  </label>
                </footer>
              </article>
            </section>
          </div>
        </main>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const pcAssetBase = '/case-assets/device-health-management-platform/pc'
const appLogoMark = '/case-assets/device-health-management-platform/login-logo-mark.svg'
const activeDashboard = '全生命周期看板'
const previewScale = ref(1)
const isLoggedIn = ref(true)
const isDarkMode = ref(true)
type PcPage = 'dashboard' | 'lubrication-items' | 'lubrication-plan'
type LubricationPlanTab = 'time' | 'quality' | 'runtime'
const activePcPage = ref<PcPage>('dashboard')
const passwordVisible = ref(false)
const rememberAccount = ref(true)
const loginAccount = ref('ops.engineer')
const loginPassword = ref('secure-demo')
const lubricationSearch = ref('')
const lubricationOrgSearch = ref('')
const activeLubricationOrg = ref('综合管理部')
const activeLubricationPlanTab = ref<LubricationPlanTab>('time')
const lubricationPlanPage = ref(1)
const lubricationPlanJump = ref('')

function updatePreviewScale() {
  previewScale.value = Math.min(1, window.innerWidth / 1339)
}

onMounted(() => {
  updatePreviewScale()
  window.addEventListener('resize', updatePreviewScale, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePreviewScale)
})

function handleLogout() {
  isLoggedIn.value = false
  activePcPage.value = 'dashboard'
  passwordVisible.value = false
}

function handleLogin() {
  isLoggedIn.value = true
  passwordVisible.value = false
}

function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}

function showDashboard(item: string) {
  if (item === activeDashboard) {
    activePcPage.value = 'dashboard'
  }
}

function showLubricationChild(item: string) {
  if (item === '润滑项管理') {
    activePcPage.value = 'lubrication-items'
    return
  }

  if (item === '润滑计划') {
    activePcPage.value = 'lubrication-plan'
  }
}

function assetPath(icon: string) {
  return `${pcAssetBase}/${icon}`
}

function modeAsset(lightIcon: string, darkIcon: string) {
  return assetPath(isDarkMode.value ? darkIcon : lightIcon)
}

function dashboardChildIcon(item: string) {
  if (isDarkMode.value) {
    return assetPath(activePcPage.value === 'dashboard' && item === activeDashboard ? 'dark-icon-board-active.svg' : 'dark-icon-board-muted.svg')
  }

  return assetPath(activePcPage.value === 'dashboard' && item === activeDashboard ? 'icon-board-active.svg' : 'icon-board-muted.svg')
}

const lubricationParentIcon = computed(() => (
  isDarkMode.value ? assetPath('dark-icon-lubrication.svg') : assetPath('icon-lube-parent-light.svg')
))

const isLubricationPage = computed(() => activePcPage.value === 'lubrication-items' || activePcPage.value === 'lubrication-plan')

const activeLubricationChild = computed(() => {
  if (activePcPage.value === 'lubrication-plan') {
    return '润滑计划'
  }

  if (activePcPage.value === 'lubrication-items') {
    return '润滑项管理'
  }

  return ''
})

function lubricationChildIcon(item: string) {
  const isActive = item === activeLubricationChild.value

  if (isDarkMode.value) {
    return assetPath(isActive ? 'dark-icon-lube-child-2.svg' : 'dark-icon-lube-child.svg')
  }

  return assetPath(isActive ? 'icon-lube-child-active-light.svg' : 'icon-board-muted.svg')
}

const currentCrumbs = computed(() => {
  if (activePcPage.value === 'lubrication-plan') {
    return {
      section: '润滑管理',
      page: '润滑计划',
    }
  }

  if (activePcPage.value === 'lubrication-items') {
    return {
      section: '润滑管理',
      page: '润滑项管理',
    }
  }

  return {
    section: '数据驾驶舱',
    page: '全生命周期看板',
  }
})

const dashboardChildren = ['全生命周期看板', '可视化数据面板', '1#点检数据面板', '1#综合分析面板', '1#在线数据面板']

const navItems = [
  { label: '点检管理', icon: 'icon-inspection.svg', darkIcon: 'dark-icon-inspection.svg', muted: true, chevron: false },
  { label: '在线管理', icon: 'icon-online.svg', darkIcon: 'dark-icon-online.svg', muted: true, chevron: false },
]

const lubricationChildren = ['润滑项管理', '润滑计划', '润滑工单']

const lubricationTreeRows = [
  { id: 'park', label: '奥林·云溪海棠', level: 0, expanded: true },
  { id: 'company', label: '陕西中杰科化化学科技有限', level: 1, expanded: true },
  { id: 'general', label: '综合管理部', level: 2, expanded: false },
  { id: 'supply', label: '物资供应部', level: 2, expanded: false },
  { id: 'tech', label: '技术部', level: 2, expanded: false },
  { id: 'independent', label: '独立团', level: 1, expanded: false },
  { id: 'test-one', label: '测试1', level: 1, expanded: false },
  { id: 'test-release', label: '测试发们', level: 1, expanded: false },
  { id: 'test-dept', label: '测试部门', level: 1, expanded: false },
  { id: 'industrial', label: '工业互联网', level: 1, expanded: true },
  { id: 'logistics', label: '仓储物流研发中心', level: 2, expanded: false },
  { id: 'dev', label: '开发部门', level: 1, expanded: true },
  { id: 'dev-one', label: '开发一部', level: 2, expanded: false },
]

const filteredLubricationTree = computed(() => {
  const keyword = lubricationOrgSearch.value.trim()

  if (!keyword) {
    return lubricationTreeRows
  }

  return lubricationTreeRows.filter((node) => node.label.includes(keyword))
})

const lubricationPlanTabs: { key: LubricationPlanTab; label: string }[] = [
  { key: 'time', label: '按时润滑' },
  { key: 'quality', label: '按质润滑' },
  { key: 'runtime', label: '按运行润滑' },
]

const lubricationPlanPages = [1, 2, 3, 4, 5]

const baseLubricationPlanRows = Array.from({ length: 13 }, (_, index) => {
  const toneCycle = [
    { status: '计划中', tone: 'planned' },
    { status: '待处理', tone: 'pending' },
    { status: '已处理', tone: 'done' },
  ][index % 3]

  return {
    index: index + 1,
    startAt: '2023-01-02 12:00',
    endAt: '2023-01-02 12:00',
    creator: '张三',
    createdAt: '2023-01-02 12:00',
    ...toneCycle,
  }
})

const visibleLubricationPlanRows = computed(() => {
  if (activeLubricationPlanTab.value === 'quality') {
    return baseLubricationPlanRows.map((row) => ({
      ...row,
      status: row.index % 2 === 0 ? '待处理' : row.status,
      tone: row.index % 2 === 0 ? 'pending' : row.tone,
    }))
  }

  if (activeLubricationPlanTab.value === 'runtime') {
    return baseLubricationPlanRows.map((row) => ({
      ...row,
      status: row.index % 4 === 0 ? '已处理' : row.status,
      tone: row.index % 4 === 0 ? 'done' : row.tone,
    }))
  }

  return baseLubricationPlanRows
})

function goLubricationPlanPage(page: number) {
  lubricationPlanPage.value = page
  lubricationPlanJump.value = ''
}

function jumpLubricationPlanPage() {
  const page = Number.parseInt(lubricationPlanJump.value, 10)

  if (!Number.isNaN(page)) {
    goLubricationPlanPage(Math.min(20, Math.max(1, page)))
  }
}

const lubricationRows = [
  {
    index: 1,
    code: 'LUB-001',
    name: '1号电机驱动端轴承润滑',
    position: '1#液压泵站-M1电机',
    cycle: '30天',
    oil: 'Mobilux EP 2',
    nextPlan: '2024-05-15',
    status: '正常',
    tone: 'normal',
  },
  {
    index: 2,
    code: 'LUB-002',
    name: '2号电机驱动端轴承润滑',
    position: '2#液压泵站-M2电机',
    cycle: '30天',
    oil: 'Mobilux EP 2',
    nextPlan: '2024-05-18',
    status: '临期',
    tone: 'warning',
  },
  {
    index: 3,
    code: 'LUB-003',
    name: '液压站滤芯更换',
    position: '1#液压泵站-过滤器',
    cycle: '90天',
    oil: 'Hydraulic Oil 46#',
    nextPlan: '2024-06-01',
    status: '正常',
    tone: 'normal',
  },
  {
    index: 4,
    code: 'LUB-004',
    name: '联轴器润滑',
    position: '1#液压泵站-C1联轴器',
    cycle: '180天',
    oil: 'Grease X-1',
    nextPlan: '2024-07-10',
    status: '正常',
    tone: 'normal',
  },
  {
    index: 5,
    code: 'LUB-005',
    name: '主轴轴承润滑',
    position: '主传动部-A1主轴',
    cycle: '7天',
    oil: 'Shell Gadus S2',
    nextPlan: '2024-05-08',
    status: '逾期',
    tone: 'danger',
  },
]

const filteredLubricationRows = computed(() => {
  const keyword = lubricationSearch.value.trim().toLowerCase()

  if (!keyword) {
    return lubricationRows
  }

  return lubricationRows.filter((row) => (
    row.code.toLowerCase().includes(keyword)
    || row.name.toLowerCase().includes(keyword)
    || row.position.toLowerCase().includes(keyword)
    || row.oil.toLowerCase().includes(keyword)
  ))
})

const lubricationMetrics = [
  {
    label: '逾期未处理',
    value: '3',
    icon: 'icon-lube-metric-overdue.svg',
    bg: '#fef2f2',
    darkBg: 'rgba(248, 113, 113, 0.15)',
  },
  {
    label: '临期提醒',
    value: '12',
    icon: 'icon-lube-metric-warning.svg',
    bg: '#fffbeb',
    darkBg: 'rgba(251, 191, 36, 0.15)',
  },
  {
    label: '本周新增',
    value: '5',
    icon: 'icon-lube-metric-add.svg',
    bg: '#eaf3ff',
    darkBg: 'rgba(91, 155, 255, 0.15)',
  },
]

const deviceFacts = [
  { label: '设备编码', value: 'PUMP-01-AC12' },
  { label: '组织结构', value: '综合管理部' },
  { label: '最近运行时长', value: '126 h' },
  { label: '累计运行时长', value: '8,460 h' },
  { label: '设备类型', value: '液压油泵' },
  { label: '规格型号', value: 'YB-2.5' },
  { label: '所属模块', value: '液压站' },
  { label: '安装位置', value: '2号厂房' },
]

const statCards = [
  {
    label: '设备详情',
    value: '128',
    caption: '当前设备档案',
    icon: 'icon-stat-device.svg',
    darkIcon: 'dark-icon-stat-device.svg',
    iconBg: '#eef4fe',
    darkIconBg: 'rgba(91, 155, 255, 0.15)',
    dot: '#1671ee',
  },
  {
    label: '润滑任务',
    value: '12',
    caption: '今日待执行',
    icon: 'icon-stat-lube.svg',
    darkIcon: 'dark-icon-stat-lube.svg',
    iconBg: '#ecfdf5',
    darkIconBg: 'rgba(74, 222, 128, 0.15)',
    dot: '#00bc7d',
  },
  {
    label: '技术文档',
    value: '240',
    caption: '已归档资料',
    icon: 'icon-stat-doc.svg',
    darkIcon: 'dark-icon-stat-doc.svg',
    iconBg: '#fffbeb',
    darkIconBg: 'rgba(251, 191, 36, 0.15)',
    dot: '#ffb900',
  },
  {
    label: '维修工单',
    value: '36',
    caption: '本月新增',
    icon: 'icon-stat-repair.svg',
    darkIcon: 'dark-icon-stat-repair.svg',
    iconBg: '#fef2f2',
    darkIconBg: 'rgba(248, 113, 113, 0.15)',
    dot: '#fb2c36',
  },
]

const chartGridY = [12, 80, 131, 182]

const chartLabels = [
  { text: '05/01', x: 42 },
  { text: '05/02', x: 114 },
  { text: '05/03', x: 186 },
  { text: '05/04', x: 258 },
  { text: '05/05', x: 330 },
  { text: '05/06', x: 402 },
  { text: '05/07', x: 474 },
]

const defectRows = [
  { code: 'QXS7-202', content: '油压波动异常', status: '待处理', tone: 'pending', date: '2023-05-21' },
  { code: 'QXS7-188', content: '轴承温升预警', status: '告警', tone: 'alert', date: '2023-05-20' },
  { code: 'QXS7-176', content: '巡检完成确认', status: '正常', tone: 'normal', date: '2023-05-19' },
  { code: 'QXS7-165', content: '缺陷复检中', status: '待处理', tone: 'pending', date: '2023-05-18' },
  { code: 'QXS7-152', content: '震动阈值恢复', status: '正常', tone: 'normal', date: '2023-05-17' },
]
</script>

<style scoped lang="scss">
@use '@/components/styles/variables' as *;

$pc-blue: #1671ee;
$pc-green: #00bc7d;
$pc-text: #16213a;
$pc-muted: #9aa5b5;
$pc-subtle: #5b6779;
$pc-border: #eef1f6;
$pc-bg: #f5f7fa;
$pc-card-shadow: 0 1px 2px rgba(23, 33, 60, 0.04), 0 6px 18px rgba(23, 33, 60, 0.05);

.pc-preview-viewport {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: #f4f7fc;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;

  &::after {
    content: '';
    display: block;
    width: calc(1339px * var(--pc-scale));
    height: calc(889px * var(--pc-scale));
    pointer-events: none;
  }
}

.pc-login-page {
  position: absolute;
  inset: 0 auto auto 0;
  display: grid;
  grid-template-columns: 1fr 480px;
  width: 1339px;
  height: 889px;
  overflow: hidden;
  background:
    linear-gradient(120deg, rgba(22, 113, 238, 0.08) 0%, rgba(255, 255, 255, 0) 40%),
    linear-gradient(180deg, #f8fbff 0%, #f3f6fb 100%);
  color: $pc-text;
  font-family: $lx-font-family;
  transform: scale(var(--pc-scale));
  transform-origin: top left;
}

.pc-login-brand-panel {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-width: 0;
  padding: 48px 64px;
  overflow: hidden;
  border-right: 1px solid rgba(226, 232, 240, 0.8);
}

.pc-login-brand {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    padding: 6px 7.7px;
    border-radius: 9px;
    background: linear-gradient(180deg, #2f80ff 0%, #1671ee 100%);
    box-shadow: 0 8px 16px rgba(22, 113, 238, 0.18);
  }

  strong,
  span {
    display: block;
    white-space: nowrap;
  }

  strong {
    color: #0f1f3d;
    font-size: 15px;
    font-weight: 800;
    line-height: 20px;
  }

  span {
    margin-top: 2px;
    color: #718096;
    font-size: 12px;
    line-height: 16px;
  }
}

.pc-login-ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
    inset: 94px 96px auto auto;
    width: 420px;
    height: 420px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(22, 113, 238, 0.12), rgba(22, 113, 238, 0));
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto auto 88px 80px;
    width: 520px;
    height: 240px;
    border: 1px solid rgba(22, 113, 238, 0.12);
    border-radius: 28px;
    transform: skewX(-12deg);
  }

  i {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: rgba(22, 113, 238, 0.32);
    box-shadow: 0 0 0 5px rgba(22, 113, 238, 0.05);
  }

  i:nth-child(4) {
    left: 13%;
    top: 31%;
  }

  i:nth-child(5) {
    left: 27%;
    top: 57%;
  }

  i:nth-child(6) {
    left: 39%;
    top: 42%;
  }

  i:nth-child(7) {
    left: 54%;
    top: 65%;
  }

  i:nth-child(8) {
    left: 66%;
    top: 36%;
  }

  i:nth-child(9) {
    left: 78%;
    top: 52%;
  }

  i:nth-child(10) {
    left: 20%;
    top: 73%;
  }

  i:nth-child(11) {
    left: 47%;
    top: 78%;
  }

  i:nth-child(12) {
    left: 83%;
    top: 25%;
  }
}

.pc-flow-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(22, 113, 238, 0.24), transparent);
  transform-origin: left center;

  &.is-one {
    top: 32%;
    left: 12%;
    width: 60%;
    transform: rotate(15deg);
  }

  &.is-two {
    top: 58%;
    left: 16%;
    width: 68%;
    transform: rotate(-10deg);
  }

  &.is-three {
    top: 70%;
    left: 27%;
    width: 44%;
    transform: rotate(7deg);
  }
}

.pc-login-brand-copy {
  position: relative;
  z-index: 1;
  align-self: center;
  width: 640px;
  max-width: 78%;
  transform: translateY(-34px);

  > span {
    display: inline-flex;
    height: 28px;
    align-items: center;
    padding: 0 10px;
    border: 1px solid rgba(22, 113, 238, 0.14);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    color: $pc-blue;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
  }

  h1 {
    margin: 24px 0 0;
    color: #10203f;
    font-size: 36px;
    font-weight: 800;
    line-height: 1.28;
    letter-spacing: 0;
  }
}

.pc-login-main {
  display: grid;
  place-items: center;
  padding: 56px 64px 56px 0;
}

.pc-login-card {
  width: 408px;
  padding: 32px;
  border: 1px solid rgba(226, 232, 240, 0.86);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 18px 48px rgba(15, 31, 61, 0.07);
  backdrop-filter: blur(12px);
  transform: translateY(-28px);
}

.pc-login-card-head {
  margin-bottom: 28px;

  span {
    display: block;
    color: $pc-blue;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
  }

  h2 {
    margin: 8px 0 0;
    color: #10203f;
    font-size: 28px;
    font-weight: 800;
    line-height: 36px;
  }

  p {
    margin: 8px 0 0;
    color: #718096;
    font-size: 14px;
    line-height: 22px;
  }
}

.pc-login-field {
  display: grid;
  gap: 8px;
  margin-top: 16px;

  > span {
    color: #42526a;
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
  }

  > div {
    display: flex;
    align-items: center;
    height: 44px;
    border: 1px solid #dfe6f0;
    border-radius: 10px;
    background: #fff;
    transition:
      border-color $lx-duration-base $lx-ease-standard,
      box-shadow $lx-duration-base $lx-ease-standard;

    &:focus-within {
      border-color: rgba(22, 113, 238, 0.62);
      box-shadow: 0 0 0 4px rgba(22, 113, 238, 0.08);
    }
  }

  img {
    width: 16px;
    height: 16px;
    margin-left: 14px;
  }

  input {
    min-width: 0;
    flex: 1;
    height: 42px;
    border: 0;
    outline: 0;
    background: transparent;
    color: #10203f;
    font: inherit;
    font-size: 14px;
    line-height: 22px;
  }

  img + input {
    padding-left: 10px;
  }

  input:first-child {
    padding-left: 14px;
  }

  input::placeholder {
    color: #a0aabc;
  }

  button {
    display: grid;
    width: 44px;
    height: 42px;
    place-items: center;
    color: #7a8797;

    img {
      margin: 0;
      opacity: 0.72;
    }
  }
}

.pc-login-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  color: #718096;
  font-size: 13px;
  line-height: 18px;

  label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  input {
    width: 14px;
    height: 14px;
    accent-color: $pc-blue;
  }

  button {
    color: #718096;
  }
}

.pc-login-submit {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #1671ee 0%, #0b8cf5 100%);
  box-shadow: 0 10px 22px rgba(22, 113, 238, 0.22);
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 800;
  line-height: 22px;
  text-decoration: none;
}

.pc-login-policy {
  margin: 18px 0 0;
  color: #a0aabc;
  font-size: 12px;
  line-height: 18px;
  text-align: center;

  a {
    color: #718096;
    text-decoration: none;
  }
}

.pc-preview-page {
  position: absolute;
  inset: 0 auto auto 0;
  display: grid;
  grid-template-columns: 216px minmax(1123px, 1fr);
  width: 1339px;
  min-height: 889px;
  transform: scale(var(--pc-scale));
  transform-origin: top left;
  background: $pc-bg;
  color: $pc-text;
  font-family: $lx-font-family;
  font-synthesis: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  @include lx-control-reset;
}

.pc-sidebar {
  display: flex;
  flex-direction: column;
  min-height: 889px;
  border-right: 1px solid $pc-border;
  background: #fff;
}

.pc-brand {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  width: 195px;
  height: 39px;
  margin: 16px 10px 0;
  padding: 0 12px;

  img {
    display: block;
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    padding: 6px 7.7px;
    border-radius: 9px;
    background: linear-gradient(180deg, #2f80ff 0%, #1671ee 100%);
    box-shadow: 0 6px 14px rgba(22, 113, 238, 0.16);
  }

  strong,
  span {
    display: block;
    white-space: nowrap;
  }

  strong {
    color: $pc-text;
    font-size: 15px;
    font-weight: 800;
    line-height: 20px;
  }

  span {
    margin-top: 2px;
    color: $pc-muted;
    font-size: 11px;
    line-height: 16.5px;
  }
}

.pc-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 28px 10px 0;
}

.pc-nav-item,
.pc-nav-child {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  text-align: left;

  &:focus-visible {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(91, 155, 255, 0.36);
  }
}

.pc-nav-item {
  position: relative;
  height: 40px;
  padding: 0 16px;
  gap: 12px;
  color: $pc-subtle;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;

  > img:first-child {
    width: 18px;
    height: 18px;
  }

  span {
    flex: 1;
  }

  &.is-muted {
    opacity: 0.6;
  }
}

.pc-nav-chevron {
  width: 14px;
  height: 14px;
}

.pc-nav-group {
  display: grid;

  &.is-lube {
    height: 158px;
  }
}

.pc-nav-children {
  display: grid;
  height: 190px;
  padding: 2px 0 0;

  &.is-compact {
    height: 114px;
  }
}

.pc-nav-child {
  height: 36px;
  gap: 12px;
  padding: 0 16px 0 44px;
  color: #c3c9d2;
  font-size: 12.5px;
  font-weight: 400;
  line-height: 18.75px;

  img {
    width: 14px;
    height: 14px;
    flex: 0 0 14px;
  }

  span {
    min-width: 0;
    white-space: nowrap;
  }

  &.is-active {
    background: #eaf3ff;
    color: $pc-blue;
    font-weight: 800;
  }
}

.pc-shell {
  min-width: 0;
  background: $pc-bg;
}

.pc-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 28px;
  border-bottom: 1px solid $pc-border;
  background: #fff;
}

.pc-crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  color: $pc-muted;
  font-size: 12px;
  line-height: 16px;

  i {
    color: #c3c9d2;
    font-style: normal;
  }

  strong {
    color: $pc-text;
    font-weight: 800;
  }
}

.pc-header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.pc-icon-button,
.pc-header-icon {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.pc-icon-button {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #f5f7fa;

  img {
    width: 18px;
    height: 18px;
  }
}

.pc-header-icon img {
  width: 18px;
  height: 18px;
}

.pc-user {
  display: flex;
  align-items: center;
  gap: 8px;
  color: $pc-subtle;
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  span {
    display: grid;
    width: 28px;
    height: 28px;
    place-items: center;
    border-radius: 999px;
    background: #eef4fe;
  }

  img {
    width: 16px;
    height: 16px;
  }

  span img {
    width: 15px;
    height: 15px;
  }
}

.pc-user-menu {
  position: relative;

  &:not([open]) .pc-user-dropdown {
    display: none;
  }

  &:focus-within .pc-user-dropdown,
  &:hover .pc-user-dropdown {
    display: block;
  }

  &[open] .pc-user > img:last-child {
    transform: rotate(180deg);
  }
}

.pc-user-dropdown {
  position: absolute;
  top: 38px;
  right: 0;
  z-index: 10;
  width: 184px;
  padding: 8px;
  border: 1px solid #e4eaf3;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 28px rgba(15, 31, 61, 0.08);
  backdrop-filter: blur(10px);

  > div {
    padding: 8px 10px 10px;
    border-bottom: 1px solid #eef1f6;
    margin-bottom: 6px;
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: $pc-text;
    font-size: 13px;
    font-weight: 800;
    line-height: 18px;
  }

  span {
    margin-top: 2px;
    color: $pc-muted;
    font-size: 12px;
    line-height: 16px;
  }

  button,
  a {
    display: flex;
    width: 100%;
    height: 34px;
    align-items: center;
    padding: 0 10px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #42526a;
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    line-height: 18px;
    text-align: left;
    text-decoration: none;

    &:hover {
      background: #f5f7fa;
    }

    &.is-danger {
      color: #d92d20;
    }
  }
}

.pc-main {
  padding: 20px 28px 28px;
}

.pc-content {
  display: grid;
  width: min(100%, 1067px);
  gap: 16px;
}

.pc-page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 36px;

  h1 {
    margin: 0;
    color: $pc-text;
    font-size: 24px;
    font-weight: 600;
    line-height: 24px;
  }
}

.pc-date-filter {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 311px;
  height: 36px;
  padding: 0 15px;
  border: 1px solid #e4eaf3;
  border-radius: 8px;
  background: #fff;
  color: $pc-subtle;
  font-size: 14px;
  line-height: 21px;

  img:first-child {
    width: 16px;
    height: 16px;
  }

  img:last-child {
    width: 14px;
    height: 14px;
    margin-left: auto;
  }
}

.pc-lube-content {
  gap: 24px;
}

.pc-lube-page-head {
  align-items: flex-start;
  height: 53px;

  > div {
    min-width: 0;
  }

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 24px;
  }

  p {
    margin: 8px 0 0;
    color: $pc-muted;
    font-size: 14px;
    line-height: 21px;
  }
}

.pc-primary-action {
  display: inline-flex;
  width: 126px;
  height: 36px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 9px;
  border-radius: 8px;
  background: $pc-blue;
  box-shadow: 0 4px 12px rgba(22, 113, 238, 0.25);
  color: #fff;
  font-size: 14px;
  line-height: 21px;

  img {
    width: 16px;
    height: 16px;
  }
}

.pc-lube-table-card {
  height: 401px;
  padding: 20px;
  overflow: hidden;
}

.pc-lube-toolbar {
  display: flex;
  height: 36px;
  align-items: center;
  gap: 12px;
}

.pc-lube-search {
  display: flex;
  width: 280px;
  height: 36px;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid #e4eaf3;
  border-radius: 8px;
  background: #fff;

  img {
    width: 15px;
    height: 16px;
    flex: 0 0 auto;
  }

  input {
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: $pc-text;
    font: inherit;
    font-size: 12px;
    line-height: 17px;

    &::placeholder {
      color: #aab2bf;
    }
  }
}

.pc-lube-filter {
  display: inline-flex;
  width: 78px;
  height: 36px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #e4eaf3;
  border-radius: 8px;
  background: #fff;
  color: $pc-subtle;
  font-size: 14px;
  line-height: 21px;

  img {
    width: 16px;
    height: 16px;
  }
}

.pc-lube-count {
  margin-left: auto;
  color: $pc-muted;
  font-size: 14px;
  line-height: 21px;
  white-space: nowrap;
}

.pc-lube-table-wrap {
  margin-top: 20px;
  overflow: hidden;
}

.pc-lube-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    height: 52px;
    padding: 0 12px;
    border-bottom: 1px solid #f2f4f8;
    overflow: hidden;
    color: $pc-text;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
  }

  th {
    height: 44px;
    background: #f7f9fc;
    color: #7a8597;
    font-weight: 400;
  }

  td:first-child {
    color: $pc-muted;
  }

  td:nth-child(4),
  td:nth-child(5) {
    color: $pc-subtle;
  }
}

.pc-lube-cycle,
.pc-lube-status {
  display: inline-flex;
  min-width: 46px;
  height: 29px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 14px;
  line-height: 21px;
}

.pc-lube-cycle {
  padding: 0 12px;
  background: #f5f7fa;
  color: $pc-subtle;
}

.pc-lube-status {
  width: 52px;
  background: rgba(0, 188, 125, 0.15);
  color: #009966;

  &.is-warning {
    background: rgba(255, 185, 0, 0.15);
    color: #e17100;
  }

  &.is-danger {
    background: rgba(251, 44, 54, 0.15);
    color: #e7000b;
  }
}

.pc-lube-more {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 6px;

  img {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #f5f7fa;
  }
}

.pc-lube-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.pc-lube-metric-card {
  display: flex;
  height: 93px;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;

  > div {
    display: grid;
    min-width: 0;
    gap: 4px;
  }

  span {
    color: $pc-muted;
    font-size: 14px;
    line-height: 21px;
  }

  strong {
    color: $pc-text;
    font-size: 36px;
    font-weight: 800;
    line-height: 40px;
  }
}

.pc-lube-metric-icon {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 8px;
  background: var(--metric-bg, #eaf3ff);
  flex: 0 0 auto;

  img {
    width: 20px;
    height: 20px;
  }
}

.pc-lube-plan-content {
  gap: 16px;
}

.pc-lube-plan-head {
  height: 24px;
}

.pc-lube-plan-layout {
  display: grid;
  grid-template-columns: 263px minmax(0, 1fr);
  gap: 16px;
  height: 781px;
}

.pc-lube-tree-card {
  height: 781px;
  padding: 16px;
  overflow: hidden;

  h2 {
    margin: 0;
    color: $pc-text;
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
  }
}

.pc-lube-tree-search {
  display: flex;
  height: 36px;
  align-items: center;
  gap: 9px;
  margin-top: 12px;
  padding: 0 12px;
  border: 1px solid #e4eaf3;
  border-radius: 8px;
  background: #fff;

  img {
    width: 15px;
    height: 16px;
    flex: 0 0 auto;
  }

  input {
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: $pc-text;
    font: inherit;
    font-size: 12px;
    line-height: 17px;

    &::placeholder {
      color: #aab2bf;
    }
  }
}

.pc-lube-tree {
  display: grid;
  align-content: start;
  margin-top: 12px;
}

.pc-lube-tree-node {
  display: flex;
  height: 34px;
  align-items: center;
  gap: 6px;
  padding: 0 8px 0 calc(8px + var(--node-indent, 0px));
  border-radius: 6px;
  color: $pc-subtle;
  font-size: 14px;
  line-height: 21px;
  text-align: left;

  img,
  .pc-lube-tree-spacer {
    width: 14px;
    height: 14px;
    flex: 0 0 14px;
  }

  span:last-child {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.is-active {
    background: #eaf3ff;
    color: $pc-blue;
  }
}

.pc-lube-plan-card {
  display: grid;
  grid-template-rows: 40px 642px 52px;
  height: 781px;
  padding: 20px;
  overflow: hidden;
}

.pc-lube-plan-tabs {
  display: inline-flex;
  width: fit-content;
  height: 40px;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 8px;
  background: #f2f5fa;

  button {
    height: 32px;
    padding: 0 16px;
    border-radius: 8px;
    color: $pc-subtle;
    font-size: 14px;
    line-height: 21px;

    &.is-active {
      background: $pc-blue;
      box-shadow: 0 4px 12px rgba(22, 113, 238, 0.25);
      color: #fff;
    }
  }
}

.pc-lube-plan-table-wrap {
  align-self: end;
  height: 642px;
  overflow: hidden;
}

.pc-lube-plan-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  th,
  td {
    height: 46px;
    padding: 0 12px;
    border-bottom: 1px solid #f2f4f8;
    overflow: hidden;
    color: $pc-text;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
  }

  th {
    height: 44px;
    background: #f7f9fc;
    color: #7a8597;
    font-weight: 400;
  }

  td:first-child {
    color: $pc-muted;
  }
}

.pc-lube-plan-status {
  display: inline-flex;
  min-width: 66px;
  height: 29px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #eaf3ff;
  color: $pc-blue;
  font-size: 14px;
  line-height: 21px;

  &.is-pending {
    background: #e8f8f2;
    color: #009966;
  }

  &.is-done {
    background: #f1f5f9;
    color: #64748b;
  }
}

.pc-lube-pagination {
  display: flex;
  height: 52px;
  align-items: end;
  justify-content: center;
  gap: 8px;
  color: $pc-muted;
  font-size: 14px;
  line-height: 21px;

  > span:first-child {
    margin-right: 4px;
  }

  button {
    display: grid;
    min-width: 32px;
    height: 32px;
    place-items: center;
    border: 1px solid #e4eaf3;
    border-radius: 8px;
    color: $pc-subtle;
    font-size: 14px;
    line-height: 21px;

    &.is-active {
      border-color: $pc-blue;
      background: $pc-blue;
      color: #fff;
    }

    img {
      width: 16px;
      height: 16px;
    }
  }

  button[aria-label='上一页'] img {
    transform: rotate(180deg);
  }

  label {
    display: inline-flex;
    height: 32px;
    align-items: center;
    gap: 6px;
    margin-left: 4px;
    color: $pc-muted;
  }

  input {
    width: 48px;
    height: 32px;
    border: 1px solid #e4eaf3;
    border-radius: 8px;
    background: #fff;
    color: $pc-text;
    font: inherit;
    text-align: center;
  }
}

.pc-lube-page-ellipsis {
  width: 28px;
  text-align: center;
}

.pc-card {
  border-radius: 8px;
  background: #fff;
  box-shadow: $pc-card-shadow;
}

.pc-device-card {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 40px;
  height: 202px;
  padding: 16px;
}

.pc-device-image {
  display: block;
  width: 260px;
  height: 170px;
  border-radius: 8px;
  background: #f5f7fa;
  object-fit: cover;
}

.pc-device-copy {
  min-width: 0;
  padding: 4px 0;
}

.pc-device-title-row {
  display: flex;
  align-items: center;
  gap: 12px;

  h2 {
    margin: 0;
    color: $pc-text;
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
  }
}

.pc-running-pill,
.pc-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  white-space: nowrap;
}

.pc-running-pill {
  gap: 8px;
  padding: 4px 12px;
  background: rgba(0, 188, 125, 0.15);
  color: #009966;

  i {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: $pc-green;
  }
}

.pc-device-grid {
  display: grid;
  grid-template-columns: repeat(4, 153.75px);
  column-gap: 40px;
  row-gap: 16px;
  margin: 20px 0 0;

  div,
  dt,
  dd {
    min-width: 0;
  }

  dt,
  dd {
    margin: 0;
    font-size: 14px;
    line-height: 21px;
    white-space: nowrap;
  }

  dt {
    color: $pc-muted;
  }

  dd {
    margin-top: 4px;
    color: $pc-text;
    font-weight: 600;
  }
}

.pc-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.pc-stat-card {
  display: grid;
  align-content: start;
  height: 149px;
  padding: 20px 24px;

  strong {
    position: relative;
    width: fit-content;
    margin-top: 21px;
    color: $pc-text;
    font-size: 36px;
    font-weight: 800;
    line-height: 36px;

    &::after {
      content: '';
      position: absolute;
      top: 15.5px;
      right: -14px;
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--stat-dot, #{$pc-blue});
    }
  }

  small {
    margin-top: 8px;
    color: $pc-muted;
    font-size: 14px;
    line-height: 21px;
  }
}

.pc-stat-head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: $pc-subtle;
    font-size: 14px;
    line-height: 21px;
  }

  .pc-stat-icon {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 8px;
    background: var(--stat-icon-bg, #eef4fe);
    flex: 0 0 32px;
  }

  img {
    display: block;
    width: 18px;
    height: 18px;
  }
}

.pc-dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.pc-chart-card,
.pc-table-card {
  height: 325.5px;
  padding: 20px;
}

.pc-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 27px;
  gap: 20px;

  h2 {
    margin: 0;
    color: $pc-text;
    font-size: 18px;
    font-weight: 600;
    line-height: 27px;
  }

  button {
    color: $pc-blue;
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
  }
}

.pc-chart-legend {
  display: flex;
  align-items: center;
  gap: 20px;
  color: $pc-subtle;
  font-size: 14px;
  line-height: 21px;

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  i {
    width: 8px;
    height: 8px;
    border-radius: 999px;

    &.is-blue {
      background: $pc-blue;
    }

    &.is-green {
      background: #00d492;
    }
  }
}

.pc-chart-surface {
  width: 486px;
  height: 250px;
  margin-top: 9px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
}

.pc-grid-lines line {
  stroke: #eef1f6;
  stroke-width: 1;
}

.pc-y-labels text,
.pc-x-labels text {
  fill: $pc-muted;
  font-size: 14px;
  line-height: 21px;
}

.pc-x-labels text {
  text-anchor: middle;
}

.pc-chart-area {
  &.is-online {
    fill: url('#onlineArea');
  }

  &.is-inspect {
    fill: url('#inspectArea');
  }
}

.pc-chart-line {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;

  &.is-online {
    stroke: #00d492;
  }

  &.is-inspect {
    stroke: $pc-blue;
  }
}

.pc-table-card {
  table {
    width: 100%;
    margin-top: 8px;
    border-collapse: collapse;
    table-layout: fixed;
  }

  th,
  td {
    height: 42px;
    padding: 0 12px;
    border-bottom: 1px solid #f2f4f8;
    color: $pc-text;
    font-size: 14px;
    line-height: 21px;
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
  }

  th {
    height: 40px;
    background: #f7f9fc;
    color: #7a8597;
    font-weight: 400;

    &:first-child {
      border-top-left-radius: 4px;
    }

    &:last-child {
      border-top-right-radius: 4px;
      text-align: right;
    }
  }

  td:last-child {
    color: $pc-subtle;
    text-align: right;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 111.48px;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 132px;
  }

  th:nth-child(3),
  td:nth-child(3) {
    width: 112px;
  }
}

.pc-status {
  min-width: 58px;
  height: 26px;
  padding: 0 12px;

  &.is-pending {
    background: rgba(255, 185, 0, 0.15);
    color: #e17100;
  }

  &.is-alert {
    background: rgba(251, 44, 54, 0.15);
    color: #e7000b;
  }

  &.is-normal {
    background: rgba(0, 188, 125, 0.15);
    color: #009966;
  }
}

.pc-preview-page.is-dark {
  background: #0f172a;
  color: #f3f4f6;

  .pc-sidebar,
  .pc-topbar {
    border-color: rgba(255, 255, 255, 0.05);
    background: #111827;
  }

  .pc-shell,
  .pc-main {
    background: #0f172a;
  }

  .pc-brand {
    strong {
      color: #f3f4f6;
    }

    span {
      color: #94a3b8;
    }
  }

  .pc-header-icon img,
  .pc-date-filter img,
  .pc-user > img:last-child {
    filter: brightness(0) invert(1);
    opacity: 0.72;
  }

  .pc-nav-item {
    color: #9ca3af;

    &.is-muted {
      color: #9ca3af;
      opacity: 0.6;
    }
  }

  .pc-nav-child {
    color: #4b5563;

    img {
      filter: none;
      opacity: 1;
    }

    &.is-active {
      background: rgba(91, 155, 255, 0.15);
      color: #7db0ff;
      font-weight: 800;

      img {
        filter: none;
        opacity: 1;
      }
    }
  }

  .pc-nav-children.is-compact .pc-nav-child {
    color: #9ca3af;
  }

  .pc-crumbs {
    color: #64748b;

    i {
      color: #475569;
    }

    strong {
      color: #f3f4f6;
    }
  }

  .pc-icon-button {
    background: rgba(255, 255, 255, 0.06);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);

    img {
      filter: none;
      opacity: 1;
    }

    &:hover {
      background: rgba(125, 176, 255, 0.16);
    }
  }

  .pc-header-icon {
    opacity: 0.88;
  }

  .pc-user {
    color: #cbd5e1;

    span {
      background: rgba(59, 130, 246, 0.16);
    }

    span img {
      filter: none;
      opacity: 1;
    }
  }

  .pc-user-dropdown {
    border-color: rgba(255, 255, 255, 0.08);
    background: rgba(30, 41, 59, 0.96);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);

    > div {
      border-color: rgba(255, 255, 255, 0.06);
    }

    strong {
      color: #f3f4f6;
    }

    span {
      color: #94a3b8;
    }

    button,
    a {
      color: #cbd5e1;

      &:hover {
        background: rgba(255, 255, 255, 0.06);
      }

      &.is-danger {
        color: #f87171;
      }
    }
  }

  .pc-page-head h1,
  .pc-device-title-row h2,
  .pc-device-grid dd,
  .pc-stat-card strong,
  .pc-panel-head h2,
  .pc-table-card td:first-child {
    color: #f3f4f6;
  }

  .pc-date-filter {
    border-color: rgba(255, 255, 255, 0.08);
    background: #1e293b;
    color: #94a3b8;
  }

  .pc-card {
    background: #1e293b;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .pc-stat-icon {
    background: var(--stat-dark-icon-bg, rgba(91, 155, 255, 0.15));
  }

  .pc-device-image {
    background: #1e293b;
  }

  .pc-device-card {
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 16px;
      left: 16px;
      width: 260px;
      height: 170px;
      border-radius: 8px;
      background: radial-gradient(circle at 50% 30%, rgba(0, 0, 0, 0) 28%, rgba(15, 21, 30, 0.5) 64%, #1e293b 100%);
      pointer-events: none;
    }
  }

  .pc-running-pill {
    background: rgba(74, 222, 128, 0.15);
    color: #4ade80;

    i {
      background: #4ade80;
    }
  }

  .pc-device-grid dt,
  .pc-stat-head span,
  .pc-stat-card small,
  .pc-chart-legend,
  .pc-y-labels text,
  .pc-x-labels text,
  .pc-table-card th,
  .pc-table-card td:last-child {
    color: #94a3b8;
    fill: #94a3b8;
  }

  .pc-table-card td {
    border-color: rgba(255, 255, 255, 0.05);
    color: #cbd5e1;
  }

  .pc-table-card th {
    border-color: rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.03);
  }

  .pc-panel-head button {
    color: #7db0ff;
  }

  .pc-grid-lines line {
    stroke: rgba(255, 255, 255, 0.06);
  }

  .pc-chart-line.is-inspect {
    stroke: #7db0ff;
  }

  .pc-chart-line.is-online {
    stroke: #4ade80;
  }

  .pc-status {
    &.is-pending {
      background: rgba(251, 191, 36, 0.15);
      color: #fbbf24;
    }

    &.is-alert {
      background: rgba(248, 113, 113, 0.15);
      color: #f87171;
    }

    &.is-normal {
      background: rgba(74, 222, 128, 0.15);
      color: #4ade80;
    }
  }

  .pc-nav-group.is-lube {
    .pc-nav-item.is-expanded {
      color: #9ca3af;
    }

    .pc-nav-children.is-compact .pc-nav-child {
      color: #9ca3af;

      &.is-active {
        background: rgba(91, 155, 255, 0.15);
        color: #7db0ff;
        font-weight: 800;
      }
    }
  }

  .pc-lube-page-head {
    h1 {
      color: #f3f4f6;
      font-size: 24px;
      font-weight: 500;
      line-height: 24px;
    }

    p {
      color: #94a3b8;
    }
  }

  .pc-primary-action {
    background: #5b9bff;
    box-shadow: 0 0 6px rgba(91, 155, 255, 0.4);
    color: #0f172a;
    font-weight: 400;

    img {
      filter: brightness(0) saturate(100%) invert(7%) sepia(31%) saturate(1511%) hue-rotate(181deg) brightness(91%)
        contrast(96%);
    }

    &:hover {
      background: #7db0ff;
      box-shadow: 0 0 10px rgba(91, 155, 255, 0.48);
    }
  }

  .pc-lube-table-card {
    background: #1e293b;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .pc-lube-search,
  .pc-lube-filter {
    border-color: rgba(255, 255, 255, 0.08);
    background: transparent;
    color: #cbd5e1;
  }

  .pc-lube-search {
    input {
      color: #f3f4f6;

      &::placeholder {
        color: #6b7280;
      }
    }
  }

  .pc-lube-count {
    color: #94a3b8;
  }

  .pc-lube-table {
    th,
    td {
      border-color: rgba(255, 255, 255, 0.05);
      color: #f3f4f6;
    }

    th {
      background: rgba(255, 255, 255, 0.03);
      color: #94a3b8;
    }

    td:first-child {
      color: #94a3b8;
    }

    td:nth-child(4),
    td:nth-child(5) {
      color: #cbd5e1;
    }

    tbody tr:hover td {
      background: rgba(91, 155, 255, 0.06);
    }
  }

  .pc-lube-cycle {
    background: rgba(255, 255, 255, 0.06);
    color: #cbd5e1;
  }

  .pc-lube-status {
    background: rgba(74, 222, 128, 0.15);
    color: #4ade80;

    &.is-warning {
      background: rgba(251, 191, 36, 0.15);
      color: #fbbf24;
    }

    &.is-danger {
      background: rgba(248, 113, 113, 0.15);
      color: #f87171;
    }
  }

  .pc-lube-more {
    img {
      filter: brightness(0) invert(1);
      opacity: 0.72;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.06);
    }
  }

  .pc-lube-metric-card {
    background: #1e293b;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);

    span {
      color: #94a3b8;
    }

    strong {
      color: #f3f4f6;
      font-weight: 800;
    }
  }

  .pc-lube-metric-icon {
    background: var(--metric-dark-bg, rgba(91, 155, 255, 0.15));
  }

  .pc-lube-plan-head h1,
  .pc-lube-tree-card h2 {
    color: #f3f4f6;
  }

  .pc-lube-tree-card,
  .pc-lube-plan-card {
    background: #1e293b;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
  }

  .pc-lube-tree-search,
  .pc-lube-pagination button,
  .pc-lube-pagination input {
    border-color: rgba(255, 255, 255, 0.08);
    background: rgba(15, 23, 42, 0.18);
    color: #cbd5e1;
  }

  .pc-lube-tree-search {
    img {
      filter: brightness(0) invert(1);
      opacity: 0.58;
    }

    input {
      color: #f3f4f6;

      &::placeholder {
        color: #64748b;
      }
    }
  }

  .pc-lube-tree-node {
    color: #cbd5e1;

    img {
      filter: brightness(0) invert(1);
      opacity: 0.66;
    }

    &.is-active {
      background: rgba(91, 155, 255, 0.22);
      color: #7db0ff;
    }
  }

  .pc-lube-plan-tabs {
    background: rgba(15, 23, 42, 0.22);

    button {
      color: #cbd5e1;

      &.is-active {
        background: #5b9bff;
        box-shadow: 0 4px 16px rgba(91, 155, 255, 0.32);
        color: #0f172a;
      }
    }
  }

  .pc-lube-plan-table {
    th,
    td {
      border-color: rgba(255, 255, 255, 0.05);
    }

    th {
      background: rgba(255, 255, 255, 0.03);
      color: #94a3b8;
    }

    td {
      color: #f3f4f6;
    }

    td:first-child {
      color: #94a3b8;
    }
  }

  .pc-lube-plan-status {
    background: rgba(91, 155, 255, 0.16);
    color: #5b9bff;

    &.is-pending {
      background: rgba(34, 197, 94, 0.16);
      color: #4ade80;
    }

    &.is-done {
      background: rgba(148, 163, 184, 0.16);
      color: #cbd5e1;
    }
  }

  .pc-lube-pagination {
    color: #94a3b8;

    button {
      background: transparent;
      color: #cbd5e1;

      &.is-active {
        border-color: #5b9bff;
        background: #5b9bff;
        color: #0f172a;
      }

      img {
        filter: brightness(0) invert(1);
        opacity: 0.72;
      }
    }

    label {
      color: #94a3b8;
    }

    input {
      color: #f3f4f6;
    }
  }
}

@media (min-width: 1440px) {
  .pc-content {
    width: 1067px;
  }
}
</style>
