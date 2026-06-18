<template>
  <section class="product-detail-page">
    <header class="detail-header">
      <button class="detail-back" type="button" aria-label="返回" @click="$emit('back')">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <nav aria-label="商品详情导航">
        <button class="active" type="button">商品</button>
        <button type="button">评价</button>
        <button type="button">详情</button>
      </nav>
      <button class="detail-capsule" type="button" aria-label="更多">
        <span class="detail-more-icon" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span class="detail-capsule-divider" aria-hidden="true"></span>
        <span class="detail-target-icon" aria-hidden="true"></span>
      </button>
    </header>

    <div class="detail-scroll">
      <section class="detail-hero">
        <img :src="displayProduct.image" :alt="displayProduct.name" loading="lazy" decoding="async" />
      </section>

      <div class="detail-float-tags" aria-hidden="true">
        <span>图片1/6</span>
        <span>评价</span>
      </div>

      <section class="detail-card product-info-card">
        <button class="share-button" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.5 12.5 15.5 8.5M8.5 12.5l7 4" />
            <path d="M6.5 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM17.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM17.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
          </svg>
          分享
        </button>

        <h1>{{ displayProduct.name }}</h1>
        <div class="detail-subline">
          <span>{{ displayProduct.tag ?? '时令' }}</span>
          <p>{{ displayProduct.description ?? '新鲜直达，口感清爽' }}</p>
        </div>

        <div class="detail-price-row">
          <div class="detail-price">
            <small>¥</small>
            <strong>{{ displayProduct.price }}</strong>
            <em>/{{ unit }}</em>
          </div>
          <span>{{ displayProduct.soldText ?? '累计已售11.8万' }}</span>
        </div>

        <div class="ranking-strip">
          <b>TOP 4</b>
          <span>时令水果人气榜 TOP 4</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </div>
      </section>

      <section class="detail-card delivery-card">
        <div>
          <strong>配送</strong>
          <p><span>准时达</span>14:30前下单，预计最快今天17:00-18:00送达</p>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
        </div>
        <div>
          <strong>保障</strong>
          <p>不支持7天无理由退货</p>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
        </div>
      </section>

      <section class="detail-card review-card">
        <div class="detail-section-title">
          <h2>用户评价(1000+)</h2>
          <button type="button">查看全部 <span>›</span></button>
        </div>
        <div class="review-tags">
          <span>品质好(1000+)</span>
          <span>新鲜(1000+)</span>
          <span>分量足(1000+)</span>
        </div>
        <div class="review-user">
          <img src="/case-assets/liangxuan-mini-program/demo-category-assets/images/cat-pet.jpg" alt="" loading="lazy" decoding="async" />
          <div>
            <strong>匿名</strong>
            <span>赞了该商品</span>
          </div>
        </div>
        <p class="review-copy">
          品质好，新鲜，分量足，值得回购，性价比高，包装很好，骑手也很靠谱。
        </p>
        <div class="review-images">
          <img :src="displayProduct.image" alt="" loading="lazy" decoding="async" />
          <img src="/case-assets/liangxuan-mini-program/demo-category-assets/images/product-tomato.jpg" alt="" loading="lazy" decoding="async" />
          <img src="/case-assets/liangxuan-mini-program/demo-activity-assets/images/product-pomelo.png" alt="" loading="lazy" decoding="async" />
        </div>
      </section>

      <section class="detail-card related-card">
        <h2>推荐商品</h2>
        <div class="related-list">
          <article v-for="item in detailRecommendProducts" :key="item.id">
            <img :src="item.image" :alt="item.name" loading="lazy" decoding="async" />
            <h3>{{ item.name }}</h3>
            <div>
              <span>¥{{ item.price }}</span>
              <button type="button" :aria-label="`加入购物车：${item.name}`" @click="$emit('addToCart')">+</button>
            </div>
          </article>
        </div>
      </section>

      <section class="detail-card goods-detail-card">
        <h2>商品详情</h2>
        <div class="detail-banner">
          <img :src="displayProduct.image" alt="" loading="lazy" decoding="async" />
          <div>
            <strong>{{ shortTitle }}</strong>
            <span>鲜切即享，冷藏更清爽</span>
          </div>
        </div>
        <div class="feature-grid">
          <article v-for="item in features" :key="item.title">
            <span>{{ item.icon }}</span>
            <strong>{{ item.title }}</strong>
            <p>{{ item.copy }}</p>
          </article>
        </div>
        <div class="detail-summary">
          <strong>鲜红脆嫩 · 细腻多汁</strong>
          <p>
            严选成熟度合适的生鲜好物，保留自然风味和清爽口感。适合家庭日常、下午茶和便携分享。
          </p>
        </div>
      </section>
    </div>

    <footer class="detail-footer">
      <div class="saving-strip">
        <span>每月可享 12 张券，9.9元开通省钱卡</span>
        <button type="button">立即开通</button>
      </div>
      <div class="detail-action-bar">
        <button class="footer-icon-button" type="button" @click="$emit('goHome')">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4v-9.5Z" /></svg>
          首页
        </button>
        <button class="footer-icon-button" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 20-7-7a4.2 4.2 0 0 1 6-6l1 1 1-1a4.2 4.2 0 0 1 6 6l-7 7Z" /></svg>
          收藏
        </button>
        <button class="footer-icon-button" type="button" @click="$emit('goCart')">
          <span class="footer-cart-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h2l2 10h9.5l2-7H7" /><path d="M9 20h.1M17 20h.1" /></svg>
            <em v-if="cartCount">{{ cartCount }}</em>
          </span>
          购物车
        </button>
        <button class="add-cart-button" type="button" @click="$emit('addToCart')">加入购物车</button>
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { defaultDetailProduct, detailRecommendProducts, detailUnitFor, type DetailProduct } from '../mock/detail'

