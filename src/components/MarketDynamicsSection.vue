<template>
  <section class="dynamics-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="bg-text">Product</span>
        <div class="title-wrap">
          <h2>市场痛点与机遇</h2>
          <div class="divider-line"></div>
        </div>
      </div>

      <!-- PAIN POINTS SUBSECTION -->
      <div class="subsection">
        <div class="sub-header">
          <span class="arrow-left">&lt;&lt;&lt;</span>
          <span class="sub-title">痛点</span>
          <span class="arrow-right">&gt;&gt;&gt;</span>
        </div>
        
        <div class="pain-points-grid">
          <!-- Card 1 -->
          <div class="pain-card glass-card">
            <div class="pattern-bg"></div>
            <div class="card-content">
              <h3>Web2平台模式</h3>
              <p>高买量成本与低留存率的矛盾，使用户价值难以挖掘</p>
            </div>
          </div>
          <!-- Card 2 -->
          <div class="pain-card glass-card">
            <div class="pattern-bg"></div>
            <div class="card-content">
              <h3>传统Web3项目</h3>
              <p>偏向短期投机，忽略内容本质</p>
            </div>
          </div>
          <!-- Card 3 -->
          <div class="pain-card glass-card">
            <div class="pattern-bg"></div>
            <div class="card-content">
              <h3>传统Web3项目</h3>
              <p>资本极难筛选高留存潜力项目</p>
            </div>
          </div>
        </div>
      </div>

      <!-- OPPORTUNITIES SUBSECTION -->
      <div class="subsection opportunity-section">
        <div class="sub-header">
          <span class="arrow-left">&lt;&lt;&lt;</span>
          <span class="sub-title">机遇</span>
          <span class="arrow-right">&gt;&gt;&gt;</span>
        </div>

        <div class="opp-cards-grid">
          <!-- Card 1 (Red Gradient) -->
          <div class="opp-card red-gradient-card">
            <div class="opp-card-inner">
              <span class="opp-title">Web3娱乐/游戏市场规模</span>
              <div class="opp-stat">
                <span class="symbol">$</span>
                <span class="number">330</span>
                <span class="unit">亿</span>
              </div>
              <p class="opp-desc">2025年预计超过330亿美元 蕴藏庞大代币化流媒体与分发需求</p>
            </div>
          </div>

          <!-- Card 2 (Orange Gradient) -->
          <div class="opp-card orange-gradient-card">
            <div class="opp-card-inner">
              <span class="opp-title">超休闲小游戏市场规模</span>
              <div class="opp-stat">
                <span class="symbol">$</span>
                <span class="number">200</span>
                <span class="unit">亿</span>
              </div>
              <p class="opp-desc">2025年预计达200亿美元 兼具极高用户触达率与即时获客转化</p>
            </div>
          </div>

          <!-- Card 3 (Blue Gradient) -->
          <div class="opp-card blue-gradient-card">
            <div class="opp-card-inner">
              <span class="opp-title">全球数字游民体量</span>
              <div class="opp-stat">
                <span class="number">5000</span>
                <span class="unit">万+</span>
              </div>
              <p class="opp-desc">数字游民已超5,000万，远程创意产出和协同经济增长需求持续高涨</p>
            </div>
          </div>

          <!-- Card 4 (Purple Gradient) -->
          <div class="opp-card purple-gradient-card">
            <div class="opp-card-inner">
              <span class="opp-title">香港Web3桥头堡地位</span>
              <div class="opp-stat">
                <span class="number">1</span>
                <span class="unit">号</span>
              </div>
              <p class="opp-desc">合规基金框架、政策免登和创新生态红利支持，切入海外蓝海最佳枢纽</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dynamics-section {
  background: transparent;
}

.subsection {
  margin-top: 48px;
}

.opportunity-section {
  margin-top: 80px;
}

/* Sub-header with arrow wings */
.sub-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
}

.sub-header .arrow-left,
.sub-header .arrow-right {
  font-family: monospace;
  font-size: 1.1rem;
  color: var(--accent-cyan);
  opacity: 0.8;
  letter-spacing: -2px;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
}

.sub-header .sub-title {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 4px;
  color: #ffffff;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

/* Pain Points Layout */
.pain-points-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.pain-card {
  position: relative;
  overflow: hidden;
  height: 160px;
  display: flex;
  align-items: center;
  padding: 30px;
}

.pattern-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 100%;
  opacity: 0.1;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.4) 1px, transparent 1px);
  background-size: 8px 8px;
  pointer-events: none;
}

.pain-card h3 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.pain-card p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Opportunities Layout */
.opp-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.opp-card {
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  height: 320px;
  display: flex;
  align-items: flex-end;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: var(--transition-normal);
}

.opp-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.25);
}

.opp-card-inner {
  padding: 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.2);
}

.opp-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.opp-stat {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  margin: 16px 0;
}

.opp-stat .symbol {
  font-size: 1.8rem;
  font-weight: 700;
  margin-right: 4px;
  color: #ffffff;
}

.opp-stat .number {
  font-size: 3.25rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
}

.opp-stat .unit {
  font-size: 1.35rem;
  font-weight: 700;
  margin-left: 4px;
  color: #ffffff;
}

.opp-desc {
  font-size: 0.8rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
}

/* Gradients corresponding to mockup */
.red-gradient-card {
  background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
}
.red-gradient-card:hover {
  box-shadow: 0 12px 30px rgba(185, 28, 28, 0.3);
}

.orange-gradient-card {
  background: linear-gradient(135deg, #c2410c 0%, #7c2d12 100%);
}
.orange-gradient-card:hover {
  box-shadow: 0 12px 30px rgba(194, 65, 12, 0.3);
}

.blue-gradient-card {
  background: linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%);
}
.blue-gradient-card:hover {
  box-shadow: 0 12px 30px rgba(3, 105, 161, 0.3);
}

.purple-gradient-card {
  background: linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%);
}
.purple-gradient-card:hover {
  box-shadow: 0 12px 30px rgba(109, 40, 217, 0.3);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .opp-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .pain-points-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .pain-card {
    height: auto;
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .opp-cards-grid {
    grid-template-columns: 1fr;
  }
  .opp-card {
    height: 280px;
  }
}
</style>
