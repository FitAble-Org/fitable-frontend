import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/components/Welcome.vue';
import Home from '@/components/Home.vue';
import AgeSelection from '@/components/AgeSelection.vue';
import GenderSelection from '@/components/GenderSelection.vue';
import DisabilityTypeSelection from '@/components/DisabilityTypeSelection.vue';
import DisabilityGradeSelection from '@/components/DisabilityGradeSelection.vue';

const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/home', name: 'Home', component: Home },
  { path: '/age-selection', name: 'AgeSelection', component: AgeSelection },
  { path: '/gender-selection', name: 'GenderSelection', component: GenderSelection },
  { path: '/disability-type-selection', name: 'DisabilityTypeSelection', component: DisabilityTypeSelection },
  { 
    path: '/disability-grade-selection', 
    name: 'DisabilityGradeSelection', 
    component: DisabilityGradeSelection,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
