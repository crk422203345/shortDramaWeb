<script setup lang="ts">
import { ref } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useI18n } from '@/i18n'
import type { Locale } from '@/i18n'
import type { NavItem, SectionId } from '@/types/landing'

defineProps<{
  items: readonly NavItem[]
  activeId: SectionId
}>()

const emit = defineEmits<{
  navigate: [sectionId: SectionId]
}>()

const { activeLocaleOption, copy, locale, localeOptions, setLocale } = useI18n()
const isMenuOpen = ref<boolean>(false)
const isLanguageMenuOpen = ref<boolean>(false)

const closeMenus = (): void => {
  isMenuOpen.value = false
  isLanguageMenuOpen.value = false
}

const handleNavigate = (sectionId: SectionId): void => {
  closeMenus()
  emit('navigate', sectionId)
}

const handleSelectLocale = (nextLocale: Locale): void => {
  setLocale(nextLocale)
  closeMenus()
}
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <button class="brand" type="button" :aria-label="copy.header.backHomeLabel" @click="handleNavigate('home')">
        <span class="brand-main">{{ copy.header.brand }}</span>
        <span class="brand-badge">WEB3</span>
      </button>

      <nav class="desktop-nav" :aria-label="copy.header.desktopNavLabel">
        <button
          v-for="item in items"
          :key="item.id"
          class="nav-link"
          :class="{ active: activeId === item.id }"
          type="button"
          @click="handleNavigate(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <div class="header-actions">
        <div class="language-picker">
          <button
            class="language-button"
            type="button"
            :aria-expanded="isLanguageMenuOpen"
            :aria-label="copy.header.languageAriaLabel"
            @click="isLanguageMenuOpen = !isLanguageMenuOpen"
          >
            <BaseIcon name="globe" />
            <span>{{ activeLocaleOption.label }}</span>
            <span class="chevron" :class="{ open: isLanguageMenuOpen }" />
          </button>

          <Transition name="language-pop">
            <div v-if="isLanguageMenuOpen" class="language-menu" role="listbox">
              <button
                v-for="option in localeOptions"
                :key="option.code"
                class="language-option"
                :class="{ active: locale === option.code }"
                type="button"
                role="option"
                :aria-selected="locale === option.code"
                @click="handleSelectLocale(option.code)"
              >
                <span>{{ option.nativeLabel }}</span>
                <small>{{ option.code }}</small>
              </button>
            </div>
          </Transition>
        </div>

        <button
          class="menu-button"
          type="button"
          :aria-expanded="isMenuOpen"
          :aria-label="copy.header.openMenuLabel"
          @click="isMenuOpen = !isMenuOpen"
        >
          <BaseIcon name="menu" />
        </button>
      </div>
    </div>

    <Transition name="slide-fade">
      <nav v-if="isMenuOpen" class="mobile-nav" :aria-label="copy.header.mobileNavLabel">
        <button
          v-for="item in items"
          :key="item.id"
          class="mobile-link"
          :class="{ active: activeId === item.id }"
          type="button"
          @click="handleNavigate(item.id)"
        >
          {{ item.label }}
        </button>

        <div class="mobile-language-list" :aria-label="copy.header.languageAriaLabel">
          <button
            v-for="option in localeOptions"
            :key="option.code"
            class="mobile-link mobile-language"
            :class="{ active: locale === option.code }"
            type="button"
            @click="handleSelectLocale(option.code)"
          >
            <BaseIcon name="globe" />
            {{ option.nativeLabel }}
          </button>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background: linear-gradient(180deg, rgba(3, 7, 10, 0.92), rgba(3, 7, 10, 0.66) 72%, transparent);
  backdrop-filter: blur(18px);
}

.header-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: min(calc(100% - var(--page-gutter) * 2), 1560px);
  height: 100%;
  margin-inline: auto;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
  padding: 0;
  background: transparent;
  color: var(--color-text);
}

