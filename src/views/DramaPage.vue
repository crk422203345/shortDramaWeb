<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeDramaIndex = ref(1)
const dramaVideoRefs = ref<HTMLVideoElement[]>([])

const featuredDramas = [
  {
    key: 'sweet_date',
    video: 'https://www.bingo.vip/ad8.mp4',
    poster: '/img/短剧6.png',
    link: 'https://tv.bingo.vip/#/me/detail/detail?id=1253&courseDetailsId=67803',
  },
  {
    key: 'agent_wife_contract',
    video: 'https://www.bingo.vip/ad10.mp4',
    poster: '/img/短剧7.jpg',
    link: 'https://tv.bingo.vip/#/me/detail/detail?id=1238&courseDetailsId=66527',
  },
  {
    key: 'thank_you_teacher_lin',
    video: 'https://www.bingo.vip/ad9.mp4',
    poster: '/img/短剧5.png',
    link: 'https://tv.bingo.vip/#/me/detail/detail?id=1255&courseDetailsId=67959',
  },
]

const setDramaVideoRef = (el: HTMLVideoElement | null, index: number) => {
  if (el) {
    dramaVideoRefs.value[index] = el
  }
}

const syncDramaVideos = () => {
  dramaVideoRefs.value.forEach((video, index) => {
    if (!video) return

    if (index === activeDramaIndex.value) {
      const playPromise = video.play()
      if (playPromise) {
        playPromise.catch(() => undefined)
      }
      return
    }

    video.pause()
    video.currentTime = 0
  })
}

const setActiveDrama = (index: number) => {
  activeDramaIndex.value = index
  nextTick(syncDramaVideos)
}

onMounted(() => {
  nextTick(syncDramaVideos)
})
</script>

