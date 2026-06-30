<template>
  <div ref="mobileDemoRef" class="device-mobile-demo" :class="{ 'is-login': !isAuthenticated }" :data-page="currentMobilePage">
    <section v-if="!isAuthenticated && loginSubpage === 'login'" class="login-screen" aria-label="设备健康管理登录">
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
          <DeviceSelectDropdown
            v-model="enterpriseName"
            name="enterprise"
            placeholder="请选择企业名称"
            :options="enterpriseOptions"
          />

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
            <button type="button" @click="openEnterpriseConfig">企业配置</button>
          </div>
        </section>

        <div class="login-bottom-action">
          <button type="submit">登录</button>
        </div>
      </form>
    </section>

    <section v-else-if="!isAuthenticated" class="enterprise-config-screen" aria-label="企业配置">
      <div class="enterprise-status-bar" aria-hidden="true">
        <span>9:41</span>
        <div>
          <i />
          <i />
          <i />
          <span class="enterprise-wifi" />
          <b />
        </div>
      </div>

      <header class="enterprise-config-header">
        <button class="enterprise-back-button" type="button" aria-label="返回登录页" @click="returnToLogin">
          <span aria-hidden="true" />
        </button>
        <strong>企业配置</strong>
        <span aria-hidden="true" />
      </header>

      <main class="enterprise-config-main">
        <section class="enterprise-config-card">
          <button class="enterprise-edit-button" type="button">编辑</button>
          <label v-for="server in enterpriseServers" :key="server.id" class="enterprise-config-field">
            <input v-model="server.host" type="text" inputmode="decimal" />
          </label>
        </section>

        <button class="enterprise-add-button" type="button">添加</button>
      </main>

      <footer class="enterprise-config-footer">
        <button type="button" @click="returnToLogin">完成</button>
        <span aria-hidden="true" />
      </footer>
    </section>

    <template v-else>
      <DeviceMobileHeader
        v-if="!isInspectionPage && !isDefectPage && !isRepairPage"
        :title="currentPageTitle"
        :leading-label="isHeaderBackPage ? '返回上一页' : '打开设备菜单'"
        :trailing-label="headerActionLabel"
        :show-trailing="!isAboutPage"
        @leading="handleHeaderLeadingAction"
        @trailing="handleHeaderTrailingAction"
      >
        <template #leading>
          <img v-if="isHeaderBackPage" class="header-back-icon" src="/case-assets/device-health-management-platform/about-back.svg" alt="" aria-hidden="true" />
          <img
            v-else-if="activeTab === 'tasks'"
            class="tasks-menu-icon"
            src="/case-assets/device-health-management-platform/tasks/figma/menu.svg"
            alt=""
            aria-hidden="true"
          />
          <template v-else>
            <span />
            <span />
            <span />
          </template>
        </template>
        <template #trailing>
          <img :src="headerActionIcon" alt="" />
        </template>
      </DeviceMobileHeader>

    <div v-if="searchOpen && !isAboutPage" class="search-panel">
      <input v-model="searchQuery" type="search" placeholder="搜索设备、工单或告警" />
      <button type="button" @click="clearSearch">清空</button>
    </div>

    <main :key="currentMobilePage" class="mobile-main">
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

      <section v-else-if="activeTab === 'tasks'" class="tasks-page" aria-label="待办事项">
        <section class="tasks-header-banner" aria-label="待办概览">
          <img
            class="tasks-banner-art"
            src="/case-assets/device-health-management-platform/tasks/figma/banner-card-900.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <div class="tasks-banner-copy">
            <span>专注处理，高效执行</span>
            <strong>您有 <b>14</b> 项待办</strong>
            <small>
              <img src="/case-assets/device-health-management-platform/tasks/figma/banner-chip.svg" alt="" aria-hidden="true" />
              合理安排时间，保障稳定运行
            </small>
          </div>
        </section>

        <div class="tasks-tabs" aria-label="待办状态">
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

        <div class="tasks-search-filter" aria-label="搜索筛选任务">
          <label class="tasks-search-field">
            <img src="/case-assets/device-health-management-platform/tasks/figma/search.svg" alt="" aria-hidden="true" />
            <input v-model="taskSearchQuery" type="search" placeholder="搜索任务、设备或位置" />
          </label>
          <button class="tasks-filter-button" type="button">
            <img src="/case-assets/device-health-management-platform/tasks/figma/filter.svg" alt="" aria-hidden="true" />
            筛选
          </button>
        </div>

        <div class="tasks-list">
          <article
            v-for="task in visibleTasks"
            :key="task.id"
            class="figma-task-card"
            :class="`priority-${task.priority}`"
          >
            <div class="figma-task-card-main">
              <div class="figma-task-card-top">
                <span class="figma-task-device">
                  <img v-if="task.assetIcon" :src="task.assetIcon" alt="" aria-hidden="true" />
                  {{ task.asset }}
                </span>
                <span class="figma-priority-pill">
                  <img :src="task.priorityIcon" alt="" aria-hidden="true" />
                  {{ task.priorityLabel }}
                </span>
              </div>
              <strong>{{ task.title }}</strong>
              <div class="figma-task-meta">
                <span>
                  <img :src="task.timeIcon" alt="" aria-hidden="true" />
                  {{ task.deadline }}
                </span>
                <span>
                  <img :src="task.locationIcon" alt="" aria-hidden="true" />
                  {{ task.location }}
                </span>
              </div>
            </div>
            <div class="figma-task-card-footer">
              <div class="figma-assignee">
                <img v-if="task.assigneeAvatar" :src="task.assigneeAvatar" alt="" aria-hidden="true" />
                <span v-else :style="{ backgroundColor: task.avatarColor }">{{ task.assigneeInitials }}</span>
                <strong>{{ task.assignee }}</strong>
              </div>
              <div class="figma-task-actions">
                <span class="figma-task-state">
                  <i aria-hidden="true" />
                  {{ task.statusLabel }}
                </span>
                <button type="button">
                  {{ task.actionLabel }}
                  <img :src="task.arrowIcon" alt="" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section v-else-if="isInspectionPage" class="inspection-page" aria-label="点检管理">
        <article class="inspection-hero subpage-hero">
          <img
            class="inspection-page-bg subpage-hero-bg"
            src="/case-assets/device-health-management-platform/inspection-header-decoration-sharp.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <button class="inspection-back-button subpage-hero-back" type="button" aria-label="返回工作台" @click="handleHeaderLeadingAction">
            <img src="/case-assets/device-health-management-platform/about-back.svg" alt="" aria-hidden="true" />
          </button>
          <div class="inspection-hero-copy subpage-hero-copy">
            <strong>点检管理</strong>
            <span>高效巡检 · 智能管理</span>
          </div>

          <section class="inspection-profile-card" aria-label="当前用户">
            <img src="/case-assets/device-health-management-platform/profile-avatar-160.jpg" alt="" aria-hidden="true" />
            <div>
              <strong>曹兰</strong>
              <span>欢迎使用点检管理系统</span>
            </div>
          </section>
        </article>

        <section class="inspection-action-section" aria-label="点检操作">
          <button v-for="action in inspectionActions" :key="action.label" class="inspection-action-card" type="button">
            <span>
              <img
                :src="action.icon"
                :style="{ width: `${action.iconWidth}px`, height: `${action.iconHeight}px` }"
                alt=""
                aria-hidden="true"
              />
            </span>
            <strong>{{ action.label }}</strong>
          </button>
        </section>

        <button class="inspection-device-row" type="button">
          <span class="inspection-row-icon">
            <img
              :src="inspectionDeviceIcon"
              alt=""
              aria-hidden="true"
            />
          </span>
          <strong>本机信息</strong>
          <span class="inspection-row-chevron" aria-hidden="true" />
        </button>

        <section class="inspection-settings-card" aria-label="点检设置">
          <button
            v-for="setting in inspectionSettings"
            :key="setting.key"
            class="inspection-setting-row"
            type="button"
            :aria-pressed="setting.enabled"
            @click="setting.enabled = !setting.enabled"
          >
            <span class="inspection-row-icon">
              <img :src="setting.icon" alt="" aria-hidden="true" />
            </span>
            <span class="inspection-setting-copy">
              <strong>{{ setting.title }}</strong>
              <small>{{ setting.description }}</small>
            </span>
            <span class="inspection-switch" :class="{ active: setting.enabled }" aria-hidden="true">
              <i />
            </span>
          </button>
        </section>

        <span class="inspection-home-indicator" aria-hidden="true" />
      </section>

      <section v-else-if="isDefectPage" class="defect-page" aria-label="缺陷管理">
        <header class="defect-header subpage-hero">
          <img
            class="defect-header-bg subpage-hero-bg"
            src="/case-assets/device-health-management-platform/defect-header-decoration-sharp.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <button class="defect-back-button subpage-hero-back" type="button" aria-label="返回工作台" @click="handleHeaderLeadingAction">
            <img src="/case-assets/device-health-management-platform/about-back.svg" alt="" aria-hidden="true" />
          </button>
          <div class="defect-heading subpage-hero-copy">
            <strong>缺陷管理</strong>
            <span>异常速报 · 全程闭环</span>
          </div>

          <button class="defect-summary-card" type="button" aria-label="查看全部缺陷工单">
            <span class="defect-summary-icon" aria-hidden="true">
              <img :src="defectSummaryIcon" alt="" />
            </span>
            <span class="defect-summary-copy">
              <strong>{{ defectTickets.length }}</strong>
              <span>个缺陷工单</span>
              <small>
                全部状态
                <img :src="defectChevronIcon" alt="" aria-hidden="true" />
              </small>
            </span>
          </button>
        </header>

        <section class="defect-list" aria-label="缺陷工单列表">
          <article v-for="ticket in defectTickets" :key="ticket.id" class="defect-card" :class="`is-${ticket.status}`">
            <header>
              <span class="defect-card-icon" aria-hidden="true">
                <img :src="defectStatusIcons[ticket.status]" alt="" />
              </span>
              <strong>{{ ticket.asset }}</strong>
              <span class="defect-status" :class="`is-${ticket.status}`">{{ ticket.statusLabel }}</span>
            </header>

            <p>{{ ticket.description }}</p>

            <footer>
              <img :src="defectTimeIcon" alt="" aria-hidden="true" />
              <time>{{ ticket.time }}</time>
            </footer>
          </article>
        </section>

        <button class="defect-add-button" type="button" aria-label="新增缺陷工单">+</button>
        <span class="defect-home-indicator" aria-hidden="true" />
      </section>

      <section v-else-if="isRepairPage" class="repair-page" aria-label="检修管理">
        <header class="repair-header subpage-hero">
          <img
            class="repair-header-bg subpage-hero-bg"
            src="/case-assets/device-health-management-platform/repair-header-decoration-sharp.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <button class="repair-back-button subpage-hero-back" type="button" aria-label="返回工作台" @click="handleHeaderLeadingAction">
            <img src="/case-assets/device-health-management-platform/about-back.svg" alt="" aria-hidden="true" />
          </button>
          <div class="repair-heading subpage-hero-copy">
            <strong>检修管理</strong>
            <span>计划排程 · 精准消缺</span>
          </div>

          <button class="repair-summary-card" type="button" aria-label="查看全部检修工单">
            <span class="repair-summary-icon" aria-hidden="true">
              <img :src="repairSummaryIcon" alt="" />
            </span>
            <span class="repair-summary-copy">
              <strong>{{ repairOrderTotal }}</strong>
              <span>个检修工单</span>
              <small>
                全部状态
                <img :src="repairChevronIcon" alt="" aria-hidden="true" />
              </small>
            </span>
          </button>
        </header>

        <section class="repair-list" aria-label="检修工单列表">
          <article v-for="order in repairOrders" :key="order.id" class="repair-card" :class="`is-${order.status}`">
            <span class="repair-card-icon" aria-hidden="true">
              <img :src="repairStatusIcons[order.status]" alt="" />
            </span>

            <div class="repair-card-content">
              <header>
                <strong>{{ order.title }}</strong>
                <span class="repair-status" :class="`is-${order.status}`">{{ order.statusLabel }}</span>
              </header>

              <p>{{ order.description }}</p>

              <footer>
                <img :src="repairTimeIcon" alt="" aria-hidden="true" />
                <time>{{ order.time }}</time>
              </footer>
            </div>
          </article>
        </section>

        <button class="repair-add-button" type="button" aria-label="新增检修工单">+</button>
        <span class="repair-home-indicator" aria-hidden="true" />
      </section>

      <section v-else-if="isWorkbenchVisiblePage" class="workbench-page">
        <article class="workbench-hero">
          <img
            class="workbench-hero-bg"
            src="/case-assets/device-health-management-platform/workbench/banner-900.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <div>
            <span>欢迎回来，运维工程师</span>
            <strong>运维工作台</strong>
            <small>
              <img src="/case-assets/device-health-management-platform/workbench/banner-chip.svg" alt="" aria-hidden="true" />
              高效管理设备全生命周期，保障运行稳定
            </small>
          </div>
        </article>

        <section v-for="section in workbenchSections" :key="section.title" class="workbench-section">
          <header>
            <span>
              <img
                :src="section.icon"
                :style="{ width: `${section.iconWidth}px`, height: `${section.iconHeight}px` }"
                alt=""
                aria-hidden="true"
              />
              {{ section.title }}
            </span>
            <small>{{ section.caption }}</small>
          </header>

          <div class="workbench-entry-grid">
            <button
              v-for="entry in section.entries"
              :key="entry.label"
              type="button"
              :class="{ active: entry.key !== undefined && activeWorkbenchEntryKey === entry.key }"
              @click="handleWorkbenchEntryClick(entry.key)"
            >
              <span class="workbench-entry-icon">
                <img
                  :src="entry.icon"
                  :style="{ width: `${entry.iconWidth}px`, height: `${entry.iconHeight}px` }"
                  alt=""
                  aria-hidden="true"
                />
              </span>
              <strong>{{ entry.label }}</strong>
              <small>{{ entry.desc }}</small>
            </button>
          </div>
        </section>
      </section>

      <section v-else-if="isPlaceholderPage" class="preview-placeholder-page" aria-label="页面占位">
        <article>
          <span>{{ activePlaceholderContent.label }}</span>
          <h2>{{ activePlaceholderContent.title }}</h2>
          <p>{{ activePlaceholderContent.description }}</p>
          <small>页面结构已预留，后续按设计稿继续补齐。</small>
        </article>
      </section>

      <section v-else-if="isNotificationsPage" class="notifications-page" aria-label="消息中心">
        <div class="notifications-list">
          <button
            v-for="message in notificationMessages"
            :key="message.id"
            class="notification-card"
            type="button"
            @click="openNotificationDetail(message)"
          >
            <span class="notification-icon">
              <img :src="message.icon" alt="" aria-hidden="true" />
            </span>
            <div class="notification-copy">
              <div class="notification-row">
                <div class="notification-title-line">
                  <strong>{{ message.title }}</strong>
                  <i v-if="message.unread" class="notification-dot" aria-hidden="true" />
                  <span v-if="message.important" class="notification-important">
                    <img src="/case-assets/device-health-management-platform/notifications/figma/important.svg" alt="" aria-hidden="true" />
                    重要
                  </span>
                </div>
                <time>{{ message.date }}</time>
              </div>
              <p>{{ message.description }}</p>
            </div>
          </button>
        </div>

        <div class="notifications-bottom-action">
          <button type="button" @click="returnFromNotifications">完成</button>
        </div>
      </section>

      <section v-else-if="isAboutPage" class="about-system-page" aria-label="关于系统">
        <div class="about-system-body">
          <section class="about-logo-section">
            <div class="about-app-icon">
              <span>
                <img src="/case-assets/device-health-management-platform/about-app-symbol.svg" alt="" aria-hidden="true" />
              </span>
            </div>
          </section>

          <h2>设备健康管理</h2>
          <p>Version 1.0.0</p>

          <section class="about-menu-card" aria-label="系统菜单">
            <button type="button" class="about-menu-row">
              <strong>检查新版本</strong>
              <span>
                已是最新版本
                <img src="/case-assets/device-health-management-platform/about-chevron-wide.svg" alt="" aria-hidden="true" />
              </span>
            </button>
            <button type="button" class="about-menu-row">
              <strong>用户服务协议</strong>
              <img src="/case-assets/device-health-management-platform/about-chevron.svg" alt="" aria-hidden="true" />
            </button>
            <button type="button" class="about-menu-row">
              <strong>隐私保护政策</strong>
              <img src="/case-assets/device-health-management-platform/about-chevron.svg" alt="" aria-hidden="true" />
            </button>
          </section>
        </div>

        <footer class="about-footer">Copyright © 2026-2026 ****. All Rights Reserved.</footer>
      </section>

      <section v-else class="profile-page">
        <article class="profile-hero-card">
          <img
            class="profile-card-decoration"
            src="/case-assets/device-health-management-platform/profile-card-decoration.svg"
            alt=""
            aria-hidden="true"
          />
          <div class="profile-user-row">
            <span class="profile-avatar-wrap">
              <img
                class="profile-avatar"
                src="/case-assets/device-health-management-platform/profile-avatar-160.jpg"
                alt=""
                width="160"
                height="160"
                loading="lazy"
                decoding="async"
              />
            </span>
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
          <div
            v-for="row in profileSettings"
            :key="row.key"
            class="profile-setting-row"
            :data-setting-key="row.key"
            :class="{ 'is-clickable': row.key !== 'compatible' }"
            :role="row.key !== 'compatible' ? 'button' : undefined"
            :tabindex="row.key !== 'compatible' ? 0 : undefined"
            @click="handleProfileSetting(row.key)"
            @keydown.enter.prevent="handleProfileSetting(row.key)"
          >
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

    <div
      v-if="isNotificationsPage && activeNotification"
      class="notification-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-detail-title"
      @click.self="closeNotificationDetail"
    >
      <article class="notification-detail-dialog">
        <header class="notification-detail-heading">
          <strong id="notification-detail-title">消息详情</strong>
          <span v-if="activeNotification.important" class="notification-important">
            <img src="/case-assets/device-health-management-platform/notifications/figma/important.svg" alt="" aria-hidden="true" />
            重要
          </span>
        </header>

        <dl class="notification-detail-content">
          <div>
            <dt>主题：</dt>
            <dd>{{ activeNotification.title }}</dd>
          </div>
          <div>
            <dt>内容：</dt>
            <dd>{{ activeNotification.description }}</dd>
          </div>
          <div>
            <dt>时间：</dt>
            <dd>{{ notificationDetailTime }}</dd>
          </div>
        </dl>

        <button type="button" @click="closeNotificationDetail">关闭</button>
      </article>
    </div>

    <nav v-if="!isAboutPage && !isNotificationsPage && !isInspectionPage && !isDefectPage && !isRepairPage" class="mobile-tabbar" aria-label="设备健康 APP 导航">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        :class="{ active: isMobileTabActive(tab.key) }"
        @click="setActiveTab(tab.key)"
      >
        <img :src="isMobileTabActive(tab.key) ? tab.activeIcon : tab.icon" alt="" aria-hidden="true" />
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
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { rafThrottle } from '@/utils/performance'
import DeviceMobileHeader from '@/cases/device-health-management-platform/DeviceMobileHeader.vue'
import DeviceSelectDropdown from '@/cases/device-health-management-platform/DeviceSelectDropdown.vue'

