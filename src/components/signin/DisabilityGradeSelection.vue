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

// 장애 유형별 범위
const disabilityRanges = {
  HEARING: [2, 6], // 2~6등급
  INTELLECTUAL: [1, 3], // 1~3등급
  VISION: [1, 6], // 1~6등급
};

const spineLevelTypes = [
  { label: '불완전 마비', value: 'PARTIAL_PARALYSIS' },
  { label: '완전 마비', value: 'COMPLETE_PARALYSIS' },
];


// 등급 리스트 계산
const grades = computed(() => {
  const type = disabilityType.value;
  console.log(type)

  if (!type || !disabilityRanges[type]) return spineLevelTypes;
  // 범위 가져오기
  const [start, end] = disabilityRanges[type];

  // 배열 자르기 (start-1: 0-based index)
  return generalLevelTypes.slice(start - 1, end);
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

<style lang="scss">
@use "@/mixins/sharedStyles.scss";
</style>

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
  margin-bottom: 30px;
}

.subtitle {
  font-size: 16px;
  color: #666666;
}


</style>
