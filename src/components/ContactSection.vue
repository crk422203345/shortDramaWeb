<script setup lang="ts">
import { ref } from 'vue'
import { contactApi } from '@/api/contact'

const name = ref('')
const company = ref('')
const email = ref('')
const description = ref('')

const isSubmitted = ref(false)
const isLoading = ref(false)
let submitTimer: ReturnType<typeof setTimeout> | null = null

const submitContact = async () => {
  if (isLoading.value) {
    return
  }

  isLoading.value = true

  try {
    await contactApi.submit({
      name: name.value.trim(),
      organization: company.value.trim(),
      email: email.value.trim(),
      message: description.value.trim(),
    })

    isSubmitted.value = true
    name.value = ''
    company.value = ''
    email.value = ''
    description.value = ''
  } catch (error) {
    console.error('[Contact Submit Error]:', error)
    alert(error instanceof Error ? error.message : '提交失败，请稍后重试')
  } finally {
    isLoading.value = false
    submitTimer = null
  }
}

const submitForm = () => {
  if (!name.value.trim() || !company.value.trim() || !email.value.trim() || !description.value.trim()) {
    alert('请填写所有必填字段')
    return
  }

  if (submitTimer) {
    clearTimeout(submitTimer)
  }

  submitTimer = setTimeout(() => {
    void submitContact()
  }, 500)
}
</script>

<template>
  <section id="contact" class="contact-section section-padding">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="bg-text">Contact</span>
        <div class="title-wrap">
          <h2>联系我们</h2>
          <div class="divider-line"></div>
        </div>
        <p class="section-subtitle font-light">
          我们随时欢迎全球战略投资方、内容分发伙伴以及主权牌照持有机构与我们展开多元对话。所有来函通常将在 48 小时内给予回复。
        </p>
      </div>

      <!-- Form Box -->
      <div class="form-container glass-card">
        <transition name="fade-contact" mode="out-in">
          <!-- Submission success panel -->
          <div v-if="isSubmitted" class="success-panel">
            <div class="success-icon-wrap">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>来函发送成功！</h3>
            <p>感谢您的关注与留言，我们的团队将在48小时内为您回复。</p>
            <button class="btn btn-primary btn-purple" @click="isSubmitted = false">再次留言</button>
          </div>

          <!-- Active Form -->
          <form v-else @submit.prevent="submitForm" class="contact-form">
            <!-- Row 1: Name and Company -->
            <div class="form-row two-cols">
              <div class="form-group focus-glow">
                <label for="name">姓名 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="name" 
                  placeholder="请输入您的姓名" 
                  required
                />
              </div>
              <div class="form-group">
                <label for="company">机构/公司 <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="company" 
                  v-model="company" 
                  placeholder="请输入您的机构或公司名称" 
                  required
                />
              </div>
            </div>

            <!-- Row 2: Email -->
            <div class="form-row">
              <div class="form-group">
                <label for="email">邮箱地址 <span class="required">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="email" 
                  placeholder="请输入您的联系邮箱" 
                  required
                />
              </div>
            </div>

            <!-- Row 3: Description -->
            <div class="form-row">
              <div class="form-group">
                <label for="description">合作意向问题或描述 <span class="required">*</span></label>
                <textarea 
                  id="description" 
                  v-model="description" 
                  rows="6" 
                  placeholder="请在此详细描述您的合作意向或具体咨询问题" 
                  required
                ></textarea>
              </div>
            </div>

            <!-- Row 4: Submit Button -->
            <div class="form-submit">
              <button 
                type="submit" 
                class="btn btn-purple-submit"
                :disabled="isLoading"
              >
                <span v-if="isLoading">发送中...</span>
                <span v-else>确 认</span>
              </button>
            </div>
          </form>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: transparent;
  scroll-margin-top: 24px;
}

.font-light {
  font-weight: 300;
  color: var(--text-secondary);
}

/* Form Container Card */
.form-container {
  max-width: 900px;
  margin: 60px auto 0;
  padding: 56px;
  background: rgba(13, 11, 36, 0.4);
  border-radius: 24px;
}

.form-container:hover {
  background: rgba(13, 11, 36, 0.4);
  border-color: var(--card-border);
  box-shadow: none;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.form-row.two-cols {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

.form-group .required {
  color: #ff3b30;
  margin-left: 2px;
}

/* Inputs styling */
.form-group input,
.form-group textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 14px 18px;
  color: #ffffff;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-family: inherit;
}


.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  background: rgba(13, 11, 36, 0.8);
  border-color: #5b21b6;
  box-shadow: 0 0 15px rgba(91, 33, 182, 0.4);
}

/* Showcase glowing border on the first input to match mockup */
.focus-glow input {
  border-color: rgba(91, 33, 182, 0.7);
  box-shadow: 0 0 10px rgba(91, 33, 182, 0.2);
}

/* Submit Button */
.form-submit {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.btn-purple-submit {
  background: #6322cb;
  color: #ffffff;
  border-radius: 9999px;
  padding: 14px 72px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 4px;
  text-indent: 4px; /* balance text center */
  transition: var(--transition-normal);
  box-shadow: 0 4px 15px rgba(99, 34, 203, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.btn-purple-submit:hover:not(:disabled) {
  background: #7633dd;
  box-shadow: 0 6px 20px rgba(118, 51, 221, 0.6);
  transform: translateY(-2px);
}

.btn-purple-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Success panel styling */
.success-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 0;
}

.success-icon-wrap {
  margin-bottom: 24px;
  animation: pulseScale 2s infinite alternate;
}

.success-panel h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 12px;
}

.success-panel p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  max-width: 420px;
  line-height: 1.6;
  margin-bottom: 32px;
}

@keyframes pulseScale {
  0% { transform: scale(0.95); opacity: 0.8; }
  100% { transform: scale(1.05); opacity: 1; }
}

/* Slide/fade animations */
.fade-contact-enter-active,
.fade-contact-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-contact-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-contact-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive design */
@media (max-width: 768px) {
  .form-container {
    padding: 36px;
  }
  .form-row.two-cols {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 24px;
  }
  .btn-purple-submit {
    width: 100%;
    padding: 14px 0;
  }
}
</style>
