import { chromium } from 'playwright'
import { mkdir, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const outputDir = path.join(rootDir, 'design-handoff', 'screenshots')
const baseUrl = process.env.PORTFOLIO_BASE_URL || 'http://localhost:5173'

const pages = [
  { path: '/', file: '01-home.png', name: '首页' },
  { path: '/cases', file: '02-cases.png', name: '案例页' },
  { path: '/resume', file: '03-resume.png', name: '简历页' },
  { path: '/workflow', file: '04-workflow.png', name: 'AI 工作流页' },
  { path: '/cases/liangxuan-mini-program', file: '05-case-liangxuan-mini-program.png', name: '小程序案例详情页' },
  { path: '/demos/mini-program', file: '06-demo-mini-program.png', name: '小程序 Demo' },
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

async function main() {
  await mkdir(outputDir, { recursive: true })

  const executablePath = await findExecutablePath()
  const browser = await chromium.launch({ headless: true, executablePath })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  for (const item of pages) {
    const url = new URL(item.path, baseUrl).toString()
    const outputPath = path.join(outputDir, item.file)

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      if (!response || response.status() >= 400) {
        console.warn(`skip ${item.name}: ${url} returned ${response?.status() ?? 'no response'}`)
        continue
      }

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
      await page.waitForTimeout(1000)
      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto'
        document.documentElement.style.overflowX = 'hidden'
        document.body.style.overflowX = 'hidden'
      })

      await page.screenshot({ path: outputPath, fullPage: true, type: 'png' })
      console.log(`saved ${item.name}: ${path.relative(rootDir, outputPath)}`)
    } catch (error) {
      console.warn(`skip ${item.name}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  await browser.close()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
