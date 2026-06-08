<template>
  <div class="activity-tabs-wrap">
    <nav class="activity-tabs" aria-label="活动类型切换">
      <button
        v-for="tab in activityTabs"
        :key="tab.type"
        type="button"
        :class="{ active: activeType === tab.type }"
        :aria-current="activeType === tab.type ? 'true' : undefined"
        @click="$emit('change', tab.type)"
      >
        {{ tab.label }}
      </button>
    </nav>

    <div class="activity-filters" aria-label="商品筛选">
      <button v-for="(filter, index) in filterTabs" :key="filter" type="button" :class="{ active: index === 0 }">
        {{ filter }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { activityTabs, filterTabs, type ActivityType } from '../mock/activity'

defineProps<{ activeType: ActivityType }>()
defineEmits<{ change: [type: ActivityType] }>()
</script>

<style scoped>
.activity-tabs-wrap {
  flex: 0 0 auto;
  background: #fff;
  box-shadow: 0 1px 2px rgba(249, 250, 251, 0.9);
}

.activity-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  height: 52px;
  border-bottom: 1px solid #f3f4f6;
}

button {
  border: 0;
  background: transparent;
  color: #4a5565;
  font: inherit;
  cursor: pointer;
}

.activity-tabs button {
  position: relative;
  height: 52px;
  padding: 0;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
}

.activity-tabs button.active {
  color: #f4341b;
}

.activity-tabs button.active::after {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 32px;
  height: 2px;
  border-radius: 999px;
  background: #f4341b;
  content: '';
  transform: translateX(-50%);
}

.activity-filters {
  display: flex;
  gap: 8px;
  height: 52px;
  overflow-x: auto;
  padding: 12px;
  scrollbar-width: none;
}

.activity-filters::-webkit-scrollbar {
  display: none;
}

.activity-filters button {
  flex: 0 0 auto;
  height: 28px;
  padding: 0 18px;
  border-radius: 999px;
  background: #f3f4f6;
  color: #4a5565;
  font-size: 12px;
  line-height: 16px;
}

.activity-filters button.active {
  background: #f4341b;
  color: #fff;
}
</style>
