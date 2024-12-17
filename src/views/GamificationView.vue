<template>
    <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div
      :class="[
        'flex-1 flex flex-col overflow-hidden',
        { 'ml-16': !isSidebarCollapsed }, // Apply margin on smaller screens if the sidebar is expanded
        'sm:ml-16', // This applies margin-left on small screens only (from 'sm' breakpoint and down)
        'md:ml-0'
      ]"
    >
      <TopNavigation />
  <div class="min-h-screen bg-gray-100 p-5 mb-3" style="overflow-y: scroll">
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-2xl font-bold">StudyMaster - Gamification</h1>
    </header>

    <main class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">
            Your Progress
          </h2>
          <div class="text-center mb-6">
            <p class="text-5xl font-bold text-blue-600">{{ totalXP }} XP</p>
            <p class="text-xl text-gray-600 mt-2">Level {{ currentLevel }}</p>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              class="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          <p class="text-center text-gray-600">
            {{ remainingXP }} XP to next level
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800">
            Study Streak
          </h2>
          <div class="flex justify-center items-center space-x-2">
            <div
              v-for="(day, index) in streak"
              :key="index"
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300"
              :class="
                day ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
              "
            >
              {{ ["M", "T", "W", "T", "F", "S", "S"][index] }}
            </div>
          </div>
          <p class="text-center mt-4 text-lg font-medium text-gray-700">
            Current Streak:
            <span class="text-blue-600">{{ currentStreak }} days</span>
          </p>
        </div>
      </div>

      <div class="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Achievements</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="text-center p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-md cursor-pointer"
            @click="toggleAchievementDetails(achievement.id)"
          >
            <div class="text-4xl mb-2" v-html="achievement.icon"></div>
            <h3 class="font-medium text-gray-800">{{ achievement.name }}</h3>
            <p
              class="text-sm text-gray-600 mt-2"
              v-if="achievement.showDetails"
            >
              {{ achievement.description }}
            </p>
            <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full"
                :style="{ width: `${achievement.progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";

export default {
  name: "GamificationView",
  components: {
    Sidebar,
    TopNavigation,
  },
  data() {
    return {
      totalXP: 1250,
      currentLevel: 5,
      progressPercentage: 75,
      remainingXP: 250,
      streak: [true, true, true, true, false, false, true],
      currentStreak: 4,
      isSidebarCollapsed: false,
      achievements: [
        {
          id: 1,
          name: "Early Bird",
          description: "Complete 5 morning sessions",
          icon: "🌅",
          progress: 80,
          showDetails: false,
        },
        {
          id: 2,
          name: "Bookworm",
          description: "Study for 50 hours total",
          icon: "📚",
          progress: 65,
          showDetails: false,
        },
        {
          id: 3,
          name: "Consistent Learner",
          description: "Study for 7 days in a row",
          icon: "🔥",
          progress: 100,
          showDetails: false,
        },
        {
          id: 4,
          name: "Subject Master",
          description: "Achieve 100% in a subject",
          icon: "🏆",
          progress: 40,
          showDetails: false,
        },
      ],
    };
  },
  methods: {
    toggleAchievementDetails(id) {
      const achievement = this.achievements.find((a) => a.id === id);
      if (achievement) {
        achievement.showDetails = !achievement.showDetails;
      }
    },
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>
