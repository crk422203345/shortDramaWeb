<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    title: string
    highlight?: string
    description?: string
    align?: 'left' | 'center'
  }>(),
  {
    highlight: undefined,
    description: undefined,
    align: 'center',
  },
)
</script>

<template>
  <div class="section-heading" :class="`align-${align}`">
    <span class="section-label">{{ label }}</span>
    <h2 class="section-title">
      {{ title }}
      <strong v-if="highlight">{{ highlight }}</strong>
    </h2>
    <p v-if="description" class="section-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.section-heading {
  position: relative;
  z-index: 2;
}

.align-center {
  text-align: center;
}

.align-left {
  text-align: left;
}

.align-left .section-description {
  margin-inline: 0;
}
</style>
