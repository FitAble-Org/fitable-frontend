<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">회원가입</h2>
      <p class="subtitle">유형을 알려주세요</p>
    </div>

    <div class="option-buttons">
      <button
        v-for="type in disabilityTypes"
        :key="type.label"
        :class="['option-button', { selected: selectedType === type.label }]"
        @click="selectType(type.label)"
      >
        {{ type.label }}
      </button>
    </div>

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedType: null,
      disabilityTypes: [
        { label: '지적장애', value: 'INTELLECTUAL' },
        { label: '청각장애', value: 'HEARING' },
        { label: '시각장애', value: 'VISION' },
        { label: '척수장애', value: 'SPINAL' },
      ],
    };
  },
  methods: {
    selectType(type) {
      this.selectedType = type;
    },
    goToNext() {
      if (this.selectedType) {
        this.$router.push({
          name: 'DisabilityGradeSelection',
          query: { disabilityType: this.selectedType }
        });
      } else {
        alert('유형을 선택해주세요.');
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
  width: 100%;
  max-width: 300px;
}

.option-button {
  width: 100%;
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
