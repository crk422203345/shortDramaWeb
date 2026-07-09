<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// Import global styles
import './assets/global.css'
</script>

<template>
  <div class="app-wrapper">
    <!-- Navigation Header -->
    <Header />

    <!-- Routed pages -->
    <router-view />

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
  width: 100%;
  overflow-x: hidden;
  position: relative;
}
</style>
