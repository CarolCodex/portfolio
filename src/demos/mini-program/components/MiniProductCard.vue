<template>
  <article class="product-card">
    <div class="product-image" :style="{ height: `${product.imageHeight ?? 150}px` }">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="price-row">
        <span>¥<b>{{ product.price }}</b></span>
        <QuantityButton @add="$emit('add')" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import QuantityButton from './QuantityButton.vue'
import type { MiniProduct } from '../mock/home'

defineProps<{ product: MiniProduct }>()
defineEmits<{ add: [] }>()
</script>

<style scoped>
.product-card {
  min-width: 0;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.product-image {
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #f9fafb;
}

.product-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: grid;
  grid-template-rows: minmax(18px, auto) 16px 28px;
  gap: 6px;
  padding: 10px;
}

h3 {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: #101828;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

p {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: #6a7282;
  font-size: 11px;
  line-height: 16.5px;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 28px;
}

.price-row span {
  color: #f4341b;
  font-size: 10px;
  line-height: 15px;
}

.price-row b {
  margin-left: 3px;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  font-size: 16px;
  font-weight: 900;
  line-height: 16px;
}
</style>
