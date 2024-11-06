<template>
  <div class="indoor-exercise-container">
    <div class="exercise-tabs">
      <button :class="{ active: selectedTab === '준비운동' }" @click="selectTab('준비운동')">준비운동</button>
      <button :class="{ active: selectedTab === '본운동' }" @click="selectTab('본운동')">본운동</button>
      <button :class="{ active: selectedTab === '마무리운동' }" @click="selectTab('마무리운동')">마무리운동</button>
    </div>
    <div class="exercise-list">
      <div v-for="(exercise, index) in filteredExercises" :key="index" class="exercise-item">
        <div>
          <div class="exercise-name">{{ exercise.name }}</div>
          <div class="exercise-recommendation">추천도: {{ exercise.recommendation }}</div>
        </div>
        <button class="add-button">추가하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const exercises = ref([
  { name: '앉았다 일어서기', type: '준비운동', recommendation: '중' },
  { name: '요가', type: '준비운동', recommendation: '중' },
  { name: '윗몸 일으키기', type: '준비운동', recommendation: '중' },
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

.exercise-tabs {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.exercise-tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #ffffff;
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
  margin-top: 40px;
}

.exercise-item {
  background-color: #ffffff;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.exercise-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.exercise-recommendation {
  color: #888;
  font-size: 14px;
  margin-top: 4px;
}

.add-button {
  background-color: #EAFAEB; /* 더 연한 색상 */
  color: #4CAF50;
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 15px;
}
</style>
