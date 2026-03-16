<script setup lang="ts">
import SearchDestinationField from '@/components/search/SearchDestinationField.vue'
import { reactive, ref } from 'vue'
import { HotelService } from '@/services/hotelService'
import type { Hotel } from '@/types/hotel'
import HotelCard from '@/components/hotel/HotelCard.vue'

const hotelService = new HotelService()

const selectedPlaceId = ref<number | string>('')
const hotels = ref<Hotel[]>([])
const errorMessage = ref<string>('')
const loading = ref(false)
const lastSearchPlaceId = ref<number | null>(null)
const pagination = reactive({
  page: 1,
  limit: 6,
  totalItems: 0,
  totalPages: 1,
});

async function fetchHotels(page = pagination.page) {
  if (!lastSearchPlaceId.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await hotelService.getAll(
      {
        placeId: lastSearchPlaceId.value,
      },
      {
        page,
        limit: pagination.limit,
      },
    )

    hotels.value = response.data
    pagination.page = response.pagination.page
    pagination.limit = response.pagination.limit
    pagination.totalItems = response.pagination.totalItems
    pagination.totalPages = response.pagination.totalPages
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : 'Não foi possível carregar os hotéis. Tente novamente mais tarde.'
    hotels.value = []
  } finally {
    loading.value = false
  }
}

function handleSubmit(placeId: number | null) {
  if (placeId === null) return

  lastSearchPlaceId.value = placeId
  fetchHotels(1)
}
</script>

<template>
  <SearchDestinationField v-model="selectedPlaceId" @submit="handleSubmit" />

  <p>selecionado: {{ selectedPlaceId }}</p>

  <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
</template>
