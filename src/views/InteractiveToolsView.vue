<template>
    <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navigation Component -->
      <TopNavigation />
      <InteractiveTools />
    </div>
  </div>
</template>

<script>

import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import InteractiveTools from "../components/InteractiveTools.vue";

export default {
  name: "InteractiveToolsView",
  components: {
    TopNavigation,
    Sidebar,
    InteractiveTools,
  },
};
</script>
