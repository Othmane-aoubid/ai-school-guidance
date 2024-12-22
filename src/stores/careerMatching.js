import { defineStore } from "pinia";
import { db } from "../firebase/config";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";

export const useCareerMatchingStore = defineStore("careerMatching", {
  state: () => ({
    personalData: {
      motivation: "",
      workStyle: "",
      stressManagement: 3,
      selectedSkills: [],
      careerInterests: "",
      technicalSkills: [], // New field
    },
    educationData: {
      level: "",
      field: "",
      experience: null,
    },
    careerData: {
      preferredEnvironments: [],
      salaryExpectation: "",
      willingToRelocate: null,
      preferredCompanySize: "", // New field
      workCulture: [], // New field
    },
    progress: 0,
    errors: {},
    isSubmitting: false,
  }),

  getters: {
    isFormValid: (state) => {
      // Add validation logic
      const requiredFields = {
        personal: ["motivation", "workStyle", "selectedSkills"],
        education: ["level", "field"],
        career: [
          "preferredEnvironments",
          "salaryExpectation",
          "willingToRelocate",
        ],
      };

      return (
        !Object.values(state.errors).some((error) => error) &&
        requiredFields.personal.every((field) => state.personalData[field]) &&
        requiredFields.education.every((field) => state.educationData[field]) &&
        requiredFields.career.every((field) => state.careerData[field])
      );
    },
  },

  actions: {
    async saveProgress(userId) {
      try {
        await setDoc(doc(db, "careerMatching", userId), {
          personalData: this.personalData,
          educationData: this.educationData,
          careerData: this.careerData,
          lastUpdated: new Date().toISOString(),
        });
        return true;
      } catch (error) {
        console.error("Error saving progress:", error);
        throw error;
      }
    },

    async loadProgress(userId) {
      try {
        const docRef = await getDoc(doc(db, "careerMatching", userId));
        if (docRef.exists()) {
          const data = docRef.data();
          this.personalData = { ...this.personalData, ...data.personalData };
          this.educationData = { ...this.educationData, ...data.educationData };
          this.careerData = { ...this.careerData, ...data.careerData };
          this.calculateProgress();
        }
      } catch (error) {
        console.error("Error loading progress:", error);
        throw error;
      }
    },

    calculateProgress() {
      // Enhanced progress calculation logic
      const sections = [
        this.validatePersonalSection(),
        this.validateEducationSection(),
        this.validateCareerSection(),
      ];

      const completedSections = sections.filter((section) => section).length;
      this.progress = Math.round((completedSections / sections.length) * 100);
    },

    validatePersonalSection() {
      return (
        this.personalData.motivation &&
        this.personalData.workStyle &&
        this.personalData.selectedSkills.length > 0
      );
    },

    validateEducationSection() {
      return this.educationData.level && this.educationData.field;
    },

    validateCareerSection() {
      return (
        this.careerData.preferredEnvironments.length > 0 &&
        this.careerData.salaryExpectation &&
        this.careerData.willingToRelocate !== null
      );
    },

    resetForm() {
      this.$reset();
    },

    async saveResultsToDb(submissionData) {
      try {
        const submissionsRef = collection(db, "careerMatchingSubmissions");
        const docRef = await addDoc(submissionsRef, submissionData);
        return docRef.id;
      } catch (error) {
        console.error("Error saving to database:", error);
        throw error;
      }
    },

    async loadResults(userId) {
      try {
        const snapshot = await db
          .collection("careerProfiles")
          .where("userId", "==", userId)
          .orderBy("createdAt", "desc")
          .limit(1)
          .get();

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          this.personalData = data.profile;
          return data;
        }
        return null;
      } catch (error) {
        console.error("Error loading results:", error);
        throw error;
      }
    },
  },
});
