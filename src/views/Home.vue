<template>
  <div class="home-page">
    <HeroSection @contact="showContactModal = true" />

    <section class="container section">
      <ProfileIntroCard />
    </section>

    <section class="container section core-capabilities-section">
      <SectionTitle
        title="核心能力"
        description="围绕复杂业务、产品原型、移动端体验、前端落地与 AI 工作流，形成从需求理解到可运行界面的交付闭环。"
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
          <h2>精选作品案例</h2>
          <p>以目录式视角呈现移动端、小程序、终端设备与 B 端系统项目，突出设计判断、结构能力与前端落地过程。</p>
        </div>
        <RouterLink class="showcase-all-link" to="/cases">全部案例</RouterLink>
      </div>
      <div class="home-case-grid">
        <RouterLink
          v-for="(item, index) in featuredCases.slice(0, 4)"
          :key="item.id"
          class="showcase-card"
          :to="`/cases/${item.id}`"
        >
          <span class="showcase-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="showcase-cover" :style="{ background: item.cover }">
            <span>{{ item.category }}</span>
          </span>
          <span class="showcase-card-body">
            <strong>{{ item.title }}</strong>
            <em>{{ item.summary }}</em>
            <span class="showcase-tags">
              <small v-for="tag in item.tags.slice(0, 4)" :key="tag">{{ tag }}</small>
            </span>
          </span>
        </RouterLink>
      </div>
    </section>

    <div
      v-if="showContactModal"
      class="contact-modal-mask"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      @click="showContactModal = false"
    >
      <div class="contact-modal" @click.stop>
        <button class="contact-modal-close" type="button" @click="showContactModal = false">
          ×
        </button>

        <h3 id="contact-modal-title">联系方式</h3>
        <p class="contact-phone">电话：13683407964</p>
        <p class="contact-note">仅限成都求职，非招聘不要打扰，谢谢～</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import HeroSection from '@/components/HeroSection.vue'
import CapabilityCard from '@/components/CapabilityCard.vue'
import ProfileIntroCard from '@/components/ProfileIntroCard.vue'
import { featuredCases } from '@/data/cases'
import SectionTitle from '@/components/SectionTitle.vue'

const showContactModal = ref(false)

const capabilities = [
  {
    title: 'UI/UED 设计',
    description: '美术学院视觉传达设计科班出身，精通各类设计软件（figma、Sketch、Axure、Blender、Adobe系列等）。',
  },
  {
    title: '产品思维能力',
    description: '具备产品协作意识，能够参与需求拆解、流程梳理、逻辑原型与页面结构设计，使用 Axure 和流程图辅助表达产品方案。',
  },
  {
    title: '移动端 / 小程序 / 终端体验',
    description: '面向微信小程序、移动端和行业触屏终端场景，关注页面适配、操作效率、状态反馈与关键流程转化。',
  },
  {
    title: '前端实现与接口联调',
    description: '熟悉 Vue、HTML/CSS、微信小程序与 .NET MAUI，能够完成页面还原、组件拆分、自定义控件、接口联调和数据校验。',
  },
  {
    title: 'AI工作流提效',
    description: '将 ChatGPT、Codex、Figma Make、即梦等工具融入日常流程，用于需求拆解、视觉探索、页面生成、问题排查与方案迭代。',
  },
  {
    title: '数据可视化大屏',
    description: '具备可视化大屏、数据看板设计经验，能清晰可读的呈现数据，具有大屏落地经验。',
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

.contact-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.35);
  backdrop-filter: blur(8px);
}

.contact-modal {
  position: relative;
  width: min(100%, 360px);
  padding: 28px 28px 24px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.18);
}

.contact-modal h3 {
  margin: 0 0 16px;
  color: #0f2b5c;
  font-size: 20px;
}

.contact-phone {
  margin: 0 0 8px;
  color: #0f2b5c;
  font-size: 18px;
  font-weight: 700;
}

