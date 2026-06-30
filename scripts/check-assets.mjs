import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const publicDir = join(root, 'public')
const scanRoots = ['index.html', 'src', 'components', 'views', 'cases']
const sourceExtensions = new Set(['.css', '.html', '.js', '.mjs', '.ts', '.tsx', '.vue'])
const assetExtensions = new Set([
  '.avif',
  '.gif',
  '.jpg',
  '.jpeg',
  '.mp4',
  '.png',
  '.svg',
  '.webm',
  '.webp',
  '.woff',
  '.woff2',
])

const readFiles = (entry) => {
  const fullPath = join(root, entry)
  if (!existsSync(fullPath)) return []

  const stats = statSync(fullPath)
  if (stats.isFile()) {
    return sourceExtensions.has(extname(fullPath)) ? [fullPath] : []
  }

  return readdirSync(fullPath).flatMap((child) => readFiles(join(entry, child)))
}

const files = scanRoots.flatMap(readFiles)
const assetPattern = /(?<![A-Za-z0-9_$}])(?:%BASE_URL%\/?|\/)(?:case-assets|images)\/[^'"`)\s<>]+/g
const publicImportPattern = /(?:import\s+[^'"]+\s+from\s+|require\()\s*['"]\/(?:case-assets|images)\//g
const unresolvedAssets = []
const publicImports = []
const seen = new Set()

for (const file of files) {
  const source = readFileSync(file, 'utf8')
  const relativeFile = relative(root, file)

  for (const match of source.matchAll(publicImportPattern)) {
    publicImports.push(`${relativeFile}: ${match[0].trim()}`)
  }

  for (const match of source.matchAll(assetPattern)) {
    const rawPath = match[0]
    const cleanedPath = rawPath
      .replace(/^%BASE_URL%\/?/, '')
      .replace(/^\/+/, '')
      .replace(/[?#].*$/, '')
    const extension = extname(cleanedPath).toLowerCase()

    if (!assetExtensions.has(extension)) continue

    const publicPath = join(publicDir, cleanedPath)
    const key = `${relativeFile}:${cleanedPath}`
    if (!existsSync(publicPath) && !seen.has(key)) {
      seen.add(key)
      unresolvedAssets.push({
        file: relativeFile,
        asset: rawPath,
        expected: relative(root, publicPath),
      })
    }
  }
}

if (publicImports.length > 0) {
  console.error('Public assets must not be imported by absolute public URL:')
  for (const item of publicImports) console.error(`- ${item}`)
  process.exitCode = 1
}

if (unresolvedAssets.length > 0) {
  console.error('Missing public asset references:')
  for (const item of unresolvedAssets) {
    console.error(`- ${item.file}: ${item.asset} -> ${item.expected}`)
  }
  process.exitCode = 1
}

if (!process.exitCode) {
  console.log(`Asset check passed: ${files.length} source files scanned`)
}
