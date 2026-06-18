<template>
  <div v-if="item" class="container page case-detail-page" :class="{ 'device-case-page': isDeviceHealthCase }">
    <template v-if="isDeviceHealthCase">
      <section class="device-case-hero">
        <div class="device-case-intro">
          <span class="eyebrow">{{ item.year }} · {{ item.category }}</span>
          <h1>{{ item.title }}</h1>
          <p>{{ item.subtitle }}</p>
          <div class="skill-cloud">
            <SkillTag v-for="tag in item.tags" :key="tag">{{ tag }}</SkillTag>
          </div>
        </div>

        <div class="device-showcase-row">
          <aside class="device-case-copy">
            <div class="device-switcher" aria-label="案例模块切换">
              <button
                v-for="tab in devicePanelTabs"
                :key="tab.key"
                class="device-switch-button"
                :class="{ active: activeDevicePanel === tab.key }"
                :aria-pressed="activeDevicePanel === tab.key"
                type="button"
                @click="setActiveDevicePanel(tab.key)"
              >
                {{ tab.label }}
              </button>
            </div>

            <article class="device-current-card" aria-live="polite">
              <span>{{ activeDevicePanelContent.label }}</span>
              <h2>{{ activeDevicePanelContent.title }}</h2>
              <p>{{ activeDevicePanelContent.description }}</p>
              <ul>
                <li v-for="point in activeDevicePanelContent.points" :key="point">{{ point }}</li>
              </ul>
            </article>

            <div class="device-highlights" aria-label="案例亮点">
              <article v-for="highlight in item.highlights" :key="highlight">
                <strong>{{ highlight }}</strong>
                <span>{{ highlightDescriptions[highlight] ?? '围绕业务场景沉淀可复用的界面与规范能力。' }}</span>
              </article>
            </div>

            <div class="device-actions">
              <RouterLink v-if="item.designSpec" class="spec-link-button" :to="`/cases/${item.id}/design-spec`">
                设计规范
              </RouterLink>
            </div>
          </aside>

          <div class="device-platform-stage" :data-panel="activeDevicePanel">
            <div class="device-app-demo">
              <div class="device-app-viewport">
                <DeviceHealthMobileDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="device-section">
        <SectionTitle title="设计挑战" />
        <div class="list-grid device-list-grid">
          <div v-for="challenge in item.challenges" :key="challenge" class="content-panel">
            {{ challenge }}
          </div>
        </div>
      </section>

      <section class="device-section">
        <SectionTitle title="解决方案" />
        <div class="list-grid device-list-grid">
          <div v-for="solution in item.solutions" :key="solution" class="content-panel">
            {{ solution }}
          </div>
        </div>
      </section>

      <section class="device-section device-process-grid">
        <article class="content-panel">
          <h2>前端实现说明</h2>
          <ul>
            <li v-for="work in item.frontendWork" :key="work">{{ work }}</li>
          </ul>
        </article>
        <article class="content-panel">
          <h2>AI 工具参与流程</h2>
          <ul>
            <li v-for="flow in item.aiWorkflow" :key="flow">{{ flow }}</li>
          </ul>
        </article>
      </section>

      <section class="device-section device-review">
        <article class="content-panel">
          <h2>后续作品集深化计划</h2>
          <ul>
            <li v-for="plan in item.redesignPlan" :key="plan">{{ plan }}</li>
          </ul>
        </article>
        <article class="content-panel">
          <h2>复盘总结</h2>
          <p>{{ item.review }}</p>
        </article>
      </section>
    </template>

    <template v-else>
      <section class="detail-hero">
        <div>
          <span class="eyebrow">{{ item.year }} · {{ item.category }}</span>
          <h1>{{ item.title }}</h1>
          <p>{{ item.subtitle }}</p>
          <div class="hero-actions">
            <div class="skill-cloud">
              <SkillTag v-for="tag in item.tags" :key="tag">{{ tag }}</SkillTag>
            </div>
            <RouterLink v-if="item.designSpec" class="spec-link-button" :to="`/cases/${item.id}/design-spec`">
              设计规范
            </RouterLink>
          </div>
        </div>
        <div class="detail-cover" :style="{ background: item.cover }" />
      </section>

      <section class="detail-grid">
        <article class="content-panel">
          <h2>项目背景</h2>
          <p>{{ item.background }}</p>
        </article>
        <article class="content-panel">
          <h2>我的角色</h2>
          <p>{{ item.role }}</p>
          <p>{{ item.platform }}</p>
        </article>
      </section>

      <section class="section">
        <SectionTitle title="设计挑战" />
        <div class="list-grid">
          <div v-for="challenge in item.challenges" :key="challenge" class="content-panel">
            {{ challenge }}
          </div>
        </div>
      </section>

      <section class="section">
        <SectionTitle title="解决方案" />
        <div class="list-grid">
          <div v-for="solution in item.solutions" :key="solution" class="content-panel">
            {{ solution }}
          </div>
        </div>
      </section>

      <section class="section">
        <SectionTitle
          title="高保真界面占位"
          description="当前使用本地渐变占位，后续可以替换为真实项目截图或脱敏后的界面图。"
        />
        <BeforeAfter />
      </section>

      <section class="detail-grid">
        <article class="content-panel">
          <h2>前端实现说明</h2>
          <ul>
            <li v-for="work in item.frontendWork" :key="work">{{ work }}</li>
          </ul>
        </article>
        <article class="content-panel">
          <h2>AI 工具参与流程</h2>
          <ul>
            <li v-for="flow in item.aiWorkflow" :key="flow">{{ flow }}</li>
          </ul>
        </article>
      </section>

      <section class="section content-panel">
        <h2>后续作品集深化计划</h2>
        <ul>
          <li v-for="plan in item.redesignPlan" :key="plan">{{ plan }}</li>
        </ul>
      </section>

      <section class="section content-panel">
        <h2>复盘总结</h2>
        <p>{{ item.review }}</p>
      </section>
    </template>
  </div>
  <div v-else class="container page">
    <SectionTitle title="案例不存在" description="该案例可能已被移动或尚未添加。" />
    <RouterLink class="button primary" to="/cases">返回案例列表</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BeforeAfter from '@/components/BeforeAfter.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SkillTag from '@/components/SkillTag.vue'
