import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import zhTW from './locales/zh-TW.json'
import en from './locales/en.json'
import ms from './locales/ms.json'

// Supported language keys
export type LocaleType = 'zh-CN' | 'zh-TW' | 'en' | 'ms'

const SUPPORTED_LOCALES: LocaleType[] = ['zh-CN', 'zh-TW', 'en', 'ms']

// Read persisted language choice, fall back to browser detection, then 'zh-CN'
const getInitialLocale = (): LocaleType => {
  const saved = localStorage.getItem('user-language') as LocaleType | null
  if (saved && SUPPORTED_LOCALES.includes(saved)) {
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

  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false, // Use Vue 3 Composition API style
  locale: getInitialLocale(),
  fallbackLocale: 'en', // Automatically fallback to English if key is missing
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    en,
    ms,
  },
})

// Sync HTML lang attribute with current locale
export const syncHtmlLang = (locale: LocaleType) => {
  document.documentElement.setAttribute('lang', locale)
}

// Initial sync
syncHtmlLang(getInitialLocale())

export default i18n
