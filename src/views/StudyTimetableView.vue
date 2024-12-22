<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopNavigation />

      <!-- Header -->
      <header
        class="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-4 md:p-6"
      >
        <div class="max-w-7xl mx-auto">
          <h1 class="text-2xl md:text-3xl font-bold">
            StudyMaster - Timetable
          </h1>
          <p class="text-blue-100 mt-2 text-sm md:text-base">
            Plan, track, and optimize your study schedule
          </p>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-4">
        <div class="max-w-7xl mx-auto">
          <!-- Main Grid Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            <!-- Timetable Section -->
            <div class="lg:col-span-2 space-y-4 md:space-y-8">
              <!-- Weekly Schedule -->
              <div class="bg-white rounded-lg shadow-lg p-4 md:p-6">
                <div
                  class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0"
                >
                  <h2 class="text-xl md:text-2xl font-semibold">
                    Weekly Schedule
                  </h2>
                  <div class="flex space-x-2">
                    <button
                      @click="saveSchedule"
                      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base"
                    >
                      Save Schedule
                    </button>
                    <button
                      @click="clearSchedule"
                      class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm md:text-base"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <!-- Timetable Grid -->
                <div class="overflow-x-auto">
                  <div class="grid grid-cols-8 gap-2 min-w-[800px]">
                    <div class="font-semibold">Time</div>
                    <div v-for="day in days" :key="day" class="font-semibold">
                      {{ day }}
                    </div>
                    <template v-for="hour in 24" :key="hour">
                      <div class="text-sm">{{ formatHour(hour) }}</div>
                      <div
                        v-for="day in 7"
                        :key="`${hour}-${day}`"
                        class="bg-gray-50 rounded p-1 h-12 text-xs relative transition-colors duration-200 hover:bg-gray-100"
                        @dragover.prevent
                        @drop="onDrop($event, hour, day)"
                      >
                        <div class="absolute inset-0 p-1">
                          {{ getScheduledSubject(hour, day) }}
                          <button
                            v-if="
                              getScheduledSubject(hour, day) &&
                              currentStudySession?.hour === hour &&
                              currentStudySession?.day === day
                            "
                            @click="endStudySession"
                            class="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-sm text-xs"
                          >
                            End
                          </button>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>

              <!-- Weekly Stats -->
              <div class="bg-white rounded-lg shadow-lg p-4 md:p-6">
                <h2 class="text-xl md:text-2xl font-semibold mb-4">
                  Weekly Statistics
                </h2>
                <div class="h-[300px] relative">
                  <canvas ref="weeklyChart"></canvas>
                </div>
              </div>
            </div>

            <!-- Sidebar Content -->
            <div class="space-y-4 md:space-y-8">
              <!-- Subjects Section -->
              <div class="bg-white rounded-lg shadow-lg p-4 md:p-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl md:text-2xl font-semibold">Subjects</h2>
                  <button
                    @click="showSubjectModal = true"
                    class="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm md:text-base flex items-center"
                  >
                    <span class="material-icons text-sm mr-1">add</span>
                    Add Subject
                  </button>
                </div>

                <div class="space-y-3">
                  <div
                    v-for="subject in subjects"
                    :key="subject.id"
                    class="bg-white p-3 rounded-lg shadow border-l-4 cursor-move hover:shadow-md transition-shadow duration-200"
                    :style="{ borderLeftColor: subject.color }"
                    draggable="true"
                    @dragstart="dragStart($event, subject)"
                  >
                    <div class="flex justify-between items-center">
                      <span class="font-medium">{{ subject.name }}</span>
                      <div class="flex space-x-2">
                        <button
                          @click="editSubject(subject)"
                          class="text-gray-500 hover:text-blue-500"
                        >
                          <span class="material-icons text-sm">edit</span>
                        </button>
                        <button
                          @click="deleteSubject(subject.id)"
                          class="text-gray-500 hover:text-red-500"
                        >
                          <span class="material-icons text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Progress Section -->
              <div class="bg-white rounded-lg shadow-lg p-4 md:p-6">
                <h2 class="text-xl md:text-2xl font-semibold mb-4">
                  Study Progress
                </h2>
                <div class="space-y-4">
                  <div
                    v-for="subject in subjects"
                    :key="subject.id"
                    class="bg-white p-3 rounded-lg"
                  >
                    <div class="flex justify-between mb-2">
                      <span class="font-medium">{{ subject.name }}</span>
                      <div class="text-gray-600 text-sm">
                        {{ subject.hoursStudied }}/{{ subject.targetHours }}
                        hours
                      </div>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div
                        class="h-2 rounded-full transition-all duration-300"
                        :style="{
                          width: `${
                            (subject.hoursStudied / subject.targetHours) * 100
                          }%`,
                          backgroundColor: subject.color,
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Add/Edit Subject Modal -->
    <SubjectModal
      v-if="showSubjectModal"
      :subject="selectedSubject"
      @close="closeSubjectModal"
      @save="saveSubject"
    />

    <!-- Notification Component -->
    <Notification
      v-if="notification.show"
      :message="notification.message"
      :type="notification.type"
      @close="closeNotification"
    />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Chart from "chart.js/auto";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import SubjectModal from "../components/SubjectModal.vue";
