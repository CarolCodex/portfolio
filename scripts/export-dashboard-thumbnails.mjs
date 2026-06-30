import { chromium } from 'playwright'
import { access } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const baseUrl = process.env.PORTFOLIO_BASE_URL || 'http://localhost:5173'

const dashboards = [
  { route: '/cases/gaolu', file: 'gaolu-dashboard.png', name: '高炉' },
  { route: '/cases/lf', file: 'lf-dashboard.png', name: '精炼LF炉' },
  { route: '/cases/vd', file: 'vd-dashboard.png', name: '精炼VD炉' },
  { route: '/cases/zhuanlu', file: 'zhuanlu-dashboard.png', name: '转炉' },
  { route: '/cases/lianzhu', file: 'lianzhu-dashboard.png', name: '连铸' },
]

const localChromePaths = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
]

async function findExecutablePath() {
  for (const candidate of localChromePaths) {
    try {
      await access(candidate, constants.X_OK)
      return candidate
    } catch {
      // Keep looking for a local browser.
    }
  }

  return undefined
}

async function settleDashboard(page) {
  await page.addStyleTag({
    content: `
      vite-error-overlay,
      [data-vite-dev-id],
      .__debug,
      .debug,
      #webpack-dev-server-client-overlay,
      #webpack-dev-server-client-overlay-div {
        display: none !important;
        visibility: hidden !important;
      }
    `,
  })

  await page.waitForSelector('.lianzhu-stage', { state: 'visible', timeout: 30000 })
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const video = document.querySelector('video.model-video')
    if (!video) return

    video.muted = true
    video.pause()

    if (video.readyState < 1) {
      await new Promise((resolve, reject) => {
        const timer = window.setTimeout(() => reject(new Error('Video metadata timeout')), 10000)
        video.addEventListener(
          'loadedmetadata',
          () => {
            window.clearTimeout(timer)
            resolve()
          },
          { once: true },
        )
        video.addEventListener(
          'error',
          () => {
            window.clearTimeout(timer)
            reject(new Error('Video failed to load'))
          },
          { once: true },
        )
      })
    }

    const targetTime = Number.isFinite(video.duration) ? Math.min(1.2, Math.max(0, video.duration - 0.1)) : 1.2

    await new Promise((resolve) => {
      const done = () => resolve()
      video.addEventListener('seeked', done, { once: true })
      video.currentTime = targetTime
      window.setTimeout(done, 1200)
    })

    video.pause()
  })

  await page.waitForTimeout(300)
}

async function main() {
  const executablePath = await findExecutablePath()
  const browser = await chromium.launch({ headless: true, executablePath })
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  })
  const page = await context.newPage()

  for (const dashboard of dashboards) {
    const url = new URL(dashboard.route, baseUrl).toString()
    const outputPath = path.join(rootDir, 'public', 'case-assets', 'data-screen-visualization', dashboard.file)

    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
    if (!response || response.status() >= 400) {
      throw new Error(`${dashboard.name} page returned ${response?.status() ?? 'no response'}`)
    }

    await settleDashboard(page)
    await page.locator('.lianzhu-stage').screenshot({
      path: outputPath,
      type: 'png',
      timeout: 30000,
    })

    console.log(`saved ${dashboard.name}: ${path.relative(rootDir, outputPath)}`)
  }

  await browser.close()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
