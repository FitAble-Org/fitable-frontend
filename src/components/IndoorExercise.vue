<!-- IndoorExercise.vue -->
<template>
    <div class="indoor-exercise-container">
      <div class="exercise-tabs">
        <button :class="{ active: selectedTab === '준비운동' }" @click="selectTab('준비운동')">준비운동</button>
        <button :class="{ active: selectedTab === '본운동' }" @click="selectTab('본운동')">본운동</button>
        <button :class="{ active: selectedTab === '마무리운동' }" @click="selectTab('마무리운동')">마무리운동</button>
      </div>
      <div class="exercise-list">
        <div v-for="(exercise, index) in filteredExercises" :key="index" class="exercise-item">
          <div class="exercise-name">{{ exercise.name }}</div>
          <div class="exercise-status">Processed</div>
          <div class="exercise-id">No. {{ exercise.id }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const exercises = ref([
    { id: 'F15306', name: '앉았다 일어서기', type: '준비운동' },
    { id: 'F15306', name: '요가', type: '준비운동' },
    { id: 'F15306', name: '윗몸 일으키기', type: '준비운동' },
  ]);
  
  const selectedTab = ref('준비운동');
  
  const selectTab = (tab) => {
    selectedTab.value = tab;
  };
  
  const filteredExercises = computed(() => {
    return exercises.value.filter(exercise => exercise.type === selectedTab.value);
  });
  </script>
  
  <style scoped>
  .indoor-exercise-container {
    max-width: 480px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    min-height: 100vh;
    box-sizing: border-box;
  }
  
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
    font-weight: bold;
    color: #333;
    margin: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }
  
  .exercise-tabs {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    background-color: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .exercise-tabs button {
    flex: 1;
    padding: 10px;
    border: none;
    background: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: #333;
  }
  
  .exercise-tabs .active {
    background-color: #4caf50;
    color: #ffffff;
  }
  
  .exercise-list {
    margin-top: 20px;
  }
  
  .exercise-item {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .exercise-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  
  .exercise-status {
    background-color: #ffe4b5;
    color: #ff8c00;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .exercise-id {
    font-size: 14px;
    color: #888;
  }
  </style>
  