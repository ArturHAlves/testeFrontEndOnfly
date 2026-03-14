<script setup lang="ts">
import { ref } from 'vue'
import payload from '../../../payload.json'
import { normalizeText } from '@/utils/text'

interface City {
  name: string
  state: {
    name: string
    shortname: string
  }
  placeId: number
}

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
}>()

const cities = (payload.cities as City[]) ?? []

const allOptions: Option[] = cities.map((city) => ({
  label: `${city.name}, ${city.state.name}`,
  value: city.placeId,
  name: city.name,
}))

const options = ref<Option[]>([])

const selectedOption = ref<Option | null>(
  allOptions.find((option) => option.value === props.modelValue) ?? null,
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

function onUpdate(option: Option | null) {
  selectedOption.value = option
  emit('update:modelValue', option?.value ?? '')
}
</script>

<template>
  <q-select
    :model-value="selectedOption"
    :options="options"
    option-label="label"
    use-input
    fill-input
    hide-selected
    clearable
    outlined
    @filter="onFilter"
    input-debounce="400"
    @update:model-value="onUpdate"
    dense
    label="Destino"
  />
</template>
