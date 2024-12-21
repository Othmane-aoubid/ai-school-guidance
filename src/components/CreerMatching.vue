<template>
  <div class="creermatchingpage bg-slate-950 text-white p-4 lg:p-6">
    <!-- Header -->
    <header class="w-full p-3 sm:p-4 md:p-5 lg:p-6 bg-slate-900/50 rounded-xl shadow-lg mb-4 sm:mb-5 md:mb-6">
      <div class="flex flex-col xs:flex-col justify-between items-start xs:items-center gap-3 sm:gap-4 md:gap-5">
        <div class="w-full xs:w-auto md:flex-1">
          <h1 class="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Career Matching Questionnaire
          </h1>
          <p class="text-xs sm:text-sm md:text-base text-slate-400 mt-0.5 sm:mt-1">
            Find your ideal career path based on your preferences and skills
          </p>
        </div>
        <div class="flex gap-2 sm:gap-3 w-full xs:w-auto">
          <button 
            @click="saveProgress"
            class="flex-1 xs:flex-none bg-slate-800 hover:bg-slate-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg 
                   text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 
                   focus:ring-blue-500/50 border border-slate-700">
            Save Progress
          </button>
          <button 
            @click="submitQuestionnaire"
            class="flex-1 xs:flex-none bg-blue-600 hover:bg-blue-500 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg 
                   text-xs sm:text-sm transition-colors focus:outline-none focus:ring-2 
                   focus:ring-blue-500/50 font-medium">
            Submit
          </button>
        </div>
      </div>
    </header>

    <!-- Progress Bar -->
    <div class="w-full bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 mb-6">
      <div class="flex justify-between text-sm text-slate-400 mb-2">
        <span>Progress</span>
        <span>{{ progressPercentage }}% Complete</span>
      </div>
      <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          class="h-full bg-blue-600 transition-all duration-500 ease-out rounded-full"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Personal Assessment Section -->
      <div class="bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl shadow-lg">
        <div class="flex items-start gap-4 mb-6">
          <div class="p-3 bg-blue-500/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-blue-400">Personal Assessment</h2>
            <p class="text-sm text-slate-400">Help us understand your personality and preferences</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">What motivates you the most?</label>
            <select 
              v-model="personalData.motivation"
              class="w-full bg-slate-800 rounded-lg px-4 py-2.5 text-sm border border-slate-700 
                     hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option value="">Select your motivation</option>
              <option v-for="option in motivationOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">How do you prefer to work?</label>
            <div class="grid grid-cols-2 gap-3">
              <button 
                v-for="style in workStyles" 
                :key="style"
                @click="personalData.workStyle = style"
                :class="[
                  'p-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  personalData.workStyle === style 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                ]">
                {{ style }}
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Rate your stress management skills</label>
            <div class="flex items-center gap-4">
              <input 
                v-model="personalData.stressManagement"
                type="range" 
                min="1" 
                max="5" 
                class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer">
              <span class="text-sm text-slate-400 min-w-[2.5rem]">{{ personalData.stressManagement }}/5</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills & Interests Section -->
      <div class="bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl shadow-lg">
        <div class="flex items-start gap-4 mb-6">
          <div class="p-3 bg-green-500/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-green-400">Skills & Interests</h2>
            <p class="text-sm text-slate-400">Tell us about your abilities and passions</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Select your top skills (up to 5)</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="skill in availableSkills" 
                :key="skill"
                @click="toggleSkill(skill)"
                :disabled="isSkillSelectionDisabled(skill)"
                :class="[
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  personalData.selectedSkills.includes(skill)
                    ? 'bg-green-600 text-white'
                    : isSkillSelectionDisabled(skill)
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                ]">
                {{ skill }}
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">What are your career interests?</label>
            <textarea 
              v-model="personalData.careerInterests"
              rows="3"
              class="w-full bg-slate-800 rounded-lg px-4 py-2.5 text-sm border border-slate-700 
                     hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 
                     focus:ring-blue-500/50 resize-none"
              placeholder="Describe your ideal career path and interests..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Education & Experience -->
      <div class="bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl shadow-lg">
        <div class="flex items-start gap-4 mb-6">
          <div class="p-3 bg-purple-500/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-purple-400">Education & Experience</h2>
            <p class="text-sm text-slate-400">Tell us about your academic background</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Highest Level of Education</label>
            <select 
              v-model="educationData.level"
              class="w-full bg-slate-800 rounded-lg px-4 py-2.5 text-sm border border-slate-700 
                     hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option value="">Select education level</option>
              <option v-for="level in educationLevels" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Field of Study</label>
            <input 
              v-model="educationData.field"
              type="text"
              class="w-full bg-slate-800 rounded-lg px-4 py-2.5 text-sm border border-slate-700 
                     hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="e.g., Computer Science, Business, etc."
            >
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Years of Work Experience</label>
            <input 
              v-model="educationData.experience"
              type="number"
              min="0"
              max="50"
              class="w-full bg-slate-800 rounded-lg px-4 py-2.5 text-sm border border-slate-700 
                     hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Enter years of experience"
            >
          </div>
        </div>
      </div>

      <!-- Career Preferences -->
      <div class="bg-slate-900/50 backdrop-blur-sm p-5 rounded-xl shadow-lg">
        <div class="flex items-start gap-4 mb-6">
          <div class="p-3 bg-yellow-500/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-yellow-400">Career Preferences</h2>
            <p class="text-sm text-slate-400">Define your ideal work environment</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Preferred Work Environment</label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button 
                v-for="env in workEnvironments" 
                :key="env"
                @click="toggleWorkEnvironment(env)"
                :class="[
                  'px-3 py-2 rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  careerData.preferredEnvironments.includes(env)
                    ? 'bg-yellow-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                ]">
                {{ env }}
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Salary Expectations (Annual)</label>
            <select 
              v-model="careerData.salaryExpectation"
              class="w-full bg-slate-800 rounded-lg px-4 py-2.5 text-sm border border-slate-700 
                     hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              <option value="">Select salary range</option>
              <option v-for="range in salaryRanges" :key="range" :value="range">
                {{ range }}
              </option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-slate-300">Willing to Relocate?</label>
            <div class="flex gap-4">
              <label class="flex items-center">
                <input 
                  type="radio" 
                  v-model="careerData.willingToRelocate" 
                  :value="true"
                  class="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500/50">
                <span class="ml-2 text-sm text-slate-300">Yes</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="radio" 
                  v-model="careerData.willingToRelocate" 
                  :value="false"
                  class="w-4 h-4 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500/50">
                <span class="ml-2 text-sm text-slate-300">No</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-4 mt-6">
      <button 
        @click="resetForm"
        class="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium 
               transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50">
        Reset
      </button>
      <button 
        @click="submitQuestionnaire"
        class="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium 
               transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50">
        Submit Questionnaire
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progressPercentage: 0,
      personalData: {
        motivation: '',
        workStyle: '',
        stressManagement: 3,
        selectedSkills: [],
        careerInterests: ''
      },
      educationData: {
        level: '',
        field: '',
        experience: null
      },
      careerData: {
        preferredEnvironments: [],
        salaryExpectation: '',
        willingToRelocate: null
      },
      // Options for dropdowns and selections
      motivationOptions: [
        'Career Growth',
        'Financial Success',
        'Work-Life Balance',
        'Making an Impact',
        'Learning & Development',
        'Leadership Opportunities',
        'Creative Expression',
        'Job Security'
      ],
      workStyles: [
        'Independent Work',
        'Team Collaboration',
        'Hybrid Approach',
        'Flexible Schedule'
      ],
      availableSkills: [
        'Communication',
        'Problem Solving',
        'Leadership',
        'Technical Skills',
        'Project Management',
        'Data Analysis',
        'Creative Design',
        'Research',
        'Customer Service',
        'Strategic Planning',
        'Writing',
        'Public Speaking'
      ],
      educationLevels: [
        'High School Diploma',
        'Associate Degree',
        "Bachelor's Degree",
        "Master's Degree",
        'Doctorate',
        'Professional Certification',
        'Other'
      ],
      workEnvironments: [
        'Remote',
        'Office',
        'Hybrid',
        'Startup',
        'Corporate',
        'Field Work'
      ],
      salaryRanges: [
        '$30,000 - $50,000',
        '$50,000 - $75,000',
        '$75,000 - $100,000',
        '$100,000 - $150,000',
        '$150,000+'
      ]
    }
  },
  watch: {
    // Watch for changes in form data to update progress
    personalData: {
      deep: true,
      handler() {
        this.calculateProgress()
      }
    },
    educationData: {
      deep: true,
      handler() {
        this.calculateProgress()
      }
    },
    careerData: {
      deep: true,
      handler() {
        this.calculateProgress()
      }
    }
  },
  methods: {
    calculateProgress() {
      let totalFields = 0
      let completedFields = 0

      // Personal Data checks
      if (this.personalData.motivation) completedFields++
      if (this.personalData.workStyle) completedFields++
      if (this.personalData.selectedSkills.length > 0) completedFields++
      if (this.personalData.careerInterests) completedFields++
      totalFields += 4

      // Education Data checks
      if (this.educationData.level) completedFields++
      if (this.educationData.field) completedFields++
      if (this.educationData.experience !== null) completedFields++
      totalFields += 3

      // Career Data checks
      if (this.careerData.preferredEnvironments.length > 0) completedFields++
      if (this.careerData.salaryExpectation) completedFields++
      if (this.careerData.willingToRelocate !== null) completedFields++
      totalFields += 3

      this.progressPercentage = Math.round((completedFields / totalFields) * 100)
    },

    toggleSkill(skill) {
      if (this.personalData.selectedSkills.includes(skill)) {
        this.personalData.selectedSkills = this.personalData.selectedSkills.filter(s => s !== skill)
      } else if (this.personalData.selectedSkills.length < 5) {
        this.personalData.selectedSkills.push(skill)
      }
    },

    isSkillSelectionDisabled(skill) {
      return !this.personalData.selectedSkills.includes(skill) && 
             this.personalData.selectedSkills.length >= 5
    },

    toggleWorkEnvironment(env) {
      if (this.careerData.preferredEnvironments.includes(env)) {
        this.careerData.preferredEnvironments = this.careerData.preferredEnvironments.filter(e => e !== env)
      } else {
        this.careerData.preferredEnvironments.push(env)
      }
    },

    saveProgress() {
      // Save form data to localStorage
      const formData = {
        personalData: this.personalData,
        educationData: this.educationData,
        careerData: this.careerData
      }
      localStorage.setItem('careerMatchingProgress', JSON.stringify(formData))
      
      // Show success message (you can implement your own notification system)
      alert('Progress saved successfully!')
    },

    loadProgress() {
      const savedData = localStorage.getItem('careerMatchingProgress')
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        this.personalData = { ...this.personalData, ...parsedData.personalData }
        this.educationData = { ...this.educationData, ...parsedData.educationData }
        this.careerData = { ...this.careerData, ...parsedData.careerData }
      }
    },

    resetForm() {
      if (confirm('Are you sure you want to reset all your answers?')) {
        this.personalData = {
          motivation: '',
          workStyle: '',
          stressManagement: 3,
          selectedSkills: [],
          careerInterests: ''
        }
        this.educationData = {
          level: '',
          field: '',
          experience: null
        }
        this.careerData = {
          preferredEnvironments: [],
          salaryExpectation: '',
          willingToRelocate: null
        }
        localStorage.removeItem('careerMatchingProgress')
      }
    },

    submitQuestionnaire() {
      if (this.progressPercentage < 100) {
        alert('Please complete all sections before submitting.')
        return
      }

      // Here you would typically send the data to your backend
      const formData = {
        personalData: this.personalData,
        educationData: this.educationData,
        careerData: this.careerData
      }

      console.log('Submitting form data:', formData)
      // Implement your API call here
      alert('Questionnaire submitted successfully!')
    }
  },
  mounted() {
    this.loadProgress()
    this.calculateProgress()
  }
}
</script>

