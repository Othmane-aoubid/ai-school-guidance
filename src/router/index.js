import { createRouter as createVueRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Views and Components
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import LandingPage from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';
import CareermatchingView from '../views/CareermatchingView.vue';
import UsersView from '../views/UsersView.vue';
import SettingsView from '../views/SettingsView.vue';
import AichatsupportView from '../views/AichatsupportView.vue';
import StudyTimetableView from '../views/StudyTimetableView.vue';
import GamificationView from '../views/GamificationView.vue';
import OnboardingView from '../views/OnboardingView.vue';
import InteractiveToolsView from '../views/InteractiveToolsView.vue';
import ContentLibraryView from '../views/ContentLibraryView.vue'

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage, meta: { requiresAuth: false } },
  { path: '/login', name: 'Login', component: LoginView, meta: { requiresAuth: false } },
  { path: '/register', name: 'Register', component: RegisterView, meta: { requiresAuth: false } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/Onboarding', name: 'Onboarding', component: OnboardingView, meta: { requiresAuth: true } },
  { path: '/analytics', name: 'Analytics', component: AnalyticsView, meta: { requiresAuth: true } },
  { path: '/InteractiveTools', name: 'InteractiveTools', component: InteractiveToolsView, meta: { requiresAuth: true } },
  { path: '/ContentLibrary', name: 'ContentLibrary', component: ContentLibraryView, meta: { requiresAuth: true } },
  { path: '/CareerMatching', name: 'Career Matching', component: CareermatchingView, meta: { requiresAuth: true } },
  { path: '/Aichatsupport', name: 'Ai Chat Support', component: AichatsupportView, meta: { requiresAuth: true } },
  { path: '/timetable', name: 'Study Time Table', component: StudyTimetableView, meta: { requiresAuth: true } },
  { path: '/gamificationt', name: 'Gamification', component: GamificationView, meta: { requiresAuth: true } },
  { path: '/users', name: 'Users', component: UsersView, meta: { requiresAuth: true } },
  { path: '/settings', name: 'Settings', component: SettingsView, meta: { requiresAuth: true } },
];

export function createAppRouter() {
  const router = createVueRouter({
    history: createWebHistory(),
    routes,
  });

  // Navigation Guard
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !authStore.user) {
      console.log('User is not authenticated, redirecting to login');
      next('/login');
    } else {
      console.log('User is authenticated, proceeding to:', to.path);
      next();
    }
  });

  return router;
}

