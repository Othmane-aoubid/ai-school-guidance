<template>
  <div>
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
          <h2
            class="text-2xl font-semibold text-gray-100 mb-6 flex items-center"
          >
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
          <div
            v-if="recommendedCareers.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div
              v-for="(career, index) in recommendedCareers"
              :key="index"
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
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="(skill, skillIndex) in career.requiredSkills"
                  :key="skillIndex"
                  class="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs transition-colors duration-300 hover:bg-gray-600"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-gray-400 text-center">
              No career recommendations available.
            </p>
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
          <button
            @click="getGuidance"
            class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white green-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            show recommendations
          </button>
          <button
            @click="deleteAccount"
            class="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center"
          >
            <TrashIcon class="w-4 h-4 mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </div>

    <!-- Add this modal for password confirmation -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 class="text-xl font-semibold text-white mb-4">
          Confirm Account Deletion
        </h3>
        <p class="text-gray-300 mb-4">
          Please enter your password to delete your account. This action cannot
          be undone.
        </p>
        <input
          v-model="deletePassword"
          type="password"
          placeholder="Enter your password"
          class="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete Account
          </button>
        </div>
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
  TrashIcon,
} from "lucide-vue-next";
import axios from "axios";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useToast } from "vue-toastification";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config"; // Make sure this import path is correct
// import { useLangflow } from "../composables/useLangflow";
// import langflowApi from "../utils/langflowApi"; // Adjust the path based on your structure

// const { isLoading, error, response, runAIGuidance } = useLangflow(
//   import.meta.env.VITE_LANGFLOW_TOKEN
// );

// class LangflowClient {
//   constructor(baseURL, applicationToken) {
//     this.baseURL = baseURL;
//     this.applicationToken = applicationToken;
//   }
//   async post(endpoint, body, headers = { "Content-Type": "application/json" }) {
//     headers["Authorization"] = `Bearer ${this.applicationToken}`;
//     headers["Content-Type"] = "application/json";
//     const url = `${this.baseURL}${endpoint}`;
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: headers,
//         body: JSON.stringify(body),
//       });

//       const responseMessage = await response.json();
//       if (!response.ok) {
//         throw new Error(
//           `${response.status} ${response.statusText} - ${JSON.stringify(
//             responseMessage
//           )}`
//         );
//       }
//       return responseMessage;
//     } catch (error) {
//       console.error("Request Error:", error.message);
//       throw error;
//     }
//   }

//   async initiateSession(
//     flowId,
//     langflowId,
//     inputValue,
//     inputType = "chat",
//     outputType = "chat",
//     stream = false,
//     tweaks = {}
//   ) {
//     const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
//     return this.post(endpoint, {
//       input_value: inputValue,
//       input_type: inputType,
//       output_type: outputType,
//       tweaks: tweaks,
//     });
//   }

//   handleStream(streamUrl, onUpdate, onClose, onError) {
//     const eventSource = new EventSource(streamUrl);

//     eventSource.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       onUpdate(data);
//     };

//     eventSource.onerror = (event) => {
//       console.error("Stream Error:", event);
//       onError(event);
//       eventSource.close();
//     };

//     eventSource.addEventListener("close", () => {
//       onClose("Stream closed");
//       eventSource.close();
//     });

//     return eventSource;
//   }

//   async runFlow(
//     flowIdOrName,
//     langflowId,
//     inputValue,
//     inputType = "chat",
//     outputType = "chat",
//     tweaks = {},
//     stream = false,
//     onUpdate,
//     onClose,
//     onError
//   ) {
//     try {
//       const initResponse = await this.initiateSession(
//         flowIdOrName,
//         langflowId,
//         inputValue,
//         inputType,
//         outputType,
//         stream,
//         tweaks
//       );
//       console.log("Init Response:", initResponse);
//       if (
//         stream &&
//         initResponse &&
//         initResponse.outputs &&
//         initResponse.outputs[0].outputs[0].artifacts.stream_url
//       ) {
//         const streamUrl =
//           initResponse.outputs[0].outputs[0].artifacts.stream_url;
//         console.log(`Streaming from: ${streamUrl}`);
//         this.handleStream(streamUrl, onUpdate, onClose, onError);
//       }
//       return initResponse;
//     } catch (error) {
//       console.error("Error running flow:", error);
//       onError("Error initiating session");
//     }
//   }
// }

