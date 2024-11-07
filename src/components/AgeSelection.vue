<template>
  <div class="age-selection-container">
    <h2 class="title">회원가입</h2>
    <p class="subtitle">나이를 알려주세요</p>

    <div class="age-options">
      <button class="age-button" :class="{ selected: selectedAge === '10대' }" @click="selectAge('10대')">10대</button>
      <button class="age-button" :class="{ selected: selectedAge === '20~30대' }" @click="selectAge('20~30대')">2 ~ 30대</button>
      <button class="age-button" :class="{ selected: selectedAge === '40~50대' }" @click="selectAge('40~50대')">4 ~ 50대</button>
      <button class="age-button" :class="{ selected: selectedAge === '60대 이상' }" @click="selectAge('60대 이상')">60대 이상</button>
    </div>

    <button class="next-button" @click="navigateToGenderSelection">다음</button>
  </div>
</template>

<script>
export default {
  name: 'AgeSelection',
  data() {
    return {
      selectedAge: null,
    };
  },
  methods: {
    selectAge(age) {
      this.selectedAge = age;
    },
    navigateToGenderSelection() {
      if (this.selectedAge) {
        this.$router.push({ name: 'GenderSelection' });
      } else {
        alert("나이대를 선택해주세요.");
      }
    },
  },
};
</script>

<style scoped>
.age-selection-container {
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

.age-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px;
}

.age-button {
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

.age-button.selected {
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
