<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">어느 정도 거리의 운동 시설을 찾기 원하시나요?</h2>
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
axios.defaults.withCredentials = true; // 세션 유지 설정
axios.defaults.baseURL = 'http://localhost:8080'; // 기본 URL 설정

export default {
  data() {
    return {
      selectedOption: null,
      distanceOptions: [
        { label: '도보 15분 이내', radiusKm: 1 },
        { label: '도보 50분 이내', radiusKm: 2 },
        { label: '대중교통 30분 이내', radiusKm: 3 },
      ],
      currentPosition: null, // 사용자 현재 위치
    };
  },
  mounted() {
    // 페이지 로드 시 사용자 위치 가져오기
    this.getUserLocation();
  },
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.currentPosition = {
              x: position.coords.longitude, // 경도
              y: position.coords.latitude,  // 위도
            };
          },
          (error) => {
            console.error("위치 정보를 가져오지 못했습니다:", error);
          }
        );
      } else {
        alert("위치 정보를 사용할 수 없는 브라우저입니다.");
      }
    },
    selectOption(index) {
      this.selectedOption = index;
    },
    goToNext() {
      if (this.selectedOption !== null && this.currentPosition) {
        const locationRequest = {
          x: this.currentPosition.x, // 사용자 위치의 경도
          y: this.currentPosition.y, // 사용자 위치의 위도
          radiusKm: this.distanceOptions[this.selectedOption].radiusKm,
        };

        axios.post('/api/facilities/nearby', locationRequest)
          .then(response => {
            const { itemNames, gptResponseContent } = response.data;

            // 질문과 운동 항목 전달
            this.$router.push({
              name: 'Question',
              query: {
                questions: JSON.stringify(gptResponseContent.split('\n').slice(0, 3)),
                exercises: JSON.stringify(itemNames), // itemNames 배열 전달
                index: 0, // 첫 번째 질문으로 시작
              },
            });
          })
          .catch(error => {
            console.error('API 요청 오류:', error);
          });
      } else if (!this.currentPosition) {
        alert("현재 위치 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("선호하는 거리를 선택해주세요.");
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
