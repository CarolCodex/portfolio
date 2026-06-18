<template>
  <section class="cart-page" :class="{ empty: isEmpty }">
    <CartAddressBar />

    <div class="cart-scroll" :class="{ 'with-summary': !isEmpty }">
      <template v-if="!isEmpty">
        <section class="cart-selected-strip">
          <span class="cart-check" aria-hidden="true"></span>
          <strong>到家商品 <span>（已选{{ cartItems.length }}种）</span></strong>
          <button type="button" @click="$emit('clear')">
            <img class="trash-icon" src="/case-assets/liangxuan-mini-program/demo-cart-assets/icons/trash.svg" alt="" aria-hidden="true" />
            清空购物车
          </button>
        </section>

        <section
          v-for="group in visibleGroups"
          :key="group.id"
          class="cart-group-card"
          :aria-label="group.title"
        >
          <header class="cart-group-header">
            <div class="cart-group-title">
              <span class="cart-check" aria-hidden="true"></span>
              <strong>{{ group.title }}</strong>
              <small>{{ group.subtitle }}</small>
            </div>
            <span class="freight-pill">{{ group.freight }}</span>
          </header>

          <article
            v-for="(item, index) in group.items"
            :key="item.id"
            class="cart-item-row"
            :class="{ last: index === group.items.length - 1 }"
            role="button"
            tabindex="0"
            :aria-label="`查看商品详情：${item.name}`"
            @click="$emit('openProduct', {
              id: item.id,
              name: item.name,
              description: item.tag,
              price: formatPrice(item.price),
              image: item.image,
              tag: item.tag,
            })"
            @keydown.enter.prevent="$emit('openProduct', {
              id: item.id,
              name: item.name,
              description: item.tag,
              price: formatPrice(item.price),
              image: item.image,
              tag: item.tag,
            })"
            @keydown.space.prevent="$emit('openProduct', {
              id: item.id,
              name: item.name,
              description: item.tag,
              price: formatPrice(item.price),
              image: item.image,
              tag: item.tag,
            })"
          >
            <span class="cart-check item-check" aria-hidden="true"></span>
            <img class="cart-item-image" :src="item.image" :alt="item.name" loading="lazy" decoding="async" />
            <div class="cart-item-info">
              <h3>{{ item.name }}</h3>
              <span class="cold-tag">{{ item.tag }}</span>
              <div class="cart-item-bottom">
                <div class="cart-price-wrap">
                  <span class="cart-price">
                    <small>¥</small>
                    <strong>{{ formatPrice(item.price) }}</strong>
                  </span>
                  <del v-if="item.originPrice">¥{{ formatPrice(item.originPrice) }}</del>
                </div>
                <div class="quantity-stepper" aria-label="修改商品数量">
                  <button class="minus" type="button" aria-label="减少数量" @click.stop="$emit('decrement', item.id)">−</button>
                  <span>{{ item.quantity }}</span>
                  <button class="plus" type="button" aria-label="增加数量" @click.stop="$emit('increment', item.id)">+</button>
                </div>
              </div>
            </div>
          </article>
        </section>
      </template>

      <CartEmptyState v-else @go-shopping="$emit('goShopping')" />

      <RecommendGrid
        :items="recommendItems"
        @add="handleRecommendAdd"
        @open="$emit('openProduct', $event)"
      />
    </div>

    <template v-if="!isEmpty">
      <section class="cart-saving-bar">
        <span>省</span>
        <p>本单预计可省<strong>10元</strong>，9.9元开通省钱卡 一单回本</p>
        <i aria-hidden="true">›</i>
      </section>
      <section class="cart-summary-bar">
        <div class="summary-select">
          <span class="cart-check" aria-hidden="true"></span>
          <strong>全选</strong>
        </div>
        <div class="summary-total">
          <p>合计: <span>¥ {{ totalPrice }}</span></p>
          <small>免配送费</small>
        </div>
        <button type="button" @click="$emit('checkout')">去结算（{{ cartItems.length }}）</button>
      </section>
    </template>

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
import { computed, ref } from 'vue'
import { cartGroupMeta, cartRecommendItems, type CartItem, type CartRecommendItem } from '../mock/cart'
import type { DetailProduct } from '../mock/detail'

