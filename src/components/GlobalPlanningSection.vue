<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Ordered keys determine slide direction
const regionKeys = ['china', 'hk', 'malaysia', 'sea'] as const

const regions = computed(() => ({
  china: {
    id: 'china',
    label: t('planning.regions.china.label'),
    tag: t('planning.regions.china.tag'),
    title: t('planning.regions.china.title'),
    description: t('planning.regions.china.description'),
    img: '/img/dalu.png',
  },
  hk: {
    id: 'hk',
    label: t('planning.regions.hk.label'),
    tag: t('planning.regions.hk.tag'),
    title: t('planning.regions.hk.title'),
    description: t('planning.regions.hk.description'),
    img: '/img/dalu.png',
  },
  malaysia: {
    id: 'malaysia',
    label: t('planning.regions.malaysia.label'),
    tag: t('planning.regions.malaysia.tag'),
    title: t('planning.regions.malaysia.title'),
    description: t('planning.regions.malaysia.description'),
    img: '/img/dalu.png',
  },
  sea: {
    id: 'sea',
    label: t('planning.regions.sea.label'),
    tag: t('planning.regions.sea.tag'),
    title: t('planning.regions.sea.title'),
    description: t('planning.regions.sea.description'),
    img: '/img/dalu.png',
  },
}))

type RegionKey = 'china' | 'hk' | 'malaysia' | 'sea'

const activeTab = ref<RegionKey>('china')
const activeRegionData = computed(() => {
  return regions.value[activeTab.value]
})

const activeIndex = ref(0)
const slideDirection = ref<'left' | 'right'>('left')

// Track tab button elements to calculate sliding indicator position
const tabRefs = ref<any[]>([])
const sliderStyle = ref({
  width: '0px',
  transform: 'translateX(0px)',
})

const updateSlider = () => {
  nextTick(() => {
    const activeEl = tabRefs.value[activeIndex.value]
    if (activeEl) {
      const parentEl = activeEl.parentElement
      if (parentEl) {
        const parentRect = parentEl.getBoundingClientRect()
        const activeRect = activeEl.getBoundingClientRect()
        const left = activeRect.left - parentRect.left
        sliderStyle.value = {
          width: `${activeRect.width}px`,
          transform: `translateX(${left}px)`,
        }
      }
    }
  })
}

const switchTab = (newId: RegionKey, index: number) => {
  const currentIndex = activeIndex.value
  slideDirection.value = index >= currentIndex ? 'left' : 'right'
  activeTab.value = newId
  activeIndex.value = index
  updateSlider()
}

onMounted(() => {
  updateSlider()
  window.addEventListener('resize', updateSlider)
})
</script>

<template>
  <section class="global-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="bg-text">{{ t('planning.badge') }}</span>
        <div class="title-wrap">
          <h2>{{ t('planning.title') }}</h2>
          <div class="divider-line"></div>
        </div>
        <p class="section-subtitle font-light">
          {{ t('planning.subtitle') }}
        </p>
      </div>

      <!-- Mid Subtitle (Huge typography in center) -->
      <div class="mid-title-wrap">
        <h3 class="mid-title">{{ t('planning.mid_title') }}</h3>
      </div>

      <!-- Navigation Tabs Capsule -->
      <div class="tabs-wrapper">
        <div class="tabs-capsule">
          <div class="tabs-slider" :style="sliderStyle"></div>
          <button
            v-for="(key, index) in regionKeys"
            :key="key"
            :ref="
              (el: any) => {
                if (el) tabRefs[index] = el
              }
            "
            class="tab-btn"
            :class="{ active: activeTab === key }"
            @click="switchTab(key, index)"
          >
            {{ regions[key].label }}
          </button>
        </div>
      </div>

      <!-- Bottom Detailed Card -->
      <div class="details-card-wrapper">
        <transition :name="`slide-${slideDirection}`">
          <div :key="activeTab" class="region-detail-card glass-card">
            <!-- Left Info -->
            <div class="region-info">
              <span class="region-tag">{{ activeRegionData.label }}</span>
              <h4 class="region-title">{{ activeRegionData.title }}</h4>
              <p class="region-desc">{{ activeRegionData.description }}</p>
            </div>

            <!-- Right Futuristic Visual -->
            <div class="region-visual">
              <div class="visual-border-wrap">
                <img
                  :src="activeRegionData.img"
                  :alt="activeRegionData.title"
                  class="visual-img"
                  :style="{
                    filter:
                      activeTab === 'china'
                        ? 'hue-rotate(0deg)'
                        : activeTab === 'hk'
                          ? 'hue-rotate(180deg)'
                          : activeTab === 'malaysia'
                            ? 'hue-rotate(90deg)'
                            : 'hue-rotate(270deg)',
                  }"
                />
                <!-- Glowing borders & particles -->
                <div class="glow-layer"></div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.global-section {
  background: transparent;
}

.font-light {
  font-weight: 300;
  color: var(--text-secondary);
}

/* Mid title typography */
.mid-title-wrap {
  text-align: center;
  margin: 50px 0 40px;
}

.mid-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 2px;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

/* Navigation Tabs Capsule styling */
.tabs-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
}

.tabs-capsule {
  display: inline-flex;
  background: #160940;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  padding: 4px;
  backdrop-filter: blur(10px);
  position: relative;
  /* Anchor for tabs-slider */
}

/* Sliding active pill background */
.tabs-slider {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  background: #382189;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  border-radius: 9999px;
  transition:
    transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
    width 0.35s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
}

.tab-btn {
  padding: 10px 24px;
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--text-secondary);
  border-radius: 9999px;
  transition: color 0.3s ease;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
  position: relative;
}

.tab-btn:hover {
  color: #ffffff;
}

.tab-btn.active {
  color: #ffffff;
  font-weight: 500;
}

/* Details Card wrapper for overflow and simultaneous absolute transition positioning */
.details-card-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 16px;
}

/* Details Card styling */
.region-detail-card {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  padding: 48px;
  min-height: 380px;
  align-items: center;
  background: linear-gradient(135deg, #020626 0%, #370d69 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.region-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.region-tag {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.region-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.4;
  letter-spacing: 0.5px;
}

.region-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.8;
  font-weight: 300;
}

/* Right Column Visual styling */
.region-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-border-wrap {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.visual-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.6s ease;
}

.glow-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  pointer-events: none;
}

/* Directional Slide Transitions (Simultaneous Side-by-Side sliding) */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-left-leave-active,
.slide-right-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.slide-left-enter-active,
.slide-right-enter-active {
  z-index: 2;
}

/* Forward (left): new content slides in from right (100px), old exits to left (-100px) */
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* Backward (right): new content slides in from left (-100px), old exits to right (100px) */
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .region-detail-card {
    grid-template-columns: 1fr;
    padding: 32px;
    gap: 32px;
  }

  .region-visual {
    order: -1;
    /* Place image on top on tablet/mobile */
  }

  .visual-border-wrap {
    height: 200px;
  }
}

@media (max-width: 768px) {
  .mid-title {
    font-size: 1.5rem;
  }

  .tabs-wrapper {
    overflow-x: auto;
    padding-bottom: 12px;
    scrollbar-width: none;
    justify-content: flex-start;
  }

  .tabs-wrapper::-webkit-scrollbar {
    display: none;
  }

  .tabs-capsule {
    display: inline-flex !important;
    flex-wrap: nowrap !important;
    min-width: max-content;
    padding: 4px;
  }

  .tab-btn {
    padding: 12px 20px;
  }
}

@media (max-width: 480px) {
  .region-title {
    font-size: 1.25rem;
  }
}
</style>
