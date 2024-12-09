<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopNavigation />
      <div class="space-y-8 p-5" style="overflow-y: scroll">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart />
          <BarChart />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DoughnutChart />
          <RadarChart />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserFeedback />
          <QuestionnaireForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import StatCard from "../components/StatCard.vue";
import LineChart from "../components/charts/LineChart.vue";
import BarChart from "../components/charts/BarChart.vue";
import DoughnutChart from "../components/charts/DoughnutChart.vue";
import RadarChart from "../components/charts/RadarChart.vue";
import UserFeedback from "../components/UserFeedback.vue";
import QuestionnaireForm from "../components/QuestionnaireForm.vue";

const metrics = ref([
  { name: "Page Views", value: "0", change: "+0%" },
  { name: "Bounce Rate", value: "0%", change: "0%" },
  { name: "Average Session", value: "0m", change: "0%" },
  { name: "Conversion Rate", value: "0%", change: "0%" },
]);

onMounted(() => {
  // Simulated analytics data
  metrics.value = [
    { name: "Page Views", value: "45,232", change: "+23%" },
    { name: "Bounce Rate", value: "32%", change: "-12%" },
    { name: "Average Session", value: "4m 23s", change: "+8%" },
    { name: "Conversion Rate", value: "3.2%", change: "+14%" },
  ];
});
</script>
