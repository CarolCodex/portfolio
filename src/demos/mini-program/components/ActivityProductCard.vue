<template>
  <article
    class="activity-product-card"
    :class="type"
    role="button"
    tabindex="0"
    :aria-label="`查看商品详情：${product.name}`"
    @click="$emit('open', product)"
    @keydown.enter.prevent="$emit('open', product)"
    @keydown.space.prevent="$emit('open', product)"
  >
    <template v-if="type === 'presale'">
      <div class="presale-bar">
        <span class="presale-assurance">
          <i aria-hidden="true"></i>
          正品保障 · 预售抢鲜
        </span>
        <span class="presale-status">
          <i aria-hidden="true"></i>
          {{ product.soldText ?? '预售中' }}
        </span>
      </div>

      <div class="presale-body">
        <div class="product-image-wrap">
          <img :src="product.image" :alt="product.name" loading="lazy" decoding="async" />
          <span class="presale-image-badge">{{ product.badge }}</span>
        </div>

        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <div class="presale-benefits">
            <em>{{ product.deposit }}｜{{ product.discount }}</em>
          </div>
          <small class="presale-original-price">日常价 ¥{{ product.originalPrice }}</small>
          <div class="presale-purchase-row">
            <div class="product-price presale-price">
              <span class="price-prefix">预售价</span>
              <span class="price-symbol">¥</span>
              <strong class="price-number">{{ product.price }}</strong>
            </div>
            <button type="button" @click.stop="$emit('add', $event)">{{ product.actionText }}</button>
          </div>
        </div>
      </div>

      <div class="presale-steps">
        <span v-for="(step, index) in product.steps" :key="step.label" :class="{ active: index === 0 }">
          <b>{{ index + 1 }}</b>
          <strong>{{ step.label }}</strong>
          <small>{{ step.note }}</small>
        </span>
      </div>
    </template>

    <template v-else-if="type === 'seckill'">
      <div class="product-image-wrap">
        <img :src="product.image" :alt="product.name" loading="lazy" decoding="async" />
        <span class="flash-status-badge" :class="{ waiting: product.waiting }">
          <i :class="product.waiting ? 'clock-mini' : 'flame-mini'" aria-hidden="true"></i>
          {{ product.soldText }}
        </span>
        <span class="flash-image-mask">{{ product.waiting ? '敬请期待' : '疯狂抢购中' }}</span>
      </div>

        <div class="product-info">
          <div class="flash-heading">
          <h3>
            <span>{{ product.badge }}</span>
            {{ product.name }}
          </h3>
        </div>

        <div class="flash-countdown">
          <span>{{ product.waiting ? '距开始' : '距结束' }}</span>
          <b v-for="(time, index) in displayCountdown" :key="`${time}-${index}`">
            {{ time }}
          </b>
        </div>

        <div v-if="!product.waiting" class="flash-progress">
          <div>
            <span>已抢 {{ product.progress }}%</span>
            <em>{{ product.stockText }}</em>
          </div>
          <i><b :style="{ width: `${product.progress}%` }"></b></i>
        </div>

        <div class="flash-buy-row">
          <div class="flash-price-wrap">
            <small>日常价 ¥{{ product.originalPrice }}</small>
            <strong class="product-price">
              <span class="price-symbol">¥</span>
              <span class="price-number">{{ product.price }}</span>
            </strong>
          </div>
          <button type="button" :class="{ waiting: product.waiting }" @click.stop="$emit('add', $event)">
            <i :class="product.waiting ? 'bell-mini' : 'bolt-mini'" aria-hidden="true"></i>
            {{ product.actionText }}
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="product-image-wrap">
        <img :src="product.image" :alt="product.name" loading="lazy" decoding="async" />
        <span v-if="product.rank" class="rank-badge" :class="rankClass(product.rank)">{{ product.rank }}</span>
        <span v-else-if="product.groupSize" class="group-badge">
          <i aria-hidden="true"></i>
          {{ product.groupSize }}
        </span>
        <span v-if="product.soldText && type === 'group'" class="sold-mask">{{ product.soldText }}</span>
      </div>

      <div class="product-info">
        <template v-if="type === 'hot'">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <span class="hot-tag">{{ product.tag }}</span>
        <div class="price-row">
          <strong class="product-price">
            <span class="price-symbol">¥</span>
            <span class="price-number">{{ product.price }}</span>
          </strong>
          <button type="button" aria-label="加入购物车" @click.stop="$emit('add', $event)">
            <i aria-hidden="true"></i>
          </button>
        </div>
      </template>

        <template v-else-if="type === 'group'">
        <h3>{{ product.name }}</h3>
        <div class="label-row">
          <span class="group-selling-tag">{{ product.description }}</span>
          <span v-if="product.service" class="activity-delivery-tag">
            <img :src="deliveryIconFor(product.service)" alt="" aria-hidden="true" decoding="async" />
            <span>{{ product.service }}</span>
          </span>
        </div>
        <div class="group-buy-footer">
          <div class="group-price-wrap">
            <div class="group-price-line">
              <span class="price-label group-price-label">拼团价</span>
              <small v-if="product.originalPrice" class="group-original-price">单买价 ¥{{ product.originalPrice }}</small>
            </div>
            <div class="group-deal-line">
              <strong class="product-price group-price">
                <span class="price-symbol">¥</span>
                <span class="price-number">{{ product.price }}</span>
              </strong>
            </div>
          </div>
          <button class="group-cart-button" type="button" @click.stop="$emit('add', $event)">
            <img :src="cartIcon" alt="" aria-hidden="true" decoding="async" />
            <span>{{ product.actionText }}</span>
          </button>
        </div>
        </template>

        <template v-else></template>
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ActivityProduct, ActivityType } from '../mock/activity'
import type { DetailProduct } from '../mock/detail'

