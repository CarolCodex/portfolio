<template>
  <main class="lx-demo">
    <section class="lx-demo__phone">
      <header class="lx-demo__header">
        <div>
          <small>靓轩优选</small>
          <h1>今日鲜货</h1>
        </div>
        <Button text="领券" size="small" type="secondary" @click="showCouponModal = true" />
      </header>

      <Tab
        v-model:active-value="activeTab"
        :tabs="tabs"
        variant="underline"
        @change="showToast(`已切换到 ${activeTab}`)"
      />

      <section class="lx-demo__banner">
        <Carousel
          :items="bannerProducts"
          :interval="3600"
          :show-arrows="false"
          @add-to-cart="handleAdd"
        >
          <template #default="{ item }">
            <ProductCard
              :title="item.title"
              :subtitle="item.subtitle"
              :image="item.image"
              :price="item.price"
              :old-price="item.oldPrice"
              :tag-label="item.tagLabel"
              :status="item.status"
              :discount-label="item.discountLabel"
              unit="份"
              @add-to-cart="handleAdd(item)"
            />
          </template>
        </Carousel>
      </section>

      <section class="lx-demo__grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :title="product.title"
          :subtitle="product.subtitle"
          :image="product.image"
          :price="product.price"
          :old-price="product.oldPrice"
          :tag-label="product.tagLabel"
          :status="product.status"
          :discount-label="product.discountLabel"
          unit="份"
          @add-to-cart="handleAdd(product)"
        />
      </section>

      <section class="lx-demo__cart">
        <h2>购物车</h2>
        <CartItem
          v-for="item in cartItems"
          :key="item.id"
          v-model:quantity="item.quantity"
          v-model:is-selected="item.isSelected"
          :name="item.name"
          :price="item.price"
          :unit="item.unit"
          :image="item.image"
          :tag-label="item.tagLabel"
          @increment="showToast('数量已增加')"
          @decrement="showToast('数量已减少')"
        />
      </section>

      <footer class="lx-demo__settle">
        <PriceTag :price="selectedTotal" discount-label="满 99 免配送费" />
        <Button text="去结算" type="primary" size="medium" :disabled="!cartItems.length" @click="showCheckoutModal = true" />
      </footer>
    </section>

    <Modal
      v-model="showCouponModal"
      title="新人专享券"
      content="已为你准备满 99 减 10 优惠券，下单时自动抵扣。"
      confirm-text="收下"
      :show-cancel="false"
      status="success"
    />

    <Modal
      v-model="showCheckoutModal"
      title="确认提交订单"
      :content="`本次结算金额 ¥${selectedTotal}，共 ${selectedCount} 件商品。`"
      confirm-text="确认"
      cancel-text="再看看"
      status="warning"
      @confirm="showToast('订单已提交')"
    />

    <p v-if="toastText" class="lx-demo__toast">{{ toastText }}</p>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from './Button/Button.vue'
import CartItem from './CartItem/CartItem.vue'
import Carousel, { type CarouselItem } from './Carousel/Carousel.vue'
import Modal from './Modal/Modal.vue'
import PriceTag from './PriceTag/PriceTag.vue'
import ProductCard from './ProductCard/ProductCard.vue'
import Tab, { type TabItem, type TabValue } from './Tab/Tab.vue'

interface DemoProduct extends CarouselItem {
  id: number
  category: string
}

interface DemoCartItem {
  id: number
  name: string
  quantity: number
  price: number
  unit: string
  image: string
  tagLabel: string
  isSelected: boolean
}

const activeTab = ref<TabValue>('fresh')
const showCouponModal = ref(false)
const showCheckoutModal = ref(false)
const toastText = ref('')
let toastTimer: number | undefined

const tabs: TabItem[] = [
  { label: '新鲜到家', value: 'fresh' },
  { label: '热卖榜', value: 'hot', badge: 3 },
  { label: '预售', value: 'presale' },
  { label: '乳品', value: 'milk' },
]

