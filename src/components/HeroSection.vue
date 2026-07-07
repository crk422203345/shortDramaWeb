<template>
  <section class="hero-section">
    <!-- Hero Background Image with Overlay -->
    <div class="hero-bg" style="background-image: url('/images/hero_bg.png');">
      <div class="hero-overlay"></div>
    </div>
    
    <!-- Hero Content -->
    <div class="hero-content container">
      <div class="hero-title-wrap">
        <h1 class="hero-title">
          <span class="italic-text">Bingo</span>
          <span class="cross">&times;</span>
          <span class="italic-text">Web3</span>
        </h1>
        <p class="hero-subtitle">全场景娱乐 &nbsp;&nbsp;&nbsp;&nbsp; 一站式精彩</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 28vh;
  overflow: hidden;
  background-color: var(--bg-darker);
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center 30%;
  transform: scale(1.05);
  animation: slowZoom 20s ease-out infinite alternate;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Dark overlay to match mockup. Vignette and bottom gradient */
  background: linear-gradient(
    180deg,
    rgba(8, 6, 23, 0.4) 0%,
    rgba(8, 6, 23, 0.2) 60%,
    rgba(11, 9, 26, 1) 100%
  ), radial-gradient(
    circle at center,
    rgba(11, 9, 26, 0.1) 0%,
    rgba(8, 6, 23, 0.7) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
}

.hero-title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-title {
  font-size: 5.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(79, 70, 229, 0.2);
  line-height: 1.1;
}

.italic-text {
  font-style: italic;
  font-family: Georgia, 'Playfair Display', serif;
  letter-spacing: -2px;
}

.cross {
  font-weight: 300;
  font-size: 4rem;
  opacity: 0.8;
  margin: 0 8px;
  font-family: sans-serif;
  vertical-align: middle;
}

.hero-subtitle {
  font-size: 2rem;
  font-weight: 500;
  font-style: italic;
  color: #ffffff;
  letter-spacing: 12px;
  text-indent: 12px; /* balance centering due to letter-spacing */
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  opacity: 0.95;
  margin-top: 8px;
}

/* Animations */
@keyframes slowZoom {
  0% {
    transform: scale(1.02) translateY(0);
  }
  100% {
    transform: scale(1.08) translateY(-10px);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3.5rem;
    gap: 8px;
  }
  .cross {
    font-size: 2.5rem;
  }
  .hero-subtitle {
    font-size: 1.25rem;
    letter-spacing: 6px;
    text-indent: 6px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.75rem;
  }
  .hero-subtitle {
    font-size: 1rem;
    letter-spacing: 4px;
    text-indent: 4px;
  }
}
</style>
