# DESIGN.md

# 设备健康管理系统设计系统工程规范

本文档定义设备健康管理系统 APP 与 PC 前端实现的设计系统规则。所有页面和组件必须优先引用本规范中的设计变量、布局规则、组件结构和状态表达，不允许按页面临时新增视觉规则。

## 1. Design Principles（设计原则）

### 工业 B 端系统风格

- 系统定位为设备运维、告警处理、任务闭环和管理看板，视觉表达必须稳定、克制、可信。
- 信息呈现优先级高于装饰表现。所有视觉层级必须服务于数据识别、状态判断和操作效率。
- 页面应支持高频使用场景，避免营销化大标题、强叙事装饰和低信息密度排版。

### 高信息密度但结构清晰

- 移动端页面采用 Header / Content / TabBar 三段式结构，内容区通过卡片、列表、标签和操作区组织信息。
- PC 端页面采用 Sidebar / Topbar / Main Content 的后台框架，优先使用表格、筛选栏、统计卡和图表卡。
- 同一屏内信息密度可以较高，但必须通过 8pt 间距、固定组件尺寸和清晰分组保持扫描效率。

### 蓝白科技视觉体系

- 主色体系围绕蓝色建立，用于主操作、导航选中、关键指标、链接和焦点态。
- 背景以浅蓝白、灰白和低饱和中性色承载，不允许使用大面积高饱和色块。
- Success / Warning / Danger 只用于业务状态，不得替代品牌主色。

### 轻玻璃拟态仅用于层级

- 轻玻璃效果只能用于登录卡片、浮层、子页高层级面板和移动端局部强调卡。
- 玻璃拟态必须具备明确功能层级，例如浮层、遮罩上方内容、子页操作面板。
- 禁止将 blur、半透明边框和大面积 glow 当作纯装饰背景使用。

### APP + PC 统一

- APP 与 PC 使用同一语义 token 命名，不因端差异新增语义色。
- APP 允许更大的触控高度和底部安全区，PC 允许更高数据密度和表格结构。
- 同一业务含义在 APP 与 PC 中必须使用一致的状态色、圆角层级、字体权重和禁用规则。

## 2. Design Tokens（设计变量体系）

### Color Tokens

所有颜色必须通过语义 token 使用。组件禁止直接写临时色值；确需新增颜色时必须先扩展 token。

#### Primary / Success / Warning / Danger / Neutral

| Token | Light | Dark | Usage |
|---|---:|---:|---|
| `--color-primary` | `#1671EE` | `#5B9BFF` | PC 主按钮、链接、导航选中、图表主线 |
| `--color-primary-app` | `#0057FF` | `#5B9BFF` | APP 主按钮、TabBar active、任务操作 |
| `--color-primary-hover` | `#2F80FF` | `#7DB0FF` | hover、active、可交互强调 |
| `--color-primary-soft` | `#EAF3FF` | `#5B9BFF26` | 选中背景、浅色主色胶囊 |
| `--color-success` | `#009966` | `#4ADE80` | 正常、运行中、已处理 |
| `--color-success-soft` | `#00BC7D26` | `#4ADE8026` | Success Tag 背景 |
| `--color-warning` | `#E17100` | `#FBBF24` | 待处理、临期、预警 |
| `--color-warning-soft` | `#FFB90026` | `#FBBF2426` | Warning Tag 背景 |
| `--color-danger` | `#E7000B` | `#F87171` | 错误、高危、逾期、删除 |
| `--color-danger-soft` | `#FB2C3626` | `#F8717126` | Danger Tag 背景 |
| `--color-neutral-900` | `#111827` | `#F3F4F6` | 主标题、关键正文 |
| `--color-neutral-700` | `#344054` | `#CBD5E1` | 二级文本、卡片正文 |
| `--color-neutral-500` | `#6B7280` | `#94A3B8` | 辅助文本、placeholder、说明 |
| `--color-neutral-300` | `#D1D5DB` | `#64748B` | 禁用文本、弱分隔 |

#### Background / Surface / Border

