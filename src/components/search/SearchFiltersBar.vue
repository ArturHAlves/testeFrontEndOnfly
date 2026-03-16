<script setup lang="ts">
import { computed } from 'vue'
import './search-filters-bar.scss'

type SortOptionValue = string | number

const props = defineProps<{
  sortOptions: ReadonlyArray<{ label: string; value: SortOptionValue }>
  sortValue: SortOptionValue
  hotelName: string | null
}>()

const emit = defineEmits<{
  (e: 'update:sortValue', value: SortOptionValue): void
  (e: 'update:hotelName', value: string | null): void
}>()

const sortModel = computed({
  get: () => props.sortValue,
  set: (value: SortOptionValue) => emit('update:sortValue', value),
})

const hotelNameModel = computed({
  get: () => props.hotelName,
  set: (value: string | null | undefined) => emit('update:hotelName', value ?? null),
})
</script>

<template>
  <div class="search-filters">
    <div class="search-filters__sort">
      <label class="search-filters__label" for="sort-select">Ordenar por:</label>
      <q-select
        id="sort-select"
        v-model="sortModel"
        :options="sortOptions"
        emit-value
        map-options
        outlined
        dense
        rounded
        dropdown-icon="expand_more"
        class="search-filters__select"
      />
    </div>

    <q-input
      v-model="hotelNameModel"
      outlined
      dense
      rounded
      placeholder="Nome do Hotel"
      clearable
      class="search-filters__input"
      prepend-inner-icon="search"
    />
  </div>
</template>
