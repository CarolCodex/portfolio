<template>
  <header class="workflow-hero">
    <h1 id="workflow-title">
      <span class="gradient-text">AI</span>
      不是替我做设计，而是帮我更快完成
      <span class="gradient-text">从需求到落地</span>
    </h1>
    <p class="workflow-hero__description">
      长期使用 ChatGPT、Gemini、Figma Make、Stitch、Codex、Cursor 等 AI
      工具，把它们融入需求理解、产品梳理、交互原型、视觉方案、组件规范、前端还原和上线走查中。
      <br />
      AI 负责提高效率和拓展方案，我负责产品判断、体验取舍、视觉品质和最终交付。
    </p>
  </header>
</template>

<style scoped>
.workflow-hero {
  max-width: 1120px;
  margin: 0 auto 40px;
  text-align: center;
}

h1 {
  max-width: 100%;
  margin: 0;
  color: #f5f8ff;
  font-size: clamp(30px, 2.8vw, 42px);
  font-weight: 900;
  line-height: 1.08;
  white-space: nowrap;
  text-shadow: 0 18px 58px rgba(47, 107, 255, 0.22);
}

.gradient-text {
  background: linear-gradient(120deg, #27c3ff 0%, #2f6bff 45%, #8b5cff 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.workflow-hero__description {
  max-width: 760px;
  margin: 22px auto 0;
  color: rgba(190, 205, 230, 0.72);
  font-size: 17px;
  line-height: 1.9;
}

@media (max-width: 720px) {
  .workflow-hero {
    margin-bottom: 42px;
    text-align: left;
  }

  h1 {
    font-size: clamp(16px, 4.1vw, 30px);
    line-height: 1.14;
  }

  .workflow-hero__description {
    margin-top: 18px;
    font-size: 15px;
    line-height: 1.82;
  }
}
</style>
