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
            <img src="/case-assets/device-health-management-platform/inspection-icon-device.png" alt="" aria-hidden="true" />
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
              <i />
            </span>
            <span class="defect-summary-copy">
              <strong>{{ defectTickets.length }}</strong>
              <span>个缺陷工单</span>
              <small>
                全部状态
                <i aria-hidden="true" />
              </small>
            </span>
          </button>
        </header>

        <section class="defect-list" aria-label="缺陷工单列表">
          <article v-for="ticket in defectTickets" :key="ticket.id" class="defect-card">
            <header>
              <span class="defect-card-icon" aria-hidden="true">
                <i />
              </span>
              <strong>{{ ticket.asset }}</strong>
              <span class="defect-status" :class="`is-${ticket.status}`">{{ ticket.statusLabel }}</span>
            </header>

            <p>{{ ticket.description }}</p>

            <footer>
              <span aria-hidden="true" />
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
              <i />
            </span>
            <span class="repair-summary-copy">
              <strong>{{ repairOrderTotal }}</strong>
              <span>个检修工单</span>
              <small>
                全部状态
                <i aria-hidden="true" />
              </small>
            </span>
          </button>
        </header>

        <section class="repair-list" aria-label="检修工单列表">
          <article v-for="order in repairOrders" :key="order.id" class="repair-card" :class="`is-${order.status}`">
            <span class="repair-card-icon" aria-hidden="true">
              <i />
            </span>

            <div class="repair-card-content">
              <header>
                <strong>{{ order.title }}</strong>
                <span class="repair-status" :class="`is-${order.status}`">{{ order.statusLabel }}</span>
              </header>

              <p>{{ order.description }}</p>

              <footer>
                <span aria-hidden="true" />
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
import DeviceMobileHeader from './DeviceMobileHeader.vue'
import DeviceSelectDropdown from './DeviceSelectDropdown.vue'

type TabKey = 'home' | 'tasks' | 'workbench' | 'profile'
type PlaceholderPageKey = 'inspection' | 'defect' | 'repair'
type AuxiliaryPageKey = 'notifications'
type MobileContentKey = TabKey | PlaceholderPageKey | AuxiliaryPageKey
type PreviewPageKey = MobileContentKey | 'login'
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
    icon: '/case-assets/device-health-management-platform/inspection-icon-upload.png',
    iconWidth: 48,
    iconHeight: 48,
  },
  {
    label: '下载',
    icon: '/case-assets/device-health-management-platform/inspection-icon-download.png',
    iconWidth: 48,
    iconHeight: 48,
  },
  {
    label: '设置',
    icon: '/case-assets/device-health-management-platform/inspection-icon-settings.png',
    iconWidth: 48,
    iconHeight: 48,
  },
]

