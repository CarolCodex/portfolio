# DESIGN_MOBILE.md

# 设备健康管理平台 Mobile Design System Spec

本文档用于 Figma Make 生成移动端页面时作为唯一移动端规范源文件。目标是从 PC 设计规范页与 APP `DESIGN.md` 中抽象统一 Design System，并定义移动端适配约束。本文档不生成 UI，不重设视觉方向，只规定跨端继承、移动端重写、组件映射、页面结构与交互规则。

## 1. Cross-platform Design Principles（跨端设计原则）

### Unified system rules

- PC 与 Mobile 必须共用同一套语义 token 命名，不允许为同一业务含义创建两套颜色、状态或圆角语义。
- 平台定位保持一致：工业 B 端、设备运维、告警处理、任务闭环和管理看板，视觉必须稳定、克制、可信。
- 信息层级优先于装饰表现。色彩、阴影、圆角、图标、图表均服务于状态识别、数据扫描和操作效率。
- Primary / Success / Warning / Danger / Neutral 的语义在 PC 与 Mobile 中完全一致。
- 同一业务状态在 PC 与 Mobile 中必须使用一致状态色、文本权重、禁用规则和可访问标签。
- 轻玻璃拟态只用于明确层级：登录卡片、浮层、子页高层级面板或移动端局部强调卡，不作为纯背景装饰。
- 深色模式规则跨端一致：禁止使用浅色模式重投影表达层级，改用背景差、弱描边和低透明度发光。

### Must stay consistent

| System | Cross-platform rule |
|---|---|
| Color | 继承 `Primary / Success / Warning / Danger / Neutral / Background / Surface / Border / Chart` 语义，不新增页面级临时色。 |
| Radius | 只能从 `0 / 4 / 8 / 12 / 16 / 24 / pill` 选择，同一层级跨端含义一致。 |
| Typography | 使用统一系统无衬线字体栈；设备 ID、工单号、日期时间使用等宽字体。 |
| State | Loading、Empty、Error、Warning、Success、Disabled 的状态语义与反馈方式保持一致。 |
| Icon semantics | 同一业务入口与状态图标保持同语义，不因端差异改变含义。 |
| Chart semantics | 图表主线、正常、预警、告警、网格线与坐标轴颜色继承 PC 图表 token。 |
| Component naming | Button、Card、Input、Tag、List、Tabs、Modal 等组件命名保持一致。 |

### May differ by platform

| Area | PC rule | Mobile rule |
|---|---|---|
| Spacing | 更高密度，主区 `20px 28px 28px`，卡片 `20px`。 | 触控优先，页面水平 `16px`，卡片 `14px-16px`，Profile 可用 `20px`。 |
| Layout | Sidebar / Topbar / Main Content，表格与多列看板优先。 | Header / Content / TabBar，单列内容流优先。 |
| Density | 表格、筛选栏、统计卡、图表卡高密排列。 | 信息折叠为列表、卡片、分组入口和底部操作。 |
| Interaction | 支持 hover、tooltip、鼠标精细操作。 | 禁止依赖 hover，使用 tap、toast、bottom sheet 和明确状态反馈。 |
| Navigation | PC 使用 Sidebar + Topbar，不使用 TabBar。 | 一级页面使用 4 项 TabBar，二级业务页隐藏 TabBar。 |

## 2. Mobile Adaptation Rules（移动端适配规则）

### 375px base

- Mobile 以 `375px` 宽度为设计、布局和 Figma Make 生成基准。
- 最小可用宽度为 `320px`；任何内容不得横向滚动或溢出屏幕。
- 大于 `375px` 时，移动端组件内部尺寸仍按 Mobile token 执行，可整体居中或容器自适应。
- 禁止使用 viewport width 动态缩放字体；字体必须使用 token 固定值。
- 所有固定格式组件必须有稳定尺寸约束，例如 TabBar、Header、工具栏、图标按钮、统计卡、任务卡和入口卡。

### Safe area rules

