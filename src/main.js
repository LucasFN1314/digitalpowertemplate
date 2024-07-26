import { createApp } from 'vue'
import './style.css';

import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';

import '@mdi/font/css/materialdesignicons.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'boxicons'

const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')