<template>
  <section class="mini-checkout">
    <header class="checkout-nav">
      <button class="checkout-back" type="button" aria-label="返回购物车" @click="$emit('back')">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <strong>确认订单</strong>
      <button class="checkout-capsule" type="button" aria-label="更多">
        <span class="checkout-more-icon" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span class="checkout-capsule-divider" aria-hidden="true"></span>
        <span class="checkout-target-icon" aria-hidden="true"></span>
      </button>
    </header>

    <div class="checkout-scroll">
      <section class="checkout-card delivery-card">
        <div class="delivery-head">
          <div>
            <h2>极速达 <span>小时达</span></h2>
            <p>满99免首重运费 <em>最快1小时送达</em></p>
          </div>
          <div class="delivery-toggle" aria-label="配送方式">
            <button class="active" type="button">配送</button>
            <button type="button">自提</button>
          </div>
        </div>
        <div class="checkout-divider"></div>
        <button class="address-row" type="button">
          <div>
            <p><span>默认</span> 成都市 天府新区</p>
            <strong>天府大道南段1234号 科技园区 1号楼 302</strong>
            <small>张先生 138****5678</small>
          </div>
          <i>›</i>
        </button>
      </section>

      <section class="checkout-card benefit-card">
        <button type="button">
          <span class="coupon-icon" aria-hidden="true">券</span>
          <strong>优惠券</strong>
          <em>-¥5.00</em>
          <i>›</i>
        </button>
        <button type="button">
          <span class="saving-tag">省钱卡</span>
          <strong>开通省钱卡本单省10元</strong>
          <small>去开通</small>
          <i>›</i>
        </button>
      </section>

      <section
        v-for="group in checkoutGroups"
        :key="group.id"
        class="checkout-card shop-card"
      >
        <h2>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 9h14l-1 10H6L5 9Z" />
            <path d="M8 9V6.5A4 4 0 0 1 12 2.5a4 4 0 0 1 4 4V9" />
          </svg>
          发货门店：{{ group.store }}
        </h2>
        <article v-for="item in group.items" :key="item.id" class="checkout-item">
          <img :src="item.image" :alt="item.name" loading="lazy" decoding="async" />
          <div class="checkout-item-copy">
            <h3>{{ item.name }}</h3>
            <span>{{ item.tag }}</span>
            <strong>¥ {{ formatPrice(item.price) }}</strong>
          </div>
          <small>x{{ item.quantity }}</small>
        </article>
        <div class="shop-subtotal">
          <span>共 {{ group.count }} 件</span>
          <strong>小计: ¥{{ group.total }}</strong>
        </div>
      </section>

      <section class="checkout-card payment-card">
        <h2>支付方式</h2>
        <button
          v-for="item in paymentMethods"
          :key="item.name"
          type="button"
          class="pay-row"
          :class="{ selected: item.selected }"
        >
          <span :class="item.tone" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path :d="item.icon" /></svg>
          </span>
          <div>
            <strong>{{ item.name }}</strong>
            <small>{{ item.note }}</small>
          </div>
          <i aria-hidden="true"></i>
        </button>
      </section>
    </div>

    <footer class="checkout-footer">
      <div>
        <p>合计:<span>¥</span><strong>{{ payableTotal }}</strong></p>
        <small>已优惠 ¥5.00</small>
      </div>
      <button type="button">提交订单</button>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '../mock/cart'

const props = defineProps<{ cartItems: CartItem[] }>()

defineEmits<{ back: [] }>()

const discount = 5

const paymentMethods = [
  {
    name: '微信支付',
    note: '推荐使用',
    selected: true,
    tone: 'wechat',
    icon: 'M5 8.6c0-2.4 2.7-4.3 6-4.3s6 1.9 6 4.3-2.7 4.3-6 4.3c-.5 0-1-.04-1.5-.13L6.4 14l.82-2.24C5.86 10.98 5 9.84 5 8.6Z',
  },
  {
    name: '饭卡支付',
    note: '余额 ¥0.00',
    selected: false,
    tone: 'card',
    icon: 'M4 7h16v10H4V7Zm0 3h16',
  },
  {
    name: '提货卡支付',
    note: '支持企业福利卡',
    selected: false,
    tone: 'card',
    icon: 'M5 6h14v12H5V6Zm3 4h8M8 14h5',
  },
]

