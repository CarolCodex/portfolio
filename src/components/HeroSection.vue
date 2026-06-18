<template>
  <section class="hero-cover">
    <div class="hero-cover-inner">
      <div class="hero-cover-copy">
        <h1>
          <span>UI + 前端复合岗</span>
          <strong>作品集</strong>
        </h1>

        <div class="hero-accent-line" aria-hidden="true">
          <span></span>
        </div>

        <div class="hero-year">2017—2026</div>

        <p class="hero-description">
          9 年 UI/UED 设计经验，具备 Vue、小程序、.NET MAUI 前端实现能力，使用 ChatGPT、Figma Make、Codex
          提升设计探索、页面落地与问题排查效率。
        </p>

        <div class="hero-actions">
          <RouterLink class="hero-button hero-button-primary" to="/cases">查看作品案例</RouterLink>
          <RouterLink class="hero-button hero-button-secondary" to="/resume">查看在线简历</RouterLink>
          <button class="hero-button hero-button-secondary hero-contact-button" type="button" @click="$emit('contact')">
            联系我
          </button>
        </div>

        <div class="hero-name">曹兰</div>
      </div>

      <div class="hero-cover-visual" aria-label="作品集主视觉">
        <picture class="hero-folder-picture">
          <source srcset="/images/home/hero-folder.webp" type="image/webp" />
          <img
            src="/images/home/hero-folder.webp"
            alt="Portfolio 作品集主视觉"
            width="2092"
            height="1800"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </picture>
      </div>
    </div>

    <nav class="hero-cover-entrybar" aria-label="作品集快速入口">
      <RouterLink v-for="entry in entries" :key="entry.label" class="entry-item" :to="entry.to">
        <span>{{ entry.label }}</span>
        <strong>{{ entry.value }}</strong>
      </RouterLink>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineEmits<{
  contact: []
}>()

const entries = [
  { label: '精选案例', value: '电商小程序 / 电子秤终端系统 / 设备健康管理', to: '/cases' },
  { label: '前端实现', value: 'Vue / 小程序 / .NET MAUI', to: '/cases/smart-scale-shopping-system' },
  { label: 'AI 工作流', value: 'ChatGPT / Figma Make / Codex', to: '/workflow' },
  { label: '工作经验', value: '9年UI工程师', to: '/resume' },
]
</script>

<style scoped>
.hero-cover {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  padding: 148px 0 0;
  background:
    radial-gradient(circle at 72% 16%, rgba(255, 255, 255, 0.25), transparent 28%),
    radial-gradient(circle at 72% 70%, rgba(139, 201, 255, 0.36), transparent 34%),
    linear-gradient(115deg, #006bff 0%, #1677ff 42%, #4ca3ff 70%, #d9efff 100%);
  isolation: isolate;
}

.hero-cover::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.16) 0 1px, transparent 1px 120px),
    radial-gradient(ellipse at 8% 18%, rgba(0, 51, 160, 0.28), transparent 42%),
    linear-gradient(105deg, rgba(0, 38, 138, 0.2) 0%, rgba(0, 94, 255, 0) 44%);
  opacity: 0.62;
  pointer-events: none;
}

.hero-cover::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  z-index: 0;
  height: 180px;
  background: linear-gradient(180deg, rgba(234, 246, 255, 0), rgba(244, 251, 255, 0.86));
  pointer-events: none;
}

.hero-cover-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.49fr) minmax(0, 0.51fr);
  align-items: center;
  gap: 52px;
  max-width: 1240px;
  min-height: 560px;
  margin: 0 auto;
  padding: 0 32px;
}

.hero-cover-copy {
  position: relative;
  z-index: 2;
  color: #fff;
}

h1 {
  display: grid;
  gap: 10px;
  margin: 0;
  color: #fff;
  font-size: clamp(54px, 5vw, 72px);
  font-weight: 850;
  line-height: 1.12;
  letter-spacing: 0;
  text-shadow: 0 22px 54px rgba(0, 50, 150, 0.22);
  animation: hero-rise 0.72s ease 0.14s both;
}

h1 span,
h1 strong {
  display: block;
}

h1 span {
  white-space: nowrap;
}

h1 strong {
  font-size: 1.42em;
  font-weight: 850;
}

.hero-accent-line {
  width: min(320px, 78vw);
  height: 6px;
  margin: 38px 0 38px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  animation: hero-rise 0.72s ease 0.22s both;
}

.hero-accent-line span {
  display: block;
  width: 88px;
  height: 100%;
  border-radius: inherit;
  background: #ffbd17;
}

.hero-year {
  color: #fff;
  font-size: clamp(36px, 4vw, 46px);
  font-weight: 650;
  line-height: 1;
  animation: hero-rise 0.72s ease 0.28s both;
}

