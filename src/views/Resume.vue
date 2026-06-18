<template>
  <div class="resume-page">
    <section class="resume-cover" aria-labelledby="resume-cover-title">
      <img
        class="cover-art"
        :src="coverArtUrl"
        alt="曹兰 AI 时代 UI 与前端复合岗封面肖像"
        width="1672"
        height="941"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />

      <div class="cover-copy">
        <div class="hero-tags" aria-label="简历标签">
          <span v-for="tag in heroTags" :key="tag">{{ tag }}</span>
        </div>
        <p class="cover-name">{{ resume.basicInfo.name }}</p>
        <h1 id="resume-cover-title">UI+前端复合岗</h1>
        <div class="print-profile-meta" aria-label="打印简历个人信息">
          <p>
            {{ resume.basicInfo.gender }} | 年龄：{{ resume.basicInfo.age }} | 电话：{{ resume.basicInfo.phone }} | 邮箱：{{ resume.basicInfo.email }}
          </p>
          <p>
            {{ resume.basicInfo.experience }}工作经验 | 求职意向：{{ resume.basicInfo.intention }} | 期望薪资：{{ resume.basicInfo.salary }} | 期望城市：{{ resume.basicInfo.city }}
          </p>
        </div>
        <p class="cover-summary">{{ resume.summary }}</p>
        <button class="download-button" type="button" @click="exportPdf">
          <img src="/images/resume/icon-download.svg" alt="" aria-hidden="true" decoding="async" />
          下载完整简历
        </button>
      </div>
      <img class="print-avatar" :src="avatarUrl" alt="曹兰头像" width="320" height="320" loading="lazy" decoding="async" />

      <div class="cover-stats" aria-label="简历概览">
        <div v-for="item in heroStats" :key="item.label">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
        </div>
      </div>
    </section>

    <section class="resume-section personal-advantages" aria-labelledby="personal-advantages-title">
      <div class="resume-section-title">
        <h2 id="personal-advantages-title">个人优势</h2>
      </div>

      <div class="advantage-panel">
        <article v-for="item in personalAdvantages" :key="item.title" class="advantage-item">
          <div class="advantage-icon">
            <img :src="item.icon" alt="" aria-hidden="true" decoding="async" />
          </div>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="resume-section">
      <div class="resume-section-title">
        <h2>工作经历</h2>
      </div>
      <div class="timeline">
        <article v-for="item in resume.workExperience" :key="`${item.company}-${item.time}`" class="timeline-item">
          <div class="timeline-time">{{ item.time }}</div>
          <div class="glass-card timeline-content">
            <div class="timeline-heading">
              <h3>{{ item.company }}</h3>
              <span class="resume-mini-tag">{{ item.role }}</span>
            </div>
            <ul>
              <li v-for="duty in item.duties" :key="duty">{{ duty }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section class="resume-section">
      <div class="resume-section-title">
        <h2>项目经历</h2>
      </div>
      <div class="project-grid">
        <article
          v-for="project in resume.projects.filter((item) => item.role)"
          :key="project.name"
          class="glass-card project-card"
        >
          <div class="project-card-heading">
            <h3>{{ project.name }}</h3>
            <span class="resume-mini-tag">{{ project.year }}</span>
          </div>
          <div class="project-meta">
            <span>{{ project.role }}</span>
          </div>
          <p>{{ project.desc }}</p>
        </article>
      </div>
      <div
        v-for="project in resume.projects.filter((item) => !item.role)"
        :key="project.name"
        class="more-projects"
      >
        <span>{{ project.name }}</span>
        <p>{{ project.desc }}</p>
      </div>
    </section>

    <section class="resume-section resume-links">
      <article class="entry-card education-entry">
        <span>教育经历</span>
        <div class="education-entry-body">
          <div class="education-entry-heading">
            <h3>
              {{ resume.education.school }} | {{ resume.education.degree }} | {{ resume.education.major }}
            </h3>
            <span class="resume-mini-tag">{{ resume.education.time }}</span>
          </div>
          <p>{{ resume.education.description }}</p>
        </div>
      </article>

      <button class="entry-card certificate-entry" type="button" @click="openCertificateModal" @pointerup="openCertificateModal">
        <span>学历证书</span>
        <strong>查看</strong>
      </button>
    </section>

    <Teleport to="body">
      <Transition name="certificate-modal-fade">
        <div
          v-if="showCertificateModal"
          class="certificate-modal-mask"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          @click="closeCertificateModal"
        >
          <div class="certificate-modal" @click.stop>
            <div class="certificate-modal__head">
              <h3 id="certificate-modal-title">学历证书</h3>
              <div class="certificate-modal__actions">
                <button class="certificate-modal-close" type="button" aria-label="关闭" @click="closeCertificateModal">
                  ×
                </button>
              </div>
            </div>
            <div class="certificate-modal__body">
              <div class="certificate-modal__stage">
                <img
                  class="certificate-modal__preview"
                  :src="resume.diplomaImage"
                  alt="学历证书"
                  loading="lazy"
                  decoding="async"
                  :style="{ width: `${certificateZoom}%` }"
                />
              </div>
              <div class="certificate-zoom" aria-label="学历证书缩放">
                <button type="button" aria-label="缩小学历证书" :disabled="certificateZoom <= minCertificateZoom" @click="zoomCertificate(-10)">
                  -
                </button>
                <span>{{ certificateZoom }}%</span>
                <button type="button" aria-label="放大学历证书" :disabled="certificateZoom >= maxCertificateZoom" @click="zoomCertificate(10)">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import avatarUrl from '@/assets/avatar-cao-lan-320.jpg'
import { resume } from '@/data/resume'

const coverArtUrl = '/images/resume/hero-cover-1920.png'

const heroTags = ['2017-2026', resume.basicInfo.city, 'UI + 前端复合岗', 'Vue / 小程序 / .NET MAUI']

const heroStats = computed(() => [
  { label: '学历', value: resume.education.degree },
  { label: '专业', value: '视觉传达设计' },
  { label: '经验', value: `${resume.basicInfo.experience}+` },
  { label: '期望薪资', value: resume.basicInfo.salary },
  { label: '坐标', value: resume.basicInfo.city },
])

const personalAdvantages = [
  {
    title: '产品需求分析',
    description: '能快速理解业务需求，梳理页面逻辑和使用场景，把抽象需求转成清晰、可落地的设计方案。',
    icon: '/images/resume/icon-analysis.svg',
  },
  {
    title: 'UI 设计经验',
    description: '9 年 UI/UX 设计经验，做过工业互联网、电商、小程序、物联网等项目，熟悉从 0 到 1 的界面设计流程。',
    icon: '/images/resume/icon-ui.svg',
  },
  {
    title: '前端能力',
    description: '熟悉 HTML、CSS、XML、WXML、小程序和 .NET MAUI，能配合开发落地，也能独立完成部分页面实现。',
    icon: '/images/resume/icon-frontend.svg',
  },
  {
    title: 'AI工具赋能',
    description: '日常使用 Codex、Figma Make、ChatGPT 等 AI 工具，辅助界面设计、页面生成、方案优化和效率提升。',
    icon: '/images/resume/icon-ai.svg',
  },
]

const showCertificateModal = ref(false)
const minCertificateZoom = 60
const maxCertificateZoom = 180
const certificateZoom = ref(100)

const openCertificateModal = () => {
  showCertificateModal.value = true
}

const closeCertificateModal = () => {
  showCertificateModal.value = false
  certificateZoom.value = 100
}

const zoomCertificate = (step: number) => {
  certificateZoom.value = Math.min(maxCertificateZoom, Math.max(minCertificateZoom, certificateZoom.value + step))
}

const exportPdf = () => {
  window.print()
}
</script>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}

