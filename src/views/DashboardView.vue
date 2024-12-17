<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div
      :class="[
        'flex-1 flex flex-col overflow-hidden',
        { 'ml-16': !isSidebarCollapsed }, // Apply margin on smaller screens if the sidebar is expanded
        'sm:ml-16', // This applies margin-left on small screens only (from 'sm' breakpoint and down)
        'md:ml-0'
      ]"
    >
      <TopNavigation />

      <main class="flex-1 p-8 overflow-y-auto">
        <div class="bg-gray-50 min-h-screen font-sans">
          <!-- Greeting Section -->
          <div class="p-6">
            <h1 class="text-2xl font-semibold">
              Hi <span class="text-blue-500">othmane</span>, how can I help you
              today?
            </h1>
            <!-- Next Step Suggestion -->
            <div
              class="mt-4 border-l-4 border-blue-500 bg-white shadow-md p-4 rounded-md"
            >
              <h2 class="font-semibold text-blue-600">
                &#x1F4CA; Attend Industry Events
              </h2>
              <p class="text-gray-600">
                Attend at least 3 industry conferences, seminars, or webinars.
              </p>
            </div>
          </div>

          <!-- Features Section -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
            <!-- Feature Card -->
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <div class="text-blue-500 text-3xl">
                <span v-html="feature.icon"></span>
              </div>
              <h3 class="mt-3 font-semibold text-center">
                {{ feature.title }}
              </h3>
            </div>
          </div>

          <!-- Progress Section -->
          <div class="bg-white p-6 shadow-md rounded-md mx-6 mb-6">
            <h2 class="text-lg font-semibold mb-4">Your Progress to Date</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                v-for="(item, index) in progressItems"
                :key="index"
                class="flex justify-between items-center"
              >
                <div>
                  <h4 class="text-2xl font-bold text-blue-500">
                    {{ item.value }}
                  </h4>
                  <p class="text-gray-600">{{ item.title }}</p>
                </div>
                <a href="#" class="text-blue-500 underline text-sm"
                  >View Details</a
                >
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    TopNavigation,
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
