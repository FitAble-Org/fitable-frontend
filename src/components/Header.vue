<!-- Header.vue -->
<template>
  <header class="header-container">
    <h1>{{ pageTitle }}</h1>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 현재 라우터 경로에 따라 페이지 제목을 설정합니다.
const pageTitle = computed(() => {
  switch (route.name) {
    case 'Home':
      return '오늘의 운동';
    case 'IndoorExercise':
      return '가정 운동';
    default:
      return '오늘의 운동';
  }
});
</script>

<style scoped>
.header-container {
  background-color: #ffffff;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1000;
}

h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
</style>
