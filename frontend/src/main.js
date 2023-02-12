import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const app = createApp(App)

app.use(router)
app.mount('#app')

import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';