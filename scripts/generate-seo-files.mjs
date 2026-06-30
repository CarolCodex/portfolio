import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const basePath = process.env.VITE_BASE_PATH || '/'
const siteUrl = process.env.VITE_SITE_URL || 'https://carolcodex.github.io/portfolio/'

const normalizeUrl = (value) => (value.endsWith('/') ? value : `${value}/`)
const normalizedSiteUrl = normalizeUrl(siteUrl)

const routes = [
  '/',
  '/cases',
  '/cases/data-screen-visualization',
  '/cases/gaolu',
  '/cases/lf',
  '/cases/vd',
  '/cases/zhuanlu',
  '/cases/lianzhu',
  '/cases/device-health-management-platform',
  '/cases/device-health-management-platform/design-spec',
  '/cases/device-health-management-platform/mobile-design-system',
  '/demos/mini-program',
  '/workflow',
  '/resume',
]

const toCleanLocation = (route) => {
  const path = route === '/' ? '' : route.replace(/^\//, '')
  return `${normalizedSiteUrl}${path}`
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${toCleanLocation(route)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: ${basePath}

Sitemap: ${normalizedSiteUrl}sitemap.xml
`

await mkdir(resolve('dist'), { recursive: true })
await writeFile(resolve('dist/sitemap.xml'), sitemap, 'utf8')
await writeFile(resolve('dist/robots.txt'), robots, 'utf8')

console.log('Generated sitemap.xml and robots.txt')
