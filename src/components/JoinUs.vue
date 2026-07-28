<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import {
  getRecruitmentFilterOptions,
  getRecruitmentList,
  type RecruitmentFilterConfigItem,
  type RecruitmentFilterOptions,
  type RecruitmentItem,
  type RecruitmentLanguageType,
  type RecruitmentParams
} from '@/api/recruitment'

// Extended recruitment item type with reactive UI expanded state
interface Job extends RecruitmentItem {
  expanded: boolean
}

type FilterKey = 'department' | 'location' | 'experience'

interface FilterOption {
  label: string
  value: string
  usesKey?: boolean
}

// Initial language detection from URL hash (e.g. #/zh-CN#home, #/en#home, #/cht#home)
const getInitialLanguage = (): RecruitmentLanguageType => {
  const hash = typeof window !== 'undefined' ? window.location.hash : ''
  if (hash) {
    const lowerHash = hash.toLowerCase()
    if (lowerHash.includes('zh-cn') || lowerHash.includes('/zh')) {
      return 'zh'
    } else if (lowerHash.includes('cht') || lowerHash.includes('zh-tw') || lowerHash.includes('zh-hk')) {
      return 'cht'
    } else if (lowerHash.includes('en')) {
      return 'en'
    }
  }
  return 'zh'
}

const currentLang = ref<RecruitmentLanguageType>(getInitialLanguage())
const jobs = ref<Job[]>([])
const loading = ref(false)
const filterOptions = ref<RecruitmentFilterOptions>({})
const searchTerm = ref('')
const selectedDepartment = ref('all')
const selectedLocation = ref('all')
const selectedExperience = ref('all')
const activeFilter = ref<FilterKey | null>(null)
const searchPanelRef = ref<HTMLElement | null>(null)
let searchTimer: ReturnType<typeof setTimeout> | null = null

const t = {
  zh: {
    heroTitle: '加入我们',
    heroSubtitle: '在这里，你的每一份创意都将被赋予价值。',
    responsibilities: '岗位职责',
    requirements: '岗位要求',
    expand: '展开更多',
    collapse: '收起',
    noJobs: '暂无相关职位',
    loading: '加载中...',
    applyEmail: '简历投递',
    footerEcosystem: '核心生态系统',
    footerResources: '资源中心',
    footerStatement: '声明',
    footerSocial: '社群媒体',
    linkMerchant: '全球分散式链商',
    linkBingoEnt: 'Bingo全球文娱',
    linkAssetSys: 'Web3数字资产体系',
    linkWinPay: 'WinPay 支付',
    linkIntro: '集团业务介绍',
    linkModel: 'WebX 模型详解',
    linkTerms: '网站使用条款',
    linkPrivacy: '隐私政策声明'
  },
  cht: {
    heroTitle: '加入我們',
    heroSubtitle: '在這裡，你的每一份創意都將被賦予價值。',
    responsibilities: '崗位職責',
    requirements: '崗位要求',
    expand: '展開更多',
    collapse: '收起',
    noJobs: '暫無相關職位',
    loading: '加載中...',
    applyEmail: '簡歷投遞',
    footerEcosystem: '核心生態系統',
    footerResources: '資源中心',
    footerStatement: '聲明',
    footerSocial: '社群媒體',
    linkMerchant: '全球分散式鏈商',
    linkBingoEnt: 'Bingo全球文娛',
    linkAssetSys: 'Web3數位資產體系',
    linkWinPay: 'WinPay 支付',
    linkIntro: '集團業務介紹',
    linkModel: 'WebX 模型詳解',
    linkTerms: '網站使用條款',
    linkPrivacy: '私隱政策聲明'
  },
  en: {
    heroTitle: 'Join Us',
    heroSubtitle: 'Join BINGO Entertainment to co-create a global Web3 entertainment ecosystem. Here, every spark of your creativity is valued.',
    responsibilities: 'Key Responsibilities',
    requirements: 'Requirements',
    expand: 'Expand More',
    collapse: 'Collapse',
    noJobs: 'No positions available',
    loading: 'Loading...',
    applyEmail: 'Submit Resume To',
    footerEcosystem: 'Ecosystem',
    footerResources: 'Resources',
    footerStatement: 'Legal',
    footerSocial: 'Social Media',
    linkMerchant: 'Global Decentralized Merchants',
    linkBingoEnt: 'Bingo Global Entertainment',
    linkAssetSys: 'Web3 Digital Asset System',
    linkWinPay: 'WinPay Payment',
    linkIntro: 'Group Business Introduction',
    linkModel: 'WebX Model Explanation',
    linkTerms: 'Terms of Use',
    linkPrivacy: 'Privacy Policy'
  }
}

const fetchJobs = async () => {
  try {
    loading.value = true
    const data = await getRecruitmentList(buildRecruitmentParams())
    
    jobs.value = data.map(item => {
      // Handle potential string-serialized arrays returned from the API
      let resps: string[] = []
      if (Array.isArray(item.responsibilities)) {
        resps = item.responsibilities
      } else if (typeof item.responsibilities === 'string') {
        try {
          resps = JSON.parse(item.responsibilities)
        } catch {
          resps = item.responsibilities.split('\n').filter(Boolean)
        }
      }

      let reqs: string[] = []
      if (Array.isArray(item.requirements)) {
        reqs = item.requirements
      } else if (typeof item.requirements === 'string') {
        try {
          reqs = JSON.parse(item.requirements)
        } catch {
          reqs = item.requirements.split('\n').filter(Boolean)
        }
      }

      return {
        ...item,
        responsibilities: resps,
        requirements: reqs,
        expanded: false
      }
    })
  } catch (error) {
    console.error('Failed to load recruitment list:', error)
  } finally {
    loading.value = false
  }
}