type TabKey = 'home' | 'tasks' | 'workbench' | 'profile'
type PlaceholderPageKey = 'inspection' | 'defect' | 'repair'
type AuxiliaryPageKey = 'notifications'
type MobileContentKey = TabKey | PlaceholderPageKey | AuxiliaryPageKey
type PreviewPageKey = MobileContentKey | 'login'
type DevicePanelPageKey = Exclude<PreviewPageKey, AuxiliaryPageKey>
type HealthModeKey = 'stable' | 'observe' | 'risk'
type TaskFilterKey = 'pending' | 'inProgress' | 'done'
type TaskPriorityKey = 'urgent' | 'normal' | 'low'
type StatusKey = 'running' | 'warning' | 'offline'
type DefectStatusKey = 'pending' | 'new'
type RepairStatusKey = 'pending' | 'new' | 'processing' | 'dispatch'
type ProfileSubpageKey = 'main' | 'about'
type WorkbenchEntryKey = PlaceholderPageKey | 'equipment'
type LoginSubpageKey = 'login' | 'enterpriseConfig'

type NotificationMessage = {
  id: string
  title: string
  date: string
  description: string
  icon: string
  unread?: boolean
  important?: boolean
}

type TaskItem = {
  id: string
  asset: string
  assetIcon?: string
  priority: TaskPriorityKey
  priorityLabel: string
  priorityIcon: string
  title: string
  deadline: string
  timeIcon: string
  location: string
  locationIcon: string
  assignee: string
  assigneeInitials?: string
  assigneeAvatar?: string
  avatarColor: string
  status: TaskFilterKey
  statusLabel: string
  actionLabel: string
  arrowIcon: string
}

