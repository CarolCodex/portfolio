<template>
  <div class="resume-page">
    <section class="resume-hero">
      <div class="hero-copy">
        <h1>曹兰｜UI + 前端复合岗</h1>
        <p>{{ resume.summary }}</p>
      </div>

      <aside class="info-card">
        <img class="avatar" :src="avatarUrl" alt="曹兰头像" />
        <div class="info-grid">
          <div v-for="item in basicInfoItems" :key="item.label">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </div>
        </div>
      </aside>
    </section>

    <section class="resume-section">
      <div class="section-heading">
        <h2>核心优势</h2>
      </div>
      <div class="advantage-grid">
        <article v-for="item in resume.advantages" :key="item.title" class="glass-card advantage-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </section>

    <section class="resume-section current-job">
      <div class="section-heading">
        <h2>最近经历｜{{ resume.currentJob.company }}</h2>
      </div>

      <div class="current-layout">
        <article class="glass-card current-main">
          <div class="job-title-row">
            <div>
              <span class="job-time">{{ resume.currentJob.time }}</span>
              <h3>{{ resume.currentJob.role }}</h3>
            </div>
            <strong>{{ resume.currentJob.company }}</strong>
          </div>
          <p>{{ resume.currentJob.description }}</p>
          <ul class="check-list">
            <li v-for="item in resume.currentJob.achievements" :key="item">{{ item }}</li>
          </ul>
        </article>

        <aside class="ai-panel">
          <div class="panel-title">
            <h3>AI 辅助工作流</h3>
          </div>
          <div class="workflow-list">
            <article v-for="(item, index) in resume.aiWorkflow" :key="item.title" class="workflow-card">
              <span class="step">{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
            </article>
          </div>
        </aside>
      </div>
    </section>

    <section class="resume-section">
      <div class="section-heading">
        <h2>工作经历</h2>
      </div>
      <div class="timeline">
        <article v-for="item in resume.workExperience" :key="`${item.company}-${item.time}`" class="timeline-item">
          <div class="timeline-time">{{ item.time }}</div>
          <div class="glass-card timeline-content">
            <h3>{{ item.company }}</h3>
            <strong>{{ item.role }}</strong>
            <ul>
              <li v-for="duty in item.duties" :key="duty">{{ duty }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section class="resume-section">
      <div class="section-heading">
        <h2>项目经历精选</h2>
      </div>
      <div class="project-grid">
        <article v-for="project in resume.selectedProjects" :key="project.title" class="glass-card project-card">
          <h3>{{ project.title }}</h3>
          <div class="project-meta">
            <span>{{ project.role }}</span>
            <span>{{ project.time }}</span>
          </div>
          <p>{{ project.description }}</p>
        </article>
      </div>
      <div class="more-projects">
        <span>更多项目</span>
        <p>{{ resume.moreProjects.join(' / ') }}</p>
      </div>
    </section>

    <section class="resume-section">
      <div class="section-heading">
        <h2>技能栈</h2>
      </div>
      <div class="skills-grid">
        <article v-for="group in resume.skills" :key="group.group" class="glass-card skill-card">
          <h3>{{ group.group }}</h3>
          <p class="skill-text">{{ group.items.join(' / ') }}</p>
        </article>
      </div>
    </section>

    <section class="resume-section education-layout">
      <article class="glass-card education-card">
        <div class="section-heading compact">
          <h2>教育经历</h2>
        </div>
        <h3>
          {{ resume.education.school }}｜{{ resume.education.degree }}｜{{ resume.education.major }}
        </h3>
        <strong>{{ resume.education.time }}</strong>
        <p>{{ resume.education.description }}</p>
      </article>

      <article class="glass-card certificate-card">
        <div class="section-heading compact">
          <h2>证书</h2>
        </div>
        <p>{{ resume.certificates.join(' / ') }}</p>
      </article>
    </section>

    <section class="resume-section resume-links">
      <RouterLink
        v-for="link in routeLinks"
        :key="link.label"
        class="entry-card"
        :to="link.to"
      >
        <span>{{ link.label }}</span>
        <strong>查看</strong>
      </RouterLink>
      <a v-for="link in placeholderLinks" :key="link.label" class="entry-card" :href="link.to">
        <span>{{ link.label }}</span>
        <strong>占位</strong>
      </a>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import avatarUrl from '@/assets/avatar-cao-lan.jpg'
import { resume } from '@/data/resume'

const basicInfoItems = computed(() => [
  { label: '姓名', value: resume.basicInfo.name },
  { label: '性别', value: resume.basicInfo.gender },
  { label: '年龄', value: resume.basicInfo.age },
  { label: '电话', value: resume.basicInfo.phone },
  { label: '邮箱', value: resume.basicInfo.email },
  { label: '工作经验', value: resume.basicInfo.experience },
  { label: '求职意向', value: resume.basicInfo.intention },
  { label: '期望薪资', value: resume.basicInfo.salary },
  { label: '期望城市', value: resume.basicInfo.city },
])

const routeLinks = computed(() => resume.links.filter((link) => link.kind === 'route'))
const placeholderLinks = computed(() => resume.links.filter((link) => link.kind !== 'route'))
</script>

<style scoped>
.resume-page {
  --resume-blue: #1677ff;
  --resume-deep: #0f2a5f;
  --resume-bg: #eaf5ff;
  --resume-text: #10233f;
  --resume-muted: #5d728f;
  width: min(100% - 40px, 1180px);
  margin-inline: auto;
  padding: 54px 0 120px;
  color: var(--resume-text);
}

.resume-page::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(circle at 12% 8%, rgba(22, 119, 255, 0.18), transparent 30rem),
    radial-gradient(circle at 88% 16%, rgba(164, 180, 255, 0.18), transparent 28rem),
    linear-gradient(180deg, #eef8ff 0%, #ffffff 42%, var(--resume-bg) 100%);
  pointer-events: none;
}

.resume-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  align-items: stretch;
  gap: 24px;
}

.hero-copy,
.glass-card,
.info-card,
.ai-panel,
.more-projects,
.entry-card {
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 24px 64px rgba(43, 112, 198, 0.12);
  backdrop-filter: blur(20px);
}

.hero-copy {
  position: relative;
  overflow: hidden;
  min-height: 360px;
  padding: 44px;
  border-radius: 34px;
  background:
    radial-gradient(circle at 88% 12%, rgba(104, 194, 255, 0.28), transparent 32%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(222, 240, 255, 0.64));
}

.hero-copy::after {
  content: '';
  position: absolute;
  right: -90px;
  bottom: -120px;
  width: 280px;
  height: 280px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(22, 119, 255, 0.18), transparent 70%);
}