const uiText = computed(() => {
  if (currentLang.value === 'en') {
    return {
      searchPlaceholder: 'Search for job titles, keywords...',
      department: 'Department',
      location: 'Location',
      salary: 'Salary',
      experience: 'Experience',
      all: 'All',
      noFilterData: 'No data',
      clear: 'Clear filters',
      fullTime: 'Full-time',
      openRole: 'Open Position',
      langZh: '简体中文',
      langCht: '繁体中文',
      langEn: 'English'
    }
  }

  if (currentLang.value === 'cht') {
    return {
      searchPlaceholder: '搜尋職位、關鍵字...',
      department: '部門',
      location: '地點',
      salary: '薪資',
      experience: '經驗',
      all: '全部',
      noFilterData: '暫無資料',
      clear: '清除篩選',
      fullTime: '全職',
      openRole: '開放職位',
      langZh: '简体中文',
      langCht: '繁体中文',
      langEn: 'English'
    }
  }

  return {
    searchPlaceholder: '搜索职位、关键词...',
    department: '部门',
    location: '地点',
    salary: '薪资',
    experience: '经验',
    all: '全部',
    noFilterData: '暂无数据',
    clear: '清除筛选',
    fullTime: '全职',
    openRole: '开放职位',
    langZh: '简体中文',
    langCht: '繁体中文',
    langEn: 'English'
  }
})

const normalizeText = (value: unknown) => String(value || '').trim()

const getJobDepartment = (job: Job) => normalizeText(
  job.department ||
  job.departmentName ||
  job.deptName ||
  job.category ||
  job.positionType ||
  job.type
) || uiText.value.openRole

const getJobWorkType = (job: Job) => normalizeText(
  job.workType ||
  job.employmentType ||
  job.jobNature ||
  job.nature
) || uiText.value.fullTime

const uniqueOptions = (values: string[]) => {
  return Array.from(new Set(values.filter(Boolean)))
}

const fromConfigItems = (items?: RecruitmentFilterConfigItem[] | null): FilterOption[] => {
  if (!Array.isArray(items)) return []

  return items
    .filter(item => item?.name && item?.groupKey)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0))
    .map(item => ({
      label: item.name,
      value: item.groupKey,
      usesKey: true
    }))
}

const fromTextValues = (values: string[]): FilterOption[] => {
  return uniqueOptions(values.map(normalizeText)).map(value => ({
    label: value,
    value
  }))
}

const departmentOptions = computed(() => {
  return fromConfigItems(filterOptions.value.department)
})

const locationOptions = computed(() => {
  return fromConfigItems(filterOptions.value.location)
})

const experienceOptions = computed(() => {
  return fromConfigItems(filterOptions.value.experience)
})

const getSelectedFilterValue = (key: FilterKey) => {
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

const toFilterOptions = (options: FilterOption[]) => [
  ...(options.length ? [{ label: uiText.value.all, value: 'all' } as FilterOption] : []),
  ...options
]

const filterConfigs = computed(() => [
  {
    key: 'department' as const,
    label: uiText.value.department,
    value: selectedDepartment.value,
    options: toFilterOptions(departmentOptions.value)
  },
  {
    key: 'location' as const,
    label: uiText.value.location,
    value: selectedLocation.value,
    options: toFilterOptions(locationOptions.value)
  },
  {
    key: 'experience' as const,
    label: uiText.value.experience,
    value: selectedExperience.value,
    options: toFilterOptions(experienceOptions.value)
  }
])

const toggleFilterMenu = (key: FilterKey) => {
  activeFilter.value = activeFilter.value === key ? null : key
}

const getFilterOptionsByKey = (key: FilterKey) => {
  return filterConfigs.value.find(filter => filter.key === key)?.options || []
}

const getSelectedFilterOption = (key: FilterKey) => {
  const selectedValue = getSelectedFilterValue(key)
  return getFilterOptionsByKey(key).find(option => option.value === selectedValue)
}

const getSelectedFilterLabel = (key: FilterKey, value: string) => {
  if (value === 'all') return uiText.value.all
  return getSelectedFilterOption(key)?.label || value
}

const applyFilterParam = (
  params: RecruitmentParams,
  key: FilterKey,
  keyParam: keyof RecruitmentParams,
  textParam: keyof RecruitmentParams
) => {
  const selectedValue = getSelectedFilterValue(key)
  if (selectedValue === 'all') return

  const selectedOption = getSelectedFilterOption(key)
  if (selectedOption?.usesKey) {
    params[keyParam] = selectedOption.value as any
  } else {
    params[textParam] = (selectedOption?.label || selectedValue) as any
  }
}

const buildRecruitmentParams = (): RecruitmentParams => {
  const params: RecruitmentParams = {
    languageType: currentLang.value
  }
  const keyword = searchTerm.value.trim()

  if (keyword) {
    params.keyword = keyword
  }

  applyFilterParam(params, 'department', 'departmentKey', 'department')
  applyFilterParam(params, 'location', 'locationKey', 'location')
  applyFilterParam(params, 'experience', 'experienceKey', 'experience')

  return params
}

const filteredJobs = computed(() => jobs.value)

const hasActiveFilters = computed(() => {
  return Boolean(searchTerm.value.trim()) ||
    selectedDepartment.value !== 'all' ||
    selectedLocation.value !== 'all' ||
    selectedExperience.value !== 'all'
})

const clearFilters = () => {
  searchTerm.value = ''
  selectedDepartment.value = 'all'
  selectedLocation.value = 'all'
  selectedExperience.value = 'all'
  activeFilter.value = null
}

const toggleExpand = (job: Job) => {
  job.expanded = !job.expanded
}

const changeLang = (lang: RecruitmentLanguageType) => {
  currentLang.value = lang
}

const handleDocumentClick = (event: MouseEvent) => {
  if (!searchPanelRef.value?.contains(event.target as Node)) {
    activeFilter.value = null
  }
}

const fetchFilterOptions = async () => {
  try {
    filterOptions.value = await getRecruitmentFilterOptions(currentLang.value)
  } catch (error) {
    console.error('Failed to load recruitment filter options:', error)
    filterOptions.value = {}
  }
}

// Fetch on mount
onMounted(() => {
  // Remove the useless hash (e.g. #/zh-CN#home) from the URL to keep it clean
  if (typeof window !== 'undefined' && window.location.hash) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }
  fetchFilterOptions()
  fetchJobs()
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }
  document.removeEventListener('click', handleDocumentClick)
})