type WorkbenchEntry = {
  key?: WorkbenchEntryKey
  label: string
  desc: string
  icon: string
  iconWidth: number
  iconHeight: number
}

type InspectionAction = {
  label: string
  icon: string
  iconWidth: number
  iconHeight: number
}

type InspectionSetting = {
  key: 'workMode' | 'autoDevice' | 'autoItem'
  title: string
  description: string
  icon: string
  enabled: boolean
}

type DefectTicket = {
  id: string
  asset: string
  status: DefectStatusKey
  statusLabel: string
  description: string
  time: string
}

type RepairOrder = {
  id: string
  title: string
  status: RepairStatusKey
  statusLabel: string
  description: string
  time: string
}

type WorkbenchSection = {
  title: string
  caption: string
  icon: string
  iconWidth: number
  iconHeight: number
  entries: WorkbenchEntry[]
}

const tabKeys: TabKey[] = ['home', 'tasks', 'workbench', 'profile']
const initialTab = getInitialTab()
const props = defineProps<{ previewPage?: PreviewPageKey }>()
const emit = defineEmits<{
  'page-change': [page: DevicePanelPageKey]
}>()

const statIcons: Record<string, string> = {
  total: '/case-assets/device-health-management-platform/stat-total.svg',
  online: '/case-assets/device-health-management-platform/stat-online.svg',
  warning: '/case-assets/device-health-management-platform/stat-warning.svg',
  task: '/case-assets/device-health-management-platform/stat-task.svg',
}

