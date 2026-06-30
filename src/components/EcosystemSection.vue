<script setup lang="ts">
import flywheelUrl from '@/assets/illustrations/flywheel.svg'
import BaseIcon from '@/components/BaseIcon.vue'
import LazyImage from '@/components/LazyImage.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { flywheelTags } from '@/data/landing'
import type { SectionId } from '@/types/landing'

defineProps<{
  id: SectionId
}>()
</script>

<template>
  <section :id="id" class="ecosystem-section" aria-labelledby="ecosystem-title">
    <div class="section-shell">
      <SectionHeading
        label="生态布局飞轮"
        title="三位一体生态布局"
        highlight="打造Web3娱乐黄金闭环"
        description="打破Web2平台的流量垄断与利益固化，Bingo文娱携手用户、创作者与合规资本，在 GGC/WEBX 全球平台的底层架构上，构筑互利共赢、指数增长的文娱生态。"
      />

      <div class="ecosystem-grid">
        <LazyImage :src="flywheelUrl" alt="Bingo Web3 娱乐生态飞轮示意图" :width="760" :height="760" />

        <div class="flywheel-panel">
          <div class="tag-list" aria-label="生态关键词">
            <span v-for="tag in flywheelTags" :key="tag.label" :class="{ active: tag.active }">
              {{ tag.label }}
            </span>
          </div>

          <article class="beach-card glass-panel">
            <div class="card-title">
              <span class="icon-box">
                <BaseIcon name="users" />
              </span>
              <h3>沙滩计划 (Beach Plan)</h3>
            </div>
            <p class="accent-line">支持创作者、资本与平台“三位一体”，共同富裕。</p>
            <p>
              “沙滩计划”旨在孵化“一人公司 (OPC)”及独立创客工作室。由资本池提供冷启动投资，由平台提供高匹配流量与GGC合规版权管理工具，由创作者产出爆款，三位一体打通Web3时代最高效的内容孵化飞轮。
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecosystem-section {
  background:
    radial-gradient(circle at 62% 28%, rgba(0, 216, 245, 0.08), transparent 30%),
    #020707;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: minmax(440px, 0.95fr) minmax(560px, 1.05fr);
  gap: clamp(54px, 7vw, 120px);
  align-items: end;
  margin-top: 116px;
}

.ecosystem-grid :deep(.lazy-image) {
  min-height: 520px;
}

.flywheel-panel {
  align-self: center;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 36px;
}

.tag-list span {
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 22px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: #98a5b3;
  font-size: 18px;
  font-weight: 900;
}

.tag-list span.active {
  border-color: var(--color-cyan);
  background: rgba(0, 216, 245, 0.11);
  color: var(--color-cyan);
  box-shadow: 0 0 26px rgba(0, 216, 245, 0.18);
}

.beach-card {
  min-height: 300px;
  padding: clamp(34px, 4vw, 48px);
  border-radius: 32px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 22px;
}

.card-title h3 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(30px, 3.2vw, 44px);
  font-weight: 950;
}

.beach-card p {
  margin: 26px 0 0;
  color: #8b96a2;
  font-size: 21px;
  line-height: 1.64;
}

.beach-card .accent-line {
  color: var(--color-cyan);
  font-weight: 950;
}

@media (max-width: 1120px) {
  .ecosystem-grid {
    grid-template-columns: 1fr;
    margin-top: 72px;
  }
}

@media (max-width: 640px) {
  .ecosystem-grid :deep(.lazy-image) {
    min-height: 300px;
  }

  .tag-list span {
    width: 100%;
    justify-content: center;
    font-size: 15px;
  }

  .card-title {
    display: grid;
  }

  .beach-card p {
    font-size: 17px;
  }
}
</style>
