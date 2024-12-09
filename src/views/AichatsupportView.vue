<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navigation Component -->
      <TopNavigation />
      <!-- Main Content -->
      <div class="space-y-8 p-5 overflow-y-auto">
        <div class="bg-white rounded-lg shadow p-4">
          <!-- Chat History -->
          <div class="chat-history space-y-4">
            <!-- Loop through messages dynamically -->
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

          <!-- Message Input -->
          <div class="mt-4">
            <input
              v-model="userMessage"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Type a message..."
              class="w-full p-3 border rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import axios from "axios";
import OpenAI from "openai"


export default {
  name: "ChatSupport",
  components: {
    Sidebar,
    TopNavigation,
  },
  data() {
    return {
      userMessage: "",
      messages: [{ text: "Hello, how can I help you today?", isUser: false }],
      isLoading: false, // State to show loading indicator
    };
  },
  methods: {
    async sendMessage() {
      if (this.userMessage.trim() === "" || this.isLoading) return; // Prevent sending if loading
        const apiKey = process.env.OPEN_AI_API_KEY
      // Add user message to chat history
      this.messages.push({ text: this.userMessage, isUser: true });
      this.isLoading = true; // Start loading

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo", // You can use other models as needed
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: this.userMessage },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`, // Replace with your actual OpenAI API key
            },
          }
        );

        const botMessage = response.data.choices[0].message.content;

        // Add bot response to chat history
        this.messages.push({ text: botMessage, isUser: false });
      } catch (error) {
        if (error.response && error.response.status === 429) {
          this.messages.push({
            text: "Sorry, the service is temporarily unavailable. Please try again later.",
            isUser: false,
          });
        } else {
          console.error("Error with OpenAI API:", error);
          this.messages.push({
            text: "Sorry, I couldn't get a response. Please try again.",
            isUser: false,
          });
        }
      } finally {
        this.isLoading = false; // Stop loading
      }

      // Clear user input
      this.userMessage = "";
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here if needed */
</style>
