<template>
  <div class="flex flex-col lg:flex-row h-full bg-gray-100">
    <!-- Left Chat Area -->
    <div class="flex flex-col justify-between flex-1 bg-white border-r border-gray-200">
      <!-- Chat Header -->
      <div class="p-4 border-b bg-white sticky top-0 z-10">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="font-medium">AI Assistant Online</span>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="chatbot flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'p-3 rounded-lg max-w-[80%] break-words',
            message.sender === 'user' 
              ? 'bg-blue-100 ml-auto text-blue-900' 
              : 'bg-gray-100 mr-auto text-gray-800',
          ]"
        >
          <div class="text-xs text-gray-500 mb-1">
            {{ message.sender === 'user' ? 'You' : 'AI Assistant' }}
          </div>
          <p class="text-sm">{{ message.text }}</p>
          <div class="text-xs text-gray-400 mt-1 text-right">
            {{ new Date().toLocaleTimeString() }}
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg w-fit">
          <div class="loader border-t-2 border-blue-500 rounded-full w-4 h-4 animate-spin"></div>
          <p class="text-sm text-gray-600">AI is thinking...</p>
        </div>
      </div>

      <!-- Chat Input Area -->
      <div class="p-4 bg-white border-t flex items-center space-x-2">
        <button
          class="p-2 text-gray-500 hover:text-blue-500"
          title="Attach file"
        >
          <i class="fas fa-paperclip"></i>
        </button>
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          class="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          type="text"
          placeholder="Type your message here..."
        />
        <button
          @click="sendMessage"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isLoading || !userInput.trim()"
        >
          <span class="hidden sm:inline">Send</span>
          <i class="fas fa-paper-plane sm:ml-2"></i>
        </button>
      </div>
    </div>

    <!-- Right Sidebar - Hidden on mobile, shown on larger screens -->
    <div class="w-full lg:w-80 bg-white p-4 border-l border-gray-200 hidden lg:flex lg:flex-col">
      <!-- Support Options -->
      <div class="mb-6">
        <div class="flex flex-col space-y-2">
          <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            <i class="fas fa-robot mr-2"></i>Ask AI Assistant
          </button>
          <button class="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50 transition">
            <i class="fas fa-user-headset mr-2"></i>Contact Human Support
          </button>
        </div>
      </div>

      <!-- Suggested Questions -->
      <div class="flex-1 overflow-y-auto">
        <h2 class="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
          Frequently Asked Questions
        </h2>
        <ul class="space-y-3">
          <li
            v-for="(question, index) in questions"
            :key="index"
            class="group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
          >
            <button 
              @click="askQuestion(question)"
              class="flex justify-between items-start w-full text-left"
            >
              <p class="text-sm text-gray-700 group-hover:text-blue-600">{{ question }}</p>
              <i class="fas fa-plus text-blue-500 group-hover:text-blue-600"></i>
            </button>
          </li>
        </ul>
      </div>

      <!-- Quick Actions -->
      <div class="mt-4 pt-4 border-t">
        <button
          class="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition flex items-center justify-center"
        >
          <i class="fas fa-history mr-2"></i>
          View Chat History
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
        { 
          text: "👋 Hello! I'm your AI assistant. I can help you with questions about our products, services, or general support. How can I assist you today?",
          sender: "bot" 
        },
      ],
      userInput: "",
      isLoading: false,
      questions: [
        "What are the main features of your product?",
        "How can I reset my password?",
        "What payment methods do you accept?",
        "How do I contact customer support?",
        "Can I get a refund for my purchase?",
        "How do I update my account information?",
      ],
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userInput.trim()) return;

      const userMessage = this.userInput.trim();
      this.messages.push({ text: userMessage, sender: "user" });
      this.userInput = "";
      this.isLoading = true;

      try {
        const response = await generateResponse(userMessage);
        this.messages.push({ text: response, sender: "bot" });
      } catch (error) {
        this.messages.push({
          text: "I apologize, but I'm having trouble processing your request. Please try again or contact our support team for assistance.",
          sender: "bot",
        });
      } finally {
        this.isLoading = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    askQuestion(question) {
      this.userInput = question;
      this.sendMessage();
    },
    scrollToBottom() {
      const chatContainer = this.$el.querySelector('.chatbot');
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  },
  mounted() {
    this.scrollToBottom();
  }
};
</script>

<style scoped>
.chatbot {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.chatbot::-webkit-scrollbar {
  width: 6px;
}

.chatbot::-webkit-scrollbar-track {
  background: transparent;
}

.chatbot::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.loader {
  border: 2px solid rgba(59, 130, 246, 0.1);
  border-top-color: #3b82f6;
}
</style>