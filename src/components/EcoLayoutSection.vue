<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const tabs = computed(() => ({
  pos: {
    id: 'pos',
    tabLabel: t('eco.tabs.pos.tabLabel'),
    title: t('eco.tabs.pos.title'),
    subtitle: t('eco.tabs.pos.subtitle'),
    description: t('eco.tabs.pos.description'),
    nodeIndex: 0,
    color: '#00f0ff',
  },
  iaa_iap: {
    id: 'iaa_iap',
    tabLabel: t('eco.tabs.iaa_iap.tabLabel'),
    title: t('eco.tabs.iaa_iap.title'),
    subtitle: t('eco.tabs.iaa_iap.subtitle'),
    description: t('eco.tabs.iaa_iap.description'),
    nodeIndex: 1,
    color: '#ec4899',
  },
  three_engines: {
    id: 'three_engines',
    tabLabel: t('eco.tabs.three_engines.tabLabel'),
    title: t('eco.tabs.three_engines.title'),
    subtitle: t('eco.tabs.three_engines.subtitle'),
    description: t('eco.tabs.three_engines.description'),
    nodeIndex: 2,
    color: '#8b5cf6',
  },
  eco_loop: {
    id: 'eco_loop',
    tabLabel: t('eco.tabs.eco_loop.tabLabel'),
    title: t('eco.tabs.eco_loop.title'),
    subtitle: t('eco.tabs.eco_loop.subtitle'),
    description: t('eco.tabs.eco_loop.description'),
    nodeIndex: 3,
    color: '#10b981',
  },
  wave_plan: {
    id: 'wave_plan',
    tabLabel: t('eco.tabs.wave_plan.tabLabel'),
    title: t('eco.tabs.wave_plan.title'),
    subtitle: t('eco.tabs.wave_plan.subtitle'),
    description: t('eco.tabs.wave_plan.description'),
    nodeIndex: 4,
    color: '#f59e0b',
  },
  beach_plan: {
    id: 'beach_plan',
    tabLabel: t('eco.tabs.beach_plan.tabLabel'),
    title: t('eco.tabs.beach_plan.title'),
    subtitle: t('eco.tabs.beach_plan.subtitle'),
    description: t('eco.tabs.beach_plan.description'),
    nodeIndex: 5,
    color: '#3b82f6',
  },
}))

type TabKey = 'pos' | 'iaa_iap' | 'three_engines' | 'eco_loop' | 'wave_plan' | 'beach_plan'

const activeTab = ref<TabKey>('pos')
const orbitActiveColor = '#07A8FF'

// Computed properties for template type safety
const activeTabData = computed(() => tabs.value[activeTab.value] || tabs.value.pos)

// Order of tabs for layout display (2 rows, 3 columns)
const tabLayout = [
  ['pos', 'iaa_iap', 'three_engines'],
  ['eco_loop', 'wave_plan', 'beach_plan'],
] as const

// Node positions and connector angles for the 6 nodes on the outer orbit ring.
// The connector is a horizontal line that starts at center and rotates toward
// the selected node, matching the browser coordinate system.
const nodePositions = [
  { top: '7.9%', left: '50%', transform: 'translate(-50%, -50%)', angle: -90 }, // top
  { top: '29%', left: '86.5%', transform: 'translate(-50%, -50%)', angle: -30 }, // top-right
  { top: '71%', left: '86.5%', transform: 'translate(-50%, -50%)', angle: 30 }, // bottom-right
  { top: '92.1%', left: '50%', transform: 'translate(-50%, -50%)', angle: 90 }, // bottom
  { top: '71%', left: '13.5%', transform: 'translate(-50%, -50%)', angle: 150 }, // bottom-left
  { top: '29%', left: '13.5%', transform: 'translate(-50%, -50%)', angle: -150 }, // top-left
] as const
</script>

