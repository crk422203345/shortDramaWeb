<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import ProductsSection from '@/components/ProductsSection.vue'
import MarketDynamicsSection from '@/components/MarketDynamicsSection.vue'
import BusinessPillarsSection from '@/components/BusinessPillarsSection.vue'
import GlobalPlanningSection from '@/components/GlobalPlanningSection.vue'
import EcoLayoutSection from '@/components/EcoLayoutSection.vue'
</script>

<template>
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

      <!-- 6. Ecological Layout -->
      <EcoLayoutSection />

      <!-- 5. Global Planning Layout -->
      <GlobalPlanningSection />
    </div>
  </main>
</template>

<style scoped>
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
