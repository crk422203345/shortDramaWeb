<script setup lang="ts">
import { ref, computed } from 'vue'

const tabs = {
  pos: {
    id: 'pos',
    tabLabel: 'POS价值成长 + GGC链',
    title: 'POS价值成长 + GGC链',
    subtitle: '流量越大，用户越多，生态价值和用户权益越高',
    description: '通过独创的“注意力证明 (POS)”激励机制与自研GGC链，用户看短剧、玩游戏的时间和互动数据会立即转化为生态积分权益。将平台利润通过智能合约直接倾斜给生态建设者。',
    nodeIndex: 0,
    color: '#00f0ff'
  },
  iaa_iap: {
    id: 'iaa_iap',
    tabLabel: 'IAA+IAP裂变矩阵',
    title: 'IAA+IAP裂变矩阵',
    subtitle: '广告(IAA)与内购(IAP)双轨并行，兼顾极高用户变现与长线留存',
    description: '结合Web2成熟的广告商业化模式与Web3通证内购体系。通过IAA为免费用户提供积分产出渠道，通过IAP深度释放高净值用户消费潜力，同时设计社交裂变奖励，实现全层级用户变现与指数级裂变增长。',
    nodeIndex: 1,
    color: '#ec4899'
  },
  three_engines: {
    id: 'three_engines',
    tabLabel: '短剧+游戏+社交三轮驱动',
    title: '短剧+游戏+社交三轮驱动',
    subtitle: '三大支柱相互咬合，打造无缝流转的泛娱乐价值圈',
    description: '精品短剧带来高频海量初始流量，超休闲小游戏提供丰富的内容消耗场景与积分交互玩法，SBT社交关系链沉淀用户信任。三轮驱动，让用户在游玩与社交的过程中实现注意力的资产化与价值沉淀。',
    nodeIndex: 2,
    color: '#8b5cf6'
  },
  eco_loop: {
    id: 'eco_loop',
    tabLabel: '生态价值闭环',
    title: '生态价值闭环',
    subtitle: '链上通证与积分生态深度绑定，抑制通胀，确保持续繁荣',
    description: '设计严密的积分消耗与回收机制，涵盖短剧解锁、游戏道具购买、社交身份升级等多元场景。通过生态手续费回购、通证销毁等模型，确保生态循环的正向运转，让增长红利真正回馈全体共建者。',
    nodeIndex: 3,
    color: '#10b981'
  },
  wave_plan: {
    id: 'wave_plan',
    tabLabel: '浪潮计划 (Wave Plan)',
    title: '浪潮计划 (Wave Plan)',
    subtitle: '扶持优质创作者与游戏研发，源源不断孵化出海精品',
    description: '设立专项生态扶持基金，面向全球短剧制作团队与小游戏独立开发者。提供资金资助、AI多语种音色翻译克隆技术支持以及Web3宣发资源，孵化全球本地化爆款，掀起Web3出海新浪潮。',
    nodeIndex: 4,
    color: '#f59e0b'
  },
  beach_plan: {
    id: 'beach_plan',
    tabLabel: '沙滩计划 (Beach Plan)',
    title: '沙滩计划 (Beach Plan)',
    subtitle: '全球公会联盟与地推社区落地，汇聚亿万量级Web3新用户',
    description: '针对东南亚等新兴市场，深度联手各大地推团队与游戏公会，建设高黏性线上线下社区。通过零门槛的Web3钱包接入、详尽的新手引导和极具吸引力的初期共建福利，引流亿万量级用户平滑迁入生态。',
    nodeIndex: 5,
    color: '#3b82f6'
  }
} as const

const activeTab = ref<keyof typeof tabs>('pos')

// Computed properties for template type safety
const activeTabData = computed(() => tabs[activeTab.value])

// Order of tabs for layout display (2 rows, 3 columns)
const tabLayout = [
  ['pos', 'iaa_iap', 'three_engines'],
  ['eco_loop', 'wave_plan', 'beach_plan']
] as const

