<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

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
        <h1 class="privacy-title">{{ t('privacy.title') }}</h1>
        <p class="privacy-subtitle">
          {{ t('privacy.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Document Content -->
    <section class="privacy-content section-padding">
      <div class="container container-narrow">
        <div class="privacy-card glass-card">
          <!-- Simplified Chinese Version -->
          <div v-if="locale === 'zh-CN'">
            <div class="document-section">
              <h2>1. 您的隐私</h2>
              <p>
                Shenzhen Chain Commerce Innovation Network Co.,
                Ltd.（「我们」或「我们的」）在收集、存储、使用、处理和传输个人数据时，尊重您合法的隐私权利，本声明旨在说明我们的隐私政策惯例。我们在收集、持有、使用及/或处理您的个人数据时，会严格遵守香港特别行业区法例的《个人资料（私隐）条例》（第486章）的规定。为此，我们将确保员工遵守最严格的保安及保密标准。
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
                <h3>* 「个人数据」</h3>
                <p>
                  指我们在您寻求我们的产品及/或服务时可能收集的任何可识别个人身份的数据，包括但不限于姓名、电邮地址、邮政地址、性别、电话号码、出生日期、付款数据、身份证明文件类型及号码、职业、收入及教育程度等，借此可直接或间接确定个人身份的数据。
                </p>
              </div>
              <div class="sub-block">
                <h3>* 「非个人数据」</h3>
                <p>
                  包括汇总及/或自动收集的信息，即有关使用产品及/或服务（包括但不限于我们的网站
                  webx.ai
                  及/或移动应用程序）的数据，或有关已移除个人身份识别的用户群组数据。本声明并不限制我们收集、使用及提供非个人数据。
                </p>
              </div>
              <p class="section-intro">
                我们通常会在以下情况收集及存储您的个人数据（包括但不限于）：
              </p>
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
                您在使用我们的网站时，可能会发现连接至其他网站的广告或超链接。如您点击该等链接，即会离开我们的网站。我们对其他网站的隐私保护及
                Cookies
                政策概不负责，建议您查阅该等网站的隐私政策。部分网站可能允许您连接至第三方社交网络平台，在该情况下，我们仅为向您提供连接服务之目的而收集并使用由社交网络平台提供给我们的相关个人数据。
              </p>
            </div>

            <div class="document-section">
              <h2>6. Cookies</h2>
              <p>
                我们的网站可能使用 Google Analytics
                等网络分析服务，透过「Cookies」协助分析用户如何使用网站。Cookie
                是存储于您设备（如计算机）上的小型文本文件，可用于识别计算机或移动设备，但不会收集任何个人数据，亦不具备识别个别用户身份的功能。
              </p>
              <p>
                Cookies
                用于追踪网站流量、改善及客制化您的浏览体验，例如：记录您输入的信息、收集有关您如何使用网站的匿名数据以作改善，以及记录您的偏好以推荐相关内容。如果您使用或继续使用我们的网站，我们将假设您同意我们设置
                Cookies。
              </p>
              <p>
                您可随时更改浏览器设置来拒绝全部或部分 Cookies，但请注意，如删除或限制
                Cookies，您可能无法使用本网站的部分功能。
              </p>
            </div>

            <div class="document-section">
              <h2>7. 保安及存储</h2>
              <p>
                您的个人数据无论以何种方式存储，将仅限获授权的员工或承包商阅览。以电子方式存储的个人数据将保存在安全的服务器上，并进行加密及/或密码保护，网络传输亦会使用
                SSL
                协议进行保护。我们视个人数据为机密信息，所有处理数据的人员均须严格按照本声明行事。
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
                您可随时要求查阅及更正我们记录中与您有关的个人数据，亦可要求我们将您的数据从任何运作中的邮寄名单中删除。如欲行使上述权利，请透过以下地址或电邮与我们联络，并注明「机密」。为核实身份，我们可能会要求您提供若干个人详细数据。我们须于
                40 天内回复您的要求，并可能就依从查阅数据要求收取合理费用。
              </p>
            </div>

            <div class="document-section">
              <h2>10. 个人资料私隐主任</h2>
              <p>
                任何有关 (i) 查阅或更正数据的要求；(ii)
                关于我们对个人数据政策及惯例的一般信息；(iii)
                关于我们持有的个人数据种类；及/或与本声明相关的一般问题及投诉，请联络：
              </p>
              <div class="contact-info-block">
                <p class="company-name">Shenzhen Chain Commerce Innovation Network Co., Ltd.</p>
                <p class="officer">个人资料私隐主任（注明：机密）</p>
                <p><strong>地址：</strong>深圳市南山区科技园·金融基地1栋6楼</p>
                <p>
                  <strong>电邮：</strong
                  ><a href="mailto:Bingo-KF@webx.ai">Bingo-KF@webx.ai</a>
                </p>
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

          <!-- Traditional Chinese Version -->
          <div v-else-if="locale === 'zh-TW'">
            <div class="document-section">
              <h2>1. 您的隱私</h2>
              <p>
                Shenzhen Chain Commerce Innovation Network Co.,
                Ltd.（「我們」或「我們的」）在收集、存儲、使用、處理和傳輸個人數據時，尊重您合法的隱私權利，本聲明旨在說明我們的隱私政策慣例。我們在收集、持有、使用及/或處理您的個人數據時，會嚴格遵守香港特別行政區法例的《個人資料（私隱）條例》（第486章）的規定。為此，我們將確保員工遵守最嚴格的保安及保密標準。
              </p>
              <p>
                請意細閱讀以下內容，以了解我們收集、處理及使用您個人數據的政策和慣例。您向我們提供個人數據，即表示您同意本聲明，並同意我們按本聲明所述收集、使用、轉移、存儲及處理您的個人數據。如您未滿18歲，必須由法定代表（如父母或監護人）代為接受本政策，方可向我們提供任何個人數據。
              </p>
            </div>

            <div class="document-section">
              <h2>2. 收集個人數據</h2>
              <p>
                視乎我們向您提供的產品及/或服務類型，我們可能向您收集兩種基本數據：「個人數據」及「非個人數據」：
              </p>
              <div class="sub-block">
                <h3>* 「個人數據」</h3>
                <p>
                  指我們在您尋求我們的產品及/或服務時可能收集的 any
                  可識別個人身份的數據，包括但不限於姓名、電郵地址、郵政地址、性別、電話號碼、出生日期、付款數據、身份證明文件類型及號碼、職業、收入及教育程度等，藉此可直接或間接確定個人身份的數據。
                </p>
              </div>
              <div class="sub-block">
                <h3>* 「非個人數據」</h3>
                <p>
                  包括匯總及/或自動收集的信息，即有關使用產品及/或服務（包括但不限於我們的網站
                  webx.ai
                  及/或行動應用程式）的數據，或有關已移除個人身份識別的用戶群組數據。本聲明並不限制我們收集、使用及提供非個人數據。
                </p>
              </div>
              <p class="section-intro">
                我們通常會在以下情況收集及存儲您的個人數據（包括但不限於）：
              </p>
              <ul>
                <li>註冊成為會員、享受優惠或使用我們服務的會員計劃、活動及/或服務時；</li>
                <li>使用及/或瀏覽我們的網站及/或行動應用程式時；</li>
                <li>購買及/或使用我們的產品及/或服務，或訂閱我們的通訊材料時；</li>
                <li>參與我們的任何宣傳、推廣或廣告活動時；</li>
                <li>在我們的網站及/或行動應用程式上發布、上傳、創建或生成內容及/或信息時；</li>
                <li>就我們的產品及/或服務要求客戶服務或其他協助時。</li>
              </ul>
            </div>

            <div class="document-section">
              <h2>3. 使用個人目的</h2>
              <p>
                我們使用您個人數據的目的將視乎您向我們尋求的產品及/或服務類型而定。相關目的將於您向我們提供個人數據時的《收集個人資料聲明》（「PICS」）、申請表、條款及細則、網頁或行動應用程式中列明。如您未能提供所需的個人數據，我們可能無法向您提供完整的特定產品或服務。
              </p>
            </div>

            <div class="document-section">
              <h2>4. 披露及轉移個人數據</h2>
              <p>在我們向您收集個人數據的情況下，我們將會：</p>
              <ul>
                <li>通過 PICS 或獨立通知，告知您我們正在收集數據以及該等數據的使用目的；</li>
                <li>在適當情況下，讓您有機會反對我們將個人數據用於特定用途。</li>
              </ul>
            </div>

            <div class="document-section">
              <h2>5. 鏈接至其他網站</h2>
              <p>
                您在使用我們的網站時，可能會發現連接至其他網站的廣告或超鏈接。如您點擊該等鏈接，即會離開我們的網站。我們對其他網站的隱私保護及
                Cookies
                政策概不負責，建議您查閱該等網站的隱私政策。部分網站可能允許您連接至第三方社交網絡平台，在該情況下，我們僅為向您提供連接服務之目的而收集並使用由社交網絡平台提供給我們的相關個人數據。
              </p>
            </div>

            <div class="document-section">
              <h2>6. Cookies</h2>
              <p>
                我們的網站可能使用 Google Analytics
                等網絡分析服務，透過「Cookies」協助分析用戶如何使用網站。Cookie
                是存儲於您設備（如電腦）上的小型文本文件，可用於識別電腦或行動設備，但不會收集任何個人數據，亦不具備識別個別用戶身份的功能。
              </p>
              <p>
                Cookies
                用於追蹤網站流量、改善及客製化您的瀏覽體驗，例如：記錄您輸入的信息、收集有關您如何使用網站的匿名數據以作改善，以及記錄您的偏好以推薦相關內容。如果您使用或繼續使用我們的網站，我們將假設您同意我們設置
                Cookies。
              </p>
              <p>
                您可隨時更改瀏覽器設置來拒絕全部或部分 Cookies，但請注意，如刪除或限制
                Cookies，您可能無法使用本網站的部分功能。
              </p>
            </div>

            <div class="document-section">
              <h2>7. 保安及存儲</h2>
              <p>
                您的個人數據無論以何種方式存儲，將僅限獲授權的員工或承包商查閱。以電子方式存儲的個人數據將保存在安全的伺服器上，並進行加密及/或密碼保護，網絡傳輸亦會使用
                SSL
                協議進行保護。我們視個人數據為機密信息，所有處理數據的人員均須嚴格按照本聲明行事。
              </p>
            </div>

            <div class="document-section">
              <h2>8. 於法律程序中使用個人數據</h2>
              <p>
                如我們因任何原因（包括追討欠款）必須對您採取法律行動，您明確同意我們可依賴您提供的個人數據來識別您身份並對您採取法律行動。
              </p>
            </div>

            <div class="document-section">
              <h2>9. 您查閱及更正個人數據的權利</h2>
              <p>
                您可隨時要求查閱及更正我們記錄中與您有關的個人數據，亦可要求我們將您的數據從任何運作中的郵寄名單中刪除。如欲行使上述權利，請透過以下地址或電郵與我們聯絡，並註明「機密」。為核實身份，我們可能會要求您提供若干個人詳細數據。我們須於
                40 天內回覆您的要求，並可能就依從查閱數據要求收取合理費用。
              </p>
            </div>

            <div class="document-section">
              <h2>10. 個人資料私隱主任</h2>
              <p>
                任何有關 (i) 照閱或更正數據的要求；(ii)
                關於我們對個人數據政策及慣例的一般信息；(iii)
                關於我們持有的個人數據種類；及/或與本聲明相關的一般問題及投訴，請聯絡：
              </p>
              <div class="contact-info-block">
                <p class="company-name">Shenzhen Chain Commerce Innovation Network Co., Ltd.</p>
                <p class="officer">個人資料私隱主任（註明：機密）</p>
                <p><strong>地址：</strong>深圳市南山區科技園·金融基地1棟6樓</p>
                <p>
                  <strong>電郵：</strong
                  ><a href="mailto:Bingo-KF@webx.ai">Bingo-KF@webx.ai</a>
                </p>
              </div>
            </div>

            <div class="document-section">
              <h2>11. 保存個人數據</h2>
              <p>
                您提供的個人數據保留時間，不會超過實現收集數據的目的及其直接相關目的所需的時間。當無需再使用個人數據實現相關目的時，除為符合法律、監管或會計要求，或為保障利益而必須保留外，該等數據將於合理時間內被銷毀。
              </p>
              <p class="final-note">
                本聲明可能會不時修改，任何更改將於本網頁內發布。在發布該等更改後，如您繼續使用我們的網站，即表示您接受有關更改。
              </p>
            </div>
          </div>

          <!-- English Version -->
          <div v-else>
            <div class="document-section">
              <h2>1. Your Privacy</h2>
              <p>
                Shenzhen Chain Commerce Innovation Network Co., Ltd. ("we", "us", or "our")
                respects your legal rights of privacy when collecting, storing, using, processing,
                and transmitting personal data. This statement describes our privacy policy
                practices. We strictly comply with the provisions of the Personal Data (Privacy)
                Ordinance (Chapter 486) of the Laws of the Hong Kong Special Administrative Region.
                We will ensure our staff comply with the most stringent security and confidentiality
                standards.
              </p>
              <p>
                Please read the following carefully to understand our policy and practices regarding
                how your personal data will be treated. By providing your personal data to us, you
                consent to this statement and to the collection, use, transfer, storage, and
                processing of your personal data as described herein. If you are under 18, you must
                obtain consent from your legal representative (such as parents or guardians) before
                providing any personal data to us.
              </p>
            </div>

            <div class="document-section">
              <h2>2. Collection of Personal Data</h2>
              <p>
                Depending on the products and/or services we provide to you, we may collect two
                basic types of data: "Personal Data" and "Non-Personal Data":
              </p>
              <div class="sub-block">
                <h3>* "Personal Data"</h3>
                <p>
                  Refers to any personally identifiable information we may collect when you seek our
                  products and/or services, including but not limited to name, email address, postal
                  address, gender, phone number, date of birth, payment details, identity document
                  type and number, occupation, income, and education level, by which an individual
                  can be directly or indirectly identified.
                </p>
              </div>
              <div class="sub-block">
                <h3>* "Non-Personal Data"</h3>
                <p>
                  Includes aggregated and/or automatically collected information, which is data
                  regarding the use of products and/or services (including but not limited to our
                  website webx.ai and/or mobile applications), or group data of users from which
                  personal identifiers have been removed. This statement does not limit our
                  collection, use, and provision of non-personal data.
                </p>
              </div>
              <p class="section-intro">
                We typically collect and store your personal data in the following situations
                (including but not limited to):
              </p>
              <ul>
                <li>
                  When registering as a member, enjoying benefits, or using our membership programs,
                  campaigns, and/or services;
                </li>
                <li>When using and/or browsing our website and/or mobile applications;</li>
                <li>
                  When purchasing and/or using our products and/or services, or subscribing to our
                  newsletters;
                </li>
                <li>
                  When participating in any of our promotional, marketing, or advertising campaigns;
                </li>
                <li>
                  When posting, uploading, creating, or generating any content and/or information on
                  our website and/or mobile applications;
                </li>
                <li>
                  When requesting customer service or other assistance regarding our products and/or
                  services.
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>3. Purpose of Using Personal Data</h2>
              <p>
                The purposes for which we use your personal data will depend on the type of products
                and/or services you seek from us. Relevant purposes will be set out in the Personal
                Information Collection Statement ("PICS"), application forms, terms and conditions,
                web pages, or mobile applications when you provide your personal data. If you fail
                to provide the required personal data, we may not be able to provide you with the
                complete specific products or services.
              </p>
            </div>

            <div class="document-section">
              <h2>4. Disclosure and Transfer of Personal Data</h2>
              <p>Where we collect personal data from you, we will:</p>
              <ul>
                <li>
                  Inform you via PICS or separate notices that we are collecting data and the
                  purposes for which such data will be used;
                </li>
                <li>
                  Give you the opportunity to object to our use of personal data for specific
                  purposes under appropriate circumstances.
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>5. Links to Other Websites</h2>
              <p>
                When using our website, you may find advertisements or hyperlinks leading to other
                websites. If you click on those links, you will leave our website. We are not
                responsible for the privacy protection and Cookies policies of other websites and
                suggest you check the privacy policy of those sites. Some websites may allow you to
                connect to third-party social networking platforms; in that case, we only collect
                and use relevant personal data provided to us by the social networking platform for
                the purpose of providing connection services to you.
              </p>
            </div>

            <div class="document-section">
              <h2>6. Cookies</h2>
              <p>
                Our website may use web analysis services such as Google Analytics to help analyze
                how users use the site via "Cookies". A Cookie is a small text file stored on your
                device (such as a computer) that can be used to identify computers or mobile devices
                but will not collect any personal data or identify individual user identities.
              </p>
              <p>
                Cookies are used to track website traffic, improve, and customize your browsing
                experience, such as: recording your input, collecting anonymous data on how you use
                the website for improvements, and remembering your preferences to recommend relevant
                content. If you use or continue to use our website, we assume that you agree to our
                setting of Cookies.
              </p>
              <p>
                You can change your browser settings at any time to reject all or some Cookies.
                Please note that if you delete or restrict Cookies, you may not be able to use some
                features of this website.
              </p>
            </div>

            <div class="document-section">
              <h2>7. Security and Storage</h2>
              <p>
                Regardless of how your personal data is stored, it will only be accessed by
                authorized employees or contractors. Personal data stored electronically will be
                saved on secure servers with encryption and/or password protection, and network
                transmissions will be protected using SSL/TLS protocols. We treat personal data as
                confidential information, and all personnel handling the data must act strictly in
                accordance with this statement.
              </p>
            </div>

            <div class="document-section">
              <h2>8. Use of Personal Data in Legal Proceedings</h2>
              <p>
                If we must take legal action against you for any reason (including recovering
                outstanding payments), you explicitly agree that we can rely on the personal data
                you provided to identify you and take legal action against you.
              </p>
            </div>

            <div class="document-section">
              <h2>9. Your Right to Access and Correct Personal Data</h2>
              <p>
                You can request to access and correct your personal data in our records at any time,
                or request us to delete your data from any active mailing lists. To exercise these
                rights, please contact us at the address or email below and mark it as
                "Confidential". To verify your identity, we may request certain personal details. We
                will respond to your request within 40 days and may charge a reasonable fee for
                complying with the data access request.
              </p>
            </div>

            <div class="document-section">
              <h2>10. Personal Data Privacy Officer</h2>
              <p>
                Any requests regarding (i) access to or correction of data; (ii) general information
                about our policies and practices on personal data; (iii) the types of personal data
                we hold; and/or general questions and complaints related to this statement, please
                contact:
              </p>
              <div class="contact-info-block">
                <p class="company-name">Shenzhen Chain Commerce Innovation Network Co., Ltd.</p>
                <p class="officer">Personal Data Privacy Officer (Marked: Confidential)</p>
                <p>
                  <strong>Address: </strong>6/F, Building 1, Financial Base, Science & Technology
                  Park, Nanshan District, Shenzhen, China
                </p>
                <p>
                  <strong>Email: </strong
                  ><a href="mailto:Bingo-KF@webx.ai">Bingo-KF@webx.ai</a>
                </p>
              </div>
            </div>

            <div class="document-section">
              <h2>11. Retention of Personal Data</h2>
              <p>
                Your personal data will not be retained longer than necessary to fulfill the purpose
                of collection and directly related purposes. When it is no longer necessary to use
                personal data to achieve the relevant purposes, unless required to be retained by
                law, regulation, or accounting requirements, or to protect interests, such data will
                be destroyed within a reasonable time.
              </p>
              <p class="final-note">
                This statement may be amended from time to time, and any changes will be posted on
                this page. By continuing to use our website after such changes are posted, you
                indicate your acceptance of the changes.
              </p>
            </div>
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
  background-color: #f9fafb;
}

.container-narrow {
  max-width: 800px;
}

.privacy-card {
  padding: 48px;
  background: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.document-section {
  margin-bottom: 40px;
}

.document-section:last-child {
  margin-bottom: 0;
}

.document-section h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
  border-bottom: 2px solid rgba(79, 70, 229, 0.1);
  padding-bottom: 8px;
}

.document-section p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 16px;
  text-align: justify;
}

.document-section p:last-child {
  margin-bottom: 0;
}

.sub-block {
  margin: 16px 0;
  padding-left: 16px;
  border-left: 3px solid rgba(79, 70, 229, 0.3);
}

.sub-block h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
}

.sub-block p {
  margin-bottom: 0;
}

.section-intro {
  font-weight: 500;
  color: #111827;
  margin-top: 20px;
}

.document-section ul {
  padding-left: 20px;
  margin-bottom: 16px;
}

.document-section li {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 8px;
}

.contact-info-block {
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
}

.contact-info-block p {
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.contact-info-block p:last-child {
  margin-bottom: 0;
}

.contact-info-block .company-name {
  font-weight: 600;
  color: #111827;
}

.contact-info-block .officer {
  color: #4b5563;
}

.contact-info-block a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.contact-info-block a:hover {
  text-decoration: underline;
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
