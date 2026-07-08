<script setup lang="ts">
import { ref } from 'vue'

const activePillar = ref('game')

const pillars = {
  game: {
    id: 'game',
    label: '小游戏',
    title: '小游戏：1分钟上手 轻松共享生态红利',
    description: '高粘度超休闲小游戏，将碎片化娱乐时间转化为生态积分权益产出。结合GGC底层链，让游戏所有权还给生态共建者。',
    img: '/img/小游戏.png',
    subBrand: 'OLÉ GAME',
    color: '#00f0ff', // cyan
    filter: 'hue-rotate(0deg)'
  },
  drama: {
    id: 'drama',
    label: '短剧',
    title: '短剧：精品竖屏 极低门槛看剧赚积分',
    description: '精品内容库，低消费无感观看，刷剧享受生态红利，结合实时多模态 AI，打通跨国流量与高效增值通道。',
    img: '/img/小游戏.png',
    subBrand: 'OHO DRAMA',
    color: '#ec4899', // pink
    filter: 'hue-rotate(300deg) saturate(1.2)'
  },
  social: {
    id: 'social',
    label: '社交生态',
    title: 'UGC & 数字游民社区',
    description: '构建新型的全球化社区与价值网络。',
    img: '/img/小游戏.png',
    subBrand: 'BINGO SOCIAL',
    color: '#8b5cf6', // purple
    filter: 'hue-rotate(240deg) brightness(0.9)'
  }
}
</script>

<template>
  <section id="business-mode" class="pillars-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="bg-text">Business</span>
        <div class="title-wrap">
          <h2>三大核心业务支柱</h2>
          <div class="divider-line"></div>
        </div>
        <p class="section-subtitle">
          以数字地球为生态核心，精品短剧、休闲游戏与共建共享的社交生态彼此咬合，编织出繁荣的 Web3 价值网络。
        </p>
      </div>

      <!-- Content Area -->
      <div class="pillars-layout">
        <!-- Left Column: Orbit Diagram -->
        <div class="orbit-column">
          <div class="orbit-system">
            <!-- Background Orbits -->
            <div class="orbit-ring ring-outer"></div>
            <div class="orbit-ring ring-middle"></div>
            <div class="orbit-ring ring-inner"></div>

            <div class="pillar-connector" :class="`connector-${activePillar}`"></div>
            
            <!-- Central Node -->
            <div class="center-node">
              <div class="center-glow"></div>
              <div class="center-particles" aria-hidden="true">
                <span class="particle particle-white"></span>
                <span class="particle particle-blue"></span>
                <span class="particle particle-red"></span>
                <span class="particle particle-purple"></span>
                <span class="particle particle-yellow"></span>
              </div>
              <div class="center-content">
                <img src="/img/logo.png" alt="BINGO文娱" class="center-logo-img" />
              </div>
            </div>

            <!-- Orbit Nodes (Clickable) -->
            <!-- 1. Game Node (Top) -->
            <div class="orbit-node node-game" :class="{ active: activePillar === 'game' }"
              @click="activePillar = 'game'">
              <div class="node-icon">
                <img src="/img/logo(1).png" alt="小游戏" class="node-icon-img" />
              </div>
              <div class="node-label">
                <span class="sub-brand">OLÉ GAME</span>
                <span class="main-label">小游戏</span>
              </div>
            </div>

            <!-- 2. Drama Node (Bottom-Left) -->
            <div class="orbit-node node-drama" :class="{ active: activePillar === 'drama' }"
              @click="activePillar = 'drama'">
              <div class="node-icon">
                <img src="/img/omo.png" alt="短剧" class="node-icon-img" />
              </div>
              <div class="node-label">
                <span class="sub-brand">OHO DRAMA</span>
                <span class="main-label">短剧</span>
              </div>
            </div>

            <!-- 3. Social Node (Bottom-Right) -->
            <div class="orbit-node node-social" :class="{ active: activePillar === 'social' }"
              @click="activePillar = 'social'">
              <div class="node-icon">
                <img src="/img/社交-对话框1.png" alt="社交生态" class="node-icon-img" />
              </div>
              <div class="node-label">
                <span class="sub-brand">社交生态</span>
                <span class="main-label">社交生态</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Detail Card -->
        <div class="detail-column">
          <transition name="slide-fade" mode="out-in">
            <div :key="activePillar" class="pillar-detail-card glass-card">
              <!-- Banner Image with color filters for distinct pillars -->
              <div class="banner-wrapper">
                <img :src="pillars[activePillar as keyof typeof pillars].img"
                  :alt="pillars[activePillar as keyof typeof pillars].title" class="banner-img"
                  :style="{ filter: pillars[activePillar as keyof typeof pillars].filter }" />
                <div class="banner-overlay"></div>
              </div>

              <!-- Text details -->
              <div class="pillar-text-content">
                <h3 class="pillar-title">{{ pillars[activePillar as keyof typeof pillars].title }}</h3>
                <p class="pillar-desc">{{ pillars[activePillar as keyof typeof pillars].description }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pillars-section {
  background: transparent;
  overflow: hidden;
  scroll-margin-top: 24px;
}

.pillars-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-top: 60px;
}