const checkoutGroups = computed(() => {
  const groups = [
    { id: 'hourly', store: '成都天府新区店' },
    { id: 'nextday', store: '成都高新冷链仓' },
  ] as const

  return groups
    .map((group) => {
      const items = props.cartItems.filter((item) => item.groupId === group.id)
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const count = items.reduce((sum, item) => sum + item.quantity, 0)

      return {
        ...group,
        items,
        count,
        total: total.toFixed(2),
      }
    })
    .filter((group) => group.items.length > 0)
})

const totalPrice = computed(() => props.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0))
const payableTotal = computed(() => Math.max(totalPrice.value - discount, 0).toFixed(2))

function formatPrice(price: number) {
  return price.toFixed(2)
}
</script>

<style scoped>
.mini-checkout {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #f7f7f7;
  color: #101828;
  font-family:
    "PingFang SC", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

button {
  border: 0;
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.checkout-nav {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 84px;
  height: 84px;
  padding: 44px 16px 8px;
  background: #f8f8f8;
}

.checkout-nav strong {
  position: absolute;
  left: 50%;
  bottom: 10px;
  color: #101828;
  font-size: 17px;
  font-weight: 400;
  line-height: 25.5px;
  transform: translateX(-50%);
}

.checkout-back {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  color: #101828;
}

.checkout-capsule {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 30px;
  padding: 5px 9px;
  border: 0.591px solid #f3f4f6;
  border-radius: 999px;
  background: #f9fafb;
  color: #101828;
}

.checkout-more-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5px;
  width: 20px;
  height: 20px;
}

.checkout-more-icon i {
  width: 3.2px;
  height: 3.2px;
  border-radius: 999px;
  background: currentColor;
}

.checkout-capsule-divider {
  width: 1px;
  height: 12px;
  background: #e5e7eb;
}

.checkout-target-icon {
  position: relative;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 999px;
}

.checkout-target-icon::after {
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

.checkout-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 8px 12px 84px;
  scrollbar-width: none;
}

.checkout-scroll::-webkit-scrollbar {
  display: none;
}

.checkout-card {
  overflow: hidden;
  margin-bottom: 12px;
  border: 0.558px solid rgba(243, 244, 246, 0.5);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.delivery-card {
  padding: 16px;
}

.delivery-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.delivery-head h2 {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin: 0;
  color: #101828;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
}

.delivery-head h2 span,
.address-row p span,
.saving-tag {
  display: inline-flex;
  align-items: center;
  height: 19px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(237, 55, 34, 0.1);
  color: #ed3722;
  font-size: 10px;
  line-height: 15px;
}

.delivery-head p {
  margin: 4px 0 0;
  color: #6a7282;
  font-size: 12px;
  line-height: 18px;
}

.delivery-head em {
  margin-left: 8px;
  color: #ed3722;
  font-style: normal;
}

.delivery-toggle {
  display: flex;
  flex: 0 0 auto;
  padding: 3px;
  border: 0.558px solid rgba(229, 231, 235, 0.5);
  border-radius: 10px;
  background: rgba(243, 244, 246, 0.8);
}

.delivery-toggle button {
  width: 50px;
  height: 31px;
  border-radius: 8px;
  background: transparent;
  color: #6a7282;
  font-size: 13px;
}

.delivery-toggle button.active {
  background: #fff;
  color: #ed3722;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.checkout-divider {
  height: 1px;
  margin: 16px 0;
  background: #f3f4f6;
}

.address-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  background: transparent;
  text-align: left;
}

.address-row p {
  margin: 0;
  color: #4a5565;
  font-size: 13px;
  line-height: 19.5px;
}

.address-row strong {
  display: block;
  margin-top: 4px;
  overflow: hidden;
  color: #101828;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.address-row small {
  display: block;
  margin-top: 4px;
  color: #4a5565;
  font-size: 13px;
  line-height: 19.5px;
}

.address-row i,
.benefit-card i {
  color: #a8b1c2;
  font-size: 24px;
  font-style: normal;
}

.benefit-card button {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  width: 100%;
  min-height: 50px;
  gap: 8px;
  padding: 14px 16px;
  background: transparent;
  color: #101828;
  text-align: left;
}

.benefit-card button + button {
  border-top: 0.558px solid #f9fafb;
}

.benefit-card strong {
  min-width: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.coupon-icon {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: #ed3722;
  color: #fff;
  font-size: 10px;
}

.benefit-card em {
  color: #ed3722;
  font-size: 13px;
  font-style: normal;
  line-height: 19.5px;
}

.benefit-card small {
  color: #6a7282;
  font-size: 12px;
  line-height: 18px;
}

.shop-card {
  padding: 16px;
}

.shop-card h2 {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0 0 16px;
  color: #101828;
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
}

.shop-card h2 svg {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  color: #6a7282;
}

.checkout-item {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) auto;
  gap: 12px;
  padding-bottom: 12px;
}

.checkout-item + .checkout-item {
  padding-top: 12px;
  border-top: 0.558px solid #f9fafb;
}

.checkout-item img {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  object-fit: cover;
}

.checkout-item-copy {
  min-width: 0;
}

.checkout-item h3 {
  margin: 0;
  overflow: hidden;
  color: #101828;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.checkout-item-copy span {
  display: inline-flex;
  height: 20px;
  margin-top: 8px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #eaf2ff;
  color: #155dfc;
  font-size: 10px;
  line-height: 12.5px;
}

.checkout-item-copy strong {
  display: block;
  margin-top: 8px;
  color: #1e2939;
  font-size: 15px;
  font-weight: 400;
  line-height: 22.5px;
}

.checkout-item > small {
  align-self: end;
  color: #6a7282;
  font-size: 13px;
  line-height: 19.5px;
}

.shop-subtotal {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 13px;
  border-top: 0.558px solid #f9fafb;
}

.shop-subtotal span {
  color: #6a7282;
  font-size: 13px;
  line-height: 19.5px;
}

.shop-subtotal strong {
  color: #101828;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.payment-card {
  padding-bottom: 4px;
}

.payment-card h2 {
  margin: 0;
  padding: 14px 16px;
  border-bottom: 0.558px solid #f9fafb;
  color: #101828;
  font-size: 15px;
  font-weight: 400;
  line-height: 22.5px;
}

.pay-row {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) 18px;
  align-items: center;
  width: calc(100% - 16px);
  min-height: 62px;
  gap: 12px;
  margin: 0 8px;
  padding: 10px 8px;
  border-radius: 10px;
  background: transparent;
  text-align: left;
}

