import { createApp } from 'vue'
import './style.css';
import App from './App.vue';
import router from './router';

import '@mdi/font/css/materialdesignicons.css'
import 'boxicons'
import { createPinia } from 'pinia';

const pinia = createPinia()


createApp(App).use(pinia).use(router).mount('#app')
