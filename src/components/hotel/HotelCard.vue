<script setup lang="ts">
import type { Hotel } from '@/types/hotel';

  const props = defineProps<{
    hotel: Hotel
  }>()


</script>

<template>
  <article>
    <img :src="hotel.thumb" :alt="hotel.name" />
  </article>

</template>
