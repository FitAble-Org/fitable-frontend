<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">{{ question }}</h2>
      <p class="subtitle">네/아니오로 응답해주세요</p>
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

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>

<script>

import apiClient from '@/axios/apiClient.js';
// axios.defaults.withCredentials = true; // 세션 유지 설정


export default {
  data() {
    return {
      selectedOption: null,
      responseOptions: [
        { label: '네', value: 1 },
        { label: '아니오', value: 0 },
      ],
      questions: [],
      exercises: [],
      index: 0,
      userResponses: [],
    };
  },
  computed: {
    question() {
      return this.questions[this.index] || '질문이 없습니다.';
    },
  },
  created() {
    this.loadDataFromQuery();
  },
  watch: {
    '$route.query.index': function(newIndex) {
      this.index = parseInt(newIndex || 0);
    }
  },
  methods: {
    loadDataFromQuery() {
      try {
        this.questions = JSON.parse(this.$route.query.questions || '[]');
        this.exercises = JSON.parse(this.$route.query.exercises || '[]');
        this.index = parseInt(this.$route.query.index || 0);
        this.userResponses = JSON.parse(this.$route.query.userResponses || '[]');
        console.log("Data loaded on created:", {
          questions: this.questions,
          exercises: this.exercises,
          index: this.index,
          userResponses: this.userResponses,
        });
      } catch (error) {
        console.error("Error parsing route query:", error);
      }
    },
    selectOption(idx) {
      this.selectedOption = idx;
      console.log("Option selected:", idx);
    },
    async goToNext() {
      if (this.selectedOption !== null) {
        this.userResponses.push(this.selectedOption);
        console.log("Updated userResponses:", this.userResponses);

        const nextIndex = this.index + 1;

        if (nextIndex < this.questions.length) {
          // 다음 질문으로 이동
          await this.$router.push({
            name: 'Question',
            query: {
              questions: JSON.stringify(this.questions),
              exercises: JSON.stringify(this.exercises),
              index: nextIndex.toString(),
              userResponses: JSON.stringify(this.userResponses),
            },
          });
          console.log("Navigated to next question:", nextIndex);
        } else {
          // 마지막 질문 후 추천 페이지로 이동
          await this.$router.push({
            name: 'RecommendedExercise',
            query: {
              exercises: JSON.stringify(this.exercises),
              userResponses: JSON.stringify(this.userResponses),
            },
          });
          console.log("Navigated to RecommendedExercise");
        }
      } else {
        alert('응답을 선택해주세요.');
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
