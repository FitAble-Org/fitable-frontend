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
        :class="['option-button', { selected: selectedType?.value === type.value }]"
        @click="selectType(type)"
      >
        {{ type.label }}
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
const selectedType = ref(null);
const disabilityTypes = [
  { label: '지적장애', value: 'INTELLECTUAL' },
  { label: '청각장애', value: 'HEARING' },
  { label: '시각장애', value: 'VISION' },
  { label: '척수장애', value: 'SPINAL' },
];

// 장애 유형 선택
function selectType(type) {
  selectedType.value = type;
  console.log(selectedType.value);
}

// 다음 단계로 이동
function goToNext() {
  console.log(route.query);
  if (selectedType.value) {
    router.push({
      name: 'DisabilityGradeSelection',
      query: {
        ...route.query,
        disabilityType: selectedType.value.value,
      },
    });
  } else {
    alert('유형을 선택해주세요.');
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

</style>
