<script setup lang="ts">
interface Job {
  id: number
  title: string
  location: string
  experience: string
  education: string
  responsibilities: string[]
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
    ],
  },
  {
    id: 5,
    title: '海外市场拓展',
    location: '香港 / 东南亚',
    experience: '3年以上',
    education: '本科及以上',
    responsibilities: [
      '负责东南亚及全球市场的渠道拓展与生态合作落地',
      '对接本地电子钱包、流媒体与发行联盟，搭建分发闭环',
      '制定区域化补贴与增长策略，推动用户裂变与营收增长',
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
    ],
  },
]

const email = 'hr@bingo.vip'
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
              <span class="job-apply">
                <a :href="`mailto:${email}?subject=应聘-${job.title}`">投递简历 &gt;</a>
              </span>
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

            <div class="job-divider"></div>

            <ul class="job-resp">
              <li v-for="(item, i) in job.responsibilities" :key="i">{{ item }}</li>
            </ul>
          </article>
        </div>

        <p class="jobs-foot">
          没有合适的职位？将简历发送至
          <a :href="`mailto:${email}`" class="mail-link">{{ email }}</a>
          ，我们会主动与你联系。
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

.job-apply a {
  font-size: 0.85rem;
  color: var(--accent-cyan);
  white-space: nowrap;
  transition: var(--transition-normal);
}

.job-apply a:hover {
  opacity: 0.8;
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

.job-divider {
  height: 1px;
  margin: 20px 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%);
}

.job-resp {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.job-resp li {
  position: relative;
  padding-left: 18px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-secondary);
  font-weight: 300;
}

.job-resp li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-purple);
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.6);
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
