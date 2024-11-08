<template>
  <div class="app-container">
    <!-- 특정 페이지가 아닐 때만 Header와 BottomNav를 표시합니다 -->
    <Header v-if="showHeaderAndNav" />
    <router-view />
    <BottomNav v-if="showHeaderAndNav" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Header from './src/components/Header.vue';
import BottomNav from './src/components/BottomNav.vue';

// 현재 라우터 경로를 가져와 특정 페이지인지 확인
const route = useRoute();
const showHeaderAndNav = computed(() => 
  !['Welcome', 'AgeSelection', 'GenderSelection', 'RecommendedFacilities', 'DisabilityTypeSelection', 'DisabilityGradeSelection', 'RegistrationInput', 'Login'].includes(route.name)
); // Welcome, AgeSelection, GenderSelection, RecommendedFacilities에서 헤더와 네비게이션 바를 숨김
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
}
</style>
