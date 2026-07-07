<script setup lang="ts">
import { ref } from 'vue'

const activeItem = ref('首页')
const menuItems = ['首页', '业务模式', '生态布局', '联系我们']
const showLanguageDropdown = ref(false)
const selectedLanguage = ref('简体中文')
const languages = ['简体中文', 'English', '繁體中文']

const selectLanguage = (lang: string) => {
  selectedLanguage.value = lang
  showLanguageDropdown.value = false
}
</script>

<template>
  <header class="main-header">
    <div class="header-container">
      <!-- Logo Section -->
      <div class="logo-area">
        <div class="logo-icon">
          <!-- Inline SVG representing double circle with controller & play icon -->
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" stroke="white" stroke-width="2"/>
            <circle cx="18" cy="18" r="12" stroke="white" stroke-width="1" stroke-dasharray="2 2"/>
            <!-- Game controller D-Pad -->
            <path d="M11 18H15M13 16V20" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <!-- Play button -->
            <path d="M21 15L26 18L21 21V15Z" fill="white"/>
          </svg>
        </div>
        <span class="logo-text">BINGO文娱</span>
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <ul>
          <li 
            v-for="item in menuItems" 
            :key="item" 
            :class="{ active: activeItem === item }"
            @click="activeItem = item"
          >
            <a href="javascript:void(0)">{{ item }}</a>
          </li>
        </ul>
      </nav>

      <!-- Right Actions (Language & Extras) -->
      <div class="header-actions">
        <!-- Language Selector -->
        <div class="lang-selector" @mouseleave="showLanguageDropdown = false">
          <button class="lang-btn" @click="showLanguageDropdown = !showLanguageDropdown">
            <!-- Globe Icon SVG -->
            <svg class="icon-globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>{{ selectedLanguage }}</span>
            <!-- Down Arrow Icon -->
            <svg class="icon-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <!-- Dropdown items -->
          <transition name="fade">
            <div v-if="showLanguageDropdown" class="lang-dropdown">
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
          </transition>
        </div>

        <!-- 3 Dots Menu Button -->
        <button class="more-btn" aria-label="More Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5"/>
            <circle cx="8" cy="12" r="1" fill="currentColor"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
            <circle cx="16" cy="12" r="1" fill="currentColor"/>
          </svg>
        </button>
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
  gap: 12px;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #ffffff 0%, #d1d5db 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

.lang-btn:focus .icon-arrow {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 130px;
  background: #0f0d22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  z-index: 101;
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

.more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: var(--transition-normal);
  padding: 4px;
}

.more-btn:hover {
  color: #ffffff;
  transform: scale(1.05);
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