<template>
  <main class="game-page">
    <div class="container">
      <!-- 1. Top Banner Area -->
      <section class="banner-section">
        <div class="banner-wrapper glass-card">
          <img src="/img/shortPlay.jpg" :alt="t('drama_universe.title')" class="banner-img" />
          <div class="banner-glow-overlay"></div>
        </div>
      </section>

      <!-- 2. Header & Intro block -->
      <section class="intro-section">
        <div class="title-logo-box">
          <span class="logo-text">{{ t('drama_universe.title') }}</span>
        </div>
        <h4 class="intro-subtitle-text">
          {{ t('drama_universe.subtitle') }}
        </h4>
        <p class="intro-desc">
          {{ t('drama_universe.description') }}
        </p>

        <!-- Tags list -->
        <div class="tags-row">
          <div class="tag-item tag-cyan">
            <svg
              class="tag-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
              <path d="M6 12h4m-2-2v4"></path>
              <line x1="15" y1="13" x2="15.01" y2="13"></line>
              <line x1="18" y1="10" x2="18.01" y2="10"></line>
            </svg>
            <span>{{ t('drama_universe.tag_count') }}</span>
          </div>
          <div class="tag-item tag-purple">
            <svg
              class="tag-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="4" width="18" height="16" rx="2"></rect>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <line x1="3" y1="14" x2="21" y2="14"></line>
              <line x1="10" y1="4" x2="10" y2="20"></line>
              <line x1="14" y1="4" x2="14" y2="20"></line>
            </svg>
            <span>{{ t('drama_universe.tag_p2e') }}</span>
          </div>
        </div>
      </section>

      <!-- 3. Two Cards Section -->
      <section class="cards-section">
        <div class="cards-grid">
          <!-- Card 1 -->
          <div class="glass-card feature-card">
            <div class="card-header">
              <div class="icon-wrapper icon-cyan">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
                  ></path>
                </svg>
              </div>
              <h3 class="card-title">{{ t('drama_universe.card_loop_title') }}</h3>
            </div>
            <p class="card-desc">
              {{ t('drama_universe.card_loop_desc') }}
            </p>
          </div>

          <!-- Card 2 -->
          <div class="glass-card feature-card">
            <div class="card-header">
              <div class="icon-wrapper icon-purple">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </div>
              <h3 class="card-title">{{ t('drama_universe.card_term_title') }}</h3>
            </div>
            <p class="card-desc">
              {{ t('drama_universe.card_term_desc') }}
            </p>
          </div>
        </div>
      </section>

      <!-- 4. Featured Dramas Section -->
      <section class="featured-dramas-section">
        <div class="featured-drama-stage">
          <article
            v-for="(drama, index) in featuredDramas"
            :key="drama.key"
            class="featured-drama-card"
            :class="{ 'is-active': activeDramaIndex === index }"
            tabindex="0"
            @mouseenter="setActiveDrama(index)"
            @click="setActiveDrama(index)"
            @focusin="setActiveDrama(index)"
            @keydown.enter.prevent="setActiveDrama(index)"
            @keydown.space.prevent="setActiveDrama(index)"
          >
            <div class="drama-video-frame">
              <span class="drama-video-placeholder" aria-hidden="true">
                {{ t('drama_universe.featured_dramas.video_placeholder') }}
              </span>
              <img
                class="drama-poster"
                :class="{ 'is-hidden': activeDramaIndex === index }"
                :src="drama.poster"
                :alt="t(`drama_universe.featured_dramas.items.${drama.key}.title`)"
              />
              <video
                :ref="(el) => setDramaVideoRef(el as HTMLVideoElement | null, index)"
                class="drama-video"
                :src="drama.video"
                :poster="drama.poster"
                muted
                loop
                playsinline
                controls
                preload="metadata"
              >
                {{ t('drama_universe.featured_dramas.video_unsupported') }}
              </video>
            </div>
            <div class="featured-drama-copy">
              <h3 class="featured-drama-title">
                {{ t(`drama_universe.featured_dramas.items.${drama.key}.title`) }}
              </h3>
              <p class="featured-drama-desc">
                {{ t(`drama_universe.featured_dramas.items.${drama.key}.description`) }}
              </p>
              <a
                :href="drama.link"
                target="_blank"
                rel="noopener noreferrer"
                class="featured-drama-link"
                @click.stop
              >
                {{ t('drama_universe.featured_dramas.watch_now') }}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- 5. Bottom CTA Box -->
      <section class="cta-section">
        <div class="cta-box glass-card">
          <h2 class="cta-slogan">{{ t('drama_universe.slogan') }}</h2>
          <p class="cta-subtitle">
            {{ t('drama_universe.slogan_sub') }}
          </p>
          <a
            href="https://tv.bingo.vip/#/"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-btn"
          >
            {{ t('drama_universe.btn_enter') }}
          </a>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.game-page {
  padding-top: 80px;
  /* Header offset */
  padding-bottom: 96px;
  min-height: calc(100vh - 80px);
  overflow-x: hidden;
  color: var(--text-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 1. Top Banner */
.banner-section {
  margin-top: 40px;
  margin-bottom: 48px;
}

.banner-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 520px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(0, 240, 255, 0.15);
  box-shadow: 0 10px 40px rgba(0, 240, 255, 0.05);
}

@media (max-width: 768px) {
  .banner-wrapper {
    aspect-ratio: 16 / 10;
  }
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.banner-glow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent 60%, rgba(2, 6, 38, 0.8) 100%);
  pointer-events: none;
}

/* 2. Intro Section */
.intro-section {
  margin-bottom: 56px;
  max-width: 900px;
}

.title-logo-box {
  margin-bottom: 24px;
}

.logo-text {
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.intro-subtitle-text {
  font-size: 1.3rem;
  color: var(--accent-cyan);
  margin-bottom: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.intro-desc {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 28px;
  font-weight: 300;
}

.tags-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
}

.tag-icon {
  flex-shrink: 0;
}

.tag-cyan {
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.3);
  color: var(--accent-cyan);
}

