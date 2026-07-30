<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  recruitmentApi,
  type Job,
  type RecruitmentFilterOption,
  type RecruitmentFilterOptions,
  type RecruitmentLanguageType,
  type RecruitmentListParams,
} from '@/api/recruitment'

const { t, locale } = useI18n()

type FilterKey = 'department' | 'location' | 'experience'
type NormalizedJob = Omit<Job, 'responsibilities' | 'requirements'> & {
  responsibilities: string[]
  requirements: string[]
}

interface FilterConfig {
  key: FilterKey
  label: string
  value: string
  options: RecruitmentFilterOption[]
}

const jobs = ref<NormalizedJob[]>([])
const isLoading = ref(false)
const hasError = ref(false)
const expandedJobIds = ref<number[]>([])
const filterOptions = ref<RecruitmentFilterOptions>({
  department: [],
  location: [],
  experience: [],
  salary: [],
})
const searchTerm = ref('')
const selectedDepartment = ref('all')
const selectedLocation = ref('all')
const selectedExperience = ref('all')
const activeFilter = ref<FilterKey | null>(null)
const searchPanelRef = ref<HTMLElement | null>(null)
let jobsRequestId = 0
let filtersRequestId = 0
let searchTimer: ReturnType<typeof setTimeout> | null = null

const getLanguageType = (localeVal: string): RecruitmentLanguageType => {
  if (localeVal === 'zh-CN') return 'zh'
  if (localeVal === 'zh-TW') return 'cht'
  if (localeVal === 'en') return 'en'
  if (localeVal === 'ms') return 'ms'
  return 'zh'
}

const normalizeStringArray = (value: string[] | string): string[] => {
  if (Array.isArray(value)) return value.filter((item) => typeof item === 'string' && item.trim())

  try {
    const parsed: unknown = JSON.parse(value)
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is string => typeof item === 'string' && Boolean(item.trim()),
      )
    }
  } catch {
    // The API may return newline-delimited text instead of JSON.
  }

  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

const normalizeEmail = (value: string | null | undefined): string | null => {
  const email = value?.trim() || ''
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null
}

const getSelectedFilterValue = (key: FilterKey): string => {
  if (key === 'department') return selectedDepartment.value
  if (key === 'location') return selectedLocation.value
  return selectedExperience.value
}

const setSelectedFilterValue = (key: FilterKey, value: string) => {
  if (key === 'department') selectedDepartment.value = value
  if (key === 'location') selectedLocation.value = value
  if (key === 'experience') selectedExperience.value = value
  activeFilter.value = null
}

const normalizeFilterOptions = (
  options: RecruitmentFilterOption[] | null | undefined,
): RecruitmentFilterOption[] => {
  if (!Array.isArray(options)) return []
  return [...options]
    .filter((option) => option.state === 1 && Boolean(option.groupKey) && Boolean(option.name))
    .sort((a, b) => a.sort - b.sort)
}

const filterConfigs = computed<FilterConfig[]>(() => [
  {
    key: 'department',
    label: t('join.filters.department'),
    value: selectedDepartment.value,
    options: normalizeFilterOptions(filterOptions.value.department),
  },
  {
    key: 'location',
    label: t('join.filters.location'),
    value: selectedLocation.value,
    options: normalizeFilterOptions(filterOptions.value.location),
  },
  {
    key: 'experience',
    label: t('join.filters.experience'),
    value: selectedExperience.value,
    options: normalizeFilterOptions(filterOptions.value.experience),
  },
])

const getSelectedFilterLabel = (filter: FilterConfig): string => {
  if (filter.value === 'all') return t('join.filters.all')
  return (
    filter.options.find((option) => option.groupKey === filter.value)?.name || t('join.filters.all')
  )
}

const buildRecruitmentParams = (): RecruitmentListParams => {
  const params: RecruitmentListParams = {
    languageType: getLanguageType(locale.value),
  }
  const keyword = searchTerm.value.trim()

  if (keyword) params.keyword = keyword
  if (selectedDepartment.value !== 'all') params.departmentKey = selectedDepartment.value
  if (selectedLocation.value !== 'all') params.locationKey = selectedLocation.value
  if (selectedExperience.value !== 'all') params.experienceKey = selectedExperience.value

  return params
}

