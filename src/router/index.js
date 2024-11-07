import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '@/components/Welcome.vue';
import Home from '@/components/Home.vue';
import AgeSelection from '@/components/signin/AgeSelection.vue';
import GenderSelection from '@/components/signin/GenderSelection.vue';
import DisabilityTypeSelection from '@/components/signin/DisabilityTypeSelection.vue';
import DisabilityGradeSelection from '@/components/signin/DisabilityGradeSelection.vue';
import RegistrationInput from '@/components/signin/RegistrationInput.vue';

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
  { path: '/registration-input', name: 'RegistrationInput', component: RegistrationInput }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
