<script setup lang="ts">
import { footerGroups } from '@/data/landing'
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <strong>Bingo文娱</strong>
        <p>次世代 Web3 娱乐生态系统</p>
      </div>

      <div v-for="group in footerGroups" :key="group.title" class="footer-group">
        <h2>{{ group.title }} <span>/ {{ group.english }}</span></h2>
        <a v-for="link in group.links" :key="link" href="#home">{{ link }}</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: #020406;
}

.footer-inner {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 80px;
  width: min(calc(100% - var(--page-gutter) * 2), 1560px);
  min-height: 230px;
  margin-inline: auto;
  padding: 76px 0 62px;
}

.footer-brand strong {
  color: var(--color-text);
  font-size: 19.2px;
  font-weight: 950;
}

.footer-brand p {
  margin: 24px 0 0;
  color: #323b46;
  font-size: 11.2px;
  font-weight: 900;
  letter-spacing: 0.1em;
}

.footer-group {
  display: grid;
  align-content: start;
  gap: 18px;
}

.footer-group h2 {
  margin: 0 0 4px;
  color: #7e8994;
  font-size: 10.4px;
  font-weight: 950;
  letter-spacing: 0.1em;
}

.footer-group h2 span {
  color: #9da8b3;
  font-family: Consolas, monospace;
}

.footer-group a {
  width: fit-content;
  color: #717b86;
  font-size: 13.6px;
  font-weight: 750;
}

.footer-group a:hover {
  color: var(--color-cyan);
}

@media (max-width: 760px) {
  .footer-inner {
    grid-template-columns: 1fr;
    width: min(calc(100% - var(--page-gutter) * 2), 420px);
    gap: 44px;
    padding: 56px 0;
  }
}
</style>
