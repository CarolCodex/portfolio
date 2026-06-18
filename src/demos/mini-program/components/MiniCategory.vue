<template>
  <section class="mini-category-page">
    <header class="category-search">
      <label class="category-search-box">
        <img :src="categoryIcons.search" alt="" aria-hidden="true" decoding="async" />
        <input type="search" placeholder="搜你想要的商品..." readonly />
      </label>
    </header>

    <div class="category-top-strip">
      <div class="category-top-scroll">
        <button
          v-for="item in topCategories"
          :key="item.id"
          type="button"
          class="top-category"
          :class="{ selected: selectedTopCategory === item.id }"
          @click="selectTop(item.id)"
        >
          <span>
            <img :src="item.image" :alt="item.name" loading="lazy" decoding="async" />
          </span>
          <strong>{{ item.name }}</strong>
        </button>
      </div>
      <button class="category-all-button" type="button" @click="showCategoryDropdown = true">
        <span>全部</span>
        <img :src="categoryIcons.chevronDown" alt="" aria-hidden="true" decoding="async" />
      </button>
    </div>

    <div class="category-body">
      <aside class="category-sidebar" aria-label="侧边分类">
        <button
          v-for="item in sideCategoryItems"
          :key="item.id"
          type="button"
          :class="{ selected: selectedSideCategory === item.id }"
          @click="selectSide(item.id)"
        >
          <i v-if="selectedSideCategory === item.id" aria-hidden="true"></i>
          <strong>{{ item.name }}</strong>
        </button>
      </aside>

      <main class="category-content" aria-label="分类商品">
        <nav class="category-sort-bar" aria-label="分类排序">
          <button type="button" :class="{ active: selectedSort === 'city' }" @click="selectedSort = 'city'">
            全城配
          </button>
          <button type="button" :class="{ active: selectedSort === 'sales' }" @click="selectedSort = 'sales'">
            销量
          </button>
          <button type="button" :class="{ active: selectedSort === 'price' }" @click="selectedSort = 'price'">
            价格
          </button>
          <button
            class="sort-filter"
            type="button"
            :class="{ active: selectedSort === 'filter' }"
            @click="selectedSort = 'filter'"
          >
            筛选
            <img :src="categoryIcons.filterArrow" alt="" aria-hidden="true" decoding="async" />
          </button>
        </nav>

        <div class="category-product-list">
          <article
            v-for="product in categoryProducts"
            :key="product.id"
            class="category-product-card"
            role="button"
            tabindex="0"
            :aria-label="`查看商品详情：${product.name}`"
            @click="$emit('openProduct', {
              id: product.id,
              name: product.name,
              description: product.spec,
              price: product.price,
              image: product.image,
              tag: '鲜蔬',
            })"
            @keydown.enter.prevent="$emit('openProduct', {
              id: product.id,
              name: product.name,
              description: product.spec,
              price: product.price,
              image: product.image,
              tag: '鲜蔬',
            })"
            @keydown.space.prevent="$emit('openProduct', {
              id: product.id,
              name: product.name,
              description: product.spec,
              price: product.price,
              image: product.image,
              tag: '鲜蔬',
            })"
          >
            <img class="product-image" :src="product.image" :alt="product.name" loading="lazy" decoding="async" />
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>{{ product.spec }}</p>
              <div class="product-tags">
                <span>全城配</span>
              </div>
              <div class="product-bottom">
                <div class="product-price">
                  <em>天天平价</em>
                  <strong>¥{{ product.price }}</strong>
                  <small>/份</small>
                </div>
                <button class="category-plus" type="button" aria-label="加入购物车" @click.stop="handleAddToCart">
                  <img :src="categoryIcons.plus" alt="" aria-hidden="true" decoding="async" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>

    <div v-if="showCategoryDropdown" class="category-dropdown-layer">
      <section class="category-dropdown-panel">
        <div class="dropdown-title">
          <strong>全部分类</strong>
          <button type="button" @click="showCategoryDropdown = false">
            收起
            <img :src="categoryIcons.chevronUp" alt="" aria-hidden="true" decoding="async" />
          </button>
        </div>
        <div class="dropdown-grid">
          <button
            v-for="item in categoryNavItems"
            :key="item.id"
            type="button"
            :class="{ selected: selectedTopCategory === item.id }"
            @click="selectFromDropdown(item.id)"
          >
            <span>
              <img :src="item.image" :alt="item.name" loading="lazy" decoding="async" />
            </span>
            <strong>{{ item.name }}</strong>
          </button>
        </div>
      </section>
      <button class="category-scrim" type="button" aria-label="关闭全部分类" @click="showCategoryDropdown = false"></button>
    </div>

    <span
      v-for="dot in flyingDots"
      :key="dot.id"
      class="cart-fly-dot"
      :style="dot.style"
      aria-hidden="true"
    ></span>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { categoryIcons, categoryNavItems, categoryProducts, sideCategoryItems } from '../mock/category'
import type { DetailProduct } from '../mock/detail'

