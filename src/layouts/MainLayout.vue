<script setup lang="ts">
import { useMainMenu } from '@/composables/useMainMenu'

const { menuItems } = useMainMenu()
</script>

<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-toolbar-title>Hotel</q-toolbar-title>

        <q-tabs>
          <q-route-tab
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            :icon="item.icon"
            :label="item.label"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
