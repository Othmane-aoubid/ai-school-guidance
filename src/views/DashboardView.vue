<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopNavigation />
      <main class="flex-1 p-8"  style="overflow-y:hidden !important; height: 90% ">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value="$45,231" 
          change="+20.1%" 
          trend="up" 
        />
        <StatCard 
          title="Active Users" 
          value="2,345" 
          change="+15.2%" 
          trend="up" 
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.15%" 
          change="-2.1%" 
          trend="down" 
        />
        <StatCard 
          title="Avg. Order Value" 
          value="$89.43" 
          change="+10.3%" 
          trend="up" 
        />
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart />
        <div class="card">
          <h3 class="text-gray-500 text-sm font-medium mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div v-for="i in 4" :key="i" class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-gray-200"></div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">User Activity {{ i }}</p>
                <p class="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div class="card mt-12">
        <SchoolDashboard/>
      </div>
      <div class="card mt-6">
        <StudentDashboard/>
      </div>
    </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Sidebar from '../components/Sidebar.vue';
import StudentDashboard from '../components/StudentDashboard.vue';
import SchoolDashboard from '../components/SchoolDashboard.vue';
import TopNavigation from '../components/TopNavigation.vue';
import Chart from '../components/Chart.vue';
import StatCard from '../components/StatCard.vue'

const stats = ref([
  { name: 'Total Users', value: '0', icon: 'users' },
  { name: 'Active Projects', value: '0', icon: 'folder' },
  { name: 'Revenue', value: '$0', icon: 'currency-dollar' },
  { name: 'Conversion Rate', value: '0%', icon: 'chart-bar' }
]);

const recentActivity = ref([]);

onMounted(async () => {
  // Simulated data loading - replace with actual Firebase queries
  stats.value = [
    { name: 'Total Users', value: '1,234', icon: 'users' },
    { name: 'Active Projects', value: '42', icon: 'folder' },
    { name: 'Revenue', value: '$12,345', icon: 'currency-dollar' },
    { name: 'Conversion Rate', value: '25%', icon: 'chart-bar' }
  ];
});
</script>
