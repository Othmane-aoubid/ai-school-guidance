<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-800"
  >
    <!-- Navigation -->
    <nav class="fixed top-0 z-40 w-full backdrop-blur-lg bg-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="flex items-center gap-2">
                <div
                  class="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center"
                >
                  <font-awesome-icon
                    icon="graduation-cap"
                    class="text-white text-2xl"
                  />
                </div>
                <span class="text-white font-bold text-xl">EduAI</span>
              </div>
            </div>
            <div class="hidden md:flex md:ml-10 space-x-8">
              <a
                href="#hero"
                class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >Home</a
              >
              <a
                href="#about"
                class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >About</a
              >
              <a
                href="#features"
                class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >Features</a
              >
              <a
                href="#pricing"
                class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >Pricing</a
              >
            </div>
          </div>
          <div class="flex items-center gap-4">
            <router-link to="/login">
            <button
              class="text-white hover:text-purple-200 px-4 py-2 text-sm font-medium"
            >
              Sign In
            </button></router-link>
            <router-link to="/register">
                <button
              class="bg-white text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sign Up
            </button>
            </router-link>
            
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="pt-32 pb-20 px-4 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('https://play.tailwindcss.com/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
      ></div>
      <div class="max-w-7xl mx-auto relative">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to AI School Guidance
          </h1>
          <h2
            class="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent mb-8"
          >
            Empowering Education with AI
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Revolutionize your school's guidance system with cutting-edge AI
            technology. Personalized learning paths, real-time analytics, and
            intelligent insights.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="showRegisterModal = true"
              class="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </button>
            <a
              href="#features"
              class="px-8 py-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors backdrop-blur-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 relative">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">Powerful Features</h2>
          <p class="text-xl text-gray-300">
            Discover how our AI-powered guidance system transforms education
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.name"
            class="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-colors"
          >
            <font-awesome-icon
              :icon="feature.icon"
              class="text-purple-400 text-3xl mb-4"
            />
            <h3 class="text-xl font-bold text-white mb-2">
              {{ feature.name }}
            </h3>
            <p class="text-gray-300">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">Simple Pricing</h2>
          <p class="text-xl text-gray-300">
            Choose the perfect plan for your institution
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="plan in pricingPlans"
            :key="plan.name"
            class="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-colors border border-white/20"
          >
            <h3 class="text-2xl font-bold text-white mb-2">{{ plan.name }}</h3>
            <div class="text-4xl font-bold text-white mb-4">
              ${{ plan.price
              }}<span class="text-lg font-normal text-gray-300">/month</span>
            </div>
            <p class="text-gray-300 mb-6">{{ plan.description }}</p>
            <button
              class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-4 border-t border-white/10" style="background-color:#2C3041;">
      <div class="max-w-7xl mx-auto text-center">
        <p class="text-gray-400">&copy; 2024 EduAI. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGraduationCap,
  faChartLine,
  faLightbulb,
  faShieldAlt,
  faComments,
  faUserGraduate,
  faUsers,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


// Add icons to library
library.add(
  faGraduationCap,
  faChartLine,
  faLightbulb,
  faShieldAlt,
  faComments,
  faUserGraduate,
  faUsers,
  faTimes
);

const showLoginModal = ref(false);
const showRegisterModal = ref(false);

const features = [
  {
    name: "Personalized Learning Paths",
    description:
      "AI-generated custom learning plans tailored to each student's needs and goals.",
    icon: ["fas", "lightbulb"],
  },
  {
    name: "Real-time Analytics",
    description:
      "Comprehensive insights and performance tracking for data-driven decisions.",
    icon: ["fas", "chart-line"],
  },
  {
    name: "Secure Platform",
    description:
      "Enterprise-grade security to protect sensitive student information.",
    icon: ["fas", "shield-alt"],
  },
  {
    name: "AI Tutoring",
    description: "24/7 intelligent tutoring support across all subjects.",
    icon: ["fas", "comments"],
  },
  {
    name: "Career Guidance",
    description:
      "Smart career recommendations based on student strengths and interests.",
    icon: ["fas", "user-graduate"],
  },
  {
    name: "Collaborative Learning",
    description:
      "Enhanced interaction between students, teachers, and parents.",
    icon: ["fas", "users"],
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: 99,
    description: "Perfect for small schools getting started with AI guidance.",
  },
  {
    name: "Pro",
    price: 199,
    description: "Advanced features and analytics for growing institutions.",
  },
  {
    name: "Enterprise",
    price: 399,
    description: "Comprehensive solution for large educational networks.",
  },
];
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