.pay-row > span {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
}

.pay-row .wechat {
  background: rgba(9, 184, 62, 0.1);
  color: #09b83e;
}

.pay-row .card {
  background: rgba(43, 127, 255, 0.1);
  color: #2b7fff;
}

.pay-row strong {
  color: #101828;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}

.pay-row small {
  display: block;
  margin-top: 2px;
  color: #99a1af;
  font-size: 11px;
  line-height: 16.5px;
}

.pay-row i {
  width: 18px;
  height: 18px;
  border: 0.558px solid #d1d5dc;
  border-radius: 999px;
}

.pay-row.selected i {
  position: relative;
  border-color: #ed3722;
  background: #ed3722;
}

.pay-row.selected i::after {
  position: absolute;
  left: 5px;
  top: 5px;
  width: 7px;
  height: 4px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  content: '';
  transform: rotate(-45deg);
}

.checkout-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 16px;
  border-top: 0.558px solid #f3f4f6;
  background: #fff;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.04);
}

.checkout-footer p {
  margin: 0;
  color: #1e2939;
  font-size: 12px;
  line-height: 18px;
}

.checkout-footer p span {
  margin-left: 2px;
  color: #ed3722;
  font-size: 14px;
}

.checkout-footer p strong {
  color: #ed3722;
  font-size: 24px;
  font-weight: 400;
  line-height: 36px;
}

.checkout-footer small {
  display: block;
  color: #6a7282;
  font-size: 11px;
  line-height: 16.5px;
}

.checkout-footer > button {
  min-width: 128px;
  height: 44px;
  padding: 0 32px;
  border-radius: 999px;
  background: #ed3722;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  box-shadow:
    0 4px 6px rgba(237, 55, 34, 0.2),
    0 2px 4px rgba(237, 55, 34, 0.2);
}
</style>
