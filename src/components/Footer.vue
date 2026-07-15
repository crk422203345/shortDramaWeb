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
        <div class="footer-column">
          <h4>{{ t('footer.social_media') }}</h4>
          <div class="social-links-row">
            <a
              href="https://www.youtube.com/@Webx_Bingo"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon-btn"
              aria-label="YouTube"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25a29 29 0 0 0-.46-5.33z"
                ></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a
              href="https://x.com/webx_bingo"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon-btn"
              aria-label="X (Twitter)"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/webx_bingo"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon-btn"
              aria-label="Instagram"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://xhslink.com/m/6Om7cU4vsxp"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon-btn"
              aria-label="小红书 (Xiaohongshu)"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="6" ry="6"></rect>
                <path d="M9 17v-10h3.5a2.5 2.5 0 1 1 0 5H9m3.5 0L15 17"></path>
              </svg>
            </a>
            <a
              href="https://weibo.com/webxbingo"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon-btn"
              aria-label="微博 (Weibo)"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                <circle cx="12" cy="12" r="1"></circle>
                <path d="M17 7a6 6 0 0 0-4-4"></path>
              </svg>
            </a>
          </div>
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

.social-links-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.footer-column .social-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.5);
  transition: var(--transition-normal);
  padding: 0;
}

.footer-column .social-icon-btn:hover {
  color: var(--accent-cyan);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 240, 255, 0.25);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.15);
  transform: translateY(-2px);
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
