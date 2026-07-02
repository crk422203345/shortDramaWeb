<script setup lang="ts">
import { computed, ref } from 'vue'
import digitalEarthUrl from '@/assets/illustrations/digital-earth.svg'
import BaseIcon from '@/components/BaseIcon.vue'
import LazyImage from '@/components/LazyImage.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { pillars } from '@/data/landing'
import type { Pillar, SectionId } from '@/types/landing'

defineProps<{
  id: SectionId
}>()

const activeIndex = ref<number>(2)

const activePillar = computed<Pillar>(() => pillars[activeIndex.value] ?? pillars[2] ?? pillars[0]!)
</script>

<template>
  <section :id="id" class="pillars-section" aria-labelledby="pillars-title">
    <div class="section-shell">
      <SectionHeading
        label="业务模式"
        title="三大核心业务支柱"
        description="以数字地球为生态核心，精品短剧、休闲游戏与共建共享的社交生态彼此咬合，编织出繁荣的 Web3 价值网络。"
      />

      <div class="pillar-stage">
        <div class="earth-column">
          <LazyImage
            :src="digitalEarthUrl"
            alt="Bingo 数字地球与三大业务支柱示意图"
            :width="760"
            :height="760"
          />
          <div class="pillar-tabs" aria-label="业务支柱切换">
            <button
              v-for="(pillar, index) in pillars"
              :key="pillar.index"
              class="pillar-tab"
              :class="{ active: activeIndex === index }"
              type="button"
              @click="activeIndex = index"
            >
              <BaseIcon :name="pillar.icon" />
              <span>{{ pillar.title }}</span>
              <small>Pillar {{ pillar.index }}</small>
            </button>
          </div>
        </div>

        <article class="pillar-detail glass-panel">
          <div class="detail-top">
            <span class="section-label">核心支柱 {{ activePillar.index }} / {{ activePillar.title }}</span>
            <span class="icon-box">
              <BaseIcon :name="activePillar.icon" />
            </span>
          </div>

          <h3>{{ activePillar.title }}</h3>
          <p class="detail-subtitle">
            <BaseIcon name="spark" />
            {{ activePillar.subtitle }}
          </p>
          <p class="detail-copy">{{ activePillar.description }}</p>

          <div class="metric-row">
            <div>
              <span>回购储备</span>
              <strong>{{ activePillar.primaryMetric }}</strong>
            </div>
            <div>
              <span>目标创客</span>
              <strong>{{ activePillar.secondaryMetric }}</strong>
            </div>
          </div>

          <div class="outcome-row">
            <BaseIcon name="growth" />
            <span>成果效益</span>
            <strong>{{ activePillar.outcome }}</strong>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pillars-section {
  background: linear-gradient(180deg, var(--color-bg) 0%, #020607 100%);
}

.pillar-stage {
  display: grid;
  grid-template-columns: minmax(420px, 0.92fr) minmax(560px, 1.08fr);
  gap: clamp(56px, 7vw, 120px);
  align-items: end;
  margin-top: 110px;
}

.earth-column {
  position: relative;
  min-height: 720px;
}

.earth-column :deep(.lazy-image) {
  max-width: 620px;
  margin: 0 auto;
}

.pillar-tabs {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.pillar-tab {
  position: absolute;
  z-index: 2;
  display: grid;
  justify-items: center;
  gap: 8px;
  width: 156px;
  padding: 0;
  background: transparent;
  color: #606b76;
  pointer-events: auto;
}

.pillar-tab:nth-child(1) {
  left: 6%;
  top: 90px;
}

.pillar-tab:nth-child(2) {
  right: 4%;
  top: 95px;
}

.pillar-tab:nth-child(3) {
  left: 50%;
  top: 560px;
  transform: translateX(-50%);
}

.pillar-tab svg {
  width: 58px;
  height: 58px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.03);
  color: #9ba8b4;
}

.pillar-tab span {
  color: #a4adb7;
  font-size: 15.2px;
  font-weight: 950;
}

.pillar-tab small {
  color: #4e5660;
  font-family: Consolas, monospace;
  font-size: 10.4px;
}

.pillar-tab.active svg {
  border-color: rgba(8, 216, 145, 0.75);
  background: rgba(8, 216, 145, 0.14);
  color: var(--color-green);
  box-shadow: 0 0 38px rgba(8, 216, 145, 0.32);
}

.pillar-tab.active span {
  color: var(--color-green);
}

.pillar-detail {
  padding: clamp(34px, 5vw, 62px);
  border-color: rgba(0, 216, 245, 0.18);
  border-radius: 48px;
  box-shadow:
    0 0 70px rgba(0, 216, 245, 0.11),
    var(--shadow-panel);
}

.detail-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.pillar-detail h3 {
  margin: 54px 0 0;
  color: var(--color-text);
  font-size: clamp(24px, 2.72vw, 35.2px);
  font-weight: 950;
  line-height: 1.12;
}

.detail-subtitle {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 24px 0 0;
  color: var(--color-cyan);
  font-size: clamp(14.4px, 1.48vw, 18.4px);
  font-weight: 950;
  line-height: 1.35;
}

.detail-subtitle svg {
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
}

.detail-copy {
  margin: 44px 0 0;
  padding-bottom: 42px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #8794a2;
  font-size: 15.2px;
  line-height: 1.55;
}

.metric-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 44px;
}

.metric-row div {
  min-height: 116px;
  padding: 26px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.025);
}

.metric-row span {
  display: block;
  color: #5f6872;
  font-size: 10.4px;
  font-weight: 800;
}

.metric-row strong {
  display: block;
  margin-top: 14px;
  color: var(--color-text);
  font-size: 20px;
  font-weight: 950;
}

.outcome-row {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 16px;
  align-items: center;
  margin-top: 48px;
  min-height: 76px;
  padding: 0 26px;
  border: 1px solid rgba(0, 216, 245, 0.5);
  border-radius: 18px;
  background: rgba(0, 216, 245, 0.12);
  color: var(--color-cyan);
}

.outcome-row svg {
  width: 24px;
  height: 24px;
}

.outcome-row span {
  font-weight: 900;
}

.outcome-row strong {
  justify-self: end;
  color: #d0d6dd;
  font-weight: 900;
}

@media (max-width: 1260px) {
  .pillar-stage {
    grid-template-columns: 1fr;
    margin-top: 70px;
  }

  .earth-column {
    min-height: auto;
  }

  .pillar-tabs {
    position: static;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 24px;
  }

  .pillar-tab {
    position: static;
    width: auto;
    transform: none !important;
  }
}

@media (max-width: 700px) {
  .pillar-tabs,
  .metric-row {
    grid-template-columns: 1fr;
  }

  .pillar-detail {
    border-radius: 28px;
  }

  .detail-top,
  .outcome-row {
    align-items: start;
  }

  .outcome-row {
    grid-template-columns: auto 1fr;
    padding: 20px;
  }

  .outcome-row strong {
    grid-column: 1 / -1;
    justify-self: start;
  }
}
</style>
