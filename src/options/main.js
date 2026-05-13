import 'vue-global-api'
import { createApp } from 'vue'
import App from './Options.vue'
import '../logic/dark'
import '../styles'

const app = createApp(App)
app
  .mount('#app')
