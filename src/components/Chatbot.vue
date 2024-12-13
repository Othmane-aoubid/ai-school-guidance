<template>
  <div class="flex flex-col justify-between bg-gray-100" style="height: 420px">
    <!-- Chat messages area -->
    <div
      class="chatbot flex-1 overflow-y-auto p-4 space-y-4"
      style="width: 100%"
    >
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="[
          'width-full p-3 rounded-lg shadow-md',
          message.sender === 'user'
            ? 'bg-blue-200 self-end'
            : 'bg-gray-300 self-start',
        ]"
      >
        <p class="text-sm">{{ message.text }}</p>
      </div>
      <!-- Loading indicator -->
      <div
        v-if="isLoading"
        class="self-start bg-gray-300 width-full p-3 rounded-lg shadow-md flex items-center space-x-2"
      >
        <div
          class="loader border-t-2 border-gray-500 rounded-full w-4 h-4 animate-spin"
        ></div>
        <p class="text-sm">Thinking...</p>
      </div>
    </div>

    <!-- Chat input area -->
    <div class="p-4 bg-white flex items-center border-t">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Type your message..."
      />
      <button
        @click="sendMessage"
        class="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        :disabled="isLoading"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script>
import { generateResponse } from "../utils/genAI";

export default {
  data() {
    return {
      messages: [
        { text: "Hi! I'm your chatbot. How can I help you?", sender: "bot" },
      ],
      userInput: "",
      isLoading: false, // Loading state
    };
  },
  methods: {
    async sendMessage() {
      if (this.userInput.trim() === "") return;

      // Add user's message to the chat
      this.messages.push({ text: this.userInput, sender: "user" });

      // Clear the input field and set loading state
      const prompt = this.userInput;
      this.userInput = "";
      this.isLoading = true;

      // Get the response from the Gemini API
      try {
        const response = await generateResponse(prompt);
        this.messages.push({ text: response, sender: "bot" });
      } catch (error) {
        this.messages.push({
          text: "Sorry, I couldn't process your request. Please try again.",
          sender: "bot",
        });
      } finally {
        this.isLoading = false; // Reset loading state
      }
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS classes will handle most of the styling */
.chatbot > * {
  width: 100% !important;
}
/* Add custom loader style */
.loader {
  border: 2px solid transparent;
  border-top-color: #4b5563; /* Gray-500 */
}
</style>
