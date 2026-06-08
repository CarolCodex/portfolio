<template>
  <div class="before-after">
    <div class="mock before">
      <span>Before</span>
      <i />
      <i />
      <i />
    </div>
    <div class="mock after">
      <span>After</span>
      <i />
      <i />
      <i />
    </div>
  </div>
</template>

<style scoped>
.before-after {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.mock {
  min-height: 260px;
  padding: 22px;
  border: 1px solid rgba(24, 34, 47, 0.08);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(239, 244, 249, 0.88));
}

.mock span {
  display: inline-flex;
  margin-bottom: 42px;
  color: var(--color-muted);
  font-size: 13px;
  font-weight: 700;
}

.mock i {
  display: block;
  height: 14px;
  margin-bottom: 14px;
  border-radius: 999px;
  background: rgba(23, 32, 43, 0.12);
}

.mock i:nth-child(3) {
  width: 72%;
}

.mock i:nth-child(4) {
  width: 48%;
}

.after {
  background: linear-gradient(135deg, rgba(234, 246, 244, 0.92), rgba(242, 244, 255, 0.9));
}

.after i {
  background: linear-gradient(90deg, #17202b, #5b748f);
}

@media (max-width: 720px) {
  .before-after {
    grid-template-columns: 1fr;
  }
}
</style>
