import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function normalizeBasePath(basePath: string) {
  if (!basePath) return '/'

  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

function rewritePublicAssetBase(source: string, basePath: string) {
  const base = normalizeBasePath(basePath)

  if (base === '/') return source

  return source.replace(/(["'(\s])\/(case-assets|images)\//g, `$1${base}$2/`)
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            if (id.includes('/node_modules/@vue/') || id.includes('/node_modules/vue') || id.includes('/node_modules/vue-router')) {
              return 'vue-core'
            }

            if (id.includes('/node_modules/echarts/')) {
              return 'charts'
            }

            if (id.includes('/node_modules/marked/') || id.includes('/node_modules/highlight.js/')) {
              return 'markdown'
            }

            return 'vendor'
          }
        },
      },
    },
  },
  plugins: [
    vue(),
    {
      name: 'rewrite-public-asset-base',
      apply: 'build',
      generateBundle(_, bundle) {
        const basePath = process.env.VITE_BASE_PATH || '/'

        for (const asset of Object.values(bundle)) {
          if (asset.type === 'chunk') {
            asset.code = rewritePublicAssetBase(asset.code, basePath)
            continue
          }

          if (typeof asset.source === 'string') {
            asset.source = rewritePublicAssetBase(asset.source, basePath)
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