const emit = defineEmits<{ addToCart: []; openProduct: [product: DetailProduct] }>()

const topCategories = categoryNavItems.slice(0, 8)
const selectedTopCategory = ref('fruit')
const selectedSideCategory = ref('fruit')
const showCategoryDropdown = ref(false)
const selectedSort = ref<'city' | 'sales' | 'price' | 'filter'>('city')
const flyingDots = ref<Array<{ id: number; style: Record<string, string> }>>([])
let dotId = 0
const flyTimers: number[] = []
const flyDuration = 650

function selectTop(id: string) {
  selectedTopCategory.value = id
  selectedSideCategory.value = id
}

function selectSide(id: string) {
  selectedSideCategory.value = id
  selectedTopCategory.value = id
}

function selectFromDropdown(id: string) {
  selectTop(id)
  showCategoryDropdown.value = false
}

function centerOf(rect: DOMRect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  }
}

function addTimer(callback: () => void, delay: number) {
  const timer = window.setTimeout(() => {
    const index = flyTimers.indexOf(timer)

    if (index >= 0) {
      flyTimers.splice(index, 1)
    }

    callback()
  }, delay)

  flyTimers.push(timer)
}

function handleAddToCart(event: MouseEvent) {
  const sourceElement = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
  const cartTarget = document.querySelector('.mini-home-cart-target')

  if (!sourceElement || !(cartTarget instanceof HTMLElement)) {
    emit('addToCart')
    return
  }

  const source = centerOf(sourceElement.getBoundingClientRect())
  const target = centerOf(cartTarget.getBoundingClientRect())
  const id = dotId++
  const midX = (target.x - source.x) * 0.42
  const midY = Math.min(-92, (target.y - source.y) * 0.34 - 78)

  flyingDots.value.push({
    id,
    style: {
      left: `${source.x}px`,
      top: `${source.y}px`,
      '--fly-x': `${target.x - source.x}px`,
      '--fly-y': `${target.y - source.y}px`,
      '--fly-mid-x': `${midX}px`,
      '--fly-mid-y': `${midY}px`,
      '--fly-duration': `${flyDuration}ms`,
    },
  })

  addTimer(() => {
    emit('addToCart')
  }, flyDuration)

  addTimer(() => {
    flyingDots.value = flyingDots.value.filter((dot) => dot.id !== id)
  }, flyDuration + 120)
}

onBeforeUnmount(() => {
  flyTimers.forEach((timer) => window.clearTimeout(timer))
  flyTimers.length = 0
})
</script>

<style scoped>
.mini-category-page {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #fff;
  color: #101828;
}

.cart-fly-dot {
  position: fixed;
  z-index: 9999;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 999px;
  background: #f4341b;
  box-shadow: 0 4px 10px rgba(244, 52, 27, 0.35);
  pointer-events: none;
  animation: cart-fly var(--fly-duration) cubic-bezier(0.22, 0.72, 0.28, 1) forwards;
}

@keyframes cart-fly {
  0% {
    opacity: 0.95;
    transform: translate3d(0, 0, 0) scale(1);
  }

  55% {
    opacity: 0.9;
    transform: translate3d(var(--fly-mid-x), var(--fly-mid-y), 0) scale(0.82);
  }

  100% {
    opacity: 0.2;
    transform: translate3d(var(--fly-x), var(--fly-y), 0) scale(0.45);
  }
}

.category-search {
  flex: 0 0 auto;
  height: 72px;
  padding: 37px 16px 10px;
  background: #fff;
}

.category-search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 32px;
  border-radius: 999px;
  background: #f3f4f6;
  padding: 0 14px;
}

