import { computed, ref, watch } from 'vue'
import { messages, type LandingMessages, type Locale } from '@/i18n/messages'

export interface LocaleOption {
  code: Locale
  label: string
  nativeLabel: string
}

const LOCALE_STORAGE_KEY = 'bingo-locale'
const DEFAULT_LOCALE: Locale = 'zh-CN'
const LOCALE_OPTIONS: readonly LocaleOption[] = [
  { code: 'zh-CN', label: '简体中文', nativeLabel: '简体中文' },
  { code: 'zh-TW', label: '繁體中文', nativeLabel: '繁體中文' },
  { code: 'en', label: 'English', nativeLabel: 'English' },
]
const LOCALES = LOCALE_OPTIONS.map((option) => option.code)

const isLocale = (value: string | null): value is Locale => {
  return LOCALES.includes(value as Locale)
}

const getBrowserLocale = (): Locale => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  if (isLocale(storedLocale)) return storedLocale

  const browserLanguage = window.navigator.language.toLowerCase()

  if (browserLanguage.startsWith('zh-tw') || browserLanguage.startsWith('zh-hk')) {
    return 'zh-TW'
  }

  return browserLanguage.startsWith('zh') ? 'zh-CN' : DEFAULT_LOCALE
}

const locale = ref<Locale>(getBrowserLocale())
const copy = computed<LandingMessages>(() => messages[locale.value])
const availableLocales = computed<readonly Locale[]>(() => LOCALES)
const localeOptions = computed<readonly LocaleOption[]>(() => LOCALE_OPTIONS)
const activeLocaleOption = computed<LocaleOption>(() => {
  return LOCALE_OPTIONS.find((option) => option.code === locale.value) ?? LOCALE_OPTIONS[0]!
})

const setLocale = (nextLocale: Locale): void => {
  locale.value = nextLocale
}

watch(
  locale,
  (nextLocale) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = nextLocale
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
    }
  },
  { immediate: true },
)

export const useI18n = () => {
  return {
    availableLocales,
    activeLocaleOption,
    copy,
    locale,
    localeOptions,
    setLocale,
  }
}

export type { Locale }
