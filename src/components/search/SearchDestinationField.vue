<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { normalizeText } from '@/utils/text'
import type { City } from '@/types/city'
import { CityService } from '@/services/cityService'
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

const cityService = new CityService()

const allOptions = ref<Option[]>([])
const options = ref<Option[]>([])
const selectedOption = ref<Option | null>(null)

function mapCityToOption(city: City): Option {
  return {
    label: `${city.name}, ${city.state.name}`,
    value: city.placeId,
    name: city.name,
  }
}

function syncSelectedOption(value: number | string) {
  if (!value) {
    selectedOption.value = null
    return
  }

  selectedOption.value = allOptions.value.find((option) => option.value === value) ?? null
}

watch(
  () => props.modelValue,
  (newValue) => {
    syncSelectedOption(newValue)
  },
  { immediate: true },
)

async function loadCities() {
  try {
    const cities = await cityService.getAll()
    allOptions.value = cities.map(mapCityToOption)
    syncSelectedOption(props.modelValue)
  } catch (error) {
    console.error('Não foi possível carregar as cidades.', error)
  }
}

onMounted(() => {
  loadCities()
})

function onFilter(inputValue: string, update: (callback: () => void) => void) {
  update(() => {
    const term = normalizeText(inputValue)

    if (term.length < 3) {
      options.value = []
      return
    }

    options.value = allOptions.value.filter((option) => {
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
      icon="search"
      unelevated
      rounded
      size="md"
      class="search-field__submit"
      :disable="!selectedOption"
      @click="onSubmit"
    />
  </div>
</template>
