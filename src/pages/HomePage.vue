<script setup lang="ts">
import SearchDestinationField from '@/components/search/SearchDestinationField.vue'
import { ref } from 'vue'

const selectedPlaceId = ref<number | string>('')
</script>

<template>
  <SearchDestinationField v-model="selectedPlaceId" />

  <p>selecionado: {{ selectedPlaceId }}</p>
</template>
