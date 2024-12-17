<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar />
    <div
      :class="[
        'flex-1 flex flex-col overflow-hidden',
        { 'ml-16': !isSidebarCollapsed }, // Apply margin on smaller screens if the sidebar is expanded
        'sm:ml-16', // This applies margin-left on small screens only (from 'sm' breakpoint and down)
        'md:ml-0',
      ]"
    >
      <!-- Top Navigation Component -->
      <TopNavigation />
      <ContentLibrary />
    </div>
  </div>
</template>

<script>
import ContentLibrary from "../components/ContentLibrary.vue";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
export default {
  name: "ContentLibraryView",
  components: {
    Sidebar,
    TopNavigation,
    ContentLibrary,
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
