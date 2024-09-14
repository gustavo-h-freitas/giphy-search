import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { onShow } from './directives'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.directive('on-show', onShow)

app.mount('#app')
