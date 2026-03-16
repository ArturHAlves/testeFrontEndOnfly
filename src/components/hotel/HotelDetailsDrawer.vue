<script setup lang="ts">
import type { Hotel, HotelDetails } from '@/types/hotel';
import { computed } from 'vue';
import './hotel-details-drawer.scss';

const props = defineProps<{
  modelValue: boolean;
  hotel: Hotel | null;
  details: HotelDetails | null;
  loading: boolean;
  errorMessage: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

const galleryImages = computed(() => {
  if (props.details?.images?.length) {
    return props.details.images;
  }

  if (props.hotel) {
    return [props.hotel.thumb];
  }

  return [];
});

const amenities = computed(() => props.details?.amenities ?? []);

const starIcons = computed(() => {
  const rawRating = Number(props.hotel?.stars ?? 0);
  const rating = Math.max(0, Math.min(5, Math.round(rawRating)));
  return Array.from({ length: 5 }, (_, index) => index < rating);
});
</script>

<template>
  <q-dialog
    v-model="isOpen"
    transition-show="scale"
    transition-hide="scale"
    backdrop-filter="blur(2px)"
  >
    <section class="hotel-details">
      <header class="hotel-details__header">
        <div>
          <p class="hotel-details__title">{{ hotel?.name ?? 'Detalhes do hotel' }}</p>
        </div>

        <q-btn icon="close" flat round dense color="white" @click="isOpen = false" />
      </header>

      <div class="hotel-details__body">
        <p v-if="loading" class="hotel-details__state">Buscando detalhes...</p>

        <p v-else-if="!details" class="hotel-details__state">
          Selecione um hotel para explorar comodidades, endereço completo e galeria.
        </p>

        <div v-else class="hotel-details__content">
          <section v-if="galleryImages.length" class="hotel-details__gallery-card">
            <div class="hotel-details__stars" aria-label="Classificação do hotel">
              <span
                v-for="(isFilled, index) in starIcons"
                :key="index"
                :class="[
                  'material-icons',
                  'hotel-details__star',
                  isFilled ? 'hotel-details__star--active' : 'hotel-details__star--inactive',
                ]"
              >
                star
              </span>
            </div>
            <div class="hotel-details__gallery">
              <figure v-for="image in galleryImages" :key="image">
                <img :src="image" :alt="hotel?.name" loading="lazy" />
              </figure>
            </div>
            <div class="hotel-details__gallery-nav">
              <button aria-label="Imagem anterior">
                <span class="material-icons">chevron_left</span>
              </button>
              <button aria-label="Próxima imagem">
                <span class="material-icons">chevron_right</span>
              </button>
            </div>
          </section>

          <section v-if="amenities.length" class="hotel-details__section">
            <h3>Comodidades</h3>
            <ul class="hotel-details__amenities">
              <li v-for="amenity in amenities" :key="amenity.key">
                <span class="material-icons">check_circle</span>
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
