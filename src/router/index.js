import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import UserList from '../views/UserList.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/users', name: 'UserList', component: UserList, meta: { requiresAuth: true } },
  { path: '/', redirect: '/users' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
