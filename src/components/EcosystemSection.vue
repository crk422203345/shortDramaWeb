<script setup lang="ts">
import { computed } from 'vue'
import dataIconUrl from '@/assets/illustrations/数据层级.svg'
import fireIconUrl from '@/assets/illustrations/火热.svg'
import gameIconUrl from '@/assets/illustrations/游戏.svg'
import energyIconUrl from '@/assets/illustrations/能量.svg'
import timeIconUrl from '@/assets/illustrations/时间.svg'
import userIconUrl from '@/assets/illustrations/用户.svg'
import BaseIcon from '@/components/BaseIcon.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { useActiveItem } from '@/composables/useActiveItem'
import { useI18n } from '@/i18n'
import type { EcosystemNodeCopy } from '@/i18n/messages'
import type { SectionId } from '@/types/landing'

interface EcosystemNodeLayout {
  id: string
  iconUrl: string
  x: number
  y: number
}

type EcosystemNode = EcosystemNodeCopy & EcosystemNodeLayout

defineProps<{
  id: SectionId
}>()

const DEFAULT_ACTIVE_NODE_ID = 'beach'

const nodeLayouts: readonly EcosystemNodeLayout[] = [
  { id: 'pos', iconUrl: timeIconUrl, x: 50, y: 9 },
  { id: 'matrix', iconUrl: energyIconUrl, x: 83, y: 30 },
  { id: 'triad', iconUrl: gameIconUrl, x: 83, y: 72 },
  { id: 'loop', iconUrl: dataIconUrl, x: 50, y: 92 },
  { id: 'wave', iconUrl: fireIconUrl, x: 17, y: 72 },
  { id: 'beach', iconUrl: userIconUrl, x: 17, y: 30 },
]

const { copy } = useI18n()

const ecosystemNodes = computed<readonly EcosystemNode[]>(() => {
  return copy.value.ecosystem.nodes.map((node) => {
    const layout = nodeLayouts.find((item) => item.id === node.id) ?? nodeLayouts[0]!
    return { ...node, ...layout }
  })
})

const { activeItem: activeNode, setActiveItem: setActiveNode } = useActiveItem(
  ecosystemNodes,
  DEFAULT_ACTIVE_NODE_ID,
)
</script>

<template>
  <section :id="id" class="ecosystem-section" aria-labelledby="ecosystem-title">
    <div class="section-shell">
      <SectionHeading
        :label="copy.ecosystem.heading.label"
        :title="copy.ecosystem.heading.title"
        :highlight="copy.ecosystem.heading.highlight"
        :description="copy.ecosystem.heading.description"
      />

      <div class="ecosystem-grid">
        <div class="orbit-visual" :aria-label="copy.ecosystem.visualAriaLabel">
          <div class="orbit-rings">
            <span class="ring ring-outer" aria-hidden="true"></span>
            <span class="ring ring-middle" aria-hidden="true"></span>
            <span class="ring ring-inner" aria-hidden="true"></span>

            <svg
              class="connector-layer"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                :x1="activeNode.x"
                :y1="activeNode.y"
                x2="50"
                y2="50"
                class="active-connector"
                vector-effect="non-scaling-stroke"
              />
            </svg>

            <div class="center-core">
              <span class="center-icon">
                <BaseIcon name="bank" />
              </span>
              <strong>GGC / WEBX</strong>
              <p>{{ copy.ecosystem.centerLabel }}</p>
            </div>

            <button
              v-for="node in ecosystemNodes"
              :key="node.id"
              class="orbit-node"
              :class="{ active: activeNode.id === node.id }"
              :style="{ left: `${node.x}%`, top: `${node.y}%` }"
              type="button"
              :aria-pressed="activeNode.id === node.id"
              :aria-label="`${copy.ecosystem.nodeAriaPrefix}${node.tag}`"
              @click="setActiveNode(node.id)"
            >
              <img :src="node.iconUrl" :alt="node.tag" loading="lazy" decoding="async" />
            </button>
          </div>
        </div>

        <div class="flywheel-panel">
          <div class="tag-list" :aria-label="copy.ecosystem.tagListAriaLabel">
            <button
              v-for="node in ecosystemNodes"
              :key="node.id"
              type="button"
              :class="{ active: activeNode.id === node.id }"
              @click="setActiveNode(node.id)"
            >
              {{ node.tag }}
            </button>
          </div>

          <article class="solution-card glass-panel">
            <div class="card-title">
              <span class="icon-box">
                <img
                  :src="activeNode.iconUrl"
                  :alt="activeNode.tag"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <h3>{{ activeNode.title }}</h3>
            </div>
            <p class="accent-line">{{ activeNode.subtitle }}</p>
            <p>{{ activeNode.description }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ecosystem-section {
  background: radial-gradient(circle at 62% 28%, rgba(0, 216, 245, 0.08), transparent 30%), #020707;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: minmax(400px, 0.9fr) minmax(520px, 1.1fr);
  gap: clamp(44px, 6vw, 96px);
  align-items: center;
  margin-top: 92px;
}

.orbit-visual {
  display: grid;
  min-height: 520px;
  place-items: center;
}

.orbit-rings {
  position: relative;
  width: min(100%, 548px);
  aspect-ratio: 1;
  border-radius: 50%;
}

.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(0, 216, 245, 0.18);
  pointer-events: none;
}

