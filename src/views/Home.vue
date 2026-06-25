<template>
  <div class="home-page">
    <HeroSection @contact="handleContactClick" />

    <section class="container section">
      <ProfileIntroCard />
    </section>

    <section class="container section core-capabilities-section">
      <SectionTitle
        title="核心能力"
        description="围绕前端页面落地，结合 UI 设计经验和 AI 工具工作流，把需求、设计稿和代码更顺畅地串起来。"
      />
      <div class="capability-grid">
        <CapabilityCard
          v-for="item in capabilities"
          :key="item.title"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </section>

    <section class="container section showcase-section">
      <div class="showcase-heading">
        <div>
          <h2>项目案例</h2>
          <p>参与多类项目，从需求分析到上线落地，关注真实用户体验与业务价值的实现过程。</p>
        </div>
        <RouterLink class="showcase-all-link" to="/cases">全部案例</RouterLink>
      </div>
      <div class="home-case-grid">
        <CaseCard
          v-for="(item, index) in featuredCases.slice(0, 4)"
          :key="item.id"
          :item="item"
          :index="index"
        />
      </div>
    </section>

    <Transition name="contact-popover">
      <aside
        v-if="showContactPopover"
        ref="contactPopoverRef"
        class="contact-popover"
        :class="`is-${contactPlacement}`"
        :style="contactPopoverStyle"
        role="dialog"
        aria-modal="false"
        aria-labelledby="contact-popover-title"
        @click.stop
      >
        <h3 id="contact-popover-title">联系方式</h3>
        <button class="contact-phone" type="button" aria-label="复制电话号码 13683407964" @click="copyContactPhone">
          <span>{{ contactPhone }}</span>
          <small>{{ contactCopied ? '已复制' : '复制' }}</small>
        </button>
        <p class="contact-note">仅限成都求职，非招聘暂不打扰，谢谢～</p>
      </aside>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import HeroSection from '@/components/HeroSection.vue'
import CapabilityCard from '@/components/CapabilityCard.vue'
import CaseCard from '@/components/CaseCard.vue'
import ProfileIntroCard from '@/components/ProfileIntroCard.vue'
import { featuredCases } from '@/data/cases'
import SectionTitle from '@/components/SectionTitle.vue'
import { rafThrottle } from '@/utils/performance'

const contactPhone = '13683407964'
const showContactPopover = ref(false)
const contactButtonEl = ref<HTMLElement | null>(null)
const contactPopoverRef = ref<HTMLElement | null>(null)
const contactPlacement = ref<'left' | 'right'>('right')
const contactPopoverStyle = ref<Record<string, string>>({
  left: '0px',
  top: '0px',
  transformOrigin: 'left center',
  '--contact-arrow-y': '50%',
})
const contactCopied = ref(false)

let copyResetTimer: number | undefined
let isContactPositionListening = false

function updateContactPopoverPosition() {
  const button = contactButtonEl.value

  if (!button || !showContactPopover.value) {
    return
  }

  const buttonRect = button.getBoundingClientRect()
  const popoverWidth = contactPopoverRef.value?.offsetWidth ?? 436
  const popoverHeight = contactPopoverRef.value?.offsetHeight ?? 170
  const viewportPadding = 18
  const anchorGap = 26
  const rightSpace = window.innerWidth - buttonRect.right - anchorGap - viewportPadding
  const leftSpace = buttonRect.left - anchorGap - viewportPadding
  const placeLeft = rightSpace < popoverWidth && leftSpace > rightSpace
  const rawLeft = placeLeft
    ? buttonRect.left - anchorGap - popoverWidth
    : buttonRect.right + anchorGap
  const maxLeft = window.innerWidth - popoverWidth - viewportPadding
  const left = Math.min(Math.max(rawLeft, viewportPadding), Math.max(viewportPadding, maxLeft))
  const rawTop = buttonRect.top + buttonRect.height / 2 - popoverHeight / 2 + 10
  const maxTop = window.innerHeight - popoverHeight - viewportPadding
  const top = Math.min(Math.max(rawTop, viewportPadding), Math.max(viewportPadding, maxTop))
  const arrowY = Math.min(
    Math.max(buttonRect.top + buttonRect.height / 2 - top, 30),
    Math.max(30, popoverHeight - 30),
  )

  contactPlacement.value = placeLeft ? 'left' : 'right'
  contactPopoverStyle.value = {
    left: `${Math.round(left)}px`,
    top: `${Math.round(top)}px`,
    transformOrigin: `${placeLeft ? 'right' : 'left'} ${Math.round(arrowY)}px`,
    '--contact-arrow-y': `${Math.round(arrowY)}px`,
  }
}

const scheduleContactPopoverPosition = rafThrottle(updateContactPopoverPosition)

