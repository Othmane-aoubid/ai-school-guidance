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
      <!-- Main Content -->
      <div class="space-y-8 p-5 overflow-y-auto">
        <!-- <div class="bg-white rounded-lg shadow p-4">
          <!-- Chat History 
          <div class="chat-history space-y-4">
            <!-- Loop through messages dynamically 
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="message.isUser ? 'flex justify-end' : 'flex'"
            >
              <div
                :class="message.isUser ? 'bg-blue-500' : 'bg-gray-200'"
                class="p-3 rounded-lg text-black max-w-xs"
              >
                {{ message.text }}
              </div>
            </div>
          </div>

          <!-- Message Input 
          <div class="mt-4">
            <input
              v-model="userMessage"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Type a message..."
              class="w-full p-3 border rounded-lg"
            />
            <button class="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="sendMessage">Send</button>
          </div>
        </div> -->
        <Chatbot />
      </div>


    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import Chatbot from "../components/Chatbot.vue";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default {
  name: "ChatSupport",
  components: {
    Sidebar,
    TopNavigation,
    Chatbot
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

