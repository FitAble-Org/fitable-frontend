import { createRouter, createWebHistory } from 'vue-router';
//기본
import Welcome from '@/components/Welcome.vue';
import Home from '@/components/calendar/Home.vue';
//회원가입
import AgeSelection from '@/components/signin/AgeSelection.vue';
import GenderSelection from '@/components/signin/GenderSelection.vue';
import DisabilityTypeSelection from '@/components/signin/DisabilityTypeSelection.vue';
import DisabilityGradeSelection from '@/components/signin/DisabilityGradeSelection.vue';
import RegistrationInput from '@/components/signin/RegistrationInput.vue';
//로그인
import Login from '@/components/Login.vue';
import IndoorExercise from '@/components/IndoorExercise.vue';
//외부시설
import DistanceSelection from '@/components/facilitytraining/DistanceSelection.vue';
import Question from '@/components/facilitytraining/Question.vue';
import RecommendedExercise from '@/components/facilitytraining/RecommendedExercise.vue';
import FacilitiesMap from '@/components/facilitytraining/FacilitiesMap.vue';
//마이페이지
import MyPage from '@/components/mypage/Mypage.vue';
import ProfileAgeSelection from '@/components/mypage/ProfileAgeSelection.vue';
import ProfileDisabilityGradeSelection from '@/components/mypage/ProfileDisabilityGradeSelection.vue';
import ProfileDisabilityTypeSelection from '@/components/mypage/ProfileDisabilityTypeSelection.vue';
import ProfileGenderSelection from '@/components/mypage/ProfileGenderSelection.vue';

const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/home', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
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
    path: '/distance-selection',
    name: 'DistanceSelection',
    component: DistanceSelection,
  },
  {
    path: '/question',
    name: 'Question',
    component: Question,
    props: true,
  },
  {
    path: '/recommended-exercise',
    name: 'RecommendedExercise',
    component: RecommendedExercise,
  },
  {
    path: '/facilities-map',
    name: 'FacilitiesMap',
    component: FacilitiesMap
  },
  {
    path: '/my-page',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/profile-age-selection',
    name: 'ProfileAgeSelection',
    component: ProfileAgeSelection
  },
  {
    path: '/profile-disability-grade-selection',
    name: 'ProfileDisabilityGradeSelection',
    component: ProfileDisabilityGradeSelection
  },
  {
    path: '/profile-disability-type-selection',
    name: 'ProfileDisabilityTypeSelection',
    component: ProfileDisabilityTypeSelection
  },
  {
    path: '/profile-gender-selection',
    name: 'ProfileGenderSelection',
    component: ProfileGenderSelection
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