/* Orbit Diagram Column styling */
.orbit-column {
  display: flex;
  justify-content: center;
  align-items: center;
}

.orbit-system {
  position: relative;
  width: 420px;
  height: 420px;
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

.ring-outer {
  width: 400px;
  height: 400px;
  animation: rotateClockwise 45s linear infinite;
}

.ring-middle {
  width: 280px;
  height: 280px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.04);
}

.ring-inner {
  width: 160px;
  height: 160px;
  animation: rotateCounterClockwise 25s linear infinite;
}

.pillar-connector {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 180px;
  height: 1px;
  background-image: linear-gradient(to right, #0654f2 50%, transparent 50%);
  background-size: 8px 1px;
  transform-origin: left center;
  z-index: 8;
  pointer-events: none;
  transition:
    width 0.4s ease,
    transform 0.4s ease;
}

.pillar-connector::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0654f2;
  box-shadow: 0 0 12px rgba(6, 84, 242, 0.75);
  transform: translateY(-50%);
}

.connector-game {
  width: 176px;
  transform: rotate(-90deg);
}

.connector-drama {
  width: 190px;
  transform: rotate(142deg);
}

.connector-social {
  width: 190px;
  transform: rotate(38deg);
}

/* Center core node */
.center-node {
  position: relative;
  z-index: 10;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background: #030763;
  border: 2px solid #323CC6;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(79, 70, 229, 0.4);
}

.center-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: rgba(79, 70, 229, 0.15);
  filter: blur(10px);
  animation: pulseGlow 3s ease-in-out infinite;
}

.center-particles {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  filter: blur(2px);
  opacity: 0.9;
  animation: particleDrift 4.8s ease-in-out infinite alternate;
}

.particle-white {
  top: 18%;
  left: 28%;
  background: #ffffff;
  box-shadow: 0 0 14px rgba(255, 255, 255, 0.9);
  animation-delay: -0.6s;
}

.particle-blue {
  top: 24%;
  right: 22%;
  background: #07a8ff;
  box-shadow: 0 0 16px rgba(7, 168, 255, 0.9);
  animation-delay: -1.3s;
}

.particle-red {
  right: 18%;
  bottom: 30%;
  background: #ff315a;
  box-shadow: 0 0 16px rgba(255, 49, 90, 0.9);
  animation-delay: -2.1s;
}

.particle-purple {
  bottom: 18%;
  left: 30%;
  background: #a855f7;
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.9);
  animation-delay: -2.8s;
}

.particle-yellow {
  top: 52%;
  left: 14%;
  background: #ffd84d;
  box-shadow: 0 0 16px rgba(255, 216, 77, 0.9);
  animation-delay: -3.5s;
}

.center-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.center-content span {
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 1px;
}

