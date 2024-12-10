import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useAuthStore } from './stores/auth';
import { createAppRouter } from './router';
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

// Initialize auth store
const authStore = useAuthStore();

// Create router after auth store is initialized
authStore.initializeAuth().then(() => {
  const router = createAppRouter();
  app.use(router);
  app.mount('#app');
});

