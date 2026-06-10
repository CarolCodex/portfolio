<template>
  <div class="liangxuan-case">
    <section class="case-hero tech-hero-banner">
      <div class="tech-bg" aria-hidden="true">
        <div class="tech-orb tech-orb-a"></div>
        <div class="tech-orb tech-orb-b"></div>
        <div class="glass-shape">
          <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="glassPanel" x1="155" x2="720" y1="118" y2="515" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#ffffff" stop-opacity="0.7" />
                <stop offset="0.42" stop-color="#baf4ff" stop-opacity="0.2" />
                <stop offset="1" stop-color="#635bff" stop-opacity="0.24" />
              </linearGradient>
              <linearGradient id="cyanStroke" x1="120" x2="830" y1="120" y2="470" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#ffffff" stop-opacity="0" />
                <stop offset="0.38" stop-color="#42e8ff" stop-opacity="0.82" />
                <stop offset="0.78" stop-color="#6d7cff" stop-opacity="0.5" />
                <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="facetLine" x1="220" x2="715" y1="210" y2="385" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#ffffff" stop-opacity="0.72" />
                <stop offset="0.5" stop-color="#6fefff" stop-opacity="0.36" />
                <stop offset="1" stop-color="#8578ff" stop-opacity="0.18" />
              </linearGradient>
              <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path class="glass-panel main" d="M214 110 C371 40 602 75 734 206 C811 283 779 430 657 503 C509 592 271 552 164 415 C78 305 100 167 214 110Z" />
            <path class="glass-panel rear" d="M336 96 C489 64 690 137 766 269 C822 366 746 477 603 509 C450 543 266 481 203 362 C150 261 207 123 336 96Z" />
            <path class="glass-facet" d="M242 186 L491 126 L704 250 L610 455 L329 501 L167 352Z" />
            <path class="glass-facet thin" d="M324 160 L637 220 L690 340 L561 458 L302 426 L196 304Z" />
            <path class="arc arc-a" d="M94 360 C229 116 523 38 760 184" />
            <path class="arc arc-b" d="M161 438 C325 220 595 162 810 292" />
            <path class="arc arc-c" d="M245 494 C407 346 628 307 786 398" />
            <path class="facet-line" d="M243 187 L610 455" />
            <path class="facet-line" d="M491 126 L329 501" />
            <path class="facet-line" d="M167 352 L704 250" />
            <circle class="glow-dot" cx="637" cy="220" r="10" />
            <circle class="glow-dot small" cx="329" cy="501" r="6" />
          </svg>
        </div>
        <div class="dot-field"></div>
      </div>
      <div class="hero-copy">
        <span class="case-kicker">移动端商城 / 商品列表 / 购物车转化</span>
        <h1>
          <span>靓轩小程序</span>
          <span>设计优化</span>
        </h1>
        <p class="intro">
          围绕零售商品浏览、活动商品展示、分类筛选与购物车转化链路，对小程序界面结构和关键交互进行体验优化。
        </p>
        <RouterLink class="hero-demo-link" to="/demos/mini-program">返回高保真 Demo</RouterLink>
      </div>
      <div class="hero-phones" aria-label="靓轩小程序手机 Mockup">
        <div class="hero-phone phone-left">
          <div class="phone-shell">
            <div class="phone-notch"></div>
            <div class="phone-screen">
              <img
                class="phone-shot phone-shot-home"
                src="/case-assets/liangxuan-mini-program/liangxuan-home.webp"
                alt="靓轩小程序首页商品流截图"
              />
            </div>
          </div>
        </div>
        <div class="hero-phone phone-right">
          <div class="phone-shell">
            <div class="phone-notch"></div>
            <div class="phone-screen">
              <img
                class="phone-shot phone-shot-activity"
                src="/case-assets/liangxuan-mini-program/liangxuan-activity.webp"
                alt="靓轩小程序活动商品截图"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="case-section split">
      <article class="glass-card">
        <h2>项目背景</h2>
        <p>
          这是一个零售电商小程序设计优化案例，核心页面围绕商品浏览、分类筛选、活动商品展示和购物车转化展开。页面既要满足用户快速找货、比价、加购的习惯，也要承载活动商品、团购、预售、秒杀等运营场景。
        </p>
      </article>
      <article class="glass-card">
        <h2>我的职责</h2>
        <p>
          基于 Figma 设计稿和 MCP 读取结果，完成页面结构梳理、视觉规范统一、关键交互说明，并使用 Codex 辅助生成 Vue 高保真页面和组件化样式还原。
        </p>
      </article>
    </section>

    <section class="case-section">
      <CaseTitle title="设计目标" />
      <div class="goal-grid">
        <article v-for="goal in goals" :key="goal.title" class="glass-card goal-card">
          <span>{{ goal.index }}</span>
          <h3>{{ goal.title }}</h3>
          <p>{{ goal.description }}</p>
        </article>
      </div>
    </section>

    <section class="case-section">
      <CaseTitle
        title="核心页面展示"
        description="使用 HTML/CSS 高保真模拟小程序页面，保留红色电商视觉、商品卡、分类弹层、底部购物车与 TabBar。"
      />
      <MiniProgramScreens />
    </section>

    <section class="case-section">
      <CaseTitle title="视觉规范" />
      <MiniProgramVisualSpec />
    </section>

  </div>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import MiniProgramScreens from './MiniProgramScreens.vue'
