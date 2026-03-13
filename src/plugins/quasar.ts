import type { App } from 'vue'
import { Notify, Quasar } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

export function setupQuasar(app: App) {
  app.use(Quasar, {
    plugins: {
      Notify,
    },
    config: {
      brand: {
        primary: '#0f766e',
        secondary: '#1f2937',
        accent: '#f59e0b',
      },
    },
  })
}
