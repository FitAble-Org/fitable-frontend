<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">반경 몇 km 안쪽으로 시설을 검색할까요?</h2>
      <p class="subtitle">선호하는 이동 거리를 선택해주세요</p>
    </div>

    <div class="option-buttons">
      <button
        v-for="(option, index) in distanceOptions"
        :key="option.label"
        :class="['option-button', { selected: selectedOption === index }]"
        @click="selectOption(index)"
      >
        {{ option.label }}
      </button>
    </div>

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';

export default {
  data() {
    return {
      selectedOption: null,
      distanceOptions: [
        { label: '도보 15분 이내', radiusKm: 1 },
        { label: '도보 50분 이내', radiusKm: 2 },
        { label: '대중교통 30분 이내', radiusKm: 3 },
      ],
    };
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index;
    },
    goToNext() {
      if (this.selectedOption !== null) {
        const locationRequest = {
          x: 127.1234,
          y: 37.5678,
          radiusKm: this.distanceOptions[this.selectedOption].radiusKm,
        };

        axios.post('/api/facilities/nearby', locationRequest)
          .then(response => {
            const responseContent = response.data.gptResponseContent;
            
            // 질문과 운동 파트 분리
            const [questionsPart, exercisesPart] = responseContent.split('\n\n');
            const questions = questionsPart.split('\n').slice(0, 3); // 질문 배열
            const exercises = exercisesPart.split('/'); // 운동 배열

            // Question 페이지로 질문과 운동 항목 전달
            this.$router.push({
              name: 'Question',
              query: {
                questions: JSON.stringify(questions),
                exercises: JSON.stringify(exercises),
                index: 0, // 첫 번째 질문으로 시작
              },
            });
          })
          .catch(error => {
            console.error('API 요청 오류:', error);
          });
      } else {
        alert('선호하는 거리를 선택해주세요.');
      }
    },
  },
};
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
  margin-top: 50px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  color: #666666;
}

.option-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80%;
  max-width: 300px;
}

.option-button {
  padding: 15px;
  font-size: 18px;
  color: #333333;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.option-button.selected {
  background-color: #4CAF50;
  color: #ffffff;
}

.next-button {
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

.next-button:hover {
  background-color: #45a049;
}
</style>
