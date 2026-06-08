<template>
  <div class="lx-price-tag" :class="{ 'has-discount': discountLabel }" :style="priceStyle">
    <span class="lx-price-tag__current">
      <small>{{ currency }}</small>
      <strong>{{ displayPrice }}</strong>
      <em v-if="unit">/{{ unit }}</em>
    </span>
    <del v-if="oldPrice !== undefined && oldPrice !== ''">{{ currency }}{{ oldPrice }}</del>
    <span v-if="discountLabel" class="lx-price-tag__discount">{{ discountLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  price: string | number
  oldPrice?: string | number
  discountLabel?: string
  color?: string
  currency?: string
  unit?: string
}>(), {
  color: '',
  currency: '¥',
  unit: '',
  discountLabel: '',
})

const displayPrice = computed(() => props.price)
const priceStyle = computed(() => (props.color ? { '--lx-price-color': props.color } : undefined))
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.lx-price-tag {
  @include lx-font-base;

  --lx-price-color: #{$lx-color-primary};

  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 4px 6px;
  min-width: 0;
  color: var(--lx-price-color);
}

.lx-price-tag__current {
  display: inline-flex;
  align-items: baseline;
  min-width: 0;
  color: var(--lx-price-color);
  line-height: 1;

  small {
    font-size: 11px;
    font-weight: 800;
  }

  strong {
    margin-left: 2px;
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 0;
  }

  em {
    margin-left: 2px;
    color: $lx-color-text-muted;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
  }
}

del {
  color: $lx-color-text-light;
  font-size: 11px;
  line-height: 14px;
  text-decoration-thickness: 1px;
}

.lx-price-tag__discount {
  align-self: center;
  padding: 2px 6px;
  border: 1px solid rgba(244, 52, 27, 0.18);
  border-radius: $lx-radius-xs;
  background: $lx-color-primary-soft;
  color: $lx-color-primary;
  font-size: 10px;
  font-weight: 800;
  line-height: 14px;
}
</style>
