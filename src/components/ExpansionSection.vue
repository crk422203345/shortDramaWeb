<script setup lang="ts">
import { computed, ref } from 'vue'
import marketMapUrl from '@/assets/illustrations/market-map.svg'
import BaseIcon from '@/components/BaseIcon.vue'
import LazyImage from '@/components/LazyImage.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { regions } from '@/data/landing'
import type { Region, SectionId } from '@/types/landing'

defineProps<{
  id: SectionId
}>()

const activeRegionId = ref<string>('sea')
const activeRegion = computed<Region>(() => regions.find((region) => region.id === activeRegionId.value) ?? regions[0]!)
</script>

<template>
  <section :id="id" class="expansion-section" aria-labelledby="expansion-title">
    <div class="section-shell">
      <SectionHeading
        label="全球化规划"
        title="一个在中国市场验证的模式"
        highlight="正在走向全球十亿人口"
        description="中国大陆、中国香港、马来西亚——三个结构性机会窗口正在开启。内容本地化、补贴全球化、广告生态标准化。"
      />

      <div class="expansion-grid">
        <LazyImage :src="marketMapUrl" alt="东南亚数字娱乐用户增长地图" :width="860" :height="540" />

        <div class="region-column">
          <div class="region-tabs" aria-label="区域规划切换">
            <button
              v-for="region in regions"
              :key="region.id"
              class="region-tab"
              :class="{ active: activeRegion.id === region.id }"
              type="button"
              @click="activeRegionId = region.id"
            >
              {{ region.name }}
            </button>
          </div>

          <article class="region-card glass-panel">
            <span class="section-label">{{ activeRegion.headline }}</span>
            <h3>{{ activeRegion.name }}</h3>
            <p class="coverage">{{ activeRegion.coverage }}</p>
            <p class="description">{{ activeRegion.description }}</p>
            <div class="note-box">
              <BaseIcon name="shield" />
              <span>{{ activeRegion.note }}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expansion-section {
  background: #020707;
}

.expansion-grid {
  display: grid;
  grid-template-columns: minmax(520px, 1.08fr) minmax(480px, 0.92fr);
  gap: clamp(52px, 6vw, 88px);
  align-items: center;
  margin-top: 104px;
}

.expansion-grid :deep(.lazy-image) {
  min-height: 500px;
}

.region-tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 34px;
}

.region-tab {
  min-height: 50px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.055);
  color: #9aa8b5;
  font-size: 12.8px;
  font-weight: 900;
  text-align: left;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease,
    background-color 180ms ease;
}

.region-tab.active,
.region-tab:hover {
  border-color: var(--color-cyan);
  background: rgba(0, 216, 245, 0.12);
  color: var(--color-cyan);
  box-shadow: 0 0 22px rgba(0, 216, 245, 0.18);
}

.region-card {
  padding: clamp(34px, 4vw, 48px);
  border-radius: 28px;
}

.region-card h3 {
  margin: 28px 0 0;
  color: var(--color-text);
  font-size: clamp(24px, 2.4vw, 32px);
  font-weight: 950;
}

.coverage {
  margin: 18px 0 0;
  color: var(--color-cyan);
  font-size: 15.2px;
  font-weight: 950;
  line-height: 1.4;
}

.description {
  margin: 30px 0 0;
  color: #9aa4af;
  font-size: 14.4px;
  line-height: 1.62;
}

.note-box {
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 20px;
  align-items: start;
  margin-top: 34px;
  padding: 26px 30px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.07);
  color: #8f9ca8;
  font-size: 12.8px;
  line-height: 1.52;
}

.note-box svg {
  width: 26px;
  height: 26px;
  color: var(--color-cyan);
}

@media (max-width: 1120px) {
  .expansion-grid {
    grid-template-columns: 1fr;
    margin-top: 70px;
  }
}

@media (max-width: 640px) {
  .expansion-grid :deep(.lazy-image) {
    min-height: 300px;
  }

  .region-tabs {
    grid-template-columns: 1fr;
  }

  .region-tab {
    text-align: center;
  }

  .description {
    font-size: 13.6px;
  }
}
</style>
