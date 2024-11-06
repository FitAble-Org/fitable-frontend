// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import IndoorExercise from '@/components/IndoorExercise.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/indoor-exercise',
    name: 'IndoorExercise',
    component: IndoorExercise,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