.resume-page {
  --resume-blue: #1677ff;
  --resume-blue-strong: #0d6efd;
  --resume-deep: #0f2a5f;
  --resume-text: #10233f;
  --resume-muted: #5d728f;
  --resume-section-wide: 1245px;
  width: min(100% - 40px, 1311px);
  margin-inline: auto;
  padding: 0 0 120px;
  color: var(--resume-text);
}

.resume-page::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(135deg, rgba(222, 243, 255, 0.94) 0%, rgba(247, 251, 255, 0.95) 45%, rgba(244, 235, 255, 0.9) 100%),
    radial-gradient(circle at 17% 11%, rgba(98, 190, 255, 0.2), transparent 34rem),
    radial-gradient(circle at 86% 16%, rgba(199, 166, 255, 0.22), transparent 30rem);
  pointer-events: none;
}

.resume-cover {
  position: relative;
  left: 50%;
  width: 100vw;
  min-height: 628px;
  margin-left: -50vw;
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background: #cee1f9;
  box-shadow: 0 30px 90px rgba(22, 119, 255, 0.13);
  isolation: isolate;
}

.resume-cover::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(90deg, rgba(206, 225, 249, 0) 0%, rgba(206, 225, 249, 0) 58%, rgba(206, 225, 249, 0.62) 74%, #cee1f9 100%);
  pointer-events: none;
}