const fetchJobs = async () => {
  const requestId = ++jobsRequestId
  isLoading.value = true
  hasError.value = false
  try {
    const list = await recruitmentApi.getRecruitmentList(buildRecruitmentParams())
    if (requestId !== jobsRequestId) return

    jobs.value = list.map((job) => ({
      ...job,
      resumeEmail: normalizeEmail(job.resumeEmail),
      responsibilities: normalizeStringArray(job.responsibilities),
      requirements: normalizeStringArray(job.requirements),
    }))
    expandedJobIds.value = []
  } catch (err) {
    if (requestId !== jobsRequestId) return
    console.error('[Fetch Jobs Error]:', err)
    jobs.value = []
    hasError.value = true
  } finally {
    if (requestId === jobsRequestId) {
      isLoading.value = false
    }
  }
}

const fetchFilterOptions = async () => {
  const requestId = ++filtersRequestId
  try {
    const options = await recruitmentApi.getFilterOptions(getLanguageType(locale.value))
    if (requestId === filtersRequestId) {
      filterOptions.value = options
    }
  } catch (error) {
    if (requestId !== filtersRequestId) return
    console.error('[Fetch Recruitment Filters Error]:', error)
    filterOptions.value = {
      department: [],
      location: [],
      experience: [],
      salary: [],
    }
  }
}

const scheduleFetchJobs = (delay = 0) => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    void fetchJobs()
  }, delay)
}

const clearFilters = () => {
  searchTerm.value = ''
  selectedDepartment.value = 'all'
  selectedLocation.value = 'all'
  selectedExperience.value = 'all'
  activeFilter.value = null
}

const hasActiveFilters = computed(() => {
  return (
    Boolean(searchTerm.value.trim()) ||
    selectedDepartment.value !== 'all' ||
    selectedLocation.value !== 'all' ||
    selectedExperience.value !== 'all'
  )
})

const toggleFilterMenu = (key: FilterKey) => {
  activeFilter.value = activeFilter.value === key ? null : key
}

const handleDocumentClick = (event: MouseEvent) => {
  if (!searchPanelRef.value?.contains(event.target as Node)) {
    activeFilter.value = null
  }
}

watch(locale, () => {
  clearFilters()
  void fetchFilterOptions()
  scheduleFetchJobs()
})

watch([selectedDepartment, selectedLocation, selectedExperience], () => {
  scheduleFetchJobs()
})

watch(searchTerm, () => {
  scheduleFetchJobs(300)
})

onMounted(() => {
  void fetchJobs()
  void fetchFilterOptions()
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  jobsRequestId++
  filtersRequestId++
  if (searchTimer) clearTimeout(searchTimer)
  document.removeEventListener('click', handleDocumentClick)
})

const getMailHref = (job: NormalizedJob): string => {
  if (!job.resumeEmail) return ''
  const subject = t('join.mail_subject', { title: job.title })
  return `mailto:${job.resumeEmail}?subject=${encodeURIComponent(subject)}`
}

// Expanded state management
const toggleExpand = (id: number) => {
  const index = expandedJobIds.value.indexOf(id)
  if (index > -1) {
    expandedJobIds.value.splice(index, 1)
  } else {
    expandedJobIds.value.push(id)
  }
}

const isExpanded = (id: number) => expandedJobIds.value.includes(id)

// Smooth height transition hooks
const beforeEnter = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = '0'
  htmlEl.style.opacity = '0'
  htmlEl.style.overflow = 'hidden'
}

const enter = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement
  htmlEl.offsetHeight // force reflow
  htmlEl.style.transition = 'height 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.45s ease'
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.opacity = '1'
  setTimeout(done, 450)
}

const afterEnter = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = ''
  htmlEl.style.opacity = ''
  htmlEl.style.transition = ''
  htmlEl.style.overflow = ''
}

const beforeLeave = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.opacity = '1'
  htmlEl.style.overflow = 'hidden'
}

