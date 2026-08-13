/**
 * Vite 构建配置：启用 Vue 与开发调试插件，并配置本地开发服务和 @ 路径别名。
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Vue DevTools 只服务于本地开发，生产构建不再执行其转换与注入逻辑。
  plugins: [vue(), ...(command === 'serve' ? [vueDevTools()] : [])],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
