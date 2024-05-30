import { createApp } from 'vue';
import App from './App.vue';
import './style.scss'
import { createPinia } from 'pinia';
import { useGlobalStore } from './store';
import router from './router';
import vuetify from './vuetify'

const app = createApp(App);
app.use(createPinia());
app.provide('globalStore', useGlobalStore);
app.use(router);
app.use(vuetify);
app.mount('#app');