<template>
  <div id="app">
    <!-- Your app structure here -->
    <router-view></router-view>
  </div>
</template>

<script>
import { provideAuthState } from './composables/useAuthState'

export default {
  name: 'App',
  setup() {
    provideAuthState()
  }
}
</script>

<style>
/* Your global styles here */
</style>