const defectStatusIcons: Record<DefectStatusKey, string> = {
  pending: '/case-assets/device-health-management-platform/defect/figma/defect-card-pending.svg',
  new: '/case-assets/device-health-management-platform/defect/figma/defect-card-new.svg',
}
const defectSummaryIcon = '/case-assets/device-health-management-platform/defect/figma/defect-summary.svg'
const defectChevronIcon = '/case-assets/device-health-management-platform/defect/figma/defect-chevron-down.svg'
const defectTimeIcon = '/case-assets/device-health-management-platform/defect/figma/defect-time.svg'

const repairStatusIcons: Record<RepairStatusKey, string> = {
  pending: '/case-assets/device-health-management-platform/repair/figma/repair-order-pending.svg',
  new: '/case-assets/device-health-management-platform/repair/figma/repair-order-new.svg',
  processing: '/case-assets/device-health-management-platform/repair/figma/repair-order-processing.svg',
  dispatch: '/case-assets/device-health-management-platform/repair/figma/repair-order-dispatch.svg',
}
const repairSummaryIcon = '/case-assets/device-health-management-platform/repair/figma/repair-summary.svg'
const repairChevronIcon = '/case-assets/device-health-management-platform/repair/figma/repair-chevron-down.svg'
const repairTimeIcon = '/case-assets/device-health-management-platform/repair/figma/repair-time.svg'

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
    activeIcon: '/case-assets/device-health-management-platform/tasks/figma/tab-task-active.svg',
  },
  {
    key: 'workbench',
    label: '工作台',
    icon: '/case-assets/device-health-management-platform/tab-workbench.svg',
    activeIcon: '/case-assets/device-health-management-platform/tab-workbench-active.svg',
  },
  {
    key: 'profile',
    label: '我的',
    icon: '/case-assets/device-health-management-platform/tab-profile.svg',
    activeIcon: '/case-assets/device-health-management-platform/tab-profile-active.svg',
  },
]

const enterpriseOptions = [
  { label: '企业名称 1', value: 'enterprise-1' },
  { label: '企业名称 2', value: 'enterprise-2' },
]

const enterpriseServers = reactive([
  { id: 'primary', host: '121.199.7.47' },
  { id: 'backup', host: '121.199.7.47' },
])

const activeTab = ref<MobileContentKey>(initialTab)
const previousNotificationPage = ref<MobileContentKey>(initialTab)
const profileSubpage = ref<ProfileSubpageKey>('main')
const loginSubpage = ref<LoginSubpageKey>('login')
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
const activeTaskFilter = ref<TaskFilterKey>('pending')
const taskSearchQuery = ref('')
const compatibilityMode = ref(true)
const activeNotification = ref<NotificationMessage | null>(null)
const mobileDemoRef = ref<HTMLElement | null>(null)
const scrollHintSelector = [
  '.mobile-main',
  '.notifications-list',
  '.defect-list',
  '.repair-list',
  '.enterprise-config-main',
].join(',')
const scrollHintContainers = new Set<HTMLElement>()
const scrollHintCleanups: Array<() => void> = []
let scrollHintSetupFrame = 0
let scrollHintIndicatorTimer = 0

