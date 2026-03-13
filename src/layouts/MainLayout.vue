<script setup lang="ts">
import { useMainMenu } from '@/composables/useMainMenu'

const { menuItems } = useMainMenu()
</script>

<template>
  <q-layout class="app-shell" view="lHh Lpr lFf">
    <q-header class="app-shell__header" elevated>
      <q-toolbar class="app-shell__toolbar">
        <q-toolbar-title class="app-shell__title">Hotel</q-toolbar-title>

        <q-tabs class="app-shell__nav" dense inline-label no-caps>
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

    <q-page-container class="app-shell__content">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
