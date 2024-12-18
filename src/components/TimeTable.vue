<template>
  <div class="min-h-screen bg-slate-950 text-white p-4 lg:p-6">
    <!-- Header -->
    <header
      class="w-full p-3 sm:p-4 md:p-5 lg:p-6 bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg mb-4 sm:mb-5 md:mb-6"
    >
      <div
        class="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 sm:gap-4 md:gap-5"
      >
        <div class="w-full xs:w-auto md:flex-1">
          <h1
            class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            Interactive Study Timetable
          </h1>
          <p
            class="text-xs sm:text-sm md:text-base text-slate-400 mt-0.5 sm:mt-1"
          >
            Plan and track your study sessions effectively
          </p>
        </div>
        <div class="flex gap-2 sm:gap-3 w-full xs:w-auto">
          <button
            @click="saveSchedule"
            class="flex-1 xs:flex-none bg-slate-800 hover:bg-slate-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors border border-slate-700"
          >
            Save Schedule
          </button>
          <button
            @click="clearSchedule"
            class="flex-1 xs:flex-none bg-red-500/10 hover:bg-red-500/20 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm text-red-400 transition-colors border border-red-500/20"
          >
            Clear All
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Calendar Section -->
      <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg p-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-blue-400">Calendar</h2>
          <div class="flex gap-2">
            <button
              @click="previousMonth"
              class="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <span class="text-slate-300 font-medium">{{
              currentMonthYear
            }}</span>
            <button
              @click="nextMonth"
              class="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-center text-sm text-slate-400 py-2"
          >
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="date in calendarDates"
            :key="date.date"
            @click="selectDate(date)"
            :class="[
              'p-2 rounded-lg text-sm transition-colors',
              date.isCurrentMonth ? 'text-white' : 'text-slate-600',
              date.isToday
                ? 'bg-blue-500/20 text-blue-400'
                : 'hover:bg-slate-800',
              selectedDate && date.date === selectedDate.date
                ? 'ring-2 ring-blue-500'
                : '',
              hasSchedule(date) ? 'border-2 border-green-500/30' : '',
            ]"
          >
            {{ new Date(date.date).getDate() }}
          </button>
        </div>
      </div>

      <!-- Schedule Section -->
      <div
        class="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg p-4"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-blue-400">
            Schedule for {{ selectedDateFormatted }}
          </h2>
          <button
            @click="addTimeSlot"
            class="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-sm transition-colors"
          >
            Add Time Slot
          </button>
        </div>

        <!-- Time Slots -->
        <div class="space-y-3">
          <div
            v-for="(slot, index) in selectedDateSchedule"
            :key="index"
            class="bg-slate-800/50 rounded-lg p-3"
          >
            <div class="flex flex-col sm:flex-row gap-3">
              <!-- Time Selection -->
              <div class="flex gap-2 items-center">
                <input
                  type="time"
                  v-model="slot.startTime"
                  class="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm"
                />
                <span class="text-slate-400">to</span>
                <input
                  type="time"
                  v-model="slot.endTime"
                  class="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm"
                />
              </div>

              <!-- Subject Selection -->
              <div class="flex-1">
                <select
                  v-model="slot.subject"
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm"
                >
                  <option value="">Select Subject</option>
                  <option
                    v-for="subject in subjects"
                    :key="subject"
                    :value="subject"
                  >
                    {{ subject }}
                  </option>
                </select>
              </div>

              <!-- Actions -->
              <div class="flex gap-2">
                <button
                  @click="removeTimeSlot(index)"
                  class="p-1.5 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors"
                >
                  <svg
                    class="w-5 h-5"
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
          </div>

          <!-- Empty State -->
          <div
            v-if="!selectedDateSchedule.length"
            class="text-center py-8 text-slate-400"
          >
            No schedule items for this date. Click "Add Time Slot" to begin.
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <!-- Weekly Overview -->
      <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg p-4">
        <h2 class="text-lg font-semibold text-blue-400 mb-4">
          Weekly Overview
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="day in weeklyOverview"
            :key="day.date"
            class="bg-slate-800/50 rounded-lg p-3"
          >
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-slate-300">{{
                formatDate(day.date)
              }}</span>
              <span class="text-xs text-slate-400"
                >{{ day.totalHours }} hours</span
              >
            </div>
            <div class="space-y-1">
              <div
                v-for="(subject, index) in day.subjects"
                :key="index"
                class="text-xs text-slate-400"
              >
                {{ subject }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Study Analytics Chart -->
      <!-- <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg p-4">
        <h2 class="text-lg font-semibold text-blue-400 mb-4">
          Study Analytics
        </h2>
        <div class="h-[300px] relative">
          <canvas ref="weeklyChart"></canvas>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "TimeTable",
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      subjects: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "English Literature",
        "History",
        "Geography",
        "Economics",
        "Business Studies",
        "Art & Design",
        "Physical Education",
      ],
      schedule: {}, // Format: { 'YYYY-MM-DD': [{ startTime, endTime, subject }] }
      chart: null,
    };
  },
  computed: {
    currentMonthYear() {
      return this.currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    },
    selectedDateFormatted() {
      return this.selectedDate
        ? new Date(this.selectedDate.date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })
        : "No Date Selected";
    },
    calendarDates() {
      const dates = [];
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();

      // Get first day of month
      const firstDay = new Date(year, month, 1);
      const startingDay = firstDay.getDay();

      // Get last day of month
      const lastDay = new Date(year, month + 1, 0);
      const totalDays = lastDay.getDate();

      // Add previous month's days
      const prevMonth = new Date(year, month, 0);
      const prevMonthDays = prevMonth.getDate();
      for (let i = startingDay - 1; i >= 0; i--) {
        const date = new Date(year, month - 1, prevMonthDays - i);
        dates.push({
          date: date.toISOString().split("T")[0],
          isCurrentMonth: false,
          isToday: this.isToday(date),
        });
      }

      // Add current month's days
      for (let i = 1; i <= totalDays; i++) {
        const date = new Date(year, month, i);
        dates.push({
          date: date.toISOString().split("T")[0],
          isCurrentMonth: true,
          isToday: this.isToday(date),
        });
      }

      // Add next month's days
      const remainingDays = 42 - dates.length;
      for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(year, month + 1, i);
        dates.push({
          date: date.toISOString().split("T")[0],
          isCurrentMonth: false,
          isToday: this.isToday(date),
        });
      }

      return dates;
    },
    selectedDateSchedule: {
      get() {
        return this.selectedDate
          ? this.schedule[this.selectedDate.date] || []
          : [];
      },
      set(value) {
        if (this.selectedDate) {
          this.$set(this.schedule, this.selectedDate.date, value);
        }
      },
    },
    weeklyOverview() {
      const today = new Date();
      const weekDates = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - today.getDay() + i);
        const dateStr = date.toISOString().split("T")[0];

        const scheduleForDay = this.schedule[dateStr] || [];
        const totalHours = scheduleForDay.reduce((total, slot) => {
          if (!slot.startTime || !slot.endTime) return total;
          const start = new Date(`2000-01-01T${slot.startTime}`);
          const end = new Date(`2000-01-01T${slot.endTime}`);
          return total + (end - start) / (1000 * 60 * 60);
        }, 0);

        weekDates.push({
          date: dateStr,
          totalHours: totalHours.toFixed(1),
          subjects: scheduleForDay.map((slot) => slot.subject).filter(Boolean),
        });
      }

      return weekDates;
    },
  },
  methods: {
    isToday(date) {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    },
    previousMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      );
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      );
    },
    selectDate(date) {
      this.selectedDate = date;
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    },
    addTimeSlot() {
      if (!this.selectedDate) return;

      const newSlot = {
        startTime: "09:00",
        endTime: "10:30",
        subject: "",
      };

      if (!this.schedule[this.selectedDate.date]) {
        this.$set(this.schedule, this.selectedDate.date, []);
      }
      this.schedule[this.selectedDate.date].push(newSlot);
    },
    removeTimeSlot(index) {
      if (this.selectedDate) {
        this.schedule[this.selectedDate.date].splice(index, 1);
      }
    },
    hasSchedule(date) {
      return this.schedule[date.date]?.length > 0;
    },
    saveSchedule() {
      localStorage.setItem("studySchedule", JSON.stringify(this.schedule));
      alert("Schedule saved successfully!");
    },
    clearSchedule() {
      if (confirm("Are you sure you want to clear all schedule data?")) {
        this.schedule = {};
        localStorage.removeItem("studySchedule");
      }
    },
    updateChart() {
      if (this.chart) {
        this.chart.data.labels = this.weeklyOverview.map((day) =>
          this.formatDate(day.date)
        );
        this.chart.data.datasets[0].data = this.weeklyOverview.map((day) =>
          parseFloat(day.totalHours)
        );
        this.chart.update();
      }
    },
  },
  watch: {
    weeklyOverview: {
      deep: true,
      handler() {
        this.updateChart();
      },
    },
  },
  mounted() {
    const savedSchedule = localStorage.getItem("studySchedule");
    if (savedSchedule) {
      this.schedule = JSON.parse(savedSchedule);
    }

    const today = new Date();
    this.selectedDate = {
      date: today.toISOString().split("T")[0],
      isCurrentMonth: true,
      isToday: true,
    };

    // this.initializeChart();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

<style scoped>
input[type="time"] {
  color: #ffffff;
  background-color: rgb(17 24 39);
  border-radius: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border: 1px solid rgb(55 65 81);
}

input[type="time"]:focus {
  outline: none;
  border-color: rgb(59 130 246);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgb(17 24 39);
  border-radius: 0.5rem;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(55 65 81);
  border-radius: 0.5rem;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(75 85 99);
}

button:hover {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}

button:active {
  transform: translateY(0);
}

.backdrop-blur {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

canvas {
  width: 100% !important;
  height: 100% !important;
}

@media (max-width: 640px) {
  input[type="time"],
  select {
    font-size: 0.875rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>