const props = defineProps<{ cartItems: CartItem[] }>()
const emit = defineEmits<{
  clear: []
  increment: [id: number]
  decrement: [id: number]
  addRecommend: [item: CartRecommendItem]
  openProduct: [product: DetailProduct]
  goShopping: []
  checkout: []
}>()

const flyDuration = 650
const flyingDots = ref<Array<{ id: number; style: Record<string, string> }>>([])
let dotId = 0

const isEmpty = computed(() => props.cartItems.length === 0)
const totalPrice = computed(() => {
  const total = props.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return total.toFixed(2)
})

const visibleGroups = computed(() => cartGroupMeta
  .map((group) => ({
    ...group,
    items: props.cartItems.filter((item) => item.groupId === group.id),
  }))
  .filter((group) => group.items.length > 0))

const recommendItems = computed(() => (isEmpty.value ? cartRecommendItems : cartRecommendItems.slice(0, 4)))

function formatPrice(price: number) {
  return price.toFixed(2)
}

function centerOf(rect: DOMRect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  }
}

function handleRecommendAdd(item: CartRecommendItem, event: MouseEvent) {
  const sourceElement = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
  const cartTarget = document.querySelector('.mini-tabbar button.active .tab-icon-wrap')

  if (!sourceElement || !(cartTarget instanceof HTMLElement)) {
    emit('addRecommend', item)
    return
  }

  const source = centerOf(sourceElement.getBoundingClientRect())
  const target = centerOf(cartTarget.getBoundingClientRect())
  const id = dotId++
  const midX = (target.x - source.x) * 0.45
  const midY = Math.min(-82, (target.y - source.y) * 0.3 - 70)

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

  window.setTimeout(() => {
    emit('addRecommend', item)
  }, flyDuration)

  window.setTimeout(() => {
    flyingDots.value = flyingDots.value.filter((dot) => dot.id !== id)
  }, flyDuration + 120)
}
</script>

<script lang="ts">
import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { CartRecommendItem as RecommendItemForGrid } from '../mock/cart'

const locationIcon = '/case-assets/liangxuan-mini-program/demo-home-assets/icons/location.svg'
const chevronIcon = '/case-assets/liangxuan-mini-program/demo-home-assets/icons/chevron-down.svg'

export const CartAddressBar = defineComponent({
  name: 'CartAddressBar',
  setup() {
    return () => h('header', { class: 'cart-address-bar' }, [
      h('div', { class: 'cart-address-copy' }, [
        h('img', { src: locationIcon, alt: '', 'aria-hidden': 'true' }),
        h('strong', '中海·天府里迎晖一期'),
        h('img', { class: 'chevron', src: chevronIcon, alt: '', 'aria-hidden': 'true' }),
      ]),
      h('button', { class: 'mini-capsule', type: 'button', 'aria-label': '小程序菜单' }, [
        h('span', { class: 'mini-more-icon', 'aria-hidden': 'true' }, [
          h('i'),
          h('i'),
          h('i'),
        ]),
        h('span', { class: 'mini-capsule-divider', 'aria-hidden': 'true' }),
        h('span', { class: 'mini-target-icon', 'aria-hidden': 'true' }),
      ]),
    ])
  },
})

export const CartEmptyState = defineComponent({
  name: 'CartEmptyState',
  emits: ['goShopping'],
  setup(_, { emit }) {
    return () => h('section', { class: 'cart-empty-state' }, [
      h('div', { class: 'empty-illustration', 'aria-hidden': 'true' }, [
        h('span', { class: 'empty-glow' }),
        h('span', { class: 'empty-basket' }),
        h('span', { class: 'empty-handle' }),
        h('span', { class: 'empty-panel' }),
        h('span', { class: 'empty-wheel left' }),
        h('span', { class: 'empty-wheel right' }),
      ]),
      h('h2', '购物车空空如也'),
      h('p', '心仪的都加进来'),
      h('button', { type: 'button', onClick: () => emit('goShopping') }, '去逛逛'),
    ])
  },
})

