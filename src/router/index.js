import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'
import Analytics from '../views/Analytics.vue'
import Message from '../views/Message.vue'
import Export from '../views/Export.vue'
import Settings from '../views/Settings.vue'
import PageNotFound from '../views/PageNotFound.vue'

import { useUserStore } from '@/stores/user';

const routes = [
  {
    path: '/',
    redirect: '/auth/signin'
  },
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: 'signin',
        name: 'SignIn',
        component: () => import('@/components/SignIn.vue')
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import('@/components/SignUp.vue')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/components/ForgotPassword.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics,
    meta: { requiresAuth: true },
  },
    {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: { requiresAuth: true },
  },
    {
    path: '/export',
    name: 'Export',
    component: Export,
    meta: { requiresAuth: true },
    },
    {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();


  if (userStore.user === null) {
    await userStore.loadUser();
  }

  if (to.meta.requiresAuth && !userStore.user) {
    next({ name: 'SignIn' });
  } else {
    next();
  }
});

export default router