// Angle coordinates for the 6 nodes on the outer orbit ring
// System: 380x380px, outer-ring: 320px (radius 160px), center at 190px
// Node position = (center ± 160 * sin/cos) / 380 * 100
// 0: 12-o'clock  1: 2-o'clock  2: 4-o'clock
// 3: 6-o'clock   4: 8-o'clock  5: 10-o'clock
const nodePositions = [
  { top: '7.9%',  left: '50%',   transform: 'translate(-50%, -50%)', angle: 270 }, // top
  { top: '29%',   left: '86.5%', transform: 'translate(-50%, -50%)', angle: 330 }, // top-right
  { top: '71%',   left: '86.5%', transform: 'translate(-50%, -50%)', angle: 30  }, // bottom-right
  { top: '92.1%', left: '50%',   transform: 'translate(-50%, -50%)', angle: 90  }, // bottom
  { top: '71%',   left: '13.5%', transform: 'translate(-50%, -50%)', angle: 150 }, // bottom-left
  { top: '29%',   left: '13.5%', transform: 'translate(-50%, -50%)', angle: 210 }, // top-left
] as const
</script>

<template>
  <section class="eco-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="bg-text">Product</span>
        <div class="title-wrap">
          <h2>生态布局</h2>
          <div class="divider-line"></div>
        </div>
        <p class="section-subtitle">
          打破Web2平台的流量垄断与利益固化，Bingo文娱携手用户、创作者与合规资本，在GG-C&WebX全球平台的底层架构上，构筑互利共赢、指数增长的文娱生态。
        </p>
      </div>

      <!-- Mid Typography Title -->
      <div class="mid-title-wrap">
        <h3 class="mid-title-primary">三位一体生态布局</h3>
        <h3 class="mid-title-secondary">打造Web3娱乐黄金闭环</h3>
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
                transform: `rotate(${nodePositions[activeTabData.nodeIndex].angle}deg)`,
                borderColor: activeTabData.color,
                boxShadow: `0 0 10px ${activeTabData.color}`
              }"
            ></div>

            <!-- Central Node: GGC / Web3 Platform Base -->
            <div class="central-base">
              <div class="base-glow"></div>
              <div class="base-content">
                <!-- Globe SVG -->
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="globe-icon">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  <path d="M2 12h20"></path>
                </svg>
                <span class="base-title">GGC / Web3</span>
                <span class="base-desc">全球<br/>平台底层</span>
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
                transform: nodePositions[0].transform 
              }"
              @click="activeTab = 'pos'"
            >
              <div class="node-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                transform: nodePositions[1].transform 
              }"
              @click="activeTab = 'iaa_iap'"
            >
              <div class="node-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                transform: nodePositions[2].transform 
              }"
              @click="activeTab = 'three_engines'"
            >
              <div class="node-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                  <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"></path>
                </svg>
              </div>
            </div>

            <!-- 3: Sync node -->
            <div 
              class="outer-node node-3" 
              :class="{ active: activeTabData.nodeIndex === 3 }"
              :style="{ 
                top: nodePositions[3].top, 
                left: nodePositions[3].left, 
                transform: nodePositions[3].transform 
              }"
              @click="activeTab = 'eco_loop'"
            >
              <div class="node-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
              </div>
            </div>

            <!-- 4: Chat node -->
            <div 
              class="outer-node node-4" 
              :class="{ active: activeTabData.nodeIndex === 4 }"
              :style="{ 
                top: nodePositions[4].top, 
                left: nodePositions[4].left, 
                transform: nodePositions[4].transform 
              }"
              @click="activeTab = 'wave_plan'"
            >
              <div class="node-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            </div>

            <!-- 5: Settings node -->
            <div 
              class="outer-node node-5" 
              :class="{ active: activeTabData.nodeIndex === 5 }"
              :style="{ 
                top: nodePositions[5].top, 
                left: nodePositions[5].left, 
                transform: nodePositions[5].transform 
              }"
              @click="activeTab = 'beach_plan'"
            >
              <div class="node-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
            </div>

          </div>
        </div>

        <!-- Right: Tab selection and detail card -->
        <div class="eco-details-column">
          <!-- 6 Grid Tabs -->
          <div class="eco-tabs-grid">
            <div 
              v-for="(row, rowIndex) in tabLayout" 
              :key="rowIndex" 
              class="eco-tabs-row"
            >
              <button 
                v-for="tabKey in row" 
                :key="tabKey"
                class="eco-tab-card"
                :class="{ active: activeTab === tabKey }"
                :style="{
                  borderColor: activeTab === tabKey ? tabs[tabKey].color : 'rgba(255,255,255,0.08)',
                  color: activeTab === tabKey ? tabs[tabKey].color : '#ffffff'
                }"
                @click="activeTab = tabKey"
              >
                {{ tabs[tabKey].tabLabel }}
              </button>
            </div>
          </div>

          <!-- Underneath Detail Box -->
          <transition name="fade-eco" mode="out-in">
            <div :key="activeTab" class="eco-detail-box glass-card">
              <h4 
                class="eco-detail-title"
                :style="{ color: activeTabData.color }"
              >
                {{ activeTabData.title }}
              </h4>
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
  grid-template-columns: 1.15fr 1fr;
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
  width: 1px;
  height: 160px;
  background-image: linear-gradient(to top, currentColor 50%, transparent 50%);
  background-size: 1px 8px;
  top: 50%;
  left: 50%;
  transform-origin: top center;
  z-index: 5;
  pointer-events: none;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.4s ease;
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

