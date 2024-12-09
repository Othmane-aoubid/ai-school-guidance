<template>
    <div class="question-item">
      <label :for="question.id" class="block text-sm font-medium text-gray-700 mb-2">
        {{ question.text }}
      </label>
  
      <!-- Text Input -->
      <input
        v-if="question.type === 'text'"
        :id="question.id"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="input-field"
      />
  
      <!-- Number Input -->
      <input
        v-else-if="question.type === 'number'"
        :id="question.id"
        type="number"
        :value="modelValue"
        @input="$emit('update:modelValue', parseInt($event.target.value))"
        class="input-field"
      />
  
      <!-- Radio Buttons -->
      <div v-else-if="question.type === 'radio'" class="space-y-4">
        <div v-for="option in question.options" :key="option.value" class="flex items-center">
          <input
            type="radio"
            :id="option.value"
            :name="question.id"
            :value="option.value"
            :checked="modelValue === option.value"
            @change="$emit('update:modelValue', option.value)"
            class="radio-input"
          />
          <label :for="option.value" class="ml-3 text-sm text-gray-700">
            {{ option.label }}
          </label>
        </div>
      </div>
  
      <!-- Checkbox -->
      <div v-else-if="question.type === 'checkbox'" class="flex items-center">
        <input
          type="checkbox"
          :id="question.id"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
          class="checkbox-input"
        />
        <label :for="question.id" class="ml-3 text-sm text-gray-700">
          Yes
        </label>
      </div>
  
      <!-- Textarea -->
      <textarea
        v-else-if="question.type === 'textarea'"
        :id="question.id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        rows="3"
        class="textarea-field"
      ></textarea>
  
      <!-- Scale (1-5) -->
      <div v-else-if="question.type === 'scale'" class="flex space-x-4">
        <template v-for="n in 5" :key="n">
          <button
            type="button"
            @click="$emit('update:modelValue', n)"
            :class="[
              'scale-button',
              modelValue === n ? 'scale-button-active' : 'scale-button-inactive'
            ]"
          >
            {{ n }}
          </button>
        </template>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    question: {
      type: Object,
      required: true
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    }
  });
  
  defineEmits(['update:modelValue']);
  </script>
  
  <style scoped>
  .input-field {
    @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
  }
  
  .radio-input {
    @apply h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500;
  }
  
  .checkbox-input {
    @apply h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500;
  }
  
  .textarea-field {
    @apply mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
  }
  
  .scale-button {
    @apply px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
  }
  
  .scale-button-active {
    @apply bg-indigo-600 text-white;
  }
  
  .scale-button-inactive {
    @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
  }
  </style>