<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Game Status Banner -->
      <div
        v-if="gameStatus"
        class="bg-green-500/20 text-green-400 p-4 rounded-lg mb-8 text-center text-xl font-bold"
      >
        {{ gameStatus }}
      </div>

      <!-- XP and Progress Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- XP Display -->
        <div
          class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        >
          <div class="text-center">
            <div class="text-3xl font-bold">{{ totalXP }} XP</div>
            <div class="text-xs text-gray-400 mt-1">Total Experience</div>
          </div>
        </div>

        <!-- Level Display -->
        <div
          class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        >
          <div class="text-center">
            <div class="text-3xl font-bold">Level {{ currentLevel }}</div>
            <div class="text-xs text-gray-400 mt-1">Current Level</div>
          </div>
        </div>

        <!-- Skills Mastered -->
        <div
          class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        >
          <div class="text-center">
            <div class="text-3xl font-bold">
              {{ completedSkills }}/{{ totalSkills }}
            </div>
            <div class="text-xs text-gray-400 mt-1">Skills mastered</div>
          </div>
        </div>
      </div>

      <!-- Study Button -->
      <div class="flex items-center justify-center mb-8">
        <button
          @click="addXP(100)"
          class="w-full max-w-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Study Now
        </button>
      </div>

      <!-- Skill Tree Visualization -->
      <div
        class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700"
      >
        <h2 class="text-2xl font-bold mb-4 text-center">Skill Tree Progress</h2>
        <div class="relative">
          <div
            ref="networkContainer"
            class="w-full h-[400px] rounded-lg bg-gray-900/50"
          ></div>
        </div>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="node in skillNodes" :key="node.id" class="group relative">
          <div
            class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
            :class="{
              'border-green-500': node.status === 'completed',
              'border-yellow-500': node.status === 'in_progress',
              'border-gray-700': node.status === 'not_started',
            }"
          >
            <!-- Skill Header -->
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold">{{ node.name }}</h3>
              <span
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="{
                  'bg-green-500/20 text-green-400': node.status === 'completed',
                  'bg-yellow-500/20 text-yellow-400':
                    node.status === 'in_progress',
                  'bg-gray-700/20 text-gray-400': node.status === 'not_started',
                }"
              >
                Level {{ node.difficulty }}
              </span>
            </div>

            <!-- Skill Description -->
            <p class="text-gray-400 mb-4">{{ node.description }}</p>

            <!-- Skill Stats -->
            <div class="flex justify-between text-sm text-gray-500 mb-4">
              <span>XP Required: {{ node.xp_required }}</span>
              <span>{{ formatStatus(node.status) }}</span>
            </div>

            <!-- Action Button -->
            <button
              @click="unlockNode(node)"
              :disabled="!canUnlock(node)"
              class="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200"
              :class="[
                node.status === 'completed'
                  ? 'bg-green-500 text-white'
                  : node.status === 'in_progress'
                  ? 'bg-yellow-500 text-white'
                  : canUnlock(node)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed',
              ]"
            >
              {{ getButtonText(node) }}
            </button>

            <!-- Lock Overlay -->
            <div
              v-if="!canUnlock(node) && node.status === 'not_started'"
              class="mt-2 text-sm text-red-400"
            >
              <span class="flex items-center">
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Complete prerequisites first!
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Study Modal -->
      <div
        v-if="showStudyModal"
        class="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        @click.self="closeStudyModal"
      >
        <div
          class="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto border border-gray-700"
        >
          <!-- Modal Header -->
          <div class="p-6 border-b border-gray-700">
            <div class="flex justify-between items-center">
              <h2 class="text-2xl font-bold">{{ selectedSkill?.name }}</h2>
              <button
                @click="closeStudyModal"
                class="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-700">
            <div class="flex space-x-1 p-1">
              <button
                v-for="tab in [
                  'Theory',
                  'Examples',
                  'Practice',
                  'Quiz',
                  'Resources',
                ]"
                :key="tab"
                @click="activeTab = tab.toLowerCase()"
                class="flex-1 py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                :class="[
                  activeTab === tab.toLowerCase()
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                ]"
              >
                {{ tab }}
              </button>
            </div>
          </div>

          <!-- Content Area -->
          <div class="p-6 overflow-y-auto max-h-[60vh]">
            <div class="prose prose-invert max-w-none">
              <!-- Theory Tab -->
              <div
                v-if="activeTab === 'theory'"
                v-html="formatMarkdown(selectedSkill?.study_content.theory)"
              ></div>

              <!-- Examples Tab -->
              <div
                v-if="activeTab === 'examples'"
                v-html="formatMarkdown(selectedSkill?.study_content.examples)"
              ></div>

              <!-- Practice Tab -->
              <div
                v-if="activeTab === 'practice'"
                v-html="formatMarkdown(selectedSkill?.study_content.practice)"
              ></div>

              <!-- Quiz Tab -->
              <div
                v-if="activeTab === 'quiz' && selectedSkill"
                class="space-y-8"
              >
                <div
                  v-for="(quiz, index) in selectedSkill.quizzes"
                  :key="index"
                  class="bg-gray-800/50 rounded-xl p-6"
                >
                  <h3 class="text-xl font-bold mb-4">
                    Question {{ index + 1 }}
                  </h3>
                  <p class="text-gray-300 mb-6">{{ quiz.question }}</p>
                  <div class="space-y-3">
                    <label
                      v-for="(option, optIndex) in quiz.options"
                      :key="optIndex"
                      class="flex items-center p-4 rounded-lg cursor-pointer transition-colors"
                      :class="[
                        quizAnswers[index] === optIndex
                          ? 'bg-blue-500/20 border border-blue-500'
                          : 'bg-gray-800 border border-gray-700 hover:border-gray-600',
                      ]"
                    >
                      <input
                        type="radio"
                        :name="'quiz-' + index"
                        :value="optIndex"
                        v-model="quizAnswers[index]"
                        class="hidden"
                      />
                      <span class="ml-2">{{ option }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Resources Tab -->
              <div
                v-if="activeTab === 'resources' && selectedSkill"
                class="space-y-4"
              >
                <a
                  v-for="(resource, index) in selectedSkill.resources"
                  :key="index"
                  :href="resource.url"
                  target="_blank"
                  class="block p-4 rounded-lg bg-gray-800 border border-gray-700 hover:border-blue-500 transition-colors group"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-blue-400 group-hover:text-blue-300">
                      {{ resource.title }}
                    </span>
                    <span class="text-sm text-gray-500">{{
                      resource.type
                    }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-6 border-t border-gray-700">
            <div class="flex justify-end space-x-4">
              <button
                @click="closeStudyModal"
                class="px-6 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
              <button
                @click="completeStudySession"
                class="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transform transition-all duration-200 hover:scale-105"
              >
                Complete Study Session (+100 XP)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { skillTreeService } from "../services/skillTreeService";
import {
  onSnapshot,
  collection,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Network } from "vis-network";
import "vis-network/styles/vis-network.css";

export default {
  name: "AISkillTree",
  data() {
    return {
      skillNodes: [],
      totalXP: 0,
      gameStatus: "",
      showStudyModal: false,
      selectedSkill: null,
      activeTab: "theory",
      quizAnswers: {},
      unsubscribe: null,
      network: null,
    };
  },
  computed: {
    currentLevel() {
      return Math.floor(this.totalXP / 100) + 1;
    },
    nextLevelXP() {
      return this.currentLevel * 100;
    },
    completedSkills() {
      return this.skillNodes.filter((node) => node.status === "completed")
        .length;
    },
    totalSkills() {
      return this.skillNodes.length;
    },
  },
  methods: {
    formatStatus(status) {
      return status
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },

    async fetchSkills() {
      try {
        const skillsRef = collection(db, "skills");
        this.unsubscribe = onSnapshot(skillsRef, (snapshot) => {
          this.skillNodes = snapshot.docs.map((doc) => doc.data());
          this.updateSkillGraph();
          this.checkGameStatus();
        });
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    },

    updateSkillGraph() {
      if (!this.$refs.networkContainer) return;

      const graphData = skillTreeService.getSkillGraphData(this.skillNodes);
      const options = {
        nodes: {
          shape: "box",
          margin: 25,
          font: {
            size: 32,
            multi: true,
            face: "arial",
            bold: "700",
            color: "#000000",
          },
          borderWidth: 2,
          shadow: true,
          widthConstraint: {
            minimum: 250,
            maximum: 300,
          },
          heightConstraint: {
            minimum: 70,
          },
        },
        edges: {
          arrows: "to",
          color: "#4B5563",
          width: 2,
        },
        physics: {
          enabled: true,
          hierarchicalRepulsion: {
            nodeDistance: 350,
          },
          solver: "hierarchicalRepulsion",
        },
        layout: {
          hierarchical: {
            direction: "UD",
            sortMethod: "directed",
            levelSeparation: 300,
          },
        },
        interaction: {
          zoomView: true,
          navigationButtons: true,
        },
      };

      if (!this.network) {
        const container = this.$refs.networkContainer;
        this.network = new Network(container, graphData, options);

        this.network.on("click", (params) => {
          if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const skill = this.skillNodes.find((s) => s.id === nodeId);
            if (skill) this.unlockNode(skill);
          }
        });
      } else {
        this.network.destroy();
        this.network = new Network(
          this.$refs.networkContainer,
          graphData,
          options
        );
      }
    },

    canUnlock(node) {
      return (
        node.prerequisites.every(
          (prereqId) =>
            this.skillNodes.find((s) => s.id === prereqId)?.status ===
            "completed"
        ) && this.totalXP >= node.xp_required
      );
    },

    async unlockNode(node) {
      if (this.canUnlock(node)) {
        this.selectedSkill = node;
        this.showStudyModal = true;
        this.activeTab = "theory";
      }
    },

    getButtonText(node) {
      switch (node.status) {
        case "completed":
          return "Mastered!";
        case "in_progress":
          return "Continue Learning";
        default:
          return this.canUnlock(node) ? "Start Learning" : "Locked";
      }
    },

    async addXP(amount) {
      try {
        const userRef = doc(db, "users", "current-user");
        const newXP = this.totalXP + amount;
        await setDoc(userRef, { totalXP: newXP }, { merge: true });
        this.totalXP = newXP;
        this.checkGameStatus();
      } catch (error) {
        console.error("Error adding XP:", error);
      }
    },

    checkGameStatus() {
      if (this.skillNodes.every((node) => node.status === "completed")) {
        this.gameStatus =
          "🎉 Congratulations! You've mastered all AI skills! 🎉";
      } else {
        this.gameStatus = "";
      }
    },

    formatMarkdown(content) {
      if (!content) return "";
      const html = marked(content);
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
      return html;
    },

    closeStudyModal() {
      this.showStudyModal = false;
      this.selectedSkill = null;
      this.activeTab = "theory";
      this.quizAnswers = {};
    },

    async completeStudySession() {
      try {
        const newStatus =
          this.selectedSkill.status === "not_started"
            ? "in_progress"
            : "completed";

        await skillTreeService.updateSkillStatus(
          this.selectedSkill.id,
          newStatus
        );
        await this.addXP(100);
        this.closeStudyModal();
      } catch (error) {
        console.error("Error completing study session:", error);
        alert("Error updating progress. Please try again.");
      }
    },
  },
  async mounted() {
    // Create user document if it doesn't exist
    const userRef = doc(db, "users", "current-user");
    await setDoc(userRef, { totalXP: 0 }, { merge: true });

    await skillTreeService.initializeSkillsIfNeeded();
    await this.fetchSkills();

    // Set up user XP listener
    const userUnsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        this.totalXP = doc.data().totalXP || 0;
      }
    });

    this.unsubscribe = () => {
      userUnsubscribe();
      if (this.skillsUnsubscribe) {
        this.skillsUnsubscribe();
      }
    };
  },
  beforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.network) {
      this.network.destroy();
    }
  },
};
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose pre {
  background-color: #f4f4f4;
  padding: 1em;
  border-radius: 0.5em;
  margin: 1em 0;
}

.prose code {
  background-color: #f4f4f4;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
}

.prose h1 {
  font-size: 1.8em;
  font-weight: bold;
  margin: 1em 0;
}

.prose h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.8em 0;
}

.prose h3 {
  font-size: 1.2em;
  font-weight: bold;
  margin: 0.6em 0;
}

.prose ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin: 1em 0;
}

.prose ol {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin: 1em 0;
}
</style>
