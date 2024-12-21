<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Component -->
    <Sidebar @toggle-sidebar="toggleSidebar" />

    <div
      class="flex-1 flex flex-col overflow-x-hidden overflow-y-auto transition-all duration-300"
      :class="{
        'sm:ml-16': !isSidebarCollapsed && window.innerWidth >= 640,
        'sm:ml-16': isSidebarCollapsed && window.innerWidth >= 640,
      }"
      style="margin-left: 0 !important"
    >
      <!-- Top Navigation Component -->
      <TopNavigation class="sticky top-0 z-10" />

      <div
        class="min-h-screen bg-gray-100 mx-auto w-full px-4 sm:w-[95%] md:w-[95%] lg:w-[80%]"
        :class="{
          'sm:ml-16': !isSidebarCollapsed && window.innerWidth >= 640,
          'sm:ml-16': isSidebarCollapsed && window.innerWidth >= 640,
        }"
      >
        <!-- Beta Notification Banner -->
        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 mt-4 "
        :class="{
          'sm:ml-16': !isSidebarCollapsed && window.innerWidth >= 640,
          'sm:ml-16': isSidebarCollapsed && window.innerWidth >= 640,
        }"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-blue-700">
                This is a beta feature with limited API requests. Please use the
                search function sparingly.
              </p>
            </div>
          </div>
        </div>

        <!-- Header section with filters -->
        <header class="bg-white shadow-md">
          <div class="container mx-auto px-4 py-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">
              Search For A Job
            </h1>

            <!-- Filters Container -->
            <div class="flex flex-col space-y-3">
              <!-- Search Bar -->
              <div class="w-full">
                <input
                  v-model="searchQuery"
                  placeholder="Search careers..."
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Filters Grid -->
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
              >
                <select
                  v-model="selectedInterest"
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>Interests</option>
                  <option
                    v-for="option in interestOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>

                <select
                  v-model="selectedSkill"
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>Skills</option>
                  <option
                    v-for="option in skillOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>

                <select
                  v-model="selectedStudyLevel"
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>Study Level</option>
                  <option
                    v-for="option in studyLevelOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>

                <select
                  v-model="selectedIndustry"
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>Industry</option>
                  <option
                    v-for="option in industryOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>

                <select
                  v-model="selectedSalaryRange"
                  class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>Salary Range</option>
                  <option
                    v-for="option in salaryRangeOptions"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>

              <!-- Add Buttons Container -->
              <div class="flex gap-3 mt-4">
                <button
                  @click="handleManualSearch"
                  class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
                  :disabled="loading"
                >
                  <span v-if="loading" class="mr-2">
                    <div
                      class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
                    ></div>
                  </span>
                  {{ loading ? "Searching..." : "Search" }}
                </button>

                <button
                  @click="resetFilters"
                  class="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50 transition-colors"
                  :disabled="loading"
                >
                  Reset Filters
                </button>
              </div>

              <!-- Active Filters -->
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(filter, type) in activeFilters"
                  :key="type"
                  v-if="filter"
                  class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {{ filter }}
                  <button
                    @click="clearFilter(type)"
                    class="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Jobs Grid Section -->
        <div
          class="jobs-container px-4 py-6 overflow-y-auto"
          style="max-height: calc(100vh - 200px)"
        >
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-8">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
            ></div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-red-600 text-center py-8">
            {{ error }}
          </div>

          <!-- Jobs Grid -->
          <div
            v-else-if="!loading && !error && jobs.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            <div
              v-for="job in jobs"
              :key="job.id"
              class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <!-- Company Header -->
              <div class="flex items-start mb-4">
                <img
                  :src="job.companyLogo"
                  :alt="`${job.company} logo`"
                  class="w-12 h-12 rounded object-contain bg-gray-50"
                  @error="$event.target.src = '/default-company-logo.png'"
                />
                <div class="ml-3">
                  <h3 class="font-semibold text-lg text-gray-900">
                    {{ job.title }}
                  </h3>
                  <p class="text-gray-600">{{ job.company }}</p>
                </div>
              </div>

              <!-- Job Details -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-gray-500">
                  <i class="fas fa-map-marker-alt w-5"></i>
                  <span>{{ job.location }}</span>
                </div>
                <div class="flex items-center text-gray-500">
                  <i class="fas fa-building w-5"></i>
                  <span>{{ job.workplaceType }}</span>
                </div>
                <div class="flex items-center text-gray-500">
                  <i class="fas fa-users w-5"></i>
                  <span>{{ job.applicants }} applicants</span>
                </div>
                <div class="flex items-center text-gray-500">
                  <i class="fas fa-clock w-5"></i>
                  <span>Posted {{ formatDate(job.postedAt) }}</span>
                </div>
              </div>

              <!-- Add salary information -->
              <div class="mt-2 mb-4">
                <div class="flex items-center text-gray-500">
                  <i class="fas fa-money-bill-wave w-5"></i>
                  <span v-if="job.salary.min || job.salary.max">
                    {{ job.salary.currency }}
                    {{ job.salary.min ? formatSalary(job.salary.min) : "" }}
                    {{ job.salary.min && job.salary.max ? " - " : "" }}
                    {{ job.salary.max ? formatSalary(job.salary.max) : "" }}
                  </span>
                  <span v-else>Salary not specified</span>
                </div>

                <div class="flex items-center text-gray-500 mt-1">
                  <i class="fas fa-briefcase w-5"></i>
                  <span>Experience: {{ job.experience }}</span>
                </div>
              </div>

              <!-- Description Preview -->
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ job.description }}
              </p>

              <!-- Action Buttons -->
              <div class="flex space-x-3">
                <a
                  :href="job.applyUrl"
                  target="_blank"
                  class="flex-1 bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </a>
                <button
                  @click="showJobDetails(job)"
                  class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          </div>

          <!-- Load More Section -->
          <div
            v-if="jobs.length > 0 && hasMorePages"
            class="flex justify-center my-8"
          >
            <button
              @click="loadMore"
              class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
              :disabled="isLoadingMore"
            >
              <span v-if="isLoadingMore" class="mr-2">
                <div
                  class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
                ></div>
              </span>
              {{ isLoadingMore ? "Loading..." : "Load More" }}
            </button>
          </div>

          <!-- Loading More Indicator -->
          <div
            v-if="isLoadingMore"
            class="flex justify-center items-center py-4"
          >
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
            ></div>
          </div>

          <!-- No More Results -->
          <div
            v-if="jobs.length > 0 && !hasMorePages"
            class="text-center text-gray-600 py-4"
          >
            No more jobs to load.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import TopNavigation from "./TopNavigation.vue";
