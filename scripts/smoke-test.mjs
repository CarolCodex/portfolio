import { chromium } from 'playwright'
import { spawn } from 'node:child_process'

const port = Number(process.env.PORT || 4173)
const baseUrl = `http://127.0.0.1:${port}`

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const preview = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)], {
  stdio: ['ignore', 'pipe', 'pipe'],
})

const cleanup = async (browser) => {
  await browser?.close().catch(() => {})
  preview.kill('SIGTERM')
}

const waitForPreview = async () => {
  const deadline = Date.now() + 20_000
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl)
      if (response.ok) return
    } catch {
      await wait(300)
    }
  }

  throw new Error('vite preview did not start in time')
}

let browser

try {
  await waitForPreview()
  browser = await chromium.launch()
  const page = await browser.newPage()
  const assetFailures = []
  const assetRequestPattern = /\.(?:avif|css|gif|jpe?g|js|mp4|png|svg|webm|webp|woff2?)(?:[?#].*)?$/i

  page.on('response', (response) => {
    const url = response.url()
    if (response.status() >= 400 && assetRequestPattern.test(url)) {
      assetFailures.push(`${response.status()} ${url}`)
    }
  })

  page.on('requestfailed', (request) => {
    const url = request.url()
    const errorText = request.failure()?.errorText ?? 'unknown error'
    if (assetRequestPattern.test(url) && errorText !== 'net::ERR_ABORTED') {
      assetFailures.push(`request failed ${url}: ${errorText}`)
    }
  })

  const desktopRoutes = [
    ['home', `${baseUrl}/#/`],
    ['cases', `${baseUrl}/#/cases`],
    ['data screen gallery', `${baseUrl}/#/cases/data-screen-visualization`],
    ['lf dashboard', `${baseUrl}/#/cases/lf`],
    ['device health case', `${baseUrl}/#/cases/device-health-management-platform`],
    ['liangxuan case', `${baseUrl}/#/cases/liangxuan-mini-program`],
    ['mini program demo', `${baseUrl}/#/demos/mini-program`],
    ['resume', `${baseUrl}/#/resume`],
    ['history deep link redirect', `${baseUrl}/cases/lf`],
  ]

  for (const [name, url] of desktopRoutes) {
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {})
    const title = await page.title()
    if (!title) throw new Error(`${name} has empty title`)
    const hasMainContent = await page.locator('main, h1, [data-dashboard-id]').count()
    if (hasMainContent === 0) throw new Error(`${name} did not render expected content`)
  }

  if (assetFailures.length > 0) {
    throw new Error(`asset request failures:\n${[...new Set(assetFailures)].join('\n')}`)
  }

  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto(`${baseUrl}/#/cases/data-screen-visualization`, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {})
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  if (overflow) {
    const sizes = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }))
    throw new Error(`mobile horizontal overflow: ${JSON.stringify(sizes)}`)
  }

  if (assetFailures.length > 0) {
    throw new Error(`asset request failures:\n${[...new Set(assetFailures)].join('\n')}`)
  }

  console.log('Smoke tests passed')
  await cleanup(browser)
} catch (error) {
  await cleanup(browser)
  console.error(error)
  process.exit(1)
}
