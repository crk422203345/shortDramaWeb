<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { consultationApi, type ArticleItem } from '@/api/consultation'

const route = useRoute()
const { t, locale } = useI18n()

const loading = ref(false)
const article = ref<ArticleItem | null>(null)

// Retrieve and validate ID
const articleId = computed(() => {
  const idStr = route.params.id
  const resolvedIdStr = String((Array.isArray(idStr) ? idStr[0] : idStr) || '')
  return resolvedIdStr
})

// Fetch article details from API
const getArticleData = async () => {
  if (!articleId.value) return
  loading.value = true
  try {
    const res = await consultationApi.getArticleDetail({ id: articleId.value })
    article.value = res
  } catch (error) {
    console.error('Failed to fetch article details:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getArticleData()
})

const category = computed(() => article.value?.category || 'company')
const date = computed(() => article.value?.date || '')
const author = computed(() => {
  if (article.value?.author) return article.value.author
  const isZh = locale.value.startsWith('zh')
  if (category.value === 'company') {
    if (isZh) return 'BINGO 官方新聞中心'
    if (locale.value === 'ms') return 'Pusat Berita Rasmi BINGO'
    return 'BINGO Official News Center'
  } else {
    if (isZh) return 'BINGO 運營團隊'
    if (locale.value === 'ms') return 'Pasukan Operasi BINGO'
    return 'BINGO Operations Team'
  }
})

const hasSourceUrl = computed(() => {
  return !!article.value?.sourceUrl
})

const sourceUrl = computed(() => {
  return article.value?.sourceUrl || ''
})

const sourceDomain = computed(() => {
  if (!sourceUrl.value) return ''
  try {
    const url = new URL(sourceUrl.value)
    return url.hostname
  } catch (e) {
    return 'news.bingo-entertainment.com'
  }
})

// Helper for category label
const getCategoryLabel = (cat: 'company' | 'product') => {
  return cat === 'company' ? t('inquiry.tabs.company') : t('inquiry.tabs.product')
}
</script>

<template>
  <main class="inquiry-detail-page">
    <div class="container section-padding">
      <!-- 1. Back Navigation Button -->
      <div class="navigation-row">
        <RouterLink :to="{ name: 'inquiry' }" class="back-btn btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round" class="back-icon">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          {{ t('inquiry.back_btn') }}
        </RouterLink>
      </div>

      <!-- 2. Content Detail Container -->
      <article v-if="article" class="detail-container glass-card">
        <!-- 3. Headline Title -->
        <h1 class="detail-title">{{ article.title }}</h1>

        <!-- 4. Meta Information Row -->
        <div class="detail-meta">
          <span class="category-pill" :class="category">
            {{ getCategoryLabel(category) }}
          </span>
          <div class="meta-items">
            <span class="meta-item author"> {{ t('inquiry.author') }}: {{ author }} </span>
            <template v-if="article.detailLinkUrl || article.detail_link_url">
              <span class="meta-divider">/</span>
              <span class="meta-item detail-link-item">
                <span class="link-label">{{ t('inquiry.detail_link') }}:</span>
                <a :href="article.detailLinkUrl || article.detail_link_url" target="_blank" rel="noopener noreferrer"
                  class="link-url">
                  {{ article.detailLinkUrl || article.detail_link_url }}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" class="external-icon">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </span>
            </template>
            <template v-if="hasSourceUrl">
              <span class="meta-divider">/</span>
              <span class="meta-item source">
                {{ t('inquiry.source') }}:
                <a :href="sourceUrl" target="_blank" rel="noopener noreferrer" class="source-link">
                  {{ sourceDomain }}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" class="external-icon">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </span>
            </template>
          </div>
        </div>

        <div class="gradient-line"></div>

        <!-- 5. Main Body Text ("正文") -->
        <section class="detail-content" v-html="article.content"></section>

        <!-- 6. Disclaimer Banner -->
        <footer class="disclaimer-banner">
          <div class="warning-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round" class="warning-svg">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="disclaimer-content">
            <p class="disclaimer-text">{{ t('inquiry.disclaimer') }}</p>
          </div>
        </footer>
      </article>

      <!-- Loading State -->
      <div v-else-if="loading" class="loading-state glass-card">
        <p>加载中...</p>
      </div>

      <!-- Error / Fallback State -->
      <div v-else class="empty-state glass-card">
        <p>文章加载失败，请重试</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.inquiry-detail-page {
  flex-grow: 1;
  background: transparent;
  position: relative;
  z-index: 1;
}

.navigation-row {
  margin-bottom: 24px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  padding: 10px 20px;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.back-icon {
  transition: transform 0.3s ease;
}

.back-btn:hover .back-icon {
  transform: translateX(-3px);
}

.detail-container {
  padding: 48px;
  border-radius: 24px;
}

/* Glass card overrides to make content stand out */
.glass-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.detail-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.4;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}

.detail-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

/* Category Pill Styling */
.category-pill {
  display: inline-block;
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-pill.company {
  background: rgba(0, 240, 255, 0.1);
  color: var(--accent-cyan);
  border: 1px solid rgba(0, 240, 255, 0.25);
}

.category-pill.product {
  background: rgba(139, 92, 246, 0.1);
  color: var(--accent-purple);
  border: 1px solid rgba(139, 92, 246, 0.25);
}

/* Meta list text layout */
.meta-items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.meta-divider {
  color: rgba(255, 255, 255, 0.15);
  user-select: none;
}

.meta-item {
  display: flex;
  align-items: center;
}

.source-link {
  color: var(--accent-cyan);
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px dashed rgba(0, 240, 255, 0.3);
  transition: var(--transition-normal);
}

.source-link:hover {
  color: #ffffff;
  border-bottom-color: #ffffff;
}

.no-source {
  color: var(--text-muted);
  margin-left: 6px;
  font-weight: 400;
  opacity: 0.85;
}

.external-icon {
  opacity: 0.8;
}

/* Gradient divider line */
.gradient-line {
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.01) 100%);
  margin-bottom: 36px;
}

