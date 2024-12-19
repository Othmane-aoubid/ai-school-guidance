import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useAuthStore } from './stores/auth';
import { useDataStore } from './stores/data';
import { createAppRouter } from './router';
import './style.css';
import { initializeSearch } from './utils/search';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

// Initialize auth store
const authStore = useAuthStore();
const store = useDataStore();
// Create router after auth store is initialized
authStore.initializeAuth().then(() => {
  const router = createAppRouter();
  app.use(router);
  initializeSearch(router, store);
  app.mount('#app');
});

