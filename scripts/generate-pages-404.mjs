import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

function normalizeBasePath(basePath) {
  if (!basePath) return '/'

  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

const base = normalizeBasePath(process.env.VITE_BASE_PATH || '/')
const outputPath = resolve('dist/404.html')

const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redirecting...</title>
    <script>
      const base = ${JSON.stringify(base)}
      const path = window.location.pathname
      const route = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\\//, '')
      const normalizedRoute = route ? \`#/\${route}\` : '#/'
      window.location.replace(\`\${base}\${normalizedRoute}\${window.location.search}\`)
    </script>
  </head>
  <body></body>
</html>
`

await mkdir(resolve('dist'), { recursive: true })
await writeFile(outputPath, html, 'utf8')

console.log(`Generated ${outputPath} for base ${base}`)
