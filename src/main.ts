import './assets/styles/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { setupQuasar } from './plugins/quasar';

const app = createApp(App);

app.use(createPinia());
setupQuasar(app);
app.use(router);

app.mount('#app');