.job-time {
  display: block;
  color: var(--resume-blue);
  font-size: 13px;
  font-weight: 900;
}

.hero-copy h1 {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 20px 0 18px;
  color: var(--resume-deep);
  font-size: clamp(34px, 5vw, 56px);
  line-height: 1.12;
}

.hero-copy p {
  position: relative;
  z-index: 1;
  max-width: 760px;
  margin: 0;
  color: var(--resume-muted);
  font-size: 17px;
  line-height: 1.9;
}

.info-card {
  padding: 26px;
  border-radius: 30px;
}

.avatar {
  width: 84px;
  height: 84px;
  margin-bottom: 22px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 999px;
  object-fit: cover;
  object-position: center 18%;
  box-shadow: 0 18px 38px rgba(22, 119, 255, 0.24);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.info-grid div {
  min-width: 0;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.54);
}

.info-grid span {
  display: block;
  margin-bottom: 6px;
  color: var(--resume-muted);
  font-size: 12px;
}

.info-grid strong {
  color: var(--resume-text);
  font-size: 14px;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.resume-section {
  margin-top: 76px;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 24px;
}

.section-heading.compact {
  margin-bottom: 18px;
}

.section-heading h2,
.panel-title h3 {
  margin: 12px 0 0;
  color: var(--resume-deep);
  font-size: clamp(26px, 4vw, 38px);
  line-height: 1.18;
}

.advantage-grid,
.project-grid,
.skills-grid {
  display: grid;
  gap: 18px;
}

.advantage-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.project-grid,
.skills-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.glass-card,
.ai-panel,
.more-projects,
.entry-card {
  border-radius: 26px;
  padding: 26px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.glass-card:hover,
.entry-card:hover {
  border-color: rgba(22, 119, 255, 0.34);
  box-shadow: 0 30px 76px rgba(43, 112, 198, 0.16);
  transform: translateY(-4px);
}

.glass-card h3,
.timeline-content h3,
.project-card h3,
.skill-card h3,
.education-card h3 {
  margin: 0 0 12px;
  color: var(--resume-deep);
  font-size: 21px;
  line-height: 1.32;
}

.glass-card p,
.workflow-card p,
.more-projects p,
.education-card p,
.certificate-card p,
.skill-text,
.timeline-content li {
  margin: 0;
  color: var(--resume-muted);
  line-height: 1.8;
}

.current-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
  gap: 22px;
}

.current-main,
.ai-panel {
  background:
    radial-gradient(circle at 88% 12%, rgba(22, 119, 255, 0.13), transparent 32%),
    rgba(255, 255, 255, 0.74);
}

.job-title-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.job-title-row h3 {
  margin-top: 12px;
  font-size: 28px;
}

.job-title-row > strong {
  color: var(--resume-deep);
  line-height: 1.5;
}

.check-list {
  display: grid;
  gap: 12px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}

.check-list li {
  position: relative;
  padding-left: 24px;
  color: var(--resume-text);
  line-height: 1.7;
}

.check-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.72em;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--resume-blue);
  box-shadow: 0 0 0 4px rgba(22, 119, 255, 0.12);
}

