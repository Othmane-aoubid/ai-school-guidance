<template>
    <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div
      :class="[
        'flex-1 flex flex-col overflow-auto',
        { 'ml-16': !isSidebarCollapsed }, // Apply margin on smaller screens if the sidebar is expanded
        'sm:ml-16', // This applies margin-left on small screens only (from 'sm' breakpoint and down)
        'md:ml-0'
      ]"
    >
      <TopNavigation />
      <div class="min-h-screen bg-gray-100">
    <header class="  p-4">
      <h1 class="text-2xl font-bold">AI Learning Platform</h1>
    </header>
    <nav class=" p-2 flex flex-wrap justify-center">
      <button @click="currentView = 'skill-tree'" class=" mx-2 my-1 px-3 py-1 rounded hover:bg-gray-200 transition-colors duration-200">AI Skill Tree</button>
      <button @click="currentView = 'challenges'" class=" mx-2 my-1 px-3 py-1 rounded hover:bg-gray-200 transition-colors duration-200">AI Challenges</button>
      <button @click="currentView = 'coding-dojo'" class=" mx-2 my-1 px-3 py-1 rounded hover:bg-gray-200 transition-colors duration-200">AI Coding Dojo</button>
      <button @click="currentView = 'story-creator'" class=" mx-2 my-1 px-3 py-1 rounded hover:bg-gray-200 transition-colors duration-200">AI Story Creator</button>
    </nav>
    <main class="container mx-auto mt-4 p-4">
      <AISkillTree v-if="currentView === 'skill-tree'" @node-unlocked="handleNodeUnlocked" ref="skillTree" />
      <AIChallenges v-if="currentView === 'challenges'" @challenge-completed="handleChallengeCompleted" />
      <AICodingDojo v-if="currentView === 'coding-dojo'" @challenge-completed="handleChallengeCompleted" />
      <AIStoryCreator v-if="currentView === 'story-creator'" />
    </main>
  </div>
  </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import AISkillTree from "../components/AISkillTree.vue";
import AIChallenges from "../components/AIChallenges.vue";
import AICodingDojo from "../components/AICodingDojo.vue";
import AIStoryCreator from "../components/AIStoryCreator.vue";  

export default {
  name: "GamificationView",
  components: {
    Sidebar,
    TopNavigation,
    AISkillTree,
    AIChallenges,
    AICodingDojo,
    AIStoryCreator,
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
      currentView: 'skill-tree'
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
    handleNodeUnlocked(node) {
      console.log(`Node unlocked: ${node.name}`)
      // You can add additional logic here, such as showing a congratulatory message
    },
    handleChallengeCompleted(xpEarned) {
      console.log(`Challenge completed! XP earned: ${xpEarned}`)
      this.$refs.skillTree.addXP(xpEarned)
      // You can add additional logic here, such as showing a congratulatory message
    }
  },
};
</script>
