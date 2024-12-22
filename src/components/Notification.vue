<template>
  <div
    class="fixed bottom-4 right-4 max-w-md p-4 rounded-lg shadow-lg text-white"
    :class="{
      'bg-green-500': type === 'success',
      'bg-red-500': type === 'error',
      'bg-blue-500': type === 'info',
    }"
  >
    <div class="flex items-center">
      <span class="material-icons mr-2">
        {{ icon }}
      </span>
      <p>{{ message }}</p>
      <button
        @click="$emit('close')"
        class="ml-4 text-white hover:text-gray-200"
      >
        <span class="material-icons">close</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",

  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "success",
      validator: (value) => ["success", "error", "info"].includes(value),
    },
  },

  computed: {
    icon() {
      switch (this.type) {
        case "success":
          return "check_circle";
        case "error":
          return "error";
        case "info":
          return "info";
        default:
          return "info";
      }
    },
  },
};
</script>
