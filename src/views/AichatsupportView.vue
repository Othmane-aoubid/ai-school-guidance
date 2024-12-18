<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar @toggle-sidebar="toggleSidebar" />
    
    <div class="flex-1 flex flex-col overflow-hidden transition-all duration-300"
      :class="{
        'sm:ml-16 md:ml-64': !isSidebarCollapsed,
        'sm-16': isSidebarCollapsed
      }"
      style="margin-left:0 !important"
    >
      <!-- Top Navigation Component -->
      <TopNavigation class="sticky top-0 z-10" />
      
      <!-- Main Content -->
      <div class="flex-1 p-4 md:p-6 overflow-y-auto">
        <!-- Welcome Section -->
        <div class="mb-6">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">AI Support Chat</h1>
          <p class="text-gray-600 mt-2">Get instant help with your questions</p>
        </div>

        <!-- Chat Container -->
        <div class="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-700">Chat Session</h2>
          </div>
          
          <!-- Chatbot Component with proper spacing -->
          <div class="p-4">
            <Chatbot class="min-h-[400px] max-h-[600px]" />
          </div>
        </div>

        <!-- Help Section -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="font-semibold text-gray-700 mb-2">Quick Tips</h3>
            <ul class="text-gray-600 space-y-2">
              <li>• Be specific with your questions</li>
              <li>• Use clear and concise language</li>
              <li>• One question at a time for best results</li>
            </ul>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="font-semibold text-gray-700 mb-2">Support Hours</h3>
            <p class="text-gray-600">AI Support is available 24/7</p>
            <p class="text-gray-600 mt-2">Human support: Mon-Fri, 9AM-5PM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import Chatbot from "../components/Chatbot.vue";

export default {
  name: "ChatSupport",
  components: {
    Sidebar,
    TopNavigation,
    Chatbot
  },
  data() {
    return {
      isSidebarCollapsed: window.innerWidth < 768, // Collapse sidebar by default on mobile
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
  mounted() {
    // Handle responsive sidebar on window resize
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 768) {
        this.isSidebarCollapsed = true;
      }
    },
  },
};
</script>

<style scoped>
/* Add smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>