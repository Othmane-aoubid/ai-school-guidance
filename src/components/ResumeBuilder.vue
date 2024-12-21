<template>
  <div class="bg-gray-50" style="height: 400px; overflow-y: scroll">
    <!-- Step 1: Landing Page -->
    <div
      v-if="currentStep === 0"
      class="container mx-auto px-4 py-12 min-h-[80vh] flex flex-col items-center justify-center"
    >
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
        Create Your Professional Resume
      </h1>
      <div class="flex flex-col sm:flex-row gap-6 items-center">
        <button
          @click="currentStep = 1"
          class="w-full sm:w-auto bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-900 transition text-lg"
        >
          Upload Resume
        </button>
        <span class="text-gray-500 font-medium">OR</span>
        <button
          @click="goToTemplates"
          class="w-full sm:w-auto bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition text-lg"
        >
          Build A Custom Resume
        </button>
      </div>
    </div>

    <!-- Step 2: Template Selection -->
    <div v-if="currentStep === 1" class="container mx-auto px-4 py-8">
      <h2 class="text-2xl md:text-3xl font-bold mb-8 text-center">
        Choose Your Template
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="template in templates"
          :key="template.id"
          class="relative group cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl"
          @click="selectTemplate(template)"
        >
          <img
            :src="template.preview"
            :alt="template.name"
            class="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center"
          >
            <button
              class="bg-orange-500 text-white px-6 py-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity transform scale-95 group-hover:scale-100"
            >
              Use Template
            </button>
          </div>
          <div class="p-6 border-t">
            <h3 class="font-bold text-xl mb-2">{{ template.name }}</h3>
            <p class="text-gray-600">{{ template.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: Resume Editor -->
    <div v-if="currentStep === 2" class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <!-- Editor Controls -->
        <div class="xl:col-span-5 2xl:col-span-4 space-y-6">
          <!-- Sticky sidebar for controls -->
          <div class="sticky top-4 space-y-6">
            <!-- Styling Controls -->
            <div class="bg-white p-6 rounded-xl shadow-lg">
              <h3 class="text-xl font-bold mb-6">Styling</h3>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium mb-2"
                    >Font Family</label
                  >
                  <select
                    v-model="selectedFont"
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option v-for="font in fonts" :key="font" :value="font">
                      {{ font }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2"
                    >Primary Color</label
                  >
                  <input
                    type="color"
                    v-model="primaryColor"
                    class="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-2"
                    >Font Size</label
                  >
                  <div class="flex items-center gap-4">
                    <input
                      type="range"
                      v-model="fontSize"
                      min="12"
                      max="24"
                      class="flex-1"
                    />
                    <span class="text-sm text-gray-600 w-16 text-center"
                      >{{ fontSize }}px</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Content Sections -->
            <div class="bg-white p-6 rounded-xl shadow-lg">
              <h3 class="text-xl font-bold mb-6">Content</h3>
              <div class="space-y-8">
                <!-- Personal Info -->
                <div class="space-y-4">
                  <label class="block text-lg font-medium"
                    >Personal Information</label
                  >
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      v-model="personalInfo.name"
                      placeholder="Full Name"
                      class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      v-model="personalInfo.email"
                      placeholder="Email"
                      class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      v-model="personalInfo.phone"
                      placeholder="Phone"
                      class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      v-model="personalInfo.location"
                      placeholder="Location"
                      class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      v-model="personalInfo.linkedin"
                      placeholder="LinkedIn URL"
                      class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      v-model="personalInfo.website"
                      placeholder="Portfolio Website"
                      class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <!-- Professional Summary -->
                <div class="space-y-4">
                  <label class="block text-lg font-medium"
                    >Professional Summary</label
                  >
                  <textarea
                    v-model="summary"
                    placeholder="Write a compelling professional summary..."
                    rows="4"
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  ></textarea>
                </div>

                <!-- Experience Section -->
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <label class="block text-lg font-medium"
                      >Work Experience</label
                    >
                    <button
                      @click="addExperience"
                      class="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-2"
                    >
                      <span class="text-xl">+</span> Add Experience
                    </button>
                  </div>

                  <div
                    v-for="(exp, index) in experience"
                    :key="index"
                    class="p-4 border rounded-lg space-y-4"
                  >
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        v-model="exp.title"
                        placeholder="Job Title"
                        class="w-full p-3 border rounded-lg"
                      />
                      <input
                        v-model="exp.company"
                        placeholder="Company"
                        class="w-full p-3 border rounded-lg"
                      />
                      <input
                        v-model="exp.startDate"
                        type="month"
                        class="w-full p-3 border rounded-lg"
                      />
                      <input
                        v-model="exp.endDate"
                        type="month"
                        class="w-full p-3 border rounded-lg"
                      />
                      <input
                        v-model="exp.location"
                        placeholder="Location"
                        class="w-full p-3 border rounded-lg sm:col-span-2"
                      />
                    </div>
                    <textarea
                      v-model="exp.description"
                      placeholder="• Use bullets to describe your achievements&#10;• Focus on quantifiable results&#10;• Start with action verbs"
                      rows="4"
                      class="w-full p-3 border rounded-lg"
                    ></textarea>
                    <button
                      @click="removeExperience(index)"
                      class="text-red-500 hover:text-red-600 font-medium"
                    >
                      Remove Entry
                    </button>
                  </div>
                </div>

                <!-- Similar improvements for Education, Projects, Skills, etc. sections -->
                <!-- ... Rest of the sections following the same pattern ... -->
              </div>
            </div>
          </div>
        </div>

        <!-- Resume Preview -->
        <div class="xl:col-span-7 2xl:col-span-8">
          <div class="sticky top-4 space-y-6">
            <div class="bg-white p-8 rounded-xl shadow-lg" :style="resumeStyle">
              <div class="preview-content">
                <component
                  :is="selectedTemplate.component"
                  :personal-info="personalInfo"
                  :summary="summary"
                  :experience="experience"
                  :education="education"
                  :projects="projects"
                  :skills="skills"
                  :certifications="certifications"
                  :languages="languages"
                  :styling="resumeStyle"
                />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row justify-end gap-4">
              <button
                @click="downloadPDF"
                class="w-full sm:w-auto bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
              >
                <span>Download PDF</span>
              </button>
              <button
                @click="saveResume"
                class="w-full sm:w-auto bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2"
              >
                <span>Save Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentStep: 0,
      selectedTemplate: null,
      templates: [],
      fonts: ["Arial", "Helvetica", "Times New Roman", "Georgia", "Roboto"],
      selectedFont: "Arial",
      primaryColor: "#ff6b00",
      fontSize: 16,
      personalInfo: {
        name: "",
        email: "",
        phone: "",
      },
      experience: [],
      education: [],
      skills: [],
      newSkill: "",
    };
  },
  computed: {
    resumeStyle() {
      return {
        fontFamily: this.selectedFont,
        "--primary-color": this.primaryColor,
        fontSize: `${this.fontSize}px`,
      };
    },
  },
  methods: {
    goToTemplates() {
      this.currentStep = 1;
    },
    selectTemplate(template) {
      this.selectedTemplate = template;
      this.currentStep = 2;
    },
    addExperience() {
      this.experience.push({
        title: "",
        company: "",
        description: "",
      });
    },
    removeExperience(index) {
      this.experience.splice(index, 1);
    },
    addEducation() {
      this.education.push({
        degree: "",
        school: "",
        year: "",
      });
    },
    removeEducation(index) {
      this.education.splice(index, 1);
    },
    addSkill() {
      if (this.newSkill.trim()) {
        this.skills.push(this.newSkill.trim());
        this.newSkill = "";
      }
    },
    removeSkill(index) {
      this.skills.splice(index, 1);
    },
    async downloadPDF() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/generate-pdf",
          {
            template: this.selectedTemplate.name.toLowerCase(),
            styling: {
              font: this.selectedFont,
              primaryColor: this.primaryColor,
              fontSize: this.fontSize,
            },
            content: {
              personalInfo: this.personalInfo,
              summary: this.summary,
              experience: this.experience,
              education: this.education,
              skills: this.skills,
            },
          },
          {
            responseType: "blob",
          }
        );

        // Create download link for the PDF
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "resume.pdf");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF. Please try again.");
      }
    },
    async saveResume() {
      // Here you would typically make an API call to save the resume data
      try {
        const resumeData = {
          template: this.selectedTemplate,
          styling: {
            font: this.selectedFont,
            primaryColor: this.primaryColor,
            fontSize: this.fontSize,
          },
          content: {
            personalInfo: this.personalInfo,
            experience: this.experience,
            education: this.education,
            skills: this.skills,
          },
        };

        // Mock API call
        console.log("Saving resume:", resumeData);
        alert("Resume saved successfully!");
      } catch (error) {
        console.error("Error saving resume:", error);
        alert("Error saving resume. Please try again.");
      }
    },
    // async fetchTemplates() {
    //   try {
    //     const response = await axios.get("http://localhost:5000/api/templates");
    //     this.templates = response.data;
    //   } catch (error) {
    //     console.error("Error fetching templates:", error);
    //   }
    // },
  },
  mounted() {
    // this.fetchTemplates();
  },
};
</script>
