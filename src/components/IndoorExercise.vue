<template>
  <div class="indoor-exercise-container">
    <div class="exercise-tabs">
      <button
        :class="{ active: selectedTab === '준비운동' }"
        @click="selectTab('준비운동')"
      >
        준비운동
      </button>
      <button
        :class="{ active: selectedTab === '본운동' }"
        @click="selectTab('본운동')"
      >
        본운동
      </button>
      <button
        :class="{ active: selectedTab === '마무리운동' }"
        @click="selectTab('마무리운동')"
      >
        마무리운동
      </button>
    </div>

<!-- Timeline -->
<Timeline :value="exerciseTypes" layout="horizontal" align="bottom" class="custom-timeline">
      <template #marker="slotProps">
        <span
          class="timeline-marker"
          :style="{
            borderColor: slotProps.item === selectedTab ? '#4caf50' : '#ccc',
          }"
        ></span>
      </template>

    </Timeline>

    <!-- Exercise List -->
    <div class="exercise-list">
      <div
        v-for="(exercise, index) in filteredExercises"
        :key="index"
        class="exercise-item"
        @click="showPopup(exercise)"
      >
        <div>
          <div class="exercise-name">{{ exercise.exerciseName }}</div>
          <div class="exercise-recommendation">추천도: {{ exercise.rankName }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Popup -->
  <Popup
    :isVisible="isPopupVisible"
    :exercise="selectedExercise"
    exerciseType="가정운동"
    @close="closePopup"
  />
</template>

<script setup>
import Timeline from 'primevue/timeline';

import { ref, computed, onMounted } from 'vue';
import Popup from '@/components/Popup.vue';
import appClient from '@/axios/apiClient.js';

const exercises = ref([]);
const selectedTab = ref('준비운동');
const isPopupVisible = ref(false);
const selectedExercise = ref(null);
const exerciseTypes = ref(['준비운동', '본운동', '마무리운동']);

onMounted(async () => {
  await fetchRecommendedTraining();
});

async function fetchRecommendedTraining() {
  try {
    const response = await appClient.get(`home-training`);
    exercises.value = response.data;
    console.log(exercises.value);
  } catch (error) {
    console.error('추천 가정운동 요청 중 오류 발생:', error);
  }
}

const selectTab = (tab) => {
  selectedTab.value = tab;
};

const filteredExercises = computed(() => {
  return exercises.value.filter(
    (exercise) => exercise.sportsStep === selectedTab.value
  );
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
  margin: 20px 0 0 0;
  /* background-color: #f5f5f5; */
  overflow: hidden;
}

.exercise-tabs button {
  flex: 1;
  border: none;
  background-color: #f5f5f5;
;
  font-size: 16px;
  cursor: pointer;
  color: #333;
}

.exercise-tabs .active {
  /* background-color: #4caf50; */
  color: #4caf50;
}

.custom-timeline {
  width: 70%;
  margin: auto;
}

.timeline-marker {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid; /* 기존 스타일 유지 */
  background-color: #ffffff;
  transition: border-color 0.3s ease;
}


::v-deep(.p-timeline-event-content) {
  padding: 0 !important;
  margin: 0 !important;
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
  margin-bottom: 10px;
  color: #333;
}

.exercise-recommendation {
  color: #888;
  font-size: 14px;
  margin-top: 4px;
}

.add-button {
  background-color: #EAFAEB;
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
