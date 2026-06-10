<template>
  <section class="mini-home">
    <header class="store-header">
      <div class="location-row">
        <div class="location-copy">
          <img
            class="mini-location-icon"
            src="/case-assets/liangxuan-mini-program/demo-home-assets/icons/location.svg"
            alt=""
            aria-hidden="true"
          />
          <strong>中海·天府里迎晖一期</strong>
          <img
            class="mini-chevron-icon"
            src="/case-assets/liangxuan-mini-program/demo-home-assets/icons/chevron-down.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
        <button class="mini-header-action" type="button" aria-label="更多">
          <img
            class="mini-more-icon"
            src="/case-assets/liangxuan-mini-program/demo-home-assets/icons/more.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="search-shell">
        <div class="search-box">
          <img
            class="mini-search-icon"
            src="/case-assets/liangxuan-mini-program/demo-home-assets/icons/search.svg"
            alt=""
            aria-hidden="true"
          />
          <input type="search" placeholder="食春菜" aria-label="搜索商品" readonly />
        </div>
        <button type="button">搜索</button>
      </div>
    </header>

    <div class="home-scroll">
      <section class="newbie-card">
        <div class="section-strip">
          <div>
            <strong>新人专区</strong>
            <span>|</span>
            <em>任选1件</em>
          </div>
          <button type="button">查看更多&gt;</button>
        </div>
        <div class="newbie-list">
          <article v-for="product in newbieProducts" :key="product.id" class="newbie-product">
            <img class="newbie-product-image" :src="product.image" :alt="product.name" loading="lazy" decoding="async" />
            <div class="newbie-name">
              <span>{{ product.tag }}</span>
              <strong>{{ product.name }}</strong>
            </div>
            <div class="newbie-price">
              <em>¥{{ product.price }}</em>
              <button class="newbie-add-button" type="button" aria-label="加入购物车" @click="$emit('addToCart')">
                <img
                  src="/case-assets/liangxuan-mini-program/demo-home-assets/icons/newbie-add.svg"
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
          </article>
        </div>
      </section>

      <MiniCategoryGrid @select="$emit('selectCategory')" />

      <section class="promo-grid" aria-label="卡片专区">
        <article
          v-for="item in promoCards"
          :key="item.id"
          role="button"
          tabindex="0"
          :aria-label="`进入${item.title}`"
          :style="{ background: item.gradient }"
          @click="handlePromoOpen(item.activityType)"
          @keydown.enter.prevent="handlePromoOpen(item.activityType)"
          @keydown.space.prevent="handlePromoOpen(item.activityType)"
        >
          <div class="promo-copy">
            <div class="promo-title-row">
              <img
                class="promo-title-image"
                :src="item.titleImage"
                :alt="item.title"
                loading="lazy"
                decoding="async"
                :style="{ width: `${item.titleImageWidth}px`, height: `${item.titleImageHeight}px` }"
              />
              <span v-if="item.badge" :style="{ background: item.badgeTone }">{{ item.badge }}</span>
            </div>
            <p :class="{ accent: item.titleTone }">{{ item.subtitle }}</p>
          </div>
          <div class="promo-products">
            <div v-for="product in item.products" :key="product.image" class="promo-product">
              <img :src="product.image" alt="" loading="lazy" decoding="async" />
              <em>
                <span>¥ {{ product.priceMain }}</span>
                <small>{{ product.priceDecimal }}</small>
              </em>
            </div>
          </div>
        </article>
      </section>

      <section class="home-channel-section" aria-label="首页频道商品">
        <nav class="home-channel-tabs" aria-label="频道切换">
          <button
            v-for="tab in channelTabs"
            :key="tab.id"
            class="home-channel-tab"
            :class="{ active: activeChannel === tab.id }"
            type="button"
            @click="setActiveChannel(tab.id)"
          >
            <strong>{{ tab.title }}</strong>
            <span>{{ tab.subtitle }}</span>
          </button>
        </nav>

        <div class="home-goods-masonry">
          <div class="home-goods-column">
            <div class="home-banner-card" role="button" tabindex="0" :aria-label="activeBanner.alt">
              <img :key="activeBanner.id" :src="activeBanner.image" :alt="activeBanner.alt" loading="lazy" decoding="async" />
              <span class="home-banner-dots">
                <button
                  v-for="(banner, index) in homeBanners"
                  :key="banner.id"
                  class="home-banner-dot"
                  :class="{ active: activeBannerIndex === index }"
                  type="button"
                  :aria-label="`切换到第 ${index + 1} 张广告`"
                  @click.stop="setActiveBanner(index)"
                />
              </span>
            </div>
            <MiniProductCard
              v-for="product in leftColumnGoods"
              :key="product.id"
              :product="product"
              @add="$emit('addToCart')"
            />
          </div>

          <div class="home-goods-column">
            <MiniProductCard
              v-for="product in rightColumnGoods"
              :key="product.id"
              :product="product"
              @add="$emit('addToCart')"
            />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import MiniCategoryGrid from './MiniCategoryGrid.vue'
