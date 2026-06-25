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
    <span class="cover-gradient" data-node-id="179:244"></span>
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

.cover-gradient {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  height: 54%;
  border-radius: 0 0 8px 8px;
  background: linear-gradient(180deg, rgba(21, 116, 250, 0) 0%, #1472f9 100%);
}
</style>
