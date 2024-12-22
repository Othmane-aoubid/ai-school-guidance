import { createRouter as createVueRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Views and Components
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import LandingPage from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import AnalyticsView from "../views/AnalyticsView.vue";
import CareermatchingView from "../views/CareermatchingView.vue";
import UsersView from "../views/UsersView.vue";
import SettingsView from "../views/SettingsView.vue";
import AichatsupportView from "../views/AichatsupportView.vue";
import StudyTimetableView from "../views/StudyTimetableView.vue";
import GamificationView from "../views/GamificationView.vue";
import OnboardingView from "../views/OnboardingView.vue";
import InteractiveToolsView from "../views/InteractiveToolsView.vue";
import ContentLibraryView from "../views/ContentLibraryView.vue";
import ResumeBuilderView from "../views/ResumeBuilderView.vue";
import CareerPathPage from "../components/CareerPathPage.vue";
import SkillAssessmentQuiz from "../components/SkillAssessmentQuiz.vue";
import CareerMachtingResultView from "../views/CareerMachtingResultView.vue";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/Onboarding",
    name: "Onboarding",
    component: OnboardingView,
    meta: { requiresAuth: true },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: AnalyticsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/interactive-tools",
    name: "InteractiveTools",
    component: InteractiveToolsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/content-library",
    name: "ContentLibrary",
    component: ContentLibraryView,
    meta: { requiresAuth: true },
  },
  {
    path: "/career-matching",
    name: "Career Matching",
    component: CareermatchingView,
    meta: { requiresAuth: true },
  },
  {
    path: "/ai-chat-support",
    name: "Ai Chat Support",
    component: AichatsupportView,
    meta: { requiresAuth: true },
  },
  {
    path: "/timetable",
    name: "Study Time Table",
    component: StudyTimetableView,
    meta: { requiresAuth: true },
  },
  {
    path: "/gamification",
    name: "Gamification",
    component: GamificationView,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "Users",
    component: UsersView,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/resume-builder",
    name: "ResumeBuilder",
    component: ResumeBuilderView,
    meta: { requiresAuth: true },
  },
  {
    path: "/job-search",
    name: "job-search",
    component: CareerPathPage,
    meta: {
      title: "Career Path Explorer",
      requiresAuth: true,
    },
  },
  {
    path: "/skill-assessment",
    name: "skill-assessment",
    component: SkillAssessmentQuiz,
    meta: {
      title: "Skill Assessment",
      requiresAuth: true,
    },
  },
  {
    path: "/career-matching-results",
    name: "Career-Matching-Results",
    component: CareerMachtingResultView,
    meta: { requiresAuth: true },
  },
];

export function createAppRouter() {
  const router = createVueRouter({
    history: createWebHistory(),
    routes,
  });

  // Navigation Guard
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (requiresAuth && !authStore.user) {
      next("/login");
    } else {
      next();
    }
  });

  return router;
}
