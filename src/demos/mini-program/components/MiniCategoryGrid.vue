<template>
  <section class="category-grid" aria-label="商品分类">
    <div class="category-primary">
      <button
        v-for="category in miniCategories"
        :key="category.id"
        class="category-item category-item-large"
        type="button"
        @click="$emit('select', category.id)"
      >
        <span class="category-icon category-icon-large">
          <img :src="category.image" :alt="category.name" />
        </span>
        <strong>{{ formatCategoryName(category.name) }}</strong>
      </button>
    </div>

    <div class="category-shortcuts" aria-label="更多分类">
      <button
        v-for="category in miniCategoryShortcuts"
        :key="category.id"
        class="category-item category-item-small"
        type="button"
        @click="$emit('select', category.id)"
      >
        <span class="category-icon category-icon-small">
          <img :src="category.image" :alt="category.name" />
        </span>
        <strong>{{ formatCategoryName(category.name) }}</strong>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { miniCategories, miniCategoryShortcuts } from '../mock/home'

defineEmits<{ select: [id: string] }>()

function formatCategoryName(name: string) {
  return name.length > 4 ? `${name.slice(0, 4)}...` : name
}
</script>

<style scoped>
.category-grid {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15.999px;
  height: 247.927px;
  overflow: hidden;
  padding-top: 15.999px;
  border-radius: 16px;
  background: #fff;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.category-primary {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  row-gap: 15.999px;
  width: 100%;
  height: 156.955px;
  flex: 0 0 auto;
}

.category-shortcuts {
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  height: 47px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.category-shortcuts::-webkit-scrollbar {
  display: none;
}

.category-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  min-width: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;
}

.category-item:active {
  transform: scale(0.96);
}

.category-item-large {
  gap: 5.992px;
  height: 70.478px;
}

.category-item-small {
  flex: 0 0 56px;
  width: 56px;
  gap: 4px;
  height: 47px;
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 999px;
  background: #f9fafb;
}

.category-icon-large {
  width: 47.998px;
  height: 47.998px;
}

.category-icon-small {
  width: 27.992px;
  height: 27.992px;
}

.category-icon img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-item strong {
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-item-large strong {
  max-width: 4.8em;
  color: #1e2939;
  font-size: 11px;
  line-height: 16.5px;
  letter-spacing: 0.0645px;
}

.category-item-small strong {
  max-width: 56px;
  color: #6a7282;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.1172px;
}
</style>
