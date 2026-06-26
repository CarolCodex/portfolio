<template>
  <section class="mini-activity">
    <header class="activity-header">
      <button class="back-button" type="button" aria-label="返回首页" @click="$emit('back')">
        <i aria-hidden="true"></i>
      </button>
      <strong>活动商品</strong>
    </header>

    <div class="activity-scroll">
      <section class="hero-carousel" aria-label="活动轮播">
        <div class="activity-hero-carousel">
          <section
            v-for="(slide, index) in activityHeroSlides"
            :key="slide.id"
            class="activity-hero-slide"
            :class="{ active: activeHeroIndex === index }"
            :aria-hidden="activeHeroIndex !== index"
          >
            <img
              class="activity-hero-image"
              :src="slide.bannerImage"
              :alt="slide.title"
              :loading="index === activeHeroIndex ? 'eager' : 'lazy'"
              decoding="async"
            />
            <div class="hero-shade">
              <h1>{{ slide.title }}</h1>
              <p>
                <span>{{ slide.tag }}</span>
                {{ slide.subtitle }}
              </p>
            </div>
          </section>
        </div>

        <div class="feature-pages">
          <section
            v-for="(slide, index) in activityHeroSlides"
            :key="slide.id"
            :ref="(element) => setFeatureStripRef(element, index)"
            class="feature-strip"
            :class="{ active: activeHeroIndex === index }"
            :aria-hidden="activeHeroIndex !== index"
            aria-label="活动精选"
          >
            <article
              v-for="product in slide.cards"
              :key="product.id"
              class="feature-card"
              role="button"
              tabindex="0"
              :aria-label="`查看商品详情：${product.name}`"
              @click="$emit('openProduct', product)"
              @keydown.enter.prevent="$emit('openProduct', product)"
              @keydown.space.prevent="$emit('openProduct', product)"
            >
              <img :src="product.image" :alt="product.name" loading="lazy" decoding="async" />
              <div>
                <strong>{{ product.name }}</strong>
                <span>{{ product.tag }}</span>
                <em>¥{{ product.price }}</em>
              </div>
              <button type="button" aria-label="加入购物车" @click.stop="handleAddToCart">
                <i aria-hidden="true"></i>
              </button>
            </article>
          </section>
        </div>
      </section>

      <ActivityTabs :active-type="activeActivityTab" @change="setActivityTab" />

      <section class="activity-list" :class="activeActivityTab" aria-label="活动商品列表">
        <ActivityProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :type="activeActivityTab"
          @add="handleAddToCart"
          @open="$emit('openProduct', $event)"
        />
      </section>
    </div>

    <ActivityCartBar :cart-count="cartCount" />
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ActivityCartBar from './ActivityCartBar.vue'
import ActivityProductCard from './ActivityProductCard.vue'
import ActivityTabs from './ActivityTabs.vue'
import {
  activityHeroSlides,
  activityProducts,
  type ActivityType,
} from '../mock/activity'
import type { DetailProduct } from '../mock/detail'

const props = defineProps<{ initialType: ActivityType; cartCount: number }>()

const emit = defineEmits<{
  back: []
  addToCart: []
  openProduct: [product: DetailProduct]
}>()

const activeHeroIndex = ref(0)
const activeActivityTab = ref<ActivityType>('hot')
const featureStripRef = ref<HTMLElement[]>([])
const flyingDots = ref<Array<{ id: number; style: Record<string, string> }>>([])
let heroTimer: number | undefined
let dotId = 0
const flyTimers: number[] = []
const flyDuration = 650
const preloadedActivityImages = new Set<string>()

const products = computed(() => activityProducts[activeActivityTab.value])

function slideIndexFor(type: ActivityType) {
  const index = activityHeroSlides.findIndex((slide) => slide.type === type)
  return index >= 0 ? index : 0
}

function initializeActivity(type: ActivityType) {
  activeActivityTab.value = type
  activeHeroIndex.value = slideIndexFor(type)
  resetFeatureScroll()
}

function setActivityTab(type: ActivityType) {
  activeActivityTab.value = type
}

function startHeroAutoplay() {
  stopHeroAutoplay()
  if (document.hidden) return

  heroTimer = window.setInterval(() => {
    activeHeroIndex.value = (activeHeroIndex.value + 1) % activityHeroSlides.length
  }, 3000)
}

function stopHeroAutoplay() {
  if (heroTimer !== undefined) {
    window.clearInterval(heroTimer)
    heroTimer = undefined
  }
}

function resetFeatureScroll() {
  nextTick(() => {
    const activeStrip = featureStripRef.value[activeHeroIndex.value]

    if (activeStrip) {
      activeStrip.scrollLeft = 0
    }
  })
}

