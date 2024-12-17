<template>
  <div class="flex h-screen bg-gray-100" >
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopNavigation />
      <div class="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8" style="overflow-y: scroll">
        <CreerMatching />
        <!-- <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
              Career Guidance Questionnaire
            </h1>
            <p class="mt-4 text-lg text-gray-600">
              Answer these questions to help us understand your needs better
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div
              class="bg-white shadow rounded-lg p-6 mb-8"
              v-for="(section, index) in sections"
              :key="index"
            >
              <h2 class="text-xl font-semibold text-gray-900 mb-6">
                {{ section.title }}
              </h2>

              <div class="space-y-6">
                <div
                  v-for="question in section.questions"
                  :key="question.id"
                  class="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <QuestionItem
                    :question="question"
                    v-model="answers[question.id]"
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-center">
              <button
                type="submit"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Responses
              </button>
            </div>
          </form>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import QuestionItem from "../components/QuestionItem.vue";
import { useQuestionnaire } from "../useQuestionnaire";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import CreerMatching from "../components/CreerMatching.vue";

export default {
  name: "QuestionnaireForm",
  components: {
    QuestionItem,
    Sidebar,
    TopNavigation,
    CreerMatching,
  },
  data() {
    const { sections, answers } = useQuestionnaire();
    return {
      sections,
      answers,
    };
  },
  methods: {
    handleSubmit() {
      console.log("Form submitted:", this.answers);
      // Handle form submission logic here
    },
  },
};
</script>

