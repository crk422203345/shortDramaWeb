<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <footer class="main-footer">
    <div class="container footer-container-inner">
      <!-- Left side: Brand Logo -->
      <div class="footer-brand">
        <div class="logo-area">
          <img src="/img/bingo.png" alt="BINGO文娱" class="logo-img" />
        </div>
      </div>

      <!-- Right side: Columns -->
      <div class="footer-columns">
        <div class="footer-column">
          <h4>{{ t('footer.follow_us') }}</h4>
          <ul>
            <li>
              <a href="https://webx.ai/" target="_blank" rel="noopener noreferrer">{{
                t('footer.webx')
              }}</a>
            </li>
            <li>
              <a href="https://tv.bingo.vip/#/" target="_blank" rel="noopener noreferrer">{{
                t('footer.drama')
              }}</a>
            </li>
            <li>
              <a
                href="https://g.bingo.vip/#/front-page/recommendgame?key=XC9RdtCC"
                target="_blank"
                rel="noopener noreferrer"
                >{{ t('footer.game') }}</a
              >
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>{{ t('footer.legal_info') }}</h4>
          <ul>
            <li>
              <RouterLink :to="{ name: 'privacy' }" target="_blank">{{
                t('footer.privacy')
              }}</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'terms' }" target="_blank">{{
                t('footer.terms')
              }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background-color: #020626;
  padding: 80px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.footer-container-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
}

/* Logo styling */
.logo-area {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 166px;
  height: auto;
  display: block;
}

/* Columns layout */
.footer-columns {
  display: flex;
  gap: 120px; /* space between columns to match mockup */
  flex-wrap: wrap;
}

.footer-column h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.footer-column ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-column a {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.6);
  transition: var(--transition-normal);
  font-weight: 300;
  padding: 4px 0;
  display: inline-block;
}

.footer-column a:hover {
  color: var(--accent-cyan);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-container-inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-columns {
    gap: 60px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .footer-columns {
    gap: 40px;
    flex-direction: column;
  }
}
</style>