const products = ref<DemoProduct[]>([
  {
    id: 1,
    category: 'fresh',
    title: '智利车厘子礼盒',
    subtitle: '大果径 果肉紧实',
    image: '/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-cherry.png',
    price: 89,
    oldPrice: 109,
    discountLabel: '限时省20',
    tagLabel: '次日达',
    status: 'top1',
  },
  {
    id: 2,
    category: 'hot',
    title: '鲜活基围虾',
    subtitle: '冷链配送 鲜甜弹牙',
    image: '/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-shrimp.png',
    price: 39.9,
    oldPrice: 49.9,
    discountLabel: '热卖',
    tagLabel: '京东冷链',
    status: 'hot',
  },
  {
    id: 3,
    category: 'presale',
    title: '猫山王榴莲',
    subtitle: '产地直采 预售锁鲜',
    image: '/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-durian.png',
    price: 128,
    oldPrice: 159,
    discountLabel: '预售抢鲜',
    tagLabel: '定金膨胀',
    status: 'normal',
  },
  {
    id: 4,
    category: 'milk',
    title: '低温鲜牛乳',
    subtitle: '每日新鲜配送',
    image: '/case-assets/liangxuan-mini-program/demo-home-assets/products/product-milk.png',
    price: 19.9,
    oldPrice: 25.9,
    discountLabel: '会员价',
    tagLabel: '今日达',
    status: 'normal',
  },
])

const cartItems = ref<DemoCartItem[]>([
  {
    id: 1,
    name: '智利车厘子礼盒',
    quantity: 1,
    price: 89,
    unit: '份',
    image: '/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-cherry.png',
    tagLabel: '冷链配送',
    isSelected: true,
  },
])

const bannerProducts = computed(() => products.value.slice(0, 3))
const filteredProducts = computed(() => {
  if (activeTab.value === 'fresh') return products.value
  return products.value.filter((product) => product.category === activeTab.value)
})

const selectedTotal = computed(() => cartItems.value
  .filter((item) => item.isSelected)
  .reduce((total, item) => total + item.price * item.quantity, 0)
  .toFixed(2))

const selectedCount = computed(() => cartItems.value
  .filter((item) => item.isSelected)
  .reduce((total, item) => total + item.quantity, 0))

function handleAdd(product: CarouselItem) {
  const existItem = cartItems.value.find((item) => item.name === product.title)

  if (existItem) {
    existItem.quantity += 1
  } else {
    cartItems.value.push({
      id: Date.now(),
      name: product.title,
      quantity: 1,
      price: Number(product.price),
      unit: product.unit || '份',
      image: product.image,
      tagLabel: product.tagLabel || '到家商品',
      isSelected: true,
    })
  }

  showToast('已加入购物车')
}

function showToast(text: string) {
  toastText.value = text

  if (toastTimer) {
    window.clearTimeout(toastTimer)
  }

  toastTimer = window.setTimeout(() => {
    toastText.value = ''
  }, 1600)
}
</script>

<style scoped lang="scss">
@use './styles/variables' as *;

.lx-demo {
  @include lx-font-base;

  min-height: 100vh;
  padding: $lx-space-6;
  background: $lx-color-bg;
}

.lx-demo__phone {
  position: relative;
  display: grid;
  gap: $lx-space-4;
  width: min(100%, 390px);
  margin: 0 auto;
  padding: $lx-space-4 $lx-space-3 88px;
  border-radius: 28px;
  background: $lx-color-bg;
  box-shadow: 0 24px 80px rgba(16, 24, 40, 0.16);
}

.lx-demo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $lx-space-3;
  padding: $lx-space-2 $lx-space-1 0;

  small,
  h1 {
    margin: 0;
    letter-spacing: 0;
  }

  small {
    color: $lx-color-primary;
    font-size: 12px;
    font-weight: 900;
  }

  h1 {
    color: $lx-color-text;
    font-size: 24px;
    line-height: 32px;
  }
}

.lx-demo__banner,
.lx-demo__cart {
  min-width: 0;
}

.lx-demo__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: $lx-space-3;
}

.lx-demo__cart {
  display: grid;
  gap: $lx-space-3;

  h2 {
    margin: 0;
    color: $lx-color-text;
    font-size: 17px;
    line-height: 24px;
  }
}

.lx-demo__settle {
  position: absolute;
  right: $lx-space-3;
  bottom: $lx-space-3;
  left: $lx-space-3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $lx-space-3;
  padding: $lx-space-3;
  border-radius: $lx-radius-xl;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 34px rgba(16, 24, 40, 0.12);
}

.lx-demo__toast {
  position: fixed;
  left: 50%;
  bottom: 36px;
  z-index: 1100;
  margin: 0;
  padding: 10px 14px;
  border-radius: $lx-radius-pill;
  background: rgba(16, 24, 40, 0.82);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  transform: translateX(-50%);
}

@media (max-width: 420px) {
  .lx-demo {
    padding: 0;
  }

  .lx-demo__phone {
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
  }
}
</style>
