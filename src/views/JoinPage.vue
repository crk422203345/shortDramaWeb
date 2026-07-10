<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

interface Job {
  id: number
  title: string
  location: string
  experience: string
  education: string
  salary: string
  responsibilities: string[]
  requirements: string[]
}

const getArray = (path: string): string[] => {
  const val = tm(path)
  return Array.isArray(val) ? (val as string[]) : []
}

const jobs = computed<Job[]>(() => [
  {
    id: 1,
    title: t('join.jobs.pm.title'),
    location: t('join.jobs.pm.location'),
    experience: t('join.jobs.pm.experience'),
    education: t('join.jobs.pm.education'),
    salary: t('join.jobs.pm.salary'),
    responsibilities: getArray('join.jobs.pm.responsibilities'),
    requirements: getArray('join.jobs.pm.requirements'),
  },
  {
    id: 2,
    title: t('join.jobs.operations.title'),
    location: t('join.jobs.operations.location'),
    experience: t('join.jobs.operations.experience'),
    education: t('join.jobs.operations.education'),
    salary: t('join.jobs.operations.salary'),
    responsibilities: getArray('join.jobs.operations.responsibilities'),
    requirements: getArray('join.jobs.operations.requirements'),
  },
  {
    id: 3,
    title: t('join.jobs.blockchain.title'),
    location: t('join.jobs.blockchain.location'),
    experience: t('join.jobs.blockchain.experience'),
    education: t('join.jobs.blockchain.education'),
    salary: t('join.jobs.blockchain.salary'),
    responsibilities: getArray('join.jobs.blockchain.responsibilities'),
    requirements: getArray('join.jobs.blockchain.requirements'),
  },
  {
    id: 4,
    title: t('join.jobs.ai.title'),
    location: t('join.jobs.ai.location'),
    experience: t('join.jobs.ai.experience'),
    education: t('join.jobs.ai.education'),
    salary: t('join.jobs.ai.salary'),
    responsibilities: getArray('join.jobs.ai.responsibilities'),
    requirements: getArray('join.jobs.ai.requirements'),
  },
  {
    id: 5,
    title: t('join.jobs.market.title'),
    location: t('join.jobs.market.location'),
    experience: t('join.jobs.market.experience'),
    education: t('join.jobs.market.education'),
    salary: t('join.jobs.market.salary'),
    responsibilities: getArray('join.jobs.market.responsibilities'),
    requirements: getArray('join.jobs.market.requirements'),
  },
  {
    id: 6,
    title: t('join.jobs.designer.title'),
    location: t('join.jobs.designer.location'),
    experience: t('join.jobs.designer.experience'),
    education: t('join.jobs.designer.education'),
    salary: t('join.jobs.designer.salary'),
    responsibilities: getArray('join.jobs.designer.responsibilities'),
    requirements: getArray('join.jobs.designer.requirements'),
  },
])

const email = 'hr@bingo.vip'

// Expanded state management
const expandedJobIds = ref<number[]>([])

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
        <div class="jobs-grid">
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
  padding-top: 80px; /* offset for fixed header */
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
  align-self: start; /* Avoid stretching dynamically */
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

/* Transitions (Chevron rotation transition remains in style) */

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
</style>
