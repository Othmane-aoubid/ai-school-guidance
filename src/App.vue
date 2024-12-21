<template>
  <div id="app">
    <!-- Your app structure here -->
    <router-view ></router-view>
  </div>
</template>

<script>
import { provideAuthState } from "./composables/useAuthState";

export default {
  name: "App",
  setup() {
    provideAuthState();
  },
};
</script>

<style>
.app {
  display: flex;
}
main {
  flex: 1 1 0;
  padding: 2rem;
}
@media (max-width: 1024px) {
  main {
    padding: 2rem;
  }
}
</style>