import { cases } from '@/data/cases'

const route = useRoute()
const item = computed(() => cases.find((caseItem) => caseItem.id === route.params.id))
const DeviceHealthMobileDemo = defineAsyncComponent(() =>
  import('@/cases/device-health-management-platform/DeviceHealthMobileDemo.vue'),
)

type DevicePanelKey = 'background' | 'role' | 'solution' | 'spec'

const activeDevicePanel = ref<DevicePanelKey>('background')
const isDeviceHealthCase = computed(() => item.value?.id === 'device-health-management-platform')
const devicePanelTabs: Array<{ key: DevicePanelKey; label: string }> = [
  { key: 'background', label: '项目背景' },
  { key: 'role', label: '角色分工' },
  { key: 'solution', label: '解决方案' },
  { key: 'spec', label: '规范沉淀' },
]

function setActiveDevicePanel(panel: DevicePanelKey) {
  activeDevicePanel.value = panel
}

const highlightDescriptions: Record<string, string> = {
  设备健康评分: '用统一评分和趋势状态帮助管理者快速判断设备风险。',
  告警分级: '区分一般、异常、预警和危险，提升处理优先级判断效率。',
  资产详情模板: '将设备档案、状态、告警和任务收束到稳定的信息框架。',
  'PC + APP 一致性规范': '让管理端和现场端共用颜色、标签、组件与状态语言。',
}