.hero-description {
  max-width: 560px;
  margin: 28px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 17px;
  line-height: 1.85;
  animation: hero-rise 0.72s ease 0.34s both;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
  animation: hero-rise 0.72s ease 0.42s both;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 13px 22px;
  border: 1px solid transparent;
  border-radius: 999px;
  font: inherit;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.hero-button:hover {
  transform: translateY(-2px);
}

.hero-button-primary {
  border: 1px solid rgba(255, 255, 255, 0.88);
  background: #fff;
  color: #0b5bd7;
  box-shadow: 0 20px 46px rgba(0, 49, 138, 0.22);
}

.hero-button-primary:hover {
  box-shadow: 0 26px 62px rgba(0, 49, 138, 0.3);
}

.hero-button-secondary {
  border: 1px solid rgba(255, 255, 255, 0.46);
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  box-shadow: 0 18px 42px rgba(0, 49, 138, 0.12);
  backdrop-filter: blur(16px);
}

.hero-button-secondary:hover {
  border-color: rgba(255, 255, 255, 0.78);
  background: rgba(255, 255, 255, 0.24);
}

.hero-name {
  margin-top: 52px;
  color: rgba(255, 255, 255, 0.94);
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 0;
  animation: hero-rise 0.72s ease 0.5s both;
}

.hero-cover-visual {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.hero-cover-visual::before {
  content: '';
  position: absolute;
  z-index: -1;
  width: min(620px, 74vw);
  height: min(620px, 74vw);
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.38), transparent 62%);
  filter: blur(10px);
  animation: glow-breathe 6200ms ease-in-out infinite;
}

.hero-cover-visual::after {
  content: '';
  position: absolute;
  right: -40px;
  top: 6%;
  z-index: -1;
  width: 260px;
  height: 260px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent 68%);
  pointer-events: none;
}

.hero-folder-picture {
  display: block;
  width: min(112%, 780px);
  filter: drop-shadow(0 42px 80px rgba(0, 57, 150, 0.28));
  transform: translateX(30px);
  animation: folder-float 5200ms ease-in-out infinite;
}

.hero-folder-picture img {
  display: block;
  width: 100%;
  height: auto;
}

.hero-cover-entrybar {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 18px 32px 34px;
  transform: translateY(-70px);
  margin-bottom: -70px;
}

.entry-item {
  min-height: 112px;
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  text-decoration: none;
  box-shadow: 0 20px 54px rgba(0, 64, 164, 0.14);
  backdrop-filter: blur(18px);
  transition: transform 0.22s ease, background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
}

.entry-item:hover {
  border-color: rgba(255, 255, 255, 0.36);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 26px 70px rgba(0, 64, 164, 0.2);
  transform: translateY(-4px);
}

.entry-item span {
  display: block;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  font-weight: 800;
}

.entry-item strong {
  display: block;
  margin-top: 12px;
  color: #fff;
  font-size: 17px;
  line-height: 1.45;
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes folder-float {
  0%,
  100% {
    transform: translateX(30px) translateY(0);
  }

  50% {
    transform: translateX(30px) translateY(-10px);
  }
}

@keyframes glow-breathe {
  0%,
  100% {
    opacity: 0.74;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(1.06);
  }
}

@keyframes folder-float-mobile {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@media (max-width: 1000px) {
  .hero-cover {
    min-height: auto;
    padding-top: 118px;
  }

  .hero-cover-inner {
    grid-template-columns: 1fr;
    gap: 42px;
    min-height: auto;
  }

  .hero-folder-picture {
    width: min(100%, 680px);
    transform: translateX(0);
    animation-name: folder-float-mobile;
  }

  .hero-cover-entrybar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    transform: translateY(-34px);
    margin-bottom: -34px;
  }

  .hero-name {
    margin-top: 48px;
  }
}

@media (max-width: 600px) {
  .hero-cover {
    padding-top: 104px;
  }

  .hero-cover-inner {
    gap: 34px;
    padding: 0 20px;
  }

  h1 {
    font-size: clamp(38px, 10.8vw, 44px);
  }

  h1 span {
    white-space: normal;
  }

  h1 strong {
    font-size: 1.28em;
  }

  .hero-accent-line {
    margin: 28px 0 30px;
  }

  .hero-year {
    font-size: 32px;
  }

  .hero-description {
    color: rgba(255, 255, 255, 0.9);
    font-size: 15px;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .hero-name {
    margin-top: 42px;
    font-size: 22px;
  }

  .hero-folder-picture {
    width: 100%;
  }

  .hero-cover-entrybar {
    grid-template-columns: 1fr;
    padding: 16px 20px 30px;
    transform: translateY(0);
    margin-bottom: 0;
  }

  .entry-item {
    min-height: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  h1,
  .hero-accent-line,
  .hero-year,
  .hero-description,
  .hero-actions,
  .hero-name,
  .hero-folder-picture,
  .hero-cover-visual::before {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
