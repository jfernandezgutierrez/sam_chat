// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Chat from '../Chat.vue'
import Login from '../components/Login/Login.vue';

const routes = [
  {
    path: '/',
    component: Login,
    name: 'Login',
  },
  {
    path: '/Chat',
    component: Chat,
   name: 'Chat',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
