import type { App } from 'vue';
import { Notify, Quasar } from 'quasar';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

export function setupQuasar(app: App) {
  app.use(Quasar, {
    plugins: {
      Notify,
    },
    config: {
      brand: {
        primary: '#009EFB',
        secondary: '#007DC7',
        accent: '#00835C',
        info: '#ADADB3',
      },
    },
  });
}
