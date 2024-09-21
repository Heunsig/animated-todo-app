import './assets/main.css'
import 'overlayscrollbars/overlayscrollbars.css'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).use(autoAnimatePlugin)

app.mount('#app')
