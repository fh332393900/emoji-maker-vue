import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './locales/i18n';
import App from './App.vue';

import './assets/styles/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(i18n);

app.mount('#app');