/* Body Content Styling */
.detail-content {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.8;
  font-weight: 300;
  letter-spacing: 0.5px;
  margin-bottom: 48px;
}

.detail-content :deep(p) {
  margin-bottom: 24px;
  text-indent: 2em;
  /* Standard indentation for editorial layouts */
  text-align: justify;
}

.detail-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 20px 0;
  display: block;
}

.detail-content :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

/* Disclaimer Warning Box Styling */
.disclaimer-banner {
  display: flex;
  gap: 16px;
  background: rgba(239, 68, 68, 0.03);
  border: 1px solid rgba(239, 68, 68, 0.12);
  border-radius: 12px;
  padding: 24px;
  align-items: flex-start;
  margin-top: 56px;
}

.warning-icon-wrapper {
  color: #ef4444;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2px;
}

.disclaimer-content {
  flex-grow: 1;
}

.disclaimer-text {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.6;
  text-align: justify;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .detail-container {
    padding: 28px 20px;
    border-radius: 16px;
  }

  .detail-title {
    font-size: 1.5rem;
    margin-bottom: 18px;
  }

  .detail-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 24px;
  }

  .meta-items {
    font-size: 0.85rem;
  }

  .meta-divider {
    display: none;
  }

  .meta-items>* {
    width: 100%;
    margin-bottom: 6px;
  }

  .detail-content {
    font-size: 0.98rem;
    line-height: 1.7;
    margin-bottom: 32px;
  }

  .disclaimer-banner {
    padding: 16px;
    margin-top: 36px;
    flex-direction: column;
    gap: 12px;
  }

  .warning-icon-wrapper {
    padding-top: 0;
  }

  .loading-state,
  .empty-state {
    padding: 60px 20px;
    font-size: 0.95rem;
  }
}

.loading-state,
.empty-state {
  padding: 80px 48px;
  text-align: center;
  color: var(--text-secondary);
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.detail-link-item {
  display: flex;
  align-items: center;
}

.link-label {
  color: var(--text-muted);
}

.link-url {
  color: var(--accent-cyan);
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-bottom: 1px dashed rgba(0, 240, 255, 0.3);
  transition: var(--transition-normal);
}

.link-url:hover {
  color: #ffffff;
  border-bottom-color: #ffffff;
}
</style>
