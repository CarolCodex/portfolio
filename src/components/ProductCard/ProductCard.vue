<template>
  <article
    class="lx-product-card"
    :class="[`is-${status}`, { 'is-disabled': disabled }]"
    @click="emitCardClick"
  >
    <div class="lx-product-card__image">
      <img :src="image" :alt="imageAlt || title" />
      <span v-if="status === 'top1'" class="lx-product-card__rank">TOP 1</span>
      <span v-else-if="status === 'hot'" class="lx-product-card__hot">热卖</span>
      <span v-if="tagLabel" class="lx-product-card__tag">{{ tagLabel }}</span>
    </div>

    <div class="lx-product-card__body">
      <div class="lx-product-card__copy">
        <h3>{{ title }}</h3>
        <p v-if="subtitle">{{ subtitle }}</p>
      </div>

      <div class="lx-product-card__footer">
        <PriceTag
          :price="price"
          :old-price="oldPrice"
          :discount-label="discountLabel"
          :unit="unit"
        />
        <button
          class="lx-product-card__add"
          type="button"
          :disabled="disabled"
          :aria-label="`${actionText}：${title}`"
          @click.stop="handleAdd"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
export type ProductCardStatus = 'top1' | 'hot' | 'normal'
</script>

<script setup lang="ts">
import PriceTag from '../PriceTag/PriceTag.vue'

const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  image: string
  imageAlt?: string
  price: string | number
  oldPrice?: string | number
  discountLabel?: string
  tagLabel?: string
  status?: ProductCardStatus
  unit?: string
  actionText?: string
  disabled?: boolean
  addToCart?: () => void
}>(), {
  subtitle: '',
  imageAlt: '',
  status: 'normal',
  unit: '',
  actionText: '加入购物车',
  disabled: false,
})

const emit = defineEmits<{
  addToCart: []
  click: []
}>()

function handleAdd() {
  if (props.disabled) return
  props.addToCart?.()
  emit('addToCart')
}

function emitCardClick() {
  if (props.disabled) return
  emit('click')
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.lx-product-card {
  @include lx-font-base;
  @include lx-pressable;

  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  min-width: 0;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: $lx-radius-lg;
  background: $lx-color-surface;
  box-shadow: $lx-shadow-card;

  &:hover {
    border-color: $lx-color-border-strong;
    box-shadow: $lx-shadow-card-hover;
    transform: translateY(-2px);
  }

  &.is-hot {
    background: $lx-color-surface-warm;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.58;
    transform: none;
  }
}

.lx-product-card__image {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1 / 0.82;
  overflow: hidden;
  background: #f9fafb;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.lx-product-card__rank,
.lx-product-card__hot,
.lx-product-card__tag {
  position: absolute;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  border-radius: $lx-radius-pill;
  font-size: 10px;
  font-weight: 900;
  line-height: 14px;
}

.lx-product-card__rank,
.lx-product-card__hot {
  top: 8px;
  left: 8px;
  padding: 2px 7px;
  color: #fff;
  box-shadow: 0 6px 14px rgba(16, 24, 40, 0.14);
}

.lx-product-card__rank {
  background: linear-gradient(135deg, #ffb020, $lx-color-primary);
}

.lx-product-card__hot {
  background: $lx-color-primary;
}

.lx-product-card__tag {
  right: 8px;
  bottom: 8px;
  max-width: calc(100% - 16px);
  padding: 2px 8px;
  overflow: hidden;
  background: rgba(16, 24, 40, 0.72);
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lx-product-card__body {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: $lx-space-3;
  min-width: 0;
  padding: $lx-space-3;
}

.lx-product-card__copy {
  display: grid;
  gap: 4px;
  min-width: 0;

  h3,
  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    letter-spacing: 0;
  }

  h3 {
    color: $lx-color-text;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    overflow-wrap: anywhere;
  }

  p {
    color: $lx-color-text-muted;
    font-size: 12px;
    line-height: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.lx-product-card__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: $lx-space-2;
  min-width: 0;
}

.lx-product-card__add {
  @include lx-control-reset;
  @include lx-pressable;

  display: inline-grid;
  place-items: center;
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: $lx-color-primary;
  color: #fff;
  box-shadow: 0 8px 16px rgba(244, 52, 27, 0.24);

  span {
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
    transform: translateY(-1px);
  }

  &:hover {
    background: $lx-color-primary-deep;
  }

  &:disabled {
    cursor: not-allowed;
    background: $lx-color-disabled;
    box-shadow: none;
  }
}
</style>
