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
          <div class="exercise-name">{{ exercise.exerciseName }}</div>
          <div class="exercise-recommendation">추천도: {{ exercise.rankName }}</div>
        </div>
        <button class="add-button" @click="showPopup(exercise)">추가하기</button>
      </div>
    </div>
  </div>

  <Popup :isVisible="isPopupVisible" :exercise="selectedExercise" exerciseType="가정운동" @close="closePopup" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Popup from '@/components/Popup.vue';
import appClient from '@/axios/apiClient.js';

const exercises = ref([]);
const selectedTab = ref('준비운동');
const isPopupVisible = ref(false);
const selectedExercise = ref(null);


onMounted(async () => {
await fetchRecommendedTraining();
});

async function fetchRecommendedTraining() {
try {
  const response = await appClient.get(`home-training`); // API 엔드포인트에 맞게 수정
  exercises.value = response.data;
} catch (error) {
  console.error('추천 가정운동 요청 중 오류 발생:', error);
}
}

const selectTab = (tab) => {
  selectedTab.value = tab;
};

const filteredExercises = computed(() => {
  return exercises.value.filter(exercise => exercise.sportsStep === selectedTab.value);
});

function showPopup(exercise) {
  selectedExercise.value = exercise;
  isPopupVisible.value = true;
}

function closePopup() {
  isPopupVisible.value = false;
  selectedExercise.value = null;
}
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
/*
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  width: 80%;
  max-width: 300px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.popup p {
  margin: 0;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

.confirm-button {
  margin-top: 16px;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
} 
*/
</style>
