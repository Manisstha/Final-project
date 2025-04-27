import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'

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
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