.ring-outer {
  inset: 1%;
  border-color: rgba(255, 255, 255, 0.08);
}

.ring-middle {
  inset: 17%;
}

.ring-inner {
  inset: 33%;
  background: radial-gradient(
    circle,
    rgba(0, 216, 245, 0.12),
    rgba(0, 216, 245, 0.02) 65%,
    transparent
  );
}

.connector-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: visible;
  pointer-events: none;
}

.active-connector {
  stroke: rgba(0, 216, 245, 0.95);
  stroke-width: 1.4;
  stroke-dasharray: 3 3.5;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(0, 216, 245, 0.6));
}

.center-core {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  display: grid;
  width: 164px;
  height: 164px;
  place-items: center;
  align-content: center;
  border: 1px solid rgba(0, 216, 245, 0.32);
  border-radius: 50%;
  background: #020707;
  box-shadow:
    0 0 34px rgba(0, 216, 245, 0.12),
    inset 0 0 42px rgba(0, 216, 245, 0.08);
  transform: translate(-50%, -50%);
}

.center-icon {
  display: grid;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  place-items: center;
  border-radius: 16px;
  background: rgba(0, 216, 245, 0.18);
  color: var(--color-cyan);
  font-size: 27px;
}

.center-core strong {
  color: var(--color-cyan);
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 2px;
}

.center-core p {
  margin: 8px 0 0;
  color: var(--color-text);
  font-size: 18px;
  font-weight: 950;
}

.orbit-node {
  position: absolute;
  z-index: 3;
  display: grid;
  width: 64px;
  height: 64px;
  padding: 0;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  background: #030707;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.orbit-node img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  opacity: 0.9;
  transition:
    filter 0.25s ease,
    opacity 0.25s ease;
}

.orbit-node:hover,
.orbit-node:focus-visible {
  border-color: rgba(0, 216, 245, 0.7);
  outline: none;
  transform: translate(-50%, -50%) scale(1.04);
}

.orbit-node.active {
  border-color: rgba(0, 216, 245, 0.95);
  background: var(--color-cyan);
  box-shadow:
    0 0 24px rgba(0, 216, 245, 0.76),
    0 0 48px rgba(0, 216, 245, 0.32);
}

.orbit-node.active img {
  opacity: 1;
  filter: brightness(0) saturate(100%) invert(3%) sepia(21%) saturate(1343%) hue-rotate(139deg)
    brightness(95%) contrast(98%);
}

.flywheel-panel {
  align-self: center;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}

.tag-list button {
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  color: #98a5b3;
  cursor: pointer;
  font-size: 12.8px;
  font-weight: 900;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.tag-list button:hover,
.tag-list button:focus-visible,
.tag-list button.active {
  border-color: var(--color-cyan);
  background: rgba(0, 216, 245, 0.11);
  color: var(--color-cyan);
  outline: none;
  box-shadow: 0 0 22px rgba(0, 216, 245, 0.16);
}

.solution-card {
  min-height: 270px;
  padding: clamp(30px, 3.5vw, 44px);
  border-radius: 28px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 18px;
}

.card-title h3 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(20px, 2.08vw, 28px);
  font-weight: 950;
}

.icon-box img {
  width: 26px;
  height: 26px;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(76%) sepia(58%) saturate(6743%) hue-rotate(138deg)
    brightness(107%) contrast(104%);
}

.solution-card p {
  margin: 22px 0 0;
  color: #8b96a2;
  font-size: 14px;
  line-height: 1.64;
}

.solution-card .accent-line {
  color: var(--color-cyan);
  font-weight: 950;
}

@media (max-width: 1210px) {
  .ecosystem-grid {
    grid-template-columns: 1fr;
    margin-top: 66px;
  }

  .orbit-visual {
    min-height: auto;
  }

  .orbit-rings {
    width: min(100%, 480px);
  }
}

@media (max-width: 640px) {
  .ecosystem-grid {
    margin-top: 48px;
  }

  .orbit-rings {
    width: min(100%, 340px);
  }

  .center-core {
    width: 120px;
    height: 120px;
  }

  .center-icon {
    width: 36px;
    height: 36px;
    margin-bottom: 10px;
    border-radius: 12px;
    font-size: 22px;
  }

  .center-core strong {
    font-size: 10.5px;
  }

  .center-core p {
    font-size: 14px;
  }

  .orbit-node {
    width: 48px;
    height: 48px;
  }

  .orbit-node img {
    width: 25px;
    height: 25px;
  }

  .tag-list button {
    width: 100%;
    justify-content: center;
    font-size: 12px;
  }

  .card-title {
    display: grid;
  }

  .solution-card p {
    font-size: 13.4px;
  }
}
</style>
