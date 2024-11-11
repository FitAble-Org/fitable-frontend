<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">추천 운동 결과</h2>
      <p class="subtitle">아래 운동이 당신에게 추천됩니다:</p>
    </div>

    <div class="result">
      <p>{{ recommendedExercise }}</p>
    </div>

    <button class="map-button" @click="goToMap">지도 보기</button> <!-- 지도 보기 버튼 추가 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendedExercise: '',
      exercises: JSON.parse(this.$route.query.exercises || '[]'),
      userResponses: JSON.parse(this.$route.query.userResponses || '[]'),
    };
  },
  created() {
    this.calculateRecommendedExercise();
  },
  methods: {
    calculateRecommendedExercise() {
      if (!this.exercises.length || !this.userResponses.length) {
        this.recommendedExercise = '추천 결과가 없습니다.';
        return;
      }
      const binaryResponse = this.userResponses.join('');
      const index = parseInt(binaryResponse, 2);
      this.recommendedExercise = this.exercises[index] || '추천 운동 없음';
    },
    goToMap() {
    this.$router.push({
      name: 'FacilitiesMap',
      query: {
        recommendedExercise: this.recommendedExercise, // 추천 운동명 전달
        itemName: this.recommendedExercise, // itemName을 추가로 전달
      },
    });
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
