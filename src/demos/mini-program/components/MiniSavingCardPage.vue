<template>
  <section class="saving-page">
    <div class="saving-scroll">
      <section class="saving-hero">
        <button class="hero-back" type="button" aria-label="返回我的" @click="$emit('back')">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <h1>靓轩商城省钱卡</h1>
        <button class="hero-capsule" type="button" aria-label="更多">
          <span class="capsule-more" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="capsule-divider" aria-hidden="true"></span>
          <span class="capsule-target" aria-hidden="true"></span>
        </button>

        <div class="buyer-marquee" aria-hidden="true">
          <div class="saving-marquee-track">
            <span v-for="(item, index) in marqueeItems" :key="`first-${index}`">{{ item }}</span>
            <span v-for="(item, index) in marqueeItems" :key="`second-${index}`">{{ item }}</span>
          </div>
        </div>

        <div class="hero-copy">
          <span>开通后</span>
          <strong>一单回本</strong>
          <p>可依次叠加促销、商品券</p>
        </div>

        <button class="exchange-card" type="button">
          <img src="/case-assets/liangxuan-mini-program/demo-saving-card-assets/icons/exchange.svg" alt="" aria-hidden="true" />
          兑换省钱卡
        </button>
        <svg class="hero-line-art" viewBox="0 0 361 182" aria-hidden="true">
          <path d="M180 -45 C218 -22 260 1 303 20 C338 36 370 54 408 91" />
          <path d="M135 227 C178 205 224 185 275 174 C319 165 350 135 362 91" />
        </svg>
      </section>

      <nav class="saving-nav" aria-label="省钱卡内容导航">
        <button class="active" type="button">省钱好券</button>
        <button type="button">限时福利</button>
        <button type="button">精选好物</button>
        <button type="button">规则说明</button>
      </nav>

      <section class="saving-section coupon-section">
        <div class="section-title-row">
          <h2>省钱好券</h2>
          <span>每月一次性发放12张券</span>
        </div>
        <div class="coupon-grid">
          <article v-for="coupon in pageCoupons" :key="`${coupon.amount}-${coupon.rule}`" class="coupon-card">
            <span>满减券</span>
            <div>
              <strong><small>¥</small>{{ coupon.amount }}</strong>
              <em>x{{ coupon.count }}张</em>
              <p>{{ coupon.rule }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="saving-section welfare-section">
        <div class="section-title-column">
          <h2>限时福利</h2>
          <p>不定时赠送福利</p>
        </div>
        <div class="welfare-card">
          <span>商品券</span>
          <strong><small>¥</small>110</strong>
          <p>满999元可用</p>
          <em>部分商品可用</em>
        </div>
      </section>

      <section class="saving-section goods-section">
        <div class="section-title-row">
          <h2>省钱卡精选，天天好物</h2>
          <button type="button">查看全部 <span>›</span></button>
        </div>
        <div class="saving-goods-grid">
          <article v-for="product in selectedProducts" :key="product.id">
            <img :src="product.image" :alt="product.name" loading="lazy" decoding="async" />
            <h3>{{ product.name }}</h3>
            <div>
              <strong>¥{{ product.price }}</strong>
              <small>会员价</small>
              <button type="button" aria-label="加入购物车">+</button>
            </div>
          </article>
        </div>
      </section>

      <section class="saving-section notice-section">
        <h2>购买注意事项</h2>
        <div class="notice-grid">
          <article v-for="item in notices" :key="item.title">
            <span>{{ item.index }}</span>
            <p>{{ item.title }}</p>
          </article>
        </div>
        <p class="refund-copy">
          省钱卡购买成功后，若已核销省钱卡内任一优惠券，则不可退款；若用户购买省钱卡后未核销优惠券，可联系客服进行退款。
        </p>
      </section>

      <section class="saving-section qa-section">
        <h2>省钱卡Q&amp;A</h2>
        <article v-for="item in qaItems" :key="item.question" class="qa-item">
          <div>
            <span>问</span>
            <h3>{{ item.question }}</h3>
          </div>
          <p>{{ item.answer }}</p>
        </article>
      </section>
    </div>

    <footer class="saving-footer">
      <button type="button">
        <span>特惠低价</span>
        ¥9.9 开通1个月
      </button>
    </footer>
  </section>
</template>

<script setup lang="ts">
defineEmits<{ back: [] }>()

const assetBase = '/case-assets/liangxuan-mini-program'

const pageCoupons = [
  { amount: 5, count: 2, rule: '满69元可用' },
  { amount: 10, count: 2, rule: '满119元可用' },
  { amount: 16, count: 2, rule: '满169元可用' },
  { amount: 7, count: 2, rule: '满89元可用' },
  { amount: 12, count: 2, rule: '满149元可用' },
  { amount: 18, count: 2, rule: '满199元可用' },
]

const marqueeItems = [
  '156*****786已购买省钱卡',
  '150*****772已购买省钱卡',
  '189*****305刚刚开通',
  '138*****621已购买省钱卡',
]

const selectedProducts = [
  {
    id: 1,
    name: '进口迷你山竹 800g/盒',
    price: '29.99',
    image: `${assetBase}/demo-activity-assets/images/product-cherry.png`,
  },
  {
    id: 2,
    name: '妃子笑荔枝 450g/盒',
    price: '11.9',
    image: `${assetBase}/demo-activity-assets/images/product-lychee.png`,
  },
  {
    id: 3,
    name: '美都沁甜西瓜 4-5kg/个',
    price: '29.99',
    image: `${assetBase}/demo-category-assets/images/cat-fruit.webp`,
  },
]

const notices = [
  { index: 1, title: '不支持全球购、快送商品使用' },
  { index: 2, title: '9.9购月卡，有机会享一单回本' },
  { index: 3, title: '仅小程序可用' },
  { index: 4, title: '可叠加商品优惠券' },
]

const qaItems = [
  {
    question: '省钱卡是什么？',
    answer: '省钱卡是靓轩商城为高频购买用户提供的专享权益，开通后可获得多张满减券与不定时福利。',
  },
  {
    question: '省钱卡怎么买？',
    answer: '在本页面点击底部开通按钮并完成支付后即可生效，优惠券将发放至账户卡券包。',
  },
  {
    question: '省钱卡购买开通后，是否可以退卡？',
    answer: '若未核销任一优惠券，可联系客服处理退款；若已使用任一优惠券，则不支持退款。',
  },
  {
    question: '如何领取省钱卡优惠券？',
    answer: '开通成功后每月一次性自动发放12张券，无需手动领取。',
  },
  {
    question: '如何查看省钱卡优惠券？',
    answer: '可在我的-优惠券或结算页可用优惠中查看省钱卡优惠券。',
  },
  {
    question: '购买“省钱卡”会自动续费吗？',
    answer: '不会自动续费，到期后如需继续享受权益，可再次手动开通。',
  },
]
</script>

<style scoped>
.saving-page {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #f5f5f5;
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
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.saving-scroll {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 92px;
  scrollbar-width: none;
}

.saving-scroll::-webkit-scrollbar {
  display: none;
}

.saving-hero {
  position: relative;
  height: 310px;
  overflow: hidden;
  border-radius: 0 0 28px 28px;
  background: linear-gradient(142deg, #ff7c6b 0%, #ff3922 100%);
  color: #fff;
}

.saving-hero::before {
  position: absolute;
  inset: 0;
  opacity: 0.25;
  background:
    radial-gradient(circle at 86% 78%, rgba(255, 255, 255, 0.5) 0 1px, transparent 2px),
    radial-gradient(circle at 78% 18%, rgba(255, 255, 255, 0.45) 0 1px, transparent 2px);
  background-size: 28px 28px, 36px 36px;
  content: '';
}

.hero-back {
  position: absolute;
  top: 8px;
  left: 12px;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.hero-back svg {
  width: 20px;
  height: 20px;
}

.saving-hero h1 {
  position: absolute;
  top: 13px;
  left: 50%;
  z-index: 3;
  margin: 0;
  color: #fff;
  font-size: 17px;
  font-weight: 900;
  line-height: 25.5px;
  letter-spacing: -0.43px;
  transform: translateX(-50%);
  white-space: nowrap;
}

.hero-capsule {
  position: absolute;
  top: 11px;
  right: 16px;
  z-index: 3;
  width: 78.15px;
  height: 29.17px;
  border: 0.591px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.capsule-more {
  position: absolute;
  top: 4.58px;
  left: 8.58px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5px;
  width: 20px;
  height: 20px;
}

.capsule-more i {
  width: 3.2px;
  height: 3.2px;
  border-radius: 999px;
  background: currentColor;
}

.capsule-divider {
  position: absolute;
  top: 8.58px;
  left: 40.57px;
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.45);
}

.capsule-target {
  position: absolute;
  top: 6.58px;
  left: 53.56px;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 999px;
}

.capsule-target::after {
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

.buyer-marquee {
  position: absolute;
  top: 52px;
  left: 0;
  z-index: 3;
  width: 100%;
  overflow: hidden;
  padding-left: 12px;
}

.buyer-marquee::before,
.buyer-marquee::after {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  width: 24px;
  pointer-events: none;
  content: '';
}

.buyer-marquee::before {
  left: 0;
  background: linear-gradient(90deg, #ff6958 0%, rgba(255, 105, 88, 0) 100%);
}

.buyer-marquee::after {
  right: 0;
  background: linear-gradient(270deg, #ff4b39 0%, rgba(255, 75, 57, 0) 100%);
}

.saving-marquee-track {
  display: flex;
  width: max-content;
  gap: 8px;
  animation: saving-marquee 28s linear infinite;
  will-change: transform;
}

.buyer-marquee span {
  flex: 0 0 auto;
  height: 28px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 11px;
  line-height: 16.5px;
  white-space: nowrap;
}

@keyframes saving-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 4px));
  }
}

.hero-copy {
  position: absolute;
  top: 128px;
  left: 20px;
  display: grid;
  gap: 4px;
  z-index: 1;
}

.hero-copy span {
  font-size: 22px;
  line-height: 33px;
}

.hero-copy strong {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  font-size: 40px;
  font-weight: 800;
  line-height: 42px;
  letter-spacing: -1.73px;
}

.hero-copy p {
  margin: 3px 0 0;
  width: max-content;
  height: 31px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 13px;
  line-height: 19.5px;
}

.exchange-card {
  position: absolute;
  top: 112px;
  right: -1px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 4px;
  width: 89px;
  height: 27px;
  padding: 5px 10px;
  border: 0.558px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px 0 0 999px;
  background: rgba(0, 0, 0, 0.1);
  color: #ffe8b5;
  font-size: 11px;
  line-height: 16.5px;
  white-space: nowrap;
}

.exchange-card img {
  display: block;
  width: 12px;
  height: 12px;
  object-fit: contain;
}

.hero-line-art {
  position: absolute;
  left: 33px;
  top: 128px;
  z-index: 0;
  width: 360.679px;
  height: 181.96px;
  color: rgba(255, 255, 255, 0.22);
  pointer-events: none;
}

.hero-line-art path {
  fill: none;
  stroke: currentColor;
  stroke-width: 1px;
  stroke-linecap: round;
}

.saving-nav {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
  width: calc(100% - 24px);
  height: 52px;
  margin: -28px auto 12px;
  padding: 8px;
  border-radius: 16px;
  background: #fff;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.1),
    0 1px 1px rgba(0, 0, 0, 0.1);
}

.saving-nav button {
  min-width: 0;
  padding: 0;
  border-radius: 999px;
  background: transparent;
  color: #4a5565;
  font-size: 13px;
  line-height: 19.5px;
}

.saving-nav .active {
  background: linear-gradient(157deg, #ff7c6b 0%, #ff3922 100%);
  color: #fff;
}

.saving-section {
  width: calc(100% - 24px);
  margin: 0 auto 12px;
  border-radius: 22px;
  background: #fff;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.1),
    0 1px 1px rgba(0, 0, 0, 0.1);
}

.coupon-section {
  padding: 16px;
}

.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.section-title-row h2,
.section-title-column h2,
.notice-section h2,
.qa-section h2 {
  margin: 0;
  color: #030712;
  font-size: 21px;
  font-weight: 900;
  line-height: 31.5px;
  letter-spacing: -0.36px;
}

.section-title-row > span {
  color: #f4341b;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
}

.coupon-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.coupon-card {
  min-width: 0;
  height: 127px;
  overflow: hidden;
  border: 0.591px solid rgba(255, 228, 224, 0.6);
  border-radius: 16px;
  background: linear-gradient(130deg, #fff4f2 0%, #ffebf0 100%);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.08);
}

.coupon-card > span {
  display: grid;
  place-items: center;
  height: 48px;
  color: #ff5c47;
  font-size: 11px;
  line-height: 16.5px;
}

.coupon-card div {
  position: relative;
  display: grid;
  justify-items: center;
  height: 78px;
  background: linear-gradient(143deg, #ff7c6b 0%, #ff3922 100%);
  color: #fff;
}

.coupon-card div::before,
.coupon-card div::after {
  position: absolute;
  top: 31px;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #fff;
  content: '';
}

.coupon-card div::before {
  left: -8px;
}

.coupon-card div::after {
  right: -8px;
}

.coupon-card strong {
  margin-top: 7px;
  font-size: 30px;
  font-weight: 900;
  line-height: 40px;
  letter-spacing: -1.1px;
}

.coupon-card strong small {
  font-size: 15px;
  line-height: 22.5px;
}

.coupon-card em {
  position: absolute;
  top: 22px;
  right: 16px;
  font-size: 12px;
  font-style: normal;
  line-height: 18px;
}

.coupon-card p {
  margin: 0;
  font-size: 10px;
  line-height: 15px;
}

.welfare-section,
.goods-section,
.notice-section,
.qa-section {
  padding: 16px;
}

.section-title-column p {
  margin: 0;
  color: #6a7282;
  font-size: 12px;
  line-height: 18px;
}

.welfare-card {
  position: relative;
  min-height: 93px;
  margin-top: 12px;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, #fff4f2 0%, #ffebf0 100%);
}

.welfare-card span {
  display: inline-grid;
  place-items: center;
  min-width: 40px;
  height: 22px;
  border-radius: 4px;
  background: #ff5c47;
  color: #fff;
  font-size: 11px;
}

.welfare-card strong {
  display: block;
  margin-top: 8px;
  color: #f4341b;
  font-size: 36px;
  font-weight: 900;
  line-height: 42px;
  letter-spacing: -1.3px;
}

.welfare-card strong small {
  font-size: 18px;
}

.welfare-card p {
  position: absolute;
  top: 32px;
  right: 18px;
  margin: 0;
  color: #f4341b;
  font-size: 14px;
  font-weight: 800;
}

.welfare-card em {
  position: absolute;
  top: 54px;
  right: 18px;
  color: #f4341b;
  font-size: 11px;
  font-style: normal;
}

.section-title-row button {
  padding: 0;
  background: transparent;
  color: #6a7282;
  font-size: 12px;
  line-height: 18px;
}

.saving-goods-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.saving-goods-grid article {
  min-width: 0;
}

.saving-goods-grid img {
  display: block;
  width: 100%;
  height: 92px;
  border-radius: 12px;
  background: #f3f4f6;
  object-fit: cover;
}

.saving-goods-grid h3 {
  min-height: 36px;
  margin: 8px 0 4px;
  overflow: hidden;
  color: #101828;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
}

.saving-goods-grid div {
  position: relative;
  display: grid;
  gap: 2px;
}

.saving-goods-grid strong {
  color: #f4341b;
  font-size: 13px;
  font-weight: 900;
  line-height: 19.5px;
}

.saving-goods-grid small {
  color: #6a7282;
  font-size: 10px;
  line-height: 15px;
}

.saving-goods-grid div button {
  position: absolute;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #1989e8;
  color: #fff;
  font-size: 18px;
  line-height: 24px;
}

.notice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.notice-grid article {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-height: 60px;
  padding: 12px;
  border: 0.591px solid rgba(255, 228, 224, 0.6);
  border-radius: 16px;
  background: linear-gradient(160deg, #fff4f2 0%, #ffebf0 100%);
}

.notice-grid span {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff7c6b 0%, #ff3922 100%);
  color: #fff;
  font-size: 12px;
  font-weight: 900;
}

.notice-grid p,
.refund-copy {
  margin: 0;
  color: #1e2939;
  font-size: 12px;
  line-height: 17.4px;
}

.refund-copy {
  margin-top: 12px;
  padding: 12px;
  border-radius: 16px;
  background: #f9fafb;
  color: #4a5565;
  line-height: 20.4px;
}

.qa-section {
  margin-bottom: 12px;
}

.qa-item {
  display: grid;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 0.591px solid #f3f4f6;
}

.qa-item:last-child {
  border-bottom: 0;
}

.qa-item div {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: start;
  gap: 8px;
}

.qa-item span {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 13px;
  font-weight: 900;
}

.qa-item h3 {
  margin: 1px 0 0;
  color: #030712;
  font-size: 14px;
  font-weight: 900;
  line-height: 21px;
}

.qa-item p {
  margin: 0;
  padding-left: 32px;
  color: #6a7282;
  font-size: 12px;
  line-height: 20.4px;
}

.saving-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 72px;
  padding: 12px;
  border-radius: 24px 24px 0 0;
  background: #fff;
  box-shadow: 0 -5px 12px rgba(0, 0, 0, 0.08);
}

.saving-footer button {
  position: relative;
  width: 100%;
  height: 48px;
  border-radius: 999px;
  background: #f4341b;
  box-shadow: 0 4px 3px #ffc9c9;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  line-height: 27px;
}

.saving-footer span {
  position: absolute;
  top: -8px;
  left: 28px;
  display: grid;
  place-items: center;
  width: 60px;
  height: 20px;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 11px;
  line-height: 16.5px;
}
</style>
