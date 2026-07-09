<script setup lang="ts">
import { ref } from 'vue'

interface Job {
  id: number
  title: string
  location: string
  experience: string
  education: string
  responsibilities: string[]
  requirements: string[]
}

const jobs: Job[] = [
  {
    id: 1,
    title: '小游戏产品经理',
    location: '深圳 / 远程',
    experience: '3-5年',
    education: '本科及以上',
    responsibilities: [
      '负责超休闲小游戏产品规划与版本迭代，把控核心玩法与留存指标',
      '基于数据分析持续优化用户体验，提升活跃、留存与变现效率',
      '协同研发、美术与发行团队，推动项目高质量按时交付',
      '负责竞品分析及小游戏出海的本地化策略与运营方案制定',
      '探索通证化设计与游戏内积分权益系统的深度融合',
    ],
    requirements: [
      '3-5年以上小游戏或超休闲游戏产品经验，有成功上线运营项目者优先',
      '对市场流行玩法及用户心理有敏锐洞察，精通游戏数值与关卡设计',
      '具备出色的数据分析、沟通协作与抗压能力',
    ],
  },
  {
    id: 2,
    title: '短剧内容运营',
    location: '深圳 / 马来西亚',
    experience: '2-4年',
    education: '本科及以上',
    responsibilities: [
      '负责精品短剧内容选题、排期与分发策略，挖掘高潜力题材',
      '跟踪多平台数据表现，持续优化内容投放与流量转化路径',
      '联动跨语种剪辑达人与数字游民网络，推动本地化裂变宣发',
      '拓展海外本土版权方、翻译方及发行分销商资源，打通产业链',
      '基于用户反馈与追剧行为画像，指导下一阶段内容孵化方向',
    ],
    requirements: [
      '2-4年短剧、短视频或新媒体内容运营经验，熟悉海内外短视频平台规则',
      '具备优秀的审美能力与内容敏感度，擅长脚本分析与流量裂变玩法',
      '英语流利，有跨国/多语种内容分发经验者优先',
    ],
  },
  {
    id: 3,
    title: 'Web3 区块链工程师',
    location: '香港 / 深圳',
    experience: '3年以上',
    education: '本科及以上',
    responsibilities: [
      '负责生态通证体系与智能合约的设计、开发及安全审计',
      '搭建链上数据与业务系统的对接通道，保障资产流转安全',
      '跟踪行业合规与前沿技术，持续优化底层链与生态架构',
      '负责多链部署方案设计，包括但不限于以太坊、Solana 及 Layer 2 网络',
      '参与核心共识机制优化，提升链上高并发交易的处理性能',
    ],
    requirements: [
      '3年以上区块链实际开发经验，精通 Solidity, Rust 或 Go 语言',
      '熟悉以太坊、GGC等主流公链架构，有 DeFi 或 GameFi 项目开发经验',
      '具备极强的安全意识，熟悉智能合约常见漏洞及防范手段',
    ],
  },
  {
    id: 4,
    title: 'AI 算法工程师',
    location: '深圳',
    experience: '3年以上',
    education: '硕士及以上',
    responsibilities: [
      '负责多语种音色克隆与实时同声传译模型的研发与调优',
      '构建多模态 AI 工具链，赋能内容二创与本地化宣发',
      '推动模型工程化落地，保障线上推理性能与稳定性',
      '探索基于大语言模型的智能客服、AI 编剧与本地化角色翻译落地',
      '维护算法资产，并负责海量音视频数据的预处理与特征提取工作',
    ],
    requirements: [
      '3年以上 NLP、语音算法或多模态算法研发经验，硕士及以上学历',
      '精通 PyTorch/TensorFlow 等深度学习框架，熟悉大语言模型微调技术',
      '在音色克隆、TTS、实时翻译等领域有实际项目落地经验者优先',
    ],
  },
  {
    id: 5,
    title: '海外 market 拓展',
    location: '香港 / 东南亚',
    experience: '3年以上',
    education: '本科及以上',
    responsibilities: [
      '负责东南亚及全球市场的渠道拓展与生态合作落地',
      '对接本地电子钱包、流媒体与发行联盟，搭建分发闭环',
      '制定区域化补贴与增长策略，推动用户裂变与营收增长',
      '代表公司参加国际 Web3 & 文娱峰会，提升 BINGO 品牌的海外影响力',
      '监测海外竞品动态和政策合规动向，保障出海业务安全合规运营',
    ],
    requirements: [
      '3年以上海外市场拓展、商务合作（BD）或发行运营经验',
      '熟悉东南亚本地支付渠道与媒体生态，拥有丰富的本地合作资源',
      '具备出色的商务谈判与跨文化沟通能力，英语可作为工作语言',
    ],
  },
  {
    id: 6,
    title: 'UI/视觉设计师',
    location: '深圳 / 远程',
    experience: '2-5年',
    education: '专科及以上',
    responsibilities: [
      '负责产品界面与品牌视觉的整体设计与规范沉淀',
      '产出高质量视觉稿与动效，提升产品质感与沉浸感',
      '配合研发完成设计走查，确保最终还原效果',
      '负责海外宣发物料、网页海报及社区运营视觉的创意输出',
      '参与用户体验研究，根据测试反馈持续迭代人机交互细节',
    ],
    requirements: [
      '2-5年移动端 App、Web 或游戏 UI 设计经验，美术或设计相关专业优先',
      '精通 Figma、Photoshop、Illustrator 等设计软件，具备动效制作能力',
      '具备良好的审美意识，重视细节，对前沿设计趋势保持敏感',
    ],
  },
]

