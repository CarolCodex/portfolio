import { readdir, stat } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const scanDirs = ['public', 'src/assets']
const mediaExtensions = new Set(['.avif', '.gif', '.jpg', '.jpeg', '.mov', '.mp4', '.png', '.webm', '.webp'])
const warnBytes = 150 * 1024
const criticalBytes = 1024 * 1024

async function collectMediaFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      files.push(...await collectMediaFiles(fullPath))
      continue
    }

    const extension = extname(entry.name).toLowerCase()
    if (!mediaExtensions.has(extension)) continue

    const fileStat = await stat(fullPath)
    files.push({
      path: relative(root, fullPath),
      extension,
      size: fileStat.size,
    })
  }

  return files
}

function formatKB(bytes) {
  return `${Math.round(bytes / 1024)}KB`
}

function recommendation(file) {
  if (['.mp4', '.mov'].includes(file.extension)) {
    return '转 WebM/MP4 双格式，preload="metadata"，可见后再播放'
  }

  if (file.size >= criticalBytes) {
    return '优先压缩并生成 WebP/AVIF；按实际展示尺寸降采样'
  }

  if (['.png', '.jpg', '.jpeg'].includes(file.extension)) {
    return '考虑 WebP/AVIF；非首屏保持 loading="lazy"'
  }

  return '确认非首屏懒加载；保持 decoding="async"'
}

const files = (await Promise.all(
  scanDirs.map((dir) => collectMediaFiles(fileURLToPath(new URL(`../${dir}`, import.meta.url)))),
)).flat()

const flagged = files
  .filter((file) => file.size >= warnBytes)
  .sort((a, b) => b.size - a.size)

const totalBytes = files.reduce((sum, file) => sum + file.size, 0)

console.log(`Media files: ${files.length}`)
console.log(`Total media size: ${formatKB(totalBytes)}`)
console.log(`Flagged >= ${formatKB(warnBytes)}: ${flagged.length}`)
console.log('')

if (flagged.length === 0) {
  console.log('No large media files found.')
  process.exit(0)
}

console.log('| Size | File | Recommendation |')
console.log('| ---: | --- | --- |')

for (const file of flagged) {
  console.log(`| ${formatKB(file.size)} | ${file.path} | ${recommendation(file)} |`)
}