const inspectionActions: InspectionAction[] = [
  {
    label: '上传',
    icon: '/case-assets/device-health-management-platform/inspection/figma/inspection-upload.svg',
    iconWidth: 48,
    iconHeight: 48,
  },
  {
    label: '下载',
    icon: '/case-assets/device-health-management-platform/inspection/figma/inspection-download.svg',
    iconWidth: 48,
    iconHeight: 48,
  },
  {
    label: '设置',
    icon: '/case-assets/device-health-management-platform/inspection/figma/inspection-settings.svg',
    iconWidth: 48,
    iconHeight: 48,
  },
]

const inspectionDeviceIcon = '/case-assets/device-health-management-platform/inspection/figma/inspection-device.svg'

const inspectionSettings = reactive<InspectionSetting[]>([
  {
    key: 'workMode',
    title: '工作模式',
    description: '开启后进入工作模式',
    icon: '/case-assets/device-health-management-platform/inspection/figma/inspection-work-mode.svg',
    enabled: false,
  },
  {
    key: 'autoDevice',
    title: '自动跳转设备',
    description: '开启后巡检完成自动跳转下一个设备',
    icon: '/case-assets/device-health-management-platform/inspection/figma/inspection-auto-device.svg',
    enabled: true,
  },
  {
    key: 'autoItem',
    title: '自动跳转巡检项',
    description: '开启后巡检完成自动跳转下一个巡检项',
    icon: '/case-assets/device-health-management-platform/inspection/figma/inspection-auto-item.svg',
    enabled: false,
  },
])

const defectTickets: DefectTicket[] = [
  {
    id: 'd1',
    asset: '顶级综合设备',
    status: 'pending',
    statusLabel: '待处理',
    description: '缺陷内容描述最多显示两行，超过两行用省略号... 缺陷内容描述最多显示两行，用省略号...',
    time: '2026-10-02 15:38:45',
  },
  {
    id: 'd2',
    asset: '五级设备',
    status: 'new',
    statusLabel: '新建',
    description: '这是缺陷内容描述最多显示两行，超过两行用省略号...',
    time: '2026-10-01 15:38:45',
  },
  {
    id: 'd3',
    asset: '五级设备',
    status: 'new',
    statusLabel: '新建',
    description: '这是缺陷内容描述最多显示两行，超过两行用省略号...',
    time: '2026-09-20 15:38:45',
  },
]

const repairOrderTotal = 6
const repairOrders: RepairOrder[] = [
  {
    id: 'r1',
    title: '检修工单',
    status: 'pending',
    statusLabel: '待处理',
    description: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述...',
    time: '2026-10-02 15:38:45',
  },
  {
    id: 'r2',
    title: '检修工单',
    status: 'new',
    statusLabel: '新建',
    description: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述...',
    time: '2026-10-02 15:38:45',
  },
  {
    id: 'r3',
    title: '检修工单',
    status: 'processing',
    statusLabel: '处理中',
    description: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述...',
    time: '2026-10-02 15:38:45',
  },
  {
    id: 'r4',
    title: '检修工单',
    status: 'dispatch',
    statusLabel: '待派发',
    description: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述...',
    time: '2026-10-02 15:38:45',
  },
]

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

const notificationMessages: NotificationMessage[] = [
  {
    id: 'transfer-1009',
    title: '调拨单系统消息',
    date: '2026-10-09',
    description: '您有一条调拨单待审批，请及时前往处理！',
    icon: '/case-assets/device-health-management-platform/notifications/figma/transfer.svg',
    unread: true,
  },
  {
    id: 'transfer-1002',
    title: '调拨单系统消息',
    date: '2026-10-02',
    description: '您有一条调拨单待审批，请及时前往处理！',
    icon: '/case-assets/device-health-management-platform/notifications/figma/transfer.svg',
    unread: true,
  },
  {
    id: 'inbound-0902',
    title: '入库单系统消息',
    date: '2026-09-02',
    description: '您有一条入库单待审批，请及时前往处理！',
    icon: '/case-assets/device-health-management-platform/notifications/figma/inbound.svg',
    unread: true,
    important: true,
  },
  {
    id: 'inbound-0901',
    title: '入库单系统消息',
    date: '2026-09-01',
    description: '您有一条入库单待审批，请及时前往处理！',
    icon: '/case-assets/device-health-management-platform/notifications/figma/inbound.svg',
    important: true,
  },
  {
    id: 'transfer-0802',
    title: '调拨单系统消息',
    date: '2026-08-02',
    description: '您有一条调拨单待审批，请及时前往处理！',
    icon: '/case-assets/device-health-management-platform/notifications/figma/transfer.svg',
    unread: true,
  },
]

const taskFilters: Array<{ key: TaskFilterKey; label: string }> = [
  { key: 'pending', label: '待处理' },
  { key: 'inProgress', label: '进行中' },
  { key: 'done', label: '已处理' },
]

