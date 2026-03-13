import { computed } from 'vue'

import { mainMenu } from '@/constants/menu'

export function useMainMenu() {
  const menuItems = computed(() => mainMenu)

  return {
    menuItems,
  }
}
