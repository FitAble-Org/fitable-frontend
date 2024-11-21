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
        :class="['option-button', { selected: selectedGender?.value === gender.value }]"
        @click="selectGender(gender)"
      >
        {{ gender.label }}
      </button>
    </div>

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 상태 관리
const selectedGender = ref(null);
const genderOptions = [
  { label: '여성', value: 'FEMALE' },
  { label: '남성', value: 'MALE' },
];

// 성별 선택
function selectGender(gender) {
  selectedGender.value = gender;
  console.log(selectedGender.value.value)
}

// 다음 단계로 이동
function goToNext() {
  console.log(route.query);
  if (selectedGender.value) {
    router.push({
      name: 'DisabilityTypeSelection',
      query: {
        ...route.query,
        gender: selectedGender.value.value,
      },
    });
  } else {
    alert('성별을 선택해주세요.');
  }
}
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
  justify-content: space-between; /* 화면 내 균형 배치 */
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
