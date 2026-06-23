<template>
  <div class="css-mb" :class="[{ 'with-glare': !src }, className]" :aria-label="title">
    <div class="mb-display-position">
      <div class="mb-display">
        <div class="mb-screen-position">
          <div class="mb-screen">
            <iframe v-if="src" :src="src" :title="title" />
            <img v-else-if="screenshot" :src="screenshot" :alt="title" />
            <div v-else class="mb-screen-empty">
              <span>{{ title }}</span>
              <strong>PC 后台预览</strong>
              <small>预览内容待接入</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-body"></div>
    <div class="mb-bottom-cover"></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string
    screenshot?: string
    title?: string
    className?: string
  }>(),
  {
    title: 'MacBook preview',
    src: '',
    screenshot: '',
    className: '',
  },
)
</script>

<style scoped>
.css-mb {
  width: 100%;
  max-width: 1120px;
  min-width: 50px;
  margin: 0 auto;
  filter: drop-shadow(0 28px 44px rgba(43, 112, 198, 0.18));
}

.css-mb div {
  box-sizing: border-box !important;
}

.css-mb .mb-display-position {
  width: 80%;
  margin: 0 auto;
}

.css-mb .mb-display {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 65.9442%;
  background: #34373a;
  border-top-left-radius: 3.5% 5.3075%;
  border-top-right-radius: 3.5% 5.3075%;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    inset 0 0 0 6px rgba(255, 255, 255, 0.02);
}

.css-mb .mb-display::before {
  content: '';
  display: block;
  position: absolute;
  top: 3%;
  left: 50%;
  width: 1%;
  height: 1.5164%;
  margin-left: -0.5%;
  border-radius: 50%;
  background: #565a5d;
}

.css-mb .mb-display::after {
  content: '';
  display: none;
  position: absolute;
  right: 0.4%;
  top: 0.64%;
  width: 62.5%;
  height: 100%;
  background: linear-gradient(55deg, rgba(0, 0, 0, 0) 61%, rgba(255, 255, 255, 0.05) 61%);
  border-top-right-radius: 5.3075%;
  pointer-events: none;
}

.css-mb.with-glare .mb-display::after {
  display: block;
}

.css-mb .mb-screen-position {
  position: absolute;
  top: 6.5%;
  left: 3.4%;
  width: 93.2%;
  height: 0;
  margin: 0;
  padding-bottom: 58.25%;
}

.css-mb .mb-screen {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #f5f9ff;
}

.css-mb .mb-screen img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.css-mb .mb-screen iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #f5f9ff;
}

.css-mb .mb-screen-empty {
  display: grid;
  place-content: center;
  height: 100%;
  gap: 8px;
  background:
    radial-gradient(circle at 72% 20%, rgba(40, 183, 255, 0.18), transparent 30%),
    linear-gradient(135deg, #f7fbff, #e8f3ff);
  color: #0f2a5f;
  text-align: center;
}

.mb-screen-empty span {
  color: #0f6ce8;
  font-size: clamp(8px, 1.1vw, 12px);
  font-weight: 900;
}

.mb-screen-empty strong {
  font-size: clamp(16px, 2.4vw, 28px);
}

.mb-screen-empty small {
  color: #6b7f9a;
  font-size: clamp(8px, 1.1vw, 12px);
  font-weight: 700;
}

.css-mb .mb-body {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 2.3%;
  background: linear-gradient(180deg, #f1f3f5 0%, #dfe3e8 100%);
}

.css-mb .mb-body::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 50%;
  width: 14.074%;
  height: 0;
  padding-bottom: 1.4814%;
  margin-left: -7.037%;
  background: #adb1b6;
  border-bottom-left-radius: 7.037% 50%;
  border-bottom-right-radius: 7.037% 50%;
}

.css-mb .mb-bottom-cover {
  width: 100%;
  height: 0;
  padding-bottom: 0.7407%;
  background: linear-gradient(180deg, #b9bdc4 0%, #969da7 100%);
  border-bottom-left-radius: 12% 600%;
  border-bottom-right-radius: 12% 600%;
}

@media (max-width: 720px) {
  .css-mb {
    min-width: 0;
    filter: drop-shadow(0 20px 30px rgba(43, 112, 198, 0.16));
  }

  .css-mb .mb-display-position {
    width: 86%;
  }
}
</style>
