import type {
  FlywheelTag,
  FooterGroup,
  NavItem,
  PainPoint,
  Pillar,
  PlatformLink,
  Region,
  StatCard,
} from '@/types/landing'

export const navItems: readonly NavItem[] = [
  { id: 'home', label: '首页介绍' },
  { id: 'business', label: '业务模式' },
  { id: 'ecosystem', label: '生态布局' },
  { id: 'contact', label: '联系我们' },
]

export const platformLinks: readonly PlatformLink[] = [
  { label: '短剧平台', value: 'tv.bingo.vip', tone: 'cyan', icon: 'play' },
  { label: '小游戏平台', value: 'g.bingo.vip', tone: 'violet', icon: 'gamepad' },
  { label: 'UGC 社交平台', value: '', tone: 'green', icon: 'users' },
]

export const painPoints: readonly PainPoint[] = [
  {
    title: 'Web2平台模式',
    description: '高买量成本与低留存率的矛盾，使用价值难以深度挖掘。',
    icon: 'shield',
  },
  {
    title: '传统Web3项目',
    description: '摒弃短期投机，回归内容本质。我们致力于为创作者提供长效生存土壤，解决资本与创意之间的错配。',
    icon: 'shield',
  },
  {
    title: '资本与创意痛点',
    description: '资本极难筛选高留存潜力项目；优秀的草根创意者又因缺少冷启动资源和变现渠道而枯萎。',
    icon: 'shield',
  },
]

export const marketStats: readonly StatCard[] = [
  {
    metric: '330亿',
    unit: '美元',
    title: 'Web3娱乐/游戏市场规模',
    description: '2025年预计超过330亿美元，蕴藏庞大代币化流媒体与分发需求。',
    label: '美元',
    icon: 'wallet',
  },
  {
    metric: '200亿',
    unit: '美元',
    title: '超休闲小游戏市场规模',
    description: '2025年预计达200亿美元，兼具极高用户触达率与即时买量转化。',
    label: '美元',
    icon: 'growth',
  },
  {
    metric: '5000万+',
    title: '全球数字游民体量',
    description: '数字游民已超5,000万，远程创意产出和协同致富需求持续高涨。',
    label: '全球游民',
    icon: 'users',
  },
  {
    metric: '1号',
    title: '香港Web3桥头堡地位',
    description: '合规基金框架、政策免登和代币化红利支持，切入海外蓝海最佳枢纽。',
    label: '战略支点',
    icon: 'compass',
  },
]

export const pillars: readonly Pillar[] = [
  {
    index: '01',
    title: '小游戏',
    subtitle: '高频互动 × 即时收益',
    description: '以低门槛小游戏承接碎片化娱乐需求，形成可持续的用户触达入口。',
    primaryMetric: '120款+',
    secondaryMetric: '小游戏储备',
    outcome: '快速验证玩法，放大裂变传播。',
    icon: 'gamepad',
  },
  {
    index: '02',
    title: '短剧',
    subtitle: '精品短剧 × 全球分发',
    description: '通过短剧内容与链上权益绑定，让观看、推荐和共创形成真实价值回流。',
    primaryMetric: '300部+',
    secondaryMetric: '内容片单',
    outcome: '把内容消费升级为共创资产。',
    icon: 'play',
  },
  {
    index: '03',
    title: 'UGC & 数字游民社区',
    subtitle: '线上线下产融结合，本地生活 × 直播 × 社交',
    description: '构建新型的全球化社区与价值网络。',
    primaryMetric: '2000万+ U',
    secondaryMetric: '回购储备',
    outcome: '计划覆盖 25+ 热门城市 · 目标孵化 10 万+ 创作者',
    icon: 'users',
  },
]

export const flywheelTags: readonly FlywheelTag[] = [
  { label: 'POS掘金 + GGC链' },
  { label: 'IAA+IAP混变矩阵' },
  { label: '短剧+游戏+社交三轮驱动' },
  { label: '生态价值闭环' },
  { label: '浪潮计划 (Wave Plan)' },
  { label: '沙滩计划 (Beach Plan)', active: true },
]

export const regions: readonly Region[] = [
  {
    id: 'mainland',
    name: '中国大陆',
    headline: '合规内容样板市场',
    coverage: '精品短剧与小游戏冷启动验证',
    description: '以成熟内容供应链和高频互动玩法完成产品模型验证，沉淀可复制的运营方法。',
    note: '结合平台分账、短剧宣发与游戏买量模型，形成标准化内容测试流水线。',
  },
  {
    id: 'hongkong',
    name: '中国香港',
    headline: 'Web3合规金融枢纽',
    coverage: '基金架构、资产托管与全球结算',
    description: '借助香港 Web3 监管与资金通道优势，承接代币化权益、合规基金与国际化资源协作。',
    note: '联动合规资本与内容 IP 持有机构，为海外增长提供可信底座。',
  },
  {
    id: 'malaysia',
    name: '马来西亚',
    headline: '多语种内容试验田',
    coverage: '华语、英语、马来语用户共振',
    description: '用多语种内容和轻量游戏验证跨文化传播效率，服务东南亚扩张前的本地化试验。',
    note: '通过创作者社群与本地支付生态，提升内容转化和社区留存。',
  },
  {
    id: 'sea',
    name: '东南亚',
    headline: '流量爆发 & 用户裂变高地',
    coverage: '全球覆盖：6.8亿 增量数字娱乐用户',
    description:
      '东南亚具有极高频的数字娱乐及超休闲游戏交互习惯。Bingo通过“看剧/玩游戏即挖矿”的超低门槛、即点即玩模式快速席卷多国应用商店下载排行。',
    note: '结合东南亚本地电子钱包（Touch ’n Go、GrabPay等），实现零延迟、超轻量的小额收益即时分发，裂变系数高达2.5倍。',
  },
]

export const footerGroups: readonly FooterGroup[] = [
  {
    title: '友情链接',
    english: 'LINKS',
    links: ['WebX 官网', '短剧平台', '小游戏平台'],
  },
  {
    title: '文件声明',
    english: 'POLICY',
    links: ['法律条款', '隐私政策', '媒体资源'],
  },
]