<style scoped>
/* Custom range input styling */
input[type="range"] {
  -webkit-appearance: none;
  background-color: rgb(30 41 59); /* slate-800 */
  border-radius: 0.5rem;
  height: 0.5rem;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background-color: rgb(59 130 246); /* blue-500 */
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  border-radius: 9999px;
  background-color: rgb(59 130 246); /* blue-500 */
  cursor: pointer;
  border: none;
}

/* Custom radio button styling */
input[type="radio"] {
  border-radius: 9999px;
  border-color: rgb(51 65 85); /* slate-700 */
  color: rgb(37 99 235); /* blue-600 */
}

input[type="radio"]:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* blue-500/50 */
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Glass effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgb(30 41 59); /* slate-800 */
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb {
  background-color: rgb(51 65 85); /* slate-700 */
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(71 85 105); /* slate-600 */
}

/* Textarea placeholder color */
textarea::placeholder {
  color: rgb(100 116 139); /* slate-500 */
}

/* Disabled button styles */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Focus styles */
button:focus, input:focus, select:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* blue-500/50 */
}

/* Responsive padding adjustments */
@media (max-width: 640px) {
  .responsive-padding {
    padding: 0.75rem;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .responsive-padding {
    padding: 1rem;
  }
}

@media (min-width: 1024px) {
  .responsive-padding {
    padding: 1.25rem;
  }
}

/* Input hover states */
select:hover, input[type="text"]:hover, input[type="number"]:hover, textarea:hover {
  border-color: rgb(71 85 105); /* slate-600 */
}

/* Active states for buttons */
button:active {
  transform: scale(0.98);
}

/* Transition for interactive elements */
button, input, select, textarea {
  transition: all 0.2s ease-in-out;
}
</style>