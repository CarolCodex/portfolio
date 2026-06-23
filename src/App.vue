<template>
  <AppHeader v-if="!route.meta.hideHeader" />
  <main :class="{ 'embedded-route': route.meta.hideHeader }">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
</script>

<style scoped>
.embedded-route {
  min-height: 100vh;
}
</style>