import MiniProductCard from './MiniProductCard.vue'
import { channelTabs, homeBanners, homeGoods, newbieProducts, promoCards, type ChannelTab } from '../mock/home'
import type { ActivityType } from '../mock/activity'

const emit = defineEmits<{
  addToCart: []
  selectCategory: []
  openActivity: [type: ActivityType]
}>()

const activeChannel = ref<ChannelTab['id']>('hot')
const activeBannerIndex = ref(0)
let bannerTimer: number | undefined

const activeChannelIndex = computed(() => {
  const index = channelTabs.findIndex((tab) => tab.id === activeChannel.value)
  return Math.max(index, 0)
})

const activeBanner = computed(() => homeBanners[activeBannerIndex.value] ?? homeBanners[0])

const channelGoods = computed(() => {
  if (activeChannel.value === 'hot') {
    return homeGoods
  }

  const offset = activeChannelIndex.value % homeGoods.length
  return [...homeGoods.slice(offset), ...homeGoods.slice(0, offset)]
})

const leftColumnGoods = computed(() => channelGoods.value.filter((_, index) => index % 2 === 1))
const rightColumnGoods = computed(() => channelGoods.value.filter((_, index) => index % 2 === 0))

function setActiveChannel(channel: ChannelTab['id']) {
  activeChannel.value = channel
}

function handlePromoOpen(type: ActivityType) {
  emit('openActivity', type)
}

function startBannerAutoplay() {
  stopBannerAutoplay()

  if (homeBanners.length <= 1 || document.hidden) {
    return
  }

  bannerTimer = window.setInterval(() => {
    activeBannerIndex.value = (activeBannerIndex.value + 1) % homeBanners.length
  }, 3000)
}

function stopBannerAutoplay() {
  if (bannerTimer !== undefined) {
    window.clearInterval(bannerTimer)
    bannerTimer = undefined
  }
}

function setActiveBanner(index: number) {
  activeBannerIndex.value = index % homeBanners.length
  startBannerAutoplay()
}

function handleVisibilityChange() {
  document.hidden ? stopBannerAutoplay() : startBannerAutoplay()
}

