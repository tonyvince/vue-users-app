import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Make sure the path to your router file is correct
import './assets/css/index.css';


const app = createApp(App);

app.use(router); // This line is essential to ensure Vue Router is initialized

app.mount('#app');

