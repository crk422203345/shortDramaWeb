import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import i18n, { type LocaleType } from '@/i18n'

const SUPPORTED_LOCALES: LocaleType[] = ['zh-CN', 'zh-TW', 'en', 'ms']

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          path: 'contact',
          name: 'contact',
          component: () => import('@/views/ContactPage.vue'),
        },
        {
          path: 'game',
          name: 'game',
          component: () => import('@/views/GamePage.vue'),
        },
        {
          path: 'drama',
          name: 'drama',
          component: () => import('@/views/DramaPage.vue'),
        },
        {
          path: 'social',
          name: 'social',
          component: () => import('@/views/SocialPage.vue'),
        },
        {
          path: 'inquiry',
          name: 'inquiry',
          component: () => import('@/views/InquiryPage.vue'),
        },
        {
          path: 'inquiry/:id',
          name: 'inquiry-detail',
          component: () => import('@/views/InquiryDetailPage.vue'),
        },
        {
          path: 'privacy',
          name: 'privacy',
          component: () => import('@/views/PrivacyPage.vue'),
        },
        {
          path: 'terms',
          name: 'terms',
          component: () => import('@/views/TermsPage.vue'),
        },
      ],
    },
    // Fallback for unmatched routes
    {
      path: '/:pathMatch(.*)*',
      redirect: '/zh-TW/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    // If only the language parameter changed on the same page, preserve scroll position
    if (to.name === from.name && to.params.lang !== from.params.lang) {
      return false
    }
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  const lang = to.params.lang as string | undefined

  if (lang && SUPPORTED_LOCALES.includes(lang as LocaleType)) {
    // Sync active locale to i18n
    i18n.global.locale.value = lang as LocaleType
    localStorage.setItem('user-language', lang)
    document.documentElement.setAttribute('lang', lang)
    next()
  } else {
    // Auto-detect language
    let targetLang = localStorage.getItem('user-language')
    if (!targetLang || !SUPPORTED_LOCALES.includes(targetLang as LocaleType)) {
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
        targetLang = 'zh-TW'
      }
    }

    // Redirect to prefixed path
    const cleanPath = to.fullPath.replace(/^\/(zh-CN|zh-TW|en|ms)/, '')
    const targetPath = `/${targetLang}${cleanPath === '/' ? '' : cleanPath}`
    next({ path: targetPath, replace: true })
  }
})

export default router
