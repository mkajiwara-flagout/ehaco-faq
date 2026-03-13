<script setup lang="ts">
defineProps<{
  steps: Array<{
    number: number
    icon: string
    title: string
    link: string
  }>
}>()
</script>

<template>
  <div class="step-cards">
    <a v-for="step in steps" :key="step.number" :href="step.link" class="step-card">
      <span class="step-number">Step {{ step.number }}</span>
      <span class="step-icon">{{ step.icon }}</span>
      <span class="step-title">{{ step.title }}</span>
    </a>
  </div>
</template>
