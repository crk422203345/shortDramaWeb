<script setup lang="ts">
/**
 * 根组件：固定承载页头、路由页面与页脚，并在语言切换时同步页面语言和 SEO 元信息。
 */
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { syncHtmlLang, type LocaleType } from './i18n'

// Import global styles
import './assets/global.css'

const { locale, t } = useI18n()

watch(
  locale,
  (newLang) => {
    // 将运行时语言状态同步到 HTML 属性及搜索引擎可读取的页面元数据。
    syncHtmlLang(newLang as LocaleType)
    // Update Title
    document.title = t('seo.title')

    // Update Keywords Meta
    const keywordsEl = document.querySelector('meta[name="keywords"]')
    if (keywordsEl) {
      keywordsEl.setAttribute('content', t('seo.keywords'))
    }

    // Update Description Meta
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl) {
      descEl.setAttribute('content', t('seo.description'))
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="app-wrapper">
    <!-- Navigation Header -->
    <Header />

    <!-- Routed pages -->
    <router-view />

    <!-- Footer Area -->
    <Footer />
  </div>
</template>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
  color: var(--text-primary);
  width: 100%;
  overflow-x: hidden;
  position: relative;
}
</style>