<template>
  <section id="eco-layout" class="eco-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="bg-text">{{ t('eco.badge') }}</span>
        <div class="title-wrap">
          <h2>{{ t('eco.title') }}</h2>
          <div class="divider-line"></div>
        </div>
        <p class="section-subtitle">
          {{ t('eco.subtitle') }}
        </p>
      </div>

      <!-- Mid Typography Title -->
      <div class="mid-title-wrap">
        <h3 class="mid-title-secondary">{{ t('eco.mid_title_secondary') }}</h3>
      </div>

      <!-- Eco Layout Content -->
      <div class="eco-layout">
        <!-- Left: Concentric Orbits Diagram -->
        <div class="eco-diagram-column">
          <div class="eco-orbit-system">
            <!-- Concentric rings -->
            <div class="orbit-ring outer-ring"></div>
            <div class="orbit-ring middle-ring"></div>
            <div class="orbit-ring inner-ring"></div>

            <!-- Connection Line from Center to Active Node -->
            <div
              class="active-connector"
              :style="{
                transform: `rotate(${nodePositions[activeTabData ? activeTabData.nodeIndex : 0]!.angle}deg)`,
                color: orbitActiveColor,
                boxShadow: `0 0 10px ${orbitActiveColor}`,
              }"
            ></div>

            <!-- Central Node: GGC / Web3 Platform Base -->
            <div class="central-base">
              <div class="base-glow"></div>
              <div class="base-content">
                <img
                  src="/img/地球,地理,全球 (3).png"
                  :alt="t('eco.center_title')"
                  class="globe-icon"
                />
                <span class="base-title">{{ t('eco.center_title') }}</span>
                <span class="base-desc" v-html="t('eco.center_desc')"></span>
              </div>
            </div>

            <!-- 6 Nodes on Outer Ring -->
            <!-- 0: Chain Link node -->
            <div
              class="outer-node node-0"
              :class="{ active: activeTabData.nodeIndex === 0 }"
              :style="{
                top: nodePositions[0].top,
                left: nodePositions[0].left,
                transform: nodePositions[0].transform,
              }"
              @click="activeTab = 'pos'"
            >
              <div class="node-circle">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
            </div>

            <!-- 1: Lightning node -->
            <div
              class="outer-node node-1"
              :class="{ active: activeTabData.nodeIndex === 1 }"
              :style="{
                top: nodePositions[1].top,
                left: nodePositions[1].left,
                transform: nodePositions[1].transform,
              }"
              @click="activeTab = 'iaa_iap'"
            >
              <div class="node-circle">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
            </div>

            <!-- 2: Game node -->
            <div
              class="outer-node node-2"
              :class="{ active: activeTabData.nodeIndex === 2 }"
              :style="{
                top: nodePositions[2].top,
                left: nodePositions[2].left,
                transform: nodePositions[2].transform,
              }"
              @click="activeTab = 'three_engines'"
            >
              <div class="node-circle">
                <img
                  src="/img/游戏.svg"
                  :alt="t('eco.tabs.three_engines.tabLabel')"
                  class="node-icon-img"
                />
              </div>
            </div>

            <!-- 3: Sync node -->
            <div
              class="outer-node node-3"
              :class="{ active: activeTabData.nodeIndex === 3 }"
              :style="{
                top: nodePositions[3].top,
                left: nodePositions[3].left,
                transform: nodePositions[3].transform,
              }"
              @click="activeTab = 'eco_loop'"
            >
              <div class="node-circle">
                <img
                  src="/img/闭环.svg"
                  :alt="t('eco.tabs.eco_loop.tabLabel')"
                  class="node-icon-img"
                />
              </div>
            </div>

            <!-- 4: Chat node -->
            <div
              class="outer-node node-4"
              :class="{ active: activeTabData.nodeIndex === 4 }"
              :style="{
                top: nodePositions[4].top,
                left: nodePositions[4].left,
                transform: nodePositions[4].transform,
              }"
              @click="activeTab = 'wave_plan'"
            >
              <div class="node-circle">
                <img
                  src="/img/浪高.svg"
                  :alt="t('eco.tabs.wave_plan.tabLabel')"
                  class="node-icon-img"
                />
              </div>
            </div>

            <!-- 5: Settings node -->
            <div
              class="outer-node node-5"
              :class="{ active: activeTabData.nodeIndex === 5 }"
              :style="{
                top: nodePositions[5].top,
                left: nodePositions[5].left,
                transform: nodePositions[5].transform,
              }"
              @click="activeTab = 'beach_plan'"
            >
              <div class="node-circle">
                <img
                  src="/img/需用计划.svg"
                  :alt="t('eco.tabs.beach_plan.tabLabel')"
                  class="node-icon-img"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Tab selection and detail card -->
        <div class="eco-details-column">
          <!-- 6 Grid Tabs -->
          <div class="eco-tabs-grid">
            <button
              v-for="tabKey in tabLayout.flat()"
              :key="tabKey"
              class="eco-tab-card"
              :class="{ active: activeTab === tabKey }"
              @click="activeTab = tabKey"
            >
              <span>{{ tabs[tabKey].tabLabel }}</span>
            </button>
          </div>

          <!-- Underneath Detail Box -->
          <transition name="fade-eco" mode="out-in">
            <div :key="activeTab" class="eco-detail-box">
              <h4 class="eco-detail-title">{{ activeTabData.title }}</h4>
              <p class="eco-detail-subtitle">
                {{ activeTabData.subtitle }}
              </p>
              <p class="eco-detail-desc">
                {{ activeTabData.description }}
              </p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eco-section {
  background: transparent;
  overflow: hidden;
  scroll-margin-top: 24px;
}

