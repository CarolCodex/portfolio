<template>
  <header class="mobile-header">
    <button class="icon-button menu-button" type="button" :aria-label="leadingLabel" @click="$emit('leading')">
      <slot name="leading" />
    </button>

    <strong class="mobile-header-title">{{ title }}</strong>

    <button
      v-if="showTrailing"
      class="icon-button notify-button"
      type="button"
      :aria-label="trailingLabel"
      @click="$emit('trailing')"
    >
      <slot name="trailing" />
    </button>
    <span v-else class="header-placeholder" aria-hidden="true" />
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    leadingLabel: string
    trailingLabel?: string
    showTrailing?: boolean
  }>(),
  {
    trailingLabel: '',
    showTrailing: true,
  },
)

defineEmits<{
  leading: []
  trailing: []
}>()
</script>

<style scoped>
.mobile-header {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 40px;
  align-items: center;
  gap: 10px;
  height: 100%;
  padding: 48px 16px 16px;
  background: var(--mobile-header-bg);
  backdrop-filter: var(--mobile-header-backdrop);
}

.mobile-header-title {
  min-width: 0;
  color: var(--mobile-header-title-color);
  font-size: var(--mobile-header-title-size);
  font-weight: var(--mobile-header-title-weight);
  line-height: var(--mobile-header-title-line-height);
  text-align: center;
  white-space: nowrap;
}

.icon-button {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #1f2937;
  cursor: pointer;
}

.icon-button:first-child {
  justify-self: start;
}

.menu-button {
  align-content: center;
  gap: 3px;
}

.menu-button :slotted(span) {
  width: 17px;
  height: 2px;
  border-radius: 999px;
  background: #1f2937;
}

.menu-button :slotted(img) {
  display: block;
  width: var(--mobile-header-leading-width, 20px);
  height: var(--mobile-header-leading-height, 20px);
  object-fit: contain;
}

.menu-button :slotted(.header-back-icon) {
  width: 20px;
  height: 20px;
}

.menu-button :slotted(.tasks-menu-icon) {
  width: 17.5px;
  height: 15px;
}

.notify-button {
  position: relative;
  justify-self: end;
}

.notify-button :slotted(img) {
  display: block;
  width: var(--mobile-header-action-width);
  height: var(--mobile-header-action-height);
}

.header-placeholder {
  justify-self: end;
  width: 32px;
  height: 32px;
}
</style>
