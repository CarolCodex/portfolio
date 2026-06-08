<template>
  <nav class="lx-tab" :class="[`lx-tab--${variant}`, { 'is-sticky': sticky }]" aria-label="标签切换">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      type="button"
      :class="{ active: tab.value === activeValue }"
      :disabled="tab.disabled"
      :aria-current="tab.value === activeValue ? 'true' : undefined"
      @click="selectTab(tab)"
    >
      <span>{{ tab.label }}</span>
      <em v-if="tab.badge">{{ tab.badge }}</em>
    </button>
  </nav>
</template>

<script lang="ts">
export type TabValue = string | number

export interface TabItem {
  label: string
  value: TabValue
  badge?: string | number
  disabled?: boolean
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  tabs: TabItem[]
  activeValue: TabValue
  variant?: 'underline' | 'pill'
  sticky?: boolean
}>(), {
  variant: 'underline',
  sticky: false,
})

const emit = defineEmits<{
  'update:activeValue': [value: TabValue]
  change: [value: TabValue, tab: TabItem]
}>()

function selectTab(tab: TabItem) {
  if (tab.disabled || tab.value === props.activeValue) return
  emit('update:activeValue', tab.value)
  emit('change', tab.value, tab)
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.lx-tab {
  @include lx-font-base;

  display: flex;
  align-items: center;
  min-width: 0;
  overflow-x: auto;
  background: $lx-color-surface;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &.is-sticky {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  button {
    @include lx-control-reset;
    @include lx-pressable;

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex: 1 0 auto;
    min-width: 72px;
    color: $lx-color-text-muted;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;

    &:disabled {
      cursor: not-allowed;
      color: $lx-color-disabled;
      transform: none;
    }

    em {
      min-width: 16px;
      padding: 0 5px;
      border-radius: $lx-radius-pill;
      background: $lx-color-primary-soft;
      color: $lx-color-primary;
      font-size: 10px;
      font-style: normal;
      font-weight: 800;
      line-height: 16px;
    }
  }
}

.lx-tab--underline {
  height: 52px;
  border-bottom: 1px solid $lx-color-border;

  button {
    height: 52px;
    padding: 0 $lx-space-4;

    &.active {
      color: $lx-color-primary;
      font-weight: 800;

      &::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 32px;
        height: 2px;
        border-radius: $lx-radius-pill;
        background: $lx-color-primary;
        content: '';
        transform: translateX(-50%);
      }
    }
  }
}

.lx-tab--pill {
  gap: $lx-space-2;
  padding: $lx-space-3;

  button {
    flex: 0 0 auto;
    min-width: 0;
    height: 30px;
    padding: 0 $lx-space-4;
    border-radius: $lx-radius-pill;
    background: $lx-color-border;
    font-size: 12px;

    &.active {
      background: $lx-color-primary;
      color: #fff;
      font-weight: 800;
    }
  }
}
</style>
