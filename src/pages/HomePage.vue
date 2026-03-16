<script setup lang="ts">
import SearchDestinationField from '@/components/search/SearchDestinationField.vue'
import { reactive, ref } from 'vue'
import { HotelService } from '@/services/hotelService'
import type { Hotel } from '@/types/hotel'
import HotelCard from '@/components/hotel/HotelCard.vue'
import './home-page.scss'

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
})

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
  <section class="home-page">
    <section class="home-page__search-card">
      <div class="home-page__search-header">
        <div>
          <p class="home-page__eyebrow">Filtro</p>
          <h2 class="home-page__card-title">Destino</h2>
          <p class="home-page__card-text">
            Digite pelo menos tres letras, confirme em \"Buscar Hotel\" e carregaremos a lista
            paginada.
          </p>
        </div>
      </div>

      <SearchDestinationField v-model="selectedPlaceId" @submit="handleSubmit" />
    </section>
  </section>

  <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
</template>
