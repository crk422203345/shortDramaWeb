<script setup lang="ts">
import { ref, computed } from 'vue'

const tabs = {
  pos: {
    id: 'pos',
    tabLabel: 'POS价值成长 + GGC链',
    title: 'POS价值成长 + GGC链',
    subtitle: '流量越大，用户越多，生态价值和用户权益越高。',
    description: '通过独创的“注意力证明（POS）”激励机制与自研GGC链，用户看短剧、玩游戏的时间和互动数据会即时转化为生态积分权益。将平台利润通过智能合约直接倾斜给生态建设者。',
    nodeIndex: 0,
    color: '#00f0ff'
  },
  iaa_iap: {
    id: 'iaa_iap',
    tabLabel: 'IAA+IAP混变矩阵',
    title: 'IAA+IAP混变矩阵',
    subtitle: '自研极致高效变现模型，实现用户与平台利益共赢。',
    description: '打通了IAA（广告变现）与IAP（积分/数字道具付费）的双轮壁垒。平台通过全球高单价数字广告主竞价填充，将大比例广告收益投入GGC生态池，或直接向活跃看剧玩游戏的用户分配生态红利，彻底破除零和博弈。',
    nodeIndex: 1,
    color: '#ec4899'
  },
  three_engines: {
    id: 'three_engines',
    tabLabel: '短剧+游戏+社交三轮驱动',
    title: '短剧+游戏+社交三轮驱动',
    subtitle: '短剧、小游戏与社交平台协同，高速凝聚海量流量。',
    description: '以精品短剧与轻量化游戏构建内容引擎，结合社交互动与本地生活场景，打造集娱乐、社交与消费体验于一体的数字生态。短剧内容、游戏资产、社交权益与生活服务相互联动，通过多场景触达与生态协同运营，激发用户参与和分享动力，助力平台实现更高效的用户增长与价值沉淀。',
    nodeIndex: 2,
    color: '#8b5cf6'
  },
  eco_loop: {
    id: 'eco_loop',
    tabLabel: '生态价值闭环',
    title: '生态价值闭环',
    subtitle: '结合区块链分布式科技，构建持续健康增长的网络。',
    description: 'GGC通证在游戏、短剧解锁、NFT二创版权、DAO治理投票等场景形成多重消耗和流通刚需。配合手续费循环、平台盈利生态分配和生态基金沉淀，构成生态价值稳健增值的良性螺旋。',
    nodeIndex: 3,
    color: '#10b981'
  },
  wave_plan: {
    id: 'wave_plan',
    tabLabel: '浪潮计划 (Wave Plan)',
    title: '浪潮计划 (Wave Plan)',
    subtitle: '孵化庞大的UGC内容生态与全球数字游民社区。',
    description: '“浪潮计划”专门扶持全球超5,000万数字游民、独立剪辑手、编剧及创客授权使用Bingo文娱官方版权库，在TikTok、YouTube等社交平台进行碎片化剪辑与引流，享有超额的GGC链上二创返税与流量分成。',
    nodeIndex: 4,
    color: '#f59e0b'
  },
  beach_plan: {
    id: 'beach_plan',
    tabLabel: '沙滩计划 (Beach Plan)',
    title: '沙滩计划 (Beach Plan)',
    subtitle: '支持创作者、资本与平台“三位一体”，共同富裕。',
    description: '“沙滩计划”旨在孵化“一人公司（OPC）”及独立创客工作室。由资本池提供冷启动投资，由平台提供高匹配流量与GGC合规版权管理工具，由创作者产出爆款，三位一体打通Web3时代最高效的内容孵化飞轮。',
    nodeIndex: 5,
    color: '#3b82f6'
  }
} as const

const activeTab = ref<keyof typeof tabs>('pos')
const orbitActiveColor = '#07A8FF'

// Computed properties for template type safety
const activeTabData = computed(() => tabs[activeTab.value])

// Order of tabs for layout display (2 rows, 3 columns)
const tabLayout = [
  ['pos', 'iaa_iap', 'three_engines'],
  ['eco_loop', 'wave_plan', 'beach_plan']
] as const

// Node positions and connector angles for the 6 nodes on the outer orbit ring.
// The connector is a horizontal line that starts at center and rotates toward
// the selected node, matching the browser coordinate system.
const nodePositions = [
  { top: '7.9%',  left: '50%',   transform: 'translate(-50%, -50%)', angle: -90  }, // top
  { top: '29%',   left: '86.5%', transform: 'translate(-50%, -50%)', angle: -30  }, // top-right
  { top: '71%',   left: '86.5%', transform: 'translate(-50%, -50%)', angle: 30   }, // bottom-right
  { top: '92.1%', left: '50%',   transform: 'translate(-50%, -50%)', angle: 90   }, // bottom
  { top: '71%',   left: '13.5%', transform: 'translate(-50%, -50%)', angle: 150  }, // bottom-left
  { top: '29%',   left: '13.5%', transform: 'translate(-50%, -50%)', angle: -150 }, // top-left
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
                color: orbitActiveColor,
                boxShadow: `0 0 10px ${orbitActiveColor}`
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
  background: #07A8FF;
  border-color: #07A8FF;
  color: #0b091a;
  box-shadow: 0 0 20px rgba(7, 168, 255, 0.6);
  transform: scale(1.1);
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
  box-shadow: inset 0 0 0 2px rgba(90, 84, 176, 0.76), 0 10px 18px rgba(0, 0, 0, 0.18);
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
  box-shadow: inset 0 0 0 2px rgba(0, 240, 255, 0.72), 0 12px 22px rgba(0, 0, 0, 0.22);
}

.eco-tab-card.active {
  background: linear-gradient(90deg, #00c8ff 0%, #00a9ff 100%);
  color: #030729;
  box-shadow: 0 0 22px rgba(0, 200, 255, 0.26);
}

.eco-tab-card.active::before {
  opacity: 0.48;
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
  box-shadow: inset 0 0 0 1px rgba(12, 13, 54, 0.68), 0 24px 60px rgba(0, 0, 0, 0.22);
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
    width: 130px;
  }
}
</style>
