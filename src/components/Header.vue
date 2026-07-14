<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { syncHtmlLang } from '@/i18n'

const { t, locale } = useI18n()

const route = useRoute()
const router = useRouter()
const isMinimalHeader = computed(() => route.name === 'privacy' || route.name === 'terms')

const activeItem = ref('home')

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

watch(
  () => route.name,
  (name) => {
    if (name === 'contact') {
      activeItem.value = 'contact'
    } else if (name === 'home') {
      const hash = route.hash
      if (hash === '#business-mode') activeItem.value = 'business'
      else if (hash === '#eco-layout') activeItem.value = 'eco'
      else activeItem.value = 'home'
    } else if (name === 'game' || name === 'drama' || name === 'social') {
      activeItem.value = 'eco'
    } else {
      activeItem.value = ''
    }
  },
  { immediate: true },
)

const navigateTo = (item: { key: string; href: string; isRoute?: boolean; isStatic?: boolean }) => {
  if (item.isStatic) {
    return
  }
  activeItem.value = item.key
  closeMobileMenu()
  if (item.isRoute) {
    router.push({ name: item.key })
  } else {
    const hash = item.href
    if (route.name === 'home') {
      // Already on home – just smooth scroll to section
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // On another page (e.g. /join) – navigate home then scroll to section
      router.push({ name: 'home', hash })
    }
  }
}

/* Eco dropdown */
const showEcoDropdown = ref(false)
let ecoTimer: any = null

const openEcoDropdown = () => {
  if (ecoTimer) clearTimeout(ecoTimer)
  showEcoDropdown.value = true
}

const closeEcoDropdown = () => {
  if (ecoTimer) clearTimeout(ecoTimer)
  ecoTimer = setTimeout(() => {
    showEcoDropdown.value = false
  }, 350)
}

const clickEcoSub = (type: string) => {
  showEcoDropdown.value = false
  closeMobileMenu()
  if (type === 'game') {
    activeItem.value = 'eco'
    router.push({ name: 'game' })
  } else if (type === 'drama') {
    activeItem.value = 'eco'
    router.push({ name: 'drama' })
  } else if (type === 'social') {
    activeItem.value = 'eco'
    router.push({ name: 'social' })
  }
}

/* Language dropdown */
const showLanguageDropdown = ref(false)
const langMap: Record<string, string> = {
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  en: 'English',
  ms: 'Bahasa Melayu',
}
const selectedLanguage = computed(() => {
  return langMap[locale.value] || '简体中文'
})
const languages = ['简体中文', '繁體中文', 'English', 'Bahasa Melayu']
let langTimer: any = null

const selectLanguage = (lang: string) => {
  const reverseMap: Record<string, string> = {
    简体中文: 'zh-CN',
    繁體中文: 'zh-TW',
    English: 'en',
    'Bahasa Melayu': 'ms',
  }
  const targetLocale = reverseMap[lang]
  if (targetLocale) {
    locale.value = targetLocale
    localStorage.setItem('user-language', targetLocale)
    syncHtmlLang(targetLocale as any)

    // Redirect to prefixed URL
    const cleanPath = route.fullPath.replace(/^\/(zh-CN|zh-TW|en|ms)/, '')
    const targetPath = `/${targetLocale}${cleanPath === '/' ? '' : cleanPath}`
    router.push({ path: targetPath })
  }
  showLanguageDropdown.value = false
}

const selectLanguageAndClose = (lang: string) => {
  selectLanguage(lang)
  closeMobileMenu()
}

const openLanguageDropdown = () => {
  if (langTimer) clearTimeout(langTimer)
  showLanguageDropdown.value = true
}

const closeLanguageDropdown = () => {
  if (langTimer) clearTimeout(langTimer)
  langTimer = setTimeout(() => {
    showLanguageDropdown.value = false
  }, 350) // 350ms delay to prevent accidental mouseleave closes
}

/* More menu dropdown */
const showMoreDropdown = ref(false)
let moreTimer: any = null

const openMoreDropdown = () => {
  if (moreTimer) clearTimeout(moreTimer)
  showMoreDropdown.value = true
}

const closeMoreDropdown = () => {
  if (moreTimer) clearTimeout(moreTimer)
  moreTimer = setTimeout(() => {
    showMoreDropdown.value = false
  }, 350)
}

