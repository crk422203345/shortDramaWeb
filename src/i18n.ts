/**
 * 国际化配置中心：加载四种语言资源，并统一决定初始语言与 HTML lang 属性。
 */
import { createI18n } from 'vue-i18n'

// Supported language keys
export const SUPPORTED_LOCALES = ['zh-CN', 'zh-TW', 'en', 'ms'] as const
export type LocaleType = (typeof SUPPORTED_LOCALES)[number]

export const isSupportedLocale = (value: unknown): value is LocaleType => {
  return typeof value === 'string' && SUPPORTED_LOCALES.some((locale) => locale === value)
}

const getLocaleFromUrl = (): LocaleType | null => {
  const hashPath = window.location.hash.replace(/^#/, '')
  const matchedLocale = hashPath.match(/^\/(zh-CN|zh-TW|en|ms)(?:\/|$)/)?.[1]
  return isSupportedLocale(matchedLocale) ? matchedLocale : null
}

// Read persisted language choice, fall back to browser detection, then 'zh-TW'
export const detectPreferredLocale = (): LocaleType => {
  // 显式 URL 具有最高优先级，保证分享链接和刷新后的首屏语言一致。
  const routeLocale = getLocaleFromUrl()
  if (routeLocale) return routeLocale

  const saved = localStorage.getItem('user-language')
  if (isSupportedLocale(saved)) {
    return saved
  }

  // Try navigator language if none saved
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('ms')) {
    return 'ms'
  }
  if (browserLang.startsWith('zh-tw') || browserLang.startsWith('zh-hk')) {
    return 'zh-TW'
  }
  if (browserLang.startsWith('zh')) {
    return 'zh-CN'
  }
  if (browserLang.startsWith('en')) {
    return 'en'
  }

  return 'zh-TW'
}

const initialLocale = detectPreferredLocale()

const i18n = createI18n({
  legacy: false, // Use Vue 3 Composition API style
  locale: initialLocale,
  fallbackLocale: 'en', // Automatically fallback to English if key is missing
  messages: {},
})

const localeLoaders = {
  'zh-CN': () => import('./locales/zh-CN.json'),
  'zh-TW': () => import('./locales/zh-TW.json'),
  en: () => import('./locales/en.json'),
  ms: () => import('./locales/ms.json'),
} satisfies Record<LocaleType, () => Promise<{ default: Record<string, unknown> }>>

const loadedLocales = new Set<LocaleType>()
const localeLoadTasks = new Map<LocaleType, Promise<void>>()

// 语言包按需加载，避免四份大体积 JSON 同时进入首屏脚本。
export const loadLocaleMessages = async (locale: LocaleType): Promise<void> => {
  if (loadedLocales.has(locale)) return
  const existingTask = localeLoadTasks.get(locale)
  if (existingTask) return existingTask

  const loadTask = localeLoaders[locale]()
    .then(({ default: messages }) => {
      i18n.global.setLocaleMessage(locale, messages)
      loadedLocales.add(locale)
    })
    .finally(() => {
      localeLoadTasks.delete(locale)
    })

  localeLoadTasks.set(locale, loadTask)
  return loadTask
}

// Sync HTML lang attribute with current locale
export const syncHtmlLang = (locale: LocaleType) => {
  document.documentElement.setAttribute('lang', locale)
}

// Initial sync
syncHtmlLang(initialLocale)

export default i18n
