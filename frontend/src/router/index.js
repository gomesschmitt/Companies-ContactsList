import { createRouter, createWebHistory } from 'vue-router'
import LogInView from '../views/LogInView.vue'
import Table from '../views/TableView.vue'
import SignUp from '../views/SignUpView.vue'
import EditAccount from '../views/EditAccount.vue'

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
    },
    {
      path: '/user/edit',
      name: 'EditAccount',
      component: EditAccount
    },
  ]
})

export default router