import MiniProgramVisualSpec from './MiniProgramVisualSpec.vue'

const goals = [
  { index: '01', title: '提升商品列表可读性', description: '优化商品图、标题、价格、标签和加购按钮层级，让用户快速判断商品价值。' },
  { index: '02', title: '统一商品卡片与活动标签', description: '统一活动、团购、预售、秒杀标签样式，减少运营页面之间的视觉割裂。' },
  { index: '03', title: '优化分类筛选和弹层交互', description: '让一级分类、全部分类弹层和商品列表形成更清晰的浏览路径。' },
  { index: '04', title: '方便前端按组件化结构还原', description: '拆解搜索、商品卡、分类、购物车、TabBar 等组件，降低后续实现成本。' },
]

const CaseTitle = defineComponent({
  props: { title: String, description: String },
  setup(props) {
    return () =>
      h('div', { class: 'case-title' }, [
        h('h2', props.title),
        props.description ? h('p', props.description) : null,
      ])
  },
})
</script>

<style scoped>
.liangxuan-case {
  width: min(100% - 40px, 1360px);
  margin-inline: auto;
  padding: 0 0 120px;
  overflow: visible;
}

.case-hero,
.glass-card {
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 24px 64px rgba(43, 112, 198, 0.1);
  backdrop-filter: blur(18px);
}

.case-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(56px, 7vw, 124px);
  width: 100vw;
  height: 760px;
  min-height: 720px;
  margin-left: calc(50% - 50vw);
  padding-block: 72px;
  padding-inline: max(72px, calc((100vw - 1360px) / 2 + 72px));
  overflow: hidden;
  box-sizing: border-box;
  border-right: 0;
  border-left: 0;
  border-radius: 0;
  box-shadow: 0 34px 96px rgba(71, 136, 210, 0.2);
  backdrop-filter: none;
}

.tech-hero-banner {
  background:
    radial-gradient(circle at 76% 28%, rgba(117, 244, 255, 0.36), transparent 28%),
    radial-gradient(circle at 92% 74%, rgba(128, 102, 255, 0.2), transparent 26%),
    radial-gradient(circle at 12% 16%, rgba(255, 255, 255, 0.92), transparent 34%),
    linear-gradient(120deg, #f9fdff 0%, #eaf8ff 30%, #c9f2ff 55%, #cbd9ff 78%, #edf4ff 100%);
  background-size: 130% 130%;
  animation: techGradientDrift 18s ease-in-out infinite alternate;
}

.tech-hero-banner::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background:
    linear-gradient(rgba(55, 129, 212, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(55, 129, 212, 0.06) 1px, transparent 1px);
  background-size: 54px 54px;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.28), black 42%, transparent 96%);
}

