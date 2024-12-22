import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { useAuthStore } from "./stores/auth";
import { useDataStore } from "./stores/data";
import { createAppRouter } from "./router";
import "./style.css";
import { initializeSearch } from "./utils/search";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
const pinia = createPinia();

const toastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

app.use(pinia);
app.use(Toast, toastOptions);

// Initialize auth store
const authStore = useAuthStore();
const store = useDataStore();
// Create router after auth store is initialized
authStore.initializeAuth().then(() => {
  const router = createAppRouter();
  app.use(router);
  initializeSearch(router, store);
  app.mount("#app");
});
