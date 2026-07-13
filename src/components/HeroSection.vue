<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t, locale } = useI18n()
const isLongLang = computed(() => locale.value === 'en' || locale.value === 'ms')
</script>

<template>
  <section id="home" class="hero-section">
    <!-- Hero Background Video with Overlay -->
    <div class="hero-bg">
      <video class="hero-video" autoplay muted loop playsinline preload="auto">
        <!-- <source src="https://game.igcdn.cn/Ggame/videos/video1.94041431.mp4" type="video/mp4" /> -->
        <source src="https://www.bingo.vip/ad4.mp4" type="video/mp4" />
      </video>
      <div class="hero-overlay"></div>
    </div>

    <!-- Hero Content -->
    <div class="hero-content container">
      <div class="hero-title-wrap">
        <h1 class="hero-title">
          <span class="italic-text">Bingo</span>
          <span class="cross">&times;</span>
          <span class="italic-text">Web3</span>
        </h1>
        <p class="hero-subtitle" :class="{ 'long-lang': isLongLang }">{{ t('hero.subtitle') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 28vh;
  overflow: hidden;
  background-color: var(--bg-darker);
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.05);
  animation: slowZoom 20s ease-out infinite alternate;
}

.hero-video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center 30%;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Dark overlay to match mockup. Vignette and bottom gradient.
     Bottom stop aligns with the page background (#1c1f54) so the video
     fades seamlessly into the content below instead of a hard seam. */
  background:
    linear-gradient(180deg,
      rgba(8, 6, 23, 0.4) 0%,
      rgba(8, 6, 23, 0.2) 55%,
      rgba(28, 31, 84, 1) 100%),
    radial-gradient(circle at center, rgba(11, 9, 26, 0.1) 0%, rgba(8, 6, 23, 0.7) 100%);
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
}

.hero-title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-title {
  font-size: 7.33rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-shadow:
    0 4px 20px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(79, 70, 229, 0.2);
  line-height: 1.1;
  font-family:
    'Source Han Sans CN', 'Source Han Sans SC', 'Noto Sans CJK SC', 'Source Han Sans',
    'Microsoft YaHei', sans-serif;
}

.italic-text {
  font-style: italic;
  letter-spacing: -2px;
}

.cross {
  font-weight: 300;
  font-size: 5.33rem;
  opacity: 0.8;
  margin: 0 8px;
  font-family: sans-serif;
  vertical-align: middle;
}

.hero-subtitle {
  font-size: 2.66rem;
  font-weight: 500;
  font-style: italic;
  color: #ffffff;
  letter-spacing: 12px;
  text-indent: 12px;
  /* balance centering due to letter-spacing */
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  opacity: 0.95;
  margin-top: 8px;
}

.hero-subtitle.long-lang {
  font-size: 1.8rem;
  letter-spacing: 4px;
  text-indent: 4px;
}

/* Animations */
@keyframes slowZoom {
  0% {
    transform: scale(1.02) translateY(0);
  }

  100% {
    transform: scale(1.08) translateY(-10px);
  }
}

/* Responsive design */
@media (max-width: 1024px) {
  .hero-section {
    padding-top: 30vh;
  }

  .hero-title {
    font-size: 5.6rem;
    gap: 12px;
    justify-content: center;
  }

  .cross {
    font-size: 4rem;
  }

  .hero-subtitle {
    font-size: 2.13rem;
    letter-spacing: 8px;
    text-indent: 8px;
  }

  .hero-subtitle.long-lang {
    font-size: 1.4rem;
    letter-spacing: 3px;
    text-indent: 3px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding-top: 32vh;
    /* Give more vertical breathing room */
  }

  .hero-title {
    font-size: 4.26rem;
    gap: 8px;
    justify-content: center;
  }

  .cross {
    font-size: 2.93rem;
    margin: 0 4px;
  }

  .hero-subtitle {
    font-size: 1.66rem;
    letter-spacing: 6px;
    text-indent: 6px;
  }

  .hero-subtitle.long-lang {
    font-size: 1.15rem;
    letter-spacing: 2px;
    text-indent: 2px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding-top: 35vh;
  }

  .hero-title {
    font-size: 2.93rem;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cross {
    font-size: 2.4rem;
    margin: 0 4px;
  }

  .hero-subtitle {
    font-size: 1.26rem;
    letter-spacing: 3px;
    text-indent: 3px;
    white-space: nowrap;
  }

  .hero-subtitle.long-lang {
    font-size: 0.95rem;
    letter-spacing: 1px;
    text-indent: 1px;
    white-space: normal;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>





