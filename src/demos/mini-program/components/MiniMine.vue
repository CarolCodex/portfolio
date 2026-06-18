<template>
  <section class="mini-mine">
    <div class="mine-scroll">
      <header class="mine-user-bar">
        <div class="mine-user">
          <img class="mine-avatar" :src="avatarImage" alt="用户头像" loading="lazy" decoding="async" />
          <strong>136****7964</strong>
        </div>
        <div class="mine-header-actions" aria-label="消息与设置">
          <button v-for="item in headerActions" :key="item.label" type="button" :aria-label="item.label">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path v-for="path in item.paths" :key="path" :d="path" />
            </svg>
          </button>
        </div>
      </header>

      <section
        class="saving-card"
        role="button"
        tabindex="0"
        aria-label="进入靓轩省钱卡页面"
        @click="$emit('openSavingCard')"
        @keydown.enter.prevent="$emit('openSavingCard')"
        @keydown.space.prevent="$emit('openSavingCard')"
      >
        <div class="saving-top">
          <strong>靓轩省钱卡</strong>
          <button type="button" @click.stop="$emit('openSavingCard')">立即开通</button>
        </div>
        <div class="saving-tags">
          <span>APP专属福利</span>
          <span>可叠加促销</span>
          <span>有机会一单回本</span>
        </div>
        <div class="coupon-row">
          <article v-for="coupon in coupons" :key="coupon.price">
            <strong>
              <span>{{ coupon.price }}</span>元<em>×{{ coupon.count }}张</em>
            </strong>
            <small>{{ coupon.rule }}</small>
          </article>
        </div>
      </section>

      <section class="mine-panel order-panel" aria-label="我的订单">
        <div class="panel-title-row">
          <h2>我的订单</h2>
          <button type="button">全部订单 &gt;</button>
        </div>
        <div class="order-grid">
          <button v-for="item in orderActions" :key="item.label" type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path v-for="path in item.paths" :key="path" :d="path" />
            </svg>
            <span>{{ item.label }}</span>
          </button>
        </div>
      </section>

      <section class="mine-panel service-panel" aria-label="我的服务">
        <button v-for="item in serviceActions" :key="item.label" type="button">
          <span class="service-icon-wrap">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path v-for="path in item.paths" :key="path" :d="path" />
            </svg>
            <em v-if="item.badge">{{ item.badge }}</em>
          </span>
          <span>{{ item.label }}</span>
        </button>
      </section>

      <section class="invite-card" aria-label="邀请好友">
        <div>
          <strong>邀1人立得9.99元好礼</strong>
          <span>多邀有机会享百款好礼，最高抽飞天茅台</span>
        </div>
        <button type="button">去邀请</button>
      </section>

      <section class="recommend-section" aria-label="好物推荐">
        <h2><span>＊</span>好物推荐<span>＊</span></h2>
        <div class="mine-product-grid">
          <article
            v-for="product in recommendProducts"
            :key="product.id"
            class="mine-product-card"
            role="button"
            tabindex="0"
            :aria-label="`查看商品详情：${product.name}`"
            @click="$emit('openProduct', product)"
            @keydown.enter.prevent="$emit('openProduct', product)"
            @keydown.space.prevent="$emit('openProduct', product)"
          >
            <img :src="product.image" :alt="product.name" loading="lazy" decoding="async" />
            <div class="mine-product-info">
              <h3>{{ product.name }}</h3>
              <span class="delivery-tag">全城配</span>
              <div class="mine-product-bottom">
                <div class="mine-price">
                  <em>天天平价</em>
                  <strong>¥{{ product.price }}</strong>
                  <small>/份</small>
                </div>
                <button type="button" :aria-label="`加入购物车：${product.name}`" @click.stop="$emit('addToCart')">
                  +
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DetailProduct } from '../mock/detail'

defineEmits<{
  addToCart: []
  openProduct: [product: DetailProduct]
  openSavingCard: []
}>()

const categoryAssetBase = '/case-assets/liangxuan-mini-program/demo-category-assets'

const avatarImage = `${categoryAssetBase}/images/cat-pet.jpg`

const headerActions = [
  {
    label: '消息',
    paths: [
      'M5.25 6.75C5.25 5.23 6.48 4 8 4h8c1.52 0 2.75 1.23 2.75 2.75v5.5c0 1.52-1.23 2.75-2.75 2.75h-3.85L8 18.5V15H8c-1.52 0-2.75-1.23-2.75-2.75v-5.5Z',
    ],
  },
  {
    label: '设置',
    paths: [
      'M12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z',
      'M12 2.75v2.1M12 19.15v2.1M4.4 4.4l1.48 1.48M18.12 18.12l1.48 1.48M2.75 12h2.1M19.15 12h2.1M4.4 19.6l1.48-1.48M18.12 5.88l1.48-1.48',
    ],
  },
]

