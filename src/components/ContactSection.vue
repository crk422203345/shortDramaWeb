<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import type { ContactFormModel, SectionId } from '@/types/landing'

defineProps<{
  id: SectionId
}>()

const form = reactive<ContactFormModel>({
  name: '',
  company: '',
  email: '',
  message: '',
})

const submitted = ref<boolean>(false)

const submitContact = (): void => {
  submitted.value = true
  window.setTimeout(() => {
    submitted.value = false
  }, 3200)
}
</script>

<template>
  <section :id="id" class="contact-section" aria-labelledby="contact-title">
    <div class="section-shell">
      <SectionHeading
        label="联系我们"
        title="开启对话"
        description="我们随时欢迎全球战略投资方、内容分发伙伴以及主权牌照持有机构与我们展开多元对话。所有来函通常将在 48 小时内给予回复。"
      />

      <form class="contact-form glass-panel" @submit.prevent="submitContact">
        <div class="form-row">
          <label>
            <span>姓名 <b>*</b></span>
            <input v-model.trim="form.name" type="text" autocomplete="name" placeholder="您的姓名" required />
          </label>
          <label>
            <span>机构 / 公司 <b>*</b></span>
            <input
              v-model.trim="form.company"
              type="text"
              autocomplete="organization"
              placeholder="机构或公司名称"
              required
            />
          </label>
        </div>

        <label>
          <span>邮箱地址 <b>*</b></span>
          <input v-model.trim="form.email" type="email" autocomplete="email" placeholder="your@email.com" required />
        </label>

        <label>
          <span>合作意向或问题描述 <b>*</b></span>
          <textarea
            v-model.trim="form.message"
            rows="7"
            placeholder="请简要描述您的合作意向、首期开发预算或牌照资源..."
            required
          />
        </label>

        <button class="submit-button" type="submit">
          {{ submitted ? '已收到，我们会尽快联系' : '提交合作意向' }}
          <BaseIcon name="send" />
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: #020607;
}

.contact-form {
  display: grid;
  gap: 34px;
  width: min(100%, 1280px);
  margin: 96px auto 0;
  padding: clamp(34px, 5vw, 72px);
  border-radius: 42px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 34px;
}

label {
  display: grid;
  gap: 14px;
}

label span {
  color: #98a3af;
  font-size: 17px;
  font-weight: 900;
}

label b {
  color: var(--color-red);
}

input,
textarea {
  width: 100%;
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: rgba(0, 0, 0, 0.35);
  color: var(--color-text);
  font-size: 22px;
  font-weight: 650;
  outline: none;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease;
}

input {
  height: 84px;
  padding: 0 34px;
}

textarea {
  min-height: 188px;
  resize: vertical;
  padding: 28px 34px;
}

input::placeholder,
textarea::placeholder {
  color: #3e4954;
}

input:focus,
textarea:focus {
  border-color: rgba(0, 216, 245, 0.62);
  background: rgba(0, 216, 245, 0.035);
  box-shadow: 0 0 0 4px rgba(0, 216, 245, 0.08);
}

.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  min-height: 86px;
  margin-top: 8px;
  border-radius: 18px;
  background: var(--color-blue);
  color: #001117;
  font-size: 25px;
  font-weight: 950;
  box-shadow: 0 22px 62px rgba(19, 185, 255, 0.26);
}

.submit-button svg {
  width: 29px;
  height: 29px;
}

@media (max-width: 760px) {
  .contact-form {
    margin-top: 60px;
    border-radius: 28px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  input,
  textarea {
    font-size: 17px;
  }

  input {
    height: 62px;
    padding-inline: 20px;
  }

  textarea {
    min-height: 150px;
    padding: 20px;
  }

  .submit-button {
    min-height: 62px;
    font-size: 18px;
  }
}
</style>
