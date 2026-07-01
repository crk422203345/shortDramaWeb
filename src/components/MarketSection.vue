<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { marketStats, painPoints } from '@/data/landing'
import type { SectionId } from '@/types/landing'

defineProps<{
  id: SectionId
}>()

interface MetricParts {
  target: number
  suffix: string
  decimals: number
}

const statGridRef = ref<HTMLElement | null>(null)
const animatedMetrics = ref<string[]>(marketStats.map((stat) => formatMetric(stat.metric, 0)))
let observer: IntersectionObserver | null = null
let animationFrameId: number | null = null
let hasAnimated = false

function parseMetric(metric: string): MetricParts | null {
  const match = metric.match(/\d+(?:\.\d+)?/)
  if (!match) return null

  const rawNumber = match[0]
  return {
    target: Number(rawNumber),
    suffix: metric.replace(rawNumber, ''),
    decimals: rawNumber.includes('.') ? rawNumber.split('.')[1]?.length ?? 0 : 0,
  }
}

function formatMetric(metric: string, progress: number): string {
  const parts = parseMetric(metric)
  if (!parts) return metric

  const easedProgress = 1 - Math.pow(1 - progress, 3)
  const currentValue = parts.target * easedProgress
  const numberText =
    parts.decimals > 0 ? currentValue.toFixed(parts.decimals) : Math.round(currentValue).toString()

  return `${numberText}${parts.suffix}`
}

function startMetricAnimation(): void {
  if (hasAnimated) return
  hasAnimated = true

  const duration = 1400
  const stagger = 120
  let startTime: number | null = null

  const tick = (timestamp: number): void => {
    startTime ??= timestamp

    animatedMetrics.value = marketStats.map((stat, index) => {
      const rawProgress = (timestamp - startTime! - index * stagger) / duration
      const progress = Math.min(Math.max(rawProgress, 0), 1)
      return formatMetric(stat.metric, progress)
    })

    const lastItemDelay = (marketStats.length - 1) * stagger
    if (timestamp - startTime < duration + lastItemDelay) {
      animationFrameId = window.requestAnimationFrame(tick)
      return
    }

    animatedMetrics.value = marketStats.map((stat) => stat.metric)
    animationFrameId = null
  }

  animationFrameId = window.requestAnimationFrame(tick)
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      startMetricAnimation()
      observer?.disconnect()
    },
    {
      root: null,
      rootMargin: '-8% 0px -18% 0px',
      threshold: 0.28,
    },
  )

  if (statGridRef.value) observer.observe(statGridRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  if (animationFrameId !== null) {
    window.cancelAnimationFrame(animationFrameId)
  }
})
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

      <div ref="statGridRef" class="stat-grid">
        <article v-for="(stat, index) in marketStats" :key="stat.title" class="stat-card glass-panel">
          <div class="stat-top">
            <span class="icon-box">
              <BaseIcon :name="stat.icon" />
            </span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
          <p class="stat-metric">{{ animatedMetrics[index] ?? stat.metric }}</p>
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
  grid-template-columns: minmax(420px, 0.95fr) minmax(560px, 1.05fr);
  gap: clamp(46px, 5vw, 78px);
  align-items: start;
}

.market-copy .section-title {
  max-width: 560px;
}

.pain-list {
  display: grid;
  gap: 24px;
  margin-top: 38px;
}

.pain-card {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 18px;
  padding: 24px 28px;
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
  gap: 24px;
}

.stat-card {
  min-height: 232px;
  padding: 30px;
  border-radius: 20px;
}

.stat-card .icon-box {
  width: 48px;
  height: 48px;
  border-radius: 10px;
}

.stat-card .icon-box svg {
  width: 23px;
  height: 23px;
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
  margin: 22px 0 12px !important;
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
