import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/echarts')) return 'charts'
          if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router')) return 'vue-vendor'
          if (id.includes('src/cases/data-screen-visualization')) return 'case-data-screen'
          if (id.includes('src/cases/device-health-management-platform')) return 'case-device-health'
          if (id.includes('src/cases/liangxuan-mini-program')) return 'case-liangxuan'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
