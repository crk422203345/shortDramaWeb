<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const activeItem = ref('首页')
const menuItems = [
  { label: '首页', href: '#home' },
  { label: '业务模式', href: '#business-mode' },
  { label: '生态布局', href: '#eco-layout' },
]

/* Language dropdown */
const showLanguageDropdown = ref(false)
const selectedLanguage = ref('简体中文')
const languages = ['简体中文', 'English', '繁體中文']
let langTimer: any = null

const selectLanguage = (lang: string) => {
  selectedLanguage.value = lang
  showLanguageDropdown.value = false
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

/* Contact dropdown */
const router = useRouter()
const showContactDropdown = ref(false)
let contactTimer: any = null

const toggleContactDropdown = () => {
  if (contactTimer) clearTimeout(contactTimer)
  showContactDropdown.value = !showContactDropdown.value
}

const openContactDropdown = () => {
  if (contactTimer) clearTimeout(contactTimer)
  showContactDropdown.value = true
}

const closeContactDropdown = () => {
  if (contactTimer) clearTimeout(contactTimer)
  contactTimer = setTimeout(() => {
    showContactDropdown.value = false
  }, 350) // 350ms delay
}

// Go to the contact form at the bottom of the home page.
const goToContact = () => {
  showContactDropdown.value = false
  activeItem.value = '联系我们'
  if (router.currentRoute.value.path === '/') {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      return
    }
  }
  router.push({ path: '/', hash: '#contact' })
}

const goToJoin = () => {
  showContactDropdown.value = false
  activeItem.value = '联系我们'
  router.push('/join')
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
  if (!target.closest('.has-dropdown')) {
    showContactDropdown.value = false
  }
  if (!target.closest('.lang-selector')) {
    showLanguageDropdown.value = false
  }
  if (!target.closest('.more-menu-container')) {
    showMoreDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (langTimer) clearTimeout(langTimer)
  if (contactTimer) clearTimeout(contactTimer)
  if (moreTimer) clearTimeout(moreTimer)
})
</script>

<template>
  <header class="main-header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-area">
        <img src="/img/bingo.png" alt="BINGO文娱" class="logo-img" />
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.label"
            :class="{ active: activeItem === item.label }"
          >
            <a :href="item.href" @click="activeItem = item.label">{{ item.label }}</a>
          </li>

          <!-- Contact with dropdown -->
          <li
            class="has-dropdown"
            :class="{ active: activeItem === '联系我们' }"
            @mouseenter="openContactDropdown"
            @mouseleave="closeContactDropdown"
          >
            <a
              href="javascript:void(0)"
              role="button"
              @click="toggleContactDropdown"
            >
              联系我们
              <svg class="caret" :class="{ rotated: showContactDropdown }" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>

            <transition name="fade">
              <div v-if="showContactDropdown" class="contact-dropdown">
                <div class="contact-dropdown-inner">
                  <div class="dropdown-item" @click="goToContact">洽谈合作</div>
                  <div class="dropdown-item" @click="goToJoin">加入我们</div>
                </div>
              </div>
            </transition>
          </li>
        </ul>
      </nav>

      <!-- Right Actions (Language & Extras) -->
      <div class="header-actions">
        <!-- Language Selector -->
        <div 
          class="lang-selector" 
          @mouseenter="openLanguageDropdown"
          @mouseleave="closeLanguageDropdown"
        >
          <button class="lang-btn" @click="showLanguageDropdown = !showLanguageDropdown">
            <!-- Globe Icon SVG -->
            <svg class="icon-globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>{{ selectedLanguage }}</span>
            <!-- Down Arrow Icon -->
            <svg class="icon-arrow" :class="{ rotated: showLanguageDropdown }" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <button class="more-btn" aria-label="More Menu" @click="showMoreDropdown = !showMoreDropdown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5"/>
              <circle cx="8" cy="12" r="1" fill="currentColor"/>
              <circle cx="12" cy="12" r="1" fill="currentColor"/>
              <circle cx="16" cy="12" r="1" fill="currentColor"/>
            </svg>
          </button>

          <!-- Dropdown items -->
          <transition name="fade">
            <div v-if="showMoreDropdown" class="more-dropdown">
              <div class="more-dropdown-inner">
                <a href="https://webx.ai/" target="_blank" class="dropdown-item" @click="showMoreDropdown = false">
                  WebX 官网
                </a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.main-header {
  position: absolute;
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
  background: #1B192D;
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
  background: #1B192D;
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

.has-dropdown .contact-dropdown {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 140px;
  padding-top: 8px; /* bridges the gap so mouse pointer stays in hover area */
  z-index: 101;
}

.contact-dropdown-inner {
  background: #0f0d22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.has-dropdown .contact-dropdown .dropdown-item {
  padding: 10px 18px;
  font-size: 0.88rem;
  text-align: center;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Responsive Menu */
@media (max-width: 768px) {
  .nav-menu {
    display: none; /* In production we would add a hamburger menu. Since it's a simple layout, we can simplify */
  }
}
</style>
