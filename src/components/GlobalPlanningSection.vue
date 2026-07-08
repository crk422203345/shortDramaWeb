<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

// Ordered keys determine slide direction
const regionKeys = ['china', 'hk', 'malaysia', 'sea'] as const

const regions = {
  china: {
    id: 'china',
    label: '中国大陆',
    tag: '核心技术研发与生态基石',
    title: '全球覆盖：强大的研发实力 & 出海产品源泉',
    description: '大中华区是Bingo文娱最坚实的技术后方。自研的核心小游戏引擎、高动态AI多语种音色克隆模型和实时同声传译算法均在此沉淀研发，为全球数十个出海国家提供源源不断的创新科技助力。',
    alertBox: '依托成熟的数字文创供应链与极佳的工程师红利，全天候保障全球服务器的高性能、低损耗流转。',
    img: '/img/dalu.png'
  },
  hk: {
    id: 'hk',
    label: '中国香港',
    tag: '亚洲总部 & WEB3合规港湾',
    title: '全球覆盖：持牌基金支持 & 国际资本汇聚地',
    description: '作为最理想的Web3合规港湾，香港为Bingo文娱提供了完备的虚拟资产牌照框架、持牌托管基金、及全球化跨国出海通道。',
    alertBox: '在这里，我们与多方内容及法律合规合伙人深度结合，筑牢资金流通与资产确权基石，全力推进通证生态安全建设。',
    img: '/img/dalu.png'
  },
  malaysia: {
    id: 'malaysia',
    label: '马来西亚',
    tag: '东南亚二创基地 & 游民枢纽',
    title: '全球覆盖：10万名数字内容创客孵化地',
    description: '依托“沙滩计划”与“浪潮计划”，马来西亚是Bingo文娱内容二创的最强前沿。汇聚数万名高素质跨语种短视频剪辑达人和数字游民，通过多模态AI工具实现裂变式本地宣发。',
    alertBox: '深度整合本地创意资源与流媒体推广联盟，打造高效合规的一人公司(OPC)分发变现闭环。',
    img: '/img/dalu.png'
  },
  sea: {
    id: 'sea',
    label: '东南亚',
    tag: '流量爆发 & 用户裂变高地',
    title: '全球覆盖：6.8亿 增量数字娱乐用户',
    description: '东南亚具有极高频的数字娱乐及超休闲游戏交互习惯。Bingo文娱通过“看剧/玩游戏享生态红利”的超低门槛、即点即玩模式快速席卷多国应用商店下载排行。',
    alertBox: '结合东南亚本地电子钱包（Touch \'n Go、GrabPay等），实现零延迟、超轻量的小额收益即时分发，裂变系数高达2.5倍。',
    img: '/img/dalu.png'
  }
}

const activeTab = ref<keyof typeof regions>('china')
const activeIndex = ref(0)
const slideDirection = ref<'left' | 'right'>('left')

// Track tab button elements to calculate sliding indicator position
const tabRefs = ref<any[]>([])
const sliderStyle = ref({
  width: '0px',
  transform: 'translateX(0px)'
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
          transform: `translateX(${left}px)`
        }
      }
    }
  })
}

const switchTab = (newId: keyof typeof regions, index: number) => {
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
        <span class="bg-text">Planning</span>
        <div class="title-wrap">
          <h2>全球化规划</h2>
          <div class="divider-line"></div>
        </div>
        <p class="section-subtitle font-light">
          中国大陆、中国香港、马来西亚——三个结构性机会窗口正在开启。内容本地化、补贴全球化、广告生态标准化。
        </p>
      </div>

      <!-- Mid Subtitle (Huge typography in center) -->
      <div class="mid-title-wrap">
        <h3 class="mid-title">从中国模式样板 到十亿人口蓝海</h3>
      </div>

      <!-- Navigation Tabs Capsule -->
      <div class="tabs-wrapper">
        <div class="tabs-capsule">
          <div class="tabs-slider" :style="sliderStyle"></div>
          <button v-for="(key, index) in regionKeys" :key="key" :ref="(el: any) => { if (el) tabRefs[index] = el }"
            class="tab-btn" :class="{ active: activeTab === key }" @click="switchTab(key, index)">
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
              <span class="region-tag">{{ regions[activeTab].label }}</span>
              <h4 class="region-title">{{ regions[activeTab].title }}</h4>
              <p class="region-desc">{{ regions[activeTab].description }}</p>
            </div>

            <!-- Right Futuristic Visual -->
            <div class="region-visual">
              <div class="visual-border-wrap">
                <img :src="regions[activeTab].img" alt="Futuristic Tech Cube" class="visual-img" :style="{
                  filter: activeTab === 'china' ? 'hue-rotate(0deg)' :
                    activeTab === 'hk' ? 'hue-rotate(180deg)' :
                      activeTab === 'malaysia' ? 'hue-rotate(90deg)' : 'hue-rotate(270deg)'
                }" />
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
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), width 0.35s cubic-bezier(0.25, 1, 0.5, 1);
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
  background: linear-gradient(135deg, #020626 0%, #370D69 100%) !important;
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
  background: linear-gradient(135deg,
      rgba(0, 240, 255, 0.1) 0%,
      rgba(139, 92, 246, 0.1) 100%);
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

  .tabs-capsule {
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 20px;
    padding: 8px;
  }

  .tab-btn {
    padding: 8px 16px;
  }
}

@media (max-width: 480px) {
  .region-title {
    font-size: 1.25rem;
  }
}
</style>
