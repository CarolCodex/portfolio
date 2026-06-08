<template>
  <div class="activity-cart-wrap">
    <div class="activity-cart-bar">
      <div class="cart-summary">
        <span class="cart-icon-wrap activity-cart-target" :class="{ bump: isBumping }">
          <i class="cart-icon" aria-hidden="true"></i>
          <span v-if="cartCount" class="cart-count" :class="{ pop: isBumping }">{{ cartCount }}</span>
        </span>
        <span class="cart-total">
          <strong>¥{{ totalPrice }}</strong>
          <small>预计配送费 ¥4</small>
        </span>
      </div>
      <button type="button">去结算</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{ cartCount: number }>()

const totalPrice = computed(() => (167 + Math.max(props.cartCount - 2, 0) * 19.9).toFixed(1))
const isBumping = ref(false)
let bumpTimer: number | undefined

watch(
  () => props.cartCount,
  (count, previousCount) => {
    if (count <= previousCount) {
      return
    }

    isBumping.value = false

    window.requestAnimationFrame(() => {
      isBumping.value = true
    })

    if (bumpTimer !== undefined) {
      window.clearTimeout(bumpTimer)
    }

    bumpTimer = window.setTimeout(() => {
      isBumping.value = false
      bumpTimer = undefined
    }, 360)
  },
)

onBeforeUnmount(() => {
  if (bumpTimer !== undefined) {
    window.clearTimeout(bumpTimer)
  }
})
</script>

<style scoped>
.activity-cart-wrap {
  flex: 0 0 auto;
  height: 66px;
  padding: 8px 16px 10px;
  border-top: 1px solid #f3f4f6;
  background: #fff;
}

.activity-cart-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-radius: 999px;
  background: #101828;
  padding: 6px 8px 6px 20px;
}

.cart-summary {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.cart-icon-wrap {
  position: relative;
  display: inline-flex;
  width: 24px;
  height: 24px;
  color: #fff;
  transform-origin: center;
}

.cart-icon {
  display: block;
  width: 24px;
  height: 24px;
  background: currentColor;
  mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/cart.svg') center / contain no-repeat;
  -webkit-mask: url('/case-assets/liangxuan-mini-program/demo-activity-assets/icons/cart.svg') center / contain no-repeat;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
  transform-origin: center;
}

.cart-icon-wrap.bump {
  animation: cart-bump 340ms cubic-bezier(0.2, 0.78, 0.32, 1);
}

.cart-count.pop {
  animation: cart-count-pop 340ms cubic-bezier(0.2, 0.78, 0.32, 1);
}

@keyframes cart-bump {
  0% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.18) translateY(-1px);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes cart-count-pop {
  0% {
    opacity: 0.85;
    transform: scale(0.82);
  }

  50% {
    opacity: 1;
    transform: scale(1.22);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.cart-total {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cart-total strong {
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
}

.cart-total small {
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
  line-height: 14px;
  white-space: nowrap;
}

.activity-cart-bar button {
  flex: 0 0 auto;
  width: 106px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  background: #f4341b;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
}
</style>