const props = defineProps<{ product: ActivityProduct; type: ActivityType }>()
defineEmits<{ add: [event: MouseEvent]; open: [product: DetailProduct] }>()

const cartIcon = '/case-assets/liangxuan-mini-program/demo-activity-assets/icons/cart-white.svg'

const deliveryIconMap: Record<string, string> = {
  次日达: '/case-assets/liangxuan-mini-program/demo-activity-assets/icons/delivery-nextday.svg',
  京东冷链: '/case-assets/liangxuan-mini-program/demo-activity-assets/icons/delivery-coldchain.svg',
}

function deliveryIconFor(service: string) {
  return deliveryIconMap[service] ?? deliveryIconMap['次日达']
}

function rankClass(rank: string) {
  const rankNumber = rank.match(/\d+/)?.[0] ?? '1'
  return `rank-${rankNumber}`
}

const countdownSeconds = ref(countdownToSeconds(props.product.countdown))
let countdownTimer: number | undefined

const displayCountdown = computed<[string, string, string]>(() => secondsToCountdown(countdownSeconds.value))

function countdownToSeconds(countdown?: [string, string, string]) {
  if (!countdown) return 0

  const [hours, minutes, seconds] = countdown.map((value) => Number.parseInt(value, 10) || 0)
  return Math.max(0, hours * 3600 + minutes * 60 + seconds)
}

function secondsToCountdown(totalSeconds: number): [string, string, string] {
  const safeSeconds = Math.max(0, totalSeconds)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')) as [string, string, string]
}

function startCountdown() {
  stopCountdown()

  if (props.type !== 'seckill' || countdownSeconds.value <= 0 || document.hidden) return

  countdownTimer = window.setInterval(() => {
    countdownSeconds.value = Math.max(0, countdownSeconds.value - 1)

    if (countdownSeconds.value === 0) {
      stopCountdown()
    }
  }, 1000)
}

function stopCountdown() {
  if (countdownTimer !== undefined) {
    window.clearInterval(countdownTimer)
    countdownTimer = undefined
  }
}

function handleVisibilityChange() {
  document.hidden ? stopCountdown() : startCountdown()
}

watch(
  () => props.product.countdown,
  (countdown) => {
    countdownSeconds.value = countdownToSeconds(countdown)
    startCountdown()
  },
)

