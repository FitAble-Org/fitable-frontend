<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">회원가입</h2>
      <p class="subtitle">등급을 알려주세요</p>
    </div>

    <div class="option-buttons">
      <button
        v-for="grade in grades"
        :key="grade"
        :class="['option-button', { selected: selectedGrade === grade }]"
        @click="selectGrade(grade)"
      >
        {{ grade }}
      </button>
    </div>

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedGrade: null,
      disabilityType: null, // 쿼리 파라미터에서 값을 설정
    };
  },
  computed: {
    grades() {
      console.log("Computed grades based on disabilityType:", this.disabilityType);
      if (this.disabilityType === '척수장애') {
        return ['불완전 마비', '완전 마비'];
      } else {
        return ['1등급', '2등급', '3등급', '4등급', '5등급', '6등급'];
      }
    },
  },
  mounted() {
    // 쿼리에서 값 가져오기
    this.disabilityType = this.$route.query.disabilityType;
    console.log("Selected disability type in mounted:", this.disabilityType);
  },
  methods: {
    selectGrade(grade) {
      this.selectedGrade = grade;
    },
    goToNext() {
      if (this.selectedGrade) {
        // 'registration-input'으로 이동하면서 선택된 등급과 유형을 쿼리로 전달
        this.$router.push({
          name: 'RegistrationInput',
          query: {
            disabilityType: this.disabilityType,
            disabilityLevel: this.selectedGrade
          }
        });
      } else {
        alert('등급을 선택해주세요.');
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
