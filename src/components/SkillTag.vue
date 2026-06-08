<template>
  <span class="skill-tag"><slot /></span>
</template>

<style scoped>
.skill-tag {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 7px 12px;
  border: 1px solid rgba(28, 42, 58, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-ink);
  font-size: 13px;
  line-height: 1.2;
  box-shadow: 0 10px 26px rgba(34, 45, 57, 0.04);
}
</style>
