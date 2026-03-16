<script setup lang="ts">
import type { Hotel, HotelDetails } from '@/types/hotel'
import { computed } from 'vue'
import './hotel-details-drawer.scss'

const props = defineProps<{
  modelValue: boolean
  hotel: Hotel | null
  details: HotelDetails | null
  loading: boolean
  errorMessage: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const galleryImages = computed(() => {
  if (props.details?.images?.length) {
    return props.details.images
  }

  if (props.hotel) {
    return [props.hotel.thumb]
  }

  return []
})

const amenities = computed(() => props.details?.amenities ?? [])
</script>

<template>
  <q-dialog
    v-model="isOpen"
    position="right"
    transition-show="slide-left"
    transition-hide="slide-right"
    backdrop-filter="blur(2px)"
  >
    <section class="hotel-details">
      <header class="hotel-details__header">
        <div>
          <p>{{ hotel?.name }}</p>
        </div>

        <q-btn icon="close" flat round dense color="white" @click="isOpen = false" />
      </header>

      <div class="hotel-details__body">
        <p v-if="loading" class="hotel-details__state">Buscando detalhes...</p>

        <p v-else-if="!details" class="hotel-details__state">
          Selecione um hotel para explorar comodidades, endereço completo e galeria.
        </p>

        <div v-else class="hotel-details__content">
          <section v-if="galleryImages.length" class="hotel-details__section">
            <span class="hotel-card__stars">{{ hotel?.stars }}*</span>
            <div class="hotel-details__gallery">
              <figure v-for="image in galleryImages" :key="image">
                <img :src="image" :alt="hotel?.name" loading="lazy" />
              </figure>
            </div>
          </section>

          <section v-if="amenities.length" class="hotel-details__section">
            <h3>Comodidades</h3>
            <ul class="hotel-details__amenities">
              <li v-for="amenity in amenities" :key="amenity.key">
                {{ amenity.label }}
              </li>
            </ul>
          </section>

          <section class="hotel-details__section">
            <h3>Localização</h3>
            <p class="hotel-details__address">
              {{ details.fullAddress }}
            </p>
          </section>

          <section class="hotel-details__section">
            <h3>Sobre o {{ hotel?.name }}</h3>
            <p class="hotel-details__description">
              {{ details.description }}
            </p>
          </section>
        </div>
      </div>
    </section>
  </q-dialog>
</template>
