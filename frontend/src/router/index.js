import { createRouter, createWebHistory } from 'vue-router'
import LogInView from '../views/LogInView.vue'
import Companies from '../views/TableView.vue'
import SignUp from '../views/SignUpView.vue'
import EditAccount from '../views/EditAccount.vue'
import ContactList from '../views/ContactsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogInView
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies
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
    {
      path: '/contacts/list',
      name: 'contactsList',
      component: ContactList
    },
  ]
})

export default router
