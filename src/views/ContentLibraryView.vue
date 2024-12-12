<template>
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar Component -->
      <Sidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Top Navigation Component -->
        <TopNavigation />
        <ContentLibrary />
      </div>
    </div>
  </template>

<script>
import ContentLibrary from '../components/ContentLibrary.vue';
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
export default {
  name: 'ContentLibraryView',
  components: {
    Sidebar,
    TopNavigation,
    ContentLibrary
  }
}
</script>