// Global click outside to close dropdowns
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.lang-selector')) {
    showLanguageDropdown.value = false
  }
  if (!target.closest('.more-menu-container')) {
    showMoreDropdown.value = false
  }
  if (!target.closest('.eco-wrapper')) {
    showEcoDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.body.style.overflow = ''
  if (langTimer) clearTimeout(langTimer)
  if (moreTimer) clearTimeout(moreTimer)
  if (ecoTimer) clearTimeout(ecoTimer)
})
</script>

<template>
  <header class="main-header" :class="{ 'privacy-header': isMinimalHeader }">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-area">
        <img src="/img/bingo.png" alt="BINGO文娱" class="logo-img" />
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu" v-if="!isMinimalHeader">
        <ul>
          <li :class="{ active: activeItem === 'home' }">
            <a href="javascript:void(0)" @click.prevent="navigateTo({ key: 'home', href: '#home' })">{{ t('nav.home') }}</a>
          </li>
          <li :class="{ active: activeItem === 'business' }">
            <a href="javascript:void(0)" @click.prevent="navigateTo({ key: 'business', href: '#business-mode' })">{{ t('nav.business') }}</a>
          </li>

          <!-- Eco dropdown menu -->
          <li
            class="has-dropdown"
            :class="{ active: activeItem === 'eco' }"
          >
            <div
              class="eco-wrapper"
              @mouseenter="openEcoDropdown"
              @mouseleave="closeEcoDropdown"
            >
              <a href="javascript:void(0)" role="button">
                {{ t('nav.eco') }}
                <svg
                  class="caret"
                  :class="{ rotated: showEcoDropdown }"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>

              <transition name="fade">
                <div v-if="showEcoDropdown" class="eco-dropdown">
                  <div class="eco-dropdown-inner">
                    <a href="javascript:void(0)" class="dropdown-item" @click="clickEcoSub('game')">{{ t('nav.eco_game') }}</a>
                    <a href="javascript:void(0)" class="dropdown-item" @click="clickEcoSub('drama')">{{ t('nav.eco_drama') }}</a>
                    <a href="javascript:void(0)" class="dropdown-item" @click="clickEcoSub('social')">{{ t('nav.eco_social') }}</a>
                    <a href="https://webx.ai/" target="_blank" rel="noopener noreferrer" class="dropdown-item" @click="showEcoDropdown = false">webx</a>
                    <a href="https://www.winpay.com/#/" target="_blank" rel="noopener noreferrer" class="dropdown-item" @click="showEcoDropdown = false">winpay</a>
                  </div>
                </div>
              </transition>
            </div>
          </li>

          <li :class="{ active: activeItem === 'inquiry' }">
            <a href="javascript:void(0)" @click.prevent="navigateTo({ key: 'inquiry', href: 'javascript:void(0)', isStatic: true })">{{ t('nav.inquiry') }}</a>
          </li>
          <li :class="{ active: activeItem === 'contact' }">
            <a href="javascript:void(0)" @click.prevent="navigateTo({ key: 'contact', href: '/contact', isRoute: true })">{{ t('nav.contact') }}</a>
          </li>
        </ul>
      </nav>

      <!-- Right Actions (Language & Extras) -->
      <div class="header-actions" v-if="!isMinimalHeader">
        <!-- Language Selector -->
        <div
          class="lang-selector"
          @mouseenter="openLanguageDropdown"
          @mouseleave="closeLanguageDropdown"
        >
          <button class="lang-btn" @click="showLanguageDropdown = !showLanguageDropdown">
            <!-- Globe Icon SVG -->
            <svg
              class="icon-globe"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path
                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              ></path>
            </svg>
            <span>{{ selectedLanguage }}</span>
            <!-- Down Arrow Icon -->
            <svg
              class="icon-arrow"
              :class="{ rotated: showLanguageDropdown }"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <!-- Dropdown items -->
          <transition name="fade">
            <div v-if="showLanguageDropdown" class="lang-dropdown">
              <div class="lang-dropdown-inner">
                <div
                  v-for="lang in languages"
                  :key="lang"
                  class="dropdown-item"
                  :class="{ active: lang === selectedLanguage }"
                  @click="selectLanguage(lang)"
                >
                  {{ lang }}
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 3 Dots Menu Button -->
        <div
          class="more-menu-container"
          @mouseenter="openMoreDropdown"
          @mouseleave="closeMoreDropdown"
        >
          <button
            class="more-btn"
            aria-label="More Menu"
            @click="showMoreDropdown = !showMoreDropdown"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5" />
              <circle cx="8" cy="12" r="1" fill="currentColor" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="16" cy="12" r="1" fill="currentColor" />
            </svg>
          </button>

          <!-- Dropdown items -->
          <transition name="fade">
            <div v-if="showMoreDropdown" class="more-dropdown">
              <div class="more-dropdown-inner">
                <a
                  href="https://webx.ai/"
                  target="_blank"
                  class="dropdown-item"
                  @click="showMoreDropdown = false"
                >
                  {{ t('footer.webx') }}
                </a>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- Hamburger Button (Mobile Only) -->
      <button
        v-if="!isMinimalHeader"
        class="hamburger-btn"
        :class="{ active: isMobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="Toggle Menu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <!-- Mobile Drawer Menu (Mobile Only) -->
    <transition name="drawer-fade">
      <div v-if="isMobileMenuOpen && !isMinimalHeader" class="mobile-drawer">
        <div class="drawer-content">
          <ul class="drawer-nav">
            <li :class="{ active: activeItem === 'home' }">
              <a href="javascript:void(0)" @click.prevent="navigateTo({ key: 'home', href: '#home' })">{{ t('nav.home') }}</a>
            </li>
            <li :class="{ active: activeItem === 'business' }">
              <a href="javascript:void(0)" @click.prevent="navigateTo({ key: 'business', href: '#business-mode' })">{{ t('nav.business') }}</a>
            </li>

            <!-- Eco Layout collapsible submenu inside mobile drawer -->
            <li :class="{ active: activeItem === 'eco' }">
              <div class="drawer-section-title">{{ t('nav.eco') }}</div>
              <div class="drawer-submenu">
                <a href="javascript:void(0)" class="drawer-subitem" @click="clickEcoSub('game')">{{ t('nav.eco_game') }}</a>
                <a href="javascript:void(0)" class="drawer-subitem" @click="clickEcoSub('drama')">{{ t('nav.eco_drama') }}</a>
                <a href="javascript:void(0)" class="drawer-subitem" @click="clickEcoSub('social')">{{ t('nav.eco_social') }}</a>
                <a href="https://webx.ai/" target="_blank" rel="noopener noreferrer" class="drawer-subitem" @click="closeMobileMenu">webx</a>
                <a href="https://www.winpay.com/#/" target="_blank" rel="noopener noreferrer" class="drawer-subitem" @click="closeMobileMenu">winpay</a>
              </div>
            </li>

            <li :class="{ active: activeItem === 'inquiry' }">
              <a href="javascript:void(0)" @click.prevent="navigateTo({ key: 'inquiry', href: 'javascript:void(0)', isStatic: true })">{{ t('nav.inquiry') }}</a>
            </li>
            <li :class="{ active: activeItem === 'contact' }">
              <a href="javascript:void(0)" @click.prevent="navigateTo({ key: 'contact', href: '/contact', isRoute: true })">{{ t('nav.contact') }}</a>
            </li>
          </ul>

          <div class="drawer-divider"></div>

          <!-- Language Selector inside Drawer -->
          <div class="drawer-language">
            <div class="drawer-section-title">语言 / Language</div>
            <div class="drawer-lang-options">
              <button
                v-for="lang in languages"
                :key="lang"
                class="drawer-lang-btn"
                :class="{ active: lang === selectedLanguage }"
                @click="selectLanguageAndClose(lang)"
              >
                {{ lang }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgba(11, 9, 26, 0.4);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 100;
  display: flex;
  align-items: center;
}

