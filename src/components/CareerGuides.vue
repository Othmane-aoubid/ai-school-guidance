<template>
  <div class="w-full max-w-7xl mx-auto px-4">
    <div class="mb-12 text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Career Guides</h2>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        Explore our comprehensive career resources and guides
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bg-white rounded-lg shadow-md hover:shadow-xl p-6 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-500 group"
      >
        <div class="flex flex-col h-full">
          <h3
            class="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600"
          >
            {{ category.title }}
          </h3>
          <p class="text-gray-600 text-base flex-grow">
            {{ category.description }}
          </p>
          <div class="mt-4 flex items-center text-blue-600 font-medium">
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CareerGuides",

  data() {
    return {
      categories: [
        {
          id: 1,
          title: "Choosing a Career Path",
          route: "choosing-career-path",
          description:
            "Guide to help you make informed decisions about your career direction",
        },
        {
          id: 2,
          title: "Industry Trends",
          route: "industry-trends",
          description:
            "Stay updated with the latest trends across various industries",
        },
        {
          id: 3,
          title: "Job Market Analysis",
          route: "job-market-analysis",
          description:
            "In-depth analysis of current job market conditions and opportunities",
        },
      ],
    };
  },
};
</script>
