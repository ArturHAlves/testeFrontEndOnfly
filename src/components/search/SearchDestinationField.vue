<script setup lang="ts">
import { ref, watch } from 'vue'
import payload from '../../../payload.json'
import { normalizeText } from '@/utils/text'
import type { City } from '@/types/city'
import './search-destination-field.scss'

interface Option {
  label: string
  value: string | number
  name: string
}

const props = defineProps<{
  modelValue: number | string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void
  (e: 'submit', value: number | null): void
}>()

const cities = (payload.cities as City[]) ?? []

const allOptions: Option[] = cities.map((city) => ({
  label: `${city.name}, ${city.state.name}`,
  value: city.placeId,
  name: city.name,
}))

const options = ref<Option[]>([])
const selectedOption = ref<Option | null>(null)

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = allOptions.find((option) => option.value === newValue) ?? null
  },
  { immediate: true },
)

function onFilter(inputValue: string, update: (callback: () => void) => void) {
  update(() => {
    const term = normalizeText(inputValue)

    if (term.length < 3) {
      options.value = []
      return
    }

    options.value = allOptions.filter((option) => {
      const city = normalizeText(option.name)
      const label = normalizeText(option.label)

      return city.includes(term) || label.includes(term)
    })
  })
}

function onSubmit() {
  if (!selectedOption.value) {
    return
  }

  const value = selectedOption.value.value ?? null
  const placeId = typeof value === 'number' ? value : null

  emit('submit', placeId)
  emit('update:modelValue', placeId ?? '')

  options.value = []
}
</script>

<template>
  <div class="search-field">
    <q-select
      v-model="selectedOption"
      :options="options"
      option-label="label"
      use-input
      fill-input
      hide-selected
      clearable
      outlined
      @filter="onFilter"
      input-debounce="400"
      dense
      rounded
      input-class="search-field__input"
      label="Destino"
    />

    <q-btn
      color="primary"
      label="Buscar Hotel"
      unelevated
      rounded
      size="lg"
      :disable="!selectedOption"
      @click="onSubmit"
    />
  </div>
</template>
