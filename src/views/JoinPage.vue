<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { recruitmentApi, type Job } from '@/api/recruitment'

const { t, locale } = useI18n()

const jobs = ref<Job[]>([])
const isLoading = ref(false)
const hasError = ref(false)
const expandedJobIds = ref<number[]>([])

const getLanguageType = (localeVal: string): 'zh' | 'cht' | 'en' | 'ms' => {
  if (localeVal === 'zh-CN') return 'zh'
  if (localeVal === 'zh-TW') return 'cht'
  if (localeVal === 'en') return 'en'
  if (localeVal === 'ms') return 'ms'
  return 'zh'
}

const fetchJobs = async () => {
  isLoading.value = true
  hasError.value = false
  expandedJobIds.value = [] // Reset expanded states on reload
  try {
    const langType = getLanguageType(locale.value)
    const list = await recruitmentApi.getRecruitmentList({ languageType: langType })
    jobs.value = list
  } catch (err) {
    console.error('[Fetch Jobs Error]:', err)
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

watch(locale, () => {
  void fetchJobs()
})

onMounted(() => {
  void fetchJobs()
})

const email = 'jackli@webx.vip'

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
          <h3>{{ locale === 'en' ? 'Failed to load jobs' : '获取岗位数据失败' }}</h3>
          <p>
            {{
              locale === 'en'
                ? 'Please check your connection and try again.'
                : '请检查网络连接后重试。'
            }}
          </p>
          <button class="btn btn-primary btn-purple" @click="fetchJobs">
            {{ locale === 'en' ? 'Retry' : '重新加载' }}
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
          <h3>{{ locale === 'en' ? 'No Positions Open' : '暂无热招岗位' }}</h3>
          <p>
            {{
              locale === 'en'
                ? 'Check back later or send us your open application resume.'
                : '请稍后再试，或者直接将您的简历发送至我们的邮箱。'
            }}
          </p>
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
                <div class="detail-section apply-email-section">
                  <h4 class="detail-title">{{ t('join.apply_method') }}</h4>
                  <div class="apply-email-box">
                    <span class="apply-label">{{ t('join.email_label') }}</span>
                    <a
                      :href="`mailto:${email}?subject=${encodeURIComponent((locale === 'en' ? 'Apply for ' : '应聘-') + job.title)}`"
                      class="mail-link-badge"
                    >
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
                      {{ email }}
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

        <p class="jobs-foot">
          {{ t('join.email_label') }}
          <a :href="`mailto:${email}?subject=应聘BINGO相关岗位`" class="mail-link">{{ email }}</a>
        </p>
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
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 30%, rgba(79, 70, 229, 0.18) 0%, transparent 60%), transparent;
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

/* Job list */
.jobs-section {
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