.outer-node.active .node-circle {
  background: var(--accent-cyan);
  border-color: var(--accent-cyan);
  color: #0b091a;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.6);
  transform: scale(1.1);
}

.outer-node.node-1.active .node-circle {
  background: var(--accent-pink);
  border-color: var(--accent-pink);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.6);
}

.outer-node.node-2.active .node-circle {
  background: var(--accent-purple);
  border-color: var(--accent-purple);
  color: #ffffff;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
}

.outer-node.node-3.active .node-circle {
  background: #10b981;
  border-color: #10b981;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
}

.outer-node.node-4.active .node-circle {
  background: #f59e0b;
  border-color: #f59e0b;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
}

.outer-node.node-5.active .node-circle {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
}

.outer-node:hover .node-circle {
  border-color: #ffffff;
  transform: scale(1.05);
}

/* Right Details Column */
.eco-details-column {
  width: 100%;
}

.eco-tabs-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.eco-tabs-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.eco-tab-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 14px 8px;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.eco-tab-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.2);
}

.eco-tab-card.active {
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-weight: 700;
}

.eco-detail-box {
  padding: 36px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  background: rgba(13, 11, 36, 0.6);
}

.eco-detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.eco-detail-subtitle {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.4;
}

.eco-detail-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.7;
  font-weight: 300;
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
}

@media (max-width: 768px) {
  .mid-title-primary,
  .mid-title-secondary {
    font-size: 1.75rem;
  }
}

@media (max-width: 600px) {
  .eco-tabs-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .eco-tabs-grid {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .eco-orbit-system {
    width: 320px;
    height: 320px;
  }
  .outer-ring {
    width: 260px;
    height: 260px;
  }
  .inner-ring {
    width: 120px;
    height: 120px;
  }
  .central-base {
    width: 105px;
    height: 105px;
  }
  .base-title {
    font-size: 0.65rem;
  }
  .base-desc {
    font-size: 0.6rem;
  }
  .node-circle {
    width: 38px;
    height: 38px;
  }
  /* Dotted line height shrink */
  .active-connector {
    height: 130px;
  }
}
</style>
