<template>
  <div class="max-w-4xl mx-auto" >
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <div class="flex justify-between mb-8">
        <div
          v-for="step in 4"
          :key="step"
          :class="[
            'w-1/4 text-center',
            { 'text-blue-600 font-semibold': step === currentStep },
            { 'text-gray-400': step > currentStep },
          ]"
        >
          <div
            :class="[
              'w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center',
              { 'bg-blue-600 text-white': step <= currentStep },
              { 'bg-gray-200 text-gray-400': step > currentStep },
            ]"
          >
            {{ step }}
          </div>
          <p>Step {{ step }}</p>
        </div>
      </div>

      <component
        :is="currentStepComponent"
        @next-step="nextStep"
        @prev-step="prevStep"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ProfileStep from "./ProfileStep.vue";
import AssessmentStep from "./AssessmentStep.vue";
import ResourcesStep from "./ResourcesStep.vue";
import GoalsStep from "./GoalsStep.vue";

const props = defineProps({
  currentStep: {
    type: Number,
    default: 1,
  },
});

const currentStep = ref(props.currentStep);

const currentStepComponent = computed(() => {
  switch (currentStep.value) {
    case 1:
      return ProfileStep;
    case 2:
      return AssessmentStep;
    case 3:
      return ResourcesStep;
    case 4:
      return GoalsStep;
    default:
      return null;
  }
});

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};
</script>
