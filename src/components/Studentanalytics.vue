<template>
  <div class="min-h-screen bg-slate-950 text-white p-4 lg:p-6" style="width:80%; margin-inline:auto;">
    <!-- Header -->
    <header
      class="w-full p-3 sm:p-4 md:p-5 lg:p-6 bg-slate-900/50  rounded-xl shadow-lg mb-4 sm:mb-5 md:mb-6"
    >
      <div
        class="flex flex-col xs:flex-col justify-between items-start xs:items-center gap-3 sm:gap-4 md:gap-5"
      >
        <div class="w-full xs:w-auto md:flex-1">
          <h1
            class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent truncate"
          >
            Student Analytics Dashboard
          </h1>
          <p
            class="text-xs sm:text-sm md:text-base text-slate-400 mt-0.5 sm:mt-1"
          >
            Academic Year 2023-2024 | Semester 2
          </p>
        </div>

        <div
          class="flex flex-col xs:flex-row gap-2 sm:gap-3 md:gap-4 w-full xs:w-auto md:min-w-[300px] lg:min-w-[350px]"
        >
          <div class="relative w-full xs:w-auto md:flex-1">
            <select
              class="w-full bg-slate-800 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-slate-700 hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
            >
              <option>Current Term</option>
              <option>Previous Term</option>
            </select>
            <!-- Custom select arrow -->
            <div
              class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button
            class="w-full xs:w-auto md:flex-1 bg-blue-600 hover:bg-blue-500 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:bg-blue-700 font-medium"
          >
            Download Report
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
      <!-- Education Analytics -->
      <div class="bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-blue-400">
            Education Analytics
          </h2>
          <div class="px-3 py-1 bg-blue-500/10 rounded-full">
            <span class="text-sm text-blue-400">GPA: 3.8</span>
          </div>
        </div>
        <div class="relative h-[300px]">
          <canvas id="educationChart"></canvas>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <div
            v-for="(subject, index) in [
              'Math',
              'Science',
              'English',
              'History',
              'Art',
            ]"
            :key="index"
            class="bg-slate-800/50 px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors"
          >
            {{ subject }}
          </div>
        </div>
      </div>

      <!-- Behavioral Analytics -->
      <div class="bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-blue-400">
            Behavioral Analytics
          </h2>
          <div class="px-3 py-1 bg-blue-500/10 rounded-full">
            <span class="text-sm text-blue-400">Progress: 65%</span>
          </div>
        </div>
        <div class="relative h-[300px]">
          <canvas id="behaviorChart"></canvas>
        </div>
        <div class="mt-4 p-4 bg-slate-800/50 rounded-lg">
          <p class="text-sm text-slate-300">
            Student demonstrates strong leadership qualities and excellent
            teamwork skills.
          </p>
        </div>
      </div>

      <!-- Attendance Metrics -->
      <div class="bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-blue-400">
            Attendance Metrics
          </h2>
          <div class="px-3 py-1 bg-green-500/10 rounded-full">
            <span class="text-sm text-green-400">95% Present</span>
          </div>
        </div>
        <div class="relative h-[300px]">
          <canvas id="attendanceChart"></canvas>
        </div>
        <div class="mt-4 grid grid-cols-3 gap-3">
          <div class="bg-green-500/10 p-3 rounded-lg text-center">
            <div class="text-green-400 font-semibold">Present</div>
            <div class="text-sm text-green-300">95%</div>
          </div>
          <div class="bg-yellow-500/10 p-3 rounded-lg text-center">
            <div class="text-yellow-400 font-semibold">Late</div>
            <div class="text-sm text-yellow-300">3%</div>
          </div>
          <div class="bg-red-500/10 p-3 rounded-lg text-center">
            <div class="text-red-400 font-semibold">Absent</div>
            <div class="text-sm text-red-300">2%</div>
          </div>
        </div>
      </div>

      <!-- Performance Summary -->
      <div class="bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-blue-400">
            Performance Summary
          </h2>
          <div class="px-3 py-1 bg-blue-500/10 rounded-full">
            <span class="text-sm text-blue-400">Grade: A-</span>
          </div>
        </div>
        <div class="relative h-[300px]">
          <canvas id="performanceChart"></canvas>
        </div>
        <div class="mt-4 space-y-3">
          <div
            class="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg"
          >
            <span class="text-sm text-slate-300">Assignments Completed</span>
            <span class="text-sm text-green-400 font-semibold">28/30</span>
          </div>
          <div
            class="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg"
          >
            <span class="text-sm text-slate-300">Average Score</span>
            <span class="text-sm text-blue-400 font-semibold">88%</span>
          </div>
        </div>
      </div>

      <!-- Growth Trends -->
      <div
        class="bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl shadow-lg lg:col-span-2"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-blue-400">Growth Trends</h2>
          <div class="px-3 py-1 bg-blue-500/10 rounded-full">
            <span class="text-sm text-blue-400">5-Year Overview</span>
          </div>
        </div>
        <div class="relative h-[300px]">
          <canvas id="growthChart"></canvas>
        </div>
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-slate-800/50 p-3 rounded-lg">
            <div class="text-blue-400 font-semibold">Academic Growth</div>
            <div class="text-sm text-blue-300">+15% YoY</div>
          </div>
          <div class="bg-slate-800/50 p-3 rounded-lg">
            <div class="text-green-400 font-semibold">Skill Development</div>
            <div class="text-sm text-green-300">+20% YoY</div>
          </div>
          <div class="bg-slate-800/50 p-3 rounded-lg">
            <div class="text-yellow-400 font-semibold">Leadership</div>
            <div class="text-sm text-yellow-300">+12% YoY</div>
          </div>
          <div class="bg-slate-800/50 p-3 rounded-lg">
            <div class="text-purple-400 font-semibold">Extra-curricular</div>
            <div class="text-sm text-purple-300">+18% YoY</div>
          </div>
        </div>
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
  mounted() {
    this.initCharts();
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
              label: "Subject Scores",
              data: this.educationData,
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              borderColor: "#3b82f6",
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(148, 163, 184, 0.1)",
                drawBorder: false,
              },
              ticks: {
                color: "rgb(148, 163, 184)",
                font: { size: 11 },
                padding: 10,
              },
            },
            x: {
              grid: { display: false },
              ticks: {
                color: "rgb(148, 163, 184)",
                font: { size: 11 },
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
              label: "Behavioral Scores",
              data: this.behaviorData,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "#3b82f6",
              pointBackgroundColor: "#3b82f6",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#3b82f6",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: "rgba(148, 163, 184, 0.2)" },
              grid: { color: "rgba(148, 163, 184, 0.2)" },
              pointLabels: {
                color: "rgb(148, 163, 184)",
                font: { size: 11 },
              },
              ticks: {
                color: "rgb(148, 163, 184)",
                backdropColor: "transparent",
                font: { size: 11 },
              },
            },
          },
          plugins: {
            legend: { display: false },
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
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#3b82f6",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              min: 50,
              max: 100,
              grid: {
                color: "rgba(148, 163, 184, 0.1)",
                drawBorder: false,
              },
              ticks: {
                color: "rgb(148, 163, 184)",
                font: { size: 11 },
              },
            },
            x: {
              grid: { display: false },
              ticks: {
                color: "rgb(148, 163, 184)",
                font: { size: 11 },
              },
            },
          },
        },
      });

      // Performance Summary Chart
      new Chart(document.getElementById("performanceChart"), {
        type: "doughnut",
        data: {
          labels: [
            "Assignments",
            "Quizzes",
            "Exams",
            "Projects",
            "Participation",
          ],
          datasets: [
            {
              data: this.performanceData,
              backgroundColor: [
                "rgba(59, 130, 246, 0.8)",
                "rgba(16, 185, 129, 0.8)",
                "rgba(245, 158, 11, 0.8)",
                "rgba(99, 102, 241, 0.8)",
                "rgba(139, 92, 246, 0.8)",
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: "rgb(148, 163, 184)",
                padding: 20,
                font: { size: 11 },
              },
            },
          },
          cutout: "70%",
        },
      });

      // Growth Trends Chart
      new Chart(document.getElementById("growthChart"), {
        type: "line",
        data: {
          labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
          datasets: [
            {
              label: "Academic Growth",
              data: this.growthData,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#3b82f6",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              grid: {
                color: "rgba(148, 163, 184, 0.1)",
                drawBorder: false,
              },
              ticks: {
                color: "rgb(148, 163, 184)",
                font: { size: 11 },
                callback: (value) => `${value}%`,
              },
            },
            x: {
              grid: { display: false },
              ticks: {
                color: "rgb(148, 163, 184)",
                font: { size: 11 },
              },
            },
          },
        },
      });
    },
  },
  beforeUnmount() {
    // Cleanup charts when component is destroyed
    Chart.instances.forEach((chart) => chart.destroy());
  },
};
</script>

<style scoped>
/* Base transitions */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Chart container styling */
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Glass effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Responsive chart heights */
canvas {
  max-height: 300px;
  width: 100% !important;
}

/* Media queries for responsive design */
@media (max-width: 1024px) {
  canvas {
    max-height: 280px;
  }
}

@media (max-width: 640px) {
  canvas {
    max-height: 240px;
  }
}

/* Hover effects */
.hover-scale {
  transition: transform 0.3s ease-in-out;
}

.hover-scale:hover {
  transform: scale(1.02);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(148, 163, 184, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.3);
}
</style>