import Notification from "../components/Notification.vue";

export default {
  name: "StudyTimetableView",

  components: {
    Sidebar,
    TopNavigation,
    SubjectModal,
    Notification,
  },

  data() {
    return {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      subjects: [],
      schedule: {},
      showSubjectModal: false,
      selectedSubject: null,
      notification: {
        show: false,
        message: "",
        type: "success",
      },
      weeklyChart: null,
      currentStudySession: null,
      chartData: Array(7).fill(0),
    };
  },

  methods: {
    formatHour(hour) {
      return `${hour.toString().padStart(2, "0")}:00`;
    },

    getScheduledSubject(hour, day) {
      const scheduled = this.schedule[`${hour}-${day}`];
      return scheduled ? scheduled.name : "";
    },

    dragStart(event, subject) {
      event.dataTransfer.setData("text/plain", JSON.stringify(subject));
    },

    async onDrop(event, hour, day) {
      const subject = JSON.parse(event.dataTransfer.getData("text/plain"));
      this.schedule[`${hour}-${day}`] = subject;

      await this.startStudySession(hour, day, subject);
    },

    async saveSchedule() {
      try {
        // First, check if document exists
        const scheduleRef = doc(db, "schedules", "current");
        const scheduleDoc = await getDoc(scheduleRef);

        if (!scheduleDoc.exists()) {
          // Create the document if it doesn't exist
          await setDoc(scheduleRef, {
            timetable: this.schedule,
            createdAt: new Date(),
          });
        } else {
          // Update existing document
          await updateDoc(scheduleRef, {
            timetable: this.schedule,
            updatedAt: new Date(),
          });
        }

        this.showNotification("Schedule saved successfully!", "success");
      } catch (error) {
        console.error("Error saving schedule:", error);
        this.showNotification("Failed to save schedule", "error");
      }
    },

    clearSchedule() {
      this.schedule = {};
      this.showNotification("Schedule cleared", "info");
    },

    showNotification(message, type = "success") {
      this.notification = {
        show: true,
        message,
        type,
      };
      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },

    closeNotification() {
      this.notification.show = false;
    },

    async startStudySession(hour, day, subject) {
      try {
        const startTime = new Date();
        this.currentStudySession = {
          subjectId: subject.id,
          startTime,
          hour,
          day,
        };

        await addDoc(collection(db, "studySessions"), {
          subjectId: subject.id,
          startTime: Timestamp.fromDate(startTime),
          status: "in-progress",
        });

        this.showNotification(`Started studying ${subject.name}`, "info");
      } catch (error) {
        console.error("Error starting session:", error);
        this.showNotification("Failed to start session", "error");
      }
    },

    async endStudySession() {
      if (!this.currentStudySession) return;

      try {
        const endTime = new Date();
        const duration =
          (endTime - new Date(this.currentStudySession.startTime)) /
          (1000 * 60 * 60);

        const sessionsRef = collection(db, "studySessions");
        const querySnapshot = await getDocs(sessionsRef);
        const session = querySnapshot.docs.find(
          (doc) =>
            doc.data().subjectId === this.currentStudySession.subjectId &&
            doc.data().status === "in-progress"
        );

        if (session) {
          await updateDoc(doc(db, "studySessions", session.id), {
            endTime: Timestamp.fromDate(endTime),
            duration: Math.min(duration, 1), // Cap at 1 hour
            status: "completed",
          });

          await this.updateSubjectProgress(
            this.currentStudySession.subjectId,
            duration
          );
        }

        this.currentStudySession = null;
        await this.updateWeeklyChart();
        this.showNotification("Study session completed!", "success");
      } catch (error) {
        console.error("Error ending session:", error);
        this.showNotification("Failed to end session", "error");
      }
    },

    async updateWeeklyChart() {
      try {
        console.log("Starting updateWeeklyChart");
        const weeklyData = Array(7).fill(0);
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setHours(0, 0, 0, 0); // Set to start of day
        startOfWeek.setDate(today.getDate() - today.getDay()); // Get start of week

        console.log("Start of week:", startOfWeek);

        const sessionsRef = collection(db, "studySessions");
        const querySnapshot = await getDocs(sessionsRef);

        console.log("Total sessions found:", querySnapshot.docs.length);

        querySnapshot.docs.forEach((doc) => {
          const session = doc.data();
          const sessionDate = session.startTime.toDate();
          console.log("Processing session:", {
            id: doc.id,
            status: session.status,
            startTime: sessionDate,
            duration: session.duration,
            dayOfWeek: sessionDate.getDay(),
          });

          if (session.status === "completed") {
            // No date comparison needed since we want to show all completed sessions
            const dayIndex = sessionDate.getDay();
            weeklyData[dayIndex] += session.duration || 0;
            console.log(
              `Added ${session.duration} hours to day ${dayIndex}, current total: ${weeklyData[dayIndex]}`
            );
          }
        });

        console.log("Final weekly data:", weeklyData);
        this.chartData = [...weeklyData]; // Create a new array to ensure reactivity

        if (this.weeklyChart) {
          console.log("Updating existing chart");
          this.weeklyChart.data.datasets[0].data = this.chartData;
          this.weeklyChart.update();
        } else {
          console.log("No chart instance found");
        }
      } catch (error) {
        console.error("Error updating chart:", error);
      }
    },

    initializeChart() {
      try {
        console.log("Starting chart initialization");
        const chartElement = this.$refs.weeklyChart;
        if (!chartElement) {
          console.error("Chart element not found");
          return;
        }

        const ctx = chartElement.getContext("2d");
        if (this.weeklyChart) {
          console.log("Destroying existing chart");
          this.weeklyChart.destroy();
        }

        console.log("Creating new chart with data:", this.chartData);
        this.weeklyChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: this.days,
            datasets: [
              {
                label: "Study Hours",
                data: this.chartData,
                backgroundColor: "#3B82F6",
                borderColor: "#2563EB",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
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
        console.log("Chart initialization complete");
      } catch (error) {
        console.error("Error initializing chart:", error);
      }
    },

    async loadData() {
      try {
        console.log("Starting loadData");
        const [scheduleDoc, subjectsSnapshot] = await Promise.all([
          getDoc(doc(db, "schedules", "current")),
          getDocs(collection(db, "subjects")),
        ]);

        if (scheduleDoc.exists()) {
          this.schedule = scheduleDoc.data().timetable || {};
        }

        this.subjects = subjectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Subjects loaded:", this.subjects.length);

        await this.updateWeeklyChart();
        this.$nextTick(() => {
          console.log("Calling initializeChart on nextTick");
          this.initializeChart();
        });
      } catch (error) {
        console.error("Error loading data:", error);
        this.showNotification("Failed to load data", "error");
      }
    },

    async updateSubjectProgress(subjectId, hoursStudied) {
      try {
        await updateDoc(doc(db, "subjects", subjectId), {
          hoursStudied,
        });
      } catch (error) {
        console.error("Error updating progress:", error);
        this.showNotification("Failed to update progress", "error");
      }
    },

    async saveSubject(subjectData) {
      try {
        if (subjectData.id) {
          // Update existing subject
          await updateDoc(doc(db, "subjects", subjectData.id), subjectData);
          const index = this.subjects.findIndex((s) => s.id === subjectData.id);
          if (index !== -1) {
            this.subjects[index] = subjectData;
          }
          this.showNotification("Subject updated successfully!", "success");
        } else {
          // Add new subject
          const docRef = await addDoc(collection(db, "subjects"), {
            ...subjectData,
            createdAt: new Date(),
          });
          this.subjects.push({ ...subjectData, id: docRef.id });
          this.showNotification("Subject added successfully!", "success");
        }
        this.showSubjectModal = false;
      } catch (error) {
        console.error("Error saving subject:", error);
        this.showNotification("Error saving subject", "error");
      }
    },

    editSubject(subject) {
      this.selectedSubject = subject;
      this.showSubjectModal = true;
    },

    async deleteSubject(subjectId) {
      try {
        await deleteDoc(doc(db, "subjects", subjectId));
        this.subjects = this.subjects.filter((s) => s.id !== subjectId);
        this.showNotification("Subject deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting subject:", error);
        this.showNotification("Error deleting subject", "error");
      }
    },

    closeSubjectModal() {
      this.showSubjectModal = false;
      this.selectedSubject = null;
    },
  },

  async mounted() {
    await this.loadData();
    window.addEventListener("beforeunload", this.endStudySession);
  },

  beforeUnmount() {
    if (this.weeklyChart) {
      this.weeklyChart.destroy();
    }
    window.removeEventListener("beforeunload", this.endStudySession);
  },
};
</script>