| Area | Mobile rule |
|---|---|
| Top safe area | Header 顶部预留状态栏空间，默认 `padding-top: 48px`。 |
| Header visual height | 常规页面 Header 总高度 `88px-96px`，实现基准为 `96px`。 |
| Content start | 内容区从 Header 下方开始，不在常规页面隐藏 Header。 |
| Bottom safe area | 有底部主操作时，底部 padding 不小于 `16px 16px 32px`。 |
| Native safe area | iOS/全面屏环境叠加 `env(safe-area-inset-top)` 与 `env(safe-area-inset-bottom)`，不得改变组件视觉高度。 |
| Home indicator | 沉浸子页如点检、缺陷、检修需保留底部安全留白或 home indicator 区域。 |

### Header / TabBar height

| Component | Mobile size rule |
|---|---|
| Header shell | `96px` grid row，内部 `padding: 48px 16px 16px`。 |
| Header columns | `40px minmax(0, 1fr) 40px`，左右区域保持对称。 |
| Header title | 默认 `20px / 28px / 500-650`；Profile 可为 `18px / 28px / 500`；About 可为 `17px / 25.5px / 500`。 |
| Header icon button | 视觉尺寸 `32px`，触控热区不得小于 `44px`。 |
| TabBar | 固定 `64px`，4 等分 grid，顶部 `1px` 分隔线。 |
| TabBar icon | `16px-24px`，icon 与 label gap `3px-4px`。 |
| TabBar label | `10px / 15px / 500`，文案不超过 4 个中文字符。 |

### Mobile density

- Mobile 信息密度应低于 PC，但不能营销化或低信息量；以“首屏概览 + 卡片摘要 + 列表详情 + 子页展开”为默认密度模型。
- 移动端每屏优先承载一个主任务：查看概览、处理待办、进入工作台、管理个人设置。
- 卡片内最多展示 2-3 层信息：标题/状态、关键元信息、单一主操作。超过内容必须进入详情页或折叠区。
- 统计信息优先使用 2 列 grid；业务入口可使用 2 列，只有短标题且等高时允许 3 列。
- 列表间距默认 `12px`，卡片内 gap 使用 `8px-16px`，不得用过大留白稀释 B 端信息密度。

### PC to Mobile information folding

| PC pattern | Mobile adaptation |
|---|---|
| Sidebar navigation | 折叠为 Header 左侧菜单入口或 Workbench 业务分组入口。 |
| Topbar actions | 折叠为 Header 右侧单一 icon、更多菜单或子页工具栏。 |
| 4 列统计卡 | 折叠为 2 列统计卡，必要时纵向滚动。 |
| 2 列图表/表格 | 折叠为单列卡片流，图表优先于明细表。 |
| Table | 转换为 List/Card，每行字段按优先级展示。 |
| Toolbar filters | 转换为搜索框 + 筛选按钮，复杂筛选进入 Bottom Sheet。 |
| Modal dialog | 转换为 Bottom Sheet 或全屏子页。 |
| Tooltip | 转换为 Toast、Inline helper 或 Info Sheet。 |

## 3. Token Inheritance System（Token继承系统）

### Tokens inherited exactly from PC + APP

| Token group | Inheritance rule |
|---|---|
| Semantic colors | `--color-primary`、`--color-success`、`--color-warning`、`--color-danger`、`--color-neutral-*` 语义完全继承。 |
| Status soft colors | `--color-primary-soft`、`--color-success-soft`、`--color-warning-soft`、`--color-danger-soft` 完全继承。 |
| Surface colors | `--color-surface`、`--color-surface-muted`、`--color-surface-header`、`--color-surface-hover` 完全继承。 |
| Border colors | `--color-border`、`--color-border-strong`、`--color-border-focus` 完全继承。 |
| Chart colors | `--chart-blue`、`--chart-green`、`--chart-orange`、`--chart-red`、`--chart-grid`、`--chart-axis` 完全继承。 |
| Typography stack | 全局字体栈与等宽字体栈完全继承。 |
| Radius scale | `--radius-0/4/8/12/16/24/pill` 完全继承，不新增非系统圆角。 |
| State semantics | Loading、Empty、Error、Warning、Success、Disabled 完全继承。 |

### Mobile overrides

