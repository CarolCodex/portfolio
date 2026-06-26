<template>
  <section class="industrial-gallery-page">
    <header class="gallery-hero">
      <h1>数字孪生大屏</h1>
      <p>基于Blender建模生成3D工业场景，导出MP4视频作为数字孪生主视觉，通过前端代码实现工业大屏可视化系统。</p>
    </header>

    <div class="project-grid" aria-label="工业大屏项目">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'
import { industrialTwinProjects } from './projects'

const projects = industrialTwinProjects
</script>

<style scoped>
.industrial-gallery-page {
  padding: 24px 0 72px;
}

.gallery-hero {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.gallery-hero h1 {
  margin: 0 0 14px;
  color: #092b66;
  font-size: clamp(42px, 5vw, 78px);
  font-weight: 900;
  line-height: 1.06;
}

.gallery-hero p {
  max-width: 760px;
  margin: 0 auto;
  color: #60748c;
  font-size: 17px;
  line-height: 1.75;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  margin-top: 48px;
}

@media (max-width: 1120px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .industrial-gallery-page {
    padding-top: 16px;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
