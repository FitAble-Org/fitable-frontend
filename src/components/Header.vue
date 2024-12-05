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
      return '운동 일정';
    case 'Club':
      return '동호회';
    case 'Community':
      return '게시판';
    case 'MyPage':
      return '내 정보';
  default:
      return 'Fitable';
  }
});
</script>

<style scoped>
.header-container {
  background-color: #ffffff;
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e2e2;
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  
  z-index: 1000;
}

h1 {
  font-style: normal;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
}
</style>