| Token | Mobile value | Reason |
|---|---:|---|
| `--color-primary-app` | `#0057FF` | APP 主按钮、TabBar active、任务操作使用更明确的移动主色。 |
| `--color-bg-app` | `#F4F7FB` | 移动普通页面背景。 |
| `--color-bg-soft-blue` | `#F8FBFF` | 移动子页、详情页背景。 |
| `--text-mobile-title` | `20px / 28px / 500-650` | Header 标题与登录品牌标题。 |
| `--text-mobile-metric` | `52px / 48px / 900` | 健康评分等移动端核心数字。 |
| `--space-page-mobile-x` | `16px` | 默认移动页面水平 padding。 |
| `--space-card-mobile` | `14px-16px` | 移动端卡片 padding。 |
| `--radius-mobile-primary-action` | `12px` | 登录按钮、底部主操作。 |
| `--shadow-mobile-card` | `0 10px 28px rgba(34, 54, 88, 0.06)` | APP 普通信息卡层级。 |
| `--shadow-mobile-list-card` | `0 1px 1px rgba(0, 0, 0, 0.05)` | 任务卡、列表卡的低干扰层级。 |

### Mobile added tokens

| New token | Value | Usage |
|---|---:|---|
| `--mobile-base-width` | `375px` | Figma Make 移动端生成基准。 |
| `--mobile-min-width` | `320px` | 最小适配宽度。 |
| `--mobile-header-height` | `96px` | 常规 Header 行高。 |
| `--mobile-header-safe-top` | `48px` | 状态栏预留。 |
| `--mobile-header-padding-x` | `16px` | Header 默认水平 padding。 |
| `--mobile-tabbar-height` | `64px` | 一级 TabBar 高度。 |
| `--mobile-touch-target` | `44px` | 最小触控热区。 |
| `--mobile-bottom-safe-padding` | `32px` | 底部操作安全留白。 |
| `--mobile-page-gap` | `12px` | 页面卡片流默认 gap。 |
| `--mobile-section-gap` | `16px` | 模块间距。 |
| `--mobile-grid-gap` | `10px-12px` | 2 列 grid gap。 |
| `--mobile-sheet-radius` | `16px 16px 0 0` | Bottom Sheet 顶部圆角。 |
| `--mobile-toast-radius` | `8px-12px` | Toast 圆角。 |
| `--mobile-sticky-z-index` | `10` | Sticky header/tabs 层级。 |

### Token conflict rule

- Mobile 新增 token 只能描述触控、安全区、移动布局和移动组件尺寸，不能新增业务语义。
- 如果 PC token 与 Mobile token 表达同一语义，以共享 token 为准；Mobile token 只覆盖尺寸、密度和空间。
- Figma Make 中组件变量必须优先绑定共享 token，再绑定 Mobile override token。

## 4. Mobile Component Mapping（组件映射）

### Button（PC vs Mobile）

| Aspect | PC Button | Mobile Button |
|---|---|---|
| Primary height | `36px` | `52px` 登录/底部主按钮；任务操作可 `33px`。 |
| Dense height | `32px` | 不作为常规触控按钮；若视觉为 `32px`，触控热区仍需 `44px`。 |
| Radius | `4px-8px` | 主操作 `12px`，任务操作 `8px`，小胶囊 `pill`。 |
| Padding | `0 12px-16px` | 主按钮 `0 16px`，任务按钮 `0 12px`。 |
| State | 支持 hover、focus、loading、disabled。 | 禁止 hover 依赖；使用 pressed opacity/scale、loading、disabled、toast 反馈。 |
| Icon rule | 可使用 icon + text 或纯文本。 | 工具按钮优先 icon，必须提供 aria label；关键动作保留文本。 |

### Card

| Aspect | PC Card | Mobile Card |
|---|---|---|
| Padding | `20px`，统计卡 `20px 24px`。 | 标准 `14px-16px`，Profile hero `20px`，子页玻璃卡 `17px-20px`。 |
| Radius | 默认 `8px`，展示页可 `12px`。 | 标准 `8px`；行卡/设置项 `16px`；Profile hero/高层级面板 `24px`。 |
| Shadow | `--shadow-pc-card`。 | `level-1` 或 `level-2`，列表卡使用轻阴影或边框。 |
| Structure | 可承载图表、表格、筛选、统计组合。 | 卡片必须聚焦单一信息组，不做复杂嵌套。 |

### Input

