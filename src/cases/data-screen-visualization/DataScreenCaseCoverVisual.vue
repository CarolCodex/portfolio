<template>
  <span class="data-screen-cover-visual" aria-hidden="true">
    <img
      class="cover-dashboard"
      src="/case-assets/data-screen-visualization/cover-dashboard.png"
      alt=""
      width="1672"
      height="941"
      loading="lazy"
      decoding="async"
    />
    <span class="cover-caption" data-node-id="179:244">
      <span class="cover-icon-stack">
        <span class="cover-icon cover-icon--rotated" data-node-id="179:246">
          <img
            src="/case-assets/data-screen-visualization/cover-icon-codex.png"
            alt=""
            width="512"
            height="512"
            loading="lazy"
            decoding="async"
          />
        </span>
        <span class="cover-icon cover-icon--front" data-node-id="179:247">
          <img
            src="/case-assets/data-screen-visualization/cover-icon-figma.png"
            alt=""
            width="512"
            height="512"
            loading="lazy"
            decoding="async"
          />
        </span>
      </span>
      <strong class="cover-title" data-node-id="179:248">
        <span class="cover-title-line">
          <span class="cover-title-chatgpt">ChatGPT</span>
          <span>生成初稿</span>
        </span>
        <span class="cover-title-subtitle">figma设计大屏，code实现</span>
      </strong>
    </span>
  </span>
</template>

<style scoped>
.data-screen-cover-visual {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 22%, rgba(49, 156, 255, 0.22), transparent 46%),
    linear-gradient(180deg, #031831 0%, #061533 100%);
}

.cover-dashboard {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: auto;
  max-width: none;
  border-radius: 8px;
}

.cover-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  height: 60%;
  padding: 0 16px 14px;
  border-radius: 0 0 8px 8px;
  background: linear-gradient(180deg, rgba(21, 116, 250, 0) 0%, #1472f9 100%);
}

.cover-title,
.cover-title-line,
.cover-title-chatgpt,
.cover-title-subtitle {
  font-family:
    "PingFang SC", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-weight: 900;
  letter-spacing: 0;
}

.cover-icon-stack {
  position: absolute;
  top: 9px;
  right: 15px;
  width: 74px;
  height: 51px;
}

.cover-icon {
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  overflow: hidden;
  border: 1px solid #fff;
  border-radius: 8px;
}

.cover-icon--rotated {
  top: 3px;
  right: 0;
  z-index: 1;
  transform: rotate(44.58deg);
}

.cover-icon--front {
  top: 0;
  left: 0;
  z-index: 2;
}

.cover-icon img {
  position: absolute;
  display: block;
  max-width: none;
}

.cover-icon--rotated img {
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
}

.cover-icon--front img {
  top: -12%;
  left: -12%;
  width: 124%;
  height: 124%;
}

.cover-title {
  position: absolute;
  right: 16px;
  bottom: 14px;
  left: 16px;
  display: block;
  color: #fff;
  font-size: 18px;
  line-height: 1.18;
  text-shadow: 0 1px 1px rgba(10, 52, 130, 0.18);
}

.cover-title-line,
.cover-title-subtitle {
  display: block;
  white-space: nowrap;
}

.cover-title-chatgpt {
  display: inline-block;
  margin-right: 4px;
  background: linear-gradient(180deg, #ff5500 0%, #ffc6aa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 20px;
  line-height: 1;
  text-shadow: none;
}

@media (max-width: 640px) {
  .cover-title {
    font-size: 16px;
  }

  .cover-title-chatgpt {
    font-size: 18px;
  }
}
</style>
