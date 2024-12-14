import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './assets/style.css'
import App from './App.vue'
import router from './router';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueTheMask from 'vue-the-mask';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, fab, far);

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
})

app.use(router)
app.use(vuetify)
app.use(VueTheMask)
app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
