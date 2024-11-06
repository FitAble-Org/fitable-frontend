<!-- App.vue -->
<template>
  <div class="app-container">
    <Header />
    <router-view /> <!-- 라우터 경로에 따른 컴포넌트를 렌더링합니다 -->
    <BottomNav />
  </div>
</template>

<script setup>
import Header from './src/components/Header.vue';
import BottomNav from './src/components/BottomNav.vue';
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