const leave = (el: Element, done: () => void) => {
  const htmlEl = el as HTMLElement
  htmlEl.offsetHeight // force reflow
  htmlEl.style.transition = 'height 0.35s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.35s ease'
  htmlEl.style.height = '0'
  htmlEl.style.opacity = '0'
  setTimeout(done, 350)
}

const afterLeave = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = ''
  htmlEl.style.opacity = ''
  htmlEl.style.transition = ''
  htmlEl.style.overflow = ''
}
</script>

<template>
  <main class="join-page">
    <!-- Hero Title -->
    <section class="join-hero">
      <div class="container">
        <div class="hero-bg-text">Join Us</div>
        <h1 class="join-title">{{ t('join.title') }}</h1>
        <p class="join-subtitle">
          {{ t('join.subtitle') }}
        </p>

        <div ref="searchPanelRef" class="search-panel" role="search" @click.stop>
          <label class="search-box">
            <svg
              class="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              v-model="searchTerm"
              type="search"
              :aria-label="t('join.search_placeholder')"
              :placeholder="t('join.search_placeholder')"
            />
          </label>

          <div class="filter-row">
            <div
              v-for="filter in filterConfigs"
              :key="filter.key"
              class="filter-select"
              :class="{ open: activeFilter === filter.key, selected: filter.value !== 'all' }"
            >
              <button
                class="filter-trigger"
                type="button"
                :aria-expanded="activeFilter === filter.key"
                @click="toggleFilterMenu(filter.key)"
                @keydown.esc="activeFilter = null"
              >
                <span class="filter-label">{{ filter.label }}</span>
                <span class="filter-value">{{ getSelectedFilterLabel(filter) }}</span>
                <svg
                  class="filter-chevron"
                  :class="{ open: activeFilter === filter.key }"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              <div v-if="activeFilter === filter.key" class="filter-menu">
                <template v-if="filter.options.length">
                  <button
                    class="filter-option"
                    :class="{ active: filter.value === 'all' }"
                    type="button"
                    @click="setSelectedFilterValue(filter.key, 'all')"
                  >
                    <span>{{ t('join.filters.all') }}</span>
                    <svg
                      v-if="filter.value === 'all'"
                      class="filter-check"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                  <button
                    v-for="option in filter.options"
                    :key="option.groupKey"
                    class="filter-option"
                    :class="{ active: filter.value === option.groupKey }"
                    type="button"
                    @click="setSelectedFilterValue(filter.key, option.groupKey)"
                  >
                    <span>{{ option.name }}</span>
                    <svg
                      v-if="filter.value === option.groupKey"
                      class="filter-check"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                </template>
                <div v-else class="filter-empty">
                  {{ t('join.filters.no_data') }}
                </div>
              </div>
            </div>

            <button
              v-if="hasActiveFilters"
              class="clear-filter-btn"
              type="button"
              @click="clearFilters"
            >
              {{ t('join.filters.clear') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Job List -->
    <section class="jobs-section section-padding">
      <div class="container">
        <!-- Loading Skeleton State -->
        <div v-if="isLoading" class="jobs-grid">
          <div v-for="i in 4" :key="i" class="job-card glass-card skeleton-card">
            <div class="skeleton-line skeleton-title"></div>
            <div class="skeleton-meta-row">
              <div class="skeleton-meta-item"></div>
              <div class="skeleton-meta-item"></div>
              <div class="skeleton-meta-item"></div>
              <div class="skeleton-meta-item"></div>
            </div>
            <div class="job-divider"></div>
            <div class="skeleton-line skeleton-text-1"></div>
            <div class="skeleton-line skeleton-text-2"></div>
            <div class="skeleton-line skeleton-text-3"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="hasError" class="error-panel">
          <div class="error-icon-wrap">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3>{{ t('join.load_failed') }}</h3>
          <p>{{ t('join.load_failed_desc') }}</p>
          <button class="btn btn-primary btn-purple" @click="fetchJobs">
            {{ t('join.retry') }}
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="jobs.length === 0" class="empty-panel">
          <div class="empty-icon-wrap">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a78bfa"
              stroke-width="2"
            >
              <path
                d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
              ></path>
            </svg>
          </div>
          <h3>{{ t('join.empty_title') }}</h3>
          <p>{{ t('join.empty_desc') }}</p>
        </div>

        <!-- Active Vacancy List -->
        <div v-else class="jobs-grid">
          <article v-for="job in jobs" :key="job.id" class="job-card glass-card">
            <div class="job-head">
              <h3 class="job-title">{{ job.title }}</h3>
            </div>

            <div class="job-meta">
              <span class="meta-item">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {{ job.location }}
              </span>
              <span class="meta-item">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {{ job.experience }}
              </span>
              <span class="meta-item">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                {{ job.education }}
              </span>
              <span class="meta-item meta-salary">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                {{ job.salary }}
              </span>
            </div>

            <!-- Collapsed Preview (Show first 3 responsibilities) -->
            <div v-if="!isExpanded(job.id)" class="job-preview">
              <div class="job-divider"></div>
              <div class="detail-section">
                <h4 class="detail-title">{{ t('join.responsibilities') }}</h4>
                <ul class="detail-list">
                  <li v-for="(item, i) in job.responsibilities.slice(0, 3)" :key="i">{{ item }}</li>
                </ul>
              </div>
            </div>

            <!-- Expanded Details -->
            <transition
              name="expand-fade"
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter"
              @before-leave="beforeLeave"
              @leave="leave"
              @after-leave="afterLeave"
            >
              <div v-if="isExpanded(job.id)" class="job-details">
                <div class="job-divider"></div>

                <div class="detail-section">
                  <h4 class="detail-title">{{ t('join.responsibilities') }}</h4>
                  <ul class="detail-list">
                    <li v-for="(item, i) in job.responsibilities" :key="i">{{ item }}</li>
                  </ul>
                </div>

                <div class="detail-section">
                  <h4 class="detail-title">{{ t('join.requirements') }}</h4>
                  <ul class="detail-list">
                    <li v-for="(item, i) in job.requirements" :key="i">{{ item }}</li>
                  </ul>
                </div>

                <!-- Apply Email Section -->
                <div v-if="job.resumeEmail" class="detail-section apply-email-section">
                  <h4 class="detail-title">{{ t('join.apply_method') }}</h4>
                  <div class="apply-email-box">
                    <span class="apply-label">{{ t('join.email_label') }}</span>
                    <a :href="getMailHref(job)" class="mail-link-badge">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mail-icon"
                      >
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        ></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      {{ job.resumeEmail }}
                    </a>
                  </div>
                </div>
              </div>
            </transition>

            <!-- Action Button -->
            <div class="job-actions">
              <button
                class="btn-expand"
                :class="{ active: isExpanded(job.id) }"
                @click="toggleExpand(job.id)"
              >
                <span>{{ isExpanded(job.id) ? t('join.collapse') : t('join.expand') }}</span>
                <svg
                  class="chevron-icon"
                  :class="{ rotated: isExpanded(job.id) }"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.join-page {
  padding-top: 80px;
  /* offset for fixed header */
  flex-grow: 1;
}

/* Hero */
.join-hero {
  position: relative;
  padding: 96px 0 64px;
  text-align: center;
  overflow: visible;
  z-index: 20;
  background:
    radial-gradient(circle at 50% 30%, rgba(79, 70, 229, 0.18) 0%, transparent 60%), transparent;
}

.join-hero .container {
  position: relative;
  z-index: 2;
}

.hero-bg-text {
  font-size: 7rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.05);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: capitalize;
  letter-spacing: 2px;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 0;
  font-family: Arial, 'Helvetica Neue', sans-serif;
  line-height: 1;
}

.join-title {
  position: relative;
  z-index: 1;
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.join-subtitle {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.9;
  font-weight: 300;
  letter-spacing: 0.5px;
  max-width: 560px;
  margin: 0 auto;
}

.search-panel {
  width: min(860px, calc(100vw - 40px));
  margin: 44px auto 0;
  position: relative;
  z-index: 100;
}

.search-box {
  height: 76px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 28px;
  background: rgba(26, 27, 71, 0.58);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 18px 50px rgba(0, 3, 20, 0.24);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.search-icon {
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  color: var(--accent-cyan);
}

.search-box input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #ffffff;
  font: inherit;
  font-size: 17px;
  font-weight: 500;
}

.search-box input::placeholder {
  color: rgba(184, 212, 255, 0.46);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 22px;
  position: relative;
  z-index: 110;
}

.filter-select {
  min-width: 190px;
  position: relative;
  display: inline-flex;
  z-index: 120;
}

.filter-select.open {
  z-index: 140;
}

.filter-trigger {
  width: 100%;
  height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 16px 0 18px;
  background: rgba(26, 27, 71, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  color: rgba(184, 212, 255, 0.82);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  font: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-trigger:hover,
.filter-select.open .filter-trigger {
  border-color: rgba(0, 240, 255, 0.45);
  background: rgba(26, 27, 71, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 0 20px rgba(0, 55, 253, 0.18);
}

.filter-select.selected .filter-trigger {
  border-color: rgba(0, 240, 255, 0.32);
}

.filter-label {
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: 700;
  color: rgba(184, 212, 255, 0.82);
  white-space: nowrap;
}

.filter-value {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filter-chevron {
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  color: rgba(184, 212, 255, 0.95);
  transition: transform 0.2s ease;
}

.filter-chevron.open {
  transform: rotate(180deg);
  color: var(--accent-cyan);
}

.filter-menu {
  position: absolute;
  z-index: 150;
  top: calc(100% + 8px);
  left: 0;
  width: min(290px, 86vw);
  max-height: 270px;
  padding: 8px;
  overflow-y: auto;
  background: rgba(14, 20, 54, 0.98);
  border: 1px solid rgba(0, 240, 255, 0.28);
  border-radius: 8px;
  box-shadow:
    0 18px 44px rgba(0, 3, 20, 0.55),
    0 0 28px rgba(0, 55, 253, 0.2);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.filter-menu::-webkit-scrollbar {
  width: 6px;
}

.filter-menu::-webkit-scrollbar-thumb {
  background: rgba(0, 240, 255, 0.42);
  border-radius: 999px;
}

.filter-option {
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}

.filter-option span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.filter-option:hover {
  background: rgba(0, 240, 255, 0.1);
  color: #ffffff;
}

.filter-option.active {
  background: rgba(0, 55, 253, 0.52);
  color: #ffffff;
  box-shadow: inset 3px 0 0 var(--accent-cyan);
}

.filter-check {
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  color: var(--accent-cyan);
}

.filter-empty {
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 14px;
}

.clear-filter-btn {
  height: 52px;
  padding: 0 18px;
  border: 1px solid rgba(0, 240, 255, 0.35);
  border-radius: 8px;
  background: rgba(0, 240, 255, 0.06);
  color: var(--accent-cyan);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filter-btn:hover {
  border-color: rgba(0, 240, 255, 0.7);
  background: rgba(0, 240, 255, 0.14);
}

/* Job list */
.jobs-section {
  position: relative;
  z-index: 1;
  padding-top: 40px;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.job-card {
  padding: 32px;
  border-radius: 20px;
  transition: var(--transition-normal);
  align-self: start;
  /* Avoid stretching dynamically */
}

.job-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 240, 255, 0.25);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
}

.job-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.job-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.meta-item svg {
  color: var(--accent-purple);
  opacity: 0.9;
}

.meta-salary {
  color: var(--accent-cyan) !important;
  font-weight: 500;
  background: rgba(0, 240, 255, 0.06);
  border: 1px solid rgba(0, 240, 255, 0.18);
  border-radius: 9999px;
  padding: 2px 10px 2px 6px;
}

.meta-salary svg {
  color: var(--accent-cyan) !important;
  opacity: 1 !important;
}

/* Expand button styling */
.job-actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-start;
}

.btn-expand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 240, 255, 0.03);
  border: 1px solid rgba(0, 240, 255, 0.15);
  color: var(--accent-cyan);
  padding: 8px 18px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-normal);
}

.btn-expand:hover {
  background: rgba(0, 240, 255, 0.08);
  border-color: rgba(0, 240, 255, 0.4);
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.25);
}

.btn-expand.active {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.35);
  color: #ffffff;
}

.btn-expand.active:hover {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.3);
}

