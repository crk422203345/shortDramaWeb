<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ContactSection from '@/components/ContactSection.vue'

const { t } = useI18n()

const scrollToForm = () => {
  const el = document.getElementById('contact')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToInfo = () => {
  const el = document.getElementById('contact-info')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <main class="contact-page">
    <!-- Contact Hero Section -->
    <section class="contact-hero">
      <div class="container">
        <div class="hero-bg-text">Contact</div>
        <h1 class="contact-page-title">{{ t('contact.intro_title') }}</h1>
        <p class="contact-page-subtitle font-light">
          {{ t('contact.intro_subtitle') }}
        </p>
        <div class="contact-hero-actions">
          <button class="btn btn-primary btn-cyan" @click="scrollToForm">
            {{ t('contact.btn_submit') }}
          </button>
          <button class="btn btn-secondary" @click="scrollToInfo">
            {{ t('contact.btn_info') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Migrated Contact Section -->
    <ContactSection />

    <!-- New Contact Info Section -->
    <section id="contact-info" class="contact-info-section">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <span class="bg-text">Channels</span>
          <div class="title-wrap">
            <h2>{{ t('contact.info_title') }}</h2>
            <div class="divider-line"></div>
          </div>
          <p class="section-subtitle font-light">
            {{ t('contact.info_subtitle') }}
          </p>
        </div>

        <!-- Channels Grid -->
        <div class="info-grid">
          <!-- Business cooperation -->
          <div class="info-card">
            <div class="info-icon-wrap">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="info-icon"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="info-content">
              <h3>{{ t('contact.info_business_title') }}</h3>
              <a href="mailto:Bingo-BD@webx.ai" class="info-link">Bingo-BD@webx.ai</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.contact-page {
  padding-top: 80px; /* Offset for fixed header */
  flex-grow: 1;
  min-height: calc(100vh - 80px);
}

.contact-hero {
  position: relative;
  padding: 96px 0 64px;
  text-align: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.08) 0%, transparent 65%), transparent;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.hero-bg-text {
  font-size: 7rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  letter-spacing: 4px;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 0;
  font-family: Arial, 'Helvetica Neue', sans-serif;
  line-height: 1;
}

.contact-page-title {
  position: relative;
  z-index: 1;
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.contact-page-subtitle {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.9;
  max-width: 640px;
  margin: 0 auto 32px;
}

.font-light {
  font-weight: 300;
}

.contact-hero-actions {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: none;
  outline: none;
}

.btn-primary.btn-cyan {
  background: #00f0ff;
  color: #0c0a24;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.btn-primary.btn-cyan:hover {
  background: #00d2df;
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

/* Contact Info Section */
.contact-info-section {
  padding: 80px 0 120px;
  background: transparent;
}

.section-header {
  text-align: center;
  position: relative;
  margin-bottom: 48px;
}

.section-header .bg-text {
  font-size: 8.5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.015);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  letter-spacing: 10px;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.title-wrap {
  position: relative;
  z-index: 1;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.title-wrap h2 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 2px;
}

.divider-line {
  width: 60px;
  height: 3px;
  background: #00f0ff;
  margin-top: 12px;
  border-radius: 1.5px;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
}

.section-subtitle {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.65);
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.8;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  max-width: 480px;
  margin: 48px auto 0;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.info-card:hover {
  border-color: rgba(0, 240, 255, 0.25);
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
}

.info-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.15);
  color: #00f0ff;
  flex-shrink: 0;
}

.info-icon {
  width: 24px;
  height: 24px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-content h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.info-link {
  font-size: 1.2rem;
  color: #00f0ff;
  text-decoration: underline;
  font-weight: 600;
  transition: all 0.2s ease;
  word-break: break-all;
}

.info-link:hover {
  color: #ffffff;
}

@media (max-width: 768px) {
  .contact-page-title {
    font-size: 2.25rem;
  }
  .contact-page-subtitle {
    font-size: 0.95rem;
  }
  .hero-bg-text {
    font-size: 5rem;
  }
  .info-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .info-card {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .contact-hero {
    padding: 64px 0 40px;
  }
  .contact-page-title {
    font-size: 1.75rem;
  }
  .contact-hero-actions {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