const props = defineProps<{
  product?: DetailProduct | null
  cartCount: number
}>()

defineEmits<{
  back: []
  addToCart: []
  goHome: []
  goCart: []
}>()

const displayProduct = computed(() => props.product ?? defaultDetailProduct)
const unit = computed(() => detailUnitFor(displayProduct.value))
const shortTitle = computed(() => displayProduct.value.name.split(/[ 　]/)[0] || '精选好物')

const features = [
  { icon: '◎', title: '精选产地', copy: '产地直采，风味稳定' },
  { icon: '☼', title: '光照充足', copy: '自然日照积累糖分' },
  { icon: '◌', title: '土壤肥沃', copy: '根系健康，口感清爽' },
  { icon: '✦', title: '糖分充足', copy: '入口清甜，脆嫩多汁' },
  { icon: '◍', title: '鲜红脆嫩', copy: '果肉饱满，汁水丰盈' },
  { icon: '☘', title: '细腻多汁', copy: '小巧适口，一次刚好' },
]
</script>

<style scoped>
.product-detail-page {
  position: relative;
  display: flex;
  flex-direction: column;
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

.detail-header {
  position: relative;
  z-index: 5;
  flex: 0 0 52.586px;
  height: 52.586px;
  padding: 0;
  border-bottom: 0.591px solid #f3f4f6;
  background: rgba(255, 255, 255, 0.95);
}

.detail-back {
  position: absolute;
  top: 7.995px;
  left: 11.992px;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: transparent;
  color: #030712;
}

.detail-back svg {
  width: 22px;
  height: 22px;
}

.detail-header nav {
  position: absolute;
  top: 0;
  left: 94.776px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 165.947px;
  height: 51.995px;
}

.detail-header nav button {
  position: relative;
  width: 33.983px;
  height: 51.995px;
  padding: 0;
  background: transparent;
  color: #99a1af;
  font-size: 15px;
  line-height: 22.5px;
}

.detail-header nav button.active {
  color: #030712;
  font-weight: 900;
}

.detail-header nav button.active::after {
  position: absolute;
  bottom: 6px;
  left: 50%;
  width: 16px;
  height: 2px;
  border-radius: 999px;
  background: #030712;
  content: '';
  transform: translateX(-50%);
}

.detail-capsule {
  position: absolute;
  top: 11px;
  right: 16px;
  flex: 0 0 78px;
  width: 78.15px;
  height: 29.173px;
  padding: 0;
  border: 0.591px solid #f3f4f6;
  border-radius: 999px;
  background: #f9fafb;
  color: #101828;
}

.detail-more-icon {
  position: absolute;
  top: 4.588px;
  left: 8.586px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5px;
  width: 20px;
  height: 20px;
}

.detail-more-icon i {
  width: 3.2px;
  height: 3.2px;
  border-radius: 999px;
  background: currentColor;
}

.detail-capsule-divider {
  position: absolute;
  top: 8.586px;
  left: 40.575px;
  width: 1px;
  height: 12px;
  background: #e5e7eb;
}

.detail-target-icon {
  position: absolute;
  top: 6.582px;
  left: 53.565px;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-radius: 999px;
}

.detail-target-icon::after {
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

.detail-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 118px;
  scrollbar-width: none;
}

.detail-scroll::-webkit-scrollbar {
  display: none;
}

.detail-hero {
  position: relative;
  display: block;
  height: 380px;
  overflow: hidden;
  border-radius: 0;
  background: #fff;
  clip-path: inset(0);
}

.detail-hero img {
  position: absolute;
  top: 10px;
  left: 50%;
  display: block;
  width: 78.5%;
  height: 340px;
  border-radius: 0;
  object-fit: contain;
  transform: translateX(-50%);
}

.detail-float-tags {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: -38px;
  margin-bottom: 26px;
}

.detail-float-tags span {
  height: 24px;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 11px;
  line-height: 16.5px;
}

.detail-card {
  width: calc(100% - 24px);
  margin: 0 auto 12px;
  border-radius: 16px;
  background: #fff;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.1),
    0 1px 1px rgba(0, 0, 0, 0.1);
}

.product-info-card {
  position: relative;
  height: 212.467px;
  padding: 16px;
}

.share-button {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: #eef8ff;
  color: #1989e8;
  font-size: 12px;
  line-height: 18px;
}

.share-button svg {
  width: 14px;
  height: 14px;
}

.product-info-card h1 {
  max-width: calc(100% - 64px);
  margin: 0;
  overflow: hidden;
  color: #030712;
  font-size: 21px;
  font-weight: 900;
  line-height: 31.5px;
  letter-spacing: -0.88px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-subline {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.detail-subline span {
  flex: 0 0 auto;
  height: 22px;
  padding: 2px 8px;
  border-radius: 4px;
  background: #eaf8ec;
  color: #20a14b;
  font-size: 12px;
  line-height: 18px;
}

.detail-subline p {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: #6a7282;
  font-size: 14px;
  line-height: 21px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 16px;
}

.detail-price {
  display: flex;
  align-items: baseline;
  color: #f4341b;
}

.detail-price small {
  font-size: 18px;
  font-weight: 900;
  line-height: 27px;
}

.detail-price strong {
  margin-left: 2px;
  font-size: 34px;
  font-weight: 900;
  line-height: 51px;
  letter-spacing: -1.31px;
}

.detail-price em {
  margin-left: 4px;
  color: #6a7282;
  font-size: 13px;
  font-style: normal;
  line-height: 19.5px;
}

.detail-price-row > span {
  margin-bottom: 8px;
  color: #6a7282;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
}

.ranking-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  margin-top: 12px;
  padding: 0 12px;
  border: 0.591px solid #ffe3b0;
  border-radius: 14px;
  background: linear-gradient(90deg, #fff4df 0%, #fff9f0 100%);
  color: #8a4b00;
}

.ranking-strip b {
  flex: 0 0 auto;
  padding: 2px 6px;
  border-radius: 4px;
  background: #ff8a00;
  color: #fff;
  font-size: 10px;
  line-height: 15px;
}

.ranking-strip span {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  font-size: 13px;
  line-height: 19.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ranking-strip svg,
.delivery-card svg {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
}

.delivery-card {
  display: grid;
  gap: 12px;
  padding: 16px;
}

.delivery-card div {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 16px;
  align-items: start;
  gap: 12px;
}

.delivery-card strong {
  color: #6a7282;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
}

.delivery-card p {
  margin: 0;
  color: #101828;
  font-size: 13px;
  line-height: 19.5px;
}

.delivery-card p span {
  display: inline-flex;
  height: 18px;
  margin-right: 8px;
  padding: 0 6px;
  border: 0.5px solid #279cff;
  border-radius: 4px;
  color: #279cff;
  font-size: 10px;
  line-height: 18px;
}

.review-card {
  padding: 16px;
}

.detail-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.detail-section-title h2,
.related-card h2,
.goods-detail-card h2 {
  margin: 0;
  color: #030712;
  font-size: 18px;
  font-weight: 900;
  line-height: 27px;
  letter-spacing: -0.44px;
}

.detail-section-title button {
  flex: 0 0 auto;
  padding: 0;
  background: transparent;
  color: #6a7282;
  font-size: 13px;
  line-height: 19.5px;
}

.review-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.review-tags span {
  height: 30px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #fff0e9;
  color: #d85021;
  font-size: 12px;
  line-height: 18px;
}

.review-user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.review-user img {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  object-fit: cover;
}

.review-user div {
  display: grid;
}

.review-user strong {
  color: #101828;
  font-size: 13px;
  font-weight: 400;
  line-height: 19.5px;
}

.review-user span {
  color: #ff7a00;
  font-size: 12px;
  line-height: 18px;
}

.review-copy {
  margin: 12px 0 0;
  color: #1e2939;
  font-size: 14px;
  line-height: 23.1px;
}

.review-images {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.review-images img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 14px;
  background: #f3f4f6;
  object-fit: cover;
}

.related-card {
  padding: 16px;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.related-list article {
  min-width: 0;
}

.related-list img {
  display: block;
  width: 100%;
  height: 78px;
  border-radius: 12px;
  background: #f3f4f6;
  object-fit: cover;
}

.related-list h3 {
  min-height: 32px;
  margin: 7px 0 5px;
  overflow: hidden;
  color: #101828;
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
}

.related-list div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.related-list span {
  color: #f4341b;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
}

.related-list button {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 17px;
  line-height: 18px;
}

.goods-detail-card {
  padding: 16px;
}

.detail-banner {
  position: relative;
  min-height: 260px;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 16px;
  background: radial-gradient(circle at 52% 20%, #fff 0, #e8f8ec 48%, #cbeed2 100%);
}

.detail-banner img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.88;
}

.detail-banner div {
  position: absolute;
  left: 20px;
  top: 20px;
  display: grid;
  gap: 4px;
  color: #fff;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
}

.detail-banner strong {
  font-size: 24px;
  font-weight: 900;
  line-height: 36px;
}

.detail-banner span {
  font-size: 13px;
  line-height: 19.5px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.feature-grid article {
  min-width: 0;
  padding: 12px;
  border: 0.591px solid #f3f4f6;
  border-radius: 16px;
  background: #fafafa;
}

.feature-grid span {
  color: #20a14b;
  font-size: 16px;
}

.feature-grid strong {
  display: inline-block;
  margin-left: 6px;
  color: #030712;
  font-size: 15px;
  line-height: 22.5px;
}

.feature-grid p {
  margin: 8px 0 0;
  color: #6a7282;
  font-size: 12px;
  line-height: 17.4px;
}

.detail-summary {
  margin-top: 16px;
  padding: 16px;
  border-radius: 16px;
  background: #fff5f2;
}

.detail-summary strong {
  color: #f4341b;
  font-size: 18px;
  font-weight: 900;
  line-height: 27px;
}

.detail-summary p {
  margin: 8px 0 0;
  color: #364153;
  font-size: 13px;
  line-height: 22.1px;
}

.detail-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  background: #fff;
  box-shadow: 0 -4px 9px rgba(0, 0, 0, 0.06);
}

.saving-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  padding: 0 12px;
  background: #fff2e8;
}

.saving-strip span {
  min-width: 0;
  overflow: hidden;
  color: #8a4b00;
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.saving-strip button {
  flex: 0 0 auto;
  width: 88px;
  height: 32px;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 14px;
  line-height: 24px;
}

.detail-action-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 68px;
  padding: 0 12px;
}

.footer-icon-button {
  display: grid;
  justify-items: center;
  flex: 0 0 auto;
  gap: 4px;
  padding: 0;
  background: transparent;
  color: #4a5565;
  font-size: 11px;
  line-height: 16.5px;
}

.footer-icon-button svg {
  width: 20px;
  height: 20px;
}

.footer-cart-icon {
  position: relative;
}

.footer-cart-icon em {
  position: absolute;
  top: -7px;
  right: -9px;
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 10px;
  font-style: normal;
  line-height: 16px;
}

.add-cart-button {
  display: grid;
  place-items: center;
  flex: 1 1 auto;
  height: 44px;
  border-radius: 999px;
  background: #1e88e5;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  line-height: 24px;
  box-shadow:
    0 4px 6px #dbeafe,
    0 2px 4px #dbeafe;
}
</style>
