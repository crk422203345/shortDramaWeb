/**
 * 路由中心：所有业务页面均挂载在可选语言前缀下，守卫负责补全前缀并同步 i18n 状态。
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import i18n, {
  detectPreferredLocale,
  isSupportedLocale,
  loadLocaleMessages,
  syncHtmlLang,
  type LocaleType,
} from '@/i18n'

const withLocalePrefix = (fullPath: string, locale: LocaleType): string => {
  const cleanPath = fullPath.replace(/^\/(zh-CN|zh-TW|en|ms)/, '')
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}

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
      redirect: () => `/${detectPreferredLocale()}/`,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 优先恢复历史位置；锚点跳转为固定页头预留 80px，单纯切语言时保持阅读位置。
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

router.beforeEach(async (to, _from, next) => {
  // URL 中的语言前缀是可分享、可刷新的语言状态来源；缺失时按本地记录和浏览器语言补全。
  const rawLang = to.params.lang
  const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang

  if (isSupportedLocale(lang)) {
    try {
      await loadLocaleMessages(lang)
    } catch (error) {
      console.error(`[Locale Load Error]: ${lang}`, error)

      // 目标语言加载失败时尝试英文兜底，并同步修正 URL，避免语言状态相互矛盾。
      if (lang !== 'en') {
        try {
          await loadLocaleMessages('en')
          next({ path: withLocalePrefix(to.fullPath, 'en'), replace: true })
          return
        } catch (fallbackError) {
          console.error('[Locale Fallback Load Error]: en', fallbackError)
          throw fallbackError
        }
      }

      // 英文语言包自身加载失败时交由启动层处理，避免挂载一个没有翻译资源的应用。
      throw error
    }

    next()
  } else {
    // Auto-detect language
    const targetLang = detectPreferredLocale()

    // Redirect to prefixed path
    const targetPath = withLocalePrefix(to.fullPath, targetLang)
    next({ path: targetPath, replace: true })
  }
})

// 仅在导航最终成功后提交语言状态，避免被取消的异步导航回写旧语言。
router.afterEach((to, _from, failure) => {
  if (failure || to.fullPath !== router.currentRoute.value.fullPath) return

  const rawLang = to.params.lang
  const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang
  if (!isSupportedLocale(lang)) return

  i18n.global.locale.value = lang
  localStorage.setItem('user-language', lang)
  syncHtmlLang(lang)
})

export default router
