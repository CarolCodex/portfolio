<template>
  <header class="workflow-hero">
    <h1 id="workflow-title">
      <span class="gradient-text">AI</span>
      不是替我做设计，而是帮我更快完成
      <span class="gradient-text">判断与落地</span>
    </h1>
    <p class="workflow-hero__description">
      日常项目中，我会把 AI 放进需求分析、初稿设计、前端实现和走查修复环节，用它提高效率，但最终的信息取舍、视觉判断和交付质量由我负责。
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
  max-width: 600px;
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
