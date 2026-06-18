<template>
  <span class="device-health-cover-visual" aria-hidden="true">
    <img
      class="cover-base"
      src="/case-assets/device-health-management-platform/case-cover.png"
      alt=""
      width="2746"
      height="1706"
      loading="lazy"
      decoding="async"
    />

    <span class="cover-caption">
      <span class="cover-icon-stack">
        <span class="cover-icon cover-icon--star">
          <img
            src="/case-assets/device-health-management-platform/cover-icon-stitch.png"
            alt=""
            width="180"
            height="180"
            loading="lazy"
            decoding="async"
          />
        </span>
        <span class="cover-icon cover-icon--chat">
          <img
            src="/case-assets/device-health-management-platform/cover-icon-gemini-front.png"
            alt=""
            width="180"
            height="180"
            loading="lazy"
            decoding="async"
          />
        </span>
        <span class="cover-icon cover-icon--blue">
          <img
            src="/case-assets/device-health-management-platform/cover-icon-gemini-back.png"
            alt=""
            width="180"
            height="180"
            loading="lazy"
            decoding="async"
          />
        </span>
      </span>

      <strong class="cover-title">
        <span class="cover-title-line">
          <span class="cover-title-gemini">Gemini</span>
          <span>整理核心功能</span>
        </span>
        <span class="cover-title-subtitle">Stitch输出设计界面</span>
      </strong>
    </span>
  </span>
</template>

<style scoped>
.device-health-cover-visual {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  background: #d9ecff;
}

.cover-base {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: block;
  height: 60%;
  padding: 0 16px 14px;
  border-radius: 0 0 8px 8px;
  background: linear-gradient(180deg, rgba(40, 100, 255, 0) 0%, #2864ff 100%);
}

.cover-icon-stack {
  position: absolute;
  top: 6px;
  right: 5px;
  width: 110px;
  height: 58px;
}

.cover-icon {
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  overflow: hidden;
  border: 1px solid #fff;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.4);
}

.cover-icon--star {
  top: 6px;
  left: 4px;
  z-index: 1;
  transform: rotate(44.58deg);
}

.cover-icon--chat {
  top: 3px;
  left: 32px;
  z-index: 2;
  transform: rotate(-20deg);
}

.cover-icon--blue {
  top: 15px;
  left: 70px;
  z-index: 3;
}

.cover-icon img {
  position: absolute;
  display: block;
  object-fit: cover;
}

.cover-icon--star img {
  top: -20%;
  left: -20%;
  width: 140%;
  height: 140%;
}

.cover-icon--chat img {
  top: -9.5%;
  left: -9.5%;
  width: 119%;
  height: 119%;
}

.cover-icon--blue img {
  top: -17.5%;
  left: -17.5%;
  width: 135%;
  height: 135%;
}

.cover-title,
.cover-title-line,
.cover-title-gemini,
.cover-title-subtitle {
  font-family:
    "PingFang SC", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-weight: 900;
  letter-spacing: 0;
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

.cover-title-gemini {
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

@media (max-width: 1120px) {
  .cover-title {
    font-size: 17px;
  }

  .cover-title-gemini {
    font-size: 19px;
  }
}

@media (max-width: 640px) {
  .cover-title {
    font-size: 16px;
  }

  .cover-title-gemini {
    font-size: 18px;
  }
}
</style>
