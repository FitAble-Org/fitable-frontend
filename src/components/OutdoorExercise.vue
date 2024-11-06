<template>
    <div class="outdoor-exercise-container">
      <button @click="navigateToFacilities" class="navigate-button">추천 시설 보기</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const navigateToFacilities = () => {
    router.push({ name: 'RecommendedFacilities' });
  };
  </script>
  
  <style scoped>
  .outdoor-exercise-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .navigate-button {
    background-color: #4caf50;
    color: #ffffff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  