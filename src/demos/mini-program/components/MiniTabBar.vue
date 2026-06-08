<template>
  <nav class="mini-tabbar" aria-label="小程序底部导航">
    <button
      v-for="tab in miniTabs"
      :key="tab.key"
      type="button"
      :class="{ active: activeTab === tab.key }"
      @click="$emit('change', tab.key)"
    >
      <span class="tab-icon-wrap">
        <i class="tab-icon" :style="{ '--tab-icon': `url(${tab.icon})` }" aria-hidden="true"></i>
        <span v-if="tab.key === 'cart' && cartCount" class="cart-badge">{{ cartCount }}</span>
      </span>
      <span class="tab-label">{{ tab.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { miniTabs, type MiniTabKey } from '../mock/home'

defineProps<{ activeTab: MiniTabKey; cartCount: number }>()
defineEmits<{ change: [tab: MiniTabKey] }>()
</script>

<style scoped>
.mini-tabbar {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  height: 56.584px;
  border-top: 0.591px solid #e5e7eb;
  background: #fff;
}

button {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.994px;
  min-width: 0;
  height: 55.993px;
  padding: 9.001px 0;
  border: 0;
  background: transparent;
  color: #6a7282;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
}

button.active {
  color: #f4341b;
}

.tab-icon-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 19.997px;
  height: 19.997px;
}

.tab-icon {
  display: inline-block;
  flex: 0 0 auto;
  width: 19.997px;
  height: 19.997px;
  background: currentColor;
  mask: var(--tab-icon) center / contain no-repeat;
  -webkit-mask: var(--tab-icon) center / contain no-repeat;
}

.tab-label {
  display: block;
  height: 15.999px;
  color: currentColor;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;
}

.cart-badge {
  position: absolute;
  top: -7px;
  right: -10px;
  z-index: 1;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
}
</style>