.center-logo-img {
  width: 70px;
  height: auto;
  display: block;
  object-fit: contain;
}

@keyframes particleDrift {
  0% {
    transform: translate3d(-4px, 3px, 0) scale(0.8);
    opacity: 0.55;
  }
  50% {
    transform: translate3d(5px, -5px, 0) scale(1.18);
    opacity: 0.95;
  }
  100% {
    transform: translate3d(8px, 4px, 0) scale(0.95);
    opacity: 0.72;
  }
}

@media (prefers-reduced-motion: reduce) {
  .particle {
    animation: none;
  }
}

/* Orbit Clickable Nodes general styling */
.orbit-node {
  position: absolute;
  z-index: 20;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.node-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #222560;
  border: 1px solid #2E3280;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.node-icon-img {
  max-width: 42px;
  max-height: 38px;
  display: block;
  object-fit: contain;
}

.node-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.sub-brand {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.main-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #ffffff;
}

/* Orbit node position assignments */
/* Game Node (Top Center) */
.node-game {
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}

.node-game .node-icon {
  border-color: #2E3280;
}

.node-game.active .node-icon {
  background:
    linear-gradient(#222560, #222560) padding-box,
    linear-gradient(90deg, #0395df 0%, #ac097a 100%) border-box;
  color: #0b091a;
  border: 2px solid transparent;
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.6);
}

/* Drama Node (Bottom Left) */
.node-drama {
  bottom: 25px;
  left: 25px;
}

.node-drama .node-icon {
  border-color: #2E3280;
}

.node-drama.active .node-icon {
  background:
    linear-gradient(#222560, #222560) padding-box,
    linear-gradient(90deg, #0395df 0%, #ac097a 100%) border-box;
  color: #ffffff;
  border: 2px solid transparent;
  box-shadow: 0 0 25px rgba(236, 72, 153, 0.6);
}

/* Social Node (Bottom Right) */
.node-social {
  bottom: 25px;
  right: 25px;
}

.node-social .node-icon {
  border-color: #2E3280;
}

.node-social.active .node-icon {
  background:
    linear-gradient(#222560, #222560) padding-box,
    linear-gradient(90deg, #0395df 0%, #ac097a 100%) border-box;
  color: #ffffff;
  border: 2px solid transparent;
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.6);
}

/* Orbit Node active states label */
.orbit-node.active .node-label {
  opacity: 1;
  transform: scale(1.05);
}

.orbit-node:hover .node-icon {
  transform: scale(1.1);
  border-color: #ffffff;
}

.orbit-node.active:hover .node-icon {
  border-color: transparent;
}

/* Right Detail Column styling */
.detail-column {
  width: 100%;
}

.pillar-detail-card {
  overflow: hidden;
  height: 100%;
  border-radius: 24px;
  background-color: #0F0F31 !important;
}

.banner-wrapper {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.5s ease, transform 0.5s ease;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(to top, rgba(15, 13, 43, 1) 0%, rgba(15, 13, 43, 0) 100%);
}

.pillar-text-content {
  padding: 30px;
  background: rgba(15, 13, 43, 0.5);
}

.pillar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.pillar-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
  font-weight: 300;
}

/* Slide Fade Transition for detail card */
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .pillars-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

@media (max-width: 480px) {
  .orbit-system {
    width: 320px;
    height: 320px;
  }

  .ring-outer {
    width: 300px;
    height: 300px;
  }

  .ring-middle {
    width: 210px;
    height: 210px;
  }

  .ring-inner {
    width: 120px;
    height: 120px;
  }

  .center-node {
    width: 104px;
    height: 104px;
  }

  .center-logo-img {
    width: 58px;
  }

  .node-icon {
    width: 54px;
    height: 54px;
  }

  .node-icon-img {
    max-width: 36px;
    max-height: 32px;
  }

  .node-game {
    top: 5px;
  }

  .node-drama {
    bottom: 15px;
    left: 15px;
  }

  .node-social {
    bottom: 15px;
    right: 15px;
  }
}
</style>
