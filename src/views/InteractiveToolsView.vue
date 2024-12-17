<template>
    <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar />
    <div
      :class="[
        'flex-1 flex flex-col overflow-hidden',
        { 'ml-16': !isSidebarCollapsed }, // Apply margin on smaller screens if the sidebar is expanded
        'sm:ml-16', // This applies margin-left on small screens only (from 'sm' breakpoint and down)
        'md:ml-0'
      ]"
    >
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
  data() {
    return {
      isSidebarCollapsed: false, // Track whether the sidebar is collapsed
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>
