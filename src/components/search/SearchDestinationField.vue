<script setup lang="ts">
import { ref } from 'vue'
import payload from '../../../payload.json'

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
  label: `${city.name} - ${city.state.shortname}`,
  value: city.placeId,
  name: city.name,
}))

const options = ref<Option[]>([...allOptions])

const selectedOption = ref<Option | null>(
  allOptions.find((option) => option.value === props.modelValue) ?? null,
)

function onFilter(inputValue: string, update: (callback: () => void) => void) {
  update(() => {
    const term = inputValue.trim().toLowerCase()

    if (!term) {
      options.value = [...allOptions]
      return
    }

    options.value = allOptions.filter((option) => option.name.toLowerCase().includes(term))
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
    @update:model-value="onUpdate"
    dense
    label="Destino"
  />
</template>