function addContactPositionListeners() {
  if (isContactPositionListening) return

  window.addEventListener('resize', scheduleContactPopoverPosition, { passive: true })
  window.addEventListener('scroll', scheduleContactPopoverPosition, { capture: true, passive: true })
  isContactPositionListening = true
}

function removeContactPositionListeners() {
  if (!isContactPositionListening) return

  window.removeEventListener('resize', scheduleContactPopoverPosition)
  window.removeEventListener('scroll', scheduleContactPopoverPosition, true)
  scheduleContactPopoverPosition.cancel()
  isContactPositionListening = false
}

function closeContactPopover() {
  showContactPopover.value = false
  contactCopied.value = false
  removeContactPositionListeners()
}

function handleContactClick(event: MouseEvent) {
  event.stopPropagation()

  const button = event.currentTarget as HTMLElement | null

  if (showContactPopover.value && contactButtonEl.value === button) {
    closeContactPopover()
    return
  }

  contactButtonEl.value = button
  showContactPopover.value = true
  contactCopied.value = false
  addContactPositionListeners()
  void nextTick(scheduleContactPopoverPosition)
}

function handleDocumentPointerDown(event: PointerEvent) {
  const target = event.target as Node | null

  if (!showContactPopover.value || !target) {
    return
  }

  if (contactPopoverRef.value?.contains(target) || contactButtonEl.value?.contains(target)) {
    return
  }

  closeContactPopover()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeContactPopover()
  }
}

async function copyContactPhone() {
  try {
    await navigator.clipboard.writeText(contactPhone)
    contactCopied.value = true

    if (copyResetTimer) {
      window.clearTimeout(copyResetTimer)
    }

    copyResetTimer = window.setTimeout(() => {
      contactCopied.value = false
    }, 1500)
  } catch {
    contactCopied.value = false
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerDown)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
  document.removeEventListener('keydown', handleKeydown)
  removeContactPositionListeners()

  if (copyResetTimer) {
    window.clearTimeout(copyResetTimer)
  }
})

const capabilities = [
  {
    title: '前端页面落地',
    description: '熟悉管理后台、数据看板、大屏可视化、移动端和小程序页面开发，能独立完成页面结构、交互状态、多端适配和设计还原。',
  },
  {
    title: '组件化开发',
    description: '有组件拆分、样式规范、页面复用和性能优化意识，每个项目都会整理 DESIGN.md 文档，让页面开发更稳定、清晰、好维护。',
  },
  {
    title: 'AI 辅助开发',
    description: '日常使用 ChatGPT、Codex、Cursor、Figma Make 等工具，辅助需求拆解、页面生成、问题排查和效率提升。',
  },
  {
    title: 'UI / 产品理解',
    description: '有长期 UI项目经验，能快速看懂需求和设计稿，主动补齐页面逻辑、交互细节和信息层级。',
  },
  {
    title: '接口联调与状态处理',
    description: '能根据真实数据处理 loading、空状态、异常状态、字段缺失、数据校验和移动端适配问题。',
  },
  {
    title: '大屏可视化经验',
    description: '做过数据看板和大屏可视化项目，能兼顾信息展示、视觉层级、屏幕适配和页面性能。',
  },
]
</script>

<style scoped>
.home-page {
  position: relative;
  overflow: hidden;
  padding-bottom: 120px;
}

.home-page::before {
  content: '';
  position: absolute;
  top: 120px;
  left: 50%;
  z-index: -1;
  width: min(1120px, 90vw);
  height: 620px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(89, 174, 255, 0.2), transparent 70%);
  transform: translateX(-50%);
}

@supports (content-visibility: auto) {
  .home-page > .section {
    content-visibility: auto;
    contain-intrinsic-size: auto 760px;
  }
}

