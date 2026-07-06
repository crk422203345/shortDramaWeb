<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ContactSection from '@/components/ContactSection.vue'
import EcosystemSection from '@/components/EcosystemSection.vue'
import ExpansionSection from '@/components/ExpansionSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import MarketSection from '@/components/MarketSection.vue'
import PillarsSection from '@/components/PillarsSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useI18n } from '@/i18n'
import type { SectionId } from '@/types/landing'

const { copy } = useI18n()
const activeSection = ref<SectionId>('home')
const sectionIds: readonly SectionId[] = ['home', 'market', 'business', 'ecosystem', 'global', 'contact']
let scrollTicking = false

const activeNavId = computed<SectionId>(() => {
  if (activeSection.value === 'market') return 'home'
  if (activeSection.value === 'global') return 'ecosystem'
  return activeSection.value
})

const isSectionId = (value: string): value is SectionId => {
  return sectionIds.includes(value as SectionId)
}

const scrollToSection = (sectionId: SectionId): void => {
  activeSection.value = sectionId
  const target = document.getElementById(sectionId)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const updateActiveSection = (): void => {
  const activationLine = window.innerHeight * 0.38
  let current: SectionId = 'home'
  sectionIds.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section && section.getBoundingClientRect().top <= activationLine) {
      current = sectionId
    }
  })
  activeSection.value = current
}

const handleScroll = (): void => {
  if (scrollTicking) return
  scrollTicking = true
  window.requestAnimationFrame(() => {
    updateActiveSection()
    scrollTicking = false
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  updateActiveSection()

  const hashId = window.location.hash.replace('#', '')
  if (isSectionId(hashId)) {
    window.requestAnimationFrame(() => scrollToSection(hashId))
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <SiteHeader :items="copy.navItems" :active-id="activeNavId" @navigate="scrollToSection" />

  <main class="landing-page">
    <HeroSection id="home" @navigate="scrollToSection" />
    <MarketSection id="market" />
    <PillarsSection id="business" />
    <EcosystemSection id="ecosystem" />
    <ExpansionSection id="global" />
    <ContactSection id="contact" />
  </main>

  <SiteFooter />
</template>
