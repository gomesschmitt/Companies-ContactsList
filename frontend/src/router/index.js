import { createRouter, createWebHistory } from 'vue-router';
import LogInView from '../views/LogInView.vue';
import Companies from '../views/CompaniesList.vue';
import SignUp from '../views/SignUpView.vue';
import EditAccount from '../views/EditAccount.vue';
import ContactList from '../views/ContactsList.vue';

const isAuthenticated = () => {
  return true; 
};

const beforeEnterAuthGuard = (to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'LogIn' });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogInView,
  },
  {
    path: '/companies',
    name: 'companies',
    component: Companies,
    meta: { requiresAuth: true }, 
    beforeEnter: beforeEnterAuthGuard,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/user/edit',
    name: 'EditAccount',
    component: EditAccount,
    meta: { requiresAuth: true },
    beforeEnter: beforeEnterAuthGuard,
  },
  {
    path: '/contacts/list',
    name: 'contactsList',
    component: ContactList,
    meta: { requiresAuth: true },
    beforeEnter: beforeEnterAuthGuard,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