| Aspect | PC Input | Mobile Input |
|---|---|---|
| Height | 登录 `44px`；toolbar `36px`；dense `32px`。 | 登录 `48px`；搜索 `46px`；同表单字段高度统一。 |
| Radius | 登录 `10px`；后台筛选 `8px`；dense `4px`。 | 默认 `6px-8px`。 |
| Padding | `0 12px-14px`。 | `0 13px-14px`。 |
| Focus | PC 可使用更明显 focus ring。 | 使用主色边框与轻 focus ring，不引起布局跳动。 |
| Keyboard | PC 按字段类型。 | 必须设置移动输入类型，例如 search、number、decimal、password。 |

### Table → List

| PC Table element | Mobile List mapping |
|---|---|
| Row | 一张 list card 或一行设置项。 |
| Column | 按优先级折叠为标题、状态、元信息、辅助字段。 |
| Status column | 转换为 Tag、状态点、左边框或右侧状态文本。 |
| Row action | 转换为卡片底部主操作、右侧 chevron 或 swipe action。 |
| Sorting/filtering | 转换为顶部 Tabs、Search、Filter button、Bottom Sheet。 |
| Pagination | 转换为滚动加载、分段加载或列表底部加载状态。 |

### Modal → Bottom Sheet

| PC Modal | Mobile Bottom Sheet |
|---|---|
| 居中弹窗 | 底部弹层，顶部圆角 `16px 16px 0 0`。 |
| 多按钮 footer | 底部固定 action，主次按钮层级明确。 |
| 大表单 modal | 优先全屏子页；短表单可 Bottom Sheet。 |
| 宽表格 modal | 禁止迁移为横向滚动表格，必须转为列表或分组字段。 |
| Dismiss | 支持关闭按钮、遮罩点击和向下滑动，但危险确认不得仅靠手势关闭。 |

### Tooltip → Toast

| PC Tooltip | Mobile replacement |
|---|---|
| Hover tooltip | Toast、Inline helper、Info Sheet。 |
| 图标解释 | 点击 info icon 后展示 Toast 或 Bottom Sheet。 |
| 表单说明 | 字段下方 helper text。 |
| 错误提示 | 字段 error text 或顶部/底部 Toast，不能只用 tooltip。 |

## 5. Mobile Layout System（布局系统）

### Single-column first

- Mobile 页面默认单列结构：Header / Content / TabBar。
- Content 内使用纵向 stack，默认 gap `12px`。
- 同一页面只允许一个主滚动容器，禁止内外双滚动导致手势冲突。
- 业务详情、图表、列表、设置项都优先进入单列卡片流。

### Card flow layout

- 卡片按信息优先级纵向排列：概览优先、任务处理其次、详情补充最后。
- 卡片宽度使用 `100%`，跟随页面 padding，不使用 PC 固定宽度。
- 卡片间距默认 `12px`，模块间距可用 `16px`。
- 卡片内部不得嵌套卡片；如果需要分组，使用 divider、section header 或 list row。

### 2-column grid conditions

- 仅以下场景允许 2 列 grid：统计卡、Profile 统计、短业务入口、轻量图表摘要。
- 2 列 grid 必须使用 `repeat(2, minmax(0, 1fr))`，gap `10px-12px`。
- 卡片内容必须短且同组等高，不允许长文本撑高导致错位。
- 当单项内容超过 2 行标题或包含多操作时，必须降级为单列。
- 320px 宽度下必须保持可读，不得压缩到文字溢出。

### 3-column grid limitations

- 3 列只允许用于点检操作区或图标型短入口。
- 3 列入口必须等高，内容由 icon + 4 字以内标题组成。
- 3 列入口不得承载描述文本、状态标签或多操作。
- 任何 3 列内容在 320px 出现拥挤时必须降级为 2 列或横向分组入口。

### Scroll-first principle

- Mobile 通过纵向滚动承载信息，不通过横向滚动模拟 PC 表格。
- 列表、图表、卡片内容超出时优先纵向续接或进入详情页。
- Sticky 元素不得遮挡内容；需要给内容区保留 Header/TabBar/Bottom Action 高度。
- 长列表使用局部 loading、empty、error，不用全屏纯文字等待。

### Sticky header / tab rules

- Header 可 sticky/fixed，但高度必须稳定为 `88px-96px`。
- 页面状态 Tabs 可 sticky 在 Header 下方，高度 `46px`。
- Sticky Tabs active 使用颜色或 `32px x 2px` 指示条，不同时叠加多种强强调。
- TabBar 只在一级页面展示：Home、Todo、Workbench、Profile。
- 通知、关于系统、点检、缺陷、检修等二级或沉浸子页必须隐藏 TabBar。