const email = 'hr@bingo.vip'

// Expanded state management
const expandedJobIds = ref<number[]>([])

const toggleExpand = (id: number) => {
  const index = expandedJobIds.value.indexOf(id)
  if (index > -1) {
    expandedJobIds.value.splice(index, 1)
  } else {
    expandedJobIds.value.push(id)
  }
}

const isExpanded = (id: number) => expandedJobIds.value.includes(id)
</script>

<template>
  <main class="join-page">
    <!-- Hero Title -->
    <section class="join-hero">
      <div class="container">
        <div class="hero-bg-text">Join Us</div>
        <h1 class="join-title">加入我们</h1>
        <p class="join-subtitle">
          与 BINGO 文娱一起，共建全球 Web3 娱乐生态。<br />
          在这里，你的每一份创意都将被赋予价值。
        </p>
      </div>
    </section>

    <!-- Job List -->
    <section class="jobs-section section-padding">
      <div class="container">
        <div class="jobs-grid">
          <article
            v-for="job in jobs"
            :key="job.id"
            class="job-card glass-card"
          >
            <div class="job-head">
              <h3 class="job-title">{{ job.title }}</h3>
            </div>

            <div class="job-meta">
              <span class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {{ job.location }}
              </span>
              <span class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {{ job.experience }}
              </span>
              <span class="meta-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                {{ job.education }}
              </span>
            </div>

            <!-- Collapsed Preview (Show first 3 responsibilities) -->
            <div v-if="!isExpanded(job.id)" class="job-preview">
              <div class="job-divider"></div>
              <div class="detail-section">
                <h4 class="detail-title">岗位职责</h4>
                <ul class="detail-list">
                  <li v-for="(item, i) in job.responsibilities.slice(0, 3)" :key="i">{{ item }}</li>
                </ul>
              </div>
            </div>

            <!-- Expanded Details -->
            <transition name="expand-fade">
              <div v-if="isExpanded(job.id)" class="job-details">
                <div class="job-divider"></div>
                
                <div class="detail-section">
                  <h4 class="detail-title">岗位职责</h4>
                  <ul class="detail-list">
                    <li v-for="(item, i) in job.responsibilities" :key="i">{{ item }}</li>
                  </ul>
                </div>

                <div class="detail-section">
                  <h4 class="detail-title">岗位要求</h4>
                  <ul class="detail-list">
                    <li v-for="(item, i) in job.requirements" :key="i">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </transition>

            <!-- Action Button -->
            <div class="job-actions">
              <button 
                class="btn-expand" 
                :class="{ active: isExpanded(job.id) }" 
                @click="toggleExpand(job.id)"
              >
                <span>{{ isExpanded(job.id) ? '收起详情' : '展开更多' }}</span>
                <svg 
                  class="chevron-icon" 
                  :class="{ rotated: isExpanded(job.id) }" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2.5" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </article>
        </div>

        <p class="jobs-foot">
          意向岗位请将简历发送至邮箱：
          <a :href="`mailto:${email}?subject=应聘BINGO相关岗位`" class="mail-link">{{ email }}</a>
          ，我们会尽快与您取得联系。
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.join-page {
  padding-top: 80px; /* offset for fixed header */
  flex-grow: 1;
}

