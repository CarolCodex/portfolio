<template>
  <span class="liangxuan-cover-visual" aria-hidden="true">
    <span class="cover-phones">
      <span class="cover-phone cover-phone--left">
        <span class="phone-shell">
          <span class="phone-notch"></span>
          <span class="phone-screen">
            <img
              :src="coverAssets.home"
              alt=""
              width="198"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </span>
        </span>
      </span>
      <span class="cover-phone cover-phone--right">
        <span class="phone-shell">
          <span class="phone-notch"></span>
          <span class="phone-screen">
            <img
              :src="coverAssets.activity"
              alt=""
              width="270"
              height="900"
              loading="lazy"
              decoding="async"
            />
          </span>
        </span>
      </span>
    </span>

    <span class="cover-caption">
      <span class="cover-icon-stack">
        <span class="cover-icon cover-icon--rotated">
          <img
            :src="coverAssets.coverIconRotated"
            alt=""
            width="160"
            height="160"
            loading="lazy"
            decoding="async"
          />
        </span>
        <span class="cover-icon cover-icon--front">
          <img
            :src="coverAssets.coverIconFront"
            alt=""
            width="160"
            height="160"
            loading="lazy"
            decoding="async"
          />
        </span>
      </span>
      <strong class="cover-title">
        <span class="cover-title-line">
          <span class="cover-title-stitch">Stitch</span>
          <span>生成UI界面</span>
        </span>
        <span class="cover-title-subtitle">Codex落地代码、接口联调</span>
      </strong>
    </span>
  </span>
</template>

<script setup lang="ts">
import { liangxuanAssets } from '@/shared/assets'

const coverAssets = liangxuanAssets
</script>

<style scoped>
.liangxuan-cover-visual {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  background: transparent;
}

.cover-phones {
  position: absolute;
  top: 44%;
  left: 50%;
  z-index: 2;
  width: 244px;
  height: 224px;
  transform: translate(-50%, -50%) scale(0.9);
  transform-origin: center;
}

.cover-phone {
  position: absolute;
  width: 92px;
  filter: drop-shadow(0 14px 14px rgba(12, 34, 76, 0.18));
  transform-style: preserve-3d;
}

.cover-phone--left {
  top: 2px;
  left: 58px;
  z-index: 2;
  transform: rotate(-20deg);
}

.cover-phone--right {
  top: 20px;
  left: 140px;
  z-index: 3;
  width: 102px;
  transform: rotate(10deg);
}

.phone-shell {
  position: relative;
  display: block;
  padding: 4px;
  border: 1px solid rgba(2, 15, 36, 0.72);
  border-radius: 18px;
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0.82), transparent 14%),
    linear-gradient(145deg, #151922 0%, #05080e 48%, #323946 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 5px 0 6px rgba(255, 255, 255, 0.13),
    0 9px 18px rgba(9, 35, 77, 0.18);
}

.phone-notch {
  position: absolute;
  top: 4px;
  left: 50%;
  z-index: 3;
  width: 34px;
  height: 5px;
  border-radius: 0 0 5px 5px;
  background: #05070b;
  transform: translateX(-50%);
}

.phone-screen {
  position: relative;
  display: block;
  height: 184px;
  overflow: hidden;
  border-radius: 14px;
  background: #f7f8fa;
}

.phone-screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.cover-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: block;
  height: 60%;
  padding: 0 16px 14px;
  border-radius: 0 0 8px 8px;
  background: linear-gradient(180deg, rgba(40, 100, 255, 0) 0%, #2864ff 100%);
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
  width: 124%;
  height: 124%;
  object-fit: cover;
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
}

.cover-title,
.cover-title-line,
.cover-title-stitch,
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
}

.cover-title-line,
.cover-title-subtitle {
  display: block;
  white-space: nowrap;
}

.cover-title-stitch {
  display: inline-block;
  margin-right: 4px;
  background: linear-gradient(180deg, #ff5500 0%, #ffc6aa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 20px;
  line-height: 1;
}

@media (max-width: 1120px) {
  .cover-phones {
    transform: translate(-50%, -50%) scale(0.86);
  }
}

@media (max-width: 640px) {
  .cover-phones {
    transform: translate(-50%, -50%) scale(0.88);
  }

  .cover-title {
    font-size: 16px;
  }

  .cover-title-stitch {
    font-size: 18px;
  }
}
</style>
