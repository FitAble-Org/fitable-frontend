<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">추천 운동 결과</h2>
      <p class="subtitle">아래 운동이 당신에게 추천됩니다:</p>
    </div>

    <div class="result">
      <p>{{ recommendedExercise }}</p>
    </div>

    <div class="option-buttons">
      <button
        v-for="(option, idx) in responseOptions"
        :key="option.label"
        :class="['option-button', { selected: selectedOption === idx }]"
        @click="selectOption(idx)"
      >
        {{ option.label }}
      </button>
    </div>

    <button class="next-button" @click="goToMap">지도 보기</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 상태 관리
const recommendedExercise = ref('');
const exercises = ref(JSON.parse(route.query.exercises || '[]'));
const userResponses = ref(JSON.parse(route.query.userResponses || '[]'));

// 추천 운동 계산
function calculateRecommendedExercise() {
  if (!exercises.value.length || !userResponses.value.length) {
    recommendedExercise.value = '추천 결과가 없습니다.';
    return;
  }
  const binaryResponse = userResponses.value.join('');
  const index = parseInt(binaryResponse, 2);
  recommendedExercise.value = exercises.value[index] || '추천 운동 없음';
}

// 지도 페이지로 이동
function goToMap() {
  router.push({
    name: 'FacilitiesMap',
    query: {
      recommendedExercise: recommendedExercise.value, // 추천 운동명 전달
      itemName: recommendedExercise.value, // itemName을 추가로 전달
    },
  });
}

// 컴포넌트가 로드되면 추천 운동 계산
onMounted(() => {
  calculateRecommendedExercise();
});
</script>


<style scoped>
.selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  height: 100vh;
  background-color: #ffffff;
  box-sizing: border-box;
  justify-content: space-between;
}

.header {
  margin-top: 100px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 30px;
}

.subtitle {
  font-size: 16px;
  color: #666666;
}

.result {
  font-size: 20px;
  font-weight: bold;
  color: #4CAF50;
  margin: 20px 0;
}

.map-button { /* 지도 보기 버튼 스타일 */
  width: 80%;
  max-width: 300px;
  padding: 15px;
  font-size: 18px;
  color: #ffffff;
  background-color: #4CAF50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 50px;
}

.map-button:hover {
  background-color: #45a049;
}
</style>
