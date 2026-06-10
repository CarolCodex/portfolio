<template>
  <span class="liangxuan-cover-visual" aria-hidden="true">
    <span class="cover-grid"></span>
    <span class="cover-orb cover-orb--cyan"></span>
    <span class="cover-orb cover-orb--blue"></span>
    <span class="cover-glass">
      <svg viewBox="0 0 900 620" preserveAspectRatio="xMidYMid meet">
        <path d="M214 110 C371 40 602 75 734 206 C811 283 779 430 657 503 C509 592 271 552 164 415 C78 305 100 167 214 110Z" />
        <path d="M94 360 C229 116 523 38 760 184" />
        <path d="M161 438 C325 220 595 162 810 292" />
        <circle cx="637" cy="220" r="10" />
      </svg>
    </span>

    <span class="cover-phones">
      <span class="cover-phone cover-phone--left">
        <span class="phone-shell">
          <span class="phone-notch"></span>
          <span class="phone-screen">
            <img src="/case-assets/liangxuan-mini-program/liangxuan-home.webp" alt="" loading="lazy" decoding="async" />
          </span>
        </span>
      </span>
      <span class="cover-phone cover-phone--right">
        <span class="phone-shell">
          <span class="phone-notch"></span>
          <span class="phone-screen">
            <img src="/case-assets/liangxuan-mini-program/liangxuan-activity.webp" alt="" loading="lazy" decoding="async" />
          </span>
        </span>
      </span>
    </span>
  </span>
</template>

<style scoped>
.liangxuan-cover-visual {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  background:
    radial-gradient(circle at 78% 22%, rgba(117, 244, 255, 0.36), transparent 31%),
    radial-gradient(circle at 88% 78%, rgba(128, 102, 255, 0.2), transparent 29%),
    radial-gradient(circle at 8% 18%, rgba(255, 255, 255, 0.94), transparent 38%),
    linear-gradient(120deg, #f9fdff 0%, #eaf8ff 32%, #c9f2ff 58%, #cbd9ff 82%, #edf4ff 100%);
  background-size: 130% 130%;
}

.liangxuan-cover-visual::after {
  position: absolute;
  inset: 0;
  z-index: 1;
  content: '';
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.68) 0%, rgba(255, 255, 255, 0.18) 42%, transparent 78%);
}

.cover-grid {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(rgba(55, 129, 212, 0.065) 1px, transparent 1px),
    linear-gradient(90deg, rgba(55, 129, 212, 0.065) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.3), black 44%, transparent 98%);
}

.cover-orb {
  position: absolute;
  z-index: 0;
  border-radius: 999px;
  filter: blur(18px);
  mix-blend-mode: screen;
}

.cover-orb--cyan {
  top: -18%;
  right: -10%;
  width: 62%;
  height: 74%;
  background: rgba(39, 220, 255, 0.56);
}

.cover-orb--blue {
  right: -18%;
  bottom: -16%;
  width: 68%;
  height: 58%;
  background: rgba(111, 116, 255, 0.26);
}

.cover-glass {
  position: absolute;
  right: -20%;
  bottom: -10%;
  z-index: 2;
  width: 82%;
  height: 82%;
  color: rgba(83, 139, 255, 0.42);
  transform: rotate(-8deg);
}

.cover-glass svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.cover-glass path:first-child {
  fill: rgba(255, 255, 255, 0.2);
  stroke: rgba(255, 255, 255, 0.55);
  stroke-width: 1.5;
}

.cover-glass path:not(:first-child) {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 4;
}

.cover-glass circle {
  fill: #fff;
  filter: drop-shadow(0 0 8px rgba(45, 174, 255, 0.9));
}

.cover-phones {
  position: absolute;
  top: 49%;
  right: 4%;
  z-index: 3;
  width: min(72%, 260px);
  height: 116%;
  transform: translateY(-50%) scale(0.88);
  transform-origin: 72% 50%;
}

.cover-phones::before {
  position: absolute;
  right: -10%;
  bottom: 12%;
  width: 86%;
  height: 42%;
  content: '';
  border-radius: 50%;
  background:
    radial-gradient(circle at 56% 42%, rgba(255, 255, 255, 0.62), transparent 20%),
    radial-gradient(circle at 54% 48%, rgba(76, 225, 255, 0.34), rgba(111, 116, 255, 0.3) 54%, transparent 74%);
  filter: blur(2px);
  opacity: 0.86;
  transform: rotate(-10deg);
}

.cover-phone {
  position: absolute;
  width: 92px;
  filter: drop-shadow(0 14px 15px rgba(21, 62, 126, 0.22));
  transform-style: preserve-3d;
}

.cover-phone--left {
  top: 10px;
  right: 106px;
  z-index: 2;
  transform: rotate(-20deg);
}

.cover-phone--right {
  top: 29px;
  right: 24px;
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

@media (max-width: 1120px) {
  .cover-phones {
    right: 2%;
    transform: translateY(-50%) scale(0.82);
  }
}

@media (max-width: 640px) {
  .cover-phones {
    right: 3%;
    width: 70%;
    transform: translateY(-50%) scale(0.84);
  }
}
</style>
