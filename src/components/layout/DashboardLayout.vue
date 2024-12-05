<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopNavigation />
      <main class="flex-1 overflow-auto p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import Sidebar from './Sidebar.vue';
import TopNavigation from './TopNavigation.vue';

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  if (!authStore.user) {
    router.push('/login');
  }
});
</script>