export default {
  name: "CareerMatchingResults",

  components: {
    UserCircleIcon,
    BriefcaseIcon,
    ArrowLeftIcon,
    SaveIcon,
    TrashIcon,
  },

  data() {
    return {
      store: useCareerMatchingStore(),
      authStore: useAuthStore(),
      toast: useToast(),
      storedResults: null,
      isLoading: true,
      apiBaseUrl: "http://localhost:5000/api",
      matches: [],
      apiToken: null,
      showDeleteModal: false,
      deletePassword: "",
      firebaseIdToken: null,
      applicationToken: import.meta.env.VITE_LANGFLOW_TOKEN,
      recommendedCareers: [],
      topSkills: [],
      experience: 0,
      education: [],
      fieldOfStudy: "",
      preferredEnvironment: "",
      workStyle: "",
      motivation: "",
      salaryExpectation: "",
    };
  },

  computed: {
    profileSummary() {
      const summary = {
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
        "Top Skills":
          this.storedResults?.personalData?.selectedSkills?.join(", ") ||
          "Not specified",
        "Work Values":
          this.storedResults?.personalData?.careerInterests || "Not specified",
      };

      console.log(`Motivation: ${summary.Motivation}`);
      console.log(`Work Style: ${summary["Work Style"]}`);
      console.log(`Education Level: ${summary["Education Level"]}`);
      console.log(`Field of Study: ${summary["Field of Study"]}`);
      console.log(`Experience: ${summary.Experience}`);
      console.log(`Preferred Environment: ${summary["Preferred Environment"]}`);
      console.log(`Salary Expectation: ${summary["Salary Expectation"]}`);
      console.log(`Top Skills: ${summary["Top Skills"]}`);
      console.log(`Work Values: ${summary["Work Values"]}`);

      return summary;
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
    async initializeAPI() {
      try {
        // Get Firebase ID token
        const idToken = await this.authStore.user.getIdToken(true);

        try {
          // Try login first
          const loginResponse = await axios.post(`${this.apiBaseUrl}/login`, {
            email: this.authStore.user.email,
            password: idToken,
          });

          this.apiToken = loginResponse.data.token;
        } catch (loginError) {
          // If login fails, try registering
          await axios.post(`${this.apiBaseUrl}/register`, {
            email: this.authStore.user.email,
            password: idToken,
            user_type: "candidate",
          });

          // Then try login again
          const loginResponse = await axios.post(`${this.apiBaseUrl}/login`, {
            email: this.authStore.user.email,
            password: idToken,
          });

          this.apiToken = loginResponse.data.token;
        }

        return true;
      } catch (error) {
        console.error(
          "Error in initializeAPI:",
          error.response?.data || error.message
        );
        console.log(`API initialization failed: ${error.message}`, "error");
        return false;
      }
    },
    async fetchLatestSubmission() {
      try {
        this.isLoading = true;
        const userId = this.authStore.user.uid;

        const submissionsRef = collection(db, "careerMatchingSubmissions");
        const q = query(submissionsRef, where("userId", "==", userId));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const sortedDocs = querySnapshot.docs.sort(
            (a, b) => b.data().timestamp - a.data().timestamp
          );
          const latestSubmission = sortedDocs[0].data();

          this.storedResults = latestSubmission;
        } else {
          this.storedResults = null;
        }
      } catch (error) {
        this.toast.error("Failed to fetch your results");
        this.storedResults = null;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchResultsFromAPI() {
      try {
        this.isLoading = true;

        // Initialize API connection if needed
        if (!this.firebaseIdToken) {
          const success = await this.initializeAPI();
          if (!success) {
            throw new Error("Failed to initialize API");
          }
        }

        // Define local variables for each item
        this.topSkills = this.skillsAndValues["Top Skills"] || [];
        this.experience =
          this.profileSummary["Experience"]?.replace(" years", "") || "0";
        this.education = [this.profileSummary["Education Level"]];
        this.fieldOfStudy = this.profileSummary["Field of Study"];
        this.preferredEnvironment =
          this.profileSummary["Preferred Environment"];
        this.workStyle = this.profileSummary["Work Style"];
        this.motivation = this.profileSummary["Motivation"];
        this.salaryExpectation = this.profileSummary["Salary Expectation"];

        // Create candidate profile
        await axios.post(
          `${this.apiBaseUrl}/candidate/profile`,
          {
            email: this.authStore.user.email,
            name: this.authStore.user.displayName || "Unknown",
            skills: this.skillsAndValues["Top Skills"] || [],
            experience:
              this.profileSummary["Experience"]?.replace(" years", "") || "0",
            education: [this.profileSummary["Education Level"]],
            field_of_study: this.profileSummary["Field of Study"],
            preferred_environment: this.profileSummary["Preferred Environment"],
            work_style: this.profileSummary["Work Style"],
            motivation: this.profileSummary["Motivation"],
            salary_expectation: this.profileSummary["Salary Expectation"],
          },
          {
            headers: {
              Authorization: `Bearer ${this.firebaseIdToken}`,
            },
          }
        );

        // Add this check after profile creation
        const profileResponse = await axios.get(
          `${this.apiBaseUrl}/candidate/profile/${this.authStore.user.email}`,
          {
            headers: {
              Authorization: `Bearer ${this.firebaseIdToken}`,
            },
          }
        );

        if (profileResponse.data) {
          this.toast.success("Candidate profile created successfully");
        }

        // Get job matches
        const matchResponse = await axios.get(
          `${this.apiBaseUrl}/match/jobs?email=${this.authStore.user.email}`,
          {
            headers: {
              Authorization: `Bearer ${this.firebaseIdToken}`,
            },
          }
        );

        this.matches = matchResponse.data.matches;
      } catch (error) {
        this.toast.error(`Failed to fetch results: ${error.message}`);
      } finally {
        this.isLoading = false;
      }
    },
    async saveResults() {
      try {
        if (!this.firebaseIdToken) {
          await this.initializeAPI();
        }

        // Create a job posting from the career matching results
        const jobResponse = await axios.post(
          `${this.apiBaseUrl}/jobs`,
          {
            title:
              this.storedResults?.careerData?.preferredRole || "Not specified",
            company: "User Preference",
            location:
              this.storedResults?.careerData?.preferredEnvironments?.[0] ||
              "Not specified",
            required_skills:
              this.storedResults?.personalData?.selectedSkills || [],
            experience_required:
              this.storedResults?.educationData?.experience || "0",
            description: "Based on user career matching results",
          },
          {
            headers: {
              Authorization: `Bearer ${this.firebaseIdToken}`,
            },
          }
        );

        this.toast.success("Results saved successfully");
      } catch (error) {
        this.toast.error(`Failed to save results: ${error.message}`);
      }
    },
    generateCareerRecommendations() {
      return this.recommendedCareers.map((match) => ({
        title: match.job.title,
        description: match.job.description || "No description available",
        salaryRange: match.job.salaryRange || "Not specified",
        growth: this.getGrowthFromScore(match.match_score),
        requiredSkills: match.job.required_skills || [],
        matchScore: match.match_score,
      }));
    },
    getGrowthFromScore(score) {
      if (score >= 80) return "High";
      if (score >= 50) return "Moderate";
      return "Low";
    },
    async deleteAccount() {
      this.showDeleteModal = true;
    },
    async confirmDelete() {
      if (!this.deletePassword) {
        this.toast.error("Please enter your password");
        return;
      }

      try {
        // Delete from API
        if (!this.firebaseIdToken) {
          await this.initializeAPI();
        }

        await axios.delete(`${this.apiBaseUrl}/delete-account`, {
          headers: {
            Authorization: `Bearer ${this.firebaseIdToken}`,
          },
          data: {
            email: this.authStore.user.email,
          },
        });

        this.toast.success("Account successfully deleted");
        this.showDeleteModal = false;
        this.deletePassword = "";
        this.$router.push("/");
      } catch (error) {
        console.error("Error deleting account:", error);
        this.toast.error(
          `Failed to delete account: ${error.message || "Please try again"}`
        );
      }
    },
    parseCareerRecommendations(text) {
      console.log("text")
      // try {
      //   // If text is already a string, use it directly
      //   const textToProcess =
      //     typeof text === "string" ? text : text?.text || "";

      //   // Extract JSON from the markdown code block
      //   const jsonMatch = textToProcess.match(/```(?:json)?\n([\s\S]*?)\n```/);
      //   if (jsonMatch && jsonMatch[1]) {
      //     const data = JSON.parse(jsonMatch[1]);
      //     // Map the recommendations to match our display format
      //     return data.recommendations.map((rec) => ({
      //       title: rec.career,
      //       description: rec.rationale,
      //       match_score: rec.match_score,
      //     }));
      //   }
      //   return [];
      // } catch (err) {
      //   return [];
      // }
    },
    async getGuidance() {
      console.log("Getting guidance ...........");

      // const applicationToken = import.meta.env.VITE_LANGFLOW_TOKEN; // Using the environment variable

      // // Prepare the data to send
      // const data = {
      //   input_value: JSON.stringify({
      //     career: {
      //       motivation:
      //         this.storedResults?.personalData?.motivation ||
      //         "Motivation Example",
      //       workStyle:
      //         this.storedResults?.personalData?.workStyle ||
      //         "Work Style Example",
      //       workValues: Array.isArray(
      //         this.storedResults?.personalData?.careerInterests
      //       )
      //         ? this.storedResults.personalData.careerInterests.join(", ")
      //         : "Work Values Example",
      //       preferredEnvironment:
      //         this.storedResults?.careerData?.preferredEnvironments?.join(
      //           ", "
      //         ) || "Remote",
      //       salaryExpectation:
      //         this.storedResults?.careerData?.salaryExpectation ||
      //         "Not specified",
      //     },
      //     education: {
      //       level: this.storedResults?.educationData?.level || "Bachelor's",
      //       field:
      //         this.storedResults?.educationData?.field || "Computer Science",
      //       experience: this.storedResults?.educationData?.experience || 0,
      //     },
      //     skills: this.storedResults?.personalData?.selectedSkills || [
      //       "Skill 1",
      //       "Skill 2",
      //     ],
      //   }),
      //   output_type: "chat",
      //   input_type: "chat",
      //   tweaks: {
      //     "ChatInput-b338Z": {},
      //     "ChatOutput-S2vI1": {},
      //     "TavilyAISearch-2UI4W": {},
      //     "Agent-SLQ37": {},
      //     "GoogleGenerativeAIModel-t9r4j": {},
      //     "GoogleGenerativeAIModel-Fyxgj": {},
      //     "StructuredOutputComponent-XlJOE": {},
      //     "ParseData-Jh2YM": {},
      //   },
      // };

      // try {
      //   this.isLoading = true;
      //   this.error = null;

      //   // Use the Langflow API client to make the request
      //   const response = await langflowApi.runCareerPathRecommendation(
      //     data,
      //     applicationToken
      //   );

      //   if (response && response.outputs) {
      //     this.recommendedCareers = response.outputs[0].outputs.map((rec) => ({
      //       title: rec.career,
      //       description: rec.rationale,
      //       growth: `${(rec.match_score * 100).toFixed(0)}%`,
      //       salaryRange: "Not available",
      //       requiredSkills: ["Not available"],
      //     }));
      //   }
      // } catch (error) {
      //   this.error = `Failed to get guidance: ${error.message}`;
      //   console.error("Error:", error);
      // } finally {
      //   this.isLoading = false;
      // }
    },
    async careerSuggestions() {},
  },
  async mounted() {
    await this.authStore.initializeAuth();
    if (this.authStore.user) {
      await this.fetchLatestSubmission(); // Only fetch Firebase data
    }
  },
  watch: {
    "authStore.user": {
      async handler(newUser) {
        if (newUser) {
          await this.fetchLatestSubmission(); // Only fetch Firebase data
        }
      },
      immediate: true,
    },
  },
};
</script>