export const RecommendGrid = defineComponent({
  name: 'RecommendGrid',
  props: {
    items: {
      type: Array as PropType<RecommendItemForGrid[]>,
      required: true,
    },
  },
  emits: ['add', 'open'],
  setup(props, { emit }) {
    return () => h('section', { class: 'recommend-section' }, [
      h('h2', [
        h('span', '✻'),
        '好物推荐',
        h('span', '✻'),
      ]),
      h('div', { class: 'recommend-grid' }, props.items.map((item) => h('article', {
        class: 'recommend-card',
        key: item.id,
        role: 'button',
        tabindex: 0,
        'aria-label': `查看商品详情：${item.name}`,
        onClick: () => emit('open', {
          id: item.id,
          name: item.name,
          description: item.spec,
          price: item.price,
          image: item.image,
          tag: item.cartItem.tag,
        }),
        onKeydown: (event: KeyboardEvent) => {
          if (event.key !== 'Enter' && event.key !== ' ') return

          event.preventDefault()
          emit('open', {
            id: item.id,
            name: item.name,
            description: item.spec,
            price: item.price,
            image: item.image,
            tag: item.cartItem.tag,
          })
        },
      }, [
        h('img', { src: item.image, alt: item.name }),
        h('div', { class: 'recommend-info' }, [
          h('h3', item.name),
          h('p', item.spec),
          h('span', { class: 'city-tag' }, '全城配'),
          h('div', { class: 'recommend-bottom' }, [
            h('div', { class: 'recommend-price' }, [
              h('em', '天天平价'),
              h('strong', `¥${item.price}`),
              h('small', '/份'),
            ]),
            h('button', {
              type: 'button',
              'aria-label': `加入购物车：${item.name}`,
              onClick: (event: MouseEvent) => {
                event.stopPropagation()
                emit('add', item, event)
              },
            }, '+'),
          ]),
        ]),
      ]))),
    ])
  },
})
</script>

<style>
.cart-page {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #f8f8f8;
  color: #101828;
}

.cart-page.empty {
  background: #f8f8f8;
}

.cart-address-bar {
  position: relative;
  z-index: 3;
  flex: 0 0 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 12px 16px 7px;
  background: #fff;
}

.cart-address-copy {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
  gap: 8px;
  max-width: calc(100% - 92px);
}

.cart-address-copy img {
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: invert(1);
}

.cart-address-copy .chevron {
  width: 13px;
  height: 13px;
}

.cart-address-copy strong {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  color: #101828;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.3125px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-capsule {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  height: 30px;
  padding: 5px 9px;
  border: 0.591px solid #f3f4f6;
  border-radius: 999px;
  background: #f9fafb;
  color: #111827;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
}

.mini-more-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5px;
  width: 20px;
  height: 20px;
}

.mini-more-icon i {
  width: 3.2px;
  height: 3.2px;
  border-radius: 999px;
  background: currentColor;
}

.mini-capsule-divider {
  width: 1px;
  height: 12px;
  background: #e5e7eb;
}

.mini-target-icon {
  position: relative;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 999px;
}

.mini-target-icon::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  content: '';
  transform: translate(-50%, -50%);
}

.cart-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 4px 12px 18px;
  background: #f8f8f8;
  scrollbar-width: none;
}

.cart-scroll::-webkit-scrollbar {
  display: none;
}

.cart-scroll.with-summary {
  padding-bottom: 129px;
}

.cart-selected-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 46px;
  margin-bottom: 12px;
  padding: 12.558px 14.558px;
  border: 0.558px solid rgba(255, 223, 221, 0.5);
  border-radius: 14px;
  background: #fff0ef;
  color: #ef3322;
}

.cart-selected-strip strong {
  flex: 1 1 auto;
  min-width: 0;
  color: #101828;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}

.cart-selected-strip strong span {
  color: #ed3722;
}

.cart-selected-strip button {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 4px;
  padding: 0;
  border: 0;
  background: transparent;
  color: rgba(237, 55, 34, 0.8);
  font-size: 13px;
  line-height: 19.5px;
  white-space: nowrap;
}

.cart-check {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ed3722;
}

.cart-check::after {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 7px;
  height: 4px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg);
  content: '';
}

.trash-icon {
  display: block;
  width: 14px;
  height: 14px;
  object-fit: contain;
}

.cart-group-card {
  overflow: hidden;
  margin-bottom: 16px;
  border: 0.558px solid rgba(243, 244, 246, 0.5);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.cart-group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 12px 14px 12.558px;
  border-bottom: 0.558px solid #f9fafb;
}