| Token | Light | Dark | Usage |
|---|---:|---:|---|
| `--color-bg-app` | `#F4F7FB` | `#0F172A` | APP 普通页面背景 |
| `--color-bg-soft-blue` | `#F8FBFF` | `#0F172A` | APP 子页、详情页背景 |
| `--color-bg-pc` | `#F5F7FA` | `#0F172A` | PC 主背景 |
| `--color-surface` | `#FFFFFF` | `#1E293B` | 卡片、表格、表单容器 |
| `--color-surface-muted` | `#F5F7FA` | `#FFFFFF0F` | 图标按钮、弱输入背景 |
| `--color-surface-header` | `#F7F9FC` | `#FFFFFF08` | 表头、弱层级标题区 |
| `--color-surface-hover` | `#EEF4FE` | `#5B9BFF0F` | hover 行、菜单 hover |
| `--color-border` | `#F3F4F6` | `#FFFFFF0D` | 默认分隔线 |
| `--color-border-strong` | `#E4EAF3` | `#FFFFFF14` | 输入框、筛选按钮、表格容器 |
| `--color-border-focus` | `#5B9BFF5C` | `#5B9BFF5C` | 键盘焦点环 |

#### Chart Tokens

| Token | Light | Dark | Usage |
|---|---:|---:|---|
| `--chart-blue` | `#1671EE` | `#7DB0FF` | 主趋势线、点检异常 |
| `--chart-green` | `#00BC7D` | `#4ADE80` | 在线、正常、健康指标 |
| `--chart-orange` | `#F97316` | `#FDBA74` | 临期、维护提醒 |
| `--chart-red` | `#E7000B` | `#F87171` | 告警、异常峰值 |
| `--chart-grid` | `#EEF1F6` | `#FFFFFF0F` | 图表网格线 |
| `--chart-axis` | `#9AA5B5` | `#94A3B8` | 坐标轴文本 |

### Typography Tokens

全局字体必须统一使用系统无衬线字体栈：

`Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`

日期、时间戳、设备 ID、工单号、资产编号必须使用等宽字体：

