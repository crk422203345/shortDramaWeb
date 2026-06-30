<script setup lang="ts">
import type { IconName } from '@/types/landing'

defineProps<{
  name: IconName
  decorative?: boolean
}>()
</script>

<template>
  <svg
    v-if="name === 'globe'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.3 2.4 3.4 5.4 3.4 9S14.3 18.6 12 21M12 3C9.7 5.4 8.6 8.4 8.6 12S9.7 18.6 12 21" />
  </svg>
  <svg
    v-else-if="name === 'play'"
    viewBox="0 0 24 24"
    fill="currentColor"
    :aria-hidden="decorative ?? true"
  >
    <path d="M8 5.7c0-1.3 1.5-2.1 2.6-1.3l8.8 6.3c1 .7 1 2.2 0 2.9l-8.8 6.2C9.5 20.5 8 19.8 8 18.4V5.7Z" />
  </svg>
  <svg
    v-else-if="name === 'gamepad'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M7.2 8h9.6a4.2 4.2 0 0 1 4.1 3.4l.7 4.1a3.1 3.1 0 0 1-5.4 2.5l-1.4-1.6H9.2L7.8 18a3.1 3.1 0 0 1-5.4-2.5l.7-4.1A4.2 4.2 0 0 1 7.2 8Z" />
    <path d="M7.5 12h4M9.5 10v4M16.5 11.5h.1M18.5 14h.1" />
  </svg>
  <svg
    v-else-if="name === 'users'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M15.8 20v-1.8a4 4 0 0 0-4-4H7.5a4 4 0 0 0-4 4V20" />
    <circle cx="9.7" cy="7.5" r="3.5" />
    <path d="M20.5 20v-1.8a4 4 0 0 0-3-3.9M15.5 4.2a3.5 3.5 0 0 1 0 6.7" />
  </svg>
  <svg
    v-else-if="name === 'wallet'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M4 7.5V18a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-7.5a2 2 0 0 0-2-2H6a2 2 0 0 1 0-4h11" />
    <path d="M17 14h.1" />
  </svg>
  <svg
    v-else-if="name === 'growth'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2.2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m4 16 5-5 3.5 3.5L20 7" />
    <path d="M15 7h5v5" />
  </svg>
  <svg
    v-else-if="name === 'shield'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M12 3 5 6v5.5c0 4.3 2.8 7.4 7 9.5 4.2-2.1 7-5.2 7-9.5V6l-7-3Z" />
    <path d="M12 8v4M12 16h.1" />
  </svg>
  <svg
    v-else-if="name === 'compass'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
  <svg
    v-else-if="name === 'bank'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M4 10h16M5 20h14M6 10v8M10 10v8M14 10v8M18 10v8M12 3l8 5H4l8-5Z" />
  </svg>
  <svg
    v-else-if="name === 'send'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="m21 3-7.3 18-4-8.7L1 8.3 21 3Z" />
    <path d="M10 13 21 3" />
  </svg>
  <svg
    v-else-if="name === 'mail'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M4 6h16v12H4z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
  <svg
    v-else-if="name === 'menu'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2.4"
    stroke-linecap="round"
  >
    <path d="M5 7h14M5 12h14M5 17h14" />
  </svg>
  <svg
    v-else-if="name === 'arrow'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2.4"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
  <svg
    v-else-if="name === 'spark'"
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M12 3v5M12 16v5M3 12h5M16 12h5M7.5 7.5 5.8 5.8M16.5 16.5l1.7 1.7M16.5 7.5l1.7-1.7M7.5 16.5l-1.7 1.7" />
  </svg>
  <svg
    v-else
    viewBox="0 0 24 24"
    fill="none"
    :aria-hidden="decorative ?? true"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.2 1.2" />
    <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.2-1.2" />
  </svg>
</template>