/* Hero */
.join-hero {
  position: relative;
  padding: 96px 0 64px;
  text-align: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 30%, rgba(79, 70, 229, 0.18) 0%, transparent 60%),
    transparent;
}

.hero-bg-text {
  font-size: 7rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.05);
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
  font-family: Arial, 'Helvetica Neue', sans-serif;
  line-height: 1;
}

.join-title {
  position: relative;
  z-index: 1;
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.join-subtitle {
  position: relative;
  z-index: 1;
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.9;
  font-weight: 300;
  letter-spacing: 0.5px;
  max-width: 560px;
  margin: 0 auto;
}

/* Job list */
.jobs-section {
  padding-top: 40px;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.job-card {
  padding: 32px;
  border-radius: 20px;
  transition: var(--transition-normal);
  align-self: start; /* Avoid stretching dynamically */
}

.job-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 240, 255, 0.25);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
}

.job-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.job-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.meta-item svg {
  color: var(--accent-purple);
  opacity: 0.9;
}

/* Expand button styling */
.job-actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-start;
}

.btn-expand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 240, 255, 0.03);
  border: 1px solid rgba(0, 240, 255, 0.15);
  color: var(--accent-cyan);
  padding: 8px 18px;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-normal);
}

.btn-expand:hover {
  background: rgba(0, 240, 255, 0.08);
  border-color: rgba(0, 240, 255, 0.4);
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.25);
}

.btn-expand.active {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.35);
  color: #ffffff;
}

.btn-expand.active:hover {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.3);
}

.chevron-icon {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

/* Details Section */
.job-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.job-divider {
  height: 1px;
  margin: 20px 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%);
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 12px;
  background: var(--accent-cyan);
  border-radius: 9999px;
}

.detail-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-list li {
  position: relative;
  padding-left: 18px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-secondary);
  font-weight: 300;
}

.detail-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-purple);
  box-shadow: 0 0 6px rgba(139, 92, 246, 0.6);
}

.jobs-foot {
  text-align: center;
  margin-top: 48px;
  font-size: 0.95rem;
  color: var(--text-secondary);
  font-weight: 300;
}

.mail-link {
  color: var(--accent-cyan);
  transition: var(--transition-normal);
}

.mail-link:hover {
  opacity: 0.8;
}

/* Transitions */
.expand-fade-enter-active {
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  max-height: 1000px;
  overflow: hidden;
}

.expand-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  max-height: 1000px;
  overflow: hidden;
}

.expand-fade-enter-from,
.expand-fade-leave-to {
  opacity: 0;
  max-height: 0 !important;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 1024px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .join-title {
    font-size: 2.25rem;
  }

  .join-subtitle {
    font-size: 0.95rem;
  }

  .hero-bg-text {
    font-size: 5rem;
  }

  .job-card {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .join-hero {
    padding: 64px 0 40px;
  }

  .join-title {
    font-size: 1.75rem;
  }

  .job-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .job-meta {
    gap: 12px;
  }
}
</style>
