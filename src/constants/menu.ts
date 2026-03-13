export interface MenuItem {
  label: string
  to: string
  icon: string
}

export const mainMenu: readonly MenuItem[] = [
  {
    label: 'Inicio',
    to: '/',
    icon: 'home',
  },
]
