<template>
  <div class="mini-app">
    <div class="mini-app-content">
      <MiniHome
        v-if="currentMiniPage === 'home'"
        @add-to-cart="incrementCart"
        @open-product="openProductDetail"
        @select-category="handleCategorySelect"
        @open-activity="openActivity"
      />
      <MiniCategory
        v-else-if="currentMiniPage === 'category'"
        @add-to-cart="incrementCart"
        @open-product="openProductDetail"
      />
      <MiniActivity
        v-else-if="currentMiniPage === 'activity'"
        :key="activeActivityType"
        :initial-type="activeActivityType"
        :cart-count="cartCount"
        @add-to-cart="incrementCart"
        @open-product="openProductDetail"
        @back="backToHome"
      />
      <CartPage
        v-else-if="currentMiniPage === 'cart'"
        :cart-items="cartItems"
        @increment="incrementCartItem"
        @decrement="decrementCartItem"
        @clear="clearCart"
        @add-recommend="addRecommendToCart"
        @go-shopping="setTab('home')"
        @open-product="openProductDetail"
        @checkout="openCheckout"
      />
      <MiniCheckout
        v-else-if="currentMiniPage === 'checkout'"
        :cart-items="cartItems"
        @back="setTab('cart')"
      />
      <MiniProductDetail
        v-else-if="currentMiniPage === 'detail'"
        :product="selectedProduct"
        :cart-count="cartCount"
        @back="backToPreviousPage"
        @add-to-cart="incrementCart"
        @go-home="setTab('home')"
        @go-cart="setTab('cart')"
      />
      <MiniMine
        v-else-if="currentMiniPage === 'mine'"
        @add-to-cart="incrementCart"
        @open-product="openProductDetail"
        @open-saving-card="openSavingCard"
      />
      <MiniSavingCardPage
        v-else-if="currentMiniPage === 'savingCard'"
        @back="setTab('mine')"
      />
      <section v-else class="placeholder-page">
        <span>{{ currentLabel }}</span>
        <strong>{{ currentLabel }}页面</strong>
        <p>第一阶段先保留占位，后续继续补充完整交互。</p>
      </section>
    </div>

    <MiniTabBar
      v-if="currentMiniPage !== 'activity' && currentMiniPage !== 'detail' && currentMiniPage !== 'checkout' && currentMiniPage !== 'savingCard'"
      :active-tab="activeTab"
      :cart-count="cartCount"
      @change="setTab"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CartPage from './CartPage.vue'
import MiniActivity from './MiniActivity.vue'
import MiniCategory from './MiniCategory.vue'
import MiniCheckout from './MiniCheckout.vue'
import MiniHome from './MiniHome.vue'
import MiniMine from './MiniMine.vue'
import MiniProductDetail from './MiniProductDetail.vue'
import MiniSavingCardPage from './MiniSavingCardPage.vue'
import MiniTabBar from './MiniTabBar.vue'
import type { ActivityType } from '../mock/activity'
import { initialCartItems, type CartItem, type CartRecommendItem } from '../mock/cart'
import type { DetailProduct } from '../mock/detail'
import { miniTabs, type MiniTabKey } from '../mock/home'

const activeTab = ref<MiniTabKey>('home')
const currentMiniPage = ref<MiniTabKey | 'activity' | 'detail' | 'checkout' | 'savingCard'>('home')
const previousMiniPage = ref<MiniTabKey | 'activity' | 'checkout' | 'savingCard'>('home')
const activeActivityType = ref<ActivityType>('hot')
const selectedProduct = ref<DetailProduct | null>(null)
const cartItems = ref<CartItem[]>(initialCartItems.map((item) => ({ ...item })))

const currentLabel = computed(() => miniTabs.find((tab) => tab.key === currentMiniPage.value)?.label ?? '首页')
const cartCount = computed(() => cartItems.value.length)

function setTab(tab: MiniTabKey) {
  activeTab.value = tab
  currentMiniPage.value = tab
}

function incrementCart() {
  const firstItem = cartItems.value[0]

  if (firstItem) {
    incrementCartItem(firstItem.id)
    return
  }

  cartItems.value = [{ ...initialCartItems[0] }]
}

function incrementCartItem(id: number) {
  cartItems.value = cartItems.value.map((item) => (
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  ))
}

function decrementCartItem(id: number) {
  cartItems.value = cartItems.value
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    .filter((item) => item.quantity > 0)
}

function clearCart() {
  cartItems.value = []
}

function addRecommendToCart(recommend: CartRecommendItem) {
  const existingItem = cartItems.value.find((item) => item.id === recommend.cartItem.id)

  if (existingItem) {
    incrementCartItem(existingItem.id)
    return
  }

  cartItems.value = [
    ...cartItems.value,
    {
      ...recommend.cartItem,
      quantity: 1,
    },
  ]
}

function handleCategorySelect() {
  setTab('category')
}

function openActivity(type: ActivityType) {
  activeActivityType.value = type
  currentMiniPage.value = 'activity'
}

function setActivityDemo(type: ActivityType = 'hot') {
  openActivity(type)
}

function backToHome() {
  setTab('home')
}

function openCheckout() {
  currentMiniPage.value = 'checkout'
}

function openSavingCard() {
  currentMiniPage.value = 'savingCard'
}

function openProductDetail(product: DetailProduct) {
  if (currentMiniPage.value !== 'detail') {
    previousMiniPage.value = currentMiniPage.value
  }

  selectedProduct.value = product
  currentMiniPage.value = 'detail'
}

function backToPreviousPage() {
  currentMiniPage.value = previousMiniPage.value

  if (previousMiniPage.value !== 'activity' && previousMiniPage.value !== 'checkout' && previousMiniPage.value !== 'savingCard') {
    activeTab.value = previousMiniPage.value
  }
}

defineExpose({ setTab, setActivityDemo })
</script>

<style scoped>
.mini-app {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #f9fafb;
  font-family:
    "PingFang SC", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

.mini-app-content {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.placeholder-page {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  height: 100%;
  padding: 24px;
  background: #f9fafb;
  text-align: center;
}

.placeholder-page span {
  color: #f4341b;
  font-size: 13px;
  font-weight: 800;
}

.placeholder-page strong {
  color: #101828;
  font-size: 20px;
}

.placeholder-page p {
  margin: 0;
  color: #6a7282;
  font-size: 13px;
  line-height: 1.7;
}
</style>