.cover-art {
  position: absolute;
  inset: -112px auto auto 0;
  z-index: -1;
  width: min(100vw, 1540px);
  min-width: 1180px;
  height: auto;
  min-height: 680px;
  object-fit: cover;
  object-position: left top;
  opacity: 0.98;
  pointer-events: none;
}

.cover-copy {
  position: absolute;
  z-index: 1;
  top: 112px;
  right: clamp(72px, 5.2vw, 120px);
  width: min(720px, 42vw);
  margin: 0;
  padding: 0;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.hero-tags span {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 4px 12px;
  border-radius: 8px;
  background: rgba(22, 119, 255, 0.1);
  color: var(--resume-blue);
  font-size: 12px;
  font-weight: 700;
}

.cover-name {
  margin: 0 0 8px;
  color: var(--resume-blue);
  font-size: clamp(42px, 5.2vw, 60px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0;
}

.cover-copy h1 {
  margin: 0 0 18px;
  color: var(--resume-deep);
  font-size: clamp(42px, 6.5vw, 72px);
  font-weight: 950;
  line-height: 1.08;
  letter-spacing: 0;
}

.cover-summary {
  max-width: 548px;
  margin: 0;
  color: rgba(15, 42, 95, 0.66);
  font-size: 18px;
  line-height: 1.72;
}

.download-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 58px;
  margin-top: 30px;
  padding: 16px 28px;
  border: 1px solid rgba(22, 119, 255, 0.2);
  border-radius: 999px;
  background: #fff;
  color: var(--resume-deep);
  font: inherit;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 18px 38px rgba(22, 119, 255, 0.14);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.download-button img {
  width: 18px;
  height: 18px;
}

.download-button:hover {
  border-color: rgba(22, 119, 255, 0.38);
  box-shadow: 0 24px 48px rgba(22, 119, 255, 0.22);
  transform: translateY(-2px);
}

.print-profile-meta,
.print-avatar {
  display: none;
}

.cover-stats {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  min-height: 79px;
  padding: 14px 94px;
  border-top: 1px solid rgba(255, 255, 255, 0.74);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(18px);
}

.cover-stats div {
  display: grid;
  place-items: center;
  gap: 4px;
  text-align: center;
}

.cover-stats span {
  color: var(--resume-muted);
  font-size: 12px;
  line-height: 1.5;
}

.cover-stats strong {
  color: var(--resume-blue);
  font-size: 16px;
  font-weight: 900;
  line-height: 1.5;
}

.resume-section {
  margin-top: 48px;
}

.resume-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  width: min(100%, var(--resume-section-wide));
  min-height: 56px;
  margin: 0 auto 24px;
  padding: 10px 24px;
  border-radius: 16px;
  background: linear-gradient(90deg, var(--resume-blue) 0%, rgba(22, 119, 255, 0) 100%);
  color: #fff;
  box-shadow: 0 18px 40px rgba(22, 119, 255, 0.12);
}

.resume-section-title.compact {
  width: 100%;
  min-height: 48px;
  margin: 0 0 20px;
}

.resume-section-title span {
  font-size: 34px;
  font-weight: 950;
  line-height: 1;
}

.resume-section-title h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 950;
  line-height: 1.2;
  letter-spacing: 0;
}