.cart-group-title {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 10px;
}

.cart-group-title strong {
  color: #101828;
  font-size: 15px;
  font-weight: 700;
  line-height: 22.5px;
  letter-spacing: 0.1406px;
  white-space: nowrap;
}

.cart-group-title small {
  min-width: 0;
  overflow: hidden;
  color: #6a7282;
  font-size: 11px;
  line-height: 16.5px;
  letter-spacing: 0.0645px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.freight-pill {
  flex: 0 0 auto;
  max-width: 135px;
  overflow: hidden;
  border-radius: 999px;
  background: #fef2f2;
  padding: 2px 8px;
  color: #ed3722;
  font-size: 11px;
  line-height: 16.5px;
  letter-spacing: 0.0645px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 14px 16.558px;
}

.cart-item-row::after {
  position: absolute;
  right: 14px;
  bottom: 0;
  left: 44px;
  height: 0.558px;
  background: #f9fafb;
  content: '';
}

.cart-item-row.last::after {
  display: none;
}

.item-check {
  align-self: center;
}

.cart-item-image {
  flex: 0 0 auto;
  width: 84px;
  height: 84px;
  border-radius: 14px;
  background: #f9f9f9;
  object-fit: cover;
}

.cart-item-info {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  min-height: 84px;
}

.cart-item-info h3 {
  display: -webkit-box;
  min-height: 20px;
  margin: 0;
  overflow: hidden;
  color: #101828;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.1504px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.cold-tag {
  display: inline-flex;
  align-items: center;
  height: 20px;
  border-radius: 4px;
  background: #eaf2ff;
  padding: 2px 6px;
  color: #155dfc;
  font-size: 10px;
  line-height: 12.5px;
  letter-spacing: 0.1172px;
  align-self: flex-start;
}

.cart-item-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  margin-top: 0;
}

.cart-price-wrap {
  display: flex;
  align-items: baseline;
  min-width: 0;
  gap: 8px;
}

.cart-price {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  color: #ed3722;
  font-family: 'PingFang SC', Inter, ui-sans-serif, system-ui, sans-serif;
  line-height: 27px;
  white-space: nowrap;
}

.cart-price small {
  margin-right: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
}

.cart-price strong {
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: -0.4395px;
}

.cart-price-wrap del {
  color: #99a1af;
  font-size: 11px;
  line-height: 16.5px;
  white-space: nowrap;
}

.quantity-stepper {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 14px;
}

.quantity-stepper button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  padding: 0;
  font-size: 18px;
  line-height: 18px;
  cursor: pointer;
}

.quantity-stepper .minus {
  border: 1px solid #d1d5dc;
  background: #fff;
  color: #6a7282;
}

.quantity-stepper .plus {
  border: 0;
  background: #ed3722;
  color: #fff;
  box-shadow: 0 5px 10px rgba(244, 52, 27, 0.28);
}

.quantity-stepper span {
  min-width: 10px;
  color: #1e2939;
  font-size: 13px;
  line-height: 19.5px;
  text-align: center;
}

.cart-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 455px;
  padding-top: 78px;
  background: #fff;
}

.empty-illustration {
  position: relative;
  width: 104px;
  height: 104px;
  margin-bottom: 15px;
}

.empty-glow {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #fff4ee 0%, #fde7e4 100%);
}

.empty-basket {
  position: absolute;
  left: 32px;
  top: 34px;
  width: 50px;
  height: 34px;
  border-radius: 4px 4px 9px 9px;
  background: #fff;
  transform: skewX(-6deg);
  box-shadow: 0 8px 16px rgba(237, 55, 34, 0.09);
}

.empty-handle {
  position: absolute;
  left: 27px;
  top: 27px;
  width: 12px;
  height: 5px;
  border-radius: 999px;
  background: #f4341b;
  transform: rotate(11deg);
}

.empty-panel {
  position: absolute;
  left: 51px;
  top: 48px;
  width: 18px;
  height: 16px;
  border-radius: 2px;
  background: #f4341b;
}

.empty-wheel {
  position: absolute;
  top: 74px;
  width: 10px;
  height: 10px;
  border: 3px solid #f4341b;
  border-radius: 999px;
  background: #fff;
}

