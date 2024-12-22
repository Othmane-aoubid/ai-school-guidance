<template>
  <div class="ai-challenges p-4">
    <h2 class="text-2xl font-bold mb-4">AI Challenge Missions</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(challenge, index) in challenges"
        :key="index"
        class="bg-white p-4 rounded shadow"
      >
        <h3 class="text-xl font-semibold mb-2">{{ challenge.title }}</h3>
        <p class="mb-2">{{ challenge.description }}</p>
        <p class="mb-2">Time Limit: {{ challenge.timeLimit }} minutes</p>
        <p class="mb-2">Reward: {{ challenge.reward }} XP</p>
        <p class="mb-2">Difficulty: {{ challenge.difficulty }}</p>
        <button
          @click="startChallenge(index)"
          :disabled="challenge.completed"
          :class="[
            'w-full px-4 py-2 rounded',
            challenge.completed
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white',
          ]"
        >
          {{ challenge.completed ? "Completed" : "Start Challenge" }}
        </button>
      </div>
    </div>
    <div
      v-if="currentChallenge"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4">{{ currentChallenge.title }}</h3>
        <p class="mb-4">{{ currentChallenge.description }}</p>
        <div class="mb-4">Time remaining: {{ timeRemaining }} seconds</div>
        <textarea
          v-model="userAnswer"
          class="w-full h-32 p-2 border rounded mb-4"
          placeholder="Enter your answer here..."
        ></textarea>
        <div class="flex flex-col sm:flex-row justify-between">
          <button
            @click="submitChallenge"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2 sm:mb-0"
          >
            Submit
          </button>
          <button
            @click="cancelChallenge"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AIChallenges",
  data() {
    return {
      challenges: [
        {
          title: "Image Classification",
          description:
            "Describe the process of image classification using Convolutional Neural Networks (CNNs).",
          timeLimit: 5,
          reward: 100,
          difficulty: "Easy",
          completed: false,
        },
        {
          title: "Sentiment Analysis",
          description:
            "Explain how to perform sentiment analysis on product reviews using Natural Language Processing techniques.",
          timeLimit: 7,
          reward: 150,
          difficulty: "Medium",
          completed: false,
        },
        {
          title: "Reinforcement Learning",
          description:
            "Describe the key components of a reinforcement learning system and how they interact.",
          timeLimit: 10,
          reward: 200,
          difficulty: "Hard",
          completed: false,
        },
      ],
      currentChallenge: null,
      userAnswer: "",
      timeRemaining: 0,
      timer: null,
    };
  },
  methods: {
    startChallenge(index) {
      this.currentChallenge = this.challenges[index];
      this.timeRemaining = this.currentChallenge.timeLimit * 60;
      this.userAnswer = "";
      this.startTimer();
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.timeRemaining--;
        if (this.timeRemaining <= 0) {
          this.submitChallenge();
        }
      }, 1000);
    },
    submitChallenge() {
      clearInterval(this.timer);
      const index = this.challenges.findIndex(
        (c) => c.title === this.currentChallenge.title
      );
      this.challenges[index].completed = true;
      this.$emit("challenge-completed", this.currentChallenge.reward);
      this.currentChallenge = null;
    },
    cancelChallenge() {
      clearInterval(this.timer);
      this.currentChallenge = null;
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
