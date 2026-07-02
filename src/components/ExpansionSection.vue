<script setup lang="ts">
import { computed, ref } from 'vue'
import marketMapUrl from '@/assets/illustrations/market-map.svg'
import BaseIcon from '@/components/BaseIcon.vue'
import LazyImage from '@/components/LazyImage.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { regions } from '@/data/landing'
import type { Region, SectionId } from '@/types/landing'

interface RegionMarker {
  id: string
  x: number
  y: number
}

defineProps<{
  id: SectionId
}>()

const regionMarkers: readonly RegionMarker[] = [
  { id: 'mainland', x: 45, y: 34 },
  { id: 'hongkong', x: 58, y: 47 },
  { id: 'malaysia', x: 49, y: 63 },
  { id: 'sea', x: 66, y: 72 },
]

const activeRegionId = ref<string>('sea')

const activeRegion = computed<Region>(() => {
  return regions.find((region) => region.id === activeRegionId.value) ?? regions[0]!
})

const activeMarker = computed<RegionMarker>(() => {
  return regionMarkers.find((marker) => marker.id === activeRegionId.value) ?? regionMarkers[0]!
})

const activeRoutePoints = computed<string>(() => {
  const activeIndex = regionMarkers.findIndex((marker) => marker.id === activeRegionId.value)
  const endIndex = activeIndex >= 0 ? activeIndex : 0
  return regionMarkers
    .slice(0, endIndex + 1)
    .map((marker) => `${marker.x},${marker.y}`)
    .join(' ')
})

const fullRoutePoints = computed<string>(() => {
  return regionMarkers.map((marker) => `${marker.x},${marker.y}`).join(' ')
})

const getRegionName = (regionId: string): string => {
  return regions.find((region) => region.id === regionId)?.name ?? regionId
}

const setActiveRegion = (regionId: string): void => {
  activeRegionId.value = regionId
}
</script>

<template>
  <section :id="id" class="expansion-section" aria-labelledby="expansion-title">
    <div class="section-shell">
      <SectionHeading
        label="全球化规划"
        title="一个在中国市场验证的模式"
        highlight="正在走向全球十亿人口"
        description="中国大陆、中国香港、马来西亚、东南亚四个结构性机会窗口正在开启。内容本地化、补贴全球化、广告生态标准化。"
      />

      <div class="expansion-grid">
        <div class="region-map-card" aria-label="全球化区域点位地图">
          <LazyImage :src="marketMapUrl" alt="全球化区域地图底图" :width="860" :height="540" />

          <svg class="route-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline class="route-line route-line-base" :points="fullRoutePoints" vector-effect="non-scaling-stroke" />
            <polyline
              class="route-line route-line-active"
              :points="activeRoutePoints"
              vector-effect="non-scaling-stroke"
            />
          </svg>

          <button
            v-for="marker in regionMarkers"
            :key="marker.id"
            class="map-marker"
            :class="{ active: activeMarker.id === marker.id }"
            :style="{ left: `${marker.x}%`, top: `${marker.y}%` }"
            type="button"
            :aria-label="`查看${getRegionName(marker.id)}`"
            :aria-pressed="activeMarker.id === marker.id"
            @click="setActiveRegion(marker.id)"
          >
            <span class="marker-pin" aria-hidden="true">
              <span class="pin-dot"></span>
            </span>
          </button>
        </div>

        <div class="region-column">
          <div class="region-tabs" aria-label="区域规划切换">
            <button
              v-for="region in regions"
              :key="region.id"
              class="region-tab"
              :class="{ active: activeRegion.id === region.id }"
              type="button"
              @click="setActiveRegion(region.id)"
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

.region-map-card {
  position: relative;
  min-height: 500px;
  overflow: hidden;
  border-radius: 42px;
}

.region-map-card :deep(.lazy-image) {
  min-height: 500px;
}

.region-map-card :deep(.lazy-image::before) {
  opacity: 0;
}

.route-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.route-line {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.route-line-base {
  stroke: rgba(0, 216, 245, 0.2);
  stroke-width: 1.1;
  stroke-dasharray: 3 4;
}

.route-line-active {
  stroke: rgba(0, 216, 245, 0.95);
  stroke-width: 1.6;
  stroke-dasharray: 4 3;
  filter: drop-shadow(0 0 8px rgba(0, 216, 245, 0.52));
}

.map-marker {
  position: absolute;
  z-index: 3;
  display: grid;
  width: 58px;
  height: 58px;
  padding: 0;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  transform: translate(-50%, -50%);
}

.marker-pin {
  position: relative;
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 3px solid rgba(0, 216, 245, 0.86);
  border-radius: 50% 50% 50% 0;
  background: rgba(3, 12, 15, 0.92);
  box-shadow: 0 0 0 1px rgba(0, 216, 245, 0.1);
  transform: rotate(-45deg);
  transition:
    width 0.22s ease,
    height 0.22s ease,
    background 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.pin-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-cyan);
  transform: rotate(45deg);
}

.map-marker:hover .marker-pin,
.map-marker:focus-visible .marker-pin,
.map-marker.active .marker-pin {
  width: 48px;
  height: 48px;
  border-color: var(--color-cyan);
  background: var(--color-cyan);
  box-shadow:
    0 0 24px rgba(0, 216, 245, 0.82),
    0 0 54px rgba(0, 216, 245, 0.4);
}

.map-marker:hover,
.map-marker:focus-visible {
  outline: none;
}

.map-marker.active .pin-dot {
  background: #021217;
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
  cursor: pointer;
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
.region-tab:hover,
.region-tab:focus-visible {
  border-color: var(--color-cyan);
  background: rgba(0, 216, 245, 0.12);
  color: var(--color-cyan);
  outline: none;
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

@media (max-width: 1280px) {
  .expansion-grid {
    grid-template-columns: 1fr;
    margin-top: 70px;
  }
}

@media (max-width: 640px) {
  .region-map-card,
  .region-map-card :deep(.lazy-image) {
    min-height: 300px;
  }

  .map-marker {
    width: 44px;
    height: 44px;
  }

  .marker-pin {
    width: 30px;
    height: 30px;
    border-width: 2px;
  }

  .map-marker:hover .marker-pin,
  .map-marker:focus-visible .marker-pin,
  .map-marker.active .marker-pin {
    width: 38px;
    height: 38px;
  }

  .pin-dot {
    width: 7px;
    height: 7px;
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