## 6. Page Structure System（页面结构）

页面结构只规定区域、组件类型和约束，不描述页面长相。

### Login

| Area | Mobile structure rule |
|---|---|
| Header | 使用品牌区，不使用常规导航 Header。品牌区只能包含系统标识与系统名称。 |
| Content | 由背景层、品牌层、表单卡片层组成；背景只作为弱层级，不承载交互。 |
| Card | 登录表单必须置于独立 Card；字段顺序固定为企业/组织选择、账号、密码、辅助选项。 |
| Action | 单一 primary 登录按钮，宽度 `100%`，高度 `52px`，圆角 `12px`，底部安全区 padding 不小于 `32px`。 |
| TabBar | 登录态不展示 TabBar。 |

### Home

| Area | Mobile structure rule |
|---|---|
| Header | 使用常规 Header；左侧菜单入口，居中标题，右侧消息或搜索入口。 |
| Content | 纵向 stack，先概览和核心指标，再趋势、状态分布、最新告警。 |
| Card | 概览卡、评分卡、统计卡、图表卡、告警卡均继承移动 Card 基础结构。 |
| Action | 卡片级操作放在 Card Header 右侧；状态切换按钮触控热区不小于 `44px`。 |
| TabBar | 展示 TabBar，当前项为 Home，active 使用 `--color-primary-app`。 |

### Todo

| Area | Mobile structure rule |
|---|---|
| Header | 使用常规 Header；左侧菜单或返回入口，右侧消息/搜索入口。 |
| Content | 首屏结构固定为概览 Banner、状态 Tabs、搜索筛选、任务列表。 |
| Card | 任务卡包含设备/优先级、任务标题/元信息、分配人与单一主操作。 |
| Action | 每张任务卡右下角保留一个主操作；批量操作放列表上方工具栏。 |
| TabBar | 展示 TabBar，当前项为 Todo/待办。 |

### Workbench

| Area | Mobile structure rule |
|---|---|
| Header | 使用常规 Header，标题为工作台语境；可与 Banner 使用连续浅蓝背景。 |
| Content | 首屏为工作台 Banner，其后按业务域分组。 |
| Card | 每个业务域包含 Section Header 和入口 Grid；入口卡必须等高。 |
| Action | 入口卡整体可点击；active 只改变边框、背景或文字主色，不改变尺寸。 |
| TabBar | 一级 Workbench 展示 TabBar；进入点检、缺陷、检修等子页后隐藏 TabBar。 |

### Profile

| Area | Mobile structure rule |
|---|---|
| Header | 使用常规 Header，标题居中；右侧可放搜索、消息或设置入口。 |
| Content | 由用户 Hero Card、信息列表、设置列表、退出操作组成；水平 padding `20px`。 |
| Card | 用户 Hero Card 使用 `24px` 圆角；设置列表使用统一白色 Card 和固定行高。 |
| Action | 退出登录使用 danger 或弱化按钮样式，必须与普通设置项区分。 |
| TabBar | 展示 TabBar，当前项为 Profile/我的；进入关于系统等子页后隐藏 TabBar。 |

## 7. Interaction Rules（交互规范）

### Touch target

- 所有可点击元素触控热区必须 `>= 44px`。
- 视觉尺寸小于 `44px` 的 icon button 必须通过 padding、hit area 或 wrapper 扩展触控区域。
- 相邻触控元素之间必须保留可识别间距，避免误触；最小视觉间距 `8px`。
- 任务卡、入口卡、设置项整体可点击时，内部次级按钮必须有清晰边界。

### Gesture rules

- Tap 是默认操作手势；长按只用于明确二级行为，不承载主操作。
- Swipe 只用于列表辅助操作，例如删除、标记、归档；危险操作需要二次确认。
- Pull to refresh 可用于列表和首页概览，但不能替代显式刷新按钮。
- Bottom Sheet 可支持下滑关闭；危险确认、未保存表单不得仅靠手势关闭。
- 图表交互使用 tap 选中点或条，不使用 hover tooltip。

### Bottom action priority

