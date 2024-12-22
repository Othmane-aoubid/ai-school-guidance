<template>
  <div
    class="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 sm:p-6 lg:p-8"
  >
    <div class="">
      <!-- Summary Header -->
      <div class="mb-10 text-center">
        <h1
          class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3"
        >
          Your Career Profile
        </h1>
        <p class="text-lg text-gray-300">
          Based on your responses, here's your personalized career analysis
        </p>
      </div>

      <!-- Profile Summary Card -->
      <div
        class="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 mb-10 shadow-lg border border-gray-700/50 transition-all duration-300 hover:shadow-xl"
      >
        <h2 class="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
          <UserCircleIcon class="w-6 h-6 mr-2 text-blue-400" />
          Profile Summary
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <div
              v-for="(value, key) in profileSummary"
              :key="key"
              class="flex justify-between"
            >
              <span class="text-gray-400">{{ key }}:</span>
              <span class="text-gray-200">{{ value }}</span>
            </div>
          </div>
        </div>

        <!-- Skills and Values -->
        <div class="mt-6 space-y-4">
          <div v-for="(items, title) in skillsAndValues" :key="title">
            <h3 class="text-gray-200 font-medium mb-2">{{ title }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="item in items"
                :key="item"
                class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm transition-all duration-300 hover:bg-blue-500/30"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Career Recommendations -->
      <div class="space-y-6">
        <h2 class="text-3xl font-semibold text-gray-100 flex items-center">
          <BriefcaseIcon class="w-7 h-7 mr-2 text-blue-400" />
          Recommended Careers "Coming Soon"
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="career in recommendedCareers"
            :key="career.title"
            class="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-xl font-medium text-gray-100">
                {{ career.title }}
              </h3>
              <span
                class="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs"
              >
                {{ career.growth }} Growth
              </span>
            </div>
            <p class="text-gray-400 text-sm mb-4">
              {{ career.description }}
            </p>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Salary Range:</span>
                <span class="text-gray-200">{{ career.salaryRange }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-400">Growth Potential:</span>
                <span class="text-gray-200">{{ career.growth }}</span>
              </div>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="skill in career.requiredSkills"
                :key="skill"
                class="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs transition-colors duration-300 hover:bg-gray-600"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="mt-10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
      >
        <button
          @click="$router.push('/career-matching')"
          class="w-full sm:w-auto px-6 py-3 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
        >
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Edit Responses
        </button>
        <button
          @click="saveResults"
          class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
        >
          <SaveIcon class="w-4 h-4 mr-2" />
          Save Results
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCareerMatchingStore } from "../stores/careerMatching";
import { useAuthStore } from "../stores/auth";
import {
  UserCircleIcon,
  BriefcaseIcon,
  ArrowLeftIcon,
  SaveIcon,
} from "lucide-vue-next";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  limit,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export default {
  name: "CareerMatchingResults",

  components: {
    UserCircleIcon,
    BriefcaseIcon,
    ArrowLeftIcon,
    SaveIcon,
  },

  data() {
    return {
      store: useCareerMatchingStore(),
      authStore: useAuthStore(),
      storedResults: null,
      isLoading: true,
    };
  },

  computed: {
    profileSummary() {
      return {
        Motivation:
          this.storedResults?.personalData?.motivation || "Not specified",
        "Work Style":
          this.storedResults?.personalData?.workStyle || "Not specified",
        "Education Level":
          this.storedResults?.educationData?.level || "Not specified",
        "Field of Study":
          this.storedResults?.educationData?.field || "Not specified",
        Experience: `${
          this.storedResults?.educationData?.experience || 0
        } years`,
        "Preferred Environment":
          this.storedResults?.careerData?.preferredEnvironments?.join(", ") ||
          "Not specified",
        "Salary Expectation":
          this.storedResults?.careerData?.salaryExpectation || "Not specified",
      };
    },

    skillsAndValues() {
      return {
        "Top Skills": this.storedResults?.personalData?.selectedSkills || [],
        "Work Values": this.storedResults?.personalData?.careerInterests
          ? [this.storedResults.personalData.careerInterests]
          : [],
      };
    },

    recommendedCareers() {
      return this.generateCareerRecommendations();
    },
  },

  methods: {
    async fetchResultsFromFirestore() {
      try {
        console.log("Starting fetch...");
        if (!this.authStore.user?.uid) {
          console.error("No user ID available");
          return;
        }

        const submissionsRef = collection(db, "careerMatchingSubmissions");
        const q = query(
          submissionsRef,
          where("userId", "==", this.authStore.user.uid)
        );

        console.log("Executing query for user:", this.authStore.user.uid);
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Get the most recent document by sorting in memory
          const docs = querySnapshot.docs;
          const sortedDocs = docs.sort((a, b) => {
            const timeA = a.data().createdAt?.seconds || 0;
            const timeB = b.data().createdAt?.seconds || 0;
            return timeB - timeA;
          });

          const mostRecentDoc = sortedDocs[0];
          console.log("Found document:", mostRecentDoc.data());
          this.storedResults = mostRecentDoc.data();
        } else {
          console.log("No matching documents found");
          this.$router.push("/career-matching");
        }
      } catch (error) {
        console.error("Error in fetchResultsFromFirestore:", error);
        console.log("Full error details:", error); // Added for debugging
      } finally {
        this.isLoading = false;
      }
    },

    generateCareerRecommendations() {
      const recommendations = [];
      if (!this.storedResults) return recommendations;

      // Access the stored skills from personalData
      const userSkills = new Set(this.storedResults.personalData.skills || []);
      const userIndustry = this.storedResults.personalData.industryPreference;
      const userWorkStyle = this.storedResults.personalData.workStyle;

      // Enhanced career mappings based on collected data
      const careerMappings = {
        Technology: [
          {
            title: "Software Developer",
            description:
              "Design and develop innovative software solutions while working with cutting-edge technologies.",
            salaryRange: "$70,000 - $150,000",
            growth: "High",
            requiredSkills: [
              "Technical Skills",
              "Problem Solving",
              "Collaboration",
            ],
            workStyles: ["Independent Work", "Team Collaboration"],
            industry: "Technology",
          },
          // ... other technology careers
        ],
        Business: [
          {
            title: "Business Analyst",
            description:
              "Analyze business processes and propose solutions for optimization.",
            salaryRange: "$60,000 - $120,000",
            growth: "Moderate",
            requiredSkills: ["Analysis", "Communication", "Problem Solving"],
            workStyles: ["Team Collaboration", "Project-based"],
            industry: "Consulting",
          },
          // ... other business careers
        ],
        // ... other industry categories
      };

      // Match careers based on multiple factors
      Object.values(careerMappings).forEach((careers) => {
        careers.forEach((career) => {
          let score = 0;

          // Skills match
          const matchingSkills = career.requiredSkills.filter((skill) =>
            userSkills.has(skill)
          );
          score += (matchingSkills.length / career.requiredSkills.length) * 50;

          // Industry match
          if (career.industry === userIndustry) {
            score += 25;
          }

          // Work style match
          if (career.workStyles.includes(userWorkStyle)) {
            score += 25;
          }

          // Add career if there's a good overall match (score > 50)
          if (score > 50) {
            recommendations.push({
              ...career,
              matchScore: score,
            });
          }
        });
      });

      // Sort by match score
      return recommendations.sort((a, b) => b.matchScore - a.matchScore);
    },

    async saveResults() {
      try {
        const resultData = {
          userId: this.authStore.user?.uid,
          profile: this.storedResults,
          recommendations: this.recommendedCareers,
          savedAt: new Date(),
        };

        // Save to a separate collection for historical records
        await addDoc(collection(db, "careerResults"), resultData);
        alert("Results saved successfully!");
      } catch (error) {
        console.error("Error saving results:", error);
        alert("Failed to save results");
      }
    },
  },

  mounted() {
    this.fetchResultsFromFirestore();
  },
};
</script>
