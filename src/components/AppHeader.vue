<template>
  <header
    class="app-header"
    :class="{
      'app-header--home': route.path === '/',
      'app-header--home-banner': isHomeBanner,
      'app-header--workflow': route.path === '/workflow',
    }"
  >
    <div class="header-inner">
      <div class="header-leading">
        <RouterLink class="brand" to="/" aria-label="返回首页">
          <img class="brand-mark" :src="avatarUrl" alt="曹兰头像" width="36" height="36" loading="eager" decoding="async" />
          <span>曹兰+简历作品集</span>
        </RouterLink>
        <RouterLink v-if="headerBackLink" class="case-back-link" :to="headerBackLink.to">
          {{ headerBackLink.label }}
        </RouterLink>
      </div>
      <nav class="nav-links" aria-label="主导航">
        <RouterLink v-for="item in navItems" :key="item.path" :to="item.path">
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import avatarUrl from '@/assets/avatar-cao-lan-320.jpg'
import { rafThrottle } from '@/utils/performance'

const route = useRoute()
const isHomeBanner = ref(false)
let isHomeHeaderListening = false

const headerBackLink = computed(() => {
  if (route.path === '/demos/mini-program') {
    return { label: '返回案例列表', to: '/cases' }
  }

  if (route.path.startsWith('/cases/')) {
    return { label: '返回案例列表', to: '/cases' }
  }

  return null
})

const navItems = [
  { label: '首页', path: '/' },
  { label: '案例', path: '/cases' },
  { label: 'AI 工作流', path: '/workflow' },
  { label: '简历', path: '/resume' },
]

const updateHomeHeaderState = () => {
  if (route.path !== '/') {
    isHomeBanner.value = false
    return
  }

  const firstContentSection = document.querySelector<HTMLElement>('.home-page > .container.section')
  if (!firstContentSection) {
    isHomeBanner.value = window.scrollY < 120
    return
  }

  isHomeBanner.value = firstContentSection.getBoundingClientRect().top > 150
}

const scheduleHomeHeaderStateUpdate = rafThrottle(() => {
  if (route.path !== '/') return
  updateHomeHeaderState()
})

const addHomeHeaderListeners = () => {
  if (isHomeHeaderListening) return
  window.addEventListener('scroll', scheduleHomeHeaderStateUpdate, { passive: true })
  window.addEventListener('resize', scheduleHomeHeaderStateUpdate, { passive: true })
  isHomeHeaderListening = true
}

const removeHomeHeaderListeners = () => {
  if (!isHomeHeaderListening) return
  window.removeEventListener('scroll', scheduleHomeHeaderStateUpdate)
  window.removeEventListener('resize', scheduleHomeHeaderStateUpdate)
  isHomeHeaderListening = false
}

const syncHomeHeaderState = () => {
  if (route.path === '/') {
    addHomeHeaderListeners()
    updateHomeHeaderState()
    return
  }

  removeHomeHeaderListeners()
  isHomeBanner.value = false
}

onMounted(() => {
  syncHomeHeaderState()
})

onBeforeUnmount(() => {
  scheduleHomeHeaderStateUpdate.cancel()
  removeHomeHeaderListeners()
})

watch(
  () => route.path,
  async () => {
    await nextTick()
    syncHomeHeaderState()
  },
)
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: 76px;
  border-bottom: 1px solid rgba(220, 235, 255, 0.7);
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 6px 22px rgba(15, 42, 95, 0.035);
}

.app-header--home {
  position: fixed;
  right: 0;
  left: 0;
  z-index: 80;
  margin-bottom: 0;
}

.app-header--home-banner {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(238, 248, 255, 0.24) 48%,
    rgba(255, 255, 255, 0.2) 100%
  );
  border-bottom-color: rgba(255, 255, 255, 0.14);
  box-shadow: none;
}