onMounted(() => {
  startBannerAutoplay()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  stopBannerAutoplay()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
.mini-home {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #f9fafb;
}

.mini-home::before {
  position: absolute;
  inset: 0 0 auto;
  z-index: 0;
  height: 200px;
  background: linear-gradient(180deg, #f4341b 0%, #f4341b 60%, rgba(244, 52, 27, 0) 100%);
  content: '';
}

.store-header {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-rows: 40px 68px;
  gap: 0;
  height: 108px;
  padding: 0 16px;
}

.location-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
}

.location-copy {
  display: flex;
  align-items: center;
  flex: 0 0 181px;
  min-width: 0;
  gap: 8px;
  color: #fff;
}

.mini-location-icon,
.mini-search-icon,
.mini-chevron-icon,
.mini-more-icon {
  display: block;
  flex: 0 0 auto;
  object-fit: contain;
}

.mini-location-icon {
  width: 20px;
  height: 20px;
}

.mini-chevron-icon {
  width: 12px;
  height: 12px;
}

.location-copy strong {
  overflow: hidden;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-header-action {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  padding: 0;
}

.mini-more-icon {
  width: 16px;
  height: 16px;
}

.search-shell {
  position: relative;
  height: 36px;
  margin-top: 16px;
  border-radius: 999px;
  background: #fff;
}

.search-box {
  position: absolute;
  top: 8px;
  left: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: calc(100% - 76px);
  height: 20px;
  min-width: 0;
  padding: 0 12px;
}

.mini-search-icon {
  width: 14px;
  height: 14px;
}

.search-box input {
  flex: 1 1 auto;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #99a1af;
  font: inherit;
  font-size: 14px;
  line-height: normal;
  letter-spacing: 0;
}

.search-box input::placeholder {
  color: #99a1af;
  opacity: 1;
}

.search-shell button {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 68px;
  height: 28px;
  border: 0;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
}

.home-scroll {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: calc(100% - 108px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 12px 20px;
  scrollbar-width: none;
}

.home-scroll::-webkit-scrollbar {
  display: none;
}

.newbie-card {
  flex: 0 0 auto;
  width: 100%;
  height: 239.942px;
  overflow: hidden;
  border-radius: 16px;
  background: #fff;
}

.section-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 10px 12px;
  background: linear-gradient(90deg, #fff0e5, #ffe6d6);
}

.section-strip div {
  display: flex;
  align-items: center;
  gap: 5.992px;
  min-width: 0;
  color: #f4341b;
}

.section-strip strong {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.3125px;
}

.section-strip span {
  font-size: 12px;
  line-height: 16px;
}

.section-strip em {
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.1504px;
}

.section-strip button {
  border: 0;
  background: transparent;
  color: #f4341b;
  font-size: 12px;
  line-height: 16px;
  padding: 0;
}

.newbie-list {
  display: flex;
  gap: 7.995px;
  height: 196px;
  overflow-x: auto;
  padding: 11.992px;
  scrollbar-width: none;
}

.newbie-list::-webkit-scrollbar {
  display: none;
}

.newbie-product {
  flex: 0 0 99.993px;
  display: flex;
  flex-direction: column;
  gap: 5.992px;
  height: 171.966px;
  min-width: 0;
}

.newbie-product-image {
  flex: 0 0 auto;
  width: 99.993px;
  height: 99.993px;
  border-radius: 14px;
  object-fit: cover;
}

.newbie-name {
  position: relative;
  flex: 0 0 auto;
  height: 35.996px;
  overflow: hidden;
}

.newbie-name span {
  display: inline-flex;
  align-items: center;
  width: 34.999px;
  height: 14.624px;
  margin-top: 1.04px;
  padding: 0 3.5px 0 4px;
  border-radius: 4px;
  background: #f4341b;
  color: #fff;
  font-size: 9px;
  line-height: 11.25px;
  letter-spacing: 0.167px;
  white-space: nowrap;
}

.newbie-name strong {
  display: inline-block;
  margin-left: 1.99px;
  color: #101828;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  white-space: nowrap;
  vertical-align: top;
}

.newbie-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0 0 auto;
  height: 23.994px;
}

.newbie-price em {
  color: #f4341b;
  font-size: 16px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.3125px;
}

.newbie-add-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 19.997px;
  height: 19.997px;
  border: 0;
  border-radius: 999px;
  background: #f4341b;
  padding: 1.002px;
  cursor: pointer;
  transition: transform 0.14s ease, filter 0.14s ease;
}

.newbie-add-button img {
  display: block;
  width: 17.993px;
  height: 17.993px;
  object-fit: contain;
}

.newbie-add-button:active {
  filter: brightness(0.95);
  transform: scale(0.9);
}

.promo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 7.995px;
  height: 252.922px;
  align-items: start;
}

.promo-grid article {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  height: 122.464px;
  overflow: hidden;
  padding: 9.998px 10px 9.998px 9.998px;
  border-radius: 16px;
  filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
  cursor: pointer;
  transition: transform 0.14s ease, filter 0.14s ease;
}

.promo-grid article:focus-visible {
  outline: 2px solid rgba(244, 52, 27, 0.35);
  outline-offset: 2px;
}

.promo-grid article:active {
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.08));
  transform: scale(0.98);
}

