import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/components/Welcome.vue';
import Home from '@/components/Home.vue';
import IndoorExercise from '@/components/IndoorExercise.vue';
import OutdoorExercise from '@/components/OutdoorExercise.vue';
import RecommendedFacilities from '@/components/RecommendedFacilities.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/home',
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
