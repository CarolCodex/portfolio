import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Cases from '@/views/Cases.vue'
import CaseDetail from '@/views/CaseDetail.vue'
import Resume from '@/views/Resume.vue'
import Workflow from '@/views/Workflow.vue'
import MiniProgramDemo from '@/demos/mini-program/MiniProgramDemo.vue'
import ComponentLibraryDemo from '@/components/Demo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/cases', name: 'cases', component: Cases },
    { path: '/cases/:id', name: 'case-detail', component: CaseDetail, props: true },
    { path: '/demos/mini-program', name: 'mini-program-demo', component: MiniProgramDemo },
    { path: '/demos/components', name: 'component-library-demo', component: ComponentLibraryDemo },
    { path: '/resume', name: 'resume', component: Resume },
    { path: '/workflow', name: 'workflow', component: Workflow },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