const coupons = [
  { price: '5', count: 2, rule: '满69可用' },
  { price: '7', count: 2, rule: '满89可用' },
  { price: '10', count: 1, rule: '满129可用' },
]

const orderActions = [
  {
    label: '待付款',
    paths: ['M4 7.5h16v10H4v-10Z', 'M4 10h16'],
  },
  {
    label: '待收货',
    paths: ['M12 3.5 19 7.2v8.3L12 20l-7-4.5V7.2l7-3.7Z', 'M5 7.25l7 4 7-4', 'M12 11.25V20'],
  },
  {
    label: '待评价',
    paths: ['M5 5h14v10H8.2L5 18.5V5Z'],
  },
  {
    label: '退换/售后',
    paths: ['M12 3.5 18.5 6v5.2c0 4.3-2.85 7.25-6.5 8.8-3.65-1.55-6.5-4.5-6.5-8.8V6L12 3.5Z', 'M12 8v4.2', 'M12 15.7v.1'],
  },
  {
    label: '全部订单',
    paths: ['M7 4.5h10l1.5 2V19H5.5V6.5L7 4.5Z', 'M8 9h8', 'M8 12.5h8', 'M8 16h5'],
  },
]

const serviceActions = [
  {
    label: '优惠券',
    paths: ['M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4V7Z', 'M9 7v10', 'M15 9.5v.1', 'M15 14.4v.1'],
  },
  {
    label: '地址管理',
    paths: ['M12 20s6-4.55 6-10a6 6 0 0 0-12 0c0 5.45 6 10 6 10Z', 'M12 7.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z'],
  },
  {
    label: '在线客服',
    badge: 'hot',
    paths: ['M5 10.25a7 7 0 0 1 14 0v5a2.75 2.75 0 0 1-2.75 2.75H14', 'M5 10.25v4.5h3v-4.5H5Z', 'M16 10.25v4.5h3v-4.5h-3Z', 'M11 18h3'],
  },
  {
    label: '帮助中心',
    paths: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M9.75 9a2.25 2.25 0 1 1 3.3 2c-.65.38-1.05.85-1.05 1.75v.35', 'M12 16.5v.1'],
  },
  {
    label: '意见反馈',
    paths: ['M7 4.5h10v15H7v-15Z', 'M9 8h6', 'M9 11h4', 'M15.5 15.5l3 3'],
  },
  {
    label: '关于我们',
    paths: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 10.5v5.5', 'M12 7.5v.1'],
  },
  {
    label: '设置',
    paths: ['M12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Z', 'M12 3v2M12 19v2M4.75 4.75l1.42 1.42M17.83 17.83l1.42 1.42M3 12h2M19 12h2M4.75 19.25l1.42-1.42M17.83 6.17l1.42-1.42'],
  },
  {
    label: '分享好友',
    paths: ['M8.5 12.5 15.5 8.5', 'M8.5 12.5l7 4', 'M6.5 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', 'M17.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z', 'M17.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  },
]

const recommendProducts = [
  {
    id: 1,
    name: '有机青菜 新鲜采摘',
    price: '8.8',
    image: `${categoryAssetBase}/images/product-lettuce.jpg`,
  },
  {
    id: 2,
    name: '精选西红柿 自然成熟',
    price: '6.9',
    image: `${categoryAssetBase}/images/product-tomato.jpg`,
  },
  {
    id: 3,
    name: '农家土豆 绵软香甜',
    price: '5.5',
    image: `${categoryAssetBase}/images/product-potato.jpg`,
  },
  {
    id: 4,
    name: '新鲜黄瓜 爽脆多汁',
    price: '4.9',
    image: `${categoryAssetBase}/images/product-cucumber.jpg`,
  },
]
</script>

<style scoped>
.mini-mine {
  height: 100%;
  overflow: hidden;
  background:
    linear-gradient(180deg, #e6f0ff 0, #e6f0ff 140px, rgba(230, 240, 255, 0) 250px),
    #f9fafb;
  color: #101828;
}

.mine-scroll {
  height: 100%;
  overflow-y: auto;
  padding: 10px 12px 18px;
  scrollbar-width: none;
}

.mine-scroll::-webkit-scrollbar {
  display: none;
}

.mine-user-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  margin-bottom: 16px;
}

.mine-user {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.mine-avatar {
  flex: 0 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 999px;
  object-fit: cover;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.mine-user strong {
  overflow: hidden;
  color: #101828;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.44px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mine-header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

button {
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.mine-header-actions button {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #101828;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.saving-card {
  min-height: 135px;
  padding: 12px;
  border-radius: 16px;
  background: linear-gradient(160deg, #0a3a82 0%, #1a52a3 100%);
  box-shadow:
    0 10px 15px rgba(0, 0, 0, 0.1),
    0 4px 6px rgba(0, 0, 0, 0.1);
}

.saving-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.saving-top strong {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

.saving-top button {
  min-width: 72px;
  height: 24px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: #fff;
  color: #0a3a82;
  font-size: 12px;
  line-height: 16px;
}

.saving-tags {
  display: flex;
  gap: 8px;
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
  line-height: 16.5px;
}

.coupon-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  overflow: hidden;
}

.coupon-row article {
  display: flex;
  flex: 0 0 80px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 53px;
  border-radius: 14px;
  background: #ffedd6;
}

.coupon-row strong {
  color: #0a3a82;
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
}

.coupon-row strong span {
  font-size: 16px;
  line-height: 24px;
}

.coupon-row em {
  color: #4a5565;
  font-style: normal;
}

.coupon-row small {
  color: #d96d00;
  font-size: 10px;
  line-height: 15px;
}

.mine-panel {
  margin-top: 12px;
  border-radius: 16px;
  background: #fff;
}

.order-panel {
  padding: 16px;
}

.panel-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.panel-title-row h2 {
  margin: 0;
  color: #101828;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.panel-title-row button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #99a1af;
  font-size: 12px;
  line-height: 16px;
}

.order-grid,
.service-panel {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.order-grid button,
.service-panel button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #101828;
}

.order-grid svg {
  width: 28px;
  height: 28px;
  margin-bottom: 6px;
  color: #374151;
}

.order-grid span,
.service-panel span:last-child {
  color: #101828;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
}

.service-panel {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 16px;
  padding: 20px 16px 16px;
}

.service-icon-wrap {
  position: relative;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin-bottom: 6px;
  color: #364153;
}

.service-icon-wrap svg {
  width: 28px;
  height: 28px;
}

.service-icon-wrap em {
  position: absolute;
  top: -5px;
  right: -10px;
  min-width: 20px;
  height: 14px;
  padding: 0 4px;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 8px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px;
}

.invite-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 63px;
  margin-top: 12px;
  padding: 12px;
  border-radius: 12px;
  background: linear-gradient(100deg, #ff2f24 0%, #df0010 100%);
  color: #fff;
}

.invite-card div {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.invite-card strong {
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  white-space: nowrap;
}

.invite-card span {
  overflow: hidden;
  color: rgba(255, 255, 255, 0.88);
  font-size: 11px;
  line-height: 16.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.invite-card button {
  flex: 0 0 auto;
  min-width: 56px;
  height: 28px;
  margin-left: 10px;
  border: 0;
  border-radius: 999px;
  background: #fffbd0;
  color: #e02212;
  font-size: 12px;
  line-height: 16px;
}

.recommend-section {
  margin-top: 14px;
}

.recommend-section h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 0 10px;
  color: #f4341b;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}

.recommend-section h2 span {
  color: #f4bd21;
}

.mine-product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.mine-product-card {
  min-width: 0;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
}

.mine-product-card img {
  display: block;
  width: 100%;
  height: 170px;
  object-fit: cover;
}

.mine-product-info {
  display: grid;
  gap: 8px;
  padding: 8px;
}

.mine-product-info h3 {
  min-height: 38px;
  margin: 0;
  overflow: hidden;
  color: #101828;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.25px;
}

.delivery-tag {
  justify-self: start;
  min-width: 44px;
  height: 17px;
  padding: 0 6px;
  border: 0.591px solid #d1d5dc;
  border-radius: 4px;
  color: #6a7282;
  font-size: 10px;
  line-height: 15px;
}

.mine-product-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 24px;
}

.mine-price {
  display: flex;
  align-items: flex-end;
  min-width: 0;
}

.mine-price em {
  flex: 0 0 auto;
  height: 19px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #fff0e5;
  color: #f4341b;
  font-size: 10px;
  font-style: normal;
  line-height: 15px;
}

.mine-price strong {
  flex: 0 0 auto;
  margin-left: 4px;
  color: #f4341b;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.mine-price small {
  color: #99a1af;
  font-size: 12px;
  line-height: 16px;
  transform: translateY(-3px);
}

.mine-product-bottom button {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  line-height: 20px;
}
</style>
