import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import IndoorExercise from '@/components/IndoorExercise.vue';
import OutdoorExercise from '@/components/OutdoorExercise.vue';
import RecommendedFacilities from '@/components/RecommendedFacilities.vue';

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
  {
    path: '/outdoor-exercise',
    name: 'OutdoorExercise',
    component: OutdoorExercise,
  },
  {
    path: '/recommended-facilities',
    name: 'RecommendedFacilities',
    component: RecommendedFacilities,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
