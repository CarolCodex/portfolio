import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'

const normalizeBasePath = (basePath: string) => {
  if (!basePath) return '/'

  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

const redirectHistoryPathToHash = () => {
  const base = normalizeBasePath(import.meta.env.BASE_URL || '/')
  const path = window.location.pathname
  const route = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, '')

  if (!route) return

  const hasRouteHash = window.location.hash && window.location.hash !== '#/'
  if (hasRouteHash) return

  const normalizedRoute = route.startsWith('/') ? route : `/${route}`
  window.location.replace(`${base}#${normalizedRoute}${window.location.search}`)
}

const fallbackImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop stop-color="%23061733"/%3E%3Cstop offset="1" stop-color="%231677ff"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="640" height="360" fill="url(%23g)"/%3E%3Cpath d="M104 246h432l-93-113-72 83-47-54-73 84-42-48-105 48Z" fill="%23ffffff" opacity=".22"/%3E%3Ccircle cx="214" cy="126" r="34" fill="%23ffffff" opacity=".26"/%3E%3C/svg%3E'

const installGlobalImageFallback = () => {
  document.addEventListener(
    'error',
    (event) => {
      const target = event.target
      if (!(target instanceof HTMLImageElement) || target.dataset.assetFallback === 'true') return

      target.dataset.assetFallback = 'true'
      target.src = fallbackImage
    },
    true,
  )
}

redirectHistoryPathToHash()
installGlobalImageFallback()

createApp(App).use(router).mount('#app')
