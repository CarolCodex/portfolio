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
            return 'vendor'
          }

          if (id.includes('/src/demos/mini-program/') || id.includes('/src/cases/liangxuan-mini-program/')) {
            return 'mini-program-demo'
          }

          if (id.includes('/src/cases/device-health-management-platform/') || id.includes('/src/views/DeviceHealthPcPreview.vue')) {
            return 'device-health-demo'
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
