import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'

const fallbackImage =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0" x2="1" y1="0" y2="1"%3E%3Cstop stop-color="%23eef6ff"/%3E%3Cstop offset="1" stop-color="%23dbeafe"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="640" height="360" fill="url(%23g)"/%3E%3Cpath d="M104 246h432l-93-113-72 83-47-54-73 84-42-48-105 48Z" fill="%230d6efd" opacity=".2"/%3E%3Ccircle cx="214" cy="126" r="34" fill="%230d6efd" opacity=".18"/%3E%3C/svg%3E'

const publicAssetPathPattern = /^\/(case-assets|images)\//
const publicAssetAbsolutePattern = new RegExp(`^${window.location.origin}/(case-assets|images)/`)

const normalizeBasePath = (basePath: string) => {
  if (!basePath) return '/'

  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

const getBasePath = () => normalizeBasePath(import.meta.env.BASE_URL || '/')

const withBasePublicAssetPath = (value: string) => {
  const base = getBasePath()
  if (base === '/') return value

  if (publicAssetPathPattern.test(value)) {
    return `${base}${value.replace(/^\/+/, '')}`
  }

  if (publicAssetAbsolutePattern.test(value)) {
    return `${window.location.origin}${base}${value.replace(window.location.origin, '').replace(/^\/+/, '')}`
  }

  return value
}

const rewriteSrcset = (srcset: string) =>
  srcset
    .split(',')
    .map((entry) => {
      const parts = entry.trim().split(/\s+/)
      if (!parts[0]) return entry
      return [withBasePublicAssetPath(parts[0]), ...parts.slice(1)].join(' ')
    })
    .join(', ')

const rewriteCssAssetUrls = (value: string) =>
  value.replace(/url\(["']?([^"')]+)["']?\)/g, (_match, url: string) => `url("${withBasePublicAssetPath(url)}")`)

const redirectHistoryPathToHash = () => {
  const base = getBasePath()
  const path = window.location.pathname
  const route = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, '')

  if (!route) return

  const hasRouteHash = window.location.hash && window.location.hash !== '#/'
  if (hasRouteHash) return

  const normalizedRoute = route.startsWith('/') ? route : `/${route}`
  window.location.replace(`${base}#${normalizedRoute}${window.location.search}`)
}

const normalizePublicAssetElement = (element: Element) => {
  if (element instanceof HTMLImageElement || element instanceof HTMLVideoElement || element instanceof HTMLSourceElement) {
    const src = element.getAttribute('src')
    if (src) {
      const nextSrc = withBasePublicAssetPath(src)
      if (nextSrc !== src) element.setAttribute('src', nextSrc)
    }
  }

  if (element instanceof HTMLImageElement || element instanceof HTMLSourceElement) {
    const srcset = element.getAttribute('srcset')
    if (srcset) {
      const nextSrcset = rewriteSrcset(srcset)
      if (nextSrcset !== srcset) element.setAttribute('srcset', nextSrcset)
    }
  }

  if (element instanceof HTMLElement) {
    const backgroundImage = element.style.backgroundImage
    if (backgroundImage) {
      const nextBackgroundImage = rewriteCssAssetUrls(backgroundImage)
      if (nextBackgroundImage !== backgroundImage) element.style.backgroundImage = nextBackgroundImage
    }
  }
}

const installPublicAssetBaseFallback = () => {
  const normalizeTree = (root: ParentNode) => {
    root.querySelectorAll('img, source, video, [style]').forEach(normalizePublicAssetElement)
  }

  normalizeTree(document)

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.target instanceof Element) {
        normalizePublicAssetElement(mutation.target)
        return
      }

      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return
        normalizePublicAssetElement(node)
        normalizeTree(node)
      })
    })
  }).observe(document.documentElement, {
    attributeFilter: ['src', 'srcset', 'style'],
    attributes: true,
    childList: true,
    subtree: true,
  })
}

const installGlobalImageFallback = () => {
  document.addEventListener(
    'error',
    (event) => {
      const target = event.target
      if (target instanceof HTMLSourceElement && target.parentElement instanceof HTMLPictureElement) {
        target.removeAttribute('srcset')
        return
      }

      if (target instanceof HTMLVideoElement) {
        target.dataset.videoFallback = 'true'
        target.pause()
        target.querySelectorAll('source').forEach((source) => source.removeAttribute('src'))
        target.removeAttribute('src')
        target.load()
        return
      }

      if (!(target instanceof HTMLImageElement) || target.dataset.assetFallback === 'true') return

      target.dataset.assetFallback = 'true'
      target.removeAttribute('srcset')
      target.src = fallbackImage
      event.preventDefault()
    },
    true,
  )
}

const assetUrlPattern = /url\(["']?([^"')]+(?:case-assets|images)[^"')]+)["']?\)/g

const installBackgroundAssetFallback = () => {
  const checked = new WeakSet<Element>()

  const verifyBackgrounds = () => {
    document.querySelectorAll<HTMLElement>('*').forEach((element) => {
      if (checked.has(element)) return
      checked.add(element)

      const backgroundImage = window.getComputedStyle(element).backgroundImage
      if (!backgroundImage || backgroundImage === 'none') return

      const rewrittenBackground = rewriteCssAssetUrls(backgroundImage)
      if (rewrittenBackground !== backgroundImage) {
        element.style.backgroundImage = rewrittenBackground
      }

      for (const match of backgroundImage.matchAll(assetUrlPattern)) {
        const url = withBasePublicAssetPath(match[1])
        const probe = new Image()
        probe.onerror = () => {
          element.dataset.assetBackgroundFallback = 'true'
          element.style.backgroundImage = `url("${fallbackImage}")`
        }
        probe.src = url
      }
    })
  }

  window.requestAnimationFrame(verifyBackgrounds)
  new MutationObserver(() => window.requestAnimationFrame(verifyBackgrounds)).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
}

redirectHistoryPathToHash()
installPublicAssetBaseFallback()
installGlobalImageFallback()
installBackgroundAssetFallback()

const app = createApp(App)
app.config.errorHandler = () => {
  document.documentElement.dataset.safeRender = 'runtime-error'
}

app.use(router).mount('#app')