.tech-hero-banner::after {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.22) 38%, transparent 72%);
}

.hero-copy,
.tech-bg,
.hero-phones {
  position: relative;
  z-index: 1;
}

.hero-copy {
  width: min(50%, 680px);
  flex: 0 0 min(50%, 680px);
}

.tech-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.tech-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(32px);
  opacity: 0.78;
  mix-blend-mode: screen;
}

.tech-orb-a {
  right: 12%;
  top: 16%;
  width: 360px;
  height: 360px;
  background:
    radial-gradient(circle at 38% 36%, rgba(255, 255, 255, 0.9), transparent 22%),
    radial-gradient(circle, rgba(39, 220, 255, 0.72), rgba(61, 128, 255, 0.24) 52%, transparent 72%);
  animation: orbFloatA 14s ease-in-out infinite alternate;
}

.tech-orb-b {
  right: -2%;
  bottom: 8%;
  width: 420px;
  height: 300px;
  background: radial-gradient(circle, rgba(125, 106, 255, 0.34), rgba(69, 218, 255, 0.16) 44%, transparent 74%);
  animation: orbFloatB 16s ease-in-out infinite alternate;
}

.glass-shape {
  position: absolute;
  right: 2%;
  top: 12%;
  width: min(50vw, 700px);
  height: 88%;
  transform: perspective(900px) rotateY(-10deg) rotateX(3deg);
  transform-origin: 60% 50%;
}

