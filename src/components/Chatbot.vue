<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Left Chat Area -->
    <div class="flex flex-col justify-between flex-1 bg-white border-r border-gray-200">
      <!-- Chat Messages -->
      <div class="chatbot flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'p-3 rounded-lg shadow-md w-fit',
            message.sender === 'user' ? 'bg-blue-200 ml-auto' : 'bg-gray-300 mr-auto',
          ]"
        >
          <p class="text-sm">{{ message.text }}</p>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex items-center space-x-2 bg-gray-300 p-3 rounded-lg shadow-md w-fit">
          <div class="loader border-t-2 border-gray-500 rounded-full w-4 h-4 animate-spin"></div>
          <p class="text-sm">Thinking...</p>
        </div>
      </div>

      <!-- Chat Input Area -->
      <div class="p-4 bg-gray-100 border-t flex items-center">
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

    <!-- Right Suggested Questions Area -->
    <div class="w-1/3 bg-white p-6 flex flex-col">
      <!-- Top Buttons -->
      <div class="flex justify-end space-x-4 mb-4">
        <button
          class="border border-blue-500 text-blue-500 py-2 px-4 rounded-md hover:bg-blue-50 transition"
        >
          Contact Advisor
        </button>
        <button
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Ask AI Assistant
        </button>
      </div>

      <!-- Suggested Questions -->
      <h2 class="text-lg font-bold mb-4 border-b-2 border-blue-500 pb-2">
        Suggested Questions
      </h2>
      <ul>
        <li
          v-for="(question, index) in questions"
          :key="index"
          class="flex justify-between items-start py-3 border-b"
        >
          <p class="text-sm text-gray-700">{{ question }}</p>
          <button class="text-blue-500 hover:text-blue-600">+</button>
        </li>
      </ul>

      <!-- Chat History Button -->
      <div class="mt-auto flex justify-center">
        <button
          class="bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-900 transition"
        >
          Chat History
        </button>
      </div>
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
      questions: [
        "How can I leverage my senior year to gain hands-on experience in anatomy through internships or research opportunities?",
        "What graduate programs or certifications should I consider to further specialize in anatomy and advance my career?",
        "How can I start building a professional network in the field of anatomy to enhance my job prospects post-graduation?",
      ],
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
/* Custom loader style */
.loader {
  border: 2px solid transparent;
  border-top-color: #4b5563; /* Gray-500 */
}
</style>