import axios from "axios";

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  function debounced(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  }
  debounced.cancel = () => {
    clearTimeout(timeout);
  };
  return debounced;
}

export default {
  components: {
    Sidebar,
    TopNavigation,
  },

  data() {
    return {
      isSidebarCollapsed: false,
      searchQuery: "",
      selectedInterest: "",
      selectedSkill: "",
      selectedStudyLevel: "",
      selectedIndustry: "",
      selectedSalaryRange: "",
      isLoading: false,
      error: null,
      apiJobs: [],
      lastSearchParams: null,

      // API configuration
      apiConfig: {
        baseURL: "https://linkedin-api8.p.rapidapi.com",
        headers: {
          "X-RapidAPI-Key":
            "1112b12d87msh682960bde2b232dp1054e5jsn9f92c2b03eb3",
          "X-RapidAPI-Host": "linkedin-api8.p.rapidapi.com",
        },
      },

      // Options for filters
      interestOptions: [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Engineering",
        "Arts & Design",
        "Science",
        "Business",
        "Law",
        "Agriculture",
      ],

      skillOptions: [
        "Programming",
        "Data Analysis",
        "Project Management",
        "Communication",
        "Leadership",
        "Problem Solving",
        "Design",
        "Marketing",
        "Sales",
        "Research",
      ],

      studyLevelOptions: [
        "High School Diploma",
        "Bachelor's Degree",
        "Master's Degree",
        "PhD",
        "Professional Certificate",
        "Technical Diploma",
      ],

      industryOptions: [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Manufacturing",
        "Retail",
        "Construction",
        "Energy",
        "Transportation",
        "Media",
      ],

      salaryRangeOptions: [
        "0 - 50,000 MAD",
        "50,000 - 100,000 MAD",
        "100,000 - 200,000 MAD",
        "200,000 - 300,000 MAD",
        "300,000+ MAD",
      ],

      // Sample career profiles
      careerProfiles: [
        {
          id: 1,
          title: "Software Engineer",
          description: "Design and develop software applications and systems",
          interests: ["Technology", "Engineering"],
          skills: ["Programming", "Problem Solving"],
          requiredEducation: ["Bachelor's Degree", "Master's Degree"],
          industry: "Technology",
          salaryRange: "200,000 - 300,000 MAD",
          growthRate: 85,
          employers: ["Tech Corp", "Software Inc", "Digital Solutions"],
          keySkills: ["JavaScript", "Python", "System Design"],
        },
        // Add more career profiles here
      ],

      jobs: [],
      loading: false,
      apiConfig: {
        headers: {
          "X-Rapidapi-Key":
            "1112b12d87msh682960bde2b232dp1054e5jsn9f92c2b03eb3",
          "X-Rapidapi-Host": "linkedin-data-scraper.p.rapidapi.com",
        },
      },

      selectedWorkplaceType: "",
      selectedExperience: "",
      debouncedSearch: null,
      page: 1,
      hasMorePages: true,
      isLoadingMore: false,
      itemsPerPage: 9,

      window: {
        innerWidth: 0,
      },
    };
  },

  computed: {
    filteredCareers() {
      const localResults = this.filterLocalCareers();
      const apiResults = this.apiJobs;
      return [...localResults, ...apiResults];
    },

    searchParams() {
      const params = new URLSearchParams();
      if (this.searchQuery) {
        params.append("keywords", this.searchQuery);
      }
      params.append("locationId", "92000000"); // Morocco
      params.append("datePosted", "anyTime");
      params.append("sort", "mostRelevant");
      return params;
    },

    activeFilters() {
      return {
        interest: this.selectedInterest,
        skill: this.selectedSkill,
        studyLevel: this.selectedStudyLevel,
        industry: this.selectedIndustry,
        salaryRange: this.selectedSalaryRange,
      };
    },
  },

  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },

    async fetchJobsFromAPI() {
      let searchTerm = this.searchQuery || "software developer";
      let company = ""; // You can add company filter later if needed

      console.log("🔍 Search term:", searchTerm);
      await this.fetchJobs(searchTerm, company);
    },

    async fetchJobs(query, company = "", isLoadingMore = false) {
      if (!isLoadingMore) {
        this.loading = true;
        this.error = null;
        this.page = 1;
      } else {
        this.isLoadingMore = true;
      }

      const requestParams = {
        query: query,
        company: company || undefined,
        page: this.page,
        num_pages: 1,
        page_size: this.itemsPerPage,
        ...(this.selectedWorkplaceType && {
          remote_jobs_only: this.selectedWorkplaceType === "REMOTE",
        }),
        ...(this.selectedExperience && {
          experience_level: this.selectedExperience,
        }),
        ...(this.selectedIndustry && { industry: this.selectedIndustry }),
        ...(this.selectedStudyLevel && { education: this.selectedStudyLevel }),
        ...(this.selectedSkill && { skills: this.selectedSkill }),
        ...(this.getSalaryRange().min && {
          salary_min: this.getSalaryRange().min,
        }),
        ...(this.getSalaryRange().max && {
          salary_max: this.getSalaryRange().max,
        }),
      };

      console.log("📤 API Request:", {
        url: "https://jsearch.p.rapidapi.com/search",
        params: requestParams,
      });

      try {
        const response = await axios.get(
          "https://jsearch.p.rapidapi.com/search",
          {
            params: requestParams,
            headers: {
              "X-RapidAPI-Key":
                "1112b12d87msh682960bde2b232dp1054e5jsn9f92c2b03eb3",
              "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
            },
          }
        );

        console.log("📥 API Response Status:", response.status);
        console.log("📥 API Response Data:", response.data);

        if (response.data && response.data.data) {
          if (!response.data.data.length) {
            console.log("⚠️ No jobs found in response");
            this.error =
              "No jobs found for your search criteria. Try adjusting your search terms.";
            this.jobs = [];
          } else {
            const newJobs = response.data.data.map((job) => {
              console.log("✅ Processing job:", job.job_title);
              return {
                id: job.job_id || Math.random().toString(36).substr(2, 9),
                title: job.job_title,
                company: job.employer_name,
                location: job.job_city
                  ? `${job.job_city}, ${job.job_country}`
                  : job.job_country || "Location not specified",
                description: job.job_description || "No description available",
                salary: {
                  min: job.job_min_salary,
                  max: job.job_max_salary,
                  currency: job.job_salary_currency || "USD",
                },
                workplaceType: job.job_is_remote ? "Remote" : "On-site",
                experience: job.job_required_experience
                  ?.required_experience_in_months
                  ? `${Math.floor(
                      job.job_required_experience
                        .required_experience_in_months / 12
                    )} years`
                  : "Not specified",
                companyLogo: job.employer_logo || "/default-company-logo.png",
                applyUrl: job.job_apply_link || "#",
                postedAt:
                  job.job_posted_at_datetime || new Date().toISOString(),
                applicants: job.job_applicants || "N/A",
              };
            });
            console.log("✅ Processed jobs count:", newJobs.length);

            // Update jobs array based on whether we're loading more or not
            this.jobs = isLoadingMore ? [...this.jobs, ...newJobs] : newJobs;

            // Check if there are more pages
            this.hasMorePages = newJobs.length === this.itemsPerPage;
          }
        } else {
          console.error("❌ Invalid API response format", response);
          this.error = "Received invalid data format from the API.";
          this.jobs = [];
        }
      } catch (err) {
        console.error("❌ API Error:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });

        if (err.response?.status === 429) {
          this.error =
            "Rate limit exceeded. Please try again in a few minutes.";
        } else {
          this.error = "Failed to fetch jobs. Please try again later.";
        }

        this.jobs = [];
      } finally {
        this.loading = false;
        this.isLoadingMore = false;
        console.log("🏁 Request completed. Loading:", this.loading);
        console.log("🏁 Final jobs count:", this.jobs.length);
        console.log("🏁 Error state:", this.error);
      }
    },

    handleSearch() {
      console.log("🔍 Search triggered:", {
        query: this.searchQuery,
        length: this.searchQuery.length,
      });

      if (this.searchQuery.length >= 2 || this.searchQuery.length === 0) {
        console.log("🔄 Debouncing search...");
        if (this.debouncedSearch) {
          this.debouncedSearch();
        }
      } else {
        console.log("⏭️ Search skipped - too few characters");
      }
    },

    filterLocalCareers() {
      if (!this.careerProfiles) return [];

      return this.careerProfiles.filter((career) => {
        const searchMatch =
          !this.searchQuery ||
          career.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          career.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());

        const interestMatch =
          !this.selectedInterest ||
          career.interests.includes(this.selectedInterest);

        const skillMatch =
          !this.selectedSkill || career.skills.includes(this.selectedSkill);

        const studyMatch =
          !this.selectedStudyLevel ||
          career.requiredEducation.includes(this.selectedStudyLevel);

        const industryMatch =
          !this.selectedIndustry || career.industry === this.selectedIndustry;

        const salaryMatch =
          !this.selectedSalaryRange ||
          career.salaryRange === this.selectedSalaryRange;

        return (
          searchMatch &&
          interestMatch &&
          skillMatch &&
          studyMatch &&
          industryMatch &&
          salaryMatch
        );
      });
    },

    handleAPIError(error) {
      console.error("API Error:", error);
      if (error.response) {
        switch (error.response.status) {
          case 429:
            this.error = "Rate limit exceeded. Please try again later.";
            break;
          case 401:
            this.error = "Authentication error. Please check API credentials.";
            break;
          default:
            this.error =
              "An error occurred while fetching jobs. Please try again.";
        }
      } else if (error.request) {
        this.error =
          "Unable to reach the server. Please check your connection.";
      } else {
        this.error = "An unexpected error occurred. Please try again.";
      }
    },

    clearFilter(type) {
      switch (type) {
        case "interest":
          this.selectedInterest = "";
          break;
        case "skill":
          this.selectedSkill = "";
          break;
        case "studyLevel":
          this.selectedStudyLevel = "";
          break;
        case "industry":
          this.selectedIndustry = "";
          break;
        case "salaryRange":
          this.selectedSalaryRange = "";
          break;
      }
    },

    resetFilters() {
      this.searchQuery = "";
      this.selectedInterest = "";
      this.selectedSkill = "";
      this.selectedStudyLevel = "";
      this.selectedIndustry = "";
      this.selectedSalaryRange = "";
      this.selectedWorkplaceType = "";
      this.selectedExperience = "";

      // Optionally fetch default results after reset
      this.fetchJobsFromAPI();
    },

    learnMore(careerId) {
      console.log(`Learning more about career ${careerId}`);
      // Implement learn more functionality
    },

    debouncedSearch: debounce(function () {
      this.fetchJobsFromAPI();
    }, 500),

    formatDate(date) {
      const now = new Date();
      const postedDate = new Date(date);
      const diffTime = Math.abs(now - postedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return `${Math.floor(diffDays / 30)} months ago`;
    },

    showJobDetails(job) {
      // Implement job details modal/view
      console.log("Show details for job:", job.title);
    },

    formatSalary(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 0,
      }).format(amount);
    },

    getSalaryRange() {
      if (!this.selectedSalaryRange) return { min: null, max: null };

      const range = this.selectedSalaryRange.split(" - ");
      if (range.length === 2) {
        const min = parseInt(range[0].replace(/[^0-9]/g, ""));
        const max = parseInt(range[1].replace(/[^0-9]/g, ""));
        return { min, max };
      }

      // Handle "300,000+ MAD" case
      if (this.selectedSalaryRange.includes("+")) {
        const min = parseInt(this.selectedSalaryRange.replace(/[^0-9]/g, ""));
        return { min, max: null };
      }

      return { min: null, max: null };
    },

    handleManualSearch() {
      if (
        this.debouncedSearch &&
        typeof this.debouncedSearch.cancel === "function"
      ) {
        this.debouncedSearch.cancel();
      }
      this.fetchJobsFromAPI();
    },

    // Add method to load more results
    async loadMore() {
      if (this.hasMorePages && !this.isLoadingMore) {
        this.page += 1;
        await this.fetchJobs(this.searchQuery, "", true);
      }
    },

    // Add infinite scroll handler
    handleScroll() {
      const scrollContainer = document.querySelector(".jobs-container");
      if (!scrollContainer) return;

      const bottomOfWindow =
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 200;

      if (
        bottomOfWindow &&
        this.hasMorePages &&
        !this.isLoadingMore &&
        !this.loading
      ) {
        this.loadMore();
      }
    },

    handleResize() {
      this.window.innerWidth = window.innerWidth;
    },
  },

  watch: {
    // Remove automatic search on query change
    // searchQuery() {
    //   this.handleSearch();
    // },
    // Remove other filter watches that trigger automatic search
  },

  created() {
    // Initialize the debounced search function
    this.debouncedSearch = debounce(() => {
      this.fetchJobsFromAPI();
    }, 500);
  },

  beforeUnmount() {
    // Remove scroll event listener
    const scrollContainer = document.querySelector(".jobs-container");
    if (scrollContainer) {
      scrollContainer.removeEventListener("scroll", this.handleScroll);
    }

    // Add safety check before calling cancel
    if (
      this.debouncedSearch &&
      typeof this.debouncedSearch.cancel === "function"
    ) {
      this.debouncedSearch.cancel();
    }

    window.removeEventListener("resize", this.handleResize);
  },

  mounted() {
    // Add scroll event listener
    const scrollContainer = document.querySelector(".jobs-container");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", this.handleScroll);
    }

    this.window.innerWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.jobs-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.jobs-container::-webkit-scrollbar {
  width: 6px;
}

.jobs-container::-webkit-scrollbar-track {
  background: transparent;
}

.jobs-container::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

/* Responsive grid adjustments */
@media (max-width: 1024px) {
  .jobs-container {
    max-height: calc(100vh - 180px);
  }
}

@media (max-width: 768px) {
  .jobs-container {
    max-height: calc(100vh - 160px);
  }
}

/* Add smooth transitions */
.grid {
  transition: all 0.3s ease-in-out;
}

.job-card {
  transition: transform 0.2s ease-in-out;
}

.job-card:hover {
  transform: translateY(-2px);
}

/* Loading animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.jobs-container > * {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