.personal-advantages {
  width: min(100%, var(--resume-section-wide));
  margin-inline: auto;
}

.advantage-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 34px 70px;
  padding: 24px;
  border: 1px solid rgba(22, 119, 255, 0.05);
  border-radius: 16px;
  background: linear-gradient(0deg, #fff 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 22px 58px rgba(15, 42, 95, 0.06);
}

.advantage-item {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  gap: 21px;
  min-height: 93px;
  padding: 0 0 10px;
}

.advantage-icon {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(22, 119, 255, 0.22);
}

.advantage-icon img {
  width: 24px;
  height: 24px;
}

.advantage-item h3,
.glass-card h3,
.timeline-content h3,
.project-card h3 {
  margin: 0 0 8px;
  color: var(--resume-deep);
  font-size: 16px;
  font-weight: 900;
  line-height: 1.5;
}

.advantage-item p,
.glass-card p,
.more-projects p,
.timeline-content li {
  margin: 0;
  color: var(--resume-muted);
  font-size: 14px;
  line-height: 1.72;
}

.timeline,
.project-grid,
.resume-links {
  width: min(100%, var(--resume-section-wide));
  margin-inline: auto;
}

.timeline {
  display: grid;
  gap: 20px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  gap: 28px;
  align-items: start;
}

.timeline-time {
  padding: 4px 0;
  color: var(--resume-blue);
  font-size: 16px;
  font-weight: 900;
  line-height: 1.5;
}

.glass-card,
.more-projects,
.entry-card {
  border: 1px solid rgba(255, 255, 255, 0.76);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 24px 64px rgba(43, 112, 198, 0.1);
  backdrop-filter: blur(18px);
  transition: border-color 0.22s ease;
}

.timeline-content {
  padding: 24px 36px;
}

.timeline-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
  margin-bottom: 8px;
}

.timeline-heading h3 {
  margin: 0;
}

.resume-mini-tag {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 4px 12px;
  border-radius: 8px;
  background: rgba(22, 119, 255, 0.1);
  color: var(--resume-blue);
  font-size: 12px;
  font-weight: 800;
  line-height: 1.5;
}

.timeline-content ul {
  display: grid;
  gap: 2px;
  margin: 0;
  padding-left: 18px;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.project-card {
  padding: 26px;
}

.project-card-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  margin-bottom: 8px;
}

.project-card h3 {
  margin: 0;
  font-size: 20px;
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
  color: #2867aa;
  font-size: 13px;
  font-weight: 800;
}

.more-projects {
  width: min(100%, var(--resume-section-wide));
  margin: 18px auto 0;
  padding: 24px;
}

.more-projects > span {
  color: var(--resume-blue);
  font-weight: 900;
}

.more-projects p {
  margin-top: 8px;
}

.entry-card {
  display: flex;
  min-height: 128px;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  color: var(--resume-text);
  text-align: left;
}

.certificate-entry {
  border: 1px solid rgba(255, 255, 255, 0.76);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 24px 64px rgba(43, 112, 198, 0.1);
  backdrop-filter: blur(18px);
  font: inherit;
  cursor: pointer;
  transition: border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

.certificate-entry:hover {
  border-color: rgba(22, 119, 255, 0.28);
  box-shadow: 0 30px 78px rgba(43, 112, 198, 0.16);
  transform: translateY(-4px);
}

.education-entry {
  grid-column: span 3;
  min-height: 128px;
}

.education-entry-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  margin-bottom: 8px;
}