.brand-main {
  font-size: 22.4px;
  font-weight: 950;
  line-height: 1;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  min-height: 31px;
  padding-inline: 12px;
  border: 1px solid rgba(0, 216, 245, 0.48);
  border-radius: 6px;
  color: var(--color-cyan);
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 10.4px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(22px, 2.4vw, 42px);
  margin-right: clamp(24px, 3vw, 58px);
}

.nav-link {
  position: relative;
  padding: 10px 0;
  background: transparent;
  color: #6f7781;
  font-size: 13.6px;
  font-weight: 800;
  transition: color 180ms ease;
}

.nav-link::after {
  position: absolute;
  right: 0;
  bottom: 2px;
  left: 0;
  height: 2px;
  content: '';
  background: var(--color-cyan);
  opacity: 0;
  transform: scaleX(0.3);
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-text);
}

.nav-link.active::after {
  opacity: 1;
  transform: scaleX(1);
}

.header-actions {
  display: inline-flex;
  align-items: center;
  gap: 24px;
}

.language-picker {
  position: relative;
}

.language-button,
.menu-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-cyan);
}

.language-button {
  gap: 10px;
  min-height: 44px;
  padding: 0 24px;
  border: 1px solid rgba(0, 216, 245, 0.46);
  border-radius: 999px;
  background: rgba(0, 164, 196, 0.1);
  font-size: 11.2px;
  font-weight: 900;
}

.language-button svg {
  width: 20px;
  height: 20px;
}

.chevron {
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: translateY(-2px) rotate(45deg);
  transition: transform 180ms ease;
}

.chevron.open {
  transform: translateY(2px) rotate(225deg);
}

.language-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  display: grid;
  width: 180px;
  gap: 6px;
  padding: 10px;
  border: 1px solid rgba(0, 216, 245, 0.28);
  border-radius: 14px;
  background: rgba(6, 12, 15, 0.98);
  box-shadow: var(--shadow-panel);
}

.language-option {
  display: flex;
  min-height: 40px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: #93a0ad;
  font-size: 12px;
  font-weight: 850;
}

.language-option small {
  color: #53606d;
  font-family: var(--font-mono);
  font-size: 9.6px;
}

.language-option:hover,
.language-option:focus-visible,
.language-option.active {
  border-color: rgba(0, 216, 245, 0.5);
  background: rgba(0, 216, 245, 0.12);
  color: var(--color-cyan);
  outline: none;
}

.language-option.active::after {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  content: '';
  background: var(--color-cyan);
  box-shadow: 0 0 12px rgba(0, 216, 245, 0.72);
}

.menu-button {
  width: 50px;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: #cfd8df;
}

.menu-button svg {
  width: 28px;
  height: 28px;
}

.mobile-nav {
  display: none;
}

.language-pop-enter-active,
.language-pop-leave-active {
  transition: all 0.18s ease;
}

.language-pop-enter-from,
.language-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

@media (max-width: 980px) {
  .header-inner {
    width: min(calc(100% - var(--page-gutter) * 2), 720px);
  }

  .desktop-nav {
    display: none;
  }

  .brand-main {
    font-size: 17.6px;
  }

  .brand-badge {
    min-height: 26px;
    font-size: 9.6px;
  }

  .language-picker {
    display: none;
  }

  .header-actions {
    justify-self: end;
  }

  .mobile-nav {
    position: fixed;
    top: calc(var(--header-height) - 8px);
    right: var(--page-gutter);
    left: auto;
    width: 220px;
    display: grid;
    gap: 8px;
    padding: 16px;
    border: 1px solid var(--color-line);
    border-radius: 16px;
    background: rgba(6, 12, 15, 0.96);
    box-shadow: var(--shadow-panel);
    transform-origin: top right;
  }

  .mobile-link {
    min-height: 46px;
    border-radius: 10px;
    background: transparent;
    color: #9ba8b4;
    font-weight: 800;
    text-align: left;
    padding-inline: 14px;
  }

  .mobile-language-list {
    display: grid;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .mobile-language {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .mobile-language svg {
    width: 18px;
    height: 18px;
  }

  .mobile-link.active {
    background: rgba(0, 216, 245, 0.12);
    color: var(--color-cyan);
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
}
</style>
