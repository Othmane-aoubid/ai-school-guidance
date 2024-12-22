<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-auto">
      <TopNavigation />
      <CareerMatchingResults />
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import CareerMatchingResults from "../components/CareerMatchingResults.vue";

export default {
  name: "CareerMachtingResultView",

  components: {
    Sidebar,
    TopNavigation,
    CareerMatchingResults,
  },

  props: {},

  data() {
    return {};
  },

  computed: {},

  methods: {},
};
</script>

<style scoped></style>
