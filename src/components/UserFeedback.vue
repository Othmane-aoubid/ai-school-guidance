<template>
  <div class="card">
    <h3 class="text-gray-500 text-sm font-medium mb-4">Recent Feedback</h3>
    <div class="space-y-4">
      <div
        v-for="feedback in feedbacks"
        :key="feedback.id"
        class="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600"
            >
              {{ feedback.user.charAt(0) }}
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">
                {{ feedback.user }}
              </p>
              <div class="flex items-center">
                <div class="flex items-center">
                  <span v-for="i in 5" :key="i" class="text-yellow-400 text-sm">
                    ★
                  </span>
                </div>
                <span class="ml-2 text-xs text-gray-500">{{
                  feedback.time
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="mt-2 text-sm text-gray-600">{{ feedback.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const feedbacks = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    comment: "Excellent service! Very satisfied with the platform.",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Jane Smith",
    rating: 4,
    comment: "Good experience overall, but could use some improvements.",
    time: "5 hours ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    rating: 5,
    comment: "The new features are amazing! Keep up the good work.",
    time: "1 day ago",
  },
];
</script>