.education-entry-heading h3 {
  margin: 0;
  color: var(--resume-deep);
  font-size: 20px;
  font-weight: 900;
  line-height: 1.5;
}

.education-entry-body p {
  margin: 0;
  color: var(--resume-muted);
  font-size: 14px;
  line-height: 1.72;
}

.certificate-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(15, 42, 95, 0.52);
}

.certificate-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(92vw, 760px);
  height: min(88vh, 860px);
  padding: 20px 20px 24px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 28px 80px rgba(15, 42, 95, 0.24);
}

.certificate-modal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.certificate-modal h3 {
  margin: 0;
  color: var(--resume-deep);
  font-size: 18px;
  font-weight: 900;
}

.certificate-modal__actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.certificate-modal__body {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border-radius: 12px;
  background: #eef4fb;
  box-shadow: inset 0 0 0 1px rgba(91, 124, 166, 0.12);
}

.certificate-modal__stage {
  display: flex;
  flex: 1 1 auto;
  align-items: flex-start;
  justify-content: center;
  min-height: 0;
  overflow: auto;
  padding: 24px;
}

.certificate-modal__preview {
  display: block;
  max-width: none;
  min-width: 280px;
  height: auto;
  margin-inline: auto;
  border: 0;
  background: #fff;
  box-shadow: 0 10px 28px rgba(15, 42, 95, 0.14);
  transition: width 0.16s ease;
}

.certificate-zoom {
  display: inline-grid;
  flex: 0 0 auto;
  grid-template-columns: 44px 72px 44px;
  align-items: center;
  overflow: hidden;
  margin: 12px auto 16px;
  border: 4px solid rgba(255, 255, 255, 0.92);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 34px rgba(15, 42, 95, 0.22);
}

.certificate-zoom button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: #e9edf3;
  color: var(--resume-deep);
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
}

.certificate-zoom button:disabled {
  cursor: default;
  opacity: 0.38;
}

.certificate-zoom button:not(:disabled):hover {
  background: rgba(22, 119, 255, 0.16);
}

.certificate-zoom span {
  color: var(--resume-text);
  font-size: 16px;
  font-weight: 800;
  text-align: center;
}

.certificate-modal-close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: rgba(22, 119, 255, 0.08);
  color: var(--resume-muted);
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
}

.certificate-modal-close:hover {
  background: rgba(22, 119, 255, 0.16);
  color: var(--resume-deep);
}

.certificate-modal-fade-enter-active,
.certificate-modal-fade-leave-active {
  transition: opacity 0.22s ease;
}

.certificate-modal-fade-enter-active .certificate-modal,
.certificate-modal-fade-leave-active .certificate-modal {
  transition: transform 0.22s ease;
}

.certificate-modal-fade-enter-from,
.certificate-modal-fade-leave-to {
  opacity: 0;
}

.certificate-modal-fade-enter-from .certificate-modal,
.certificate-modal-fade-leave-to .certificate-modal {
  transform: translateY(12px) scale(0.98);
}