/* Override header background on privacy page */
.main-header.privacy-header {
  position: fixed;
  background: #020626;
  backdrop-filter: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
}

/* Logo Area */
.logo-area {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 176px;
  height: auto;
  display: block;
}

/* Navigation Menu */
.nav-menu {
  margin-left: auto;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  gap: 40px;
}

.nav-menu li {
  position: relative;
  padding: 8px 0;
  cursor: pointer;
  transition: var(--transition-normal);
}

.nav-menu li a {
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  transition: var(--transition-normal);
  letter-spacing: 0.5px;
}

.nav-menu li:hover a,
.nav-menu li.active a {
  color: #ffffff;
}

.nav-menu li::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #ffffff;
  transition: var(--transition-normal);
  transform: translateX(-50%);
}

.nav-menu li:hover::after,
.nav-menu li.active::after {
  width: 100%;
}

/* Actions Section */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.lang-selector {
  position: relative;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 9999px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  transition: var(--transition-normal);
  cursor: pointer;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.35);
  color: #ffffff;
}

.icon-globe {
  opacity: 0.7;
}

.icon-arrow {
  opacity: 0.5;
  transition: transform 0.3s ease;
}

.icon-arrow.rotated {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 130px;
  padding-top: 8px; /* bridges the gap so mouse pointer stays in hover area */
  z-index: 101;
}

