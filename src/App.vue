<script setup lang="ts">
import Header from './components/Header.vue'
import HeroSection from './components/HeroSection.vue'
import ProductsSection from './components/ProductsSection.vue'
import MarketDynamicsSection from './components/MarketDynamicsSection.vue'
import BusinessPillarsSection from './components/BusinessPillarsSection.vue'
import GlobalPlanningSection from './components/GlobalPlanningSection.vue'
import EcoLayoutSection from './components/EcoLayoutSection.vue'
import ContactSection from './components/ContactSection.vue'
import Footer from './components/Footer.vue'

// Import global styles
import './assets/global.css'
</script>

<template>
  <div class="app-wrapper">
    <!-- Navigation Header -->
    <Header />

    <!-- Main Page Sections -->
    <main>
      <!-- 1. Hero Section -->
      <div class="hero-wrapper">
        <HeroSection />
      </div>

      <!-- Remaining sections pulled up to bottom-third of hero -->
      <div class="sections-wrapper">
        <!-- 2. Product Section -->
        <ProductsSection />

        <!-- 3. Market Pain Points and Opportunities -->
        <MarketDynamicsSection />

        <!-- 4. Three Core Business Pillars -->
        <BusinessPillarsSection />

        <!-- 5. Global Planning Layout -->
        <GlobalPlanningSection />

        <!-- 6. Ecological Layout -->
        <EcoLayoutSection />

        <!-- 7. Contact Us -->
        <ContactSection />
      </div>
    </main>

    <!-- Footer Area -->
    <Footer />
  </div>
</template>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
  color: var(--text-primary);
}

main {
  flex-grow: 1;
}

.hero-wrapper {
  position: relative;
  z-index: 1;
}

/* Pull all sections up so they start at 2/5 from the bottom of the hero (60vh from top) */
.sections-wrapper {
  position: relative;
  z-index: 2;
  margin-top: -40vh;
}
</style>