.contact-popover {
  position: fixed;
  z-index: 40;
  box-sizing: border-box;
  width: min(436px, calc(100vw - 36px));
  min-height: 170px;
  padding: 21px 22px;
  border: 1px solid rgba(205, 228, 255, 0.56);
  border-radius: 20px;
  background: #fff;
  box-shadow:
    0 16px 38px rgba(30, 100, 220, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  color: #1e3a5f;
  isolation: isolate;
  text-align: left;
}

.contact-popover::before {
  content: '';
  position: absolute;
  top: var(--contact-arrow-y, 50%);
  z-index: -1;
  width: 9px;
  height: 9px;
  border: 1px solid rgba(205, 228, 255, 0.5);
  background: #fff;
  backdrop-filter: blur(16px);
}

.contact-popover.is-right::before {
  left: -5px;
  border-top: 0;
  border-right: 0;
  transform: translateY(-50%) rotate(45deg);
}

.contact-popover.is-left::before {
  right: -5px;
  border-bottom: 0;
  border-left: 0;
  transform: translateY(-50%) rotate(45deg);
}

.contact-popover h3 {
  margin: 0 0 11px;
  color: #1e3a5f;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.22;
}

.contact-phone {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  min-height: 50px;
  padding: 8px 12px 8px 16px;
  border: 1px solid rgba(80, 150, 255, 0.16);
  border-radius: 16px;
  background: rgba(221, 239, 255, 0.32);
  color: #0b63e5;
  font: inherit;
  cursor: copy;
  appearance: none;
  transition:
    border-color 190ms ease,
    background 190ms ease,
    transform 190ms ease;
}

.contact-phone span {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.025em;
  line-height: 1;
  white-space: nowrap;
}

.contact-phone small {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-width: 50px;
  min-height: 30px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(30, 90, 200, 0.08);
  color: #1e6bea;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  transition:
    background 190ms ease,
    color 190ms ease;
}

.contact-phone:hover {
  border-color: rgba(80, 150, 255, 0.22);
  background: rgba(216, 236, 255, 0.46);
}

.contact-phone:hover small {
  background: rgba(30, 90, 200, 0.14);
}

.contact-phone:active {
  transform: scale(0.992);
}

.contact-phone:focus-visible {
  outline: 3px solid rgba(57, 132, 255, 0.22);
  outline-offset: 3px;
}

.contact-note {
  margin: 11px 0 0;
  color: rgba(22, 52, 95, 0.45);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.72;
}

.contact-popover-enter-active,
.contact-popover-leave-active {
  transition:
    opacity 200ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.contact-popover-enter-to,
.contact-popover-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.contact-popover-enter-from,
.contact-popover-leave-to {
  opacity: 0;
  transform: translateX(-8px) scale(0.96);
}

.contact-popover.is-left.contact-popover-enter-from,
.contact-popover.is-left.contact-popover-leave-to {
  transform: translateX(8px) scale(0.96);
}

.core-capabilities-section {
  position: relative;
  isolation: isolate;
  margin-top: 86px;
}

.capability-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.76);
  border-radius: 28px;
  box-shadow:
    0 24px 62px rgba(43, 112, 198, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(20px);
}

.capability-grid :deep(.capability-card:nth-child(odd)) {
  border-right: 1px solid rgba(255, 255, 255, 0.66);
}

.capability-grid :deep(.capability-card:nth-child(n + 3)) {
  border-top: 1px solid rgba(255, 255, 255, 0.66);
}

.showcase-section {
  position: relative;
  --showcase-radius: 18px;
  padding: 8px 0 20px;
}

.showcase-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 44px;
}

.showcase-heading h2 {
  margin: 0;
  color: #092b66;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 850;
  line-height: 1.16;
}

.showcase-heading p {
  max-width: 760px;
  margin: 14px 0 0;
  color: var(--color-muted);
  font-size: 16px;
  line-height: 1.8;
}

.showcase-all-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-height: 42px;
  padding: 10px 18px;
  border: 1px solid rgba(9, 43, 102, 0.12);
  border-radius: var(--showcase-radius);
  background: rgba(255, 255, 255, 0.62);
  color: #092b66;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 16px 36px rgba(43, 112, 198, 0.08);
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}

.showcase-all-link:hover {
  border-color: rgba(13, 110, 253, 0.24);
  background: #fff;
  transform: translateY(-2px);
}

.home-case-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 34px;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.history-card {
  min-height: 178px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 24px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.72), rgba(224, 241, 255, 0.48)),
    radial-gradient(circle at top right, rgba(83, 171, 255, 0.18), transparent 36%);
  box-shadow: 0 22px 54px rgba(43, 112, 198, 0.09);
  backdrop-filter: blur(18px);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.history-card:hover {
  border-color: rgba(80, 162, 255, 0.42);
  box-shadow: 0 28px 70px rgba(43, 112, 198, 0.14);
  transform: translateY(-4px);
}

.history-card h3 {
  margin: 0 0 12px;
  color: #0b2f6b;
  font-size: 20px;
}

.history-card p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.75;
}

@media (max-width: 1080px) {
  .capability-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 840px) {
  .home-case-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .showcase-heading {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 38px;
  }

  .history-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .home-page {
    padding-bottom: 80px;
  }

  .capability-grid,
  .home-case-grid,
  .history-grid {
    grid-template-columns: 1fr;
  }

  .capability-grid :deep(.capability-card:nth-child(odd)) {
    border-right: 0;
  }

  .capability-grid :deep(.capability-card:nth-child(n + 2)) {
    border-top: 1px solid rgba(255, 255, 255, 0.66);
  }

  .showcase-heading h2 {
    font-size: clamp(28px, 9vw, 36px);
  }

}
</style>
