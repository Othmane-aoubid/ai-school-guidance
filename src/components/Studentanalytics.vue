<template>
  <div class="min-h-screen text-white flex flex-col items-center p-4">
    <!-- Header -->
    <header class="w-full flex justify-between items-center py-4 px-6 bg-gray-800 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-blue-400">AI School Guidance</h1>
      <div>
        <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          <i class="fas fa-user"></i> Profile
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="w-full mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Education Analytics -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-4">Education Analytics</h2>
        <canvas id="educationChart"></canvas>
        <p class="mb-4">Analyze subject-wise academic performance of students. This chart highlights scores across various subjects such as Math, Science, and English.</p>
      </div>

      <!-- Behavioral Analytics -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-4">Behavioral Analytics</h2>
        <p class="mb-4">Track behavioral patterns like respect, focus, participation, and teamwork among students to foster a better learning environment.</p>
        <canvas id="behaviorChart"></canvas>
      </div>

      <!-- Attendance Metrics -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-4">Attendance Metrics</h2>
        <p class="mb-4">Monitor attendance trends over the months to identify patterns and ensure consistent participation.</p>
        <canvas id="attendanceChart"></canvas>
      </div>

      <!-- Performance Summary -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-4">Performance Summary</h2>
        <p class="mb-4">Gain an overview of performance across various metrics such as assignments, quizzes, and projects.</p>
        <canvas id="performanceChart"></canvas>
      </div>

      <!-- Growth Trends -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-4">Growth Trends</h2>
        <p class="mb-4">Visualize year-over-year growth in academic and behavioral performance to assess improvement over time.</p>
        <canvas id="growthChart"></canvas>
      </div>

      <!-- Custom Recommendations -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-4">Custom Recommendations</h2>
        <p class="mb-4">Get tailored suggestions to improve student performance and engagement based on analyzed data.</p>
        <ul class="list-disc ml-4">
          <li>Encourage group activities to boost teamwork.</li>
          <li>Focus on subjects with declining trends.</li>
          <li>Implement attendance rewards to enhance participation.</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      educationData: [70, 85, 90, 75, 88],
      behaviorData: [60, 80, 70, 90, 85],
      attendanceData: [95, 90, 88, 93, 92],
      performanceData: [80, 75, 78, 85, 82],
      growthData: [50, 65, 75, 85, 95],
    };
  },
  methods: {
    initCharts() {
      // Education Analytics Chart
      new Chart(document.getElementById("educationChart"), {
        type: "bar",
        data: {
          labels: ["Math", "Science", "English", "History", "Art"],
          datasets: [
            {
              label: "Scores",
              data: this.educationData,
              backgroundColor: "#3b82f6",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
        },
      });

      // Behavioral Analytics Chart
      new Chart(document.getElementById("behaviorChart"), {
        type: "radar",
        data: {
          labels: ["Respect", "Focus", "Participation", "Attitude", "Teamwork"],
          datasets: [
            {
              label: "Scores",
              data: this.behaviorData,
              backgroundColor: "rgba(59, 130, 246, 0.5)",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
        },
      });

      // Attendance Metrics Chart
      new Chart(document.getElementById("attendanceChart"), {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May"],
          datasets: [
            {
              label: "Attendance %",
              data: this.attendanceData,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.3)",
              fill: true,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
        },
      });

      // Performance Summary Chart
      new Chart(document.getElementById("performanceChart"), {
        type: "pie",
        data: {
          labels: ["Assignments", "Quizzes", "Exams", "Projects", "Participation"],
          datasets: [
            {
              data: this.performanceData,
              backgroundColor: [
                "#3b82f6",
                "#1f2937",
                "#2563eb",
                "#4f46e5",
                "#9333ea",
              ],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
        },
      });

      // Growth Trends Chart
      new Chart(document.getElementById("growthChart"), {
        type: "line",
        data: {
          labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
          datasets: [
            {
              label: "Growth %",
              data: this.growthData,
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79, 70, 229, 0.3)",
              fill: true,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.initCharts();
  },
};
</script>