.mid-title-wrap {
  text-align: center;
  margin-top: 48px;
  margin-bottom: 56px;
}

.mid-title-primary {
  font-size: 2.25rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 2px;
}

.mid-title-secondary {
  font-size: 2.25rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 2px;
  margin-top: 8px;
}

.eco-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.2fr;
  gap: 60px;
  align-items: center;
}

/* Orbit Diagram Column */
.eco-diagram-column {
  display: flex;
  justify-content: center;
  align-items: center;
}

.eco-orbit-system {
  position: relative;
  width: 380px;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Concentric rings */
.orbit-ring {
  position: absolute;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  pointer-events: none;
}

.outer-ring {
  width: 320px;
  height: 320px;
}

.middle-ring {
  width: 240px;
  height: 240px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.03);
}

.inner-ring {
  width: 160px;
  height: 160px;
}

/* Connecting Dotted Line to active node */
.active-connector {
  position: absolute;
  width: 160px;
  height: 1px;
  background-image: linear-gradient(to right, currentColor 50%, transparent 50%);
  background-size: 8px 1px;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  z-index: 5;
  pointer-events: none;
  transition:
    transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
    color 0.4s ease;
}

/* Central Base node */
.central-base {
  position: relative;
  z-index: 10;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, #0e0a30 0%, #060417 100%);
  border: 2.5px solid #005577;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 35px rgba(0, 85, 119, 0.6);
  text-align: center;
}

.base-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.08);
  filter: blur(12px);
  animation: pulseGlow 4s ease-in-out infinite;
}

.base-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.globe-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  color: var(--accent-cyan);
  filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6));
  margin-bottom: 2px;
}

.base-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--accent-cyan);
  letter-spacing: 0.5px;
}

.base-desc {
  font-size: 0.68rem;
  color: #ffffff;
  line-height: 1.3;
  font-weight: 400;
}

/* Clickable Nodes on Outer Ring */
.outer-node {
  position: absolute;
  z-index: 20;
  cursor: pointer;
  transition: all 0.4s ease;
}

.node-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #0d0b24;
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.node-icon-img {
  max-width: 24px;
  max-height: 24px;
  display: block;
  object-fit: contain;
  transition: filter 0.3s ease;
}