`"Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

| Token | Font Size | Line Height | Weight | Usage |
|---|---:|---:|---:|---|
| `--text-h1` | `24px` | `32px` | `600` | PC 页面一级标题、看板标题 |
| `--text-h2` | `18px` | `27px` | `600` | PC 卡片标题、APP 任务标题 |
| `--text-mobile-title` | `20px` | `28px` | `500-650` | APP Header 标题、登录品牌标题 |
| `--text-body` | `14px` | `21px` | `400-500` | 表单、表格、正文、按钮 |
| `--text-body-strong` | `14px` | `21px` | `600-800` | 设备名称、关键字段、active 文本 |
| `--text-caption` | `12px` | `16px-18px` | `400-500` | 说明、元信息、TabBar label |
| `--text-small` | `10px` | `15px` | `500-800` | APP 状态辅助、极小元信息 |
| `--text-metric` | `36px` | `40px` | `800` | PC 核心统计数字 |
| `--text-mobile-metric` | `52px` | `48px` | `900` | APP 健康评分主数字 |

#### 字重规范

- 正文默认 `400`，移动端表单与按钮可使用 `500`。
- 标题使用 `600`，不得使用低于 `500` 的标题权重。
- 关键数字、选中态、设备名称可使用 `800-900`，仅用于强调。
- Placeholder 必须使用 `400-500`，禁止与输入内容同色同权重。
- 禁止在同一组件内混用超过 3 个字重。

### Spacing System

采用 4pt / 8pt 基础体系。

| Token | Value | Usage |
|---|---:|---|
| `--space-1` | `4px` | 图标与文字最小间距、小型内部 gap |
| `--space-2` | `8px` | 标签内边距、按钮 icon gap、列表轻间距 |
| `--space-3` | `12px` | 卡片间距、表单组间距、按钮 padding |
| `--space-4` | `16px` | APP 页面 padding、卡片 padding、列表 gap |
| `--space-5` | `20px` | PC 卡片 padding、Profile 页面 padding |
| `--space-6` | `24px` | 页面区块间距、PC 主区块 gap |
| `--space-8` | `32px` | 页面底部留白、浮层大间距 |
| `--space-10` | `40px` | PC 大区块、设备信息列间距 |

#### 页面 padding / margin 规则

- APP 默认页面水平 padding 为 `16px`。
- APP Profile 可使用 `20px` 水平 padding。
- APP 子页容器可使用 `20px` 外边距形成浮层区域。
- PC Main 区域 padding 为 `20px 28px 28px`。
- PC 卡片内部默认 padding 为 `20px`，移动端卡片默认 padding 为 `14px-16px`。
- 卡片之间默认 gap 为 `12px`，PC 卡片组默认 gap 为 `16px`。

### Radius System

| Token | Value | Usage |
|---|---:|---|
| `--radius-0` | `0` | 无圆角图形、返回按钮、表格内部 |
| `--radius-4` | `4px` | PC 密集按钮、表头局部圆角 |
| `--radius-8` | `8px` | 标准卡片、筛选框、任务卡、导航项 |
| `--radius-12` | `12px` | APP 主按钮、登录底部按钮、弹窗按钮 |
| `--radius-16` | `16px` | APP 行卡、设置项、PC 登录卡内部控件 |
| `--radius-24` | `24px` | APP Profile 卡、子页玻璃面板 |
| `--radius-pill` | `999px` | Tag、胶囊按钮、头像、开关、圆形指标 |

#### 使用规则

- 默认组件优先使用 `8px`。
- 表格、PC 密集操作和小按钮可使用 `4px`。
- 登录主按钮、移动端底部主操作可使用 `12px`。
- 只有 Profile hero、子页玻璃卡和大面积移动端设置卡允许使用 `24px`。
- 禁止页面单独创造 `10px`、`18px`、`22px` 等非系统圆角。

### Shadow System

| Token | Value | Usage |
|---|---|---|
| `--shadow-level-1` | `0 1px 2px rgba(0, 0, 0, 0.05)` | 输入容器、轻量卡片、任务卡 |
| `--shadow-level-2` | `0 10px 28px rgba(34, 54, 88, 0.06)` | APP 普通信息卡 |
| `--shadow-level-3` | `0 18px 48px rgba(15, 31, 61, 0.07)` | 登录卡、浮层、下拉菜单 |
| `--shadow-pc-card` | `0 1px 2px rgba(23, 33, 60, 0.04), 0 6px 18px rgba(23, 33, 60, 0.05)` | PC 卡片 |
| `--shadow-primary` | `0 10px 22px rgba(22, 113, 238, 0.22)` | 主按钮强调 |

#### 阴影规则

- 浅色模式允许使用阴影表达卡片层级。
- 深色模式禁止使用强投影表达层级，必须改用边框、背景差和浅色描边。
- 移动端大面积列表不使用重阴影，只使用 `level-1` 或边框。
- 同一卡片上禁止叠加超过 2 层阴影。

## 3. Layout System（布局规范）

### 375px mobile base rule

- APP 以 `375px` 宽度为设计和实现基准。
- 页面宽度小于 `375px` 时，内容必须保持可读，卡片和按钮不得横向溢出。
- 页面宽度大于 `375px` 时，APP 预览可按容器缩放或居中展示，但组件内部尺寸仍按移动端 token 执行。
- 移动端禁止依赖 viewport width 动态缩放字体。

### Safe area rules

- APP Header 顶部必须预留状态栏空间，默认 `padding-top: 48px`。
- APP Header 基础高度为 `88px-96px`，内容区从 Header 下方开始。
- 底部 TabBar 页面必须为内容区预留 `64px` TabBar 高度。
- 有底部主操作的登录页必须预留底部安全区，底部操作区 padding 不小于 `16px 16px 32px`。
- iOS/全面屏环境应叠加 `env(safe-area-inset-top)` 与 `env(safe-area-inset-bottom)`，但不得改变组件视觉高度。

### Tabbar height

- APP TabBar 固定高度为 `64px`。
- TabBar 使用 4 等分栅格，每个入口包含 icon + label。
- TabBar 顶部必须有 `1px` 分隔线，允许 `rgba(255,255,255,0.86-0.96)` 背景和 `blur(6px)`。
- TabBar 不在二级详情页、通知详情页、点检/缺陷/检修等沉浸子页展示。

### Page padding

| Context | Padding |
|---|---:|
| APP Home | `14px 16px 16px` |
| APP Todo | `0 16px 32px`，外层 main 可为 `0` |
| APP Workbench | `16px` |
| APP Profile | `0 20px` |
| APP Subpage | 内容卡 `20px` 外边距 |
| PC Main | `20px 28px 28px` |
| PC Card | `20px` |

### Grid system

#### APP grid

- 统计卡、图表卡、Profile 统计采用 2 列布局：`repeat(2, minmax(0, 1fr))`。
- 2 列卡片 gap 为 `10px-12px`。
- Workbench 功能入口可使用 2 列或 3 列，必须保持同组等高。
- 点检操作区使用 3 列布局，卡片高度保持一致，不允许内容撑开。

#### PC grid

- PC 预览基准宽度为 `1339px`，Sidebar 为 `216px`，Topbar 高度为 `48px`。
- PC 内容区最大宽度约 `1067px`，主区块 gap 为 `16px-24px`。
- PC Dashboard 统计卡采用 4 列布局。
- PC 图表卡和表格卡采用 2 列布局。
- PC 表格必须使用 `table-layout: fixed`，列宽由业务字段类型定义。

## 4. Component System（组件规范）

### Button

#### size（height / padding）

| Context | Height | Padding | Radius | Font |
|---|---:|---:|---:|---|
| APP primary | `52px` | `0 16px` | `12px` | `16px / 24px / 500` |
| APP task action | `33px` | `0 12px` | `8px` | `14px / 21px / 500` |
| APP icon button | `32px` | `0` | `8px` | icon only |
| PC primary | `36px` | `0 16px` | `8px` | `14px / 21px` |
| PC dense | `32px` | `0 12px` | `4px-6px` | `14px / 21px` |
| Shared small | `28px` | `0 12px` | `999px` | `12px / 16px / 700` |

#### variant（primary / secondary / ghost）

| Variant | Background | Border | Text | Usage |
|---|---|---|---|---|
| `primary` | `--color-primary` or `--color-primary-app` | transparent | `#FFFFFF` | 登录、提交、新增、主要处理 |
| `secondary` | `--color-surface` | `--color-border-strong` | `--color-neutral-700` | 筛选、取消、次要操作 |
| `ghost` | transparent | transparent | `--color-neutral-700` | 表格行内操作、Header icon |
| `danger` | transparent or `--color-danger` | semantic | `--color-danger` or `#FFFFFF` | 删除、退出、危险确认 |

