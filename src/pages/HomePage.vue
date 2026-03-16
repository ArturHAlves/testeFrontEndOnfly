<script setup lang="ts">
import SearchDestinationField from '@/components/search/SearchDestinationField.vue'
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { HotelService } from '@/services/hotelService'
import type { Hotel, HotelDetails } from '@/types/hotel'
import HotelCard from '@/components/hotel/HotelCard.vue'
import './home-page.scss'
import HotelDetailsDrawer from '@/components/hotel/HotelDetailsDrawer.vue'

const hotelService = new HotelService()

const selectedPlaceId = ref<number | string>('')
const hotels = ref<Hotel[]>([])
const errorMessage = ref<string>('')
const loading = ref(false)
const lastSearchPlaceId = ref<number | null>(null)
const isDetailsModalOpen = ref(false)
const selectedHotel = ref<Hotel | null>(null)
const detailsLoading = ref(false)
const detailsErrorMessage = ref('')
const hotelDetails = ref<HotelDetails | null>(null)
const sortSelectOptions = [
  { label: 'Preço', value: 'price' },
  { label: 'Estrelas', value: 'stars' },
] as const
type SortOption = (typeof sortSelectOptions)[number]['value']
const selectedSortOption = ref<SortOption>('price')
const hotelNameQuery = ref<string | null>('')
let hotelNameDebounce: ReturnType<typeof setTimeout> | null = null
const pagination = reactive({
  page: 1,
  limit: 6,
  totalItems: 0,
  totalPages: 1,
})

function getSortParams() {
  if (selectedSortOption.value === 'stars') {
    return {
      sortField: 'stars' as const,
      sortOrder: 'desc' as const,
    }
  }

  return {
    sortField: 'totalPrice' as const,
    sortOrder: 'asc' as const,
  }
}

async function loadHotelsList(
  page = pagination.page,
  placeId: number | null = lastSearchPlaceId.value,
) {
  loading.value = true
  errorMessage.value = ''

  try {
    const normalizedHotelName = hotelNameQuery.value?.trim() ?? ''

    const filters = {
      placeId: placeId ?? undefined,
      hotelName: normalizedHotelName || undefined,
      ...getSortParams(),
    }

    const response = await hotelService.getAll(filters, {
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

async function openHotelDetails(hotel: Hotel) {
  selectedHotel.value = hotel
  isDetailsModalOpen.value = true
  detailsErrorMessage.value = ''
  detailsLoading.value = true

  try {
    hotelDetails.value = await hotelService.getDetailsById(hotel.id)
  } catch (error) {
    detailsErrorMessage.value =
      error instanceof Error
        ? error.message
        : 'Não foi possível carregar os detalhes do hotel. Tente novamente mais tarde.'
  } finally {
    detailsLoading.value = false
  }
}

watch(isDetailsModalOpen, (isOpen) => {
  if (!isOpen) {
    hotelDetails.value = null
    selectedHotel.value = null
    detailsErrorMessage.value = ''
  }
})

watch(selectedSortOption, () => {
  loadHotelsList(1)
})

watch(
  () => hotelNameQuery.value,
  () => {
    if (hotelNameDebounce) {
      clearTimeout(hotelNameDebounce)
    }

    hotelNameDebounce = setTimeout(() => {
      loadHotelsList(1)
    }, 400)
  },
)

onBeforeUnmount(() => {
  if (hotelNameDebounce) {
    clearTimeout(hotelNameDebounce)
  }
})

onMounted(() => {
  loadHotelsList(1, null)
})
</script>

<template>
  <section class="home-page">
    <section class="home-page__search-card">
      <div class="search-panel">
        <nav class="search-panel__tabs">
          <button class="search-panel__tab" type="button">Aéreo</button>
          <button class="search-panel__tab search-panel__tab--active" type="button">Hotel</button>
          <button class="search-panel__tab" type="button">Carro</button>
          <button class="search-panel__tab" type="button">Ônibus</button>
        </nav>

        <div class="search-panel__destination">
          <SearchDestinationField v-model="selectedPlaceId" @submit="handleSubmit" />
        </div>
      </div>

      <div class="search-panel__filters">
        <div class="search-panel__sort">
          <label class="search-panel__label" for="sort-select">Ordenar por:</label>
          <q-select
            id="sort-select"
            v-model="selectedSortOption"
            :options="sortSelectOptions"
            emit-value
            map-options
            outlined
            dense
            rounded
            dropdown-icon="expand_more"
            class="search-panel__select"
          />
        </div>

        <q-input
          v-model="hotelNameQuery"
          outlined
          dense
          rounded
          placeholder="Nome do Hotel"
          clearable
          class="search-panel__input"
          prepend-inner-icon="search"
        />
      </div>
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

    <HotelDetailsDrawer
      v-model="isDetailsModalOpen"
      :hotel="selectedHotel"
      :details="hotelDetails"
      :loading="detailsLoading"
      :error-message="detailsErrorMessage"
    />
  </section>
</template>
