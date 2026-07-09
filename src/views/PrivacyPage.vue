<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Ensure we are scrolled to the top when page opens
  window.scrollTo({ top: 0 })
})
</script>

<template>
  <main class="privacy-page">
    <!-- Hero Title -->
    <section class="privacy-hero">
      <div class="container">
        <div class="hero-bg-text">Privacy</div>
        <h1 class="privacy-title">隐私政策声明</h1>
        <p class="privacy-subtitle">
          我们致力于保护您的个人数据隐私，以下说明我们收集、使用及保护个人数据的政策 and 惯例。
        </p>
      </div>
    </section>

    <!-- Document Content -->
    <section class="privacy-content section-padding">
      <div class="container container-narrow">
        <div class="privacy-card glass-card">
          <div class="document-section">
            <h2>1. 您的隐私</h2>
            <p>
              Shenzhen Chain Commerce Innovation Network Co., Ltd.（「WebX」、「我们」或「我们的」）在收集、存储、使用、处理和传输个人数据时，尊重您合法的隐私权利，本声明旨在说明我们的隐私政策惯例。我们在收集、持有、使用及/或处理您的个人数据时，会严格遵守香港特别行政区法例的《个人资料（私隐）条例》（第486章）的规定。为此，我们将确保员工遵守最严格的保安及保密标准。
            </p>
            <p>
              请仔细阅读以下内容，以了解我们收集、处理及使用您个人数据的政策和惯例。您向我们提供个人数据，即表示您同意本声明，并同意我们按本声明所述收集、使用、转移、存储及处理您的个人数据。如您未满18岁，必须由法定代表（如父母或监护人）代为接受本政策，方可向我们提供任何个人数据。
            </p>
          </div>

          <div class="document-section">
            <h2>2. 收集个人数据</h2>
            <p>
              视乎我们向您提供的产品及/或服务类型，我们可能向您收集两种基本数据：「个人数据」及「非个人数据」：
            </p>
            <div class="sub-block">
              <h3>● 「个人数据」</h3>
              <p>
                指我们在您寻求我们的产品及/或服务时可能收集的任何可识别个人身份的数据，包括但不限于姓名、电邮地址、邮政地址、性别、电话号码、出生日期、付款数据、身份证明文件类型及号码、职业、收入及教育程度等，借此可直接或间接确定个人身份的数据。
              </p>
            </div>
            <div class="sub-block">
              <h3>● 「非个人数据」</h3>
              <p>
                包括汇总及/或自动收集的信息，即有关使用产品及/或服务（包括但不限于我们的网站 webx.ai 及/或移动应用程序）的数据，或有关已移除个人身份识别的用户群组数据。本声明并不限制我们收集、使用及提供非个人数据。
              </p>
            </div>
            <p class="section-intro">我们通常会在以下情况收集及存储您的个人数据（包括但不限于）：</p>
            <ul>
              <li>注册成为会员、享受优惠或使用我们服务的会员计划、活动及/或服务时；</li>
              <li>使用及/或浏览我们的网站及/或移动应用程序时；</li>
              <li>购买及/或使用我们的产品及/或服务，或订阅我们的通讯材料时；</li>
              <li>参与我们的任何宣传、推广或广告活动时；</li>
              <li>在我们的网站及/或移动应用程序上发布、上传、创建或生成任何内容及/或信息时；</li>
              <li>就我们的产品及/或服务要求客户服务或其他协助时。</li>
            </ul>
          </div>

          <div class="document-section">
            <h2>3. 使用个人数据的目的</h2>
            <p>
              我们使用您个人数据的目的将视乎您向我们寻求的产品及/或服务类型而定。相关目的将于您向我们提供个人数据时的《收集个人资料声明》（「PICS」）、申请表、条款及细则、网页或移动应用程序中列明。如您未能提供所需的个人数据，我们可能无法向您提供完整的特定产品或服务。
            </p>
          </div>

          <div class="document-section">
            <h2>4. 披露及转移个人数据</h2>
            <p>在我们向您收集个人数据的情况下，我们将会：</p>
            <ul>
              <li>通过 PICS 或独立通知，告知您我们正在收集数据以及该等数据的使用目的；</li>
              <li>在适当情况下，让您有机会反对我们将个人数据用于特定用途。</li>
            </ul>
          </div>

          <div class="document-section">
            <h2>5. 链接至其他网站</h2>
            <p>
              您在使用我们的网站时，可能会发现连接至其他网站的广告或超链接。如您点击该等链接，即会离开我们的网站。我们对其他网站的隐私保护及 Cookies 政策概不负责，建议您查阅该等网站的隐私政策。部分网站可能允许您连接至第三方社交网络平台，在该情况下，我们仅为向您提供连接服务之目的而收集并使用由社交网络平台提供给我们的相关个人数据。
            </p>
          </div>

          <div class="document-section">
            <h2>6. Cookies</h2>
            <p>
              我们的网站可能使用 Google Analytics 等网络分析服务，透过「Cookies」协助分析用户如何使用网站。Cookie 是存储于您设备（如计算机）上的小型文本文件，可用于识别计算机或移动设备，但不会收集任何个人数据，亦不具备识别个别用户身份的功能。
            </p>
            <p>
              Cookies 用于追踪网站流量、改善及客制化您的浏览体验，例如：记录您输入的信息、收集有关您如何使用网站的匿名数据以作改善，以及记录您的偏好以推荐相关内容。如果您使用或继续使用我们的网站，我们将假设您同意我们设置 Cookies。
            </p>
            <p>
              您可随时更改浏览器设置来拒绝全部或部分 Cookies，但请注意，如删除或限制 Cookies，您可能无法使用本网站的部分功能。
            </p>
          </div>

          <div class="document-section">
            <h2>7. 保安及存储</h2>
            <p>
              您的个人数据无论以何种方式存储，将仅限获授权的员工或承包商查阅。以电子方式存储的个人数据将保存在安全的服务器上，并进行加密及/或密码保护，网络传输亦会使用 SSL 协议进行保护。我们视个人数据为机密信息，所有处理数据的人员均须严格按照本声明行事。
            </p>
          </div>

          <div class="document-section">
            <h2>8. 于法律程序中使用个人数据</h2>
            <p>
              如我们因任何原因（包括追讨欠款）必须对您采取法律行动，您明确同意我们可依赖您提供的个人数据来识别您身份并对您采取法律行动。
            </p>
          </div>

          <div class="document-section">
            <h2>9. 您查阅及更正个人数据的权利</h2>
            <p>
              您可随时要求查阅及更正我们记录中与您有关的个人数据，亦可要求我们将您的数据从任何运作中的邮寄名单中删除。如欲行使上述权利，请透过以下地址或电邮与我们联络，并注明「机密」。为核实身份，我们可能会要求您提供若干个人详细数据。我们须于 40 天内回复您的要求，并可能就依从查阅数据要求收取合理费用。
            </p>
          </div>

          <div class="document-section">
            <h2>10. 个人资料私隐主任</h2>
            <p>
              任何有关 (i) 查阅或更正数据的要求；(ii) 关于我们对个人数据政策及惯例的一般信息；(iii) 关于我们持有的个人数据种类；及/或与本声明相关的一般问题及投诉，请联络：
            </p>
            <div class="contact-info-block">
              <p class="company-name">Shenzhen Chain Commerce Innovation Network Co., Ltd.</p>
              <p class="officer">个人资料私隐主任（注明：机密）</p>
              <p><strong>地址：</strong>深圳市南山区科技园·金融基地1栋6楼</p>
              <p><strong>电邮：</strong><a href="mailto:webx65313176@gmail.com">webx65313176@gmail.com</a></p>
            </div>
          </div>

          <div class="document-section">
            <h2>11. 保存个人数据</h2>
            <p>
              您提供的个人数据保留时间，不会超过实现收集数据的目的及其直接相关目的所需的时间。当无需再使用个人数据来实现相关目的时，除为符合法律、监管或会计要求，或为保障利益而必须保留外，该等数据将于合理时间内被销毁。
            </p>
            <p class="final-note">
              本声明可能会不时修改，任何更改将于本网页内发布。在发布该等更改后，如您继续使用我们的网站，即表示您接受有关更改。
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.privacy-page {
  padding-top: 80px;
  flex-grow: 1;
  background-color: #ffffff;
  color: #111827;
}

