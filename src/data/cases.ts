export type CaseItem = {
  id: string
  /** 自定义跳转路径；未设置时默认进入 `/cases/:id` 详情页 */
  link?: string
  status?: 'published' | 'coming-soon'
  comingSoon?: boolean
  title: string
  subtitle: string
  category: string
  role: string
  year: string
  platform: string
  tags: string[]
  priority: number
  cover: string
  coverImage?: string
  summary: string
  background: string
  challenges: string[]
  solutions: string[]
  highlights: string[]
  aiWorkflow: string[]
  frontendWork: string[]
  redesignPlan: string[]
  designSpec?: CaseDesignSpec
  review: string
}

export type CaseDesignSpec = {
  summary: string
  colorTokens: {
    name: string
    value: string
    usage: string
  }[]
  stateTags: {
    label: string
    color: string
    background?: string
    description: string
  }[]
  componentRules: {
    title: string
    description: string
  }[]
  layoutRules: {
    title: string
    detail: string
  }[]
}

export type HistoricalProject = {
  title: string
  description: string
}

const blueCover = (start: string, mid: string, end: string) =>
  `linear-gradient(135deg, ${start} 0%, ${mid} 48%, ${end} 100%)`

export const cases: CaseItem[] = [
  {
    id: 'liangxuan-mini-program',
    link: '/demos/mini-program',
    title: '靓轩小程序设计',
    subtitle: '移动端商城设计 / 商品列表 / 分类筛选 / 活动商品 / 购物车转化',
    category: '小程序 / 电商',
    role: 'UI + 前端高保真实现',
    year: '2026',
    platform: 'WeChat Mini Program',
    tags: ['微信小程序', 'Figma MCP', 'Codex'],
    priority: 1,
    cover: blueCover('#eff8ff', '#d9ecff', '#f5f2ff'),
    summary: '围绕商品体系、首页营销模块、列表筛选和详情转化链路，展示移动端体验设计与小程序前端还原能力。',
    background:
      '本项目为零售电商小程序界面优化案例，核心页面围绕商品浏览、分类筛选、活动商品展示和购物车转化展开，需要在高频移动购物场景中提升信息识别效率与转化路径清晰度。',
    challenges: ['首页信息密度高，营销模块容易抢占商品主线', '商品分类、列表筛选和详情页需要形成稳定购买路径', '移动端视觉需要兼顾品牌感、可读性和小程序性能边界'],
    solutions: ['以首页运营坑位、分类导航、爆品推荐和会员入口重组首屏结构', '统一商品卡、价格、标签、按钮和状态样式，建立可复用组件规则', '用小程序原生布局思维拆解页面，减少复杂视觉对还原和性能的影响'],
    highlights: ['首页营销模块', '商品卡片体系', '会员权益入口', '移动端转化链路'],
    aiWorkflow: ['用 AI 梳理电商小程序常见模块和用户路径', '辅助生成活动文案、空状态和提示语备选', '用 Codex 辅助整理页面结构与 CSS 还原方案'],
    frontendWork: ['小程序页面结构拆分', '商品卡、营销 Banner、标签组件样式还原', '移动端安全区、栅格和按钮触控尺寸适配'],
    redesignPlan: ['补充首页装修模块的状态稿', '增加商品详情页关键转化节点截图', '沉淀小程序组件规范页'],
    review: '该案例适合作为移动端与小程序能力的主展示，重点体现从视觉设计到前端还原的闭环。',
  },
  {
    id: 'smart-scale-shopping-system',
    status: 'coming-soon',
    comingSoon: true,
    title: '电子秤购物系统',
    subtitle: '面向触屏终端的购物、称重、软键盘与结算流程设计',
    category: '终端设备 / 触屏交互 / .NET MAUI',
    role: '终端 UI 设计 / 触屏交互 / .NET MAUI 界面实现',
    year: '2026',
    platform: '.NET MAUI / Touch Terminal',
    tags: ['终端设备', '触屏交互', '.NET MAUI'],
    priority: 3,
    cover: blueCover('#eef9ff', '#d7f0ff', '#e9f4ff'),
    summary: '展示特殊设备界面设计、软键盘输入、购物称重流程、大屏触控适配与跨端界面落地能力。',
    background:
      '电子秤终端承担商品识别、称重、购物车、输入和结算等高频动作，使用环境复杂，界面必须足够清晰、稳定和易操作。',
    challenges: ['触屏终端误触成本高，按钮尺寸和状态反馈必须明确', '软键盘、商品列表和购物车需要在有限空间内协同', '不同屏幕比例和设备性能对界面实现有约束'],
    solutions: ['围绕称重状态、商品选择、购物车和结算建立主操作区', '设计适合触屏的软键盘、数字输入和异常提示状态', '使用 .NET MAUI 样式资源拆分控件状态，验证多分辨率适配'],
    highlights: ['称重购物主流程', '软键盘交互', '大按钮触控设计', 'MAUI 界面落地'],
    aiWorkflow: ['AI 辅助列举现场操作边界和异常场景', '生成软键盘与错误提示文案备选', 'Codex 辅助检查 XAML/CSS 类样式拆分思路'],
    frontendWork: ['使用 .NET MAUI 实现界面布局', '整理按钮、输入框、列表和状态控件样式', '联调触屏分辨率、字号和点击区域'],
    redesignPlan: ['补充软键盘交互状态对比', '增加购物流程动线说明图', '整理 MAUI 控件样式规范'],
    review: '该案例能突出特殊设备场景下的设计判断，以及设计师对前端实现边界的理解。',
  },
  {
    id: 'device-health-management-platform',
    title: '设备健康管理平台',
    subtitle: 'PC 与 APP 协同的设备状态、告警、运维和资产管理系统',
    category: 'PC + APP / B端系统',
    role: 'B 端产品设计 / 信息架构 / 多端设计规范',
    year: '2026',
    platform: 'PC Web / Mobile App',
    tags: ['B端系统', '设备管理', '多端体验一致性'],
    priority: 2,
    cover: blueCover('#edf7ff', '#d8ebff', '#edf3ff'),
    coverImage: '/case-assets/device-health-management-platform/case-cover.png',
    summary:
      '重新梳理旧版系统的页面结构与业务流程，在保留核心逻辑的基础上，统一视觉风格、组件规范和多端体验。',
    background:
      '设备运维涉及资产台账、实时状态、健康评分、告警处理和巡检任务，角色多、链路长，需要用清晰架构降低管理成本。',
    challenges: ['设备数据维度多，状态、告警和任务容易混杂', 'PC 管理端与 APP 现场端的角色和任务不同', '设计规范需要支撑后续模块持续扩展'],
    solutions: ['按资产、状态、告警、任务和报表重构导航与页面层级', '建立健康评分、状态标签、告警优先级和设备详情的信息模板', '统一 PC 与 APP 的颜色、图标、状态和组件语言'],
    highlights: ['设备健康评分', '告警分级', '资产详情模板', 'PC + APP 一致性规范'],
    aiWorkflow: ['AI 辅助梳理设备管理领域对象和状态词典', '生成不同角色的任务路径草案', '辅助输出设计规范文档初稿'],
    frontendWork: ['配合 Vue 页面组件拆分', '定义状态标签、筛选表格和详情面板样式规则', '验证 PC 与移动端响应式信息降级'],
    redesignPlan: ['补充 PC 与 APP 对照页', '强化设备详情页的信息层级展示', '增加告警闭环流程图'],
    designSpec: {
      summary: '设计规范内容占位，后续重新整理。',
      colorTokens: [],
      stateTags: [],
      componentRules: [],
      layoutRules: [],
    },
    review: '该案例适合展示复杂业务理解、系统化设计和多端体验一致性的能力。',
  },
  {
    id: 'homework-grading-system-ai-redesign',
    status: 'coming-soon',
    comingSoon: true,
    title: '批改作业系统',
    subtitle: '教育后台旧项目的 AI 辅助视觉升级与组件化改版',
    category: '教育后台 / PC 端 / 旧项目 AI 改版',
    role: '旧项目重构 / 后台 UI 升级 / Codex 辅助改版',
    year: '2026',
    platform: 'PC Web / Vue Prototype',
    tags: ['教育后台', '旧项目改版', '组件规范', 'Codex'],
    priority: 4,
    cover: blueCover('#f0f8ff', '#dcefff', '#eef1ff'),
    summary: '展示旧项目重构思路、后台系统视觉升级、组件规范沉淀，以及 Codex 辅助页面改版过程。',
    background:
      '早期批改作业后台功能可用但视觉陈旧、组件不统一、页面信息层级松散，需要在保留业务逻辑的基础上提升专业度和可维护性。',
    challenges: ['旧页面缺少统一组件规范，视觉和交互状态不一致', '批改、统计、班级和作业流程信息密集', '改版需要展示 AI 工具如何参与设计与前端重构'],
    solutions: ['重新定义后台色彩、表格、筛选、卡片和状态组件', '按教师批改任务重组页面重点，突出待处理、进度和结果反馈', '使用 Codex 辅助拆分 Vue 组件、重写样式并快速验证改版效果'],
    highlights: ['旧项目改版对比', '后台组件规范', '批改任务流', 'Codex 辅助重构'],
    aiWorkflow: ['用 AI 分析旧界面的视觉问题和结构问题', '生成改版方向、组件清单和空状态文案', 'Codex 辅助实现新版 Vue 页面与 CSS'],
    frontendWork: ['Vue 页面结构整理', '表格、筛选、状态、作业卡片样式重构', '响应式和后台常见状态验证'],
    redesignPlan: ['制作改版前后对比长图', '补充 Codex 工作流截图与提示词摘要', '沉淀后台组件规范展示页'],
    review: '该案例能够直接呼应“AI 工具工作流 + 前端落地”的复合能力定位。',
  },
  {
    id: 'smart-helmet-management-system',
    status: 'coming-soon',
    comingSoon: true,
    title: '智慧安全帽管理系统',
    subtitle: '面向人员、设备、定位与风险状态的 IoT 安全管理体验',
    category: 'APP + PC / IoT 安全管理',
    role: '移动端 UI/UED / PC 管理端 / 多端协同体验',
    year: '2024',
    platform: 'Mobile App / PC Web',
    tags: ['IoT', '安全管理', 'APP', 'PC 协同'],
    priority: 5,
    cover: blueCover('#eef8ff', '#d7edff', '#f4f6ff'),
    summary: '展示移动端数据状态、人员设备管理、多端协同，以及 IoT 安全场景下的状态可视化设计。',
    background:
      '智慧安全帽涉及人员定位、佩戴状态、设备电量、告警记录和安全监管，现场端与管理端需要协同完成风险发现和处理。',
    challenges: ['人员、设备和告警状态需要被快速识别', '移动端空间有限，但需要展示实时状态和处理入口', 'PC 管理端要支撑批量管理、地图查看和追溯分析'],
    solutions: ['建立人员与设备绑定关系的信息模型', '用颜色、图标和状态卡表达在线、离线、电量和告警级别', '设计 APP 快速查看与 PC 深度管理的多端分工'],
    highlights: ['人员设备绑定', '状态卡片', '告警处理', 'APP + PC 协同'],
    aiWorkflow: ['AI 辅助生成 IoT 安全状态枚举', '整理告警处理路径和角色任务', '辅助输出移动端信息优先级方案'],
    frontendWork: ['参与移动端页面样式还原', '定义状态卡、列表和筛选控件规则', '配合 PC 端地图和表格区域布局'],
    redesignPlan: ['补充 APP 与 PC 协同流程图', '加强实时状态 Dashboard 展示', '整理 IoT 状态色与图标规范'],
    review: '该案例适合证明多端协同和实时状态类产品的体验设计能力。',
  },
  {
    id: 'data-screen-visualization',
    status: 'coming-soon',
    comingSoon: true,
    title: '数据大屏可视化设计',
    subtitle: '驾驶舱式指标总览、图表布局与暗色科技风视觉表达',
    category: '大屏 / 数据可视化',
    role: '大屏视觉设计 / 图表布局 / 数据可视化规范',
    year: '2024',
    platform: 'Large Screen Dashboard',
    tags: ['大屏', '数据可视化', '驾驶舱', '科技风'],
    priority: 6,
    cover: blueCover('#eaf6ff', '#d5ecff', '#e9f1ff'),
    summary: '展示暗色科技风、驾驶舱式数据布局、图表层级、指标卡和可视化大屏的整体设计控制力。',
    background:
      '大屏需要在远距离观看场景下快速传递关键指标、趋势、排名和异常信息，同时形成足够强的展示感和技术感。',
    challenges: ['指标多且层级复杂，容易变成装饰化堆砌', '暗色科技风需要控制发光、对比和可读性', '不同图表需要统一视觉语言并服务业务重点'],
    solutions: ['按总览指标、趋势分析、排行分布和异常预警组织屏幕结构', '控制色彩数量、线条亮度和图表密度，避免过度炫光', '建立标题、图例、指标卡、地图和图表容器规范'],
    highlights: ['驾驶舱布局', '指标卡体系', '图表视觉规范', '暗色科技风控制'],
    aiWorkflow: ['AI 辅助梳理大屏指标层级和讲述顺序', '生成图表类型匹配建议', '辅助提炼展示页说明文案'],
    frontendWork: ['配合前端确定 16:9 大屏布局栅格', '标注图表容器、字号、间距和状态色', '输出适合 ECharts 实现的视觉规则'],
    redesignPlan: ['补充 16:9 完整大屏封面', '增加图表组件拆解页', '整理暗色可视化色板与使用规则'],
    review: '该案例作为视觉冲击力较强的补充，展示大屏可视化和图表布局能力。',
  },
]

export const featuredCases = [...cases].sort((a, b) => a.priority - b.priority)

export const historicalProjects: HistoricalProject[] = [
  {
    title: '中杰工业互联网平台',
    description: '工业设备、数据监测与业务管理类平台经验，体现 B 端复杂系统设计积累。',
  },
  {
    title: '终端管理平台',
    description: '围绕终端设备接入、状态监控和远程管理的信息架构与后台界面设计。',
  },
  {
    title: '音视频通信产品',
    description: '覆盖通话、会议、设备状态与通信配置场景的产品界面设计经验。',
  },
  {
    title: '早期视觉设计合集',
    description: '包含品牌视觉、运营活动、图形版式与多类型视觉表达的基础能力沉淀。',
  },
]