.outer-node.active .node-circle {
  background: #07a8ff;
  border-color: #07a8ff;
  color: #0b091a;
  box-shadow: 0 0 20px rgba(7, 168, 255, 0.6);
  transform: scale(1.1);
}

.outer-node.active .node-icon-img {
  filter: brightness(0) saturate(100%) invert(4%) sepia(34%) saturate(2535%) hue-rotate(223deg)
    brightness(91%) contrast(99%);
}

.outer-node:hover .node-circle {
  border-color: #ffffff;
  transform: scale(1.05);
}

/* Right Details Column */
.eco-details-column {
  width: 100%;
  overflow: hidden;
}

.eco-tabs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px 28px;
  margin-bottom: 56px;
}

.eco-tab-card {
  position: relative;
  min-height: 52px;
  padding: 0 18px;
  border: 0;
  border-radius: 0;
  background: rgba(3, 4, 31, 0.78);
  color: rgba(0, 240, 255, 0.48);
  font-size: 0.95rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: 0;
  transition: all 0.3s ease;
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0% 100%);
  box-shadow:
    inset 0 0 0 2px #514aa0,
    0 10px 18px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  cursor: pointer;
}

.eco-tab-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(0, 240, 255, 0.16) 1px, transparent 1px);
  background-size: 7px 7px;
  opacity: 0;
  pointer-events: none;
}

.eco-tab-card span {
  position: relative;
  z-index: 1;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.eco-tab-card:hover {
  color: rgba(0, 240, 255, 0.85);
  box-shadow:
    inset 0 0 0 2px #514aa0,
    0 12px 22px rgba(0, 0, 0, 0.22);
}

.eco-tab-card.active {
  background: url('/img/底框.png') center / 100% 100% no-repeat;
  color: #092559;
  box-shadow: 0 0 22px rgba(0, 200, 255, 0.26);
}

.eco-tab-card.active::before {
  opacity: 0;
}

.eco-detail-box {
  padding: 62px 70px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(7, 8, 42, 0.96);
  border-radius: 34px;
  background: rgba(3, 4, 31, 0.92);
  box-shadow:
    inset 0 0 0 1px rgba(12, 13, 54, 0.68),
    0 24px 60px rgba(0, 0, 0, 0.22);
}

.eco-detail-title {
  font-size: 2.35rem;
  font-weight: 900;
  color: #00c8ff;
  margin-bottom: 22px;
  line-height: 1.15;
  letter-spacing: 0;
}

.eco-detail-subtitle {
  font-size: 1.28rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 28px;
  line-height: 1.45;
}

.eco-detail-desc {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.95;
  font-weight: 700;
}

/* Animations & Transitions */
.fade-eco-enter-active {
  transition: all 0.3s ease-out;
}

.fade-eco-leave-active {
  transition: all 0.2s ease-in;
}

.fade-eco-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-eco-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .eco-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .eco-diagram-column {
    --container-padding: 48px;
    --scale: min(1, calc((100vw - var(--container-padding)) / 380));
    width: 100%;
    height: calc(380px * var(--scale));
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
  }
  .eco-orbit-system {
    transform: scale(var(--scale));
    transform-origin: center center;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .mid-title-primary,
  .mid-title-secondary {
    font-size: 1.75rem;
  }
}

@media (max-width: 600px) {
  .eco-tabs-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 32px;
  }

  .eco-tab-card {
    min-height: 48px;
  }

  .eco-detail-box {
    padding: 40px 28px;
  }

  .eco-detail-title {
    font-size: 1.8rem;
  }

  .eco-detail-subtitle {
    font-size: 1.05rem;
  }

  .eco-detail-desc {
    font-size: 0.92rem;
  }
}

@media (max-width: 520px) {
  .eco-detail-box {
    padding: 24px 16px;
  }
}

@media (max-width: 480px) {
  .eco-diagram-column {
    --container-padding: 32px;
  }
}
</style>
