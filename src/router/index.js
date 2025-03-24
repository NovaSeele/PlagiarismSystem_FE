import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Overview from '../views/Overview.vue';
import Documents from '../views/Documents.vue';
import PlagiarismCheck from '../views/PlagiarismCheck.vue';
import ChatAI from '../views/ChatAI.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/documents',
    name: 'Documents',
    component: Documents
  },
  {
    path: '/plagiarism-check',
    name: 'PlagiarismCheck',
    component: PlagiarismCheck
  },
  {
    path: '/chat',
    name: 'ChatAI',
    component: ChatAI
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;