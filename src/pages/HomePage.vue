<script setup lang="ts">
import SearchDestinationField from '@/components/search/SearchDestinationField.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { HotelService } from '@/services/hotelService'
import type { Hotel, HotelDetails } from '@/types/hotel'
import HotelCard from '@/components/hotel/HotelCard.vue'
import './home-page.scss'

const hotelService = new HotelService()

const selectedPlaceId = ref<number | string>('')
const hotels = ref<Hotel[]>([])
const errorMessage = ref<string>('')
const loading = ref(false)
const lastSearchPlaceId = ref<number | null>(null)
const isDetailsModalOpen = ref(false)
const selectedHotelId = ref<number | null>(null)
const deatilsLoading = ref(false)
const detailsErrorMessage = ref('')
const hotelDetails = ref<HotelDetails | null>(null)
const pagination = reactive({
  page: 1,
  limit: 6,
  totalItems: 0,
  totalPages: 1,
})

async function loadHotelsList(
  page = pagination.page,
  placeId: number | null = lastSearchPlaceId.value,
) {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await hotelService.getAll(placeId ? { placeId } : {}, {
      page,
      limit: pagination.limit,
    })

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
  lastSearchPlaceId.value = placeId
  loadHotelsList(1, placeId)
}

function handlePageChange(newPage: number) {
  pagination.page = newPage
  loadHotelsList(newPage)
}

async function openHotelDetails(hotelId: number) {
  selectedHotelId.value = hotelId
  isDetailsModalOpen.value = true
  detailsErrorMessage.value = ''
  deatilsLoading.value = true

  try {
    hotelDetails.value = await hotelService.getDetailsById(hotelId)
  } catch (error) {
    detailsErrorMessage.value =
      error instanceof Error
        ? error.message
        : 'Não foi possível carregar os detalhes do hotel. Tente novamente mais tarde.'
  } finally {
    deatilsLoading.value = false
  }
}

watch(isDetailsModalOpen, (isOpen) => {
  if (!isOpen) {
    hotelDetails.value = null
    selectedHotelId.value = null
    detailsErrorMessage.value = ''
  }
})

onMounted(() => {
  loadHotelsList(1, null)
})
</script>

<template>
  <section class="home-page">
    <section class="home-page__search-card">
      <SearchDestinationField v-model="selectedPlaceId" @submit="handleSubmit" />
    </section>

    <section class="home-page__results-card">
      <p v-if="errorMessage" class="home-page__state home-page__state--error">{{ errorMessage }}</p>

      <p v-else-if="loading" class="home-page__state">Carregando hotéis...</p>

      <p v-else-if="!hotels.length" class="home-page__state">
        Ainda não temos hotéis disponíveis. Tente novamente em instantes.
      </p>

      <div v-else class="home-page">
        <HotelCard
          v-for="hotel in hotels"
          :key="hotel.id"
          :hotel="hotel"
          @show-details="openHotelDetails"
        />
      </div>
    </section>

    <q-pagination
      v-if="pagination.totalPages > 1 && hotels.length"
      v-model="pagination.page"
      :max="pagination.totalPages"
      :max-pages="6"
      color="primary"
      boundary-links
      direction-links
      class="home-page_pagination"
      @update:model-value="handlePageChange"
    />

    <HotelDetailsDrawer />
  </section>
</template>
