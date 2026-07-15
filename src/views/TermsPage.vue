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
        <div class="hero-bg-text">Terms</div>
        <h1 class="privacy-title">{{ t('footer.terms') }}</h1>
        <p class="privacy-subtitle">
          {{
            locale === 'en'
              ? 'Please read these terms carefully before using our website.'
              : locale === 'ms'
                ? 'Sila baca terma ini dengan teliti sebelum menggunakan laman web kami.'
                : locale === 'zh-TW'
                  ? '請在存取或使用本網站前，仔細閱讀以下使用條款。'
                  : '请在访问或使用本网站前，仔细阅读以下使用条款。'
          }}
        </p>
      </div>
    </section>

    <!-- Document Content -->
    <section class="privacy-content section-padding">
      <div class="container container-narrow">
        <div class="privacy-card glass-card">
          <!-- Simplified Chinese Version -->
          <div v-if="locale === 'zh-CN'">
            <div class="document-intro">
              <p>
                欢迎浏览
                bingo.vip。请在访问或使用本网站前，仔细阅读以下使用条款。您访问本网站及其任何网页，即表示您同意接受本条款的约束。如您不接受本条款，请勿访问本网站及使用相关的网上服务。
              </p>
            </div>

            <div class="document-section">
              <h2>1. 定义</h2>
              <p>在本使用条款中，下列词语具有以下涵义：</p>
              <ul>
                <li>
                  <strong>「内容」</strong
                  >：指在本网站上显示或通过本网站提供的所有信息、数据、文字、软件、图片、视频或其他资料。
                </li>
                <li>
                  <strong>「我们」或「我们的」</strong>：指 深圳市链商创新网络有限公司（Shenzhen
                  Chain Commerce Innovation Network Co.,
                  Ltd.），其办公地址为深圳市南山区科技园·金融基地1栋6楼。
                </li>
                <li><strong>「本网站」</strong>：指网址为 bingo.vip 的网站。</li>
                <li><strong>「您」、「您的」</strong>：指访问本网站的任何使用者。</li>
                <li>
                  <strong>「Bingo文娱」</strong
                  >：指本网站及本网站所提供的服务之品牌名称，由深圳市链商创新网络有限公司运营及提供。
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>2. 数据隐私</h2>
              <p>
                有关我们收集与处理数据的隐私政策及惯例，请参阅我们的<RouterLink
                  :to="{ name: 'privacy' }"
                  target="_blank"
                  >隐私政策声明</RouterLink
                >。当涉及特定服务时，您亦应参阅相关的收集个人资料声明。
              </p>
            </div>

            <div class="document-section">
              <h2>3. 用户承诺</h2>
              <p>
                您同意仅将本网站用于个人及非商业用途，并对您在本网站公开发布或私下传输的所有内容负全部责任。作为使用本网站的条件，您同意不会将本网站用于任何非法或本条款所禁止的用途。您进一步承诺不会进行以下行为：
              </p>
              <ul>
                <li>侵入、闯入、访问、使用或企图侵入未获授权的任何服务器或数据区；</li>
                <li>
                  发布或传输任何非法、欺诈、诽谤、淫秽、威胁性、辱骂性或侵犯他人知识产权及保密义务的内容；
                </li>
                <li>发布或传输任何广告、垃圾邮件、连锁信或未经请求的商业通讯；</li>
                <li>
                  未经我们事先书面许可，将本网站受版权保护的任何内容用于商业用途或创建衍生作品；
                </li>
                <li>
                  传输任何包含电脑病毒、木马程序、蠕虫或任何其他旨在干扰、破坏电脑软硬件功能的有害程序；
                </li>
                <li>
                  干扰或破坏连接至本网站的网络，或试图通过密码破解等方式获取未经授权的访问权限。
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>4. 连接至第三方网站</h2>
              <p>
                本网站可能提供链接至其他网站或资源（「链接网站」）。我们对链接网站的内容、更新或其中的任何链接概不负责。我们提供这些链接仅为方便您，并不暗示我们认可该等网站的内容。因使用链接网站而引致的任何损失或损害，我们概不负责。
              </p>
            </div>

            <div class="document-section">
              <h2>5. 免责声明及责任限制</h2>
              <p>
                本网站乃按「现状」及「可用」的基础提供。我们对本网站的运作、内容的准确性、充足性或完整性，概不作任何明示或暗示的陈述或保证。在适用法律允许的最大范围内，我们免除所有明示或暗示的保证，包括但不限于对本网站的可用性、无错误、适销性或不侵犯第三方权利的保证。您同意在使用本网站时完全依赖自己的判断。
              </p>
              <p>
                在任何情况下，对于因使用或无法使用本网站而产生的任何直接、间接、附带、特殊或后果性损害（包括业务或利润损失），即使我们曾被告知有发生该等损害的可能性，我们概不负责。
              </p>
            </div>

            <div class="document-section">
              <h2>6. 知识产权</h2>
              <p>
                本网站及其提供的所有内容均为我们的财产或获授权使用，并受版权、商标、专利或其他专有权利及法律保护。未经明确许可，您不得修改、发布、传输、重新分发或以任何方式利用部分或全部内容。
              </p>
            </div>

            <div class="document-section">
              <h2>7. 赔偿</h2>
              <p>
                对于因您违反本使用条款及／或使用本网站而引致的任何损失、索赔、责任、损害赔偿、要求、成本及费用（包括法律费用），您同意向我们及我们的员工、董事、代理人进行赔偿，并使我们免受损害。
              </p>
            </div>

            <div class="document-section">
              <h2>8. 条款修改与终止</h2>
              <p>
                我们保留随时修改本使用条款或任何相关政策的权利，并会通过在本网站上发布更新版本以通知您。在发布更改后继续使用本网站，即表示您接受修订后的条款。
              </p>
              <p>
                我们亦可能在任何时间，基于任何原因（包括您违反本条款），在不另行通知的情况下立即终止您访问及使用本网站的权利。
              </p>
            </div>

            <div class="document-section">
              <h2>9. 适用法律及司法管辖权</h2>
              <p>
                本网站由我们位于香港的办事处进行托管及管理。您访问本网站，即同意任何与本网站相关的索赔及争议均受香港法律管辖。您亦同意接受香港法院的非专属司法管辖权管辖。
              </p>
            </div>

            <div class="document-section">
              <h2>10. 联系我们</h2>
              <p>如对本条款或本网站服务有任何疑问，请通过以下方式与我们联系：</p>
              <div class="contact-info-block">
                <p class="company-name">深圳市链商创新网络有限公司</p>
                <p class="company-name">Shenzhen Chain Commerce Innovation Network Co., Ltd.</p>
                <p>电邮：<a href="mailto:Bingo-KF@webx.ai">Bingo-KF@webx.ai</a></p>
                <p>地址：深圳市南山区科技园·金融基地1栋6楼</p>
              </div>
            </div>
          </div>

          <!-- Traditional Chinese Version -->
          <div v-else-if="locale === 'zh-TW'">
            <div class="document-intro">
              <p>
                歡迎瀏覽
                bingo.vip。請在存取或使用本網站前，仔細閱讀以下使用條款。閣下存取本網站及其任何網頁，即表示閣下同意接受本條款的約束。如閣下不接受本條款，請勿存取本網站及使用相關的網上服務。
              </p>
            </div>

            <div class="document-section">
              <h2>1. 定義</h2>
              <p>在本使用條款中，下列詞語具有以下涵義：</p>
              <ul>
                <li>
                  <strong>「內容」</strong
                  >：指在本網站上顯示或透過本網站提供的所有資訊、數據、文字、軟件、圖片、影片或其他資料。
                </li>
                <li>
                  <strong>「我們」或「我們的」</strong>：指 深圳市鏈商創新網絡有限公司（Shenzhen
                  Chain Commerce Innovation Network Co.,
                  Ltd.），其辦公地址為深圳市南山區科技園·金融基地1棟6樓。
                </li>
                <li><strong>「本網站」</strong>：指網址為 bingo.vip 的網站。</li>
                <li><strong>「閣下」、「閣下的」</strong>：指存取本網站的任何使用者。</li>
                <li>
                  <strong>「Bingo文娛」</strong
                  >：指本網站及本網站所提供的服務之品牌名稱，由深圳市鏈商創新網絡有限公司運營及提供。
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>2. 資料隱私</h2>
              <p>
                有關我們收集與處理資料的私隱政策及慣例，請參閱我們的<RouterLink
                  :to="{ name: 'privacy' }"
                  target="_blank"
                  >隱私政策聲明</RouterLink
                >。當涉及特定服務時，閣下亦應參閱相關的收集個人資料聲明。
              </p>
            </div>

            <div class="document-section">
              <h2>3. 用戶承諾</h2>
              <p>
                閣下同意僅將本網站用於個人及非商業用途，並對閣下在本網站公開發布或私下傳輸的所有內容負上全部責任。作為使用本網站的條件，閣下同意不會將本網站用於任何非法或本條款所禁止的用途。閣下進一步承諾不會進行以下行為：
              </p>
              <ul>
                <li>侵入、闖入、存取、使用或企圖侵入未獲授權的任何伺服器或數據區；</li>
                <li>
                  發布或傳輸任何非法、欺詐、誹謗、淫褻、威脅性、辱罵性或侵犯他人知識產權及保密義務的內容；
                </li>
                <li>發布或傳輸任何廣告、垃圾郵件、連鎖信或未經請求的商業通訊；</li>
                <li>
                  未經我們事先書面許可，將本網站受版權保護的任何內容用於商業用途或創建衍生作品；
                </li>
                <li>
                  傳輸任何包含電腦病毒、木馬程序、蠕蟲或任何其他旨在干擾、破壞電腦軟硬件功能的有害程序；
                </li>
                <li>
                  干擾或破壞連接至本網站的網絡，或試圖透過密碼破解等方式獲取未經授權的存取權限。
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>4. 連接至第三方網站</h2>
              <p>
                本網站可能提供連結至其他網站或資源（「連結網站」）。我們對連結網站的內容、更新或當中的任何連結概不負責。我們提供這些連結僅為方便閣下，並不暗示我們認可該等網站的內容。因使用連結網站而引致的任何損失或損害，我們概不負責。
              </p>
            </div>

            <div class="document-section">
              <h2>5. 免責聲明及責任限制</h2>
              <p>
                本網站乃按「現狀」及「可用」的基礎提供。我們對本網站的運作、內容的準確性、充足性或完整性，概不作任何明示或暗示的陳述或保證。在適用法律允許的最大範圍內，我們免除所有明示或暗示的保證，包括但不限于對本網站的可用性、無錯誤、適銷性或不侵犯第三方權利的保證。閣下同意在使用本網站時完全依賴自己的判斷。
              </p>
              <p>
                在任何情況下，對於因使用或無法使用本網站而產生的任何直接、間接、附帶、特殊或後果性損害（包括業務或利潤損失），即使我們曾被告知有發生該等損害的可能性，我們概不負責。
              </p>
            </div>

            <div class="document-section">
              <h2>6. 知識產權</h2>
              <p>
                本網站及其提供的所有內容均為我們的財產或獲授權使用，並受版權、商標、專利或其他專有權利及法律保護。未經明確許可，閣下不得修改、發布、傳輸、重新分發或以任何方式利用部分或全部內容。
              </p>
            </div>

            <div class="document-section">
              <h2>7. 彌償</h2>
              <p>
                對於因閣下違反本使用條款及／或使用本網站而引致的任何損失、索賠、責任、損害賠償、要求、成本及費用（包括法律費用），閣下同意向我們及我們的員工、董事、代理人進行彌償，並使我們免受損害。
              </p>
            </div>

            <div class="document-section">
              <h2>8. 條款修改與終止</h2>
              <p>
                我們保留隨時修改本使用條款或任何相關政策的權利，並會透過在本網站上發布更新版本以通知閣下。在發布更改後繼續使用本網站，即表示閣下接受修訂後的條款。
              </p>
              <p>
                我們亦可能在任何時間，基於任何原因（包括閣下違反本條款），在不另行通知的情況下立即終止閣下存取及使用本網站的權利。
              </p>
            </div>

            <div class="document-section">
              <h2>9. 適用法律及司法管轄權</h2>
              <p>
                本網站由我們位於香港的辦事處進行寄存及管理。閣下存取本網站，即同意任何與本網站相關的索賠及爭議均受香港法律管轄。閣下亦同意接受香港法院的非專屬司法管轄權管轄。
              </p>
            </div>

            <div class="document-section">
              <h2>10. 聯絡我們</h2>
              <p>如對本條款或本網站服務有任何疑問，請透過以下方式與我們聯絡：</p>
              <div class="contact-info-block">
                <p class="company-name">深圳市鏈商創新網絡有限公司</p>
                <p class="company-name">Shenzhen Chain Commerce Innovation Network Co., Ltd.</p>
                <p>電郵：<a href="mailto:Bingo-KF@webx.ai">Bingo-KF@webx.ai</a></p>
                <p>地址：深圳市南山區科技園·金融基地1棟6樓</p>
              </div>
            </div>
          </div>

          <!-- English Version -->
          <div v-else-if="locale === 'en'">
            <div class="document-intro">
              <p>
                Welcome to bingo.vip. Please read the following Terms of Use carefully before
                accessing or using this website. By accessing this website and any of its pages, you
                agree to be bound by these terms. If you do not accept these terms, please do not
                access this website or use the related online services.
              </p>
            </div>

            <div class="document-section">
              <h2>1. Definitions</h2>
              <p>In these Terms of Use, the following terms have the meanings set forth below:</p>
              <ul>
                <li>
                  <strong>"Content"</strong>: refers to all information, data, text, software,
                  images, videos or other materials displayed on or provided through this website.
                </li>
                <li>
                  <strong>"We", "Us" or "Our"</strong>: refers to Shenzhen Chain Commerce Innovation
                  Network Co., Ltd., with its office address at 6/F, Building 1, Financial Base,
                  High-tech Park, Nanshan District, Shenzhen.
                </li>
                <li>
                  <strong>"This Website"</strong>: refers to the website with the URL bingo.vip.
                </li>
                <li>
                  <strong>"You" or "Your"</strong>: refers to any user accessing this website.
                </li>
                <li>
                  <strong>"BINGO Entertainment"</strong>: refers to the brand name of this website
                  and the services provided herein, operated and provided by Shenzhen Chain Commerce
                  Innovation Network Co., Ltd.
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>2. Data Privacy</h2>
              <p>
                For our privacy policy and practices regarding the collection and processing of
                data, please refer to our
                <RouterLink :to="{ name: 'privacy' }" target="_blank"
                  >Privacy Policy Statement</RouterLink
                >. In connection with specific services, you should also refer to the relevant
                Personal Information Collection Statement.
              </p>
            </div>

            <div class="document-section">
              <h2>3. User Commitments</h2>
              <p>
                You agree to use this website only for personal and non-commercial purposes, and
                accept full responsibility for all content you publicly post or privately transmit
                on this website. As a condition of your use of this website, you agree not to use
                this website for any purpose that is unlawful or prohibited by these terms. You
                further commit not to perform the following acts:
              </p>
              <ul>
                <li>
                  Intrude, break into, access, use, or attempt to intrude into any unauthorized
                  servers or data areas;
                </li>
                <li>
                  Post or transmit any content that is unlawful, fraudulent, defamatory, obscene,
                  threatening, abusive, or infringes on others' intellectual property rights and
                  confidentiality obligations;
                </li>
                <li>
                  Post or transmit any advertising, spam, chain letters, or unsolicited commercial
                  communications;
                </li>
                <li>
                  Use any copyrighted content of this website for commercial purposes or create
                  derivative works without our prior written permission;
                </li>
                <li>
                  Transmit any program containing computer viruses, Trojan horses, worms, or any
                  other harmful programs designed to interfere with or destroy computer software and
                  hardware functions;
                </li>
                <li>
                  Interfere with or disrupt networks connected to this website, or attempt to gain
                  unauthorized access through password mining or other means.
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>4. Links to Third-Party Websites</h2>
              <p>
                This website may provide links to other websites or resources ("Linked Websites").
                We are not responsible for the content, updates, or any links within Linked
                Websites. We provide these links solely for your convenience, and this does not
                imply our endorsement of the content of such websites. We shall not be liable for
                any loss or damage arising from the use of Linked Websites.
              </p>
            </div>

            <div class="document-section">
              <h2>5. Disclaimer and Limitation of Liability</h2>
              <p>
                This website is provided on an "as is" and "as available" basis. We make no
                representations or warranties, express or implied, regarding the operation of this
                website or the accuracy, adequacy, or completeness of the content. To the maximum
                extent permitted by applicable law, we disclaim all warranties, express or implied,
                including but not limited to warranties of availability, error-free operation,
                merchantability, or non-infringement of third-party rights. You agree to rely solely
                on your own judgment when using this website.
              </p>
              <p>
                Under no circumstances shall we be liable for any direct, indirect, incidental,
                special, or consequential damages (including loss of business or profits) arising
                out of the use or inability to use this website, even if we have been advised of the
                possibility of such damages.
              </p>
            </div>

            <div class="document-section">
              <h2>6. Intellectual Property</h2>
              <p>
                This website and all content provided herein are our property or authorized for use,
                and are protected by copyright, trademark, patent, or other proprietary rights and
                laws. You may not modify, publish, transmit, redistribute, or exploit any part or
                all of the content in any way without explicit permission.
              </p>
            </div>

            <div class="document-section">
              <h2>7. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless us and our employees, directors, and agents
                from and against any losses, claims, liabilities, damages, demands, costs, and
                expenses (including legal fees) arising out of your violation of these Terms of Use
                and/or your use of this website.
              </p>
            </div>

            <div class="document-section">
              <h2>8. Modifications and Termination of Terms</h2>
              <p>
                We reserve the right to modify these Terms of Use or any related policies at any
                time and will notify you by posting the updated version on this website. Your
                continued use of this website after changes are posted constitutes your acceptance
                of the revised terms.
              </p>
              <p>
                We may also terminate your right to access and use this website immediately at any
                time, for any reason (including your breach of these terms), without notice.
              </p>
            </div>

            <div class="document-section">
              <h2>9. Governing Law and Jurisdiction</h2>
              <p>
                This website is hosted and managed by our office in Hong Kong. By accessing this
                website, you agree that any claims and disputes related to this website shall be
                governed by the laws of Hong Kong. You also agree to submit to the non-exclusive
                jurisdiction of the courts of Hong Kong.
              </p>
            </div>

            <div class="document-section">
              <h2>10. Contact Us</h2>
              <p>
                If you have any questions regarding these terms or website services, please contact
                us at:
              </p>
              <div class="contact-info-block">
                <p class="company-name">Shenzhen Chain Commerce Innovation Network Co., Ltd.</p>
                <p>Email: <a href="mailto:Bingo-KF@webx.ai">Bingo-KF@webx.ai</a></p>
                <p>
                  Address: 6/F, Building 1, Financial Base, High-tech Park, Nanshan District,
                  Shenzhen
                </p>
              </div>
            </div>
          </div>

          <!-- Malay Version -->
          <div v-else-if="locale === 'ms'">
            <div class="document-intro">
              <p>
                Selamat datang ke bingo.vip. Sila baca Terma Penggunaan berikut dengan teliti
                sebelum mengakses atau menggunakan laman web ini. Dengan mengakses laman web ini dan
                mana-mana halamannya, anda bersetuju untuk terikat dengan terma ini. Jika anda tidak
                menerima terma ini, sila jangan akses laman web ini atau menggunakan perkhidmatan
                dalam talian yang berkaitan.
              </p>
            </div>

            <div class="document-section">
              <h2>1. Definisi</h2>
              <p>
                Dalam Terma Penggunaan ini, istilah berikut mempunyai maksud seperti yang dinyatakan
                di bawah:
              </p>
              <ul>
                <li>
                  <strong>"Kandungan"</strong>: merujuk kepada semua maklumat, data, teks, perisian,
                  imej, video atau bahan lain yang dipaparkan pada atau disediakan melalui laman web
                  ini.
                </li>
                <li>
                  <strong>"Kami" atau "Kepunyaan Kami"</strong>: merujuk kepada Shenzhen Chain
                  Commerce Innovation Network Co., Ltd., dengan alamat pejabatnya di 6/F, Bangunan
                  1, Pangkalan Kewangan, Taman Teknologi Tinggi, Daerah Nanshan, Shenzhen.
                </li>
                <li>
                  <strong>"Laman Web Ini"</strong>: merujuk kepada laman web dengan URL bingo.vip.
                </li>
                <li>
                  <strong>"Anda" atau "Kepunyaan Anda"</strong>: merujuk kepada mana-mana pengguna
                  yang mengakses laman web ini.
                </li>
                <li>
                  <strong>"Hiburan BINGO"</strong>: merujuk kepada nama jenama laman web ini dan
                  perkhidmatan yang disediakan di sini, dikendalikan dan disediakan oleh Shenzhen
                  Chain Commerce Innovation Network Co., Ltd.
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>2. Privasi Data</h2>
              <p>
                Untuk dasar dan amalan privasi kami mengenai pengumpulan dan pemprosesan data, sila
                rujuk
                <RouterLink :to="{ name: 'privacy' }" target="_blank"
                  >Kenyataan Dasar Privasi</RouterLink
                >
                kami. Berkaitan dengan perkhidmatan tertentu, anda juga harus merujuk kepada
                Kenyataan Pengumpulan Maklumat Peribadi yang relevan.
              </p>
            </div>

            <div class="document-section">
              <h2>3. Komitmen Pengguna</h2>
              <p>
                Anda bersetuju untuk menggunakan laman web ini hanya untuk tujuan peribadi dan bukan
                komersial, serta menerima tanggungjawab sepenuhnya untuk semua kandungan yang anda
                siarkan secara terbuka atau hantar secara peribadi di laman web ini. Sebagai syarat
                penggunaan laman web ini, anda bersetuju untuk tidak menggunakan laman web ini untuk
                sebarang tujuan yang menyalahi undang-undang atau dilarang oleh terma ini. Anda
                seterusnya komited untuk tidak melakukan tindakan berikut:
              </p>
              <ul>
                <li>
                  Menceroboh, masuk tanpa kebenaran, mengakses, menggunakan, atau cuba menceroboh
                  mana-mana pelayan atau kawasan data yang tidak dibenarkan;
                </li>
                <li>
                  Menyiarkan atau menghantar sebarang kandungan yang menyalahi undang-undang,
                  menipu, memfitnah, lucah, mengancam, mendera, atau melanggar hak harta intelek
                  orang lain dan kewajipan kerahsiaan;
                </li>
                <li>
                  Menyiarkan atau menghantar sebarang pengiklanan, e-mel sampah, surat rantaian,
                  atau komunikasi komersial yang tidak diminta;
                </li>
                <li>
                  Menggunakan sebarang kandungan berhak cipta laman web ini untuk tujuan komersial
                  atau mencipta karya terbitan tanpa kebenaran bertulis kami terlebih dahulu;
                </li>
                <li>
                  Menghantar sebarang program yang mengandungi virus komputer, trojan horse,
                  cecacing, atau sebarang program berbahaya lain yang direka untuk mengganggu atau
                  memusnahkan fungsi perisian dan perkakasan komputer;
                </li>
                <li>
                  Mengganggu atau merosakkan rangkaian yang disambungkan ke laman web ini, atau cuba
                  mendapatkan akses tanpa kebenaran melalui perlombongan kata laluan atau cara lain.
                </li>
              </ul>
            </div>

            <div class="document-section">
              <h2>4. Pautan ke Laman Web Pihak Ketiga</h2>
              <p>
                Laman web ini mungkin menyediakan pautan ke laman web atau sumber lain ("Laman Web
                Berpautan"). Kami tidak bertanggungjawab terhadap kandungan, kemas kini, atau
                sebarang pautan dalam Laman Web Berpautan. Kami menyediakan pautan ini semata-mata
                untuk kemudahan anda, dan ini tidak membayangkan sokongan kami terhadap kandungan
                laman web tersebut. Kami tidak akan bertanggungjawab ke atas sebarang kerugian atau
                kerosakan yang timbul daripada penggunaan Laman Web Berpautan.
              </p>
            </div>

            <div class="document-section">
              <h2>5. Penafian dan Had Liabiliti</h2>
              <p>
                Laman web ini disediakan atas dasar "sebagaimana adanya" dan "sebagaimana tersedia".
                Kami tidak membuat sebarang representasi atau jaminan, tersurat atau tersirat,
                mengenai operasi laman web ini atau ketepatan, kecukupan, atau kelengkapan
                kandungan. Setakat yang dibenarkan oleh undang-undang yang terpakai, kami menafikan
                semua jaminan, tersurat or tersirat, termasuk tetapi tidak terhad kepada jaminan
                ketersediaan, operasi bebas ralat, kebolehdagangan, atau bukan pelanggaran hak pihak
                ketiga. Anda bersetuju untuk bergantung sepenuhnya pada pertimbangan anda sendiri
                apabila menggunakan laman web ini.
              </p>
              <p>
                Dalam sebarang keadaan, kami tidak akan bertanggungjawab ke atas sebarang kerosakan
                langsung, tidak langsung, sampingan, khas, atau berbangkit (termasuk kerugian
                perniagaan atau keuntungan) yang timbul daripada penggunaan atau ketidakupayaan
                untuk menggunakan laman web ini, walaupun kami telah dimaklumkan tentang kemungkinan
                kerosakan tersebut.
              </p>
            </div>

            <div class="document-section">
              <h2>6. Harta Intelek</h2>
              <p>
                Laman web ini dan semua kandungan yang disediakan di sini adalah harta kami atau
                dilesenkan untuk digunakan, dan dilindungi oleh hak cipta, cap dagangan, paten, atau
                hak milik dan undang-undang lain yang hak milik. Anda tidak boleh mengubah suai,
                menerbitkan, menghantar, mengedar semula, atau mengeksploitasi mana-mana bahagian
                atau semua kandungan dalam sebarang cara tanpa kebenaran bertulis yang jelas.
              </p>
            </div>

            <div class="document-section">
              <h2>7. Ganti Rugi</h2>
              <p>
                Anda bersetuju untuk menanggung rugi dan melindungi kami serta pekerja, pengarah,
                dan ejen kami daripada sebarang kerugian, tuntutan, liabiliti, ganti rugi, kos, dan
                perbelanjaan (termasuk yuran guaman) yang timbul daripada pelanggaran Terma
                Penggunaan ini oleh anda dan/atau penggunaan laman web ini oleh anda.
              </p>
            </div>

            <div class="document-section">
              <h2>8. Pengubahsuaian dan Penamatan Terma</h2>
              <p>
                Kami berhak untuk mengubah suai Terma Penggunaan ini atau sebarang dasar berkaitan
                pada bila-bila masa dan akan memberitahu anda dengan menyiarkan versi terkini di
                laman web ini. Penggunaan berterusan laman web ini oleh anda selepas perubahan
                disiarkan membentuk penerimaan anda terhadap terma yang disemak semula.
              </p>
              <p>
                Kami juga boleh menamatkan hak anda untuk mengakses dan menggunakan laman web ini
                serta-merta pada bila-bila masa, atas sebarang sebab (termasuk pelanggaran terma ini
                oleh anda), tanpa notis.
              </p>
            </div>

            <div class="document-section">
              <h2>9. Undang-undang yang Mengawal dan Bidang Kuasa</h2>
              <p>
                Laman web ini dihoskan dan dihoskan oleh pejabat kami di Hong Kong. Dengan mengakses
                laman web ini, anda bersetuju bahawa sebarang tuntutan dan pertikaian yang berkaitan
                dengan laman web ini akan ditadbir oleh undang-undang Hong Kong. Anda juga bersetuju
                untuk tunduk kepada bidang kuasa tidak eksklusif mahkamah Hong Kong.
              </p>
            </div>

            <div class="document-section">
              <h2>10. Hubungi Kami</h2>
              <p>
                Jika anda mempunyai sebarang soalan mengenai terma ini atau perkhidmatan laman web,
                sila hubungi kami di:
              </p>
              <div class="contact-info-block">
                <p class="company-name">Shenzhen Chain Commerce Innovation Network Co., Ltd.</p>
                <p>E-mel: <a href="mailto:Bingo-KF@webx.ai">Bingo-KF@webx.ai</a></p>
                <p>
                  Alamat: 6/F, Bangunan 1, Pangkalan Kewangan, Taman Teknologi Tinggi, Daerah
                  Nanshan, Shenzhen
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.privacy-page {
  padding-top: 80px; /* offset for fixed header */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

/* Hero section */
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

/* Content Area */
.privacy-content {
  background-color: #f9fafb;
  flex-grow: 1;
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

.document-intro {
  margin-bottom: 32px;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 24px;
}

.document-intro p {
  font-size: 1rem;
  line-height: 1.8;
  color: #1f2937;
  font-weight: 500;
  text-align: justify;
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
  color: #374151;
}

.contact-info-block p:last-child {
  margin-bottom: 0;
}

.contact-info-block .company-name {
  font-weight: 600;
  color: #111827;
}

.contact-info-block a {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.contact-info-block a:hover {
  text-decoration: underline;
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
