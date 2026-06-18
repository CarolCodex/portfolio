<template>
  <button class="quantity-button" type="button" aria-label="加入购物车" @click="$emit('add', $event)">
    <img
      :src="cartAddIcon"
      alt=""
      aria-hidden="true"
    />
  </button>
</template>

<script setup lang="ts">
const cartAddIcon = '/case-assets/liangxuan-mini-program/demo-home-assets/icons/cart-add.svg'

defineEmits<{ add: [event: MouseEvent] }>()
</script>

<style scoped>
.quantity-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: transform 0.14s ease;
}

.quantity-button:active {
  transform: scale(0.9);
}

.quantity-button img {
  display: block;
  width: 28px;
  height: 28px;
}
</style>
