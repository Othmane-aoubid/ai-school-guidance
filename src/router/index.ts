import { createRouter, createWebHistory } from 'vue-router';

// Views and Components
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import LandingPage from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';
import CareermatchingView from '../views/CareermatchingView.vue';
import UsersView from '../views/UsersView.vue';
import SettingsView from '../views/SettingsView.vue';

const routes = [
  // Public routes
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false },
  },
  // Dashboard-related routes
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: AnalyticsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/CareerMatching',
    name: 'Career Matching',
    component: CareermatchingView,
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.path);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Replace with proper auth logic

  if (requiresAuth && !isAuthenticated) {
    console.log('User is not authenticated, redirecting to login');
    next('/login');
  } else {
    console.log('User is authenticated, proceeding to:', to.path);
    next();
  }
});

export default router;
