<template>
  <span class="device-health-cover-visual" aria-hidden="true">
    <img
      class="cover-base"
      :src="coverAssets.cover"
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
            :src="coverAssets.coverIconStitch"
            alt=""
            width="180"
            height="180"
            loading="lazy"
            decoding="async"
          />
        </span>
        <span class="cover-icon cover-icon--chat">
          <img
            :src="coverAssets.coverIconGeminiFront"
            alt=""
            width="180"
            height="180"
            loading="lazy"
            decoding="async"
          />
        </span>
        <span class="cover-icon cover-icon--blue">
          <img
            :src="coverAssets.coverIconGeminiBack"
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

<script setup lang="ts">
import { deviceHealthAssets } from '@/shared/assets'

const coverAssets = deviceHealthAssets
</script>

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
  right: 15px;
  z-index: 5;
  width: 110px;
  height: 58px;
  overflow: visible;
  pointer-events: none;
}

.cover-icon {
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  overflow: hidden;
  border: 1px solid #fff;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.4);
}

.cover-icon--star {
  top: 14px;
  left: 0;
  z-index: 1;
  transform: rotate(-20deg);
}

.cover-icon--chat {
  top: 0;
  left: 36px;
  z-index: 2;
}

.cover-icon--blue {
  top: 12px;
  right: 0;
  z-index: 3;
  transform: rotate(44.58deg);
}

.cover-icon img {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 124%;
  height: 124%;
  max-width: none;
  border-radius: inherit;
  object-fit: contain;
  transform: translate(-50%, -50%);
}

.cover-icon--star img {
  width: 168%;
  height: 168%;
}

.cover-icon--chat img {
  width: 152%;
  height: 152%;
}

.cover-icon--blue img {
  width: 150%;
  height: 150%;
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