#### state（default / hover / disabled / loading）

| State | Rule |
|---|---|
| default | 尺寸固定，不因文本变化改变高度 |
| hover | PC 可改变背景和阴影；APP 只使用轻微透明度或 active 缩放 |
| active | 可使用 `transform: scale(0.97)`，仅用于按钮本体 |
| focus | 使用 `0 0 0 2px var(--color-border-focus)` |
| disabled | opacity 降至 `40%-50%`，禁用 pointer 和 hover |
| loading | 保持原宽高，左侧或居中放置 `16px` loading indicator，文字不得跳动 |

### Input

#### height

| Context | Height | Padding | Radius |
|---|---:|---:|---:|
| APP login input | `48px` | `0 13px` | `6px` |
| APP search input | `46px` | `0 14px` | `8px` |
| PC login input | `44px` | `0 14px` | `10px` |
| PC toolbar input | `36px` | `0 12px` | `8px` |
| PC dense input | `32px` | `0 12px` | `4px` |

#### radius

- 移动端输入默认使用 `6px-8px`。
- PC 登录输入允许 `10px`，后台筛选输入使用 `8px`。
- 同一表单内所有 input、select、search 必须保持相同高度和圆角。

#### focus state

| State | Border | Background | Text |
|---|---|---|---|
| default | `--color-border-strong` or `#E5E7EB` | `--color-surface` | `--color-neutral-900` |
| hover | `--color-primary-soft` | `--color-surface` | unchanged |
| focus | `--color-primary` | `--color-surface` | unchanged |
| focus ring | `0 0 0 2px rgba(37, 99, 235, 0.1)` for APP, `0 0 0 4px rgba(22, 113, 238, 0.08)` for PC login |
| disabled | `--color-border` | `--color-surface-muted` | `--color-neutral-300` |

