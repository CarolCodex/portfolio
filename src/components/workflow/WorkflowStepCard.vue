<template>
  <article class="workflow-card" :style="{ '--delay': `${index * 90}ms` }">
    <span class="workflow-card__number">{{ stepNumber }}</span>

    <div class="workflow-card__icon" aria-hidden="true">
      <svg v-if="item.icon === 'brief'" viewBox="0 0 28 28">
        <path d="M8 7.8h12a2.5 2.5 0 0 1 2.5 2.5v9.2A2.5 2.5 0 0 1 20 22H8a2.5 2.5 0 0 1-2.5-2.5v-9.2A2.5 2.5 0 0 1 8 7.8Z" />
        <path d="M10.6 7.8V6.5A2.5 2.5 0 0 1 13.1 4h1.8a2.5 2.5 0 0 1 2.5 2.5v1.3M10 13h8M10 17h5.4" />
      </svg>
      <svg v-else-if="item.icon === 'draft'" viewBox="0 0 28 28">
        <path d="M6.5 20.6 5.8 24l3.4-.7 12-12a2.4 2.4 0 0 0-3.4-3.4l-11.3 12.7Z" />
        <path d="m16.2 9.5 2.3 2.3M8.5 5.8h7.2M8.5 10.3h4" />
      </svg>
      <svg v-else-if="item.icon === 'refine'" viewBox="0 0 28 28">
        <path d="M6 8h16M6 14h16M6 20h16" />
        <path d="M11 5.8v4.4M17.5 11.8v4.4M10 17.8v4.4" />
      </svg>
      <svg v-else-if="item.icon === 'code'" viewBox="0 0 28 28">
        <path d="m10.2 9-5 5 5 5M17.8 9l5 5-5 5M15.4 6.7l-2.8 14.6" />
      </svg>
      <svg v-else-if="item.icon === 'inspect'" viewBox="0 0 28 28">
        <path d="M5.5 13.6s3-6.1 8.5-6.1 8.5 6.1 8.5 6.1-3 6.1-8.5 6.1-8.5-6.1-8.5-6.1Z" />
        <path d="M14 16.6a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM21.5 21.5l2 2" />
      </svg>
      <svg v-else-if="item.icon === 'connect'" viewBox="0 0 28 28">
        <path d="M9.5 8.5h-1A3.5 3.5 0 0 0 5 12v4a3.5 3.5 0 0 0 3.5 3.5h1M18.5 8.5h1A3.5 3.5 0 0 1 23 12v4a3.5 3.5 0 0 1-3.5 3.5h-1M10.5 14h7" />
        <path d="M12.2 5v6.2M15.8 16.8V23" />
      </svg>
      <svg v-else-if="item.icon === 'fix'" viewBox="0 0 28 28">
        <path d="M19.6 5.4a5.4 5.4 0 0 0-6.8 6.9l-7 7a2.3 2.3 0 0 0 3.2 3.2l7-7a5.4 5.4 0 0 0 6.8-6.8l-3.6 3.6-3.2-.8-.8-3.2 4.4-2.9Z" />
      </svg>
      <svg v-else viewBox="0 0 28 28">
        <path d="M7 8.5h14M7 14h14M7 19.5h9" />
        <path d="m17.2 17.2 2.8 2.8 4-5" />
      </svg>
    </div>

    <div class="workflow-card__content">
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { WorkflowStep } from './workflowTypes'

const props = defineProps<{
  item: WorkflowStep
  index: number
}>()

const stepNumber = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<style scoped>
.workflow-card {
  position: relative;
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  gap: 24px;
  min-height: 136px;
  padding: 34px 32px 30px;
  border: 1px solid rgba(91, 140, 255, 0.22);
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(12, 22, 40, 0.84), rgba(6, 10, 19, 0.74)),
    radial-gradient(circle at 14% 16%, rgba(47, 107, 255, 0.18), transparent 16rem);
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.34),
    0 0 42px rgba(47, 107, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px);
  animation: card-enter 720ms cubic-bezier(0.2, 0.76, 0.22, 1) forwards;
  animation-delay: var(--delay);
  transition: border-color 260ms ease, box-shadow 260ms ease, transform 260ms ease, background 260ms ease;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.workflow-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.045), transparent),
    radial-gradient(circle at 12% 18%, rgba(39, 195, 255, 0.12), transparent 12rem);
  opacity: 0.82;
  pointer-events: none;
}

.workflow-card:hover {
  border-color: rgba(39, 195, 255, 0.46);
  box-shadow:
    0 30px 84px rgba(0, 0, 0, 0.42),
    0 0 58px rgba(47, 107, 255, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
}

.workflow-card__number {
  position: absolute;
  top: 15px;
  left: 19px;
  z-index: 1;
  background: linear-gradient(120deg, #27c3ff, #8b5cff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 13px;
  font-weight: 900;
  line-height: 1;
}

.workflow-card__icon {
  position: relative;
  z-index: 1;
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  align-self: center;
  border: 1px solid rgba(39, 195, 255, 0.3);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(21, 34, 58, 0.86), rgba(5, 9, 17, 0.9));
  color: #47b7ff;
  box-shadow: inset 0 0 16px rgba(47, 107, 255, 0.18), 0 0 24px rgba(39, 195, 255, 0.12);
}

.workflow-card__icon svg {
  width: 31px;
  height: 31px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.1;
}

.workflow-card__content {
  position: relative;
  z-index: 1;
  align-self: center;
}

h2 {
  margin: 0 0 10px;
  color: #f5f8ff;
  font-size: 24px;
  font-weight: 850;
  line-height: 1.25;
}

p {
  margin: 0;
  color: rgba(230, 238, 255, 0.82);
  font-size: 16px;
  line-height: 1.82;
}

@keyframes card-enter {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 720px) {
  .workflow-card {
    grid-template-columns: 62px minmax(0, 1fr);
    gap: 16px;
    min-height: 0;
    padding: 32px 20px 24px;
    border-radius: 20px;
  }

  .workflow-card__number {
    top: 13px;
    left: 17px;
  }

  .workflow-card__icon {
    width: 52px;
    height: 52px;
    border-radius: 16px;
  }

  .workflow-card__icon svg {
    width: 28px;
    height: 28px;
  }

  h2 {
    margin-bottom: 8px;
    font-size: 20px;
  }

  p {
    font-size: 14px;
    line-height: 1.75;
  }
}

@media (max-width: 440px) {
  .workflow-card {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .workflow-card__icon {
    align-self: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .workflow-card {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .workflow-card:hover {
    transform: none;
  }
}
</style>
