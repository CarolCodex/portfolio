import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { cases } from '@/data/cases'
import { images } from '@/shared/assets'

const siteTitle = '曹兰 | AI Frontend Engineer Portfolio'
const siteDescription = '曹兰个人简历作品集，展示 AI 前端工程、UI/UED 设计、Vue 前端实现、工业大屏可视化和产品设计工作流。'
const siteKeywords = [
  '曹兰',
  '前端工程师',
  'AI Frontend Engineer',
  'UI设计',
  'UED',
  'Vue',
  'Vite',
  '数据大屏',
  'Data Visualization',
  'Portfolio',
]

type SeoInput = {
  title: string
  description: string
  keywords?: string[]
  image?: string
}

const absoluteUrl = (path: string) => {
  const origin = window.location.origin
  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  return `${origin}${normalizedBase}${normalizedPath}`
}

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value)
  })
}

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }

  element.href = href
}

const getRouteSeo = (route: RouteLocationNormalizedLoaded): SeoInput => {
  const metaTitle = typeof route.meta.title === 'string' ? route.meta.title : siteTitle
  const metaDescription = typeof route.meta.description === 'string' ? route.meta.description : ''
  const metaKeywords = Array.isArray(route.meta.keywords)
    ? route.meta.keywords.filter((item): item is string => typeof item === 'string')
    : []

  if (route.path.startsWith('/cases/') && typeof route.params.id === 'string') {
    const item = cases.find((caseItem) => caseItem.id === route.params.id)

    if (item) {
      return {
        title: route.path.endsWith('/design-spec') ? `设计规范｜${item.title}` : `项目案例｜${item.title}`,
        description: item.summary,
        keywords: [item.title, item.category, item.platform, ...item.tags],
        image: item.coverImage,
      }
    }
  }

  return {
    title: metaTitle,
    description: metaDescription || siteDescription,
    keywords: metaKeywords,
  }
}

export const applyRouteSeo = (route: RouteLocationNormalizedLoaded) => {
  const seo = getRouteSeo(route)
  const title = seo.title === siteTitle ? siteTitle : `${seo.title} - ${siteTitle}`
  const keywords = [...new Set([...siteKeywords, ...(seo.keywords ?? [])])].join(', ')
  const canonical = absoluteUrl(`#${route.fullPath}`)
  const image = seo.image ? absoluteUrl(seo.image) : absoluteUrl(images.home.heroFolder1280)

  document.title = title
  upsertCanonical(canonical)
  upsertMeta('meta[name="description"]', { name: 'description', content: seo.description })
  upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords })
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteTitle })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image })
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })
}