### Card

#### padding

| Card Type | Padding | Radius | Shadow |
|---|---:|---:|---|
| APP standard card | `14px-16px` | `8px` | `level-1` or `level-2` |
| APP task card | `16px` main, `13px 16px 12px` footer | `8px` | `level-1` |
| APP profile hero | `20px` | `24px` | `level-1` |
| APP subpage glass card | `17px-20px` | `16px-24px` | soft shadow + blur |
| PC card | `20px` | `8px` | `--shadow-pc-card` |
| PC stat card | `20px 24px` | `8px` | `--shadow-pc-card` |

#### shadow

- APP 普通卡片使用 `0 10px 28px rgba(34, 54, 88, 0.06)`。
- APP 列表任务卡使用 `0 1px 1px rgba(0, 0, 0, 0.05)`。
- PC 卡片使用 `--shadow-pc-card`。
- 深色 PC 卡片必须改为 `box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08)`。

#### border

- APP 卡片默认边框为 `1px solid rgba(16, 24, 40, 0.04)` 或 `#F3F4F6`。
- 任务优先级卡可使用 `4px` 左边框表达优先级。
- PC 卡片默认无显性边框，深色模式必须有弱描边。

### Tag

#### color system mapping

| Semantic | Text | Background | Usage |
|---|---|---|---|
| success | `--color-success` | `--color-success-soft` | 运行中、正常、已完成 |
| warning | `--color-warning` | `--color-warning-soft` | 预警、待处理、临期 |
| danger | `--color-danger` | `--color-danger-soft` | 高危、告警、逾期 |
| info | `--color-primary` | `--color-primary-soft` | 计划中、可点击信息 |
| neutral | `--color-neutral-500` | `--color-surface-muted` | 已关闭、禁用、普通分类 |

#### size

| Context | Height | Min Width | Padding | Radius | Font |
|---|---:|---:|---:|---:|---|
| APP priority pill | `26px` | `48px` | `0 8px` | `999px` | `12px / 18px / 500` |
| APP small state | `20px-24px` | auto | `3px 6px` | `5px-999px` | `10px-12px` |
| PC table tag compact | `26px` | `58px` | `0 12px` | `999px` | `14px / 21px / 600` |
| PC table tag standard | `29px` | `52px` | `0 12px` | `999px` | `14px / 21px` |

### List

#### spacing

- APP List 默认使用 `display: flex; flex-direction: column; gap: 12px`。
- 设置类列表行高为 `80px-81px`，图标列固定 `40px`。
- 告警和消息列表可使用 `8px-12px` 行间距，列表项内部 gap 为 `10px-16px`。
- PC 表格列表不使用卡片 gap，使用行高和分隔线组织。

#### divider rule

- APP 卡片内部列表使用 `1px solid #F1F5F9` 或 `#F3F4F6` 分隔。
- APP 列表项最后一项不显示底部分隔线。
- PC table 行分隔线为 `#F2F4F8`，深色为 `rgba(255,255,255,0.05)`。
- 分隔线不得使用高对比黑色或品牌蓝色。

### TabBar

#### height

- APP TabBar 高度固定 `64px`。
- PC 顶层导航不使用 TabBar，使用 Sidebar + Topbar。
- 页内 Tabs 可使用 `46px` 移动端高度或 `52px` 通用 underline 高度。

#### active state

- APP TabBar active 颜色为 `--color-primary-app`。
- inactive 颜色为 `#6B7280` 或 `#98A2B3`。
- 页内 Tabs active 使用底部 `32px x 2px` 指示条。
- active 状态不得同时使用多个强强调方式，颜色 + 指示条已足够。

#### icon + label rules

- TabBar 每项必须包含 icon + label。
- icon 尺寸控制在 `16px-24px` 范围内。
- label 使用 `10px / 15px / 500`。
- icon 与 label gap 为 `3px-4px`。
- TabBar 文案必须短，不超过 4 个中文字符。

