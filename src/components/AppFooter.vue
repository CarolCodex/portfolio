<template>
  <footer class="app-footer">
    <div class="container footer-inner">
      <p>UI/UED Designer Portfolio</p>
      <div class="footer-links">
        <a v-for="link in profile.links" :key="link.label" :href="link.href">{{ link.label }}</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<style scoped>
.app-footer {
  margin-top: 72px;
  border-top: 1px solid rgba(34, 45, 57, 0.08);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding-block: 28px;
  color: var(--color-muted);
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: 16px;
}

.footer-links a:hover {
  color: var(--color-ink);
}

@media (max-width: 640px) {
  .footer-inner {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
