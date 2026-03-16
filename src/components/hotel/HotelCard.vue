<script setup lang="ts">
import type { Hotel } from '@/types/hotel'
import { computed } from 'vue'
import { formatAmenityName, formatCurrencyFromCents } from '@/utils/formatters'
import './hotel-card.scss'

const props = defineProps<{
  hotel: Hotel
}>()

const emit = defineEmits<{
  (e: 'show-details', hotel: Hotel): void
}>()

const visibleAmenities = computed(() => props.hotel.amenities.slice(0, 3))

const starIcons = computed(() => {
  const numericStars = Number(props.hotel?.stars ?? 0)
  const rating = Math.max(0, Math.min(5, Math.round(numericStars)))
  return Array.from({ length: 5 }, (_, index) => index < rating)
})

function handleDetailsClick() {
  emit('show-details', props.hotel)
}
</script>

<template>
  <article class="hotel-card">
    <div class="hotel-card__media">
      <img :src="hotel.thumb" :alt="hotel.name" class="hotel-card__thumb" loading="lazy" />

      <div class="hotel-card__stars-badge" aria-label="Classificação do hotel">
        <span
          v-for="(isFilled, index) in starIcons"
          :key="index"
          :class="[
            'material-icons',
            'hotel-card__star',
            isFilled ? 'hotel-card__star--active' : 'hotel-card__star--inactive',
          ]"
        >
          star
        </span>
      </div>

      <div class="hotel-card__gallery-nav">
        <button type="button" aria-label="Imagem anterior">
          <span class="material-icons">chevron_left</span>
        </button>
        <button type="button" aria-label="Próxima imagem">
          <span class="material-icons">chevron_right</span>
        </button>
      </div>
    </div>

    <div class="hotel-card__info">
      <header class="hotel-card__header">
        <div>
          <h3 class="hotel-card__title">{{ hotel.name }}</h3>
          <p class="hotel-card__district">{{ hotel.district }}</p>
        </div>

        <ul class="hotel-card__amenities">
          <li v-for="amenity in visibleAmenities" :key="amenity">
            {{ formatAmenityName(amenity) }}
          </li>
        </ul>
      </header>

      <ul class="hotel-card__badges">
        <li v-if="hotel.hasRefundableRoom">
          <span class="material-icons">autorenew</span>
          Reembolsável
        </li>
        <li v-if="hotel.hasBreakFast">
          <span class="material-icons">restaurant</span>
          Café da manhã
        </li>
      </ul>
    </div>

    <div class="hotel-card__pricing">
      <div>
        <p class="hotel-card__price-label">Por dia</p>
        <p class="hotel-card__price">{{ formatCurrencyFromCents(hotel.dailyPrice) }}</p>
        <p class="hotel-card__price-note">Tarifas {{ formatCurrencyFromCents(hotel.tax) }}</p>
      </div>

      <q-btn
        class="hotel-card__action"
        label="Ver detalhes"
        color="primary"
        rounded
        no-caps
        @click="handleDetailsClick"
      />
    </div>
  </article>
</template>