onMounted(() => {
  startCountdown()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  stopCountdown()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
.activity-product-card {
  position: relative;
  display: grid;
  grid-template-columns: 128px minmax(0, 1fr);
  align-items: start;
  gap: 12px;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
  padding: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
}

.activity-product-card.hot {
  grid-template-columns: 128px minmax(0, 1fr);
  gap: 12px;
  min-height: 153px;
  padding: 12px;
  border: 1px solid rgba(255, 237, 235, 0.86);
  border-radius: 22px;
  background: #fffdfc;
  box-shadow: 0 10px 24px rgba(244, 52, 27, 0.045);
}

.activity-product-card.group {
  grid-template-columns: clamp(104px, 32%, 112px) minmax(0, 1fr);
  justify-content: start;
  align-items: start;
  gap: 10px;
  min-height: 0;
  padding: 12px;
  border: 1px solid #ffedd4;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.activity-product-card.presale {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  min-height: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid #dfe6ff;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 8px 22px rgba(68, 88, 180, 0.08);
}

.activity-product-card.seckill {
  grid-template-columns: 128px minmax(0, 1fr);
  align-items: start;
  gap: 11px;
  min-height: 191px;
  padding: 20px 10px;
  border: 1px solid #ffd0c8;
  border-radius: 20px;
  background:
    radial-gradient(circle at 82% 10%, rgba(255, 255, 255, 0.86), transparent 35%),
    linear-gradient(180deg, #fff2ef 0%, #fff8f6 100%);
  box-shadow: 0 8px 18px rgba(244, 52, 27, 0.05);
}

.activity-product-card.seckill.waiting,
.activity-product-card.seckill:has(.flash-status-badge.waiting) {
  min-height: 169px;
  border-color: #edf0f5;
  background: #fff;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.035);
}

.product-image-wrap {
  position: relative;
  align-self: start;
  width: 128px;
  height: 128px;
  overflow: hidden;
  border: 1px solid #f3f4f6;
  border-radius: 14px;
  background: #f9fafb;
}

.group .product-image-wrap {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}

.hot .product-image-wrap {
  width: 128px;
  height: 128px;
  border-color: #f0f1f5;
  border-radius: 18px;
  background: #fff;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.72);
}

.product-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hot .product-image-wrap img {
  object-fit: contain;
}

.rank-badge,
.group-badge,
.status-badge {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 20px;
  padding: 0 8px;
  border-radius: 0 0 10px;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  line-height: 20px;
}

.rank-badge {
  gap: 3px;
  min-width: 65px;
  height: 20px;
  padding: 0 8px 0 7px;
  border-radius: 0 0 11px 0;
  background: linear-gradient(135deg, #ffbf24 0%, #ff9800 100%);
  font-style: italic;
  font-size: 12px;
  font-weight: 900;
  line-height: 20px;
  text-shadow: 0 1px 1px rgba(122, 49, 0, 0.12);
}

.rank-badge::before {
  content: '';
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  background: currentColor;
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/trophy.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/trophy.svg') center / contain no-repeat;
}

.rank-badge.rank-2 {
  background: linear-gradient(135deg, #dce3ed 0%, #aeb7c5 100%);
}

.rank-badge.rank-3 {
  background: linear-gradient(135deg, #f6a05a 0%, #d96b24 100%);
}

.rank-badge.rank-4 {
  background: linear-gradient(135deg, #f064a1 0%, #d93b7d 100%);
}

.rank-badge.rank-5 {
  background: linear-gradient(135deg, #ff737d 0%, #f14555 100%);
}

.group-badge {
  background: linear-gradient(90deg, #ff7a00, #ff5c00);
  font-weight: 400;
}

.group-badge i {
  width: 14px;
  height: 14px;
  background: currentColor;
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/users.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/users.svg') center / contain no-repeat;
}

.status-badge {
  background: linear-gradient(90deg, #f4341b, #ff5d47);
  font-weight: 400;
}

.status-badge.waiting {
  background: #1e2939;
}

.sold-mask {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 32px;
  padding-top: 14px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.58), transparent);
  color: #fff;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
}

.seckill .product-image-wrap {
  width: 128px;
  height: 128px;
  border-color: #f1f2f6;
  border-radius: 16px;
  background: #fff;
}

.seckill .product-image-wrap img {
  object-fit: cover;
}

.flash-status-badge {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 20px;
  min-width: 72px;
  padding: 0 9px;
  border-radius: 0 0 10px;
  background: #f4341b;
  color: #fff;
  font-size: 10px;
  line-height: 15px;
  white-space: nowrap;
}

.flash-status-badge.waiting {
  background: #172235;
}

.flash-status-badge i {
  display: block;
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  background: currentColor;
}

.flame-mini {
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/flash-flame.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/flash-flame.svg') center / contain no-repeat;
}

.flash-status-badge .flame-mini::after {
  content: none;
}

.flash-image-mask {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  height: 35px;
  padding-top: 17px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.62));
  color: #fff;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
}

.product-info {
  min-width: 0;
  max-width: 204px;
}

h3,
p,
small {
  margin: 0;
}

h3 {
  display: -webkit-box;
  overflow: hidden;
  color: #101828;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

p {
  overflow: hidden;
  color: #6a7282;
  font-size: 12px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

small {
  display: block;
  color: #99a1af;
  font-size: 11px;
  line-height: 16px;
}

.hot .product-info {
  display: flex;
  flex-direction: column;
  min-height: 128px;
  max-width: none;
  justify-content: flex-start;
  gap: 0;
  padding-top: 2px;
}

.hot .product-info h3 {
  color: #101828;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0;
  -webkit-line-clamp: 2;
}

.hot .product-info p {
  margin-top: 7px;
  color: #6b7280;
  font-size: 14px;
  line-height: 18px;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.hot-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  align-self: flex-start;
  height: 21px;
  margin-top: 8px;
  padding: 0 9px 0 7px;
  border-radius: 6px;
  background: #fff0f3;
  color: #ec003f;
  font-size: 13px;
  line-height: 21px;
  white-space: nowrap;
}

.hot-tag::before {
  content: '';
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  background: currentColor;
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/flash-flame.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/flash-flame.svg') center / contain no-repeat;
}

.price-row,
.action-row {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 8px;
}

.product-price {
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  min-width: 0;
  color: #f4341b;
  font-family: Inter, 'PingFang SC', sans-serif;
  font-size: 20px;
  font-weight: 800;
  line-height: 20px;
  letter-spacing: 0;
  white-space: nowrap;
}

.price-prefix,
.price-label {
  color: #f4341b;
  font-family: 'PingFang SC', sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
}

.price-prefix {
  margin-right: 2px;
  font-size: 12px;
  line-height: 17px;
}

.price-symbol {
  color: inherit;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

.price-number {
  color: inherit;
  font: inherit;
}

.price-row strong,
.action-row strong,
.deal-price strong {
  color: #f4341b;
  font-size: 20px;
  font-weight: 800;
  line-height: 24px;
  white-space: nowrap;
}

.hot .price-row {
  width: 100%;
  margin-top: auto;
  align-items: center;
}

.hot .price-row strong {
  line-height: 20px;
}

.hot .price-row strong span {
  line-height: inherit;
}

.price-row button,
.hot .price-row button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, #ff412b 0%, #f4341b 100%);
  color: #fff;
  box-shadow: 0 6px 10px rgba(244, 52, 27, 0.24);
  cursor: pointer;
}

.price-row button i {
  width: 22px;
  height: 22px;
  background: currentColor;
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/plus.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/plus.svg') center / contain no-repeat;
}

.label-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
}

.label-row > span:not(.activity-delivery-tag) {
  height: 20px;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 11px;
  font-style: normal;
  line-height: 16px;
  white-space: nowrap;
}

.label-row > span.group-selling-tag {
  background: #fff7ed;
  color: #f54900;
  font-size: 10px;
  padding: 2px 5px;
}

.activity-delivery-tag {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  height: 17px;
  margin-top: 2px;
  padding: 0 5px 0 4px;
  border: 1px solid #b9f8cf;
  border-radius: 6px;
  background: #f0fdf4;
  color: #00a63e;
  font-size: 10px;
  font-style: normal;
  line-height: 15px;
  white-space: nowrap;
}

.activity-delivery-tag img {
  display: block;
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
}

.group small {
  line-height: 17px;
}

.group .product-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 7px;
  width: 100%;
  max-width: 204px;
  min-width: 0;
}

.group h3 {
  width: 100%;
  -webkit-line-clamp: 2;
}

.group .label-row {
  margin-top: 0;
}

.group-buy-footer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  min-width: 0;
}

.group-price-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: 0;
}

.group-price-label {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  height: 18px;
  padding: 1px 5px;
  border-radius: 6px;
  background: #fef2f2;
  color: #f4341b;
  line-height: 15px;
  white-space: nowrap;
}

.group-price {
  flex: 0 0 auto;
}

.group-price-line {
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  min-width: 0;
}

.group-deal-line {
  max-width: 100%;
  min-width: 0;
}

.group-original-price {
  display: inline-block;
  flex: 0 1 auto;
  overflow: hidden;
  color: #99a1af;
  font-size: 11px;
  line-height: 16px;
  text-decoration: line-through;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.group-cart-button {
  align-self: end;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 108px;
  height: 30px;
  padding: 5px 12px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff7a00 0%, #fe7603 7%, #fd6d0a 21%, #fb6011 43%, #fa5b13 50%, #f85216 64%, #f74718 79%, #f43b1a 93%, #f4341b 100%);
  color: #fff;
  box-shadow: 0 4px 3px rgba(255, 214, 168, 0.5), 0 2px 2px rgba(255, 214, 168, 0.5);
  cursor: pointer;
}

.group-cart-button img {
  display: block;
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
}

.group-cart-button span {
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  white-space: nowrap;
}

.group .action-row {
  align-items: center;
  margin-top: 10px;
}

.seckill button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 92px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff7a00, #f4341b);
  color: #fff;
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
  cursor: pointer;
}

.cart-mini,
.bolt-mini,
.clock-mini,
.bell-mini {
  width: 14px;
  height: 14px;
  background: currentColor;
}

.cart-mini {
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/cart.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/cart.svg') center / contain no-repeat;
}

.bolt-mini {
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/bolt.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/bolt.svg') center / contain no-repeat;
}

.clock-mini {
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/clock.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/clock.svg') center / contain no-repeat;
}

.bell-mini {
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/bell-alert.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/bell-alert.svg') center / contain no-repeat;
}

.bell-mini::after {
  content: none;
}

.seckill .product-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 9px;
  width: 100%;
  max-width: 204px;
  min-width: 0;
}

.flash-heading {
  min-width: 0;
  min-height: 50px;
}

.flash-heading span {
  display: inline-flex;
  align-items: center;
  height: 20px;
  margin-right: 7px;
  padding: 2px 6px;
  border-radius: 6px;
  background: #f4341b;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 13px;
  vertical-align: 3px;
  white-space: nowrap;
}

.seckill:has(.flash-status-badge.waiting) .flash-heading span {
  border: 1px solid #ffc4bd;
  background: #fff1f0;
  color: #f4341b;
}

.flash-heading h3 {
  display: -webkit-box;
  overflow: hidden;
  color: #101828;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.flash-countdown {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.flash-countdown span {
  flex: 0 0 auto;
  color: #f4341b;
  font-size: 12px;
  line-height: 17px;
}

.seckill:has(.flash-status-badge.waiting) .flash-countdown span {
  color: #667085;
}

.flash-countdown b {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 22px;
  border-radius: 6px;
  background: #f4341b;
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  line-height: 17px;
}

.flash-countdown b:not(:last-child) {
  margin-right: 7px;
}

.flash-countdown b:not(:last-child)::after {
  content: ':';
  position: absolute;
  right: -8px;
  color: #f4341b;
  font-weight: 800;
}

.seckill:has(.flash-status-badge.waiting) .flash-countdown b {
  background: #172235;
}

.seckill:has(.flash-status-badge.waiting) .flash-countdown b::after {
  color: #172235;
}

.flash-progress {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.flash-progress div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
}

.flash-progress span {
  color: #f4341b;
  font-size: 12px;
  line-height: 15px;
  white-space: nowrap;
}

.flash-progress em {
  color: #667085;
  font-size: 12px;
  font-style: normal;
  line-height: 15px;
  white-space: nowrap;
}

.flash-progress i {
  display: block;
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #ffe0dd;
}

.flash-progress i b {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff6b5f, #f4341b);
}

.flash-buy-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  margin-top: auto;
}

.flash-price-wrap {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.flash-price-wrap small {
  display: inline-block;
  color: #98a2b3;
  font-size: 12px;
  line-height: 14px;
  text-decoration: line-through;
  white-space: nowrap;
}

.flash-price-wrap strong {
  line-height: 20px;
}

.flash-price-wrap strong span {
  line-height: inherit;
}

.seckill .flash-buy-row button {
  flex: 0 0 auto;
  gap: 6px;
  min-width: 96px;
  height: 34px;
  padding: 7px 14px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff6a4d, #f4341b);
  box-shadow: 0 8px 14px rgba(244, 52, 27, 0.24);
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  line-height: 20px;
}

.seckill .flash-buy-row button.waiting {
  min-width: 110px;
  border: 1px solid #f4341b;
  background: #fff;
  box-shadow: none;
  color: #f4341b;
}

.presale-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 32px;
  padding: 0 12px;
  background: linear-gradient(90deg, #5749ff 0%, #315cff 54%, #2b8cff 100%);
  color: #fff;
}

.presale-assurance,
.presale-status {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  color: #fff;
  white-space: nowrap;
}

.presale-assurance {
  gap: 6px;
  font-size: 12px;
  line-height: 17px;
}

.presale-status {
  flex: 0 0 auto;
  gap: 4px;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  font-size: 10px;
  line-height: 15px;
}

.presale-assurance i,
.presale-status i {
  display: block;
  flex: 0 0 auto;
  background: currentColor;
}

.presale-assurance i {
  width: 14px;
  height: 14px;
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/shield.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/shield.svg') center / contain no-repeat;
}

.presale-status i {
  width: 12px;
  height: 12px;
  opacity: 0.9;
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/clock.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/clock.svg') center / contain no-repeat;
}

.presale-body {
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  align-items: start;
  gap: 12px;
  padding: 12px 12px 12px;
}

.presale .product-image-wrap {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  border-color: #edf1ff;
  border-radius: 16px;
  background: #f8faff;
}

.presale .product-image-wrap img {
  object-fit: contain;
  padding: 4px;
}

.presale-image-badge {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 0 8px;
  border-radius: 0 0 10px;
  background: linear-gradient(135deg, #5749ff, #2f6bff);
  color: #fff;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
}

.presale .product-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 7px;
  width: 100%;
  max-width: 220px;
  min-width: 0;
}

.presale h3 {
  width: 100%;
  color: #101828;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  -webkit-line-clamp: 2;
}

.presale-benefits {
  display: flex;
  min-width: 0;
}

.presale-benefits em {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 22px;
  padding: 2px 7px;
  overflow: hidden;
  border: 1px solid #d8ddff;
  border-radius: 7px;
  background: #f3f5ff;
  color: #4f46e5;
  font-size: 11px;
  font-style: normal;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.presale-original-price {
  display: inline-block;
  align-self: flex-start;
  color: #98a2b3;
  font-size: 11px;
  line-height: 15px;
  text-decoration: line-through;
}

.presale-purchase-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}

.presale-price {
  flex: 1 1 auto;
}

.presale-price span {
  line-height: inherit;
}

.presale-price strong {
  line-height: inherit;
}

.presale button {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  height: 28px;
  padding: 5px 13px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #5a4bff, #246dff);
  color: #fff;
  box-shadow: 0 6px 12px rgba(49, 92, 255, 0.24);
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  cursor: pointer;
}

.presale-steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  min-height: 71px;
  padding: 10px 12px 9px;
  border-top: 1px solid #edf2ff;
  background: #f8faff;
}

.presale-steps::before {
  content: '';
  position: absolute;
  top: 18px;
  left: 18%;
  right: 18%;
  height: 1px;
  background: #d8e0ee;
}

.presale-steps span {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 2px;
  min-width: 0;
  color: #64748b;
}

.presale-steps b {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #d8e1ef;
  color: #fff;
  font-size: 10px;
  line-height: 16px;
}

.presale-steps span.active b {
  background: #5749ff;
}

.presale-steps strong {
  color: #344054;
  font-size: 11px;
  font-weight: 400;
  line-height: 15px;
}

.presale-steps small {
  color: #8ba0bc;
  font-size: 10px;
  line-height: 14px;
}

</style>
