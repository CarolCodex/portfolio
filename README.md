# UI/UED Designer Portfolio

一个面向面试展示的 UI/UED 设计师个人简历作品集网站，突出「设计策略 + 前端落地 + AI 工作流」的复合能力。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Vue Router
- 普通 CSS，无后端服务，无复杂 UI 库

## 启动方式

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

## 目录结构

```text
src/
  assets/
    styles.css          全局样式与响应式规则
  components/
    AppHeader.vue       顶部导航
    AppFooter.vue       底部信息
    HeroSection.vue     首页首屏
    SkillTag.vue        技能标签
    CaseCard.vue        案例卡片
    SectionTitle.vue    区块标题
    BeforeAfter.vue     改版前后对比占位
    Timeline.vue        AI 工作流时间线
  data/
    profile.ts          个人信息
    cases.ts            案例数据
    skills.ts           技能数据
  router/
    index.ts            路由配置
  views/
    Home.vue            首页
    Cases.vue           案例列表页
    CaseDetail.vue      案例详情页
    Resume.vue          简历页
    Workflow.vue        AI 工作流页
```

## 后续扩展建议

- 将 `src/data/cases.ts` 中的渐变 `cover` 替换为脱敏后的真实项目截图。
- 为案例详情增加 `gallery`、`metrics`、`process` 等字段，展示更完整的设计过程。
- 增加 PDF 简历下载入口，或将简历数据拆成更细的模块。
- 若需要部署，可直接使用 Vercel、Netlify 或静态服务器托管 `npm run build` 生成的 `dist` 目录。