.tag-purple {
  background: rgba(139, 92, 246, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: var(--accent-purple);
}

/* 3. Cards Section */
.cards-section {
  margin-bottom: 72px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.feature-card {
  padding: 36px;
  border-radius: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
}

.icon-cyan {
  background: rgba(0, 240, 255, 0.1);
  color: var(--accent-cyan);
  border: 1px solid rgba(0, 240, 255, 0.2);
}

.icon-purple {
  background: rgba(139, 92, 246, 0.1);
  color: var(--accent-purple);
  border: 1px solid rgba(139, 92, 246, 0.2);
}

.card-title {
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff;
}

.card-desc {
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--text-secondary);
  font-weight: 300;
}

/* 4. Featured Dramas Section */
.featured-dramas-section {
  margin-bottom: 80px;
}

.featured-drama-stage {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 34px;
  align-items: center;
}

.featured-drama-card {
  min-width: 0;
  padding: 14px 14px 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.035);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  opacity: 0.72;
  transform: scale(0.9);
  transform-origin: center;
  transition: var(--transition-normal);
  outline: none;
}

.featured-drama-card.is-active {
  position: relative;
  z-index: 2;
  opacity: 1;
  transform: scale(1.04);
  border-color: rgba(0, 168, 255, 0.95);
  background: rgba(255, 255, 255, 0.06);
  box-shadow:
    0 0 0 1px rgba(0, 168, 255, 0.45),
    0 22px 58px rgba(0, 0, 0, 0.28),
    0 0 36px rgba(0, 168, 255, 0.28);
}

.featured-drama-card:focus-visible {
  border-color: rgba(0, 240, 255, 0.85);
  box-shadow:
    0 0 0 2px rgba(0, 240, 255, 0.28),
    0 18px 44px rgba(0, 0, 0, 0.2);
}

.drama-video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04)),
    rgba(255, 255, 255, 0.06);
}

.drama-video-placeholder {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.drama-video {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: transparent;
}

.drama-poster {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.06);
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
}

.drama-poster.is-hidden {
  opacity: 0;
  visibility: hidden;
}

.featured-drama-copy {
  padding: 20px 2px 0;
}

.featured-drama-title {
  margin-bottom: 12px;
  color: #ffffff;
  font-size: 1.18rem;
  font-weight: 800;
  line-height: 1.35;
  text-align: center;
}

.featured-drama-desc {
  display: -webkit-box;
  min-height: 5.4em;
  margin-bottom: 18px;
  overflow: hidden;
  color: var(--text-secondary);
  font-size: 0.92rem;
  font-weight: 300;
  line-height: 1.8;
  text-align: left;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.featured-drama-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 42px;
  color: var(--accent-cyan);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  border: 1px solid rgba(0, 240, 255, 0.22);
  border-radius: 9999px;
  background: rgba(0, 240, 255, 0.07);
  transition: var(--transition-normal);
}

.featured-drama-link:hover {
  color: #ffffff;
  border-color: rgba(0, 240, 255, 0.55);
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(139, 92, 246, 0.28));
}

@media (max-width: 1024px) {
  .featured-drama-stage {
    gap: 22px;
  }

  .featured-drama-card {
    transform: scale(0.94);
  }

  .featured-drama-card.is-active {
    transform: scale(1.02);
  }
}

@media (max-width: 768px) {
  .featured-dramas-section {
    margin-bottom: 60px;
  }

  .featured-drama-stage {
    grid-template-columns: 1fr;
    gap: 28px;
    max-width: 360px;
    margin: 0 auto;
  }

  .featured-drama-card,
  .featured-drama-card.is-active {
    opacity: 1;
    transform: none;
  }

  .featured-drama-title {
    font-size: 1.08rem;
  }
}

/* 5. Bottom CTA */
.cta-section {
  margin-top: 24px;
}

.cta-box {
  padding: 56px 40px;
  border-radius: 24px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background: linear-gradient(135deg, rgba(2, 6, 38, 0.6) 0%, rgba(15, 13, 34, 0.6) 100%);
  position: relative;
  overflow: hidden;
}

.cta-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.cta-slogan {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 36px;
  font-weight: 300;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-btn {
  display: inline-block;
  padding: 16px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%);
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 30px rgba(0, 240, 255, 0.25);
  transition: var(--transition-normal);
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 40px rgba(0, 240, 255, 0.4);
}

@media (max-width: 768px) {
  .cta-box {
    padding: 40px 24px;
  }

  .cta-slogan {
    font-size: 1.7rem;
  }

  .logo-text {
    font-size: 1.4rem;
  }
}
</style>