.lang-dropdown-inner {
  background: #0f0d22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.dropdown-item {
  padding: 10px 16px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: var(--transition-normal);
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

.dropdown-item.active {
  background: rgba(79, 70, 229, 0.3);
  color: var(--accent-cyan);
  font-weight: 500;
}

/* Specific active/hover style for language selector items */
.lang-dropdown-inner .dropdown-item:hover,
.lang-dropdown-inner .dropdown-item.active {
  background: #1b192d;
  color: #ffffff;
  font-weight: 500;
}

.more-menu-container {
  position: relative;
  display: flex;
  align-items: center;
}

.more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: var(--transition-normal);
  padding: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.more-btn:hover {
  color: #ffffff;
  transform: scale(1.05);
}

.more-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 140px;
  padding-top: 8px; /* gap bridge */
  z-index: 101;
}

.more-dropdown-inner {
  background: #0f0d22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.more-dropdown-inner .dropdown-item {
  display: block;
  text-decoration: none;
  text-align: center;
  padding: 10px 18px;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.75);
  transition: var(--transition-normal);
}

.more-dropdown-inner .dropdown-item:hover {
  background: #1b192d;
  color: #ffffff;
}

/* Contact dropdown */
.has-dropdown > a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.caret {
  opacity: 0.5;
  transition: transform 0.3s ease;
}

.caret.rotated {
  transform: rotate(180deg);
}

.contact-wrapper,
.eco-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.has-dropdown .contact-dropdown,
.has-dropdown .eco-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 140px;
  padding-top: 6px;
  z-index: 101;
}

.contact-dropdown-inner,
.eco-dropdown-inner {
  background: #0f0d22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.has-dropdown .contact-dropdown .dropdown-item,
.has-dropdown .eco-dropdown .dropdown-item {
  padding: 10px 18px;
  font-size: 0.88rem;
  text-align: center;
  display: block;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Hamburger Button */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
}

.hamburger-btn .bar {
  width: 100%;
  height: 2px;
  background-color: #ffffff;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Transform to X on active */
.hamburger-btn.active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger-btn.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Drawer styles */
.mobile-drawer {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background: rgba(11, 9, 26, 0.95);
  backdrop-filter: blur(20px);
  z-index: 105;
  display: flex;
  flex-direction: column;
  padding: 40px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.drawer-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto;
}

.drawer-nav {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.drawer-nav li a {
  display: block;
  padding: 8px 0;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition-normal);
}

.drawer-nav li.active > a,
.drawer-nav li a:hover {
  color: var(--accent-cyan);
}

.drawer-section-title {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
}

.drawer-submenu {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 12px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 8px;
}

.drawer-subitem {
  display: block;
  padding: 6px 0;
  font-size: 1rem !important;
  color: rgba(255, 255, 255, 0.8) !important;
  text-decoration: none;
  font-weight: 400 !important;
}

.drawer-subitem:hover {
  color: var(--accent-cyan) !important;
}

.drawer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.drawer-lang-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.drawer-lang-btn {
  padding: 10px 20px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition-normal);
}

.drawer-lang-btn.active {
  background: #382189;
  border-color: #382189;
  color: #ffffff;
}

/* Drawer transitions */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Menu */
@media (max-width: 1024px) {
  .nav-menu,
  .header-actions {
    display: none !important;
  }

  .hamburger-btn {
    display: flex;
    margin-left: auto;
  }
}

@media (min-width: 1025px) {
  .mobile-drawer {
    display: none !important;
  }
}
</style>
