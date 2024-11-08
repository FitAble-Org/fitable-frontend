<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">회원가입</h2>
      <p class="subtitle">성별을 알려주세요</p>
    </div>

    <div class="option-buttons">
      <button
        v-for="gender in genderOptions"
        :key="gender.label"
        :class="['option-button', { selected: selectedGender === gender.label }]"
        @click="selectGender(gender.label)"
      >
        {{ gender.label }}
      </button>
    </div>

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedGender: null,
      genderOptions: [
        { label: '여성' },
        { label: '남성' },
      ],
    };
  },
  methods: {
    selectGender(gender) {
      this.selectedGender = gender;
    },
    goToNext() {
      if (this.selectedGender) {
        this.$router.push({ name: 'DisabilityTypeSelection' });
      } else {
        alert('성별을 선택해주세요.');
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
  justify-content: space-between; /* 화면 내 균형 배치 */
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
