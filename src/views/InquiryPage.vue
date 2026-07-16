<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { consultationApi, type ArticleItem } from '@/api/consultation'

const { t } = useI18n()

// Active tab and current page state
type TabKey = 'all' | 'company' | 'product'
const currentTab = ref<TabKey>('all')
const currentPage = ref(1)
const itemsPerPage = 5
const loading = ref(false)
const allInquiries = ref<ArticleItem[]>([])
const totalItems = ref(0)

// Tabs definition
const tabs = computed(() => [
  { value: 'all' as TabKey, label: t('inquiry.tabs.all') },
  { value: 'company' as TabKey, label: t('inquiry.tabs.company') },
  { value: 'product' as TabKey, label: t('inquiry.tabs.product') },
])

// Fetch list data from API
const fetchData = async () => {
  loading.value = true
  try {
    const params = {
      page: String(currentPage.value),
      limit: String(itemsPerPage),
      keyword: '',
      category: currentTab.value === 'all' ? undefined : currentTab.value,
    }
    const res = await consultationApi.getArticleList(params)
    if (res) {
      const parseTotal = (val: any) => {
        if (typeof val === 'number') return val
        if (typeof val === 'string') {
          const parsed = parseInt(val, 10)
          return isNaN(parsed) ? undefined : parsed
        }
        return undefined
      }

      const rawTotal =
        res.total !== undefined
          ? res.total
          : res.totalCount !== undefined
            ? res.totalCount
            : res.total_count !== undefined
              ? res.total_count
              : undefined

      const resolvedTotal = parseTotal(rawTotal)

      if (Array.isArray(res)) {
        allInquiries.value = res
        totalItems.value = res.length
      } else if (res.list && Array.isArray(res.list)) {
        allInquiries.value = res.list
        totalItems.value = resolvedTotal !== undefined ? resolvedTotal : res.list.length
      } else if (res.data && Array.isArray(res.data)) {
        allInquiries.value = res.data
        totalItems.value = resolvedTotal !== undefined ? resolvedTotal : res.data.length
      } else {
        allInquiries.value = []
        totalItems.value = 0
      }
    } else {
      allInquiries.value = []
      totalItems.value = 0
    }
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    allInquiries.value = []
    totalItems.value = 0
  } finally {
    loading.value = false
  }
}

// Watchers to trigger refetch when tab or page shifts
watch(currentTab, () => {
  currentPage.value = 1
  fetchData()
})

watch(currentPage, () => {
  fetchData()
})

onMounted(() => {
  fetchData()
})

// Pagination logic
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage)
})

const changePage = (page: number | string) => {
  if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Smooth scroll back to top of list section on page change
    const el = document.getElementById('list-start')
    if (el) {
      const yOffset = -100
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }
}

// Generate the visible page numbers for pagination with ellipses
const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const range = 2
  const pages: (number | string)[] = []

  if (total <= 1) return [1]

  pages.push(1)

  let start = Math.max(2, current - range)
  let end = Math.min(total - 1, current + range)

  if (current <= range + 2) {
    end = Math.min(total - 1, range * 2 + 2)
  }
  if (current >= total - range - 1) {
    start = Math.max(2, total - range * 2 - 1)
  }

  if (start > 2) {
    pages.push('...')
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < total - 1) {
    pages.push('...')
  }

  pages.push(total)

  return pages
})

const selectTab = (tabVal: TabKey) => {
  currentTab.value = tabVal
  currentPage.value = 1
}

const getCategoryLabel = (category: 'company' | 'product') => {
  return category === 'company' ? t('inquiry.tabs.company') : t('inquiry.tabs.product')
}
</script>