const tasks = reactive<TaskItem[]>([
  {
    id: 'bearing-replacement',
    asset: '空调机组 A-12',
    assetIcon: '/case-assets/device-health-management-platform/tasks/figma/card1-device.svg',
    priority: 'urgent',
    priorityLabel: '紧急',
    priorityIcon: '/case-assets/device-health-management-platform/tasks/figma/card1-priority.svg',
    title: '轴承更换',
    deadline: '今日截止, 14:00',
    timeIcon: '/case-assets/device-health-management-platform/tasks/figma/card1-time.svg',
    location: 'Alpha 设备 - 7 区',
    locationIcon: '/case-assets/device-health-management-platform/tasks/figma/card1-location.svg',
    assignee: '张师傅',
    assigneeInitials: 'JS',
    avatarColor: '#0057ff',
    status: 'pending',
    statusLabel: '待处理',
    actionLabel: '去处理',
    arrowIcon: '/case-assets/device-health-management-platform/tasks/figma/card-arrow.svg',
  },
  {
    id: 'belt-lubrication',
    asset: '输送带 B',
    priority: 'normal',
    priorityLabel: '普通',
    priorityIcon: '/case-assets/device-health-management-platform/tasks/figma/card2-priority.svg',
    title: '常规润滑',
    deadline: '明天, 09:00',
    timeIcon: '/case-assets/device-health-management-platform/tasks/figma/card2-time.svg',
    location: 'Beta 生产线 - 2 区',
    locationIcon: '/case-assets/device-health-management-platform/tasks/figma/card2-location.svg',
    assignee: '李师傅',
    assigneeAvatar: '/case-assets/device-health-management-platform/tasks/figma/card2-avatar.svg',
    avatarColor: '#2563eb',
    status: 'pending',
    statusLabel: '待处理',
    actionLabel: '去处理',
    arrowIcon: '/case-assets/device-health-management-platform/tasks/figma/card2-arrow.svg',
  },
  {
    id: 'power-quarterly-check',
    asset: '主配电盘',
    assetIcon: '/case-assets/device-health-management-platform/tasks/figma/card3-device.svg',
    priority: 'low',
    priorityLabel: '低级',
    priorityIcon: '/case-assets/device-health-management-platform/tasks/figma/card3-priority.svg',
    title: '季度检查',
    deadline: '2026年10月15日',
    timeIcon: '/case-assets/device-health-management-platform/tasks/figma/card3-time.svg',
    location: '配电室 - 主楼',
    locationIcon: '/case-assets/device-health-management-platform/tasks/figma/card3-location.svg',
    assignee: '王师傅',
    assigneeInitials: 'MR',
    avatarColor: '#2563eb',
    status: 'pending',
    statusLabel: '待处理',
    actionLabel: '去处理',
    arrowIcon: '/case-assets/device-health-management-platform/tasks/figma/card3-arrow.svg',
  },
  {
    id: 'cooling-tower-level',
    asset: '冷却塔 T-05',
    assetIcon: '/case-assets/device-health-management-platform/tasks/figma/card4-device.svg',
    priority: 'normal',
    priorityLabel: '普通',
    priorityIcon: '/case-assets/device-health-management-platform/tasks/figma/card4-priority.svg',
    title: '水位过低',
    deadline: '2026年10月16日',
    timeIcon: '/case-assets/device-health-management-platform/tasks/figma/card4-time.svg',
    location: '屋顶平台 - 冷却塔区',
    locationIcon: '/case-assets/device-health-management-platform/tasks/figma/card4-location.svg',
    assignee: '徐师傅',
    assigneeInitials: 'XC',
    avatarColor: '#3b82f6',
    status: 'pending',
    statusLabel: '待处理',
    actionLabel: '去处理',
    arrowIcon: '/case-assets/device-health-management-platform/tasks/figma/card4-arrow.svg',
  },
])