const activeDevicePanelContent = computed(() => {
  const currentItem = item.value

  if (!currentItem) {
    return {
      label: '',
      title: '',
      description: '',
      points: [],
    }
  }

  const contentMap: Record<DevicePanelKey, {
    label: string
    title: string
    description: string
    points: string[]
  }> = {
    background: {
      label: '业务场景',
      title: '从资产台账到实时运维的多角色系统',
      description: currentItem.background,
      points: ['资产、状态、告警、巡检任务需要在同一系统内协同', '信息架构需要降低管理端和现场端的理解成本'],
    },
    role: {
      label: '我的角色',
      title: currentItem.role,
      description: currentItem.platform,
      points: ['梳理 PC 管理端与 APP 现场端的信息层级', '制定多端共用的状态、组件和页面规范'],
    },
    solution: {
      label: '方案结构',
      title: '按任务链路重构设备管理体验',
      description: currentItem.summary,
      points: currentItem.solutions,
    },
    spec: {
      label: '规范输出',
      title: '沉淀可扩展的移动端和后台设计规则',
      description: currentItem.designSpec?.summary ?? currentItem.review,
      points: currentItem.designSpec?.layoutRules.map((rule) => rule.title) ?? currentItem.redesignPlan,
    },
  }

  return contentMap[activeDevicePanel.value]
})
</script>

<style scoped>
.device-case-page {
  width: min(100% - 96px, 1320px);
  padding-top: 64px;
}

@supports (content-visibility: auto) {
  .case-detail-page > .section,
  .case-detail-page > .detail-grid,
  .device-case-page > .device-section {
    content-visibility: auto;
    contain-intrinsic-size: auto 520px;
  }
}

.hero-actions {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.spec-link-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 10px 18px;
  border: 1px solid rgba(13, 110, 253, 0.18);
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(13, 110, 253, 0.96), rgba(80, 168, 255, 0.96));
  color: #fff;
  font-size: 14px;
  font-weight: 850;
  box-shadow: 0 16px 34px rgba(13, 110, 253, 0.22);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.spec-link-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 42px rgba(13, 110, 253, 0.28);
}

.device-case-hero {
  display: grid;
  gap: 42px;
  align-items: start;
  justify-items: center;
}

.device-case-intro {
  display: grid;
  width: min(100%, 1040px);
  justify-items: center;
  text-align: center;
}

.device-case-intro h1 {
  max-width: 760px;
  margin: 14px 0 18px;
  color: #0f2a5f;
  font-size: clamp(38px, 5.2vw, 64px);
  line-height: 1.08;
}

.device-case-intro p {
  max-width: 820px;
  margin: 0 0 24px;
  color: #5d728f;
  font-size: 18px;
  line-height: 1.8;
}

.device-case-intro .skill-cloud {
  justify-content: center;
}

.device-showcase-row {
  display: grid;
  grid-template-columns: minmax(620px, 1fr) minmax(380px, 490px);
  align-items: center;
  gap: clamp(52px, 6vw, 92px);
  width: 100%;
}

.device-case-copy {
  display: grid;
  min-width: 0;
  width: 100%;
  max-width: 780px;
  justify-self: end;
  text-align: left;
}

.device-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.device-switch-button {
  flex: 0 0 auto;
  min-height: 44px;
  padding: 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 12px 28px rgba(43, 112, 198, 0.08);
  color: #17528f;
  font-size: 15px;
  font-weight: 800;
  line-height: 22px;
  cursor: pointer;
  transition:
    background 180ms ease,
    box-shadow 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.device-switch-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 34px rgba(43, 112, 198, 0.12);
}