.app-header--workflow {
  border-bottom-color: rgba(91, 140, 255, 0.16);
  background: rgba(5, 7, 13, 0.82);
  box-shadow: 0 14px 42px rgba(0, 0, 0, 0.28);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(100% - 64px, 1240px);
  height: 100%;
  margin: 0 auto;
  gap: 24px;
}

.header-leading {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  gap: 16px;
}

.case-back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 8px 14px;
  border: 1px solid rgba(80, 144, 220, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  color: #31577c;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 10px 22px rgba(47, 122, 210, 0.055);
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.case-back-link:hover {
  border-color: rgba(80, 162, 255, 0.42);
  background: rgba(232, 244, 255, 0.8);
  color: #0b4bb3;
  transform: translateY(-1px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.brand span {
  color: #092b66;
}

.brand-mark {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.68);
  border-radius: 999px;
  object-fit: cover;
  object-position: center 18%;
  box-shadow: 0 14px 30px rgba(13, 110, 253, 0.22);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.52);
  box-shadow: 0 10px 26px rgba(47, 122, 210, 0.055);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.app-header--home-banner .nav-links {
  border-color: rgba(255, 255, 255, 0.46);
  background: rgba(255, 255, 255, 0.38);
  box-shadow: 0 10px 28px rgba(0, 72, 170, 0.08);
}

.app-header--home-banner .brand span {
  color: #fff;
  text-shadow: 0 8px 22px rgba(0, 74, 170, 0.18);
}

.app-header--workflow .brand span {
  color: #f5f8ff;
}

.app-header--workflow .brand-mark {
  border-color: rgba(91, 140, 255, 0.32);
  box-shadow: 0 0 28px rgba(47, 107, 255, 0.26);
}

.app-header--workflow .nav-links {
  border-color: rgba(91, 140, 255, 0.18);
  background: rgba(11, 20, 36, 0.7);
  box-shadow: 0 0 34px rgba(47, 107, 255, 0.12);
}

.nav-links a {
  padding: 9px 14px;
  border-radius: 999px;
  color: #31577c;
  font-size: 14px;
  white-space: nowrap;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.app-header--home-banner .nav-links a {
  color: rgba(255, 255, 255, 0.82);
}

.app-header--workflow .nav-links a {
  color: rgba(190, 205, 230, 0.78);
}

.nav-links a:hover {
  background: rgba(232, 244, 255, 0.72);
  color: #0b4bb3;
}

.app-header--home-banner .nav-links a:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.app-header--workflow .nav-links a:hover {
  background: rgba(47, 107, 255, 0.14);
  color: #f5f8ff;
}

.nav-links a.router-link-active {
  background: linear-gradient(135deg, #0b4bb3, #0d7cff);
  color: #fff;
  box-shadow: 0 10px 24px rgba(13, 110, 253, 0.24);
}

.app-header--home-banner .nav-links a.router-link-active {
  color: #fff;
  box-shadow: 0 10px 24px rgba(13, 110, 253, 0.26);
}

.app-header--workflow .nav-links a.router-link-active {
  background: linear-gradient(135deg, #2f6bff, #27c3ff 58%, #8b5cff);
  color: #fff;
  box-shadow: 0 0 28px rgba(47, 107, 255, 0.34);
}

@media (max-width: 720px) {
  .app-header {
    height: 66px;
  }

  .header-inner {
    width: min(100% - 28px, 1240px);
    gap: 12px;
  }

  .header-leading {
    gap: 10px;
  }

  .case-back-link {
    min-height: 34px;
    padding: 7px 11px;
    font-size: 13px;
  }

  .nav-links {
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    justify-content: flex-start;
    scrollbar-width: none;
  }

  .nav-links::-webkit-scrollbar {
    display: none;
  }

  .brand-mark {
    width: 34px;
    height: 34px;
  }

  .nav-links a {
    padding: 8px 12px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .header-leading {
    flex-shrink: 0;
  }

  .brand {
    gap: 8px;
  }

  .brand span {
    display: none;
  }

  .nav-links {
    padding: 5px;
  }

  .nav-links a {
    padding: 8px 10px;
  }
}
</style>