.privacy-hero {
  position: relative;
  padding: 96px 0 64px;
  text-align: center;
  overflow: hidden;
  background: radial-gradient(circle at 50% 30%, rgba(79, 70, 229, 0.05) 0%, transparent 60%);
  border-bottom: 1px solid #f3f4f6;
}

.hero-bg-text {
  font-size: 7rem;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.03);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: capitalize;
  letter-spacing: 2px;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 0;
  font-family: Arial, sans-serif;
  line-height: 1;
}

.privacy-title {
  position: relative;
  z-index: 1;
  font-size: 3rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.privacy-subtitle {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  color: #4b5563;
  line-height: 1.9;
  font-weight: 300;
  letter-spacing: 0.5px;
  max-width: 560px;
  margin: 0 auto;
}

.privacy-content {
  padding-top: 48px;
  padding-bottom: 96px;
}

.container-narrow {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 20px;
}

.privacy-card {
  padding: 48px;
  border-radius: 24px;
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03) !important;
}

.document-section {
  margin-bottom: 40px;
}

.document-section:last-child {
  margin-bottom: 0;
}

.document-section h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 18px;
  border-left: 3px solid #8b5cf6;
  padding-left: 14px;
  letter-spacing: 0.5px;
}

.document-section p {
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.8;
  margin-bottom: 16px;
  font-weight: 300;
  text-align: justify;
}

.sub-block {
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  border-left: 2px solid #e5e7eb;
}

.sub-block h3 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.sub-block p {
  margin-bottom: 0;
  font-size: 0.9rem;
  color: #4b5563;
}

.section-intro {
  margin-top: 20px;
  font-weight: 600;
  color: #111827;
}

.document-section ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.document-section li {
  font-size: 0.92rem;
  color: #374151;
  line-height: 1.6;
  font-weight: 300;
}

.contact-info-block {
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
  border-radius: 16px;
  padding: 24px;
  margin-top: 16px;
}

.contact-info-block p {
  margin-bottom: 10px;
}

.contact-info-block p:last-child {
  margin-bottom: 0;
}

.company-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
}

.officer {
  font-size: 0.95rem;
  color: #4f46e5;
  font-weight: 600;
}

.contact-info-block a {
  color: #4f46e5;
  text-decoration: underline;
  transition: opacity 0.3s;
}

.contact-info-block a:hover {
  opacity: 0.8;
}

.final-note {
  font-style: italic;
  color: #6b7280;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .privacy-title {
    font-size: 2.25rem;
  }
  .privacy-card {
    padding: 32px;
  }
  .hero-bg-text {
    font-size: 5rem;
  }
}

@media (max-width: 480px) {
  .privacy-card {
    padding: 20px;
  }
  .privacy-title {
    font-size: 1.8rem;
  }
  .hero-bg-text {
    font-size: 3.5rem;
  }
}
</style>
