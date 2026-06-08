<template>
  <button
    class="lx-button"
    :class="[`lx-button--${type}`, `lx-button--${size}`, { 'is-disabled': disabled }]"
    type="button"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script lang="ts">
export type ButtonType = 'primary' | 'secondary'
export type ButtonSize = 'small' | 'medium'
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  text?: string
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
}>(), {
  text: '',
  type: 'primary',
  size: 'medium',
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (props.disabled) return
  props.onClick?.(event)
  emit('click', event)
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.lx-button {
  @include lx-font-base;
  @include lx-control-reset;
  @include lx-pressable;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-width: 0;
  border: 1px solid transparent;
  border-radius: $lx-radius-pill;
  font-weight: 700;
  letter-spacing: 0;
  white-space: nowrap;
  user-select: none;

  &--small {
    min-height: 28px;
    padding: 0 $lx-space-3;
    font-size: 12px;
    line-height: 16px;
  }

  &--medium {
    min-height: 36px;
    padding: 0 $lx-space-5;
    font-size: 14px;
    line-height: 20px;
  }

  &--primary {
    background: $lx-color-primary;
    color: #fff;
    box-shadow: 0 8px 18px rgba(244, 52, 27, 0.22);

    &:hover {
      background: $lx-color-primary-deep;
      box-shadow: 0 12px 24px rgba(244, 52, 27, 0.28);
    }
  }

  &--secondary {
    border-color: $lx-color-border-strong;
    background: $lx-color-primary-soft;
    color: $lx-color-primary;

    &:hover {
      border-color: rgba(244, 52, 27, 0.28);
      background: #ffe8e4;
    }
  }

  &.is-disabled,
  &:disabled {
    cursor: not-allowed;
    border-color: transparent;
    background: $lx-color-disabled;
    color: #fff;
    box-shadow: none;
    transform: none;
  }
}
</style>
