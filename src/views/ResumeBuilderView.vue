<template>
  <div class="flex bg-gray-100 min-h-screen">
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
      <div class="pt-3 pb-5">
        <ResumeBuilder />
      </div>
    
    </div>
  </div>
</template>

<script>
import ResumeBuilder from "../components/ResumeBuilder.vue";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
export default {
  components: { ResumeBuilder, Sidebar, TopNavigation },
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
