import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative, resolve } from 'node:path'

const root = process.cwd()
const srcDir = join(root, 'src')
const extensions = ['.ts', '.tsx', '.vue', '.js', '.mjs', '.json']
const sourceExtensions = new Set(['.ts', '.tsx', '.vue', '.js', '.mjs'])
const importPattern =
  /(?:import|export)\s+(?:type\s+)?(?:[^'"()]*?\s+from\s+)?['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g

const readFiles = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) return readFiles(fullPath)
    return sourceExtensions.has(extname(fullPath)) ? [fullPath] : []
  })

const resolveWithExtensions = (basePath) => {
  if (existsSync(basePath) && statSync(basePath).isFile()) return basePath

  for (const extension of extensions) {
    const candidate = `${basePath}${extension}`
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }

  if (existsSync(basePath) && statSync(basePath).isDirectory()) {
    for (const extension of extensions) {
      const candidate = join(basePath, `index${extension}`)
      if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
    }
  }
}

const resolveImport = (specifier, fromFile) => {
  if (specifier.startsWith('@/')) {
    return resolveWithExtensions(join(srcDir, specifier.slice(2)))
  }

  if (specifier.startsWith('.')) {
    return resolveWithExtensions(resolve(dirname(fromFile), specifier))
  }

  return 'external'
}

const unresolvedImports = []
const deepRelativeImports = []
const files = readFiles(srcDir)

for (const file of files) {
  const source = readFileSync(file, 'utf8')
  const relativeFile = relative(root, file)

  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1] ?? match[2]
    if (!specifier) continue

    if (specifier.startsWith('../../../')) {
      deepRelativeImports.push(`${relativeFile}: ${specifier}`)
    }

    const resolved = resolveImport(specifier, file)
    if (!resolved) {
      unresolvedImports.push(`${relativeFile}: ${specifier}`)
    }
  }
}

if (unresolvedImports.length > 0) {
  console.error('Unresolved source imports:')
  for (const item of unresolvedImports) console.error(`- ${item}`)
  process.exitCode = 1
}

if (deepRelativeImports.length > 0) {
  console.error('Deep relative imports must use the @ alias:')
  for (const item of deepRelativeImports) console.error(`- ${item}`)
  process.exitCode = 1
}

if (!process.exitCode) {
  console.log(`Import check passed: ${files.length} source files scanned`)
}