.resume-links {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.entry-card > span {
  color: var(--resume-muted);
  font-weight: 800;
}

.certificate-entry > strong {
  color: var(--resume-blue);
  font-size: 22px;
}

@media (max-width: 1100px) {
  .cover-copy {
    width: min(52%, 566px);
  }

  .cover-art {
    object-position: 42% top;
  }

  .personal-advantages,
  .timeline,
  .project-grid,
  .resume-links,
  .more-projects {
    width: min(100% - 40px, 1180px);
    margin-inline: auto;
  }

  .timeline-item {
    grid-template-columns: 150px minmax(0, 1fr);
  }
}

@media (max-width: 860px) {
  .resume-page {
    width: min(100% - 28px, 1311px);
    padding-bottom: 80px;
  }

  .resume-cover {
    min-height: auto;
  }

  .cover-art {
    position: relative;
    inset: auto;
    display: block;
    width: 100%;
    min-width: 0;
    height: auto;
    max-height: 430px;
    object-fit: cover;
    object-position: left top;
  }

  .cover-copy {
    position: relative;
    top: auto;
    right: auto;
    width: auto;
    margin: 0;
    padding: 26px 24px 112px;
  }

  .cover-copy h1 {
    font-size: clamp(32px, 9vw, 42px);
  }

  .cover-summary {
    font-size: 16px;
  }

  .cover-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px 12px;
    padding: 14px 24px;
  }

  .cover-stats div:last-child {
    grid-column: 1 / -1;
  }

  .advantage-panel,
  .project-grid,
  .resume-links {
    grid-template-columns: 1fr;
  }

  .education-entry {
    grid-column: auto;
  }

  .advantage-panel {
    gap: 22px;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .resume-section-title h2 {
    font-size: 24px;
  }
}

@media (max-width: 560px) {
  .personal-advantages,
  .timeline,
  .project-grid,
  .resume-links,
  .more-projects {
    width: 100%;
  }

  .hero-tags span {
    font-size: 11px;
  }

  .download-button {
    width: 100%;
  }

  .resume-section-title {
    min-height: 50px;
    padding: 9px 16px;
  }

  .advantage-panel,
  .timeline-content,
  .project-card,
  .more-projects,
  .entry-card {
    padding: 20px;
  }

  .advantage-item {
    grid-template-columns: 44px minmax(0, 1fr);
    gap: 16px;
  }

  .advantage-icon {
    width: 44px;
    height: 44px;
  }
}

@media print {
  @page {
    size: A4;
    margin: 10mm 12mm;
  }

  :global(body) {
    background: #fff !important;
    color: #111;
  }

  :global(body::before),
  :global(.app-header) {
    display: none !important;
  }

  .resume-page {
    width: 100%;
    padding: 0;
    color: #111;
    font-family: "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  }

  .resume-page::before,
  .resume-cover::before,
  .cover-art,
  .hero-tags,
  .download-button,
  .cover-stats,
  .resume-links .certificate-entry,
  .certificate-modal-mask {
    display: none !important;
  }

  .resume-links {
    display: block !important;
    width: 100%;
    margin: 5mm 0 0;
  }

  .resume-links .education-entry {
    min-height: auto;
    padding: 0;
    border: 0;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
  }

  .resume-links .education-entry > span {
    display: block;
    margin-bottom: 2mm;
    color: #111;
    font-size: 15pt;
    font-weight: 900;
  }

  .education-entry-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 3mm;
    margin-bottom: 1.5mm;
  }

  .education-entry-heading h3 {
    margin: 0;
    color: #111;
    font-size: 11.2pt;
    font-weight: 900;
  }

  .resume-mini-tag {
    min-height: auto;
    padding: 1mm 3mm;
    border-radius: 4px;
    background: rgba(22, 119, 255, 0.1);
    color: #1677ff;
    font-size: 9pt;
    font-weight: 700;
  }

  .education-entry-body p {
    color: #222;
    font-size: 10pt;
    line-height: 1.85;
  }

  .resume-cover {
    position: relative;
    left: auto;
    width: 100%;
    min-height: auto;
    margin: 0 0 7mm;
    padding: 0 24mm 6mm 0;
    overflow: visible;
    border: 0;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .cover-copy {
    position: static;
    width: 100%;
    max-width: none;
    padding: 0;
  }

  .cover-name {
    margin: 0 0 3mm;
    color: #111;
    font-size: 24pt;
    font-weight: 900;
    line-height: 1.15;
  }

  .cover-copy h1 {
    margin: 0 0 3mm;
    color: #222;
    font-size: 13pt;
    font-weight: 700;
    line-height: 1.35;
  }

  .print-profile-meta {
    display: block;
    margin: 0 0 4mm;
    color: #333;
    font-size: 9.5pt;
    line-height: 1.75;
  }

  .print-profile-meta p {
    margin: 0;
  }

  .cover-summary {
    max-width: none;
    margin: 0;
    color: #222;
    font-size: 10pt;
    line-height: 1.85;
  }

  .print-avatar {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 22mm;
    height: 22mm;
    border: 1px solid #d9d9d9;
    border-radius: 999px;
    object-fit: cover;
    object-position: center top;
  }

  .resume-section {
    margin-top: 5mm;
    break-inside: auto;
    page-break-inside: auto;
  }

  .resume-section-title,
  .resume-section-title.compact {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 8mm;
    width: 100%;
    min-height: auto;
    margin: 0 0 4mm;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: #111;
    box-shadow: none;
  }

  .resume-section-title::after {
    content: '';
    display: block;
    height: 1px;
    background: #e3e3e3;
  }

  .resume-section-title h2 {
    margin: 0;
    color: #111;
    font-size: 15pt;
    font-weight: 900;
    line-height: 1.2;
  }

  .personal-advantages,
  .timeline,
  .project-grid,
  .more-projects {
    width: 100%;
    margin-inline: 0;
  }

  .advantage-panel,
  .project-grid {
    gap: 0;
  }

  .advantage-panel {
    display: block;
    padding: 0;
    border: 0;
    background: transparent;
    box-shadow: none;
  }

  .advantage-item {
    display: block;
    min-height: auto;
    margin: 0 0 2.2mm;
    padding: 0;
    border: 0;
    background: transparent;
    break-inside: auto;
    page-break-inside: auto;
  }

  .advantage-icon {
    display: none;
  }

  .advantage-item h3,
  .glass-card h3,
  .timeline-content h3,
  .project-card h3 {
    color: #111;
    font-size: 11.2pt;
    font-weight: 900;
    line-height: 1.45;
  }

  .advantage-item h3 {
    display: inline;
    margin: 0;
  }

  .advantage-item h3::after {
    content: '：';
    font-weight: 900;
  }

  .advantage-item p {
    display: inline;
    color: #222;
    font-size: 10pt;
    line-height: 1.85;
  }

  .timeline-item {
    position: relative;
    display: block;
    margin: 0 0 4mm;
    padding: 0;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .timeline-time {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0;
    color: #333;
    font-size: 10pt;
    font-weight: 500;
    line-height: 1.5;
  }

  .glass-card,
  .more-projects,
  .entry-card {
    border: 1px solid #dce7f5;
    background: #fff;
    box-shadow: none;
    backdrop-filter: none;
  }

  .glass-card {
    border: 0;
    border-radius: 0;
    background: transparent;
  }

  .timeline-content,
  .project-card,
  .more-projects {
    padding: 0;
  }

  .timeline-heading {
    display: flex;
    align-items: baseline;
    gap: 8mm;
    margin: 0 30mm 2mm 0;
  }

  .timeline-heading h3 {
    margin: 0;
    font-size: 11.5pt;
  }

  .timeline-heading .resume-mini-tag {
    min-height: 0;
    padding: 1mm 3mm;
    border-radius: 4px;
    background: rgba(22, 119, 255, 0.1);
    color: #1677ff;
    font-size: 9pt;
    font-weight: 700;
  }

  .timeline-content ul {
    display: block;
    margin: 0;
    padding-left: 0;
    list-style-position: inside;
  }

  .timeline-content li,
  .project-card p,
  .more-projects p {
    color: #222;
    font-size: 10pt;
    line-height: 1.85;
  }

  .project-grid {
    display: block;
  }

  .project-card {
    margin-bottom: 3mm;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .project-card h3 {
    margin: 0 0 1mm;
  }

  .project-meta {
    margin: 0 0 1.5mm;
    color: #222;
    font-size: 9.5pt;
    font-weight: 700;
  }

  .more-projects {
    border: 0;
    background: transparent;
  }
}
</style>