.category-search-box img {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.category-search-box input {
  flex: 1 1 auto;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #99a1af;
  font-size: 12px;
}

.category-search-box input::placeholder {
  color: #99a1af;
  opacity: 1;
}

.category-top-strip {
  position: relative;
  flex: 0 0 auto;
  height: 84px;
  border-top: 0.591px solid #f3f4f6;
  border-bottom: 0.591px solid #f3f4f6;
  background: #fff;
}

.category-top-scroll {
  display: flex;
  gap: 0;
  width: calc(100% - 52px);
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.category-top-scroll::-webkit-scrollbar {
  display: none;
}

.top-category {
  flex: 0 0 73.9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.992px;
  height: 66.471px;
  margin-top: 9px;
  border: 0;
  background: transparent;
  color: #1e2939;
  padding: 0;
}

.top-category span,
.dropdown-grid span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 43.991px;
  height: 43.991px;
  overflow: hidden;
  border: 1.182px solid transparent;
  border-radius: 999px;
  background: #f9fafb;
  padding: 2.677px;
}

.top-category.selected span,
.dropdown-grid button.selected span {
  border-color: #f4341b;
}

.top-category img,
.dropdown-grid img {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  object-fit: cover;
}

.top-category strong,
.dropdown-grid strong {
  max-width: 50px;
  overflow: hidden;
  color: currentColor;
  font-size: 11px;
  font-weight: 400;
  line-height: 16.5px;
  letter-spacing: 0.0645px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.top-category.selected,
.dropdown-grid button.selected {
  color: #f4341b;
}

.category-all-button {
  position: absolute;
  top: 3px;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 52px;
  height: 84px;
  border: 0;
  border-left: 0.591px solid #f9fafb;
  background: #fff;
  box-shadow: -6px 0 4px rgba(255, 255, 255, 0.9);
  color: #6a7282;
  font-size: 10px;
  line-height: 15px;
}

.category-all-button img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.category-all-button span {
  line-height: 15px;
}

.category-sort-bar {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  height: 39.993px;
  border-bottom: 0.591px solid #f3f4f6;
  background: #fff;
  padding: 0 12px;
}

.category-sort-bar button {
  min-width: 0;
  height: 39.993px;
  border: 0;
  background: transparent;
  color: #6a7282;
  font-size: 12px;
  line-height: 18px;
  padding: 0;
}

.category-sort-bar button.active {
  color: #f4341b;
}

.sort-filter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.sort-filter img {
  width: 11.993px;
  height: 11.993px;
}

.category-body {
  flex: 1 1 auto;
  display: flex;
  min-height: 0;
  overflow: hidden;
}

.category-sidebar {
  flex: 0 0 85px;
  height: 100%;
  overflow-y: auto;
  background: #f9fafb;
  scrollbar-width: none;
}

.category-sidebar::-webkit-scrollbar {
  display: none;
}

.category-sidebar button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 100%;
  height: 49.992px;
  border: 0;
  background: transparent;
  color: #101828;
  padding: 0 7px;
}

.category-sidebar button.selected {
  background: #fff;
  color: #f4341b;
}

.category-sidebar button i {
  position: absolute;
  left: 0;
  top: 14.99px;
  width: 2.991px;
  height: 20.006px;
  border-radius: 0 4px 4px 0;
  background: #f4341b;
}

.category-sidebar strong {
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
  letter-spacing: -0.0762px;
  white-space: nowrap;
}

.category-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  background: #fff;
}

.category-product-list {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  background: #fff;
  padding: 7.995px 11.992px 14px;
  scrollbar-width: none;
}

.category-product-list::-webkit-scrollbar {
  display: none;
}

.category-product-card {
  display: flex;
  gap: 15.999px;
  min-width: 0;
  height: 145.867px;
  padding: 19.997px 0 20.591px;
  border-bottom: 0.591px solid #f3f4f6;
}

.product-image {
  flex: 0 0 auto;
  width: 95.995px;
  height: 95.995px;
  border-radius: 10px;
  background: #f3f4f6;
  object-fit: cover;
}

.product-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  padding: 1.994px 0;
}

.product-info h3 {
  overflow: hidden;
  margin: 0;
  color: #101828;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.25px;
  letter-spacing: -0.1504px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-info p {
  margin: 4px 0 5px;
  color: #99a1af;
  font-size: 12px;
  line-height: 16px;
}

.product-tags span {
  display: inline-flex;
  align-items: center;
  height: 16.987px;
  padding: 0 5.99px;
  border: 0.591px solid #d1d5dc;
  border-radius: 4px;
  color: #6a7282;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.1172px;
}

.product-bottom {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 8px;
}

.product-price {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  white-space: nowrap;
}

.product-price em {
  display: inline-flex;
  align-items: center;
  height: 17.037px;
  margin-right: 5.992px;
  padding: 0 5.99px;
  border-radius: 4px;
  background: #fff0ee;
  color: #f4341b;
  font-size: 10px;
  font-style: normal;
  line-height: 15px;
  letter-spacing: 0.1172px;
}

.product-price strong {
  color: #f4341b;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.3125px;
}

.product-price small {
  color: #99a1af;
  font-size: 12px;
  line-height: 16px;
}

.category-plus {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 23.994px;
  height: 23.994px;
  border: 0;
  border-radius: 999px;
  background: #f4341b;
  padding: 3px;
  transition: transform 0.14s ease, filter 0.14s ease;
}

.category-plus img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.category-plus:active {
  filter: brightness(0.95);
  transform: scale(0.9);
}

.category-dropdown-layer {
  position: absolute;
  inset: 72px 0 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.category-dropdown-panel {
  position: relative;
  z-index: 2;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
  background: #fff;
  padding: 18px 16px 20px;
  pointer-events: auto;
}

.dropdown-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  margin-bottom: 18px;
}

.dropdown-title strong {
  color: #101828;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.dropdown-title button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: #f9fafb;
  color: #6a7282;
  font-size: 11px;
  padding: 0 10px;
}

.dropdown-title img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.dropdown-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  row-gap: 24px;
}

.dropdown-grid button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.992px;
  border: 0;
  background: transparent;
  color: #1e2939;
  padding: 0;
}

.dropdown-grid span {
  width: 47.998px;
  height: 47.998px;
}

.category-scrim {
  position: relative;
  z-index: 1;
  flex: 1 1 auto;
  border: 0;
  background: rgba(0, 0, 0, 0.42);
  pointer-events: auto;
}
</style>
