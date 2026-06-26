<template>
  <RouterLink class="project-card" :to="project.route">
    <span class="project-thumb">
      <img :src="project.thumbnail" :alt="`${project.title}缩略图`" loading="lazy" decoding="async" />
    </span>
    <span class="project-meta">
      <strong>{{ project.title }}</strong>
      <small>{{ project.subtitle }}</small>
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Project } from './types'

defineProps<{
  project: Project
}>()

</script>

<style scoped>
.project-card {
  display: flex;
  min-width: 0;
  cursor: pointer;
  flex-direction: column;
  border: 1px solid rgba(52, 130, 216, 0.1);
  border-radius: 8px;
  padding: 14px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(230, 244, 255, 0.82)),
    #fff;
  box-shadow: 0 18px 48px rgba(15, 67, 128, 0.09);
  color: inherit;
  text-align: left;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.project-card:hover {
  border-color: rgba(37, 132, 235, 0.28);
  box-shadow:
    0 24px 60px rgba(19, 84, 168, 0.15),
    0 0 28px rgba(60, 160, 255, 0.18);
  transform: translateY(-5px);
}

.project-thumb {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background: linear-gradient(135deg, #dff2ff, #edf6ff);
}

.project-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-meta {
  display: flex;
  flex-direction: column;
  padding: 18px 4px 4px;
}

.project-meta strong {
  color: #112946;
  font-size: 22px;
  font-weight: 880;
  line-height: 1.25;
}

.project-meta small {
  width: max-content;
  margin-top: 12px;
  border: 1px solid rgba(9, 43, 102, 0.14);
  border-radius: 999px;
  padding: 6px 10px;
  color: #536a84;
  font-size: 12px;
  font-weight: 760;
}
</style>
