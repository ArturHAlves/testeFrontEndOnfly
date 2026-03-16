<script setup lang="ts">
import type { Hotel } from '@/types/hotel'
import { computed } from 'vue'
import { formatAmenityName, formatCurrencyFromCents } from '@/utils/formatters'

const props = defineProps<{
  hotel: Hotel
}>()

const visibleAmenities = computed(() => props.hotel.amenities.slice(0, 3))
</script>

<template>
  <article class="hotel-card">
    <img :src="hotel.thumb" :alt="hotel.name" class="hotel-card__thumb" loading="lazy" />

    <div class="hotel-card__body">
      <div class="hotel-card__header">
        <div>
          <h3 class="hotel-card__title">{{ hotel.name }}</h3>
          <p class="hotel-card__district">{{ hotel.district }}</p>
        </div>
        <span class="hotel-card__stars">{{ hotel.stars }}*</span>
      </div>

      <ul class="hotel-card__amenities">
        <li v-for="amenity in visibleAmenities" :key="amenity">
          {{ formatAmenityName(amenity) }}
        </li>
      </ul>

      <ul class="hotel-card__badges">
        <li v-if="hotel.hasBreakFast">Cafe incluso</li>
        <li v-if="hotel.hasRefundableRoom">Cancelamento gratis</li>
      </ul>
    </div>

    <div class="hotel-card__footer">
      <div>
        <p class="hotel-card__price-label">Tarifa total</p>
        <p class="hotel-card__price">{{ formatCurrencyFromCents(hotel.totalPrice) }}</p>
        <p class="hotel-card__price-note">
          {{ formatCurrencyFromCents(hotel.dailyPrice) }} por diaria -
          {{ formatCurrencyFromCents(hotel.tax) }} taxas
        </p>
      </div>

      <q-btn label="Ver detalhes" color="primary" flat size="sm" />
    </div>
  </article>
</template>
