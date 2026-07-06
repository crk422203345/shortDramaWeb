<script setup lang="ts">
import BaseIcon from '@/components/BaseIcon.vue'
import { useI18n } from '@/i18n'
import type { SectionId } from '@/types/landing'

defineProps<{
  id: SectionId
}>()

const emit = defineEmits<{
  navigate: [sectionId: SectionId]
}>()

const { copy } = useI18n()
</script>

<template>
  <section :id="id" class="hero-section" aria-labelledby="hero-title">
    <div class="hero-grid" />
    <div class="hero-content">
      <div class="hero-kicker">
        <BaseIcon name="spark" />
        <span>{{ copy.hero.kicker }}</span>
      </div>

      <h1 id="hero-title" class="hero-title">
        <span>BINGO</span>
        <span class="hero-x">×</span>
        <span class="cyan">WEB3</span>
      </h1>

      <p class="hero-subtitle">
        <span>{{ copy.hero.subtitlePrefix }}</span>
        <span>{{ copy.hero.subtitleText }}</span>
      </p>
      <p class="hero-slogan">{{ copy.hero.slogan }}</p>
      <p class="hero-copy">{{ copy.hero.description }}</p>

      <div class="platform-strip glass-panel" :aria-label="copy.hero.platformStripAriaLabel">
        <span class="strip-label">
          <BaseIcon name="mail" />
          {{ copy.hero.platformStripLabel }}
        </span>
        <span
          v-for="platform in copy.platformLinks"
          :key="platform.label"
          class="platform-pill"
          :class="`tone-${platform.tone}`"
        >
          <BaseIcon :name="platform.icon" />
          {{ platform.label }}
          <b v-if="platform.value">{{ platform.value }}</b>
        </span>
      </div>

      <div class="hero-actions">
        <button class="primary-button" type="button" @click="emit('navigate', 'market')">
          {{ copy.hero.primaryCta }}
          <BaseIcon name="arrow" />
        </button>
        <button class="ghost-button" type="button" @click="emit('navigate', 'contact')">
          {{ copy.hero.secondaryCta }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  display: grid;
  min-height: 100svh;
  padding: calc(var(--header-height) + 88px) var(--page-gutter) 86px;
  overflow: hidden;
  place-items: center;
  background:
    radial-gradient(circle at 50% 40%, rgba(0, 217, 246, 0.18), transparent 24%),
    linear-gradient(180deg, rgba(3, 7, 10, 0.28), var(--color-bg) 94%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 216, 245, 0.065) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 216, 245, 0.065) 1px, transparent 1px);
  background-size: 90px 90px;
  mask-image: linear-gradient(to bottom, transparent, #000 16%, #000 82%, transparent);
}

.hero-content {
  position: relative;
  z-index: 1;
  width: min(100%, 1180px);
  min-width: 0;
  text-align: center;
}

.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 50px;
  padding: 0 24px;
  border: 1px solid rgba(0, 216, 245, 0.45);
  border-radius: 999px;
  background: rgba(0, 169, 198, 0.16);
  color: var(--color-cyan);
  font-size: 13.6px;
  font-weight: 950;
  letter-spacing: 0.28em;
  box-shadow: 0 0 32px rgba(0, 216, 245, 0.16);
}

.hero-kicker svg {
  width: 22px;
  height: 22px;
}

.hero-title {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: clamp(18px, 2.4vw, 36px);
  margin: 72px 0 0;
  color: var(--color-text);
  font-size: clamp(52.8px, 7.84vw, 105.6px);
  font-weight: 1000;
  line-height: 0.86;
  letter-spacing: 0;
  text-shadow: 0 0 34px rgba(255, 255, 255, 0.16);
}

.hero-title .cyan,
.hero-x {
  color: var(--color-cyan);
  text-shadow: 0 0 42px rgba(0, 216, 245, 0.54);
}

.hero-x {
  font-size: 0.528em;
}

.hero-subtitle {
  margin: 64px 0 0;
  color: #c6ccd3;
  font-size: clamp(19.2px, 2vw, 27.2px);
  font-weight: 400;
  line-height: 1.2;
}

.hero-subtitle span + span {
  margin-left: 0.2em;
}

.hero-slogan {
  margin: 22px 0 0;
  color: var(--color-text);
  font-size: clamp(22.4px, 2.32vw, 32px);
  font-weight: 950;
  line-height: 1.14;
}

.hero-copy {
  max-width: 820px;
  margin: 28px auto 0;
  color: #8795a4;
  font-size: 14.4px;
  line-height: 1.55;
  overflow-wrap: anywhere;
}

.platform-strip {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  margin-top: 58px;
  padding: 18px 20px;
  border-radius: 22px;
}

.strip-label,
.platform-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
}

.strip-label {
  padding: 0 18px;
  background: rgba(255, 255, 255, 0.055);
  color: #768491;
}

.platform-pill {
  padding: 0 24px;
  border: 1px solid currentColor;
}

.platform-pill svg,
.strip-label svg {
  width: 20px;
  height: 20px;
}

.platform-pill b {
  font-weight: 900;
}

.tone-cyan {
  background: rgba(0, 216, 245, 0.15);
  color: var(--color-cyan);
}

.tone-violet {
  background: rgba(192, 119, 255, 0.16);
  color: #cf8dff;
}

.tone-green {
  background: rgba(8, 216, 145, 0.13);
  color: var(--color-green);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 34px;
  margin-top: 66px;
}

.hero-actions svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 960px) {
  .hero-section {
    min-height: auto;
    padding-top: calc(var(--header-height) + 72px);
  }

  .hero-kicker {
    font-size: 11.2px;
    letter-spacing: 0.12em;
  }

  .hero-title {
    flex-wrap: wrap;
    margin-top: 52px;
  }

  .platform-strip {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding-inline: var(--page-gutter);
    padding-bottom: 72px;
    min-width: 0;
  }

  .hero-content {
    width: 100%;
    max-width: calc(100vw - var(--page-gutter) * 2);
    overflow: hidden;
  }

  .hero-kicker {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    min-height: auto;
    padding: 12px 14px;
    font-size: 8.8px;
    line-height: 1.35;
    letter-spacing: 0.04em;
    text-align: center;
    white-space: normal;
  }

  .hero-kicker span {
    min-width: 0;
    overflow-wrap: anywhere;
    word-break: break-all;
  }

  .hero-kicker svg {
    flex: 0 0 auto;
  }

  .hero-title {
    max-width: 100%;
    display: grid;
    gap: 4px;
    font-size: clamp(40px, 12.8vw, 52.8px);
    overflow-wrap: anywhere;
  }

  .hero-x {
    display: none;
  }

  .hero-subtitle {
    display: grid;
    max-width: 100%;
    margin-top: 42px;
    font-size: 16.8px;
    overflow-wrap: anywhere;
    word-break: break-all;
  }

  .hero-subtitle span + span {
    margin-left: 0;
  }

  .hero-copy {
    font-size: 12px;
    word-break: break-all;
  }

  .platform-strip {
    width: 100%;
    padding: 14px;
    border-radius: 18px;
  }

  .platform-pill,
  .strip-label {
    width: 100%;
    justify-content: center;
    font-size: 10.4px;
    white-space: normal;
    text-align: center;
  }

  .hero-actions {
    display: grid;
    gap: 14px;
    margin-top: 42px;
  }
}
</style>