- 底部固定操作区只承载页面主操作或关键确认，不放置多个同权重按钮。
- 主按钮优先使用 full-width `52px` 高度；次要操作可弱化为文本或 secondary。
- 底部操作区必须避开 TabBar；同一页面不得同时出现 TabBar 与覆盖其上的主按钮，除非按钮属于明确浮层。
- 表单页提交按钮固定底部时，内容区必须预留 `64px + safe area` 的滚动留白。

### No hover dependency

- Mobile 禁止依赖 hover 显示关键说明、操作入口、状态或错误信息。
- PC Tooltip 内容必须转换为 Toast、Inline helper、Info Sheet 或 Bottom Sheet。
- Mobile active/pressed 反馈可使用透明度、轻微 scale 或背景变化，但不得改变布局尺寸。

### State feedback

| State | Mobile rule |
|---|---|
| Loading | 保持组件原宽高；按钮使用 `16px` spinner 或同尺寸 icon 位；页面使用骨架屏或局部卡片 loading。 |
| Error | 使用 `--color-danger` 与 `--color-danger-soft`；表单错误显示在字段下方，不造成大幅布局跳动。 |
| Warning | 使用 `--color-warning` 与 `--color-warning-soft`；任务优先级使用左边框 + Tag 双表达。 |
| Success | 使用 `--color-success` 与 `--color-success-soft`；成功状态不使用大面积绿色背景。 |
| Empty | 使用独立 Card 或列表占位行，文案说明为空对象，不使用 danger/warning 色。 |
| Disabled | 文本使用 `--color-neutral-300`，背景使用 `--color-surface-muted`，移除 hover、active、click 行为。 |
| Toast | 用于短反馈，不能承载复杂表单、长说明或关键二次确认。 |

## 8. Anti-conflict Rules（跨端冲突约束）

### PC-only patterns forbidden on Mobile

- 禁止把 PC 表格直接缩放到移动端，禁止移动端横向滚动表格作为主信息结构。
- 禁止在移动端使用 Sidebar + Topbar 框架；一级导航必须使用 Header + TabBar 或 Header + 菜单入口。
- 禁止依赖 hover、鼠标 tooltip、行 hover 操作或精细鼠标定位。
- 禁止把 PC 的 dense `32px` 控件作为移动端真实触控尺寸。
- 禁止把 PC 多列看板直接压缩成移动端多列布局。
- 禁止在移动端展示超过 4 个一级 TabBar 入口。
- 禁止在二级沉浸业务页继续展示 TabBar。

### Mobile parts that must be simplified

- 复杂筛选必须折叠为 Search + Filter button + Bottom Sheet。
- 表格列必须按业务优先级折叠，不展示低价值字段。
- 多操作按钮必须收敛为一个主操作 + 更多操作，不在单卡 footer 堆叠多个同权重按钮。
- 图表必须保留核心趋势和状态，不搬运 PC 端完整坐标、图例和筛选组合。
- 用户配置、企业配置、系统设置必须分组进入列表或子页，不散落在页面底部。
- PC 弹窗中的长表单移动端必须改为全屏子页或分步表单。

### No duplicated design systems

- 禁止创建独立于 `DESIGN.md` 的第二套 Mobile 色彩系统。
- 禁止为 Mobile 新增与 PC 含义重复的状态色、品牌色、图表色。
- 禁止在 Figma Make 中为单个页面写临时 token；所有新增值必须进入 Mobile added tokens。
- 禁止同一组件在不同页面使用不同基础尺寸，除非本文档明确列为页面级 override。
- 禁止同一业务状态在 PC 和 Mobile 使用不同文案、颜色或图标语义。
- 禁止在 Mobile 中重做 PC 设计方向；Mobile 只做跨端继承后的结构适配、触控适配和密度适配。

### Figma Make generation guardrails

- 生成移动端页面时，先绑定共享 token，再应用 Mobile override token。
- 页面 Frame 基准宽度使用 `375px`，最小适配检查到 `320px`。
- 每个页面必须包含 Header / Content / Card / Action / TabBar 的结构定义；无 TabBar 的子页必须显式标注原因。
- 组件命名必须使用跨端组件名，不用页面名创建重复组件。
- 输出结果必须可追溯到本文件的 token、组件映射和页面结构，不允许临时视觉发明。
