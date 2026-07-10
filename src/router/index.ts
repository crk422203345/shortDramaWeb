import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import i18n from '@/i18n'

const SUPPORTED_LOCALES = ['zh-CN', 'zh-TW', 'en', 'ms']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:lang(zh-CN|zh-TW|en|ms)?',
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'join',
          name: 'join',
          component: () => import('@/views/JoinPage.vue'),
        },
        {
          path: 'privacy',
          name: 'privacy',
          component: () => import('@/views/PrivacyPage.vue'),
        },
      ],
    },
    // Fallback for unmatched routes
    {
      path: '/:pathMatch(.*)*',
      redirect: '/zh-CN/',
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  const lang = to.params.lang as string | undefined

  if (lang && SUPPORTED_LOCALES.includes(lang)) {
    // Sync active locale to i18n
    const i18nLocale = i18n.global.locale
    if (typeof i18nLocale === 'object' && 'value' in i18nLocale) {
      ;(i18nLocale as any).value = lang
    } else {
      ;(i18n.global as any).locale = lang
    }
    localStorage.setItem('user-language', lang)
    document.documentElement.setAttribute('lang', lang)
    next()
  } else {
    // Auto-detect language
    let targetLang = localStorage.getItem('user-language')
    if (!targetLang || !SUPPORTED_LOCALES.includes(targetLang)) {
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('ms')) {
        targetLang = 'ms'
      } else if (browserLang.startsWith('zh-tw') || browserLang.startsWith('zh-hk')) {
        targetLang = 'zh-TW'
      } else if (browserLang.startsWith('zh')) {
        targetLang = 'zh-CN'
      } else if (browserLang.startsWith('en')) {
        targetLang = 'en'
      } else {
        targetLang = 'zh-CN'
      }
    }

    // Redirect to prefixed path
    const cleanPath = to.fullPath.replace(/^\/(zh-CN|zh-TW|en|ms)/, '')
    const targetPath = `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`
    next({ path: targetPath, replace: true })
  }
})

export default router
