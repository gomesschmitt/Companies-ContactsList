import { createRouter, createWebHistory } from 'vue-router'
import LogInView from '../views/LogInView.vue'
import Table from '../components/TableComponent.vue'
import SignUp from '../components/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogInView
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})

export default router
