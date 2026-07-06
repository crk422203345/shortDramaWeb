<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { useI18n } from '@/i18n'
import type { ContactFormModel, SectionId } from '@/types/landing'

defineProps<{
  id: SectionId
}>()

const SUBMISSION_FEEDBACK_DURATION_MS = 3200

const { copy } = useI18n()
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
  }, SUBMISSION_FEEDBACK_DURATION_MS)
}
</script>

<template>
  <section :id="id" class="contact-section" aria-labelledby="contact-title">
    <div class="section-shell">
      <SectionHeading
        :label="copy.contact.heading.label"
        :title="copy.contact.heading.title"
        :description="copy.contact.heading.description"
      />

      <form class="contact-form glass-panel" @submit.prevent="submitContact">
        <div class="form-row">
          <label>
            <span>{{ copy.contact.nameLabel }} <b>*</b></span>
            <input v-model.trim="form.name" type="text" autocomplete="name" :placeholder="copy.contact.namePlaceholder" required />
          </label>
          <label>
            <span>{{ copy.contact.companyLabel }} <b>*</b></span>
            <input
              v-model.trim="form.company"
              type="text"
              autocomplete="organization"
              :placeholder="copy.contact.companyPlaceholder"
              required
            />
          </label>
        </div>

        <label>
          <span>{{ copy.contact.emailLabel }} <b>*</b></span>
          <input v-model.trim="form.email" type="email" autocomplete="email" :placeholder="copy.contact.emailPlaceholder" required />
        </label>

        <label>
          <span>{{ copy.contact.messageLabel }} <b>*</b></span>
          <textarea v-model.trim="form.message" rows="7" :placeholder="copy.contact.messagePlaceholder" required />
        </label>

        <button class="submit-button" type="submit">
          {{ submitted ? copy.contact.submitDone : copy.contact.submitIdle }}
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
