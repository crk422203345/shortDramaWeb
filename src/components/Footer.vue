<template>
  <footer class="main-footer">
    <div class="container footer-container-inner">
      <!-- Left side: Brand Logo -->
      <div class="footer-brand">
        <div class="logo-area">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" stroke="white" stroke-width="2"/>
            <circle cx="18" cy="18" r="12" stroke="white" stroke-width="1" stroke-dasharray="2 2"/>
            <path d="M11 18H15M13 16V20" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M21 15L26 18L21 21V15Z" fill="white"/>
          </svg>
          <span class="logo-text">BINGO文娱</span>
        </div>
      </div>
      
      <!-- Right side: Columns -->
      <div class="footer-columns">
        <div class="footer-column">
          <h4>关注我们</h4>
          <ul>
            <li><a href="javascript:void(0)">WebX 官网</a></li>
            <li><a href="javascript:void(0)">短剧平台</a></li>
            <li><a href="javascript:void(0)">小游戏平台</a></li>
            <li><a href="javascript:void(0)">UGC 社交平台</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>法律信息</h4>
          <ul>
            <li><a href="javascript:void(0)">法律条款</a></li>
            <li><a href="javascript:void(0)">隐私政策</a></li>
            <li><a href="javascript:void(0)">媒体资源</a></li>
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
  gap: 12px;
}

.logo-text {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
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
