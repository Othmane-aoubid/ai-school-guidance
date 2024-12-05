import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/config';
import DashboardLayout from '../components/layout/DashboardLayout.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';
import UsersView from '../views/UsersView.vue';
import SettingsView from '../views/SettingsView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: DashboardView
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: AnalyticsView
      },
      {
        path: 'users',
        name: 'Users',
        component: UsersView
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsView
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (!requiresAuth && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;