.glass-shape svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.glass-panel {
  fill: url(#glassPanel);
  stroke: rgba(255, 255, 255, 0.55);
  stroke-width: 1.5;
  filter: url(#softGlow);
}

.glass-panel.rear {
  opacity: 0.42;
  transform: translate(26px, 8px);
}

.glass-facet {
  fill: rgba(255, 255, 255, 0.18);
  stroke: url(#facetLine);
  stroke-width: 1.2;
}

.glass-facet.thin {
  fill: rgba(117, 244, 255, 0.08);
  opacity: 0.86;
}

.arc {
  fill: none;
  stroke: url(#cyanStroke);
  stroke-linecap: round;
  filter: url(#softGlow);
  animation: arcBreath 5.8s ease-in-out infinite;
}

.arc-a {
  stroke-width: 3.2;
}

.arc-b {
  stroke-width: 2.2;
  animation-delay: 0.8s;
}

.arc-c {
  stroke-width: 1.6;
  opacity: 0.72;
  animation-delay: 1.4s;
}

.facet-line {
  fill: none;
  stroke: url(#facetLine);
  stroke-width: 1;
  opacity: 0.58;
}

.glow-dot {
  fill: #fff;
  filter: url(#softGlow);
  opacity: 0.86;
}

.glow-dot.small {
  opacity: 0.54;
}

.dot-field {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image: radial-gradient(circle, rgba(46, 129, 217, 0.34) 1px, transparent 1.5px);
  background-position: 0 0;
  background-size: 28px 28px;
  mask-image: radial-gradient(circle at 78% 46%, black, transparent 44%);
}

.hero-phones {
  flex: 0 0 min(46%, 640px);
  height: 560px;
  pointer-events: none;
}

/* Figma transparent phone export target: public/case-assets/liangxuan-mini-program/liangxuan-hero-phone.png */
.hero-phones::before {
  position: absolute;
  right: 2%;
  bottom: 6%;
  width: 560px;
  max-width: 100%;
  height: 280px;
  content: '';
  border-radius: 50%;
  background:
    radial-gradient(circle at 56% 42%, rgba(255, 255, 255, 0.62), transparent 20%),
    radial-gradient(circle at 54% 48%, rgba(76, 225, 255, 0.36), rgba(111, 116, 255, 0.34) 54%, rgba(114, 83, 255, 0.18) 72%, transparent 75%);
  filter: blur(2px);
  opacity: 0.9;
  transform: rotate(-10deg);
}

.hero-phone {
  position: absolute;
  width: 238px;
  filter: drop-shadow(0 34px 34px rgba(21, 62, 126, 0.24));
  transform-style: preserve-3d;
}

.phone-left {
  top: 36px;
  right: 278px;
  z-index: 2;
  transform: rotate(-9deg);
}

.phone-right {
  top: 88px;
  right: 98px;
  z-index: 3;
  width: 258px;
  transform: rotate(10deg);
}

.phone-shell {
  position: relative;
  padding: 10px;
  border: 1px solid rgba(2, 15, 36, 0.72);
  border-radius: 42px;
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0.82), transparent 14%),
    linear-gradient(145deg, #151922 0%, #05080e 48%, #323946 100%);
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.06),
    inset 10px 0 12px rgba(255, 255, 255, 0.14),
    0 18px 42px rgba(9, 35, 77, 0.18);
}

.phone-shell::before {
  position: absolute;
  top: 76px;
  left: -5px;
  width: 5px;
  height: 52px;
  content: '';
  border-radius: 4px 0 0 4px;
  background: linear-gradient(#aeb7c7, #3b4250);
}

.phone-shell::after {
  position: absolute;
  top: 94px;
  right: -4px;
  width: 4px;
  height: 76px;
  content: '';
  border-radius: 0 4px 4px 0;
  background: linear-gradient(#c5ccd9, #38404e);
}

.phone-notch {
  position: absolute;
  top: 10px;
  left: 50%;
  z-index: 3;
  width: 92px;
  height: 14px;
  border-radius: 0 0 12px 12px;
  background: #05070b;
  transform: translateX(-50%);
}

.phone-notch::after {
  position: absolute;
  top: 6px;
  right: 17px;
  width: 6px;
  height: 6px;
  content: '';
  border-radius: 50%;
  background: #141923;
}

.phone-screen {
  position: relative;
  height: 492px;
  overflow: hidden;
  border-radius: 32px;
  background: #f7f8fa;
}

.phone-shot {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  user-select: none;
  -webkit-user-drag: none;
}

.case-kicker {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  min-height: 34px;
  padding: 5px 16px;
  border: 1px solid rgba(17, 24, 39, 0.78);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  color: #111827;
  font-size: 15px;
  font-weight: 950;
  letter-spacing: 0;
  line-height: 1.35;
}

.case-hero h1 {
  max-width: 720px;
  margin: 28px 0 28px;
  color: #07152f;
  font-size: clamp(52px, 5.4vw, 78px);
  line-height: 0.98;
  text-wrap: balance;
  text-shadow: none;
}

.case-hero h1 span {
  display: block;
}

.intro,
.glass-card p,
.case-title p {
  color: #5d728f;
  line-height: 1.85;
}

.case-hero .intro {
  max-width: 660px;
  margin: 0;
  color: rgba(38, 48, 66, 0.88);
  font-size: 19px;
  font-weight: 650;
  line-height: 1.85;
}

.hero-demo-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  margin-top: 56px;
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 999px;
  background: linear-gradient(135deg, #0b4bb3, #0d7cff 58%, #61c7ff);
  color: #fff;
  font-size: 16px;
  font-weight: 850;
  box-shadow: 0 18px 40px rgba(13, 110, 253, 0.26);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.hero-demo-link:hover {
  background: linear-gradient(135deg, #073f9b, #0d6efd 58%, #48baff);
  box-shadow: 0 24px 54px rgba(13, 110, 253, 0.32);
  transform: translateY(-2px);
}

@keyframes techGradientDrift {
  0% {
    background-position: 0% 42%;
  }

  100% {
    background-position: 100% 58%;
  }
}

@keyframes orbFloatA {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  100% {
    transform: translate3d(-28px, 22px, 0) scale(1.06);
  }
}

@keyframes orbFloatB {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  100% {
    transform: translate3d(18px, -20px, 0) scale(1.04);
  }
}

@keyframes arcBreath {
  0%,
  100% {
    opacity: 0.5;
    stroke-width: 1.8;
  }

  50% {
    opacity: 0.92;
    stroke-width: 3.2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tech-hero-banner,
  .tech-orb,
  .arc {
    animation: none;
  }
}

.case-section {
  margin-top: 82px;
}

.split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.glass-card {
  padding: 28px;
  border-radius: 28px;
}

.glass-card h2,
.case-title h2 {
  margin: 12px 0 10px;
  color: #0f2a5f;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.16;
}

.goal-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.goal-card span {
  color: #ff4d2e;
  font-weight: 900;
}

.goal-card h3 {
  margin: 18px 0 10px;
  color: #0f2a5f;
  font-size: 19px;
}

.case-title {
  max-width: 780px;
  margin-bottom: 26px;
}

@media (max-width: 980px) {
  .split,
  .goal-grid {
    grid-template-columns: 1fr;
  }

  .goal-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .case-hero {
    height: 720px;
    min-height: 720px;
    padding-inline: 40px;
  }

  .hero-copy {
    flex-basis: min(52%, 560px);
    width: min(52%, 560px);
  }

  .hero-phones {
    flex-basis: 44%;
    height: 520px;
  }

  .hero-phone {
    width: 210px;
  }

  .phone-right {
    right: 12px;
    width: 230px;
  }

  .phone-left {
    right: 190px;
  }

  .phone-screen {
    height: 450px;
  }

  .glass-shape {
    right: -14%;
    width: 62vw;
  }
}

@media (max-width: 720px) {
  .liangxuan-case {
    width: min(100% - 28px, 1180px);
    padding: 0 0 80px;
  }

  .case-hero,
  .glass-card {
    padding: 22px;
    border-radius: 24px;
  }

  .case-hero {
    align-items: flex-start;
    flex-direction: column;
    height: auto;
    min-height: 850px;
    margin-left: calc(50% - 50vw);
    padding: 54px 22px 42px;
    border-radius: 0;
  }

  .case-hero h1 {
    font-size: 42px;
  }

  .hero-copy {
    flex: 0 0 auto;
    width: 100%;
  }

  .hero-phones {
    flex: 0 0 auto;
    width: 100%;
    height: 390px;
    margin-top: 20px;
  }

  .hero-phones::before {
    right: 50%;
    bottom: 16px;
    width: min(92vw, 390px);
    height: 190px;
    transform: translateX(50%) rotate(-10deg);
  }

  .hero-phone {
    width: 150px;
  }

  .phone-left {
    top: 16px;
    right: 43%;
    transform: rotate(-7deg);
  }

  .phone-right {
    top: 54px;
    right: 11%;
    width: 164px;
    transform: rotate(8deg);
  }

  .phone-shell {
    padding: 7px;
    border-radius: 30px;
  }

  .phone-notch {
    top: 7px;
    width: 62px;
    height: 10px;
  }

  .phone-screen {
    height: 330px;
    border-radius: 23px;
  }

  .glass-shape,
  .dot-field {
    display: none;
  }

  .tech-orb {
    filter: blur(38px);
    opacity: 0.46;
  }

  .tech-orb-a {
    right: -28%;
    top: 10%;
    width: 300px;
    height: 300px;
  }

  .tech-orb-b {
    right: -34%;
    bottom: 0;
    width: 320px;
    height: 240px;
  }

  .goal-grid {
    grid-template-columns: 1fr;
  }

}
</style>
