import { createApp } from 'vue'
import './style.css';
import App from './App.vue';
import router from './router';

import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import * as bootstrap from 'bootstrap'
import 'boxicons'

import { VTreeview } from 'vuetify/labs/components';

const vuetify = createVuetify({
    components: {
        ...components,
        VTreeview,
    },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

createApp(App).use(vuetify).use(router).mount('#app')
