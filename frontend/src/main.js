// main.js
import './assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/lib/styles/main.sass';

//import store from './store/index';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  },
});

app
 // .use(store) 
  .use(router)
  .use(vuetify)
  .mount('#app');
