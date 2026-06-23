<template>
  <div class="pc-preview-viewport">
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

          <a class="pc-login-submit" href="#dashboard" role="button" @click="handleLogin">登录</a>

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
                :class="{ 'is-active': item === activeDashboard }"
                type="button"
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
            <button class="pc-nav-item" type="button">
              <img :src="modeAsset('icon-lubrication.svg', 'dark-icon-lubrication.svg')" alt="" />
              <span>润滑管理</span>
              <img class="pc-nav-chevron" :src="modeAsset('icon-chevron-right.svg', 'dark-icon-chevron-right.svg')" alt="" />
            </button>

            <div class="pc-nav-children is-compact">
              <button v-for="item in lubricationChildren" :key="item" class="pc-nav-child" type="button">
                <img :src="modeAsset('icon-board-muted.svg', 'dark-icon-lube-child.svg')" alt="" />
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
            <span>数据驾驶舱</span>
            <i>/</i>
            <strong>全生命周期看板</strong>
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
                <a class="is-danger" href="#login" role="menuitem" @click="handleLogout">退出登录</a>
              </div>
            </details>
          </div>
        </header>

        <main class="pc-main">
          <div class="pc-content">
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
        </main>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const pcAssetBase = '/case-assets/device-health-management-platform/pc'
const appLogoMark = '/case-assets/device-health-management-platform/login-logo-mark.svg'
const activeDashboard = '全生命周期看板'
const previewScale = ref(1)
const isLoggedIn = ref(true)
const isDarkMode = ref(false)
const passwordVisible = ref(false)
const rememberAccount = ref(true)
const loginAccount = ref('ops.engineer')
const loginPassword = ref('secure-demo')

function updatePreviewScale() {
  previewScale.value = Math.min(1, window.innerWidth / 1339)
}

onMounted(() => {
  syncAuthFromHash()
  updatePreviewScale()
  window.addEventListener('resize', updatePreviewScale, { passive: true })
  window.addEventListener('hashchange', syncAuthFromHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePreviewScale)
  window.removeEventListener('hashchange', syncAuthFromHash)
})

function syncAuthFromHash() {
  isLoggedIn.value = window.location.hash !== '#login'

  if (isLoggedIn.value) {
    passwordVisible.value = false
  }
}

function handleLogout() {
  window.location.hash = 'login'
  isLoggedIn.value = false
}

function handleLogin() {
  window.location.hash = 'dashboard'
  isLoggedIn.value = true
  passwordVisible.value = false
}

function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}

function assetPath(icon: string) {
  return `${pcAssetBase}/${icon}`
}

function modeAsset(lightIcon: string, darkIcon: string) {
  return assetPath(isDarkMode.value ? darkIcon : lightIcon)
}

function dashboardChildIcon(item: string) {
  if (isDarkMode.value) {
    return assetPath(item === activeDashboard ? 'dark-icon-board-active.svg' : 'dark-icon-board-muted.svg')
  }

  return assetPath(item === activeDashboard ? 'icon-board-active.svg' : 'icon-board-muted.svg')
}


const dashboardChildren = ['全生命周期看板', '可视化数据面板', '1#点检数据面板', '1#综合分析面板', '1#在线数据面板']

const navItems = [
  { label: '点检管理', icon: 'icon-inspection.svg', darkIcon: 'dark-icon-inspection.svg', muted: true, chevron: false },
  { label: '在线管理', icon: 'icon-online.svg', darkIcon: 'dark-icon-online.svg', muted: true, chevron: false },
]

const lubricationChildren = ['润滑项管理', '润滑计划', '润滑工单']

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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f4f7fc;
}

.pc-login-page {
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
  border-radius: 10px;
  background: linear-gradient(135deg, #1671ee 0%, #0b8cf5 100%);
  box-shadow: 0 10px 22px rgba(22, 113, 238, 0.22);
  color: #fff;
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
    border-radius: 8px;
    color: #42526a;
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
}

@media (min-width: 1440px) {
  .pc-content {
    width: 1067px;
  }
}
</style>
