import { createRouter, createWebHistory } from "vue-router";
//기본
import Welcome from "@/components/Welcome.vue";
import Home from "@/components/calendar/Home.vue";
//회원가입
import AgeSelection from "@/components/signin/AgeSelection.vue";
import GenderSelection from "@/components/signin/GenderSelection.vue";
import DisabilityTypeSelection from "@/components/signin/DisabilityTypeSelection.vue";
import DisabilityGradeSelection from "@/components/signin/DisabilityGradeSelection.vue";
import RegistrationInput from "@/components/signin/RegistrationInput.vue";
//로그인
import Login from "@/components/Login.vue";
//가정운동
import IndoorExercise from "@/components/indoorexercise/IndoorExercise.vue";
import IndoorExerciseInfo from "@/components/indoorexercise/IndoorExerciseInfo.vue";

//외부시설
import DistanceSelection from "@/components/facilitytraining/DistanceSelection.vue";
import Question from "@/components/facilitytraining/Question.vue";
import RecommendedExercise from "@/components/facilitytraining/RecommendedExercise.vue";
import FacilitiesMap from "@/components/facilitytraining/FacilitiesMap.vue";
//마이페이지
import MyPage from "@/components/mypage/MyPage.vue";
import ProfileAgeSelection from "@/components/mypage/ProfileAgeSelection.vue";
import ProfileDisabilityGradeSelection from "@/components/mypage/ProfileDisabilityGradeSelection.vue";
import ProfileDisabilityTypeSelection from "@/components/mypage/ProfileDisabilityTypeSelection.vue";
import ProfileGenderSelection from "@/components/mypage/ProfileGenderSelection.vue";
//게시판
import Community from "@/components/community/Community.vue";
import BoardDetail from "@/components/community/BoardDetail.vue";
import BoardWrite from "@/components/community/BoardWrite.vue";
//동호회
import Club from "@/components/club/Club.vue";
import ClubInfo from "@/components/club/ClubInfo.vue";

const routes = [
  { path: "/", name: "Welcome", component: Welcome },
  { path: "/home", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/age-selection", name: "AgeSelection", component: AgeSelection },
  {
    path: "/gender-selection",
    name: "GenderSelection",
    component: GenderSelection,
  },
  {
    path: "/disability-type-selection",
    name: "DisabilityTypeSelection",
    component: DisabilityTypeSelection,
  },
  {
    path: "/disability-grade-selection",
    name: "DisabilityGradeSelection",
    component: DisabilityGradeSelection,
  },
  {
    path: "/registration-input",
    name: "RegistrationInput",
    component: RegistrationInput,
  },
  {
    path: "/indoor-exercise",
    name: "IndoorExercise",
    component: IndoorExercise,
  },
  {
    path: "/indoor-exercise-info",
    name: "IndoorExerciseInfo",
    component: IndoorExerciseInfo,
  },
  {
    path: "/distance-selection",
    name: "DistanceSelection",
    component: DistanceSelection,
  },
  {
    path: "/question",
    name: "Question",
    component: Question,
    props: true,
  },
  {
    path: "/recommended-exercise",
    name: "RecommendedExercise",
    component: RecommendedExercise,
  },
  {
    path: "/facilities-map",
    name: "FacilitiesMap",
    component: FacilitiesMap,
  },
  {
    path: "/my-page",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/profile-age-selection",
    name: "ProfileAgeSelection",
    component: ProfileAgeSelection,
  },
  {
    path: "/profile-disability-grade-selection",
    name: "ProfileDisabilityGradeSelection",
    component: ProfileDisabilityGradeSelection,
  },
  {
    path: "/profile-disability-type-selection",
    name: "ProfileDisabilityTypeSelection",
    component: ProfileDisabilityTypeSelection,
  },
  {
    path: "/profile-gender-selection",
    name: "ProfileGenderSelection",
    component: ProfileGenderSelection,
  },
  {
    path: "/club",
    name: "Club",
    component: Club,
  },
  {
    path: "/club/:id",
    name: "ClubInfo",
    component: ClubInfo,
  },
  {
    path: "/boards",
    name: "Community",
    component: Community,
  },
  {
    path: "/boards/write",
    name: "BoardWrite",
    component: BoardWrite,
  },
  {
    path: "/boards/:boardId",
    name: "BoardDetail",
    component: BoardDetail,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
