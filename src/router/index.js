import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/components/Welcome.vue';
import Home from '@/components/Home.vue';
import AgeSelection from '@/components/signin/AgeSelection.vue';
import GenderSelection from '@/components/signin/GenderSelection.vue';
import DisabilityTypeSelection from '@/components/signin/DisabilityTypeSelection.vue';
import DisabilityGradeSelection from '@/components/signin/DisabilityGradeSelection.vue';
import RegistrationInput from '@/components/signin/RegistrationInput.vue';
import IndoorExercise from '@/components/IndoorExercise.vue';
import OutdoorExercise from '@/components/OutdoorExercise.vue';
import RecommendedFacilities from '@/components/RecommendedFacilities.vue';
import Login from '@/components/login.vue';

const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login},
  { path: '/age-selection', name: 'AgeSelection', component: AgeSelection },
  { path: '/gender-selection', name: 'GenderSelection', component: GenderSelection },
  { path: '/disability-type-selection', name: 'DisabilityTypeSelection', component: DisabilityTypeSelection },
  { 
    path: '/disability-grade-selection', 
    name: 'DisabilityGradeSelection', 
    component: DisabilityGradeSelection,
  },
  { path: '/registration-input', name: 'RegistrationInput', component: RegistrationInput },
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
