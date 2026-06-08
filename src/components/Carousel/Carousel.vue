<template>
  <section class="lx-carousel" @mouseenter="pause" @mouseleave="resume">
    <div
      class="lx-carousel__viewport"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="lx-carousel__track" :style="trackStyle">
        <div
          v-for="(item, index) in items"
          :key="item.id ?? index"
          class="lx-carousel__slide"
          :style="slideStyle"
        >
          <slot :item="item" :index="index" :active="index === activeIndex">
            <ProductCard
              :title="item.title"
              :subtitle="item.subtitle"
              :image="item.image"
              :price="item.price"
              :old-price="item.oldPrice"
              :tag-label="item.tagLabel"
              :status="item.status"
              :discount-label="item.discountLabel"
              :unit="item.unit"
              @add-to-cart="emit('addToCart', item, index)"
            />
          </slot>
        </div>
      </div>
    </div>

    <template v-if="showArrows && items.length > 1">
      <button class="lx-carousel__arrow lx-carousel__arrow--prev" type="button" aria-label="上一张" @click="prev">
        ‹
      </button>
      <button class="lx-carousel__arrow lx-carousel__arrow--next" type="button" aria-label="下一张" @click="next">
        ›
      </button>
    </template>

    <div v-if="showDots && pageCount > 1" class="lx-carousel__dots" aria-label="轮播分页">
      <button
        v-for="index in pageCount"
        :key="index"
        type="button"
        :class="{ active: index - 1 === activeIndex }"
        :aria-label="`切换到第 ${index} 页`"
        @click="goTo(index - 1)"
      ></button>
    </div>
  </section>
</template>

<script lang="ts">
import type { ProductCardStatus } from '../ProductCard/ProductCard.vue'

export interface CarouselItem {
  id?: string | number
  title: string
  subtitle?: string
  image: string
  price: string | number
  oldPrice?: string | number
  discountLabel?: string
  tagLabel?: string
  status?: ProductCardStatus
  unit?: string
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ProductCard from '../ProductCard/ProductCard.vue'

const props = withDefaults(defineProps<{
  items: CarouselItem[]
  modelValue?: number
  autoplay?: boolean
  interval?: number
  loop?: boolean
  showDots?: boolean
  showArrows?: boolean
  slidesPerView?: number
}>(), {
  modelValue: 0,
  autoplay: true,
  interval: 3200,
  loop: true,
  showDots: true,
  showArrows: true,
  slidesPerView: 1,
})

const emit = defineEmits<{
  'update:modelValue': [index: number]
  change: [index: number]
  addToCart: [item: CarouselItem, index: number]
}>()

const activeIndex = ref(props.modelValue)
const touchStartX = ref(0)
const touchDeltaX = ref(0)
let timer: ReturnType<typeof window.setInterval> | undefined

const safeSlidesPerView = computed(() => Math.max(1, Math.min(props.slidesPerView, props.items.length || 1)))
const pageCount = computed(() => Math.max(0, props.items.length - safeSlidesPerView.value + 1))
const slideWidth = computed(() => 100 / safeSlidesPerView.value)
const maxIndex = computed(() => Math.max(0, pageCount.value - 1))

const trackStyle = computed(() => ({
  transform: `translateX(-${activeIndex.value * slideWidth.value}%)`,
}))

const slideStyle = computed(() => ({
  flexBasis: `${slideWidth.value}%`,
}))

watch(
  () => props.modelValue,
  (value) => {
    activeIndex.value = clampIndex(value)
  },
)

watch(
  () => props.items.length,
  () => {
    goTo(clampIndex(activeIndex.value))
  },
)

function clampIndex(index: number) {
  return Math.min(Math.max(index, 0), maxIndex.value)
}

function goTo(index: number) {
  const nextIndex = clampIndex(index)
  activeIndex.value = nextIndex
  emit('update:modelValue', nextIndex)
  emit('change', nextIndex)
}

function next() {
  if (activeIndex.value >= maxIndex.value) {
    if (props.loop) goTo(0)
    return
  }

  goTo(activeIndex.value + 1)
}

function prev() {
  if (activeIndex.value <= 0) {
    if (props.loop) goTo(maxIndex.value)
    return
  }

  goTo(activeIndex.value - 1)
}

function startTimer() {
  stopTimer()
  if (!props.autoplay || props.items.length <= safeSlidesPerView.value || typeof window === 'undefined') return

  timer = window.setInterval(next, props.interval)
}

function stopTimer() {
  if (timer !== undefined) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function pause() {
  stopTimer()
}

function resume() {
  startTimer()
}

function onTouchStart(event: TouchEvent) {
  touchStartX.value = event.touches[0]?.clientX ?? 0
  touchDeltaX.value = 0
  pause()
}

function onTouchMove(event: TouchEvent) {
  touchDeltaX.value = (event.touches[0]?.clientX ?? 0) - touchStartX.value
}

function onTouchEnd() {
  if (Math.abs(touchDeltaX.value) > 32) {
    touchDeltaX.value < 0 ? next() : prev()
  }

  touchStartX.value = 0
  touchDeltaX.value = 0
  resume()
}

watch(() => [props.autoplay, props.interval, props.items.length, props.slidesPerView], startTimer)

onMounted(startTimer)
onBeforeUnmount(stopTimer)
</script>

<style scoped lang="scss">
@use '../styles/variables' as *;

.lx-carousel {
  @include lx-font-base;

  position: relative;
  min-width: 0;
  padding-bottom: 22px;
}

.lx-carousel__viewport {
  min-width: 0;
  overflow: hidden;
  border-radius: $lx-radius-lg;
}

.lx-carousel__track {
  display: flex;
  align-items: stretch;
  transition: transform $lx-duration-base $lx-ease-standard;
  will-change: transform;
}

.lx-carousel__slide {
  flex: 0 0 100%;
  min-width: 0;
  padding: 0 5px;
}

.lx-carousel__arrow {
  @include lx-control-reset;
  @include lx-pressable;

  position: absolute;
  top: calc(50% - 11px);
  z-index: 2;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(16, 24, 40, 0.68);
  color: #fff;
  font-size: 24px;
  line-height: 1;

  &--prev {
    left: 8px;
  }

  &--next {
    right: 8px;
  }
}

.lx-carousel__dots {
  position: absolute;
  bottom: 0;
  left: 50%;
  display: flex;
  gap: 5px;
  transform: translateX(-50%);

  button {
    @include lx-control-reset;
    @include lx-pressable;

    width: 6px;
    height: 6px;
    border-radius: $lx-radius-pill;
    background: rgba(244, 52, 27, 0.22);

    &.active {
      width: 16px;
      background: $lx-color-primary;
    }
  }
}
</style>
