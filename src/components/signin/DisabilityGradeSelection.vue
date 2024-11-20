<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">회원가입</h2>
      <p class="subtitle">등급을 알려주세요</p>
    </div>

    <div class="option-buttons">
      <button
        v-for="grade in grades"
        :key="grade.label"
        :class="['option-button', { selected: selectedGrade?.value === grade.value }]"
        @click="selectGrade(grade)"
      >
        {{ grade.label }}
      </button>
    </div>

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 상태 관리
const selectedGrade = ref(null);
const disabilityType = ref(null); // 쿼리 파라미터에서 설정
const generalLevelTypes = [
  { label: '1등급', value: 'LEVEL_1' },
  { label: '2등급', value: 'LEVEL_2' },
  { label: '3등급', value: 'LEVEL_3' },
  { label: '4등급', value: 'LEVEL_4' },
  { label: '5등급', value: 'LEVEL_5' },
  { label: '6등급', value: 'LEVEL_6' },
];
const spineLevelTypes = [
  { label: '불완전 마비', value: 'PARTIAL_PARALYSIS' },
  { label: '완전 마비', value: 'COMPLETE_PARALYSIS' },
];

// 등급 리스트 계산
const grades = computed(() => {
  console.log('Computed grades based on disabilityType:', disabilityType.value);
  return disabilityType.value === 'SPINAL' ? spineLevelTypes : generalLevelTypes;
});

// 쿼리에서 값 가져오기
onMounted(() => {
  disabilityType.value = route.query.disabilityType;
  console.log('Selected disability type in mounted:', disabilityType.value);
});

// 등급 선택
function selectGrade(grade) {
  selectedGrade.value = grade;
  console.log(grade);
}

// 다음 단계로 이동
function goToNext() {
  if (selectedGrade.value) {
    router.push({
      name: 'RegistrationInput',
      query: {
        ...route.query,
        disabilityLevel: selectedGrade.value.value,
      },
    });
  } else {
    alert('등급을 선택해주세요.');
  }
}
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
