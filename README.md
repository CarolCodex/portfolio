# 曹兰个人简历作品集

这是曹兰的个人简历与 UI/UED 设计作品集网站，用于公开展示个人经历、设计能力、项目案例、前端落地能力，以及 AI 辅助设计工作流。

线上访问地址：

[https://carolcodex.github.io/portfolio/](https://carolcodex.github.io/portfolio/)

## 项目内容

- 个人简介与职业定位
- UI/UED 设计能力展示
- 项目案例与设计过程说明
- 良选小程序案例与交互 Demo
- 简历信息与工作流页面
- 面向 GitHub Pages 的自动部署流程

## 技术栈

- Vue 3
- Vite
- TypeScript
- Vue Router
- GitHub Actions
- GitHub Pages

## 本地启动

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

## 部署方式

项目已配置 GitHub Actions：

- 当代码 push 到 `main` 分支时自动执行构建
- 构建产物输出到 `dist`
- 自动发布到 `gh-pages` 分支
- GitHub Pages 使用 `/portfolio/` 子路径访问

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
