<template>
  <article class="lx-cart-item" :class="{ 'is-selected': isSelected, 'is-disabled': disabled }">
    <button
      class="lx-cart-item__check"
      type="button"
      :aria-pressed="isSelected"
      :disabled="disabled"
      @click="toggleSelected"
    >
      <span aria-hidden="true"></span>
    </button>

    <img v-if="image" class="lx-cart-item__image" :src="image" :alt="name" loading="lazy" decoding="async" />

    <div class="lx-cart-item__content">
      <header>
        <h3>{{ name }}</h3>
        <span v-if="tagLabel">{{ tagLabel }}</span>
      </header>

      <div class="lx-cart-item__footer">
        <div class="lx-cart-item__price">
          <small>¥</small>
          <strong>{{ totalPrice }}</strong>
          <em v-if="unit">/{{ unit }}</em>
        </div>

        <div class="lx-cart-item__stepper" aria-label="修改商品数量">
          <button
            type="button"
            aria-label="减少数量"
            :disabled="disabled || quantity <= min"
            @click="decrement"
          >
            -
          </button>
          <span>{{ quantity }}</span>
          <button
            type="button"
            aria-label="增加数量"
            :disabled="disabled || quantity >= max"
            @click="increment"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  quantity: number
  price: number
  unit?: string
  image?: string
  tagLabel?: string
  isSelected?: boolean
  disabled?: boolean
  min?: number
  max?: number
  onIncrement?: (nextQuantity: number) => void
  onDecrement?: (nextQuantity: number) => void
}>(), {
  unit: '',
  image: '',
  tagLabel: '',
  isSelected: true,
  disabled: false,
  min: 1,
  max: 99,
})

const emit = defineEmits<{
  increment: [nextQuantity: number]
  decrement: [nextQuantity: number]
  select: [isSelected: boolean]
  'update:isSelected': [isSelected: boolean]
  'update:quantity': [nextQuantity: number]
}>()

const totalPrice = computed(() => (props.price * props.quantity).toFixed(2))

function increment() {
  if (props.disabled || props.quantity >= props.max) return
  const nextQuantity = props.quantity + 1
  props.onIncrement?.(nextQuantity)
  emit('update:quantity', nextQuantity)
  emit('increment', nextQuantity)
}

function decrement() {
  if (props.disabled || props.quantity <= props.min) return
  const nextQuantity = props.quantity - 1
  props.onDecrement?.(nextQuantity)
  emit('update:quantity', nextQuantity)
  emit('decrement', nextQuantity)
}

function toggleSelected() {
  if (props.disabled) return
  const nextSelected = !props.isSelected
  emit('update:isSelected', nextSelected)
  emit('select', nextSelected)
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.lx-cart-item {
  @include lx-font-base;

  display: grid;
  grid-template-columns: 24px 72px minmax(0, 1fr);
  gap: $lx-space-3;
  align-items: center;
  min-width: 0;
  padding: $lx-space-3;
  border-radius: $lx-radius-lg;
  background: $lx-color-surface;
  box-shadow: $lx-shadow-card;

  &.is-disabled {
    opacity: 0.58;
  }
}

.lx-cart-item__check {
  @include lx-control-reset;
  @include lx-pressable;

  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  span {
    display: block;
    width: 18px;
    height: 18px;
    border: 1.5px solid $lx-color-disabled;
    border-radius: 50%;
    background: #fff;
  }

  &[aria-pressed='true'] span {
    border-color: $lx-color-primary;
    background:
      radial-gradient(circle at center, #fff 0 3px, transparent 3.5px),
      $lx-color-primary;
  }
}

.lx-cart-item__image {
  display: block;
  width: 72px;
  height: 72px;
  border-radius: $lx-radius-md;
  background: #f9fafb;
  object-fit: cover;
}

.lx-cart-item__content {
  display: grid;
  gap: $lx-space-3;
  min-width: 0;
}

header {
  display: grid;
  gap: 5px;
  min-width: 0;

  h3 {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    color: $lx-color-text;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    justify-self: start;
    padding: 2px 6px;
    border-radius: $lx-radius-xs;
    background: $lx-color-primary-soft;
    color: $lx-color-primary;
    font-size: 10px;
    font-weight: 800;
    line-height: 14px;
  }
}

.lx-cart-item__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: $lx-space-2;
}

.lx-cart-item__price {
  display: inline-flex;
  align-items: baseline;
  color: $lx-color-primary;
  line-height: 1;

  small {
    font-size: 11px;
    font-weight: 800;
  }

  strong {
    margin-left: 2px;
    font-size: 18px;
    font-weight: 900;
  }

  em {
    margin-left: 2px;
    color: $lx-color-text-muted;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
  }
}

.lx-cart-item__stepper {
  display: grid;
  grid-template-columns: 26px 28px 26px;
  align-items: center;
  height: 26px;
  overflow: hidden;
  border: 1px solid $lx-color-border;
  border-radius: $lx-radius-pill;
  background: #fff;

  button {
    @include lx-control-reset;
    @include lx-pressable;

    display: grid;
    place-items: center;
    height: 26px;
    color: $lx-color-primary;
    font-size: 17px;
    line-height: 1;

    &:disabled {
      cursor: not-allowed;
      color: $lx-color-disabled;
      transform: none;
    }
  }

  span {
    color: $lx-color-text;
    font-size: 12px;
    font-weight: 800;
    text-align: center;
  }
}

@media (max-width: 360px) {
  .lx-cart-item {
    grid-template-columns: 24px 60px minmax(0, 1fr);
  }

  .lx-cart-item__image {
    width: 60px;
    height: 60px;
  }
}
</style>
