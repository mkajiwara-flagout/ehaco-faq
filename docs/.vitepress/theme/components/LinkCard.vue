<script setup lang="ts">
defineProps<{
  links: Array<{
    icon: string
    title: string
    description?: string
    link: string
  }>
}>()
</script>

<template>
  <div class="link-cards">
    <a v-for="item in links" :key="item.link" :href="item.link" class="link-card">
      <span class="link-icon">{{ item.icon }}</span>
      <div class="link-content">
        <div class="link-title">{{ item.title }}</div>
        <div v-if="item.description" class="link-description">{{ item.description }}</div>
      </div>
    </a>
  </div>
</template>
