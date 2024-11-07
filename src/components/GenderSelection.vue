<template>
  <div class="gender-selection-container">
    <h2 class="title">회원가입</h2>
    <p class="subtitle">성별을 알려주세요</p>

    <div class="gender-options">
      <button class="gender-button" :class="{ selected: selectedGender === '여성' }" @click="selectGender('여성')">여성</button>
      <button class="gender-button" :class="{ selected: selectedGender === '남성' }" @click="selectGender('남성')">남성</button>
    </div>

    <button class="next-button" @click="goToNextStep">다음</button>
  </div>
</template>

<script>
export default {
  name: 'GenderSelection',
  data() {
    return {
      selectedGender: null,
    };
  },
  methods: {
    selectGender(gender) {
      this.selectedGender = gender;
    },
    goToNextStep() {
      if (this.selectedGender) {
        alert(`선택한 성별: ${this.selectedGender}`);
        // 다음 단계로 이동하는 로직 추가
      } else {
        alert("성별을 선택해주세요.");
      }
    },
  },
};
</script>

<style scoped>
.gender-selection-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  height: 100vh;
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
  margin-bottom: 40px;
}

.gender-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px;
}

.gender-button {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  color: #333333;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.gender-button.selected {
  background-color: #4CAF50;
  color: #ffffff;
}

.next-button {
  width: 80%;
  max-width: 300px;
  padding: 12px;
  font-size: 18px;
  color: #ffffff;
  background-color: #4CAF50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
}

.next-button:hover {
  background-color: #45a049;
}
</style>