<template>
  <main class="inquiry-page">
    <div class="container">
      <!-- 1. Top Banner Area -->
      <section class="banner-section">
        <div class="banner-wrapper glass-card">
          <img src="/img/bingo_inquiry_banner.jpg" :alt="t('inquiry.title')" class="banner-img" />
          <div class="banner-glow-overlay"></div>
        </div>
      </section>

      <!-- 2. Header & Intro block -->
      <section class="intro-section">
        <div class="title-logo-box">
          <span class="logo-text">{{ t('inquiry.title') }}</span>
        </div>
        <p class="intro-desc font-light">
          {{ t('inquiry.subtitle') }}
        </p>
      </section>

      <div id="list-start" class="content-divider"></div>

      <!-- 3. Tabs Selector -->
      <section class="tabs-section">
        <div class="tabs-row">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="tab-btn"
            :class="{ active: currentTab === tab.value }"
            @click="selectTab(tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>
      </section>

      <!-- 4. Inquiry Card Items List -->
      <section class="list-section">
        <div class="inquiry-list">
          <!-- Loading State -->
          <div v-if="loading" class="loading-state glass-card">
            <p>加载中...</p>
          </div>

          <transition-group name="list" tag="div" v-else>
            <component
              :is="item.sourceUrl || item.source_url ? 'a' : 'RouterLink'"
              v-bind="item.sourceUrl || item.source_url ? { href: item.sourceUrl || item.source_url, target: '_blank', rel: 'noopener noreferrer' } : { to: { name: 'inquiry-detail', params: { id: item.id } } }"
              v-for="item in allInquiries"
              :key="item.id"
              class="inquiry-card glass-card"
            >
              <!-- Card Content on Left -->
              <div class="card-content">
                <span class="card-tag" :class="item.category">
                  {{ getCategoryLabel(item.category) }}
                </span>
                <h3 class="card-title" :title="item.title">{{ item.title }}</h3>
              </div>

              <!-- Card Image on Right -->
              <div class="card-img-wrapper" v-if="item.coverImage || item.image">
                <img :src="item.coverImage || item.image" :alt="item.title" class="card-img" />
              </div>
            </component>
          </transition-group>

          <!-- Empty State -->
          <div v-if="!loading && allInquiries.length === 0" class="empty-state glass-card">
            <p>{{ t('inquiry.empty') }}</p>
          </div>
        </div>
      </section>

      <!-- 5. Pagination Footer -->
      <section class="pagination-section" v-if="totalPages >= 1">
        <div class="pagination">
          <!-- Prev Button -->
          <button
            class="page-nav-btn"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
            aria-label="Previous Page"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <!-- Pages Numbers -->
          <button
            v-for="(page, idx) in visiblePages"
            :key="idx"
            class="page-num-btn"
            :class="{ active: currentPage === page, separator: page === '...' }"
            :disabled="page === '...'"
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <!-- Next Button -->
          <button
            class="page-nav-btn"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
            aria-label="Next Page"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.inquiry-page {
  padding-top: 80px;
  /* Offset for header */
  padding-bottom: 96px;
  min-height: calc(100vh - 80px);
  overflow-x: hidden;
  color: var(--text-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 1. Top Banner */
.banner-section {
  margin-top: 40px;
  margin-bottom: 48px;
}

.banner-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 480px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0, 240, 255, 0.15);
  box-shadow: 0 10px 40px rgba(0, 240, 255, 0.05);
}

@media (max-width: 768px) {
  .banner-wrapper {
    aspect-ratio: 16 / 10;
  }
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-glow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 65%, rgba(2, 6, 38, 0.75) 100%);
  pointer-events: none;
}

/* 2. Intro Section */
.intro-section {
  margin-bottom: 40px;
  max-width: 800px;
}

.title-logo-box {
  margin-bottom: 18px;
}

.logo-text {
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.intro-desc {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  font-weight: 300;
}

.font-light {
  font-weight: 300;
}

.content-divider {
  margin-bottom: 32px;
}

/* 3. Tabs Selector */
.tabs-section {
  margin-bottom: 32px;
}

.tabs-row {
  display: flex;
  gap: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 12px;
  flex-wrap: wrap;
}

.tab-btn {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
  position: relative;
  padding: 8px 0;
  transition: var(--transition-normal);
  cursor: pointer;
}

.tab-btn:hover {
  color: var(--text-primary);
}

.tab-btn.active {
  color: var(--accent-cyan);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -13px;
  /* Align with tab-row border-bottom */
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
  border-radius: 2px;
}

/* 4. Inquiry Card Items List */
.list-section {
  margin-bottom: 64px;
}

.inquiry-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.inquiry-card {
  display: flex;
  gap: 32px;
  padding: 32px;
  border-radius: 20px;
  align-items: center;
  transition: var(--transition-normal);
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .inquiry-list {
    gap: 24px;
  }

  .inquiry-card {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 20px;
    padding: 24px;
    margin-bottom: 20px;
  }

  .card-title {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
    font-size: 1.15rem;
    line-height: 1.4;
  }

  .loading-state,
  .empty-state {
    padding: 60px 20px;
    font-size: 0.95rem;
  }
}

.card-content {
  flex: 1;
  min-width: 0; /* Ensures flex box allows text truncation */
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-tag {
  align-self: flex-start;
  padding: 4px 14px;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.card-tag.company {
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.25);
  color: var(--accent-cyan);
}

.card-tag.product {
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.25);
  color: var(--accent-purple);
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.45;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.card-desc {
  font-size: 0.98rem;
  color: var(--text-secondary);
  line-height: 1.75;
  font-weight: 300;
}

.card-meta {
  margin-top: 4px;
}

.card-date {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 300;
}

.card-img-wrapper {
  width: 220px;
  height: 130px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@media (max-width: 768px) {
  .card-img-wrapper {
    width: 100%;
    height: 180px;
  }
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.inquiry-card:hover .card-img {
  transform: scale(1.05);
}

.empty-state {
  padding: 48px;
  text-align: center;
  color: var(--text-secondary);
  font-weight: 300;
}

/* 5. Pagination Footer */
.pagination-section {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-nav-btn,
.page-num-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 6px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: var(--transition-normal);
  cursor: pointer;
}

.page-nav-btn:hover:not(:disabled),
.page-num-btn:hover:not(.separator):not(.active) {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.page-num-btn.active {
  color: #ffffff;
  background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
  border-color: rgba(0, 240, 255, 0.25);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
}

.page-nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-num-btn.separator {
  background: transparent;
  border-color: transparent;
  cursor: default;
}

.loading-state {
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

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
