<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopNavigation />
      <div class="min-h-screen bg-gray-100 p-5 pb-3" style="overflow-y: scroll">
        <header class="bg-blue-600 text-white p-4">
          <h1 class="text-2xl font-bold">StudyMaster - Timetable</h1>
        </header>

        <main class="container mx-auto p-4">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">
              Your Study Timetable
            </h2>
            <div class="space-y-4">
              <div
                v-for="(session, index) in timetable"
                :key="index"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:shadow-lg"
                :class="{ 'border-l-4 border-blue-500': session.completed }"
              >
                <div>
                  <h3 class="font-medium text-lg text-gray-800">
                    {{ session.subject }}
                  </h3>
                  <p class="text-sm text-gray-600">{{ session.time }}</p>
                  <p class="text-sm text-gray-500">{{ session.description }}</p>
                </div>
                <div class="flex flex-col items-end">
                  <button
                    @click="toggleComplete(index)"
                    class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                    :class="
                      session.completed
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    "
                  >
                    {{ session.completed ? "Completed" : "Mark Complete" }}
                  </button>
                  <span class="text-sm text-gray-500 mt-2"
                    >{{ session.duration }} minutes</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-semibold mb-6 text-gray-800">
              Weekly Overview
            </h2>
            <canvas ref="weeklyChart"></canvas>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";

export default {
  name: "StudyTimetableView",
  components:{
    Sidebar,TopNavigation
  },
  setup() {
    const timetable = ref([
      {
        subject: "Mathematics",
        time: "09:00 AM - 10:30 AM",
        description: "Calculus: Limits and Continuity",
        duration: 90,
        completed: false,
      },
      {
        subject: "Physics",
        time: "11:00 AM - 12:30 PM",
        description: "Mechanics: Newton's Laws",
        duration: 90,
        completed: false,
      },
      {
        subject: "Computer Science",
        time: "02:00 PM - 03:30 PM",
        description: "Data Structures: Binary Trees",
        duration: 90,
        completed: true,
      },
      {
        subject: "English Literature",
        time: "04:00 PM - 05:30 PM",
        description: "Shakespeare: Hamlet Analysis",
        duration: 90,
        completed: false,
      },
    ]);

    const weeklyChart = ref(null);

    const toggleComplete = (index) => {
      timetable.value[index].completed = !timetable.value[index].completed;
      // Here you would typically update Firebase
      // firebase.firestore().collection('sessions').doc(sessionId).update({ completed: timetable.value[index].completed })
    };

    onMounted(() => {
      const ctx = weeklyChart.value.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              label: "Study Hours",
              data: [3, 5, 4, 6, 3, 2, 1],
              backgroundColor: "#3B82F6",
              borderColor: "#2563EB",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Hours",
              },
            },
          },
        },
      });
    });

    return {
      timetable,
      weeklyChart,
      toggleComplete,
    };
  },
};
</script>
