<template>
  <AppHeader v-if="!route.meta.hideHeader" />
  <main :class="{ 'embedded-route': route.meta.hideHeader }">
    <RouterView v-slot="{ Component }">
      <SafeRender>
        <component :is="Component" />
      </SafeRender>
    </RouterView>
  </main>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import SafeRender from '@/components/SafeRender.vue'

const route = useRoute()
</script>

<style scoped>
.embedded-route {
  min-height: 100vh;
}
</style>
