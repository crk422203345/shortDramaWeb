<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue'
import { marketStats, painPoints } from '@/data/landing'
import type { SectionId } from '@/types/landing'

defineProps<{
  id: SectionId
}>()
</script>

<template>
  <section :id="id" class="market-section" aria-labelledby="market-title">
    <div class="section-shell market-grid">
      <div class="market-copy">
        <span class="section-label">市场痛点与机遇</span>
        <h2 id="market-title" class="section-title">冲破传统文娱天花板</h2>

        <div class="pain-list">
          <article v-for="point in painPoints" :key="point.title" class="pain-card glass-panel">
            <BaseIcon :name="point.icon" />
            <div>
              <h3>{{ point.title }}</h3>
              <p>{{ point.description }}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="stat-grid">
        <article v-for="stat in marketStats" :key="stat.title" class="stat-card glass-panel">
          <div class="stat-top">
            <span class="icon-box">
              <BaseIcon :name="stat.icon" />
            </span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
          <p class="stat-metric">{{ stat.metric }}</p>
          <h3>{{ stat.title }}</h3>
          <p>{{ stat.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.market-section {
  background: var(--color-bg);
}

.market-grid {
  display: grid;
  grid-template-columns: minmax(360px, 0.8fr) minmax(520px, 1.2fr);
  gap: clamp(60px, 6vw, 110px);
  align-items: center;
}

.market-copy .section-title {
  max-width: 680px;
}

.pain-list {
  display: grid;
  gap: 34px;
  margin-top: 46px;
}

.pain-card {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 20px;
  padding: 27px 32px;
  border-radius: 16px;
}

.pain-card svg {
  width: 24px;
  height: 24px;
  color: var(--color-red);
}

.pain-card h3,
.stat-card h3 {
  margin: 0;
  color: var(--color-text);
  font-size: 16px;
  font-weight: 950;
}

.pain-card p,
.stat-card p {
  margin: 12px 0 0;
  color: #7f8e9e;
  font-size: 12.8px;
  line-height: 1.55;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 34px;
}

.stat-card {
  min-height: 322px;
  padding: 48px;
  border-radius: 24px;
}

.stat-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-label {
  color: rgba(0, 216, 245, 0.66);
  font-size: 11.2px;
  font-weight: 800;
}

.stat-metric {
  margin: 30px 0 14px !important;
  color: var(--color-cyan) !important;
  font-size: clamp(30.4px, 3.2vw, 44.8px) !important;
  font-weight: 950;
  line-height: 1;
}

@media (max-width: 1180px) {
  .market-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .stat-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    min-height: auto;
    padding: 30px;
  }

  .pain-card {
    grid-template-columns: 28px 1fr;
    padding: 24px;
  }
}
</style>
