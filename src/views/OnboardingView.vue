<template>
  <div class="flex bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar />
    <div class="flex-1 flex flex-col" style="overflow-y:hidden" >
      <!-- Top Navigation Component -->
      <TopNavigation />
      <div style="height:510px !important;">
        <Onboarding />
      </div>
    </div>
  </div>
</template>

<script>
import Onboarding from "../components/Onboarding.vue";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";

export default {
  name: "OnboardingView",
  components: {
    Sidebar,
    TopNavigation,
    Onboarding,
  },
};
</script>
