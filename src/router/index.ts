import { createRouter, createWebHashHistory } from 'vue-router'
import { applyRouteSeo } from '@/utils/applyRouteSeo'

const siteTitle = '曹兰 | AI Frontend Engineer Portfolio'
const miniProgramDemoTitle = '靓轩电商小程序高保真交互 Demo'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 96, behavior: 'smooth' }
    }

    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: siteTitle,
        description: '曹兰个人简历作品集，展示 AI 前端工程、产品 UI、Vue 前端落地和 AI 辅助设计工作流。',
        keywords: ['曹兰', 'AI Frontend Engineer', 'Vue Portfolio', 'UI UED 作品集'],
      },
    },
    {
      path: '/cases',
      name: 'cases',
      component: () => import('@/views/Cases.vue'),
      meta: {
        title: '项目案例',
        description: '曹兰项目案例集合，包含小程序、电商、设备健康管理平台、工业数据大屏和多端产品设计案例。',
        keywords: ['项目案例', '工业大屏', '小程序设计', 'B端系统', 'Portfolio Cases'],
      },
    },
    { path: '/cases/liangxuan-mini-program', redirect: '/demos/mini-program' },
    { path: '/cases/mini-program', redirect: '/demos/mini-program' },
    {
      path: '/cases/device-health-management-platform/pc-preview',
      name: 'device-health-pc-preview',
      component: () => import('@/views/DeviceHealthPcPreview.vue'),
      meta: {
        title: '设备健康 PC 后台预览',
        description: '设备健康管理平台 PC 后台高保真预览，展示资产、点检、缺陷、检修和数据看板体验。',
        keywords: ['设备健康', 'PC后台', 'B端系统', 'Vue'],
        hideHeader: true,
      },
    },
    {
      path: '/cases/lianzhu',
      name: 'dashboard-lianzhu',
      component: () => import('@/cases/data-screen-visualization/LianzhuDashboard.vue'),
      meta: {
        title: '连铸工艺数字孪生系统',
        description: '连铸工艺工业可视化大屏，包含 KPI、趋势、工艺流程和数字孪生主视觉。',
        keywords: ['连铸工艺', '数字孪生', '工业大屏', 'Data Visualization'],
        dashboardId: 'lianzhu',
        hideHeader: true,
      },
    },
    {
      path: '/cases/gaolu',
      name: 'dashboard-gaolu',
      component: () => import('@/cases/data-screen-visualization/LianzhuDashboard.vue'),
      meta: {
        title: '高炉工艺数字孪生系统',
        description: '高炉工艺工业可视化大屏，展示炉况状态、风量、铁水量、质量监控和工艺流程。',
        keywords: ['高炉工艺', '数字孪生', '工业可视化', 'Dashboard'],
        dashboardId: 'gaolu',
        hideHeader: true,
      },
    },
    {
      path: '/cases/lf',
      name: 'dashboard-lf',
      component: () => import('@/cases/data-screen-visualization/LianzhuDashboard.vue'),
      meta: {
        title: '精炼LF炉工艺数字孪生系统',
        description: '精炼 LF 炉工艺工业可视化大屏，展示电极功率、精炼时间、钢水重量和实时监测。',
        keywords: ['精炼LF炉', '工业大屏', 'ECharts', 'Vue'],
        dashboardId: 'lf',
        hideHeader: true,
      },
    },
    {
      path: '/cases/vd',
      name: 'dashboard-vd',
      component: () => import('@/cases/data-screen-visualization/LianzhuDashboard.vue'),
      meta: {
        title: '精炼VD炉工艺数字孪生系统',
        description: '精炼 VD 炉工艺工业可视化大屏，展示真空系统、氩气用量、冷却水和生产状态。',
        keywords: ['精炼VD炉', '工业可视化', '数字孪生', 'Dashboard'],
        dashboardId: 'vd',
        hideHeader: true,
      },
    },
    {
      path: '/cases/zhuanlu',
      name: 'dashboard-zhuanlu',
      component: () => import('@/cases/data-screen-visualization/LianzhuDashboard.vue'),
      meta: {
        title: '转炉工艺数字孪生系统',
        description: '转炉工艺工业可视化大屏，展示生产节拍、炉况监测、工艺流程和数据状态。',
        keywords: ['转炉工艺', '工业大屏', '数字孪生', '可视化设计'],
        dashboardId: 'zhuanlu',
        hideHeader: true,
      },
    },
    {
      path: '/cases/:id/mobile-design-system',
      name: 'case-mobile-design-system',
      component: () => import('@/views/CaseMobileDesignSpecPage.vue'),
      props: true,
      meta: {
        title: '移动端组件规范',
        description: '设备健康管理平台移动端组件规范，包含颜色、状态、卡片、表单和移动端页面规则。',
        keywords: ['移动端设计规范', '组件规范', 'APP设计', 'Design System'],
        hideHeader: true,
      },
    },
    {
      path: '/cases/:id/design-spec',
      name: 'case-design-spec',
      component: () => import('@/views/CaseDesignSpecPage.vue'),
      props: true,
      meta: {
        title: '设计规范',
        description: '设备健康管理平台设计规范，展示后台布局、组件状态、颜色系统和业务组件规则。',
        keywords: ['设计规范', 'Design System', 'B端设计', '组件库'],
        hideHeader: true,
      },
    },
    {
      path: '/cases/:id',
      name: 'case-detail',
      component: () => import('@/views/CaseDetail.vue'),
      props: true,
      meta: {
        title: '项目案例详情',
        description: '曹兰作品集项目案例详情，展示项目背景、设计挑战、解决方案、前端实现和 AI 工作流。',
        keywords: ['项目案例详情', 'UI设计', '前端实现', 'AI Workflow'],
      },
    },
    {
      path: '/demos/mini-program',
      name: 'mini-program-demo',
      component: () => import('@/demos/mini-program/MiniProgramDemo.vue'),
      meta: {
        title: `项目案例｜${miniProgramDemoTitle}`,
        description: '靓轩电商小程序高保真交互 Demo，展示首页、分类、活动、购物车和商品详情的移动端实现。',
        keywords: ['微信小程序', '电商设计', '移动端交互', '高保真Demo'],
      },
    },
    {
      path: '/demos/components',
      name: 'component-library-demo',
      component: () => import('@/components/Demo.vue'),
      meta: { title: '组件 Demo', description: '作品集通用组件 Demo 页面。', keywords: ['组件', 'Vue', 'Demo'] },
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import('@/views/Resume.vue'),
      meta: {
        title: '简历',
        description: '曹兰个人简历，包含工作经历、项目经验、技能能力和联系方式。',
        keywords: ['曹兰简历', '前端工程师简历', 'UI设计师简历'],
      },
    },
    {
      path: '/workflow',
      name: 'workflow',
      component: () => import('@/views/Workflow.vue'),
      meta: {
        title: 'AI 工作流',
        description: '曹兰 AI 辅助设计与前端实现工作流，覆盖需求拆解、Figma 设计、Codex 实现和还原走查。',
        keywords: ['AI 工作流', 'Codex', 'Figma', 'AI Design Workflow'],
      },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.afterEach((to) => {
  applyRouteSeo(to)
})

export default router
