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
  gap: 22px;
  width: min(100%, 980px);
  margin: 64px auto 0;
  padding: clamp(26px, 3.2vw, 46px);
  border-radius: 28px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

label {
  display: grid;
  gap: 10px;
}

label span {
  color: #98a3af;
  font-size: 12px;
  font-weight: 900;
}

label b {
  color: var(--color-red);
}

input,
textarea {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.35);
  color: var(--color-text);
  font-size: 14.4px;
  font-weight: 650;
  outline: none;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background-color 180ms ease;
}

input {
  height: 54px;
  padding: 0 20px;
}

textarea {
  min-height: 116px;
  resize: vertical;
  padding: 16px 20px;
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
  gap: 10px;
  width: 100%;
  min-height: 56px;
  margin-top: 4px;
  border-radius: 12px;
  background: var(--color-blue);
  color: #001117;
  font-size: 16.8px;
  font-weight: 950;
  box-shadow: 0 14px 42px rgba(19, 185, 255, 0.22);
}

.submit-button svg {
  width: 21px;
  height: 21px;
}

@media (max-width: 760px) {
  .contact-form {
    gap: 18px;
    margin-top: 44px;
    padding: 24px 18px;
    border-radius: 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  input,
  textarea {
    font-size: 13.6px;
  }

  input {
    height: 48px;
    padding-inline: 16px;
  }

  textarea {
    min-height: 104px;
    padding: 14px 16px;
  }

  .submit-button {
    min-height: 50px;
    font-size: 14.4px;
  }
}
</style>