.chevron-icon {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

/* Details Section */
.job-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.job-divider {
  height: 1px;
  margin: 20px 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%);
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 12px;
  background: var(--accent-cyan);
  border-radius: 9999px;
}

.detail-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-list li {
  position: relative;
  padding-left: 18px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-secondary);
  font-weight: 300;
}

.detail-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-purple);
  box-shadow: 0 0 6px rgba(139, 92, 246, 0.6);
}

.jobs-foot {
  text-align: center;
  margin-top: 48px;
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-weight: 300;
}

.mail-link {
  color: var(--accent-cyan);
  transition: var(--transition-normal);
}

.mail-link:hover {
  opacity: 0.8;
}

/* Skeleton Loading styles */
.skeleton-card {
  pointer-events: none;
  min-height: 280px;
  background: rgba(255, 255, 255, 0.015);
}

.skeleton-line {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.08) 37%,
    rgba(255, 255, 255, 0.03) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
  border-radius: 4px;
}

.skeleton-title {
  height: 24px;
  width: 60%;
  margin-bottom: 24px;
}

.skeleton-meta-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.skeleton-meta-item {
  height: 18px;
  width: 70px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 25%,
    rgba(255, 255, 255, 0.08) 37%,
    rgba(255, 255, 255, 0.03) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.skeleton-text-1 {
  height: 14px;
  width: 80%;
  margin-bottom: 12px;
}

.skeleton-text-2 {
  height: 14px;
  width: 90%;
  margin-bottom: 12px;
}

.skeleton-text-3 {
  height: 14px;
  width: 75%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

/* Error Panel */
.error-panel {
  text-align: center;
  padding: 64px 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  max-width: 480px;
  margin: 0 auto 48px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.error-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.error-panel h3 {
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 12px;
  font-weight: 700;
}

.error-panel p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

/* Empty Panel */
.empty-panel {
  text-align: center;
  padding: 64px 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  max-width: 480px;
  margin: 0 auto 48px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.empty-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(167, 139, 250, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.empty-panel h3 {
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 12px;
  font-weight: 700;
}

.empty-panel p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

/* Responsive */
@media (max-width: 1024px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .join-title {
    font-size: 2.25rem;
  }

  .join-subtitle {
    font-size: 0.95rem;
  }

  .hero-bg-text {
    font-size: 5rem;
  }

  .search-panel {
    width: 100%;
    margin-top: 32px;
  }

  .search-box {
    height: 64px;
    padding: 0 20px;
  }

  .filter-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .filter-select,
  .clear-filter-btn {
    width: 100%;
    min-width: 0;
  }

  .filter-menu {
    width: 100%;
    max-height: 220px;
  }

  .clear-filter-btn {
    grid-column: 1 / -1;
  }

  .job-card {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .join-hero {
    padding: 64px 0 40px;
  }

  .join-title {
    font-size: 1.75rem;
  }

  .filter-row {
    grid-template-columns: 1fr;
  }

  .clear-filter-btn {
    grid-column: auto;
  }

  .job-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .job-meta {
    gap: 12px;
  }
}

/* Apply Email Box styles */
.apply-email-box {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.apply-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 300;
}

.mail-link-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(99, 34, 203, 0.15);
  border: 1px solid rgba(99, 34, 203, 0.3);
  padding: 6px 16px;
  border-radius: 9999px;
  color: #a78bfa;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.mail-link-badge:hover {
  background: rgba(99, 34, 203, 0.3);
  border-color: rgba(99, 34, 203, 0.6);
  color: #c084fc;
  box-shadow: 0 0 15px rgba(99, 34, 203, 0.3);
  transform: translateY(-1px);
}

.mail-icon {
  flex-shrink: 0;
}
</style>
