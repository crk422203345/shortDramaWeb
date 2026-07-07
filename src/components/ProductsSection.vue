<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref(2) // Card 3 (index 2) is active by default

const cards = [
  { id: 1, name: '苍穹神女', img: '/images/char_1.png' },
  { id: 2, name: '琉璃仙子', img: '/images/char_2.png' },
  { id: 3, name: '九天玄女', img: '/images/char_3.png' },
  { id: 4, name: '凌风剑客', img: '/images/char_4.png' },
  { id: 5, name: '幽冥圣女', img: '/images/char_5.png' }
]
</script>

<template>
  <section class="products-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="bg-text">Product</span>
        <div class="title-wrap">
          <h2>旗下平台产品</h2>
          <div class="divider-line"></div>
        </div>
      </div>

      <!-- Character Cards Container -->
      <div class="cards-container">
        <div 
          v-for="(card, index) in cards" 
          :key="card.id" 
          class="character-card"
          :class="{ active: activeIndex === index }"
          @mouseenter="activeIndex = index"
        >
          <div class="card-inner">
            <img :src="card.img" :alt="card.name" class="character-img" />
            <div class="card-overlay">
              <div class="card-info">
                <span class="card-title">{{ card.name }}</span>
                <div class="divider"></div>
                <span class="learn-more">了解更多 &gt;</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="cta-buttons">
        <button class="btn btn-primary btn-purple">了解我们</button>
        <button class="btn btn-secondary btn-outline-purple">浅谈合作</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-section {
  background: transparent;
  position: relative;
}

/* Cards layout */
.cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 60px 0;
  height: 480px;
  perspective: 1000px;
}

.character-card {
  flex: 1;
  max-width: 190px;
  height: 380px;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
}

.character-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(15, 13, 43, 0.95) 0%,
    rgba(15, 13, 43, 0.4) 40%,
    rgba(15, 13, 43, 0) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.card-info {
  text-align: center;
  width: 100%;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 1px;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
  margin: 12px auto;
  width: 50%;
  transition: width 0.4s ease;
}

.learn-more {
  font-size: 0.85rem;
  color: var(--accent-cyan);
  opacity: 0.9;
  letter-spacing: 0.5px;
}

/* Active Highlight Styling */
.character-card.active {
  flex: 1.3;
  max-width: 250px;
  height: 440px;
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 45px rgba(79, 70, 229, 0.3), 0 0 30px rgba(0, 240, 255, 0.1);
}

.character-card.active .character-img {
  transform: scale(1.05);
}

.character-card.active .card-overlay {
  opacity: 1;
}

.character-card.active .card-info {
  transform: translateY(0);
}

.character-card.active .divider {
  width: 80%;
}

/* CTA buttons section */
.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 48px;
}

.btn-purple {
  background: #3b259d;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 15px rgba(59, 37, 157, 0.4);
  padding: 14px 44px;
}

.btn-purple:hover {
  background: #4b30c3;
  box-shadow: 0 6px 20px rgba(75, 48, 195, 0.6);
  transform: translateY(-2px);
}

.btn-outline-purple {
  border: 1px solid rgba(75, 48, 195, 0.6);
  background: transparent;
  color: #ffffff;
  padding: 14px 44px;
}

.btn-outline-purple:hover {
  background: rgba(75, 48, 195, 0.1);
  border-color: rgba(75, 48, 195, 1);
  transform: translateY(-2px);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .cards-container {
    height: auto;
    flex-wrap: wrap;
    align-items: stretch;
  }
  
  .character-card {
    flex: none;
    width: calc(33.33% - 14px);
    height: 320px;
    max-width: none;
  }
  
  .character-card.active {
    flex: none;
    width: calc(33.33% - 14px);
    height: 320px;
    max-width: none;
  }
}

@media (max-width: 640px) {
  .character-card, 
  .character-card.active {
    width: calc(50% - 10px);
    height: 280px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .btn-purple, .btn-outline-purple {
    width: 100%;
    max-width: 280px;
  }
}

@media (max-width: 400px) {
  .character-card, 
  .character-card.active {
    width: 100%;
    height: 300px;
  }
}
</style>