.device-switch-button.active {
  border-color: rgba(27, 124, 238, 0.45);
  background: linear-gradient(135deg, #0f6ce8 0%, #28b7ff 100%);
  box-shadow: 0 18px 34px rgba(33, 136, 239, 0.28);
  color: #fff;
}

.device-current-card {
  display: grid;
  gap: 10px;
  width: 100%;
  margin-top: 24px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 20px 46px rgba(43, 112, 198, 0.1);
}

.device-current-card > span {
  justify-self: start;
  min-height: 24px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(36, 137, 239, 0.1);
  color: #0f6ce8;
  font-size: 12px;
  font-weight: 900;
  line-height: 16px;
}

.device-current-card h2 {
  margin: 0;
  color: #0f2a5f;
  font-size: 24px;
  line-height: 1.28;
}

.device-current-card p,
.device-current-card li {
  color: #5d728f;
  font-size: 14px;
  line-height: 1.72;
}

.device-current-card p {
  margin: 0;
}

.device-current-card ul {
  display: grid;
  gap: 8px;
  margin: 4px 0 0;
  padding: 14px 0 0 18px;
  border-top: 1px solid rgba(47, 113, 190, 0.12);
}

.device-highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
  margin-top: 16px;
}

.device-highlights article {
  display: grid;
  gap: 6px;
  min-height: 118px;
  padding: 16px 18px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 18px 42px rgba(43, 112, 198, 0.08);
}

.device-highlights strong {
  color: #0f2a5f;
  font-size: 15px;
}

.device-highlights span {
  color: #5d728f;
  font-size: 14px;
  line-height: 1.6;
}

.device-actions {
  margin-top: 22px;
}

.device-platform-stage {
  position: relative;
  display: flex;
  container-type: inline-size;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 780px;
  overflow: visible;
}

.device-platform-stage::before {
  content: '';
  position: absolute;
  inset: 58px 10px 64px;
  border-radius: 42px;
  background:
    radial-gradient(circle at 24% 22%, rgba(255, 255, 255, 0.84), transparent 34%),
    linear-gradient(135deg, rgba(215, 237, 255, 0.9), rgba(190, 221, 255, 0.76));
  box-shadow: 0 26px 72px rgba(43, 112, 198, 0.18);
}

.device-app-demo {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: min(100%, 412px);
  aspect-ratio: 412 / 866;
  padding: 10px;
  border: 1px solid rgba(15, 42, 95, 0.12);
  border-radius: 42px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow:
    0 30px 70px rgba(43, 112, 198, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(18px);
}

.device-app-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 36px;
  background: #f4f8ff;
}

.device-section {
  margin-top: 86px;
}

.device-list-grid .content-panel {
  display: flex;
  align-items: center;
  min-height: 104px;
  color: #0f2a5f;
  font-weight: 750;
  line-height: 1.7;
}

.device-process-grid,
.device-review {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

@media (max-width: 640px) {
  .hero-actions {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 1040px) {
  .device-case-page {
    width: min(100% - 48px, 760px);
    padding-top: 48px;
  }

  .device-showcase-row {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .device-case-copy {
    max-width: none;
    justify-self: stretch;
  }

  .device-platform-stage {
    min-height: 840px;
  }
}

@media (max-width: 720px) {
  .device-case-page {
    width: min(100% - 40px, 720px);
    padding-top: 36px;
  }

  .device-case-hero {
    gap: 34px;
  }

  .device-case-intro {
    justify-items: start;
    text-align: left;
  }

  .device-case-intro h1 {
    font-size: clamp(34px, 12vw, 48px);
  }

  .device-case-intro .skill-cloud {
    justify-content: flex-start;
  }

  .device-highlights,
  .device-process-grid,
  .device-review {
    grid-template-columns: 1fr;
  }

  .device-platform-stage {
    min-height: 0;
    padding: 12px 0;
  }

  .device-platform-stage::before {
    inset: 42px 0;
    border-radius: 32px;
  }

  .device-app-demo {
    width: min(100%, 412px);
  }
}

@media (max-width: 480px) {
  .device-switch-button {
    flex: 1 1 calc(50% - 5px);
    padding: 0 14px;
  }

  .device-current-card {
    padding: 20px;
  }

  .device-platform-stage {
    padding: 10px 0;
  }

  .device-app-demo {
    padding: 8px;
  }
}
</style>
