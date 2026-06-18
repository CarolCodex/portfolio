import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { cases } from '@/data/cases'

const siteTitle = 'UI/UED Designer Portfolio'
const miniProgramDemoTitle = '靓轩电商小程序高保真交互 Demo'

const getRouteTitle = (to: { path: string; params: Record<string, unknown>; meta: Record<string, unknown> }) => {
  if (to.path === '/demos/mini-program') {
    return `项目案例｜${miniProgramDemoTitle}`
  }

  if (to.path.startsWith('/cases/') && to.path.endsWith('/design-spec') && typeof to.params.id === 'string') {
    const item = cases.find((caseItem) => caseItem.id === to.params.id)
    return item ? `设计规范｜${item.title}` : '设计规范不存在'
  }

  if (to.path.startsWith('/cases/') && typeof to.params.id === 'string') {
    const item = cases.find((caseItem) => caseItem.id === to.params.id)
    return item ? `项目案例｜${item.title}` : '案例不存在'
  }

  return typeof to.meta.title === 'string' ? to.meta.title : siteTitle
}

const router = createRouter({
  history: import.meta.env.PROD
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue'), meta: { title: siteTitle } },
    { path: '/cases', name: 'cases', component: () => import('@/views/Cases.vue'), meta: { title: '项目案例' } },
    { path: '/cases/liangxuan-mini-program', redirect: '/demos/mini-program' },
    { path: '/cases/mini-program', redirect: '/demos/mini-program' },
    {
      path: '/cases/:id/design-spec',
      name: 'case-design-spec',
      component: () => import('@/views/CaseDesignSpecPage.vue'),
      props: true,
      meta: { title: '设计规范' },
    },
    {
      path: '/cases/:id',
      name: 'case-detail',
      component: () => import('@/views/CaseDetail.vue'),
      props: true,
      meta: { title: '项目案例详情' },
    },
    {
      path: '/demos/mini-program',
      name: 'mini-program-demo',
      component: () => import('@/demos/mini-program/MiniProgramDemo.vue'),
      meta: {
        title: `项目案例｜${miniProgramDemoTitle}`,
      },
    },
    {
      path: '/demos/components',
      name: 'component-library-demo',
      component: () => import('@/components/Demo.vue'),
      meta: { title: '组件 Demo' },
    },
    { path: '/resume', name: 'resume', component: () => import('@/views/Resume.vue'), meta: { title: '简历' } },
    { path: '/workflow', name: 'workflow', component: () => import('@/views/Workflow.vue'), meta: { title: 'AI 工作流' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.afterEach((to) => {
  const routeTitle = getRouteTitle(to)
  document.title = routeTitle === siteTitle ? siteTitle : `${routeTitle} - ${siteTitle}`
})

export default router
