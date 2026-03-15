<script setup lang="ts">
import SearchDestinationField from '@/components/search/SearchDestinationField.vue'
import { onMounted, ref } from 'vue'
import { HotelService } from '@/services/hotelService'

const selectedPlaceId = ref<number | string>('')
const hotelService = new HotelService()

// onMounted(async () => {
//   try {
//     const response = await hotelService.getAll({}, { page: 2, limit: 10 })
//     console.log('[HomePage] resposta completa:', response)
//     console.log('[HomePage] hoteis:', response.data)
//     console.log('[HomePage] paginacao:', response.pagination)
//   } catch (error) {
//     console.error('[HomePage] erro ao carregar hoteis:', error)
//   }
// })
</script>

<template>
  <SearchDestinationField v-model="selectedPlaceId" />

  <p>selecionado: {{ selectedPlaceId }}</p>
</template>