.empty-wheel.left {
  left: 36px;
}

.empty-wheel.right {
  left: 74px;
}

.cart-empty-state h2 {
  margin: 0;
  color: #101828;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.cart-empty-state p {
  margin: 8px 0 20px;
  color: #99a1af;
  font-size: 12px;
  line-height: 16px;
}

.cart-empty-state button {
  width: 118px;
  height: 38px;
  border: 1px solid #a8b1c2;
  border-radius: 999px;
  background: #fff;
  color: #101828;
  font-size: 14px;
  line-height: 20px;
}

.recommend-section {
  padding-top: 18px;
}

.cart-page.empty .recommend-section {
  margin: 0 -12px;
  padding: 25px 18px 18px;
  background: #f8f8f8;
}

.recommend-section h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 0 18px;
  color: #f4341b;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.recommend-section h2 span {
  color: #f0b100;
  font-size: 12px;
  line-height: 16px;
}

.recommend-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.recommend-card {
  min-width: 0;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
}

.recommend-card > img {
  display: block;
  width: 100%;
  height: 170px;
  border-radius: 10px;
  object-fit: cover;
}

.recommend-info {
  display: flex;
  flex-direction: column;
  min-height: 136px;
  gap: 0;
  padding: 8px 8px 10px;
}

.recommend-info h3 {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: #101828;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.25px;
  letter-spacing: -0.1504px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.recommend-info p {
  margin: 4px 0 0;
  color: #99a1af;
  font-size: 12px;
  line-height: 16px;
}

.city-tag {
  align-self: flex-start;
  height: 19px;
  border: 1px solid #d1d5dc;
  border-radius: 4px;
  padding: 0 6px;
  margin-top: 12px;
  color: #6a7282;
  font-size: 10px;
  line-height: 17px;
}

.recommend-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4px;
  min-width: 0;
  margin-top: auto;
}

.recommend-price {
  display: flex;
  align-items: baseline;
  min-width: 0;
  gap: 3px;
}

.recommend-price em {
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 4px;
  background: #fff0eb;
  padding: 1px 4px;
  color: #f4341b;
  font-size: 9px;
  font-style: normal;
  line-height: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recommend-price strong {
  color: #f4341b;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  white-space: nowrap;
}

.recommend-price small {
  color: #99a1af;
  font-size: 11px;
  line-height: 16px;
  white-space: nowrap;
}

.recommend-bottom button {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border: 0;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 22px;
  line-height: 20px;
  box-shadow: 0 5px 10px rgba(244, 52, 27, 0.28);
}

.cart-saving-bar {
  position: absolute;
  right: 0;
  bottom: 64px;
  left: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 9px;
  height: 42px;
  background: #fff1e9;
  padding: 0 18px;
  color: #344054;
}

.cart-saving-bar span {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: #f4341b;
  color: #fff;
  font-size: 10px;
  line-height: 15px;
}

.cart-saving-bar p {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-saving-bar strong {
  color: #ed3722;
  font-weight: 700;
}

.cart-saving-bar i {
  color: #f4341b;
  font-size: 23px;
  font-style: normal;
  line-height: 23px;
}

.cart-summary-bar {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr) 144px;
  align-items: center;
  height: 64px;
  border-top: 1px solid #f3f4f6;
  background: #fff;
  padding: 0 16px;
  box-shadow: 0 -4px 14px rgba(15, 23, 42, 0.05);
}

.summary-select {
  display: flex;
  align-items: center;
  gap: 10px;
}

.summary-select strong {
  color: #4a5565;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
}

.summary-total {
  min-width: 0;
  text-align: right;
}

.summary-total p {
  margin: 0;
  color: #1e2939;
  font-size: 12px;
  line-height: 18px;
}

.summary-total span {
  color: #ed3722;
  font-size: 20px;
  line-height: 27px;
}

.summary-total small {
  display: block;
  color: #99a1af;
  font-size: 11px;
  line-height: 16px;
}

.cart-summary-bar > button {
  justify-self: end;
  width: 128px;
  height: 46px;
  border: 0;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  box-shadow: 0 8px 16px rgba(244, 52, 27, 0.22);
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
    opacity: 0;
    transform: translate3d(var(--fly-x), var(--fly-y), 0) scale(0.45);
  }
}
</style>