.contact-note {
  margin: 0;
  color: #5d6f8f;
  font-size: 14px;
  line-height: 1.7;
}

.contact-modal-close {
  position: absolute;
  top: 14px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: rgba(15, 43, 92, 0.06);
  color: #5d6f8f;
  cursor: pointer;
}

.contact-modal-close:hover {
  background: rgba(15, 43, 92, 0.1);
  color: #0f2b5c;
}

.core-capabilities-section {
  position: relative;
  isolation: isolate;
  margin-top: 86px;
}

.core-capabilities-section::before {
  content: '';
  position: absolute;
  top: -42px;
  bottom: -46px;
  left: 50%;
  z-index: -1;
  width: 100vw;
  transform: translateX(-50%);
  background:
    radial-gradient(circle at 82% 16%, rgba(190, 204, 255, 0.22), transparent 34rem),
    radial-gradient(circle at 18% 38%, rgba(126, 202, 255, 0.2), transparent 32rem),
    radial-gradient(circle at 52% 58%, rgba(255, 255, 255, 0.74), transparent 42rem),
    linear-gradient(
      180deg,
      rgba(249, 253, 255, 0) 0%,
      rgba(229, 244, 255, 0.62) 20%,
      rgba(247, 252, 255, 0.82) 52%,
      rgba(232, 245, 255, 0.56) 80%,
      rgba(249, 253, 255, 0) 100%
    );
  pointer-events: none;
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

.showcase-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-top: 34px;
  border-radius: var(--showcase-radius);
  color: inherit;
}

.showcase-index {
  position: absolute;
  top: 9px;
  left: 10px;
  z-index: 0;
  color: transparent;
  -webkit-text-stroke: 1px rgba(9, 43, 102, 0.075);
  font-size: clamp(54px, 5.2vw, 82px);
  font-weight: 850;
  line-height: 0.8;
  transform: translateY(-34%);
  pointer-events: none;
}

.showcase-cover {
  position: relative;
  z-index: 1;
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10.2;
  border: 1px solid rgba(9, 43, 102, 0.08);
  border-radius: var(--showcase-radius);
  background-blend-mode: screen;
  box-shadow: 0 18px 44px rgba(15, 42, 95, 0.08);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.showcase-cover::before {
  content: '';
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(255, 255, 255, 0.68);
  border-radius: calc(var(--showcase-radius) - 4px);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.12)),
    radial-gradient(circle at 76% 34%, rgba(255, 255, 255, 0.58), transparent 30%);
}

.showcase-cover::after {
  content: '';
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: 42%;
  height: 38%;
  border: 1px solid rgba(255, 255, 255, 0.64);
  border-radius: calc(var(--showcase-radius) - 4px);
  background: rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(12px);
}

.showcase-cover span {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  max-width: calc(100% - 32px);
  border-radius: var(--showcase-radius);
  color: rgba(9, 43, 102, 0.56);
  font-size: 11px;
  font-weight: 800;
  line-height: 1.45;
}

.showcase-card-body {
  display: block;
  padding-top: 24px;
}

.showcase-card-body strong {
  display: block;
  color: #12233b;
  font-size: 24px;
  font-weight: 850;
  line-height: 1.28;
}

.showcase-card-body em {
  display: -webkit-box;
  min-height: 58px;
  margin-top: 12px;
  overflow: hidden;
  color: #66788e;
  font-size: 14px;
  font-style: normal;
  line-height: 1.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.showcase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.showcase-tags small {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 5px 10px;
  border: 1px solid rgba(9, 43, 102, 0.14);
  border-radius: var(--showcase-radius);
  color: #4f6278;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
}

.showcase-card:hover .showcase-cover {
  box-shadow: 0 24px 58px rgba(15, 42, 95, 0.12);
  transform: translateY(-4px);
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

  .showcase-card {
    padding-top: 32px;
  }

  .showcase-card-body strong {
    font-size: 22px;
  }
}
</style>
