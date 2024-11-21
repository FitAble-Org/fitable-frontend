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

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiClient from '@/axios/apiClient.js';

// 상태 관리
const selectedOption = ref(null);
const responseOptions = ref([
  { label: '네', value: 1 },
  { label: '아니오', value: 0 },
]);
const questions = ref([]);
const exercises = ref([]);
const index = ref(0);
const userResponses = ref([]);

// 라우터 관련 설정
const router = useRouter();
const route = useRoute();

// 현재 질문 가져오기
const question = computed(() => questions.value[index.value] || '질문이 없습니다.');

// 쿼리에서 데이터 로드
function loadDataFromQuery() {
  try {
    questions.value = JSON.parse(route.query.questions || '[]');
    exercises.value = JSON.parse(route.query.exercises || '[]');
    index.value = parseInt(route.query.index || 0);
    userResponses.value = JSON.parse(route.query.userResponses || '[]');
    console.log('Data loaded on created:', {
      questions: questions.value,
      exercises: exercises.value,
      index: index.value,
      userResponses: userResponses.value,
    });
  } catch (error) {
    console.error('Error parsing route query:', error);
  }
}

// 옵션 선택
function selectOption(idx) {
  selectedOption.value = idx;
  console.log('Option selected:', idx);
}

// 다음 질문으로 이동
async function goToNext() {
  if (selectedOption.value !== null) {
    userResponses.value.push(selectedOption.value);
    console.log('Updated userResponses:', userResponses.value);

    const nextIndex = index.value + 1;

    if (nextIndex < questions.value.length) {
      // 다음 질문으로 이동
      await router.push({
        name: 'Question',
        query: {
          questions: JSON.stringify(questions.value),
          exercises: JSON.stringify(exercises.value),
          index: nextIndex.toString(),
          userResponses: JSON.stringify(userResponses.value),
        },
      });
      console.log('Navigated to next question:', nextIndex);
    } else {
      // 마지막 질문 후 추천 페이지로 이동
      await router.push({
        name: 'RecommendedExercise',
        query: {
          exercises: JSON.stringify(exercises.value),
          userResponses: JSON.stringify(userResponses.value),
        },
      });
      console.log('Navigated to RecommendedExercise');
    }
  } else {
    alert('응답을 선택해주세요.');
  }
}

// 라우트 쿼리 변경 감지
watch(
  () => route.query.index,
  (newIndex) => {
    index.value = parseInt(newIndex || 0);
  }
);

// 컴포넌트가 로드될 때 데이터 초기화
onMounted(() => {
  loadDataFromQuery();
});
</script>

<style lang="scss">
@import "@/mixins/sharedStyles.scss";
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
  margin-top: 100px;
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

</style>
