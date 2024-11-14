<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">프로필 설정</h2>
      <p class="subtitle">등급을 알려주세요</p>
    </div>

    <div class="option-buttons">
      <button
        v-for="grade in grades"
        :key="grade.label"
        :class="['option-button', { selected: selectedGrade === grade }]"
        @click="selectGrade(grade)"
      >
        {{ grade.label }}
      </button>
    </div>

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>

<script>
import apiClient from '@/axios/apiClient.js'

export default {
  data() {
    return {
      selectedGrade: null,
      disabilityType: null, // 쿼리 파라미터에서 값을 설정
      generalLevelTypes:[{ label: '1등급', value: "LEVEL_1" }, { label: '2등급', value: "LEVEL_2" },
          { label: '3등급', value: "LEVEL_3" }, { label: '4등급', value: "LEVEL_4" },
          { label: '5등급', value: "LEVEL_5" }, { label: '6등급', value: "LEVEL_6" }
      ],
      spineLevelTypes:[{label: '불완전 마비', value: "PARTIAL_PARALYSIS"}, {label: '완전 마비', value: "COMPLETE_PARALYSIS"}]

    };
  },
  computed: {
    grades() {
      console.log("Computed grades based on disabilityType:", this.disabilityType);
      if (this.disabilityType === 'SPINAL') {
        return this.spineLevelTypes;
      } else {
        return this.generalLevelTypes;
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
      console.log(grade);
    },
    async goToNext() {
      if (this.selectedGrade) {
        // 'registration-input'으로 이동하면서 선택된 등급과 유형을 쿼리로 전달
        console.log(this.$route.query);
          try {
           await apiClient.post('users/profile', {
             ...this.$route.query,
             disabilityLevel: this.selectedGrade.value
            })
            alert("프로필 변경 성공!");
          }
          catch(error) {
            console.error("변경 오류:", error);
          alert("회원가입 프로필 변경 중 오류가 발생했습니다.");
          }
        
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
  margin-bottom: 80px;
}

.next-button:hover {
  background-color: #45a049;
}
</style>
