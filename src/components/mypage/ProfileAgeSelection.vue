<template>
  <div class="selection-container">
    <BackArrow routeName="MyPage" />

    <div class="header">
      <h2 class="title">프로필 설정</h2>
      <p class="subtitle">나이를 알려주세요</p>
    </div>

    <div class="option-buttons">
      <button
        v-for="age in ageOptions"
        :key="age.label"
        :class="[
          'option-button',
          { selected: selectedAge?.value === age.value },
        ]"
        @click="selectAge(age)"
      >
        {{ age.label }}
      </button>
    </div>

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BackArrow from "@/components/common/BackArrow.vue";
const router = useRouter();

// 상태 관리
const selectedAge = ref(null);
const ageOptions = [
  { label: "10대 20대", value: "YOUNG_ADULT" },
  { label: "30대 40대", value: "MIDDLE_AGED" },
  { label: "50대 이상", value: "SENIOR" },
];

// 나이 선택
function selectAge(age) {
  selectedAge.value = age;
}

// 다음 단계로 이동
function goToNext() {
  if (selectedAge.value) {
    router.push({
      name: "ProfileGenderSelection",
      query: { ageGroup: selectedAge.value.value },
    });
  } else {
    alert("나이대를 선택해주세요.");
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
</style>
