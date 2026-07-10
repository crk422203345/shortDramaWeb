<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <section class="dynamics-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="bg-text">{{ t('dynamics.badge') }}</span>
        <div class="title-wrap">
          <h2>{{ t('dynamics.title') }}</h2>
          <div class="divider-line"></div>
        </div>
      </div>

      <!-- PAIN POINTS SUBSECTION -->
      <div class="subsection">
        <div class="sub-header">
          <img src="/img/箭头左.png" alt="" class="sub-arrow arrow-left" />
          <span class="sub-title">{{ t('dynamics.pain_title') }}</span>
          <img src="/img/箭头右.png" alt="" class="sub-arrow arrow-right" />
        </div>

        <div class="pain-points-grid">
          <!-- Card 1 -->
          <div class="pain-card glass-card">
            <div class="pattern-bg"></div>
            <div class="card-content">
              <h3>{{ t('dynamics.pains.item1_title') }}</h3>
              <p>{{ t('dynamics.pains.item1_desc') }}</p>
            </div>
          </div>
          <!-- Card 2 -->
          <div class="pain-card glass-card">
            <div class="pattern-bg"></div>
            <div class="card-content">
              <h3>{{ t('dynamics.pains.item2_title') }}</h3>
              <p>{{ t('dynamics.pains.item2_desc') }}</p>
            </div>
          </div>
          <!-- Card 3 -->
          <div class="pain-card glass-card">
            <div class="pattern-bg"></div>
            <div class="card-content">
              <h3>{{ t('dynamics.pains.item3_title') }}</h3>
              <p>{{ t('dynamics.pains.item3_desc') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- OPPORTUNITIES SUBSECTION -->
      <div class="subsection opportunity-section">
        <div class="sub-header">
          <img src="/img/箭头左.png" alt="" class="sub-arrow arrow-left" />
          <span class="sub-title">{{ t('dynamics.opp_title') }}</span>
          <img src="/img/箭头右.png" alt="" class="sub-arrow arrow-right" />
        </div>

        <div class="opp-cards-grid">
          <!-- Card 1 -->
          <div class="opp-card opportunity-bg-1">
            <div class="opp-card-inner">
              <span class="opp-title">{{ t('dynamics.opps.item1_title') }}</span>
              <div class="opp-stat">
                <span class="symbol">{{ t('dynamics.opps.item1_symbol') }}</span>
                <span class="number">{{ t('dynamics.opps.item1_stat') }}</span>
                <span class="unit">{{ t('dynamics.opps.item1_unit') }}</span>
              </div>
              <p class="opp-desc">{{ t('dynamics.opps.item1_desc') }}</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="opp-card opportunity-bg-2">
            <div class="opp-card-inner">
              <span class="opp-title">{{ t('dynamics.opps.item2_title') }}</span>
              <div class="opp-stat">
                <span class="symbol">{{ t('dynamics.opps.item2_symbol') }}</span>
                <span class="number">{{ t('dynamics.opps.item2_stat') }}</span>
                <span class="unit">{{ t('dynamics.opps.item2_unit') }}</span>
              </div>
              <p class="opp-desc">{{ t('dynamics.opps.item2_desc') }}</p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="opp-card opportunity-bg-3">
            <div class="opp-card-inner">
              <span class="opp-title">{{ t('dynamics.opps.item3_title') }}</span>
              <div class="opp-stat">
                <span v-if="t('dynamics.opps.item3_symbol')" class="symbol">{{
                  t('dynamics.opps.item3_symbol')
                }}</span>
                <span class="number">{{ t('dynamics.opps.item3_stat') }}</span>
                <span class="unit">{{ t('dynamics.opps.item3_unit') }}</span>
              </div>
              <p class="opp-desc">{{ t('dynamics.opps.item3_desc') }}</p>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="opp-card opportunity-bg-4">
            <div class="opp-card-inner">
              <span class="opp-title">{{ t('dynamics.opps.item4_title') }}</span>
              <div class="opp-stat">
                <span v-if="t('dynamics.opps.item4_symbol')" class="symbol">{{
                  t('dynamics.opps.item4_symbol')
                }}</span>
                <span class="number">{{ t('dynamics.opps.item4_stat') }}</span>
                <span class="unit">{{ t('dynamics.opps.item4_unit') }}</span>
              </div>
              <p class="opp-desc">{{ t('dynamics.opps.item4_desc') }}</p>
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

.sub-arrow {
  width: 46px;
  height: auto;
  display: block;
  flex-shrink: 0;
  filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.35));
}

.sub-header .sub-title {
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 4px;
  color: #b4effe;
  text-shadow: 0 0 15px rgba(180, 239, 254, 0.25);
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
  background-color: #131546;
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
  color: #b4effe;
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
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  transition: var(--transition-normal);
}

.opp-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.25);
}

.opp-card-inner {
  padding: 28px 22px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.16) 100%);
}

.opp-title {
  font-size: 1.08rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.35;
}

.opp-stat {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin: 16px 0 12px;
}

.opp-stat .symbol {
  font-size: 2.1rem;
  font-weight: 800;
  margin-right: 4px;
  color: #ffffff;
}

.opp-stat .number {
  font-size: 4.3rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
}

.opp-stat .unit {
  font-size: 1.7rem;
  font-weight: 800;
  margin-left: 4px;
  color: #ffffff;
}

.opp-desc {
  max-width: 190px;
  font-size: 0.94rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 500;
}

.opportunity-bg-1 {
  background-image: url('/img/1.png');
}

.opportunity-bg-2 {
  background-image: url('/img/2.png');
}

.opportunity-bg-3 {
  background-image: url('/img/3.png');
}

.opportunity-bg-4 {
  background-image: url('/img/4.png');
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

  .opp-card-inner {
    padding: 20px 16px;
  }

  .opp-desc {
    font-size: 0.88rem;
    line-height: 1.5;
  }

  .opp-stat .number {
    font-size: 3.5rem;
  }

  .opp-stat .symbol {
    font-size: 1.8rem;
  }

  .opp-stat .unit {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .opp-cards-grid {
    grid-template-columns: 1fr;
  }

  .opp-card {
    height: 280px;
  }

  .opp-stat .number {
    font-size: 3rem;
  }

  .opp-stat .symbol {
    font-size: 1.5rem;
  }

  .opp-stat .unit {
    font-size: 1.2rem;
  }

  .sub-arrow {
    width: 32px;
  }

  .sub-header .sub-title {
    font-size: 1.1rem;
    letter-spacing: 2px;
  }
}
</style>
