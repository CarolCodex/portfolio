<template>
  <section class="design-spec-section">
    <SectionTitle v-if="showTitle" title="设计规范" :description="spec.summary" />

    <div class="spec-token-grid">
      <article v-for="token in spec.colorTokens" :key="token.name" class="spec-token-card">
        <span class="spec-swatch" :style="{ background: token.value }" />
        <div>
          <strong>{{ token.name }}</strong>
          <span>{{ token.value }}</span>
          <p>{{ token.usage }}</p>
        </div>
      </article>
    </div>

    <div class="spec-layout">
      <article class="content-panel spec-panel">
        <h2>状态规范</h2>
        <div class="state-preview-list">
          <div v-for="tag in spec.stateTags" :key="tag.label" class="state-preview-row">
            <span class="state-chip" :style="{ color: tag.color, background: tag.background ?? `${tag.color}1f` }">
              {{ tag.label }}
            </span>
            <p>{{ tag.description }}</p>
          </div>
        </div>
      </article>

      <article class="content-panel spec-panel">
        <h2>组件规则</h2>
        <div class="spec-rule-list">
          <div v-for="rule in spec.componentRules" :key="rule.title">
            <strong>{{ rule.title }}</strong>
            <p>{{ rule.description }}</p>
          </div>
        </div>
      </article>
    </div>

    <div class="spec-layout-rules">
      <article v-for="rule in spec.layoutRules" :key="rule.title" class="content-panel">
        <span>{{ rule.title }}</span>
        <p>{{ rule.detail }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'
import type { CaseDesignSpec } from '@/data/cases'

withDefaults(
  defineProps<{
    spec: CaseDesignSpec
    showTitle?: boolean
  }>(),
  {
    showTitle: true,
  },
)
</script>

<style scoped>
.design-spec-section {
  position: relative;
}

.spec-token-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.spec-token-card {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 14px;
  min-height: 148px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
}

.spec-swatch {
  width: 52px;
  height: 52px;
  border: 1px solid rgba(255, 255, 255, 0.76);
  border-radius: 16px;
  box-shadow: inset 0 0 0 1px rgba(9, 43, 102, 0.08), 0 14px 28px rgba(43, 112, 198, 0.12);
}

.spec-token-card strong,
.spec-rule-list strong {
  display: block;
  color: var(--color-ink);
  font-size: 15px;
  font-weight: 850;
  line-height: 1.35;
}

.spec-token-card span:not(.spec-swatch) {
  display: block;
  margin-top: 5px;
  color: #1268d6;
  font-size: 13px;
  font-weight: 800;
}

.spec-token-card p,
.spec-rule-list p,
.state-preview-row p,
.spec-layout-rules p {
  margin: 8px 0 0;
  color: var(--color-muted);
  font-size: 14px;
  line-height: 1.7;
}

.spec-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin-top: 22px;
}

.spec-panel {
  min-height: 306px;
}

.state-preview-list,
.spec-rule-list {
  display: grid;
  gap: 14px;
}

.state-preview-row {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  align-items: start;
  gap: 14px;
  padding: 12px;
  border: 1px solid rgba(9, 43, 102, 0.07);
  border-radius: 16px;
  background: rgba(248, 252, 255, 0.7);
}

.state-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 850;
  white-space: nowrap;
}

.spec-rule-list > div {
  padding: 14px 0;
  border-bottom: 1px solid rgba(9, 43, 102, 0.08);
}

.spec-rule-list > div:last-child {
  border-bottom: 0;
}

.spec-layout-rules {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 22px;
}

.spec-layout-rules span {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid rgba(13, 110, 253, 0.13);
  border-radius: 999px;
  background: rgba(240, 248, 255, 0.88);
  color: #1268d6;
  font-size: 13px;
  font-weight: 850;
}

.spec-layout-rules p {
  font-size: 15px;
}

@media (max-width: 980px) {
  .spec-token-grid,
  .spec-layout-rules {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .spec-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .spec-token-grid,
  .spec-layout-rules {
    grid-template-columns: 1fr;
  }

  .spec-token-card {
    min-height: 0;
  }

  .state-preview-row {
    grid-template-columns: 1fr;
  }
}
</style>
