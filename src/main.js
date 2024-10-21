import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


import axios from 'axios';  
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:3001';

app.config.globalProperties.$axios = axios;

app.use(router).mount('#app');