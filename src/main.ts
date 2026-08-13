/**
 * 应用启动入口：创建 Vue 实例，并依次注册全局状态、路由和国际化能力。
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

const renderBootstrapError = (error: unknown) => {
  console.error('[Bootstrap Error]:', error)
  const root = document.getElementById('app')
  if (!root) return

  const message = document.createElement('p')
  message.setAttribute('role', 'alert')
  message.textContent = '页面加载失败，请刷新后重试。 / Failed to load. Please refresh and try again.'
  message.style.cssText =
    'margin: 20vh auto; max-width: 560px; padding: 24px; color: #fff; text-align: center; font-family: sans-serif;'
  root.replaceChildren(message)
}

const bootstrap = async () => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(i18n)
  app.use(router)

  // 等待异步路由守卫完成语言包加载，避免首屏出现错误语言或翻译键闪烁。
  await router.isReady()
  app.mount('#app')
}

void bootstrap().catch(renderBootstrapError)