// Refetch on language change
watch(currentLang, () => {
  clearFilters()
  fetchFilterOptions()
  fetchJobs()
})

watch([selectedDepartment, selectedLocation, selectedExperience], () => {
  fetchJobs()
})

watch(searchTerm, () => {
  if (searchTimer) {
    clearTimeout(searchTimer)
  }

  searchTimer = setTimeout(() => {
    fetchJobs()
  }, 300)
})
</script>

<template>
  <div class="join-us-container">
    <!-- Header with WebX logo (#1A1B47 background, fixed, glassmorphism, transparent) -->
    <header class="header">
      <a href="/join/" class="logo">
        <svg class="logo-svg" version="1.1" id="logo_header" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="285 235 273 124" style="enable-background:new 285 235 273 124;" xml:space="preserve">
          <g>
            <path class="st0" d="M403.43,304.78c-2.84,7.54-10.46,12.62-19.42,12.62c-11.43,0-20.84-8.81-20.84-20.17s9.41-20.17,20.84-20.17 c11.5,0,20.77,8.81,20.77,20.17c0,0.82-0.07,1.64-0.15,2.46h-33.69c1.12,6.12,6.57,10.98,13.07,10.98c4.56,0,8.89-2.24,11.05-5.9 H403.43z M396.86,293.65c-1.64-5.6-6.65-9.86-12.85-9.86c-6.05,0-11.28,4.26-12.85,9.86H396.86z"/>
            <path class="st0" d="M417.7,310.75v5.53h-7.17v-50.79H418v17.4c3.44-3.66,8.37-5.83,13.44-5.83c11.43,0,20.84,8.74,20.84,20.17 s-9.41,20.17-20.84,20.17C426.14,317.4,420.84,315.01,417.7,310.75z M417.78,297.23c0,7.39,6.05,13.44,13.52,13.44 c7.39,0,13.52-5.98,13.52-13.44c0-7.47-6.12-13.44-13.52-13.44C423.83,283.79,417.78,289.84,417.78,297.23z"/>
            <polygon class="st0" points="295.16,265.49 315.64,317.4 320.51,317.4 331.54,285.35 343.05,317.4 347.27,317.4 368.25,265.49 359.88,265.49 345.29,301.72 332.57,266.74 330.42,266.74 317.98,301.53 303.67,265.49 	"/>
            <path class="st0" d="M471.23,302.81l-4.75,2.54c2.79,9.79,10.44,17.54,20.18,20.46l2.44-4.75 C480.25,318.79,473.31,311.73,471.23,302.81z M501.31,321.06l2.38,4.77c9.8-2.91,17.5-10.72,20.27-20.58l-4.81-2.29 C517.02,311.8,510.11,318.8,501.31,321.06z M519.23,291.77l4.87-2.16c-2.63-10.02-10.35-17.99-20.21-20.99l-2.58,4.71 C510.22,275.6,517.19,282.76,519.23,291.77z M488.75,273.42l-2.57-4.7c-9.74,3.09-17.33,11.05-19.9,21l4.79,2.53 C472.93,283.14,479.85,275.84,488.75,273.42z"/>
            <path class="st0" d="M459.78,309.05l-4.66,2.54c4.26,11.82,13.6,21.24,25.38,25.58l2.49-4.67 C472.09,328.71,463.46,320,459.78,309.05z M454.89,283.44l4.68,2.55c3.51-11.15,12.13-20.06,23.09-23.98l-2.49-4.66 C468.33,261.82,459,271.43,454.89,283.44z M535.59,310.72l-4.77-2.26c-3.6,11.34-12.47,20.35-23.73,24.14l2.36,4.72 C521.73,332.96,531.43,323.1,535.59,310.72z M542.83,281.62l4.83-2.08c-5.08-15.06-16.48-27.24-31.02-33.38l-2.6,4.6 C527.62,256.29,538.24,267.6,542.83,281.62z M448.45,315.22l-4.64,2.52c5.6,13.95,16.72,25.11,30.64,30.76l2.48-4.65 C463.9,338.73,453.51,328.29,448.45,315.22z M512.83,344.09l2.35,4.71c14.79-5.75,26.52-17.68,32-32.6l-4.76-2.25 C537.49,327.83,526.59,338.9,512.83,344.09z M531.05,286.69l4.84-2.08c-3.88-12.53-13.4-22.59-25.58-27.23l-2.61,4.62 C518.92,265.99,527.68,275.19,531.05,286.69z M476.6,250.66l-2.48-4.64c-13.98,5.78-25.09,17.12-30.56,31.26l4.64,2.53 C453.13,266.55,463.51,255.92,476.6,250.66z"/>
            <path class="st0" d="M495.2,276.56c-11.4,0-20.63,9.24-20.63,20.63c0,11.4,9.24,20.63,20.63,20.63c11.4,0,20.63-9.24,20.63-20.63 C515.84,285.8,506.6,276.56,495.2,276.56z M499.75,311.11c-2.26,1.96-5.3,1.79-5.3,1.79l0,0l0,0c-8.33-0.39-14.97-7.27-14.97-15.71 c0-6.78,4.29-12.56,10.31-14.77c-0.01,0-4.82,3.49-2.34,10.03c0,0,1.72,4.89,9.16,6.44l0,0c3.23,0.6,5.68,3.43,5.68,6.83 C502.29,307.9,501.3,309.83,499.75,311.11z"/>
          </g>
        </svg>
      </a>
      <div class="lang-selector compact">
        <button
          :class="{ active: currentLang === 'zh' }"
          @click="changeLang('zh')"
          class="lang-btn"
        >
          {{ uiText.langZh }}
        </button>
        <button
          :class="{ active: currentLang === 'cht' }"
          @click="changeLang('cht')"
          class="lang-btn"
        >
          {{ uiText.langCht }}
        </button>
        <button
          :class="{ active: currentLang === 'en' }"
          @click="changeLang('en')"
          class="lang-btn"
        >
          {{ uiText.langEn }}
        </button>
      </div>
    </header>

    <!-- Hero section -->
    <section class="hero">
      <div class="watermark">Join Us</div>
      <h1 class="hero-title">{{ t[currentLang].heroTitle }}</h1>
      <p class="hero-subtitle">
        {{ t[currentLang].heroSubtitle }}
      </p>
      <div class="search-panel" ref="searchPanelRef" role="search" @click.stop>
        <label class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input v-model="searchTerm" type="search" :placeholder="uiText.searchPlaceholder" />
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
              <span class="filter-value">{{ getSelectedFilterLabel(filter.key, filter.value) }}</span>
              <svg class="filter-chevron" :class="{ open: activeFilter === filter.key }" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <div v-if="activeFilter === filter.key" class="filter-menu">
              <template v-if="filter.options.length">
                <button
                  v-for="option in filter.options"
                  :key="option.value"
                  class="filter-option"
                  :class="{ active: getSelectedFilterValue(filter.key) === option.value }"
                  type="button"
                  @click="setSelectedFilterValue(filter.key, option.value)"
                >
                  <span>{{ option.label }}</span>
                  <svg v-if="getSelectedFilterValue(filter.key) === option.value" class="filter-check" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
                    aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </template>
              <div v-else class="filter-empty">
                {{ uiText.noFilterData }}
              </div>
            </div>
          </div>
          <button v-if="hasActiveFilters" class="clear-filter-btn" type="button" @click="clearFilters">
            {{ uiText.clear }}
          </button>
        </div>
      </div>
    </section>

    <!-- Jobs grid -->
    <section class="jobs-section">
      <div class="lang-selector-wrapper">
        <div class="lang-selector">
          <button 
            :class="{ active: currentLang === 'zh' }" 
            @click="changeLang('zh')"
            class="lang-btn"
          >
            简体中文
          </button>
          <button 
            :class="{ active: currentLang === 'cht' }" 
            @click="changeLang('cht')"
            class="lang-btn"
          >
            繁體中文
          </button>
          <button 
            :class="{ active: currentLang === 'en' }" 
            @click="changeLang('en')"
            class="lang-btn"
          >
            English
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>{{ t[currentLang].loading }}</p>
      </div>

      <!-- No Jobs State -->
      <div v-else-if="filteredJobs.length === 0" class="no-jobs-state">
        <p>{{ t[currentLang].noJobs }}</p>
      </div>

      <div v-else class="jobs-grid">
        <div v-for="(job, index) in filteredJobs" :key="job.id || index" class="job-card">
          <div class="job-card-top">
            <span class="department-label">{{ getJobDepartment(job) }}</span>
            <span class="work-type-pill">{{ getJobWorkType(job) }}</span>
          </div>
          <h3 class="job-title">{{ job.title }}</h3>

          <div class="job-badges">
            <div class="badge">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {{ job.location }}
            </div>

            <div class="badge">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {{ job.experience }}
            </div>

            <div class="badge">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
              </svg>
              {{ job.education }}
            </div>

            <!-- Gold highlighted salary badge to match WebX color scheme -->
            <div class="badge salary">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
              {{ job.salary }}
            </div>
          </div>

          <div class="job-content">
            <h4 class="section-title">
              <span class="bar"></span>
              {{ t[currentLang].responsibilities }}
            </h4>
            <ul class="bullet-list">
              <li v-for="resp in job.responsibilities" :key="resp">{{ resp }}</li>
            </ul>

            <!-- Expanded Section -->
            <div class="expanded-wrapper"
              :style="{ maxHeight: job.expanded ? '500px' : '0px', opacity: job.expanded ? '1' : '0' }">
              <div class="expanded-content">
                <h4 class="section-title">
                  <span class="bar"></span>
                  {{ t[currentLang].requirements }}
                </h4>
                <ul class="bullet-list">
                  <li v-for="req in job.requirements" :key="req">{{ req }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="job-email">
            <svg class="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span class="email-label">{{ t[currentLang].applyEmail }}:</span>
            <a href="mailto:jackli@webx.vip" class="email-link">jackli@webx.vip</a>
          </div>

          <button @click="toggleExpand(job)" class="expand-btn">
            {{ job.expanded ? t[currentLang].collapse : t[currentLang].expand }}
            <svg class="chevron-icon" :class="{ 'is-expanded': job.expanded }" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Footer mirroring the layout of the user's reference image with WebX logo -->
    <footer class="footer">
      <div class="footer-container">
        <!-- Brand / Logo Column -->
        <div class="footer-col brand-col">
          <div class="footer-logo">
            <svg class="logo-svg" version="1.1" id="logo_footer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="285 235 273 124" style="enable-background:new 285 235 273 124;" xml:space="preserve">
              <g>
                <path class="st0" d="M403.43,304.78c-2.84,7.54-10.46,12.62-19.42,12.62c-11.43,0-20.84-8.81-20.84-20.17s9.41-20.17,20.84-20.17 c11.5,0,20.77,8.81,20.77,20.17c0,0.82-0.07,1.64-0.15,2.46h-33.69c1.12,6.12,6.57,10.98,13.07,10.98c4.56,0,8.89-2.24,11.05-5.9 H403.43z M396.86,293.65c-1.64-5.6-6.65-9.86-12.85-9.86c-6.05,0-11.28,4.26-12.85,9.86H396.86z"/>
                <path class="st0" d="M417.7,310.75v5.53h-7.17v-50.79H418v17.4c3.44-3.66,8.37-5.83,13.44-5.83c11.43,0,20.84,8.74,20.84,20.17 s-9.41,20.17-20.84,20.17C426.14,317.4,420.84,315.01,417.7,310.75z M417.78,297.23c0,7.39,6.05,13.44,13.52,13.44 c7.39,0,13.52-5.98,13.52-13.44c0-7.47-6.12-13.44-13.52-13.44C423.83,283.79,417.78,289.84,417.78,297.23z"/>
                <polygon class="st0" points="295.16,265.49 315.64,317.4 320.51,317.4 331.54,285.35 343.05,317.4 347.27,317.4 368.25,265.49 359.88,265.49 345.29,301.72 332.57,266.74 330.42,266.74 317.98,301.53 303.67,265.49 	"/>
                <path class="st0" d="M471.23,302.81l-4.75,2.54c2.79,9.79,10.44,17.54,20.18,20.46l2.44-4.75 C480.25,318.79,473.31,311.73,471.23,302.81z M501.31,321.06l2.38,4.77c9.8-2.91,17.5-10.72,20.27-20.58l-4.81-2.29 C517.02,311.8,510.11,318.8,501.31,321.06z M519.23,291.77l4.87-2.16c-2.63-10.02-10.35-17.99-20.21-20.99l-2.58,4.71 C510.22,275.6,517.19,282.76,519.23,291.77z M488.75,273.42l-2.57-4.7c-9.74,3.09-17.33,11.05-19.9,21l4.79,2.53 C472.93,283.14,479.85,275.84,488.75,273.42z"/>
                <path class="st0" d="M459.78,309.05l-4.66,2.54c4.26,11.82,13.6,21.24,25.38,25.58l2.49-4.67 C472.09,328.71,463.46,320,459.78,309.05z M454.89,283.44l4.68,2.55c3.51-11.15,12.13-20.06,23.09-23.98l-2.49-4.66 C468.33,261.82,459,271.43,454.89,283.44z M535.59,310.72l-4.77-2.26c-3.6,11.34-12.47,20.35-23.73,24.14l2.36,4.72 C521.73,332.96,531.43,323.1,535.59,310.72z M542.83,281.62l4.83-2.08c-5.08-15.06-16.48-27.24-31.02-33.38l-2.6,4.6 C527.62,256.29,538.24,267.6,542.83,281.62z M448.45,315.22l-4.64,2.52c5.6,13.95,16.72,25.11,30.64,30.76l2.48-4.65 C463.9,338.73,453.51,328.29,448.45,315.22z M512.83,344.09l2.35,4.71c14.79-5.75,26.52-17.68,32-32.6l-4.76-2.25 C537.49,327.83,526.59,338.9,512.83,344.09z M531.05,286.69l4.84-2.08c-3.88-12.53-13.4-22.59-25.58-27.23l-2.61,4.62 C518.92,265.99,527.68,275.19,531.05,286.69z M476.6,250.66l-2.48-4.64c-13.98,5.78-25.09,17.12-30.56,31.26l4.64,2.53 C453.13,266.55,463.51,255.92,476.6,250.66z"/>
                <path class="st0" d="M495.2,276.56c-11.4,0-20.63,9.24-20.63,20.63c0,11.4,9.24,20.63,20.63,20.63c11.4,0,20.63-9.24,20.63-20.63 C515.84,285.8,506.6,276.56,495.2,276.56z M499.75,311.11c-2.26,1.96-5.3,1.79-5.3,1.79l0,0l0,0c-8.33-0.39-14.97-7.27-14.97-15.71 c0-6.78,4.29-12.56,10.31-14.77c-0.01,0-4.82,3.49-2.34,10.03c0,0,1.72,4.89,9.16,6.44l0,0c3.23,0.6,5.68,3.43,5.68,6.83 C502.29,307.9,501.3,309.83,499.75,311.11z"/>
              </g>
            </svg>
          </div>
          <p class="copyright">@2026 WebX. All right reserved</p>
        </div>

        <!-- Column 2: 核心生态系统 -->
        <div class="footer-col">
          <h4 class="footer-title">{{ t[currentLang].footerEcosystem }}</h4>
          <ul class="footer-links">
            <li><a href="https://webx.ai/chs/core-ecosystem#global" target="_blank" rel="noopener noreferrer">{{ t[currentLang].linkMerchant }}</a></li>
            <li><a href="https://webx.ai/chs/core-ecosystem#bingo" target="_blank" rel="noopener noreferrer">{{ t[currentLang].linkBingoEnt }}</a></li>
            <li><a href="https://webx.ai/chs/core-ecosystem#web3" target="_blank" rel="noopener noreferrer">{{ t[currentLang].linkAssetSys }}</a></li>
            <li><a href="https://webx.ai/chs/core-ecosystem#winpay" target="_blank" rel="noopener noreferrer">{{ t[currentLang].linkWinPay }}</a></li>
          </ul>
        </div>

        <!-- Column 3: 资源中心 -->
        <div class="footer-col">
          <h4 class="footer-title">{{ t[currentLang].footerResources }}</h4>
          <ul class="footer-links">
            <li><a href="https://webx.ai/chs/resource-center#group" target="_blank" rel="noopener noreferrer">{{ t[currentLang].linkIntro }}</a></li>
          </ul>
        </div>

        <!-- Column 4: 声明 -->
        <div class="footer-col">
          <h4 class="footer-title">{{ t[currentLang].footerStatement }}</h4>
          <ul class="footer-links">
            <li><a href="https://webx.ai/chs/p/terms-chs" target="_blank" rel="noopener noreferrer">{{ t[currentLang].linkTerms }}</a></li>
            <li><a href="https://webx.ai/chs/p/privacypolicy-chs" target="_blank" rel="noopener noreferrer">{{ t[currentLang].linkPrivacy }}</a></li>
          </ul>
        </div>

        <!-- Column 5: 社群媒体 -->
        <div class="footer-col">
          <h4 class="footer-title">{{ t[currentLang].footerSocial }}</h4>
          <div class="social-links-row">
            <a href="https://t.me/WebX_Business" class="social-btn" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-.97.53-1.35.52-.42-.01-1.23-.24-1.83-.44-.74-.24-1.33-.37-1.28-.79.03-.22.33-.45.9-.69 3.51-1.52 5.85-2.53 7.02-3 .3-.12.59-.22.88-.22.29 0 .91.16 1.27.52.28.28.27.75.17.98z"/>
              </svg>
            </a>
            <a href="https://x.com/WebX_Business" class="social-btn" aria-label="X" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@WebX-001" class="social-btn" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://medium.com/@WebXBusiness" class="social-btn" aria-label="Medium" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/people/WebX/61585785560018/" class="social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global resets for body and html inside this view */
body {
  margin: 0;
  padding: 0;
  background-color: #000D51;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap');

.join-us-container {
  min-height: 100vh;
  background-color: #000D51;
  background-image:
    radial-gradient(circle at 80% 20%, rgba(0, 55, 253, 0.4) 0%, transparent 60%),
    radial-gradient(circle at 20% 80%, rgba(0, 13, 81, 0.95) 0%, transparent 70%),
    linear-gradient(135deg, #000D51 0%, #0021b0 60%, #0037FD 100%),
    radial-gradient(rgba(255, 255, 255, 0.02) 1.5px, transparent 1.5px);
  background-size: 100% 100%, 100% 100%, 100% 100%, 28px 28px;
  color: #f3f4f6;
  font-family: 'Outfit', 'Inter', 'Noto Sans SC', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Pulsing ambient globe glow using #0037FD */
.join-us-container::before {
  content: '';
  position: absolute;
  top: 10%;
  right: -120px;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(0, 55, 253, 0.25) 0%, rgba(0, 55, 253, 0.05) 50%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
  animation: pulse-glow 8s infinite alternate ease-in-out;
}

@keyframes pulse-glow {
  0% {
    transform: scale(1) translate(0, 0);
    opacity: 0.8;
  }

  100% {
    transform: scale(1.15) translate(-20px, 20px);
    opacity: 1;
  }
}

/* Header styling - #1A1B47 background, fixed, Apple-style transparent glassmorphism */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  background-color: rgba(26, 27, 71, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.25);
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

/* Styling for embedded WebX SVG logo */
.logo-svg {
  height: 64px;
  width: auto;
  display: block;
  transition: opacity 0.3s;
}

.logo-svg:hover {
  opacity: 0.8;
}

/* Force all SVG paths and polygons to be white on dark header/footer backgrounds */
.logo-svg .st0 {
  fill: #ffffff;
  transition: fill 0.3s;
}

.logo-svg:hover .st0 {
  fill: rgba(255, 255, 255, 0.8);
}

/* Hero section styling - with increased padding-top to prevent overlap from fixed header */
.hero {
  text-align: center;
  padding: 150px 20px 60px 20px;
  position: relative;
  z-index: 2;
}

.watermark {
  font-size: 8rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: rgba(0, 55, 253, 0.08);
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
  font-family: 'Outfit', sans-serif;
}

@media (max-width: 768px) {
  .watermark {
    font-size: 4.5rem;
    top: 125px;
  }
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 20px 0;
  position: relative;
  z-index: 3;
  letter-spacing: 2px;
  background: linear-gradient(180deg, #ffffff 0%, #b8d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(184, 212, 255, 0.85);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
  position: relative;
  z-index: 3;
}

@media (max-width: 768px) {
  .hero-subtitle {
    font-size: 0.95rem;
    padding: 0 10px;
  }
}

/* Jobs grid section styling */
.jobs-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 80px 24px;
  position: relative;
  z-index: 3;
}

/* Language selector styling */
.lang-selector-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.lang-selector {
  display: flex;
  background: rgba(26, 27, 71, 0.45);
  border: 1px solid rgba(0, 55, 253, 0.25);
  padding: 4px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.lang-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  padding: 10px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Outfit', sans-serif;
}

.lang-btn:hover {
  color: #ffffff;
}

.lang-btn.active {
  background: linear-gradient(135deg, #0037FD 0%, #000D51 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 55, 253, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Loading & Empty state */
.loading-state, .no-jobs-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 15px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 55, 253, 0.15);
  border-top-color: #0037FD;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  align-items: start;
}

@media (max-width: 900px) {
  .jobs-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

/* Job Card styling - `#000D51` base card with `#0037FD` borders */
.job-card {
  background: rgba(0, 13, 81, 0.75);
  border: 1px solid rgba(0, 55, 253, 0.25);
  border-radius: 16px;
  padding: 32px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 10px 40px rgba(0, 3, 20, 0.45);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
}

.job-card:hover {
  transform: translateY(-5px);
  border-color: #0037FD;
  box-shadow:
    0 15px 40px rgba(0, 3, 20, 0.55),
    0 0 30px rgba(0, 55, 253, 0.25);
}

.job-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px 0;
  letter-spacing: 0.5px;
}

.job-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  align-items: center;
}

.badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(184, 212, 255, 0.8);
  background: rgba(0, 55, 253, 0.1);
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid rgba(0, 55, 253, 0.2);
}

.badge .icon {
  width: 14px;
  height: 14px;
  opacity: 0.8;
  color: #5c92ff;
}

/* Neon cyan highlighted salary badge matching WebX accents */
.badge.salary {
  color: #00F0FF;
  border-color: rgba(0, 240, 255, 0.4);
  background: rgba(0, 240, 255, 0.08);
  font-weight: 600;
}

.badge.salary .icon {
  opacity: 1;
  color: #00F0FF;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 12px;
}

/* Cyan accent bar to match WebX title styling */
.section-title .bar {
  width: 3px;
  height: 14px;
  background: #00F0FF;
  border-radius: 1.5px;
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
}

.bullet-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.bullet-list li {
  position: relative;
  padding-left: 16px;
  font-size: 14px;
  line-height: 1.8;
  color: rgba(184, 212, 255, 0.85);
  margin-bottom: 8px;
}

/* Cyan dots for lists */
.bullet-list li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 9px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #00F0FF;
  box-shadow: 0 0 6px rgba(0, 240, 255, 0.8);
}

/* Expansion transition setup */
.expanded-wrapper {
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

.expanded-content {
  padding-top: 10px;
  border-top: 1px solid rgba(0, 55, 253, 0.2);
  margin-top: 10px;
}

.expand-btn {
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #7ea6ff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  margin-left: -16px;
  border-radius: 6px;
  transition: all 0.2s;
  margin-top: auto;
}

.expand-btn:hover {
  background: rgba(0, 55, 253, 0.15);
  color: #00F0FF;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.chevron-icon.is-expanded {
  transform: rotate(180deg);
}

/* Footer styling - Solid black background to match reference */
.footer {
  background-color: #000000;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 80px 40px 60px 40px;
  position: relative;
  z-index: 3;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr repeat(4, 1fr);
  gap: 40px;
}

@media (max-width: 900px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .brand-col {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .footer-container {
    grid-template-columns: 1fr;
  }

  .brand-col {
    grid-column: span 1;
  }
}

.footer-col {
  display: flex;
  flex-direction: column;
}

.brand-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 120px;
}

.footer-logo {
  display: flex;
  align-items: center;
}

.copyright {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
  margin: 20px 0 0 0;
  font-family: 'Outfit', sans-serif;
}

.footer-title {
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer-links li a {
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.footer-links li a:hover {
  color: #ffffff;
}

/* Horizontal social links in footer */
.social-links-row {
  display: flex;
  gap: 20px;
  align-items: center;
}

.social-btn {
  color: #ffffff;
  opacity: 0.6;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.social-btn:hover {
  opacity: 1;
  transform: translateY(-2px);
}

/* Email submission section in job cards */
.job-email {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  font-size: 14px;
}

.email-icon {
  width: 16px;
  height: 16px;
  color: #00F0FF;
}

.email-label {
  color: rgba(255, 255, 255, 0.65);
  font-family: 'Outfit', sans-serif;
}

.email-link {
  color: #00F0FF;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  font-family: 'Outfit', sans-serif;
}

.email-link:hover {
  text-decoration: underline;
  color: #ffffff;
}

/* Reference-inspired recruitment controls while preserving the current palette */
.header {
  min-height: 76px;
  padding: 8px clamp(18px, 5vw, 72px);
}

.lang-selector.compact {
  padding: 3px;
  border-color: rgba(0, 240, 255, 0.28);
  box-shadow: 0 0 24px rgba(0, 55, 253, 0.18);
}

.lang-selector.compact .lang-btn {
  padding: 8px 14px;
  font-size: 13px;
  white-space: nowrap;
}

.lang-selector-wrapper {
  display: none;
}

.hero {
  padding: 140px 20px 48px 20px;
  z-index: 40;
}

.hero-subtitle {
  max-width: 720px;
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
  color: #00F0FF;
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
  min-width: 170px;
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
  border-radius: 12px;
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
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  color: rgba(184, 212, 255, 0.82);
}

.filter-value {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
}

.filter-chevron {
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  color: rgba(184, 212, 255, 0.95);
  transition: transform 0.2s ease, color 0.2s ease;
}

.filter-chevron.open {
  transform: rotate(180deg);
  color: #00F0FF;
}

.filter-menu {
  position: absolute;
  z-index: 150;
  top: calc(100% + 8px);
  left: 0;
  width: min(280px, 86vw);
  max-height: 270px;
  padding: 8px;
  overflow-y: auto;
  background:
    linear-gradient(180deg, rgba(26, 27, 71, 0.98), rgba(0, 13, 81, 0.98));
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 12px;
  box-shadow:
    0 18px 44px rgba(0, 3, 20, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset,
    0 0 28px rgba(0, 55, 253, 0.2);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.filter-menu::-webkit-scrollbar {
  width: 6px;
}

.filter-menu::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 999px;
}

.filter-menu::-webkit-scrollbar-thumb {
  background: rgba(0, 240, 255, 0.42);
  border-radius: 999px;
}

.filter-option {
  width: 100%;
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 0;
  border-radius: 8px;
  padding: 8px 10px;
  background: transparent;
  color: rgba(225, 236, 255, 0.82);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  transition: all 0.16s ease;
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
  box-shadow: inset 3px 0 0 #00F0FF;
}

.filter-check {
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  color: #00F0FF;
}

.filter-empty {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: rgba(184, 212, 255, 0.62);
  font-size: 13px;
  font-weight: 700;
}

.clear-filter-btn {
  height: 52px;
  border: 1px solid rgba(0, 240, 255, 0.35);
  border-radius: 12px;
  padding: 0 18px;
  background: rgba(0, 240, 255, 0.08);
  color: #00F0FF;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filter-btn:hover {
  border-color: rgba(0, 240, 255, 0.7);
  background: rgba(0, 240, 255, 0.14);
}

.jobs-section {
  max-width: 1360px;
  padding-top: 18px;
  z-index: 1;
}

.jobs-grid {
  gap: 24px;
}

.job-card {
  min-height: 360px;
  border-radius: 12px;
  padding: 26px;
  position: relative;
}

.job-card::after {
  content: '';
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 0;
  height: 3px;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(90deg, transparent, #00F0FF 18%, #0037FD 82%, transparent);
  opacity: 0.9;
}

.job-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.department-label {
  color: #00F0FF;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.work-type-pill {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 2px 9px;
  border-radius: 999px;
  background: rgba(0, 240, 255, 0.16);
  color: #00F0FF;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
}

.job-title {
  font-size: clamp(1.2rem, 1.5vw, 1.55rem);
  margin-bottom: 14px;
}

.job-badges {
  gap: 8px;
  margin-bottom: 20px;
}

.badge {
  max-width: 100%;
  min-height: 26px;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.job-content {
  flex: 1;
}

.section-title {
  color: #00F0FF;
}

.job-email {
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .header {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
    padding: 10px 18px;
  }

  .logo-svg {
    height: 48px;
  }

  .lang-selector.compact {
    max-width: 100%;
    overflow-x: auto;
  }

  .lang-selector.compact .lang-btn {
    padding: 7px 10px;
    font-size: 12px;
  }

  .hero {
    padding-top: 160px;
    padding-bottom: 34px;
  }

  .search-panel {
    width: min(100%, calc(100vw - 28px));
    margin-top: 30px;
  }

  .search-box {
    height: 62px;
    padding: 0 18px;
    gap: 14px;
  }

  .search-box input {
    font-size: 15px;
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
    box-sizing: border-box;
  }

  .filter-menu {
    width: 100%;
    max-height: 220px;
  }

  .clear-filter-btn {
    grid-column: 1 / -1;
  }

  .job-card {
    padding: 22px;
  }
}

@media (max-width: 480px) {
  .filter-row {
    grid-template-columns: 1fr;
  }

  .job-card-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