.workflow-list {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.workflow-card {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 14px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.58);
}

.step {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 15px;
  background: linear-gradient(135deg, #0f5ed5, #69c8ff);
  color: #fff;
  font-size: 13px;
  font-weight: 900;
}

.workflow-card h4 {
  margin: 0 0 6px;
  color: var(--resume-deep);
  font-size: 16px;
}

.timeline {
  display: grid;
  gap: 16px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.timeline-time {
  position: sticky;
  top: 96px;
  padding: 4px 0;
  color: var(--resume-blue);
  font-weight: 900;
}

.timeline-content strong,
.education-card strong {
  display: block;
  margin-bottom: 12px;
  color: #2867aa;
}

.timeline-content ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 18px;
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
  margin-top: 18px;
}

.more-projects > span {
  color: var(--resume-blue);
  font-weight: 900;
}

.more-projects p {
  margin-top: 8px;
}

.education-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
}

.resume-links {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.entry-card {
  display: flex;
  min-height: 128px;
  flex-direction: column;
  justify-content: space-between;
  color: var(--resume-text);
}

.entry-card span {
  color: var(--resume-muted);
  font-weight: 800;
}

.entry-card strong {
  color: var(--resume-blue);
  font-size: 22px;
}

@media (max-width: 1040px) {
  .resume-hero,
  .current-layout,
  .education-layout {
    grid-template-columns: 1fr;
  }

  .advantage-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .resume-page {
    width: min(100% - 28px, 1180px);
    padding-top: 38px;
    padding-bottom: 80px;
  }

  .hero-copy,
  .info-card,
  .glass-card,
  .ai-panel,
  .more-projects,
  .entry-card {
    border-radius: 22px;
    padding: 22px;
  }

  .info-grid,
  .advantage-grid,
  .project-grid,
  .skills-grid,
  .resume-links {
    grid-template-columns: 1fr;
  }

  .timeline-item {
    grid-template-columns: 1fr;
  }

  .timeline-time {
    position: static;
    width: fit-content;
  }

  .job-title-row {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .workflow-card {
    grid-template-columns: 1fr;
  }
}
</style>