const workbenchSections: WorkbenchSection[] = [
  {
    title: '设备管理',
    caption: '设备全生命周期管理',
    icon: '/case-assets/device-health-management-platform/workbench/figma/section-equipment.svg',
    iconWidth: 16,
    iconHeight: 14,
    entries: [
      {
        key: 'equipment',
        label: '设备管理',
        desc: '设备台账总览',
        icon: '/case-assets/device-health-management-platform/workbench/figma/equipment-ledger.svg',
        iconWidth: 20,
        iconHeight: 17.5,
      },
      {
        key: 'inspection',
        label: '点检管理',
        desc: '点检计划与执行',
        icon: '/case-assets/device-health-management-platform/workbench/figma/inspection-manage.svg',
        iconWidth: 15,
        iconHeight: 20,
      },
      {
        key: 'defect',
        label: '缺陷管理',
        desc: '缺陷上报与跟踪',
        icon: '/case-assets/device-health-management-platform/workbench/figma/defect-manage.svg',
        iconWidth: 20,
        iconHeight: 17.5,
      },
      {
        key: 'repair',
        label: '检修管理',
        desc: '检修计划与记录',
        icon: '/case-assets/device-health-management-platform/workbench/figma/repair-manage.svg',
        iconWidth: 20,
        iconHeight: 20,
      },
    ],
  },
  {
    title: '点检作业',
    caption: '现场点检与工单处理',
    icon: '/case-assets/device-health-management-platform/workbench/figma/section-inspection.svg',
    iconWidth: 10,
    iconHeight: 16,
    entries: [
      {
        label: '日常巡检',
        desc: '巡检任务执行',
        icon: '/case-assets/device-health-management-platform/workbench/figma/daily-inspection.svg',
        iconWidth: 14.75,
        iconHeight: 20,
      },
      {
        label: '临时测量',
        desc: '现场数据采集',
        icon: '/case-assets/device-health-management-platform/workbench/figma/temporary-measure.svg',
        iconWidth: 20,
        iconHeight: 20,
      },
      {
        label: '工单处理',
        desc: '工单受理与处理',
        icon: '/case-assets/device-health-management-platform/workbench/figma/work-order.svg',
        iconWidth: 15,
        iconHeight: 20,
      },
      {
        label: '任务分派',
        desc: '任务分配与跟踪',
        icon: '/case-assets/device-health-management-platform/workbench/figma/task-dispatch.svg',
        iconWidth: 20,
        iconHeight: 20,
      },
    ],
  },
  {
    title: '数据记录',
    caption: '数据分析与记录追溯',
    icon: '/case-assets/device-health-management-platform/workbench/figma/section-data.svg',
    iconWidth: 16,
    iconHeight: 14,
    entries: [
      {
        label: '历史数据',
        desc: '历史数据查询',
        icon: '/case-assets/device-health-management-platform/workbench/figma/history-data.svg',
        iconWidth: 20,
        iconHeight: 20,
      },
      {
        label: '本地数据',
        desc: '本地文件管理',
        icon: '/case-assets/device-health-management-platform/workbench/figma/local-data.svg',
        iconWidth: 22.5,
        iconHeight: 17.5,
      },
      {
        label: '趋势报表',
        desc: '数据趋势分析',
        icon: '/case-assets/device-health-management-platform/workbench/figma/trend-report.svg',
        iconWidth: 20,
        iconHeight: 17.5,
      },
      {
        label: '告警记录',
        desc: '告警事件记录',
        icon: '/case-assets/device-health-management-platform/workbench/figma/alarm-record.svg',
        iconWidth: 17.5,
        iconHeight: 20,
      },
    ],
  },
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

const placeholderPages: Record<PlaceholderPageKey, { label: string; title: string; description: string }> = {
  inspection: {
    label: '点检管理',
    title: '点检计划与现场执行',
    description: '用于承载点检计划、扫码巡检、异常记录和现场照片上传流程。',
  },
  defect: {
    label: '缺陷管理',
    title: '缺陷上报与跟踪闭环',
    description: '用于承载缺陷登记、风险等级、责任人流转和处理进度。',
  },
  repair: {
    label: '检修管理',
    title: '检修计划与记录沉淀',
    description: '用于承载检修计划、工单执行、备件记录和历史追溯。',
  },
}

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

const isAboutPage = computed(() => activeTab.value === 'profile' && profileSubpage.value === 'about')
const isNotificationsPage = computed(() => activeTab.value === 'notifications')
const isInspectionPage = computed(() => activeTab.value === 'inspection')
const isDefectPage = computed(() => activeTab.value === 'defect')
const isRepairPage = computed(() => activeTab.value === 'repair')
const isHeaderBackPage = computed(
  () => isAboutPage.value || isNotificationsPage.value || isInspectionPage.value || isDefectPage.value || isRepairPage.value,
)
const isWorkbenchSubpage = computed(
  () => activeTab.value === 'inspection' || activeTab.value === 'defect' || activeTab.value === 'repair',
)
const isWorkbenchVisiblePage = computed(() => activeTab.value === 'workbench')
const activeWorkbenchEntryKey = computed<WorkbenchEntryKey | undefined>(() =>
  isWorkbenchSubpage.value ? (activeTab.value as PlaceholderPageKey) : undefined,
)
const currentPageTitle = computed(() => {
  if (isAboutPage.value) {
    return '关于系统'
  }

  if (isNotificationsPage.value) {
    return '消息中心'
  }

  if (isInspectionPage.value) {
    return '点检管理'
  }

  if (isDefectPage.value) {
    return '缺陷管理'
  }

  if (isRepairPage.value) {
    return '检修管理'
  }

  if (activeTab.value === 'home') {
    return '设备健康管理'
  }

  if (activeTab.value === 'profile') {
    return '我的'
  }

  if (activeTab.value === 'tasks') {
    return '待办事项'
  }

  if (isWorkbenchVisiblePage.value) {
    return '工作台'
  }

  return tabs.find((tab) => tab.key === activeTab.value)?.label ?? activePlaceholderContent.value.label
})
const isPlaceholderPage = computed(() => false)
const activePlaceholderContent = computed(() => {
  if (activeTab.value === 'repair') {
    return placeholderPages[activeTab.value]
  }

  return {
    label: '设备健康',
    title: '页面占位',
    description: '该页面结构已预留。',
  }
})
const currentMobilePage = computed(() => {
  if (!isAuthenticated.value) {
    return loginSubpage.value === 'enterpriseConfig' ? 'enterprise-config' : 'login'
  }

  if (isAboutPage.value) {
    return 'about'
  }

  if (isNotificationsPage.value) {
    return 'notifications'
  }

  if (isInspectionPage.value) {
    return 'inspection'
  }

  if (isDefectPage.value) {
    return 'defect'
  }

  if (isRepairPage.value) {
    return 'repair'
  }

  return isWorkbenchSubpage.value ? 'workbench' : activeTab.value
})
const headerActionIcon = computed(() =>
  isNotificationsPage.value
    ? '/case-assets/device-health-management-platform/notifications/figma/header-action.svg'
    : activeTab.value === 'tasks'
    ? '/case-assets/device-health-management-platform/tasks/figma/bell.svg'
    : activeTab.value === 'profile'
      ? '/case-assets/device-health-management-platform/profile-search.svg'
      : '/case-assets/device-health-management-platform/notification-bell.svg',
)
const headerActionLabel = computed(() =>
  isNotificationsPage.value ? '消息设置' : activeTab.value === 'profile' ? '搜索' : '查看通知',
)
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
  const keyword = taskSearchQuery.value.trim()

  return tasks.filter((task) => {
    const matchesFilter = task.status === activeTaskFilter.value
    const matchesSearch =
      !keyword ||
      `${task.asset}${task.priorityLabel}${task.title}${task.deadline}${task.location}${task.assignee}`.includes(keyword)

    return matchesFilter && matchesSearch
  })
})
const notificationDetailTime = computed(() => `${activeNotification.value?.date ?? ''} 15:38:45`)

function updateScrollHintState(container: HTMLElement) {
  const maxScrollTop = container.scrollHeight - container.clientHeight
  const hasScrollableContent = maxScrollTop > 1
  const canScrollUp = hasScrollableContent && container.scrollTop > 1
  const canScrollDown = hasScrollableContent && container.scrollTop < maxScrollTop - 1

  container.classList.toggle('has-scroll-overflow', hasScrollableContent)
  container.classList.toggle('can-scroll-up', canScrollUp)
  container.classList.toggle('can-scroll-down', canScrollDown)

  if (!hasScrollableContent) {
    container.classList.remove('show-scroll-indicator')
  }
}

function makeScrollHintUpdater(container: HTMLElement) {
  const update = rafThrottle(() => updateScrollHintState(container))
  return {
    update,
    cancel: update.cancel,
  }
}

function teardownScrollHints() {
  if (scrollHintSetupFrame) {
    window.cancelAnimationFrame(scrollHintSetupFrame)
    scrollHintSetupFrame = 0
  }

  if (scrollHintIndicatorTimer) {
    window.clearTimeout(scrollHintIndicatorTimer)
    scrollHintIndicatorTimer = 0
  }

  scrollHintCleanups.splice(0).forEach((cleanup) => cleanup())
  scrollHintContainers.forEach((container) => {
    container.classList.remove(
      'scroll-hint-surface',
      'has-scroll-overflow',
      'can-scroll-up',
      'can-scroll-down',
      'show-scroll-indicator',
    )
  })
  scrollHintContainers.clear()
}

