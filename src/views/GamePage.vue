<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main class="game-page">
    <div class="container">
      <!-- 1. Top Banner Area -->
      <section class="banner-section">
        <div class="banner-wrapper glass-card">
          <img src="/img/bingo_game_banner.jpg" :alt="t('game_universe.title')" class="banner-img" />
          <div class="banner-glow-overlay"></div>
        </div>
      </section>

      <!-- 2. Header & Intro block -->
      <section class="intro-section">
        <div class="title-logo-box">
          <span class="logo-text">{{ t('game_universe.title') }}</span>
        </div>
        <p class="intro-desc">
          {{ t('game_universe.description') }}
        </p>

        <!-- Tags list -->
        <div class="tags-row">
          <div class="tag-item tag-cyan">
            <svg class="tag-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
              <path d="M6 12h4m-2-2v4"></path>
              <line x1="15" y1="13" x2="15.01" y2="13"></line>
              <line x1="18" y1="10" x2="18.01" y2="10"></line>
            </svg>
            <span>{{ t('game_universe.tag_count') }}</span>
          </div>
          <div class="tag-item tag-purple">
            <svg class="tag-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2"></rect>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <line x1="3" y1="14" x2="21" y2="14"></line>
              <line x1="10" y1="4" x2="10" y2="20"></line>
              <line x1="14" y1="4" x2="14" y2="20"></line>
            </svg>
            <span>{{ t('game_universe.tag_p2e') }}</span>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                </svg>
              </div>
              <h3 class="card-title">{{ t('game_universe.card_loop_title') }}</h3>
            </div>
            <p class="card-desc">
              {{ t('game_universe.card_loop_desc') }}
            </p>
          </div>

          <!-- Card 2 -->
          <div class="glass-card feature-card">
            <div class="card-header">
              <div class="icon-wrapper icon-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </div>
              <h3 class="card-title">{{ t('game_universe.card_term_title') }}</h3>
            </div>
            <p class="card-desc">
              {{ t('game_universe.card_term_desc') }}
            </p>
          </div>
        </div>
      </section>

      <!-- 4. Bottom CTA Box -->
      <section class="cta-section">
        <div class="cta-box glass-card">
          <h2 class="cta-slogan">{{ t('game_universe.slogan') }}</h2>
          <p class="cta-subtitle">
            {{ t('game_universe.slogan_sub') }}
          </p>
          <a
            href="https://g.bingo.vip/#/front-page/recommendgame?key=XC9RdtCC"
            target="_blank"
            rel="noopener noreferrer"
            class="cta-btn"
          >
            {{ t('game_universe.btn_enter') }}
          </a>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.game-page {
  padding-top: 80px; /* Header offset */
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
  margin-bottom: 64px;
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

/* 4. Bottom CTA */
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