## 5. Page Patterns（页面结构规范）

页面规范只定义结构、层级和组件使用，不描述单个页面的视觉细节。

### Login Page Structure

#### Header

- APP 登录页 Header 使用品牌区，不使用常规导航 Header。
- PC 登录页 Header 位于品牌侧栏或登录卡片内，必须包含系统名称和登录语境。

#### Content

- APP 登录页内容区由背景层、品牌层、表单卡片层组成。
- PC 登录页使用品牌信息区 + 登录表单区的左右结构。

#### Card 区域

- 登录表单必须置于独立 Card 中。
- 表单字段顺序固定：企业/组织选择、账号、密码、辅助选项。
- Card 内字段高度必须统一，字段间距为 `16px`。

#### Action 区

- 主操作为单一 primary 登录按钮。
- APP 登录主按钮放在底部操作区，宽度 100%，高度 `52px`。
- 辅助操作如企业配置、忘记密码必须弱化，不得抢占主按钮层级。

### Home Page Structure

#### Header

- 使用 APP 常规 Header，包含左侧菜单入口、居中标题、右侧消息或搜索入口。
- Header 高度遵循 `88px-96px`，不得在页面内重复标题栏。

#### Content

- 内容区采用纵向 stack，默认 gap 为 `12px`。
- 先呈现概览和核心指标，再呈现趋势、状态分布和最新告警。

#### Card 区域

- 概览卡、评分卡、统计卡、图表卡、告警卡必须使用统一 Card 基础结构。
- 统计类卡片使用 2 列 grid。
- 图表和状态分布允许使用并列卡片，宽度按 2 列等分。

#### Action 区

- 卡片级操作放在 Card Header 右侧，例如查看全部。
- 图表交互只改变选中态，不改变布局尺寸。
- 状态切换按钮必须保持点击区域不小于 `44px`。

### Todo Page Structure

#### Header

- 使用 APP 常规 Header，左侧为菜单或返回入口，右侧为消息/搜索入口。
- Header 背景可使用浅蓝到页面背景的弱渐变。

#### Content

- 首屏结构为概览 Banner、状态 Tabs、搜索筛选、任务列表。
- Tabs 固定高度 `46px`，搜索筛选区高度 `46px`。
- 任务列表使用纵向卡片，gap 为 `12px`。

#### Card 区域

- 任务卡必须包含顶部设备/优先级、中部任务标题/元信息、底部分配人与操作。
- 任务优先级通过左边框和 Tag 同步表达，禁止只用文字表达。
- 任务卡最小高度为 `181px`，footer 与 main 之间必须有分隔线。

#### Action 区

- 每张任务卡右下角保留一个主操作按钮。
- 筛选按钮与搜索框同高或视觉居中，不得低于 `42px`。
- 批量操作需放在列表上方工具栏，不得塞入单卡 footer。

### Workbench Structure

#### Header

- 使用 APP 常规 Header，标题为工作台语境。
- Header 背景可以与工作台 Banner 形成连续浅蓝背景，但不得遮挡内容。

#### Content

- 首屏为工作台 Banner，其后按业务域分组。
- 每个业务域包含 Section Header 和入口 Grid。

#### Card 区域

- Section Header 必须包含图标、标题和弱说明。
- 入口卡必须等高，结构为 icon、标题、描述。
- 同一 Section 内入口卡不得混用不同圆角、阴影和 icon 容器尺寸。

#### Action 区

- 入口卡整体可点击。
- active 入口只改变边框、背景或文字主色，不改变卡片尺寸。
- 二级业务入口跳转后隐藏 TabBar，进入子页结构。

### Profile Structure

#### Header

- 使用 APP 常规 Header，标题居中，右侧可放搜索、消息或设置入口。
- Profile Header 可使用弱 blur 和浅蓝背景，但标题尺寸必须在 `17px-18px` 范围。

#### Content

- 内容区由用户 Hero Card、信息列表、设置列表、退出操作组成。
- 水平 padding 为 `20px`。
- 模块间距为 `16px`。