function setupScrollHints() {
  teardownScrollHints()

  const root = mobileDemoRef.value

  if (!root) {
    return
  }

  const containers = Array.from(root.querySelectorAll<HTMLElement>(scrollHintSelector)).filter((container) => {
    const style = window.getComputedStyle(container)

    return style.overflowY === 'auto' || style.overflowY === 'scroll' || style.overflow === 'auto' || style.overflow === 'scroll'
  })

  containers.forEach((container) => {
    const { update, cancel } = makeScrollHintUpdater(container)
    const resizeObserver = new ResizeObserver(update)
    const mutationObserver = new MutationObserver(update)

    container.classList.add('scroll-hint-surface', 'show-scroll-indicator')
    scrollHintContainers.add(container)
    container.addEventListener('scroll', update, { passive: true })
    resizeObserver.observe(container)
    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    })
    update()

    scrollHintCleanups.push(() => {
      cancel()
      container.removeEventListener('scroll', update)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    })
  })

  const updateAll = rafThrottle(() => scrollHintContainers.forEach(updateScrollHintState))

  window.addEventListener('resize', updateAll, { passive: true })
  scrollHintCleanups.push(() => {
    updateAll.cancel()
    window.removeEventListener('resize', updateAll)
  })

  const firstSettleTimer = window.setTimeout(updateAll, 120)
  const secondSettleTimer = window.setTimeout(updateAll, 480)
  scrollHintIndicatorTimer = window.setTimeout(() => {
    scrollHintContainers.forEach((container) => container.classList.remove('show-scroll-indicator'))
    scrollHintIndicatorTimer = 0
  }, 1500)
  scrollHintCleanups.push(() => {
    window.clearTimeout(firstSettleTimer)
    window.clearTimeout(secondSettleTimer)
  })
}

function scheduleScrollHintSetup() {
  if (scrollHintSetupFrame) {
    window.cancelAnimationFrame(scrollHintSetupFrame)
  }

  scrollHintSetupFrame = window.requestAnimationFrame(() => {
    scrollHintSetupFrame = 0
    setupScrollHints()
  })
}

function resetCurrentScrollPosition() {
  const root = mobileDemoRef.value

  if (!root) {
    return
  }

  root.querySelectorAll<HTMLElement>(scrollHintSelector).forEach((container) => {
    container.scrollTop = 0
    container.scrollLeft = 0
  })
}

onMounted(() => {
  nextTick(() => {
    resetCurrentScrollPosition()
    scheduleScrollHintSetup()
  })
})

onBeforeUnmount(() => {
  teardownScrollHints()
})

watch(
  () => props.previewPage,
  (page) => {
    applyPreviewPage(page)
  },
  { immediate: true },
)

watch(
  currentMobilePage,
  () => {
    nextTick(() => {
      resetCurrentScrollPosition()
      scheduleScrollHintSetup()
    })
  },
  { flush: 'post' },
)

watch(
  activeNotification,
  () => {
    nextTick(scheduleScrollHintSetup)
  },
  { flush: 'post' },
)

function setActiveTab(tab: TabKey) {
  activeTab.value = tab
  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false
  emit('page-change', tab)
}

function isMobileTabActive(tab: TabKey) {
  return activeTab.value === tab || (tab === 'workbench' && isWorkbenchSubpage.value)
}

function handleWorkbenchEntryClick(entryKey?: WorkbenchEntryKey) {
  if (!entryKey) {
    return
  }

  const nextPage = entryKey === 'equipment' ? 'workbench' : entryKey

  activeTab.value = nextPage
  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false
  emit('page-change', nextPage)
}

function handleLogin() {
  isAuthenticated.value = true
  loginSubpage.value = 'login'
  activeTab.value = 'home'
  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false
  emit('page-change', 'home')
}

function handleLogout() {
  isAuthenticated.value = false
  loginSubpage.value = 'login'
  activeTab.value = 'home'
  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false
  emit('page-change', 'login')
}

function handleHeaderLeadingAction() {
  if (isNotificationsPage.value) {
    returnFromNotifications()
    return
  }

  if (isAboutPage.value) {
    profileSubpage.value = 'main'
    searchOpen.value = false
    return
  }

  if (isInspectionPage.value) {
    activeTab.value = 'workbench'
    searchOpen.value = false
    emit('page-change', 'workbench')
    return
  }

  if (isDefectPage.value) {
    activeTab.value = 'workbench'
    searchOpen.value = false
    emit('page-change', 'workbench')
    return
  }

  if (isRepairPage.value) {
    activeTab.value = 'workbench'
    searchOpen.value = false
    emit('page-change', 'workbench')
    return
  }

  menuOpen.value = !menuOpen.value
}

function handleHeaderTrailingAction() {
  if (isNotificationsPage.value) {
    return
  }

  if (activeTab.value === 'profile') {
    searchOpen.value = !searchOpen.value
    return
  }

  openNotifications()
}

function openNotifications() {
  previousNotificationPage.value = activeTab.value
  activeTab.value = 'notifications'
  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false
  activeNotification.value = null
}

function returnFromNotifications() {
  activeTab.value = previousNotificationPage.value === 'notifications' ? 'home' : previousNotificationPage.value
  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false
  activeNotification.value = null
}

function openNotificationDetail(message: NotificationMessage) {
  activeNotification.value = message
}

function closeNotificationDetail() {
  activeNotification.value = null
}

function handleProfileSetting(key: string) {
  if (key !== 'about') {
    return
  }

  profileSubpage.value = 'about'
  searchOpen.value = false
}

function applyPreviewPage(page?: PreviewPageKey) {
  if (!page) {
    return
  }

  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false

  if (page === 'login') {
    isAuthenticated.value = false
    loginSubpage.value = 'login'
    activeTab.value = 'home'
    return
  }

  isAuthenticated.value = true
  loginSubpage.value = 'login'
  activeTab.value = page
}

function openEnterpriseConfig() {
  loginSubpage.value = 'enterpriseConfig'
}

function returnToLogin() {
  loginSubpage.value = 'login'
}

function cycleHealthMode() {
  const index = healthModes.findIndex((mode) => mode.key === activeHealthMode.value)
  activeHealthMode.value = healthModes[(index + 1) % healthModes.length].key
}

function clearSearch() {
  searchQuery.value = ''
  searchOpen.value = false
}

function selectDrawerGroup(groupName: string) {
  searchQuery.value = groupName === '全部设备' ? '' : groupName
  activeTab.value = groupName === '重点关注' ? 'tasks' : 'home'
  menuOpen.value = false
}

function getInitialTab(): MobileContentKey {
  const tab = new URLSearchParams(window.location.search).get('mobileTab') as MobileContentKey | null
  const directPageKeys: MobileContentKey[] = [...tabKeys, 'inspection', 'defect', 'repair', 'notifications']

  return tab && directPageKeys.includes(tab) ? tab : 'home'
}
</script>

<style scoped src="./DeviceHealthMobileView.css"></style>