.promo-copy {
  display: flex;
  flex-direction: column;
  gap: 3.997px;
  width: 100%;
}

.promo-title-row {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 23.994px;
  min-width: 0;
}

.promo-title-image {
  flex: 0 0 auto;
  display: block;
  object-fit: contain;
}

.promo-title-row span {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 18.981px;
  min-width: 55.983px;
  padding: 0 7.99px;
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.1172px;
  white-space: nowrap;
}

.promo-grid p {
  height: 16.488px;
  margin: 0;
  overflow: hidden;
  color: #6a7282;
  font-size: 11px;
  line-height: 16.5px;
  letter-spacing: 0.0645px;
  white-space: nowrap;
}

.promo-grid p.accent {
  color: #f4341b;
}

.promo-products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8.848px;
  width: 100%;
  height: 52px;
}

.promo-product {
  position: relative;
  min-width: 0;
  height: 52px;
}

.promo-product img {
  display: block;
  width: 100%;
  height: 46px;
  overflow: hidden;
  border-radius: 4px;
  background: #faf5ff;
  object-fit: cover;
}

.promo-product em {
  position: absolute;
  left: 50%;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  min-width: 38.076px;
  padding: 0 5px;
  border-radius: 8px;
  background: #ffe2de;
  color: #f4341b;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.3125px;
  white-space: nowrap;
  transform: translateX(-50%);
}

.promo-product em span {
  font-size: 10px;
}

.promo-product em small {
  font-size: 8px;
}

.home-channel-section {
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  background: transparent;
}

.home-channel-tabs {
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 65px;
  padding: 0 3px 20px 4px;
  border-radius: 14px;
}

.home-channel-tab {
  flex: 1 1 0;
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 3px;
  min-width: 0;
  height: 45px;
  border: 0;
  background: transparent;
  padding: 0;
  color: #1e2939;
  text-align: center;
  cursor: pointer;
}

.home-channel-tab strong {
  display: block;
  height: 26px;
  color: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: 0;
  white-space: nowrap;
}

.home-channel-tab span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 19px;
  min-width: 52px;
  border-radius: 999px;
  color: #6a7282;
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0;
  white-space: nowrap;
}

.home-channel-tab.active {
  color: #f4341b;
}

.home-channel-tab.active span {
  min-width: 58px;
  background: #f4341b;
  color: #fff;
}

.home-goods-masonry {
  box-sizing: border-box;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding-top: 12px;
}

.home-goods-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.home-banner-card {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 100%;
  height: 258px;
  overflow: hidden;
  border: 0;
  border-radius: 16px;
  background: #fff;
  padding: 0;
  cursor: pointer;
  transition: transform 0.14s ease, filter 0.14s ease;
}

.home-banner-card:active {
  filter: brightness(0.98);
  transform: scale(0.985);
}

.home-banner-card img {
  display: block;
  width: 100%;
  height: 100%;
  animation: banner-fade 0.28s ease;
  object-fit: cover;
}

@keyframes banner-fade {
  from {
    opacity: 0.72;
  }

  to {
    opacity: 1;
  }
}

.home-banner-dots {
  position: absolute;
  left: 50%;
  bottom: 13px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transform: translateX(-50%);
}

.home-banner-dot {
  display: block;
  width: 6px;
  height: 6px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.86);
  padding: 0;
  cursor: pointer;
  transition: width 0.14s ease, background 0.14s ease;
}

.home-banner-dot.active {
  width: 14px;
  background: #f4341b;
}
</style>