#### Card 区域

- 用户 Hero Card 使用 `24px` 圆角，包含头像、姓名、角色标签、组织信息。
- 设置列表使用白色 Card，行内结构为 icon、标题说明、右侧控件或箭头。
- 开关控件固定宽高，不得随文案变化。

#### Action 区

- 退出登录使用 danger 或弱化按钮样式，必须与普通设置项区分。
- Profile 中的系统配置类操作必须放在设置列表，不得散落在页面底部。

## 6. State System（状态规范）

### Loading

- Loading 必须保持组件原尺寸，不允许引发布局跳动。
- 按钮 loading 使用 `16px` spinner 或等尺寸 icon 替换区。
- 页面 loading 使用骨架屏或 Card 内局部 loading，不使用全屏纯文字等待。
- 表格 loading 保留表头和筛选区，只替换 tbody 内容。

### Empty

- Empty 使用独立 Card 或列表占位行承载。
- Empty 文案必须说明当前为空的对象，例如暂无待办、暂无告警。
- Empty 卡片 padding 不小于 `18px`，文字使用 `--color-neutral-500`。
- Empty 不使用 danger 或 warning 色。

### Error

- Error 使用 `--color-danger` 与 `--color-danger-soft`。
- 表单错误应在字段下方显示，不改变字段高度导致布局大幅跳动。
- 列表项错误可通过 Tag、左边框或状态点表达。
- 系统级错误需要提供恢复动作，例如重试、返回、刷新。

### Warning

- Warning 使用 `--color-warning` 与 `--color-warning-soft`。
- Warning 用于预警、临期、待处理，不用于错误或删除。
- 同一任务中 warning 优先级可通过左边框 + Tag 表达。
- Warning 文案必须可行动，避免只写注意、异常等模糊词。

### Success

- Success 使用 `--color-success` 与 `--color-success-soft`。
- Success 用于正常、运行中、已处理、同步成功。
- 成功状态不使用大面积绿色背景，只使用 Tag、状态点、轻提示。
- Success 与 Primary 不得混用在同一个主按钮上。

### Disabled

- Disabled 文本使用 `--color-neutral-300`。
- Disabled 控件背景使用 `--color-surface-muted`，透明度可降至 `40%-50%`。
- Disabled 控件必须移除 hover、active、click 行为。
- Disabled 不能只靠降低透明度表达，必要时配合禁用 cursor 和 aria-disabled。

## 7. Anti-patterns（禁止规范）

- 禁止混用多个字体体系。中文、英文和数字必须使用统一全局字体栈，编号类信息才允许使用等宽字体。
- 禁止随意新增颜色。所有颜色必须先归入 Primary / Success / Warning / Danger / Neutral / Background / Surface / Border。
- 禁止组件尺寸不统一。同一工具栏内按钮、输入框、筛选控件必须同高。
- 禁止页面级自定义圆角。圆角只能从 Radius System 中选择。
- 禁止用装饰性渐变替代信息层级。渐变必须服务于 Header、Banner 或主按钮。
- 禁止在深色模式使用浅色模式投影。深色模式只能通过背景差、边框和弱发光表达层级。
- 禁止把 Warning、Danger 色用于普通强调或品牌表达。
- 禁止卡片内嵌套卡片，除非内层是明确的列表项、弹窗或数据表容器。
- 禁止移动端页面横向滚动。内容必须在 320px 最小宽度下可收缩。
- 禁止按钮文字溢出。长文案必须换短文案或使用 icon + tooltip。
- 禁止 TabBar 超过 4 个主入口，禁止 TabBar 文案超过 4 个中文字符。
- 禁止列表项 hover/active 改变高度、padding、border 宽度导致布局跳动。
- 禁止使用纯图标表达关键业务状态，必须有文本或可访问标签。
- 禁止在同一页面混用 8px、12px、16px、24px 卡片圆角表达同一层级。
- 禁止在 APP 常规页面隐藏 Header 后直接展示内容，沉浸子页除外。
- 禁止在 PC 表格中使用自适应内容撑宽列，必须使用固定表格布局和省略规则。
