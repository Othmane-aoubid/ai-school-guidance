import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';
import { initializeAdmin } from './firebase/config';

const app = createApp(App);
const pinia = createPinia();

// Initialize admin user
initializeAdmin().then(() => {
  app.use(pinia);
  app.use(router);
  app.mount('#app');
}).catch(error => {
  console.error('Failed to initialize admin:', error);
  // Mount the app anyway to show login screen
  app.use(pinia);
  app.use(router);
  app.mount('#app');
});
