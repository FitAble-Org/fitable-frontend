import { createRouter, createWebHistory } from 'vue-router';
import Home from '../../App.vue';
import IndoorExercise from '../components/IndoorExercise.vue'; // 정확한 경로를 사용해 가져옵니다.

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
