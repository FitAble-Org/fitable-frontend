<template>
  <div class="app-container">
    <!-- 특정 페이지가 아닐 때만 Header와 BottomNav를 각각 표시합니다 -->
    <Header v-if="showHeader" />
    <router-view />
    <BottomNav v-if="showNav" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import Header from "./src/components/Header.vue";
import BottomNav from "./src/components/BottomNav.vue";

// 현재 라우터 경로를 가져와 특정 페이지인지 확인
const route = useRoute();

// 헤더와 네비게이션 바 각각의 표시 조건을 설정
const showHeader = computed(
  () =>
    ![
      "Welcome",
      "AgeSelection",
      "GenderSelection",
      "RecommendedFacilities",
      "DisabilityTypeSelection",
      "DisabilityGradeSelection",
      "RegistrationInput",
      "Login",
      "RecommendedExercise",
      "Question",
      "FacilitiesMap",
      "DistanceSelection",
      "ProfileAgeSelection",
      "ProfileDisabilityGradeSelection",
      "ProfileDisabilityTypeSelection",
      "ProfileGenderSelection",
      "IndoorExercise",
      "IndoorExerciseInfo",
      "BoardDetail",
    ].includes(route.name)
);

const showNav = computed(
  () =>
    ![
      "Welcome",
      "FacilitiesMap",
      "Login",
      "AgeSelection",
      "GenderSelection",
      "RecommendedFacilities",
      "DisabilityTypeSelection",
      "DisabilityGradeSelection",
      "RegistrationInput",
      "ProfileAgeSelection",
      "ProfileDisabilityGradeSelection",
      "ProfileDisabilityTypeSelection",
      "ProfileGenderSelection",
    ].includes(route.name)
); // 네비게이션 바는 특정 페이지에서만 숨김
</script>

<style scoped>
.app-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
  /* 부모 컨테이너에 position: relative 추가 */
  position: relative;
}
</style>
