<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-4">
          {{ subject ? "Edit Subject" : "Add New Subject" }}
        </h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Subject Name
            </label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Target Hours
            </label>
            <input
              v-model.number="formData.targetHours"
              type="number"
              min="1"
              class="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              v-model="formData.color"
              type="color"
              class="w-full p-1 border rounded-lg h-10"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              v-model="formData.description"
              class="w-full p-2 border rounded-lg"
              rows="3"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {{ subject ? "Update" : "Add" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectModal",

  props: {
    subject: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      formData: {
        name: "",
        targetHours: 10,
        color: "#3B82F6",
        description: "",
        hoursStudied: 0,
      },
    };
  },

  created() {
    if (this.subject) {
      this.formData = { ...this.subject };
    }
  },

  methods: {
    handleSubmit() {
      this.$emit("save", { ...this.formData });
    },
  },
};
</script>
