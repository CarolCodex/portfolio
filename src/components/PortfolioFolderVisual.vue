<template>
  <div class="portfolio-visual" aria-label="Portfolio visual">
    <div class="orb orb-large" />
    <div class="orb orb-small" />

    <div class="folder-card">
      <div class="folder-tab" />
      <div class="folder-shine" />
      <span class="folder-label">PORTFOLIO</span>
      <strong>作品集</strong>
      <p>UI/UED · Front-end · AI Workflow</p>
      <div class="folder-lines">
        <i />
        <i />
        <i />
      </div>
    </div>

    <div
      v-for="tool in tools"
      :key="tool.name"
      class="tool-bubble"
      :class="tool.className"
      :aria-label="tool.name"
    >
      <span>{{ tool.short }}</span>
      <small>{{ tool.name }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
const tools = [
  { name: 'ChatGPT', short: 'AI', className: 'tool-ai' },
  { name: 'Figma', short: 'Fi', className: 'tool-figma' },
  { name: 'Codex', short: 'Cx', className: 'tool-codex' },
  { name: 'Vue', short: 'V', className: 'tool-vue' },
]
</script>

<style scoped>
.portfolio-visual {
  position: relative;
  min-height: 560px;
  border-radius: 36px;
  background:
    radial-gradient(circle at 28% 20%, rgba(255, 255, 255, 0.95), transparent 24%),
    radial-gradient(circle at 82% 28%, rgba(99, 179, 255, 0.58), transparent 30%),
    linear-gradient(145deg, rgba(222, 241, 255, 0.72), rgba(246, 250, 255, 0.45));
  overflow: hidden;
  transform-style: preserve-3d;
}

.portfolio-visual::before {
  content: '';
  position: absolute;
  inset: 24px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 30px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(2px);
}

.orb-large {
  right: -72px;
  top: 64px;
  width: 230px;
  height: 230px;
  background: radial-gradient(circle, rgba(63, 152, 255, 0.45), rgba(141, 206, 255, 0.05) 68%);
}

.orb-small {
  left: 42px;
  bottom: 60px;
  width: 148px;
  height: 148px;
  background: radial-gradient(circle, rgba(154, 132, 255, 0.28), rgba(255, 255, 255, 0) 70%);
}

.folder-card {
  position: absolute;
  left: 50%;
  top: 52%;
  width: min(78%, 420px);
  min-height: 320px;
  padding: 42px 36px 34px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 30px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.68), rgba(186, 222, 255, 0.36)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.16));
  box-shadow:
    0 38px 90px rgba(38, 119, 210, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(22px);
  transform: translate(-50%, -50%) rotateX(8deg) rotateY(-10deg) rotateZ(-2deg);
}

.folder-tab {
  position: absolute;
  top: -28px;
  left: 34px;
  width: 156px;
  height: 58px;
  border: 1px solid rgba(255, 255, 255, 0.66);
  border-bottom: 0;
  border-radius: 24px 24px 0 0;
  background: linear-gradient(135deg, rgba(137, 203, 255, 0.72), rgba(255, 255, 255, 0.46));
  backdrop-filter: blur(16px);
}

.folder-shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.7), transparent 34%);
  pointer-events: none;
}

.folder-label {
  position: relative;
  display: inline-flex;
  margin-bottom: 20px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.42);
  color: #1662c4;
  font-size: 12px;
  font-weight: 800;
}

.folder-card strong {
  position: relative;
  display: block;
  color: #0b2f6b;
  font-size: 54px;
  line-height: 1;
}

.folder-card p {
  position: relative;
  margin: 14px 0 0;
  color: rgba(29, 74, 132, 0.78);
  font-weight: 700;
}

.folder-lines {
  position: relative;
  display: grid;
  gap: 12px;
  margin-top: 44px;
}

.folder-lines i {
  display: block;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(20, 112, 235, 0.78), rgba(115, 192, 255, 0.34));
}

.folder-lines i:nth-child(2) {
  width: 72%;
}

.folder-lines i:nth-child(3) {
  width: 48%;
}

.tool-bubble {
  position: absolute;
  z-index: 2;
  display: grid;
  gap: 4px;
  min-width: 92px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.56);
  box-shadow: 0 18px 45px rgba(40, 112, 204, 0.16);
  backdrop-filter: blur(16px);
}

.tool-bubble span {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, #0d6efd, #69c7ff);
  color: #fff;
  font-size: 13px;
  font-weight: 900;
}

.tool-bubble small {
  color: #1f5c9e;
  font-weight: 800;
}

.tool-ai {
  left: 26px;
  top: 86px;
}

.tool-figma {
  right: 36px;
  top: 118px;
}

.tool-codex {
  left: 58px;
  bottom: 82px;
}

.tool-vue {
  right: 70px;
  bottom: 70px;
}

@media (max-width: 900px) {
  .portfolio-visual {
    min-height: 480px;
  }
}

@media (max-width: 560px) {
  .portfolio-visual {
    min-height: 420px;
    border-radius: 26px;
  }

  .folder-card {
    width: 78%;
    min-height: 270px;
    padding: 34px 26px 26px;
  }

  .folder-card strong {
    font-size: 40px;
  }

  .tool-bubble {
    min-width: 70px;
    padding: 10px;
    border-radius: 18px;
  }

  .tool-bubble small {
    font-size: 11px;
  }
}
</style>