function setFeatureStripRef(element: unknown, index: number) {
  if (element instanceof HTMLElement) {
    featureStripRef.value[index] = element
  }
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
  const cartTarget = document.querySelector('.activity-cart-target')

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

function preloadActivityImage(src: string) {
  if (preloadedActivityImages.has(src)) return

  preloadedActivityImages.add(src)

  const image = new Image()
  image.decoding = 'async'
  image.src = src
}

function scheduleNearbyActivityImagePreload() {
  const preload = () => {
    const slide = activityHeroSlides[activeHeroIndex.value]
    const nextSlide = activityHeroSlides[(activeHeroIndex.value + 1) % activityHeroSlides.length]

    if (slide) {
      preloadActivityImage(slide.bannerImage)
      slide.cards.slice(0, 2).forEach((card) => preloadActivityImage(card.image))
    }

    if (nextSlide) {
      preloadActivityImage(nextSlide.bannerImage)
    }
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(preload, { timeout: 1200 })
    return
  }

  window.setTimeout(preload, 200)
}

function preloadActivityImages() {
  const firstSlide = activityHeroSlides[activeHeroIndex.value]

  if (firstSlide) {
    const banner = new Image()
    banner.decoding = 'async'
    banner.src = firstSlide.bannerImage
    preloadedActivityImages.add(firstSlide.bannerImage)
  }

  scheduleNearbyActivityImagePreload()
}

watch(
  () => props.initialType,
  (type) => {
    initializeActivity(type)
  },
  { immediate: true },
)

watch(activeHeroIndex, () => {
  resetFeatureScroll()
  scheduleNearbyActivityImagePreload()
})

function handleVisibilityChange() {
  document.hidden ? stopHeroAutoplay() : startHeroAutoplay()
}

onMounted(() => {
  preloadActivityImages()
  startHeroAutoplay()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})
onBeforeUnmount(() => {
  stopHeroAutoplay()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  flyTimers.forEach((timer) => window.clearTimeout(timer))
  flyTimers.length = 0
})
</script>

<style scoped>
.mini-activity {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: #fff;
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

.activity-header {
  position: relative;
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  height: 44px;
  border-bottom: 1px solid #f3f4f6;
  background: #fff;
}

.activity-header strong {
  justify-self: center;
  color: #101828;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.back-button,
.feature-card button {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.back-button {
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  color: #101828;
}

.back-button i {
  width: 24px;
  height: 24px;
  background: currentColor;
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/arrow-left.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/arrow-left.svg') center / contain no-repeat;
}

.activity-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: #f3f4f6;
  scrollbar-width: none;
}

.activity-scroll::-webkit-scrollbar,
.feature-strip::-webkit-scrollbar {
  display: none;
}

.hero-carousel {
  position: relative;
  height: 320px;
  overflow: hidden;
  background: #fff;
}

.activity-hero-carousel {
  position: relative;
  height: 258px;
  padding: 12px;
  background: #fff;
}

.activity-hero-slide {
  position: absolute;
  inset: 12px;
  overflow: hidden;
  border-radius: 16px;
  background: #f3f4f6;
  opacity: 0;
  pointer-events: none;
  transform: scale(1.012);
  transition: opacity 0.36s ease, transform 0.36s ease;
  will-change: opacity, transform;
}

.activity-hero-slide.active {
  z-index: 2;
  opacity: 1;
  pointer-events: auto;
  transform: scale(1);
}

.activity-hero-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-shade {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 24px 80px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.18) 48%, transparent);
}

.hero-shade h1 {
  margin: 0 0 4px;
  color: #fff;
  font-size: 30px;
  font-style: italic;
  font-weight: 900;
  line-height: 36px;
  letter-spacing: 0;
  text-shadow: 0 3px 3px rgba(0, 0, 0, 0.12);
}

.hero-shade p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 20px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.hero-shade span {
  display: inline-flex;
  align-items: center;
  height: 19px;
  padding: 0 8px;
  border-radius: 6px;
  background: #f4341b;
  color: #fff;
  font-size: 10px;
  line-height: 15px;
}

.feature-strip {
  position: absolute;
  top: 202px;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  gap: 12px;
  height: 118px;
  overflow-x: auto;
  padding: 0 12px 16px;
  opacity: 0;
  pointer-events: none;
  scrollbar-width: none;
  transform: translateX(18px);
  transition: opacity 0.32s ease, transform 0.32s ease;
  will-change: opacity, transform;
}

.feature-strip.active {
  z-index: 4;
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
}

.feature-card {
  position: relative;
  flex: 0 0 240px;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr) 28px;
  gap: 11px;
  height: 102px;
  padding: 10px;
  border: 1px solid #f3f4f6;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.05), 0 4px 3px rgba(0, 0, 0, 0.05);
}

.feature-card img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
}

.feature-card div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.feature-card strong {
  overflow: hidden;
  color: #101828;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.feature-card span {
  align-self: flex-start;
  height: 19px;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(244, 52, 27, 0.05);
  color: #f4341b;
  font-size: 10px;
  line-height: 15px;
}

.feature-card em {
  color: #f4341b;
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: 22px;
}

.feature-card button {
  position: relative;
  align-self: end;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 999px;
  background: #f4341b;
  box-shadow: 0 4px 3px #ffc9c9;
}

.feature-card button i,
.feature-card button i::after {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 2px;
  border-radius: 999px;
  background: #fff;
  content: '';
  transform: translate(-50%, -50%);
}

.feature-card button i::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 12px 16px;
  background: #f9fafb;
}

.activity-list.group,
.activity-list.presale,
.activity-list.seckill {
  background: #fff;
}

.activity-list.hot {
  gap: 12px;
  padding: 8px 12px 16px;
  background: #fff;
}

.activity-list.seckill {
  gap: 12px;
  padding: 8px 8px 16px;
}
</style>
