import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'


const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    icons: {
      iconfont: 'mdi',
    },
  })

  app
  .use(router)
  .use(vuetify)
  .mount('#app')