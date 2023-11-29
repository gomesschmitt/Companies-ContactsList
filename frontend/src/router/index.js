import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../components/LogIn.vue'
import Table from '../components/Table.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    }
  ]
})

export default router
