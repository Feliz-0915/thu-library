import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import AboutView from '../views/AboutView.vue'
import MembersView from '../views/MembersView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/members', name: 'Members', component: MembersView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/denied', name: 'AccessDenied', component: AccessDeniedView },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'Login', query: { redirect: to.fullPath, msg: 'Please login to access this page.' } }
  }
})

export default router
