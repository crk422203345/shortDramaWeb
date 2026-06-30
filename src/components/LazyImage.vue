<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    width?: number
    height?: number
    eager?: boolean
  }>(),
  {
    width: undefined,
    height: undefined,
    eager: false,
  },
)

const rootRef = ref<HTMLElement | null>(null)
const shouldLoad = ref<boolean>(props.eager)
const isLoaded = ref<boolean>(false)
let observer: IntersectionObserver | null = null

const aspectRatio = computed<string | undefined>(() => {
  if (!props.width || !props.height) return undefined
  return `${props.width} / ${props.height}`
})

onMounted(() => {
  if (props.eager || shouldLoad.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      shouldLoad.value = true
      observer?.disconnect()
    },
    { rootMargin: '380px 0px', threshold: 0.01 },
  )

  if (rootRef.value) observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <figure
    ref="rootRef"
    class="lazy-image"
    :class="{ 'is-loaded': isLoaded }"
    :style="{ aspectRatio }"
  >
    <img
      v-if="shouldLoad"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      @load="isLoaded = true"
    />
  </figure>
</template>

<style scoped>
.lazy-image {
  position: relative;
  display: block;
  width: 100%;
  min-height: 240px;
  margin: 0;
  overflow: hidden;
}

.lazy-image::before {
  position: absolute;
  inset: 12%;
  content: '';
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 216, 245, 0.16), transparent 62%);
  filter: blur(24px);
  opacity: 0.75;
}

.lazy-image img {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transform: scale(0.985);
  transition:
    opacity 520ms ease,
    transform 520ms ease;
}

.lazy-image.is-loaded img {
  opacity: 1;
  transform: scale(1);
}
</style>
