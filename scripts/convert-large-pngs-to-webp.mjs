import { chromium } from 'playwright'
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const publicDir = new URL('../public/', import.meta.url)
const minBytes = 1024 * 1024

const excluded = new Set()

const maxDimensionRules = [
  [/demo-home-assets\/category-icons\//, 320],
  [/demo-category-assets\/images\/cat-/, 420],
  [/demo-home-assets\/cat-/, 420],
  [/demo-activity-assets\/images\/banner-/, 1200],
  [/demo-home-assets\/banner-/, 1200],
  [/demo-home-assets\/product-/, 900],
  [/liangxuan-(home|activity)\.png$/, 900],
  [/images\/resume\/diploma-preview\.png$/, 1600],
]

function toFilePath(url) {
  return fileURLToPath(url)
}

async function listLargePngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...await listLargePngs(fullPath))
      continue
    }

    if (extname(entry.name).toLowerCase() !== '.png') continue

    const relativePath = relative(toFilePath(publicDir), fullPath)

    if (excluded.has(relativePath)) continue

    const fileStat = await stat(fullPath)
    if (fileStat.size > minBytes) {
      files.push({ fullPath, relativePath, size: fileStat.size })
    }
  }

  return files
}

function maxDimensionFor(relativePath) {
  return maxDimensionRules.find(([pattern]) => pattern.test(relativePath))?.[1] ?? 1200
}

function webpPathFor(fullPath) {
  return fullPath.replace(/\.png$/i, '.webp')
}

const files = await listLargePngs(toFilePath(publicDir))

if (files.length === 0) {
  console.log('No large PNG files to convert.')
  process.exit(0)
}

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
})
const page = await browser.newPage()

const results = []

for (const file of files) {
  const sourceBuffer = await readFile(file.fullPath)
  const sourceDataUrl = `data:image/png;base64,${sourceBuffer.toString('base64')}`
  const maxDimension = maxDimensionFor(file.relativePath)

  const webpBase64 = await page.evaluate(
    async ({ sourceDataUrl, maxDimension }) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = sourceDataUrl
      await image.decode()

      const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight))
      const width = Math.max(1, Math.round(image.naturalWidth * scale))
      const height = Math.max(1, Math.round(image.naturalHeight * scale))
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const context = canvas.getContext('2d', { alpha: true })
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      context.drawImage(image, 0, 0, width, height)

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82))
      if (!blob) throw new Error('Failed to encode WebP')

      const arrayBuffer = await blob.arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)
      let binary = ''
      for (let index = 0; index < bytes.length; index += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000))
      }

      return {
        base64: btoa(binary),
        width,
        height,
      }
    },
    { sourceDataUrl, maxDimension },
  )

  const outputPath = webpPathFor(file.fullPath)
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, Buffer.from(webpBase64.base64, 'base64'))

  const outputStat = await stat(outputPath)
  results.push({
    source: file.relativePath,
    output: relative(toFilePath(publicDir), outputPath),
    beforeKB: Math.round(file.size / 1024),
    afterKB: Math.round(outputStat.size / 1024),
    width: webpBase64.width,
    height: webpBase64.height,
  })
}

await browser.close()

const reportPath = new URL('tmp-large-png-webp-report.json', root)
await writeFile(reportPath, JSON.stringify(results, null, 2))

for (const item of results) {
  console.log(`${item.beforeKB}KB -> ${item.afterKB}KB  ${item.output} (${item.width}x${item.height})`)
}

console.log(`Report: ${toFilePath(reportPath)}`)