const inspectionSettings = reactive<InspectionSetting[]>([
  {
    key: 'workMode',
    title: '工作模式',
    description: '开启后进入工作模式',
    icon: '/case-assets/device-health-management-platform/inspection-icon-work-mode.png',
    enabled: false,
  },
  {
    key: 'autoDevice',
    title: '自动跳转设备',
    description: '开启后巡检完成自动跳转下一个设备',
    icon: '/case-assets/device-health-management-platform/inspection-icon-auto-device.png',
    enabled: true,
  },
  {
    key: 'autoItem',
    title: '自动跳转巡检项',
    description: '开启后巡检完成自动跳转下一个巡检项',
    icon: '/case-assets/device-health-management-platform/inspection-icon-auto-item.png',
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
    time: '2022-10-02 15:38:45',
  },
  {
    id: 'd2',
    asset: '五级设备',
    status: 'new',
    statusLabel: '新建',
    description: '这是缺陷内容描述最多显示两行，超过两行用省略号...',
    time: '2022-10-01 15:38:45',
  },
  {
    id: 'd3',
    asset: '五级设备',
    status: 'new',
    statusLabel: '新建',
    description: '这是缺陷内容描述最多显示两行，超过两行用省略号...',
    time: '2022-09-20 15:38:45',
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
    date: '2022-10-09',
    description: '您有一条调拨单待审批，请及时前往处理！',
    icon: '/case-assets/device-health-management-platform/notifications/figma/transfer.svg',
    unread: true,
  },
  {
    id: 'transfer-1002',
    title: '调拨单系统消息',
    date: '2022-10-02',
    description: '您有一条调拨单待审批，请及时前往处理！',
    icon: '/case-assets/device-health-management-platform/notifications/figma/transfer.svg',
    unread: true,
  },
  {
    id: 'inbound-0902',
    title: '入库单系统消息',
    date: '2022-09-02',
    description: '您有一条入库单待审批，请及时前往处理！',
    icon: '/case-assets/device-health-management-platform/notifications/figma/inbound.svg',
    unread: true,
    important: true,
  },
  {
    id: 'inbound-0901',
    title: '入库单系统消息',
    date: '2022-09-01',
    description: '您有一条入库单待审批，请及时前往处理！',
    icon: '/case-assets/device-health-management-platform/notifications/figma/inbound.svg',
    important: true,
  },
  {
    id: 'transfer-0802',
    title: '调拨单系统消息',
    date: '2022-08-02',
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
    deadline: '2023年10月15日',
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
    deadline: '2023年10月16日',
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

onMounted(() => {
  nextTick(scheduleScrollHintSetup)
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
  [currentMobilePage, activeNotification],
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
}

function isMobileTabActive(tab: TabKey) {
  return activeTab.value === tab || (tab === 'workbench' && isWorkbenchSubpage.value)
}

function handleWorkbenchEntryClick(entryKey?: WorkbenchEntryKey) {
  if (!entryKey) {
    return
  }

  activeTab.value = entryKey === 'equipment' ? 'workbench' : entryKey
  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false
}

function handleLogin() {
  isAuthenticated.value = true
  loginSubpage.value = 'login'
  activeTab.value = 'home'
  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false
}

function handleLogout() {
  isAuthenticated.value = false
  loginSubpage.value = 'login'
  activeTab.value = 'home'
  profileSubpage.value = 'main'
  menuOpen.value = false
  searchOpen.value = false
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
    return
  }

  if (isDefectPage.value) {
    activeTab.value = 'workbench'
    searchOpen.value = false
    return
  }

  if (isRepairPage.value) {
    activeTab.value = 'workbench'
    searchOpen.value = false
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

<style scoped>
.device-mobile-demo {
  position: relative;
  display: grid;
  grid-template-rows: 96px minmax(0, 1fr) 64px;
  --mobile-header-bg: transparent;
  --mobile-header-backdrop: none;
  --mobile-header-title-color: #191919;
  --mobile-header-title-size: 20px;
  --mobile-header-title-weight: 650;
  --mobile-header-title-line-height: 28px;
  --mobile-header-action-width: 17.5px;
  --mobile-header-action-height: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:
    linear-gradient(180deg, #d4e5ff 0%, rgba(244, 249, 255, 0.96) 31%, rgba(255, 255, 255, 0.92) 100%);
  color: #191919;
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
  height: 272px;
  padding: 16px 16px 18px;
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

.login-field + .login-field,
.device-select-dropdown + .login-field {
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
  margin-top: 18px;
  padding: 0 0 18px;
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

.enterprise-config-screen {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #f3f4f6;
  color: #111827;
}

.enterprise-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 25px 0 36px;
  background: #fff;
  color: #0f172a;
  font-size: 15px;
  font-weight: 650;
  line-height: 20px;
}

.enterprise-status-bar > div {
  display: flex;
  align-items: end;
  gap: 4px;
}

.enterprise-status-bar i {
  display: block;
  width: 3px;
  border-radius: 3px;
  background: #111827;
}

.enterprise-status-bar i:nth-child(1) {
  height: 6px;
}

.enterprise-status-bar i:nth-child(2) {
  height: 9px;
}

.enterprise-status-bar i:nth-child(3) {
  height: 12px;
}

.enterprise-wifi {
  position: relative;
  display: block;
  width: 16px;
  height: 12px;
  margin-left: 3px;
}

.enterprise-wifi::before,
.enterprise-wifi::after {
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  border: 2px solid #111827;
  border-bottom: 0;
  border-radius: 999px 999px 0 0;
  content: "";
}

.enterprise-wifi::before {
  bottom: 1px;
  width: 15px;
  height: 8px;
}

.enterprise-wifi::after {
  bottom: 1px;
  width: 7px;
  height: 4px;
}

.enterprise-status-bar b {
  display: block;
  width: 25px;
  height: 12px;
  margin-left: 4px;
  border: 2px solid #111827;
  border-radius: 4px;
  box-shadow: inset 18px 0 0 #111827;
}

.enterprise-config-header {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) 44px;
  align-items: center;
  height: 56px;
  padding: 0 16px;
  background: #fff;
}

.enterprise-config-header strong {
  color: #191919;
  font-size: 20px;
  font-weight: 650;
  line-height: 28px;
  text-align: center;
}

.enterprise-back-button {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.enterprise-back-button span {
  display: block;
  width: 12px;
  height: 12px;
  border-bottom: 3px solid #111827;
  border-left: 3px solid #111827;
  transform: rotate(45deg);
}

.enterprise-config-main {
  position: absolute;
  top: 104px;
  right: 0;
  bottom: 112px;
  left: 0;
  padding: 16px;
  background: #f3f4f6;
}

.enterprise-config-card {
  position: relative;
  display: grid;
  gap: 16px;
  padding: 64px 16px 18px;
  border-radius: 8px;
  background: #fff;
}

.enterprise-edit-button {
  position: absolute;
  top: 22px;
  right: 19px;
  border: 0;
  background: transparent;
  color: #2563eb;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
}

.enterprise-config-field {
  display: flex;
  align-items: center;
  height: 48px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.enterprise-config-field input {
  width: 100%;
  min-width: 0;
  height: 100%;
  border: 0;
  background: transparent;
  color: #111827;
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  outline: 0;
  padding: 0 14px;
}

.enterprise-add-button {
  position: absolute;
  top: 248px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  min-height: 52px;
  border: 0;
  border-radius: 10px;
  background: #2864ff;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(40, 100, 255, 0.18);
}

.enterprise-config-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  gap: 18px;
  padding: 16px 16px 10px;
  background: #fff;
}

.enterprise-config-footer button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 52px;
  border: 0;
  border-radius: 8px;
  background: #2864ff;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
}

.enterprise-config-footer span {
  justify-self: center;
  width: 134px;
  height: 5px;
  border-radius: 999px;
  background: #000;
}

.mobile-header {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 40px;
  align-items: center;
  gap: 10px;
  padding: 48px 16px 16px;
  background: var(--mobile-header-bg);
  backdrop-filter: var(--mobile-header-backdrop);
}

.mobile-header strong {
  color: var(--mobile-header-title-color);
  font-size: var(--mobile-header-title-size);
  font-weight: var(--mobile-header-title-weight);
  line-height: var(--mobile-header-title-line-height);
  text-align: center;
}

.icon-button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #1f2937;
  cursor: pointer;
}

.menu-button {
  justify-self: start;
  align-content: center;
  gap: 3px;
}

.menu-button span {
  width: 17px;
  height: 2px;
  border-radius: 999px;
  background: #1f2937;
}

.back-button img {
  display: block;
  width: 24px;
  height: 24px;
}

.notify-button {
  position: relative;
  justify-self: end;
}

.header-placeholder {
  justify-self: end;
  width: 32px;
  height: 32px;
}

.notify-button img {
  display: block;
  width: var(--mobile-header-action-width);
  height: var(--mobile-header-action-height);
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

.mobile-main,
.notifications-list,
.defect-list,
.repair-list,
.enterprise-config-main {
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.mobile-main::-webkit-scrollbar,
.notifications-list::-webkit-scrollbar,
.defect-list::-webkit-scrollbar,
.repair-list::-webkit-scrollbar,
.enterprise-config-main::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.scroll-hint-surface {
  --scroll-fade-top: 0px;
  --scroll-fade-bottom: 0px;
  --scroll-shadow-top: 0 0 0 transparent;
  --scroll-shadow-bottom: 0 0 0 transparent;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--scroll-fade-top),
    #000 calc(100% - var(--scroll-fade-bottom)),
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--scroll-fade-top),
    #000 calc(100% - var(--scroll-fade-bottom)),
    transparent 100%
  );
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  box-shadow: var(--scroll-shadow-top), var(--scroll-shadow-bottom);
  overscroll-behavior-y: contain;
}

.scroll-hint-surface.can-scroll-up {
  --scroll-fade-top: 24px;
  --scroll-shadow-top: inset 0 18px 22px -26px rgba(15, 42, 95, 0.16);
}

.scroll-hint-surface.can-scroll-down {
  --scroll-fade-bottom: 32px;
  --scroll-shadow-bottom: inset 0 -22px 26px -30px rgba(15, 42, 95, 0.16);
}

.scroll-hint-surface.show-scroll-indicator.can-scroll-down {
  --scroll-fade-bottom: 40px;
  --scroll-shadow-bottom: inset 0 -24px 28px -28px rgba(15, 108, 232, 0.18);
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
.profile-card strong {
  display: block;
  color: #1d2939;
  font-size: 15px;
  font-weight: 900;
}

.task-card p,
.workbench-section small {
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

.device-mobile-demo[data-page='tasks'] {
  --mobile-header-bg: linear-gradient(180deg, #e5edff 0%, #f4f7fb 100%);
  --mobile-header-backdrop: none;
  --mobile-header-action-width: 20px;
  --mobile-header-action-height: 20px;
  background: #f4f7fb;
}

.tasks-menu-icon {
  display: block;
  width: 17.5px;
  height: 15px;
}

.tasks-header-banner {
  position: relative;
  grid-column: 1 / -1;
  height: 113px;
  overflow: hidden;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #f9fafd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tasks-banner-art {
  position: absolute;
  top: -16.39%;
  left: 44.34%;
  width: 55.59%;
  height: 133.26%;
  object-fit: cover;
}

.tasks-banner-copy {
  position: relative;
  z-index: 1;
  display: grid;
  align-content: center;
  justify-items: start;
  height: 100%;
  padding: 17px;
}

.tasks-banner-copy > span {
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.tasks-banner-copy > span::after {
  content: '👋';
  margin-left: 6px;
}

.tasks-banner-copy > strong {
  margin-top: 4px;
  color: #111827;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
}

.tasks-banner-copy b {
  color: #0057ff;
  font-weight: 900;
}

.tasks-banner-copy small {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: 162px;
  min-height: 23px;
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.5);
  color: #6b7280;
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
}

.tasks-banner-copy small img {
  width: 10px;
  height: 10px;
  flex: 0 0 auto;
}

.device-mobile-demo[data-page='tasks'] .mobile-main {
  padding: 0;
  background: #f4f7fb;
}

.tasks-page {
  min-height: 905px;
  padding: 0 16px 32px;
  background: #f4f7fb;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tasks-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  height: 46px;
  overflow: hidden;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tasks-tabs button {
  position: relative;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  cursor: pointer;
}

.tasks-tabs button.active {
  color: #0057ff;
}

.tasks-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 32px;
  height: 2px;
  border-radius: 999px 999px 0 0;
  background: #0057ff;
  transform: translateX(-50%);
}

.tasks-search-filter {
  display: flex;
  gap: 12px;
  height: 46px;
  margin-top: 16px;
}

.tasks-search-field {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  height: 46px;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tasks-search-field > img {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 14px;
  height: 14px;
  transform: translateY(-50%);
}

.tasks-search-field input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  padding: 0 14px 0 37px;
  background: transparent;
  color: #111827;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
}

.tasks-search-field input::placeholder {
  color: #9ca3af;
}

.tasks-filter-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 78px;
  height: 42px;
  border: 1px solid #f3f4f6;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  cursor: pointer;
}

.tasks-filter-button img {
  width: 12px;
  height: 10.5px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
  padding-bottom: 32px;
}

.figma-task-card {
  display: grid;
  grid-template-rows: minmax(102px, 1fr) auto;
  min-height: 181px;
  overflow: hidden;
  border: 1px solid #f3f4f6;
  border-left-width: 4px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.figma-task-card.priority-urgent {
  border-left-color: #ff4d4f;
}

.figma-task-card.priority-normal {
  border-left-color: #faad14;
}

.figma-task-card.priority-low {
  border-left-color: #52c41a;
}

.figma-task-card-main {
  display: grid;
  align-content: start;
  gap: 8px;
  padding: 16px 16px 11px;
}

.figma-task-card-top,
.figma-task-card-footer,
.figma-task-actions,
.figma-assignee,
.figma-task-meta,
.figma-task-device,
.figma-priority-pill,
.figma-task-state {
  display: flex;
  align-items: center;
}

.figma-task-card-top {
  justify-content: space-between;
  gap: 12px;
}

.figma-task-device {
  min-width: 0;
  gap: 4px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.figma-task-device img {
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
}

.figma-priority-pill {
  flex: 0 0 auto;
  gap: 4px;
  min-width: 48px;
  height: 26px;
  justify-content: center;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.priority-urgent .figma-priority-pill {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}

.priority-normal .figma-priority-pill {
  background: rgba(250, 173, 20, 0.1);
  color: #faad14;
}

.priority-low .figma-priority-pill {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}

.figma-priority-pill img {
  width: 10px;
  height: 10px;
  object-fit: contain;
}

.figma-task-card-main > strong {
  color: #111827;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
}

.figma-task-meta {
  gap: 16px;
}

.figma-task-meta span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  color: #6b7280;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  white-space: nowrap;
}

.figma-task-meta img {
  width: 12px;
  height: 12px;
  object-fit: contain;
  flex: 0 0 auto;
}

.figma-task-card-footer {
  justify-content: space-between;
  gap: 12px;
  padding: 13px 16px 12px;
  border-top: 1px solid #f3f4f6;
}

.figma-assignee {
  gap: 8px;
  min-width: 0;
}

.figma-assignee > span,
.figma-assignee > img {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  border-radius: 999px;
  color: #fff;
  font-size: 10px;
  font-weight: 900;
  line-height: 15px;
  object-fit: cover;
}

.figma-assignee strong {
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  white-space: nowrap;
}

.figma-task-actions {
  gap: 12px;
  flex: 0 0 auto;
}

.figma-task-state {
  gap: 4px;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.figma-task-state i {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #93c5fd;
}

.figma-task-actions button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 74px;
  height: 33px;
  border: 0;
  border-radius: 8px;
  background: #0057ff;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  cursor: pointer;
}

.figma-task-actions button img {
  width: 10.5px;
  height: 9px;
}

.device-mobile-demo[data-page='notifications'] {
  --mobile-header-bg: transparent;
  --mobile-header-backdrop: none;
  --mobile-header-title-color: #000;
  --mobile-header-title-size: 20px;
  --mobile-header-title-weight: 500;
  --mobile-header-title-line-height: 30px;
  --mobile-header-action-width: 20px;
  --mobile-header-action-height: 17.514px;
  grid-template-rows: 96px minmax(0, 1fr);
  background:
    linear-gradient(180deg, #d4e5ff 0%, rgba(255, 255, 255, 0.5) 100%),
    #f4f7fb;
}

.device-mobile-demo[data-page='notifications'] .mobile-header {
  padding: 48px 16px 16px;
  background: transparent;
}

.device-mobile-demo[data-page='notifications'] .mobile-header strong {
  line-height: 30px;
}

.device-mobile-demo[data-page='notifications'] .icon-button {
  width: 32px;
  height: 32px;
  border-radius: 0;
}

.device-mobile-demo[data-page='notifications'] .icon-button:focus {
  outline: 0;
}

.notifications-back-icon {
  display: block;
  width: 10px;
  height: 17.5px;
}

.back-button .notifications-back-icon {
  width: 10px;
  height: 17.5px;
}

.device-mobile-demo[data-page='notifications'] .mobile-main {
  position: relative;
  padding: 0;
  overflow: hidden;
  background: transparent;
}

.notifications-page {
  position: relative;
  min-height: 100%;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow: auto;
  padding: 0 16px 96px;
}

.notification-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 358px;
  min-height: 81px;
  padding: 16px;
  border: 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition:
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.notification-card:hover,
.notification-card:focus-visible {
  box-shadow: 0 8px 18px rgba(0, 87, 255, 0.12);
  outline: 0;
  transform: translateY(-1px);
}

.notification-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  border-radius: 12px;
  background: #ebf1ff;
}

.notification-icon img {
  display: block;
  width: 20px;
  height: 20.026px;
  object-fit: contain;
}

.notification-copy {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
}

.notification-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  min-height: 24px;
}

.notification-title-line {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.notification-title-line strong {
  flex: 0 0 auto;
  overflow: hidden;
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notification-dot {
  width: 8px;
  height: 8px;
  flex: 0 0 8px;
  border-radius: 9999px;
  background: #ff4d4f;
}

.notification-important {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 19px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #faad14;
  color: #fff;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  white-space: nowrap;
}

.notification-important img {
  width: 8.254px;
  height: 8.004px;
  flex: 0 0 auto;
}

.notification-row time {
  flex: 0 0 auto;
  padding-left: 8px;
  color: #999;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  white-space: nowrap;
}

.notification-copy p {
  width: 100%;
  margin: 0;
  overflow: hidden;
  color: #999;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notifications-bottom-action {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  padding: 16px 16px 32px;
  background: rgba(247, 248, 250, 0.9);
  backdrop-filter: blur(2px);
}

.notifications-bottom-action button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 12px;
  background: #0057ff;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  cursor: pointer;
}

.notification-detail-overlay {
  position: absolute;
  inset: 0;
  z-index: 6;
  display: grid;
  place-items: center;
  padding: 0 36px;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(5px);
}

.notification-detail-dialog {
  width: 100%;
  max-width: 312px;
  padding: 32px 24px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
}

.notification-detail-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.notification-detail-heading strong {
  color: #000;
  font-size: 20px;
  font-weight: 650;
  line-height: 28px;
}

.notification-detail-content {
  display: grid;
  gap: 18px;
  margin: 0;
}

.notification-detail-content div {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  align-items: start;
  gap: 4px;
}

.notification-detail-content dt,
.notification-detail-content dd {
  margin: 0;
  font-size: 16px;
  font-weight: 650;
  line-height: 28px;
}

.notification-detail-content dt {
  color: #999;
  white-space: nowrap;
}

.notification-detail-content dd {
  color: #000;
}

.notification-detail-dialog > button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 52px;
  margin: 32px auto 0;
  border: 0;
  border-radius: 12px;
  background: #f3f4f6;
  color: #191919;
  font-size: 16px;
  font-weight: 650;
  line-height: 24px;
  cursor: pointer;
}

.device-mobile-demo[data-page='workbench'] {
  background:
    linear-gradient(180deg, #d3e5f5 0%, #f4f7fb 20%),
    #fff;
}

.device-mobile-demo[data-page='workbench'] .mobile-main {
  padding: 16px;
  background: transparent;
}

.device-mobile-demo[data-page='inspection'] {
  grid-template-rows: minmax(0, 1fr);
  --mobile-header-bg: linear-gradient(180deg, #d4e5ff 0%, rgba(255, 255, 255, 0.5) 100%);
  --mobile-header-backdrop: none;
  --mobile-header-title-color: #0f172a;
  --mobile-header-title-size: 20px;
  --mobile-header-title-weight: 600;
  --mobile-header-title-line-height: 28px;
  --mobile-header-action-width: 17.5px;
  --mobile-header-action-height: 20px;
  background: #f8fbff;
}

.device-mobile-demo[data-page='inspection'] .mobile-main {
  padding: 0;
  background: #f8fbff;
}

.inspection-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100%;
  isolation: isolate;
  overflow: hidden;
  padding-bottom: 40px;
  background:
    linear-gradient(180deg, rgba(213, 230, 255, 0.95) 0%, rgba(239, 247, 255, 0.82) 48%, #f8fbff 100%),
    #f8fbff;
}

.inspection-page::before {
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background:
    radial-gradient(circle at 84% 8%, rgba(140, 190, 255, 0.28) 0, rgba(140, 190, 255, 0) 31%),
    linear-gradient(180deg, rgba(212, 229, 255, 0.72) 0%, rgba(238, 247, 255, 0.46) 58%, rgba(248, 251, 255, 0) 100%);
  content: '';
  pointer-events: none;
}

.inspection-page::after {
  content: none;
}

.subpage-hero {
  overflow: hidden;
  background: transparent;
  pointer-events: none;
}

.inspection-hero {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
}

.subpage-hero-bg {
  position: absolute;
  z-index: 0;
  top: 0;
  right: -18px;
  width: calc(100% + 18px);
  height: 100%;
  opacity: 0.92;
  object-fit: none;
  object-position: top right;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 34%, rgba(0, 0, 0, 0.12) 44%, rgba(0, 0, 0, 0.78) 56%, #000 68%, #000 93%, rgba(0, 0, 0, 0.24) 100%);
  mask-image: linear-gradient(90deg, transparent 0%, transparent 34%, rgba(0, 0, 0, 0.12) 44%, rgba(0, 0, 0, 0.78) 56%, #000 68%, #000 93%, rgba(0, 0, 0, 0.24) 100%);
  pointer-events: none;
}

.inspection-page-bg {
  top: -42px;
  right: -10px;
  width: 340px;
  height: 430px;
  opacity: 1;
  object-fit: cover;
  object-position: 58% top;
}

.subpage-hero::before {
  position: absolute;
  z-index: 1;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(213, 230, 255, 0.98) 0%, rgba(226, 239, 255, 0.94) 38%, rgba(234, 244, 255, 0.42) 56%, rgba(234, 244, 255, 0) 72%);
  content: '';
  pointer-events: none;
}

.subpage-hero::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(248, 251, 255, 0) 0%, rgba(248, 251, 255, 0) 36%, rgba(248, 251, 255, 0.66) 66%, #f8fbff 100%);
  content: '';
  pointer-events: none;
}

.subpage-hero-back {
  position: absolute;
  z-index: 3;
  top: 24px;
  left: 16px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
}

.subpage-hero-back img {
  display: block;
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.subpage-hero-copy {
  position: absolute;
  z-index: 2;
  top: 64px;
  left: 24px;
  display: grid;
  align-content: start;
  gap: 4px;
  width: 342px;
}

.subpage-hero-copy span {
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.subpage-hero-copy strong {
  color: #0f172a;
  font-size: 28px;
  font-weight: 600;
  line-height: 39px;
  letter-spacing: 1.8px;
}

.inspection-profile-card {
  position: absolute;
  z-index: 2;
  top: 159px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 342px;
  min-height: 56px;
}

.inspection-profile-card img {
  display: block;
  width: 56px;
  height: 56px;
  border: 2px solid #fff;
  border-radius: 50%;
  object-fit: cover;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.inspection-profile-card div {
  display: grid;
  align-content: center;
  gap: 3px;
  min-width: 0;
}

.inspection-profile-card strong {
  color: #1e293b;
  font-size: 18px;
  font-weight: 800;
  line-height: 28px;
}

.inspection-profile-card span {
  color: #64748b;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.inspection-action-section {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  width: calc(100% - 40px);
  height: 146px;
  margin: 247px 20px 0;
  padding: 17px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(5px);
}

.inspection-action-card {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 8px;
  height: 112px;
  padding: 16px;
  border: 0;
  border-radius: 16px;
  background: rgba(239, 246, 255, 0.5);
  color: #475569;
  font: inherit;
  cursor: pointer;
}

.inspection-action-card span {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 0;
  background: transparent;
}

.inspection-action-card img {
  display: block;
  object-fit: contain;
}

.inspection-action-card strong {
  color: #475569;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.inspection-device-row,
.inspection-settings-card {
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(5px);
}

.inspection-device-row {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 20px;
  align-items: center;
  width: calc(100% - 40px);
  height: 74px;
  margin: 24px 20px 0;
  padding: 16px 21px;
  border-radius: 16px;
  color: #1e293b;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.inspection-row-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 0;
  background: transparent;
}

.inspection-row-icon img {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.inspection-device-row strong {
  padding-left: 16px;
  color: #1e293b;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.inspection-row-chevron {
  justify-self: end;
  width: 10px;
  height: 10px;
  border-top: 2px solid #c4c7cc;
  border-right: 2px solid #c4c7cc;
  transform: rotate(45deg);
}

.inspection-settings-card {
  position: relative;
  z-index: 1;
  overflow: hidden;
  width: calc(100% - 40px);
  margin: 24px 20px 0;
  border-radius: 24px;
}

.inspection-setting-row {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 44px;
  align-items: center;
  height: 81px;
  width: 100%;
  padding: 20px;
  border: 0;
  border-bottom: 1px solid #f1f5f9;
  background: transparent;
  color: #1e293b;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.inspection-setting-row:last-child {
  height: 80px;
  border-bottom: 0;
}

.inspection-setting-copy {
  display: grid;
  gap: 0;
  min-width: 0;
  padding-left: 16px;
}

.inspection-setting-copy strong {
  overflow: hidden;
  color: #1e293b;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.inspection-setting-copy small {
  overflow: hidden;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.inspection-switch {
  position: relative;
  justify-self: end;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: #e5e7eb;
  transition:
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.inspection-switch i {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 5px rgba(15, 23, 42, 0.22);
  transition: transform 0.18s ease;
}

.inspection-switch.active {
  background: #2864ff;
  box-shadow: none;
}

.inspection-switch.active i {
  transform: translateX(20px);
}

.inspection-home-indicator {
  position: relative;
  z-index: 1;
  display: block;
  flex: 0 0 auto;
  width: 134px;
  height: 5px;
  margin: auto auto 0;
  border-radius: 999px;
  background: #111827;
}

.device-mobile-demo[data-page='defect'] {
  grid-template-rows: minmax(0, 1fr);
  background: #f8fbff;
}

.device-mobile-demo[data-page='defect'] .mobile-main {
  padding: 0;
  background: #f8fbff;
}

.device-mobile-demo[data-page='repair'] {
  grid-template-rows: minmax(0, 1fr);
  background: #f8fbff;
}

.device-mobile-demo[data-page='repair'] .mobile-main {
  padding: 0;
  background: #f8fbff;
}

.defect-page {
  position: relative;
  min-height: 100%;
  isolation: isolate;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(229, 236, 255, 0.95) 0%, rgba(229, 236, 255, 0.88) 48%, #e5ecff 100%),
    #e5ecff;
  color: #191c1e;
}

.defect-page::before {
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background:
    radial-gradient(circle at 84% 8%, rgba(140, 190, 255, 0.28) 0, rgba(140, 190, 255, 0) 31%),
    linear-gradient(180deg, rgba(212, 229, 255, 0.72) 0%, rgba(238, 247, 255, 0.46) 58%, rgba(248, 251, 255, 0) 100%);
  content: '';
  pointer-events: none;
}

.defect-header {
  position: absolute;
  z-index: 1;
  inset: 0;
  height: auto;
  overflow: hidden;
  background: transparent;
}

.defect-summary-card {
  position: absolute;
  z-index: 2;
  top: 139px;
  left: 24px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  align-items: center;
  width: 214.8px;
  height: 90px;
  padding: 17px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow:
    0 4px 20px -2px rgba(0, 87, 255, 0.05),
    0 0 3px rgba(0, 87, 255, 0.02);
  backdrop-filter: blur(10px);
  color: inherit;
  cursor: pointer;
  font: inherit;
  pointer-events: auto;
  text-align: left;
}

.defect-summary-icon,
.defect-card-icon {
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #eff6ff;
}

.defect-summary-icon {
  width: 56px;
  height: 56px;
}

.defect-summary-icon i,
.defect-card-icon i {
  position: relative;
  display: block;
  width: 18px;
  height: 24px;
  border: 2px solid #2864ff;
  border-radius: 4px;
}

.defect-summary-icon i::before,
.defect-card-icon i::before {
  position: absolute;
  top: 5px;
  right: 4px;
  left: 4px;
  height: 2px;
  border-radius: 999px;
  background: #2864ff;
  box-shadow: 0 6px 0 #2864ff;
  content: '';
}

.defect-summary-copy {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: end;
  column-gap: 4px;
  min-width: 0;
}

.defect-summary-copy > strong {
  color: #191c1e;
  font-size: 24px;
  font-weight: 800;
  line-height: 32px;
}

.defect-summary-copy > span {
  align-self: center;
  color: #42474e;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
}

.defect-summary-copy small {
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  color: #42474e;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.defect-summary-copy small i {
  width: 6px;
  height: 6px;
  border-right: 1.6px solid #42474e;
  border-bottom: 1.6px solid #42474e;
  transform: rotate(45deg) translateY(-2px);
}

.defect-list {
  position: absolute;
  z-index: 1;
  top: 245px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
  padding: 0 16px 84px;
  scrollbar-width: none;
}

.defect-list::-webkit-scrollbar {
  display: none;
}

.defect-card {
  position: relative;
  display: grid;
  grid-template-rows: 48px 45.5px 20px;
  gap: 12px;
  width: 358px;
  min-height: 179.5px;
  padding: 21px;
  border: 1px solid rgba(241, 244, 247, 0.5);
  border-radius: 16px;
  background: #fff;
  box-shadow:
    0 4px 20px -2px rgba(0, 87, 255, 0.05),
    0 0 3px rgba(0, 87, 255, 0.02);
}

.defect-card header {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto;
  align-items: start;
  column-gap: 12px;
}

.defect-card-icon {
  width: 48px;
  height: 48px;
}

.defect-card-icon i {
  width: 20px;
  height: 17.5px;
  border-radius: 3px;
}

.defect-card-icon i::before {
  top: 4px;
  box-shadow: 0 5px 0 #2864ff;
}

.defect-card header strong {
  align-self: center;
  overflow: hidden;
  color: #191c1e;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.defect-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  height: 26px;
  padding: 5px 12px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
}

.defect-status.is-pending {
  min-width: 62px;
  border-color: rgba(186, 26, 26, 0.2);
  background: #ffdad6;
  color: #ba1a1a;
}

.defect-status.is-new {
  border-color: rgba(255, 141, 0, 0.2);
  background: #ffdcbe;
  color: #ff8d00;
}

.defect-card p {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: #42474e;
  font-size: 14px;
  font-weight: 500;
  line-height: 22.75px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.defect-card footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  color: #73777f;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.defect-card footer > span {
  position: relative;
  width: 12px;
  height: 12px;
}

.defect-card footer > span::before,
.defect-card footer > span::after {
  position: absolute;
  content: '';
}

.defect-card footer > span::before {
  inset: 1px;
  border: 1.6px solid #73777f;
  border-radius: 50%;
}

.defect-card footer > span::after {
  top: 3px;
  left: 5.3px;
  width: 1.5px;
  height: 4.8px;
  border-radius: 999px;
  background: #73777f;
  transform-origin: bottom center;
  transform: rotate(-45deg);
}

.defect-card time {
  white-space: nowrap;
}

.defect-add-button {
  position: absolute;
  z-index: 3;
  right: 24px;
  bottom: 36px;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  padding: 0 0 4px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa 0%, #0057ff 100%);
  box-shadow: 0 8px 16px -4px rgba(0, 87, 255, 0.3);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 24px;
  font-weight: 800;
  line-height: 24px;
  backdrop-filter: blur(2px);
}

.defect-home-indicator {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 8px;
  left: 0;
  display: block;
  width: 134px;
  height: 5px;
  margin: auto;
  border-radius: 999px;
  background: #000;
}

.repair-page {
  position: relative;
  min-height: 100%;
  isolation: isolate;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(229, 236, 255, 0.95) 0%, rgba(229, 236, 255, 0.88) 48%, #e5ecff 100%),
    #e5ecff;
  color: #1f2937;
}

.repair-page::before {
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background:
    radial-gradient(circle at 84% 8%, rgba(140, 190, 255, 0.28) 0, rgba(140, 190, 255, 0) 31%),
    linear-gradient(180deg, rgba(212, 229, 255, 0.72) 0%, rgba(238, 247, 255, 0.46) 58%, rgba(248, 251, 255, 0) 100%);
  content: '';
  pointer-events: none;
}

.repair-header {
  position: absolute;
  z-index: 1;
  inset: 0;
  height: auto;
  overflow: hidden;
  background: transparent;
}

.defect-header-bg,
.repair-header-bg {
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  object-fit: contain;
  object-position: right top;
  transform: translateX(102px);
  -webkit-mask-image: linear-gradient(90deg, transparent 0, rgba(0, 0, 0, 0.18) 24px, rgba(0, 0, 0, 0.62) 64px, #000 112px, #000 100%);
  mask-image: linear-gradient(90deg, transparent 0, rgba(0, 0, 0, 0.18) 24px, rgba(0, 0, 0, 0.62) 64px, #000 112px, #000 100%);
}

.defect-header-bg {
  transform: translateX(40px);
}

.defect-header::before,
.repair-header::before {
  background:
    linear-gradient(90deg, rgba(229, 236, 255, 0.96) 0%, rgba(229, 236, 255, 0.82) 18%, rgba(229, 236, 255, 0.42) 30%, rgba(229, 236, 255, 0.14) 41%, rgba(229, 236, 255, 0) 52%);
}

.defect-header::after,
.repair-header::after {
  background:
    linear-gradient(180deg, rgba(229, 236, 255, 0) 0%, rgba(229, 236, 255, 0) 24%, rgba(229, 236, 255, 0.2) 34%, rgba(229, 236, 255, 0.56) 46%, rgba(229, 236, 255, 0.86) 58%, #e5ecff 72%, #e5ecff 100%);
}

.repair-summary-card {
  position: absolute;
  z-index: 2;
  top: 139px;
  left: 24px;
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  align-items: center;
  width: 214.8px;
  height: 90px;
  padding: 17px;
  border: 1px solid rgba(255, 255, 255, 0.48);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow:
    0 4px 20px -2px rgba(0, 87, 255, 0.05),
    0 0 3px rgba(0, 87, 255, 0.02);
  backdrop-filter: blur(10px);
  color: inherit;
  cursor: pointer;
  font: inherit;
  text-align: left;
}

.repair-summary-icon,
.repair-card-icon {
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: #eff6ff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.repair-summary-icon {
  width: 56px;
  height: 56px;
}

.repair-summary-icon i,
.repair-card-icon i {
  position: relative;
  display: block;
  width: 21px;
  height: 24px;
  color: #60a5fa;
}

.repair-summary-icon i::before,
.repair-card-icon i::before {
  position: absolute;
  inset: 0;
  border: 2px solid currentColor;
  border-radius: 4px;
  content: '';
}

.repair-summary-icon i::after,
.repair-card-icon i::after {
  position: absolute;
  top: 7px;
  left: 5px;
  width: 11px;
  height: 6px;
  border-bottom: 2px solid currentColor;
  border-left: 2px solid currentColor;
  content: '';
  transform: rotate(-45deg);
}

.repair-summary-copy {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: end;
  column-gap: 4px;
  min-width: 0;
}

.repair-summary-copy > strong {
  color: #191c1e;
  font-size: 24px;
  font-weight: 800;
  line-height: 32px;
}

.repair-summary-copy > span {
  align-self: center;
  color: #42474e;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
}

.repair-summary-copy small {
  grid-column: 1 / -1;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  color: #42474e;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.repair-summary-copy small i {
  width: 6px;
  height: 6px;
  border-right: 1.6px solid #42474e;
  border-bottom: 1.6px solid #42474e;
  transform: rotate(45deg) translateY(-2px);
}

.repair-list {
  position: absolute;
  z-index: 1;
  top: 245px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
  padding: 0 16px 84px;
  scrollbar-width: none;
}

.repair-list::-webkit-scrollbar {
  display: none;
}

.repair-card {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 16px;
  width: 358px;
  min-height: 132px;
  padding: 17px;
  border: 1px solid #f9fafb;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.repair-card-icon {
  width: 56px;
  height: 56px;
}

.repair-card.is-pending .repair-card-icon {
  background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
}

.repair-card.is-new .repair-card-icon {
  background: linear-gradient(135deg, #ffedcc 0%, #fff7ed 100%);
}

.repair-card.is-processing .repair-card-icon {
  background: linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%);
}

.repair-card.is-dispatch .repair-card-icon {
  background: linear-gradient(135deg, #f3e8ff 0%, #faf5ff 100%);
}

.repair-card.is-new .repair-card-icon i {
  color: #fb923c;
}

.repair-card.is-processing .repair-card-icon i {
  color: #f472b6;
}

.repair-card.is-dispatch .repair-card-icon i {
  width: 30px;
  color: #c084fc;
}

.repair-card-content {
  display: grid;
  grid-template-rows: 24px 39px 17px;
  align-content: space-between;
  min-width: 0;
  min-height: 98px;
  padding: 2px 0;
}

.repair-card-content header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
}

.repair-card-content header strong {
  overflow: hidden;
  padding-right: 8px;
  color: #1f2937;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.repair-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 23px;
  padding: 3px 9px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  line-height: 16.5px;
  white-space: nowrap;
}

.repair-status.is-pending {
  border-color: rgba(255, 77, 79, 0.3);
  background: #fff1f0;
  color: #ff4d4f;
}

.repair-status.is-new {
  border-color: rgba(250, 173, 20, 0.3);
  background: #fffbe6;
  color: #faad14;
}

.repair-status.is-processing {
  border-color: rgba(235, 47, 150, 0.3);
  background: #fff0f6;
  color: #eb2f96;
}

.repair-status.is-dispatch {
  border-color: rgba(114, 46, 209, 0.3);
  background: #f9f0ff;
  color: #722ed1;
}

.repair-card-content p {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: #888;
  font-size: 12px;
  font-weight: 500;
  line-height: 19.5px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.repair-card-content footer {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #bbb;
  font-size: 11px;
  font-weight: 500;
  line-height: 16.5px;
}

.repair-card-content footer > span {
  position: relative;
  width: 11px;
  height: 11px;
}

.repair-card-content footer > span::before,
.repair-card-content footer > span::after {
  position: absolute;
  content: '';
}

.repair-card-content footer > span::before {
  inset: 1px;
  border: 1.4px solid #bbb;
  border-radius: 50%;
}

.repair-card-content footer > span::after {
  top: 3px;
  left: 5px;
  width: 1.3px;
  height: 4.4px;
  border-radius: 999px;
  background: #bbb;
  transform-origin: bottom center;
  transform: rotate(-45deg);
}

.repair-card-content time {
  white-space: nowrap;
}

.repair-add-button {
  position: absolute;
  z-index: 3;
  left: 24px;
  bottom: 41px;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  padding: 0 0 4px;
  border: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa 0%, #0057ff 100%);
  box-shadow: 0 8px 16px -4px rgba(0, 87, 255, 0.3);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 24px;
  font-weight: 800;
  line-height: 24px;
}

.repair-home-indicator {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 8px;
  left: 0;
  display: block;
  width: 134px;
  height: 5px;
  margin: auto;
  border-radius: 999px;
  background: #000;
}

.workbench-page {
  display: grid;
  align-content: start;
  gap: 16px;
}

.workbench-hero {
  position: relative;
  overflow: hidden;
  min-height: 149px;
  padding: 20px;
  border-radius: 16px;
  background: #eef5ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.workbench-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
  pointer-events: none;
}

.workbench-hero > div {
  position: relative;
  z-index: 1;
  display: grid;
  align-content: start;
  justify-items: start;
  gap: 4px;
  width: 212px;
}

.workbench-hero span {
  color: #4b5563;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
}

.workbench-hero strong {
  color: #1e3a8a;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
}

.workbench-hero small {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
  margin-top: 2px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  color: #6b7280;
  font-size: 10px;
  font-weight: 600;
  line-height: 15px;
  white-space: nowrap;
}

.workbench-hero small img {
  width: 10px;
  height: 10px;
}

.workbench-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
}

.workbench-section header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

.workbench-section header span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #1f2937;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.workbench-section header span img {
  flex: 0 0 auto;
  object-fit: contain;
}

.workbench-section header small {
  margin: 0;
  color: #9ca3af;
  font-size: 10px;
  font-weight: 600;
  line-height: 15px;
  white-space: nowrap;
}

.workbench-entry-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
}

.workbench-entry-grid button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 0;
  padding: 8px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
}

.workbench-entry-grid button.active {
  background: #eaf3ff;
}

.workbench-entry-grid button:focus-visible {
  outline: 2px solid rgba(40, 100, 255, 0.5);
  outline-offset: 2px;
}

.workbench-entry-icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 6px;
  border-radius: 14px;
  background: rgba(239, 246, 255, 0.4);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.workbench-entry-icon img {
  display: block;
  object-fit: contain;
}

.workbench-entry-grid strong {
  display: block;
  max-width: 100%;
  overflow: hidden;
  color: #1f2937;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.workbench-entry-grid small {
  display: block;
  max-width: 100%;
  min-height: 27px;
  margin: 0;
  color: #9ca3af;
  font-size: 9px;
  font-weight: 500;
  line-height: 13.5px;
  text-align: center;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: anywhere;
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
  width: 16px;
  height: 16px;
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
  grid-template-rows: 88px minmax(0, 1fr) 64px;
  --mobile-header-bg: linear-gradient(180deg, #e1eaff 0%, #f4f7fd 100%);
  --mobile-header-backdrop: blur(2px);
  --mobile-header-title-color: #1a1f36;
  --mobile-header-title-size: 18px;
  --mobile-header-title-weight: 500;
  --mobile-header-title-line-height: 28px;
  --mobile-header-action-width: 24px;
  --mobile-header-action-height: 24px;
  background: #f4f7fd;
}

.device-mobile-demo[data-page='profile'] .mobile-header {
  padding: 48px 24px 16px;
}

.device-mobile-demo[data-page='profile'] .mobile-header strong {
  letter-spacing: 0.45px;
}

.device-mobile-demo[data-page='profile'] .mobile-main {
  padding: 0 20px;
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
  gap: 24px;
  overflow: hidden;
  width: 100%;
  min-height: 200px;
  padding: 20px;
  border: 0;
  border-radius: 24px;
  background: linear-gradient(90deg, #f8faff 0%, #eef3ff 100%);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.profile-card-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  opacity: 0.4;
  pointer-events: none;
}

.profile-user-row {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.profile-avatar-wrap {
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  flex: 0 0 80px;
  border: 2px solid #fff;
  border-radius: 999px;
  background: #dbeafe;
  box-shadow: 0 4px 12px rgba(34, 96, 255, 0.16);
}

.profile-avatar {
  width: 76px;
  height: 76px;
  border-radius: 999px;
  object-fit: cover;
}

.profile-user-copy {
  display: grid;
  justify-items: start;
  gap: 7px;
  min-width: 0;
  padding-top: 8px;
}

.profile-name-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-name-row strong {
  color: #1a1f36;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}

.profile-name-row img {
  width: 16px;
  height: 16px;
}

.profile-user-copy > span {
  min-height: 24px;
  padding: 4px 12px;
  border-radius: 6px;
  background: rgba(0, 87, 255, 0.2);
  color: #2260ff;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.profile-info-list {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 16px;
}

.profile-info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 20px;
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
  gap: 12px;
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
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  margin-left: auto;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.profile-setting-row {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  min-height: 0;
  padding: 16px;
  border: 0;
  border-radius: 16px;
}

.profile-setting-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
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
  border-radius: 999px;
  background: #e53e3e;
}

.profile-setting-copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.profile-setting-copy strong {
  color: #1a1f36;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.profile-setting-copy small {
  color: #64748b;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.profile-setting-row > img {
  width: 16px;
  height: 16px;
}

.profile-toggle {
  position: relative;
  box-sizing: border-box;
  flex: 0 0 48px;
  width: 48px;
  height: 28px;
  border: 2px solid transparent;
  border-radius: 999px;
  background: #cbd5e1;
  cursor: pointer;
  overflow: hidden;
  padding: 0;
}

.profile-toggle i {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #fff;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
  transition: transform 180ms ease;
}

.profile-toggle.active {
  background: #2260ff;
}

.profile-toggle.active i {
  transform: translateX(20px);
}

.device-mobile-demo[data-page='about'] {
  grid-template-rows: 88px minmax(0, 1fr);
  --mobile-header-title-color: #1f2937;
  --mobile-header-title-size: 17px;
  --mobile-header-title-weight: 500;
  --mobile-header-title-line-height: 25.5px;
  background:
    radial-gradient(circle at 15% 10%, rgba(239, 246, 255, 1) 0, rgba(239, 246, 255, 0) 40%),
    radial-gradient(circle at 85% 20%, rgba(238, 242, 255, 1) 0, rgba(238, 242, 255, 0) 45%),
    radial-gradient(circle at 50% 80%, rgba(239, 246, 255, 1) 0, rgba(239, 246, 255, 0) 50%),
    #f8fbff;
}

.device-mobile-demo[data-page='about'] .mobile-header {
  padding: 44px 16px 12px;
}

.device-mobile-demo[data-page='about'] .mobile-header strong {
  letter-spacing: 0.425px;
}

.device-mobile-demo[data-page='about'] .mobile-main {
  overflow: hidden;
  padding: 0;
  background: transparent;
}

.about-system-page {
  position: relative;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  min-height: 100%;
}

.about-system-body {
  position: relative;
  min-height: 0;
}

.about-logo-section {
  position: absolute;
  top: 49px;
  left: 50%;
  display: grid;
  place-items: center;
  width: 96px;
  height: 120px;
  padding-bottom: 24px;
  transform: translateX(-50%);
}

.about-app-icon {
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  padding: 1px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 22px;
  background: linear-gradient(135deg, #60a5fa 0%, #0057ff 100%);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.25);
  backdrop-filter: blur(6px);
}

.about-app-icon span {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.06)) drop-shadow(0 4px 1.5px rgba(0, 0, 0, 0.07));
}

.about-app-icon img {
  display: block;
  width: 42px;
  height: 50px;
}

.about-system-page h2 {
  position: absolute;
  top: 169px;
  left: 0;
  width: 100%;
  margin: 0;
  color: #111827;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  text-align: center;
}

.about-system-page p {
  position: absolute;
  top: 211px;
  left: 0;
  width: 100%;
  margin: 0;
  color: #6b7280;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  text-align: center;
}

.about-menu-card {
  position: absolute;
  top: 262.5px;
  right: 16px;
  left: 16px;
  display: grid;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.about-menu-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 16px;
  border: 0;
  border-top: 1px solid #f3f4f6;
  background: transparent;
  color: #111827;
  font: inherit;
  cursor: pointer;
}

.about-menu-row:first-child {
  border-top: 0;
}

.about-menu-row strong {
  color: #111827;
  font-size: 15px;
  font-weight: 500;
  line-height: 22.5px;
}

.about-menu-row > span {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 500;
  line-height: 19.5px;
}

.about-menu-row > img {
  width: 6.167px;
  height: 10px;
}

.about-menu-row > span img {
  width: 14.167px;
  height: 10px;
}

.about-footer {
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
  color: #9ca3af;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.55px;
  line-height: 16.5px;
  text-align: center;
  white-space: nowrap;
}

.preview-placeholder-page {
  display: grid;
  min-height: 100%;
  place-items: center;
  padding: 24px 16px;
  background: linear-gradient(180deg, rgba(212, 229, 255, 0.9) 0%, rgba(248, 250, 255, 0.96) 100%);
}

.preview-placeholder-page article {
  display: grid;
  justify-items: start;
  gap: 10px;
  width: 100%;
  padding: 22px;
  border: 1px solid rgba(34, 96, 255, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 18px 42px rgba(43, 112, 198, 0.12);
}

.preview-placeholder-page span {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(34, 96, 255, 0.1);
  color: #2260ff;
  font-size: 12px;
  font-weight: 700;
}

.preview-placeholder-page h2 {
  margin: 0;
  color: #1a1f36;
  font-size: 22px;
  line-height: 1.25;
}

.preview-placeholder-page p {
  margin: 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.7;
}

.preview-placeholder-page small {
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.6;
}

.profile-logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 58px;
  border: 1px solid #e53e3e;
  border-radius: 16px;
  background: transparent;
  color: #e53e3e;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;
}

.profile-logout-button img {
  width: 20px;
  height: 20px;
}

</style>
