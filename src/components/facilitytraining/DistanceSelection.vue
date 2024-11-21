<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">어느 정도 거리의 운동 시설을 찾기 원하시나요?</h2>
      <p class="subtitle">선호하는 이동 거리를 선택해주세요</p>
    </div>

    <div class="option-buttons">
      <button
        v-for="(option, index) in distanceOptions"
        :key="option.label"
        :class="['option-button', { selected: selectedOption === index }]"
        @click="selectOption(index)"
      >
        {{ option.label }}
      </button>
    </div>

    <button class="next-button" @click="goToNext">다음</button>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import apiClient from '@/axios/apiClient.js';


export default {
  setup() {
    const selectedOption = ref(null);
    const distanceOptions = reactive([
      { label: "도보 15분 이내", radiusKm: 1 },
      { label: "도보 50분 이내", radiusKm: 2 },
      { label: "대중교통 30분 이내", radiusKm: 3 },
    ]);
    const currentPosition = ref(null);
    const router = useRouter();

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            currentPosition.value = {
              x: position.coords.longitude,
              y: position.coords.latitude,
            };
          },
          (error) => {
            console.error("위치 정보를 가져오지 못했습니다:", error);
          }
        );
      } else {
        alert("위치 정보를 사용할 수 없는 브라우저입니다.");
      }
    };

    const selectOption = (index) => {
      selectedOption.value = index;
    };

    const navigateToQuestion = (data) => {
      const { itemNames, gptResponseContent } = data;
      router.push({
        name: "Question",
        query: {
          questions: JSON.stringify(gptResponseContent.split("\n").slice(0, 3)),
          exercises: JSON.stringify(itemNames),
          index: 0,
        },
      });
    };

    const goToNext = async () => {
      if (selectedOption.value !== null && currentPosition.value) {
        const locationRequest = {
          x: currentPosition.value.x,
          y: currentPosition.value.y,
          radiusKm: distanceOptions[selectedOption.value].radiusKm,
        };

        try {
          const response = await apiClient.post("facilities/nearby", locationRequest);
          navigateToQuestion(response.data);
        } catch (error) {
          console.error("API 요청 오류:", error);
          alert("시설 정보를 가져오는 데 문제가 발생했습니다.");
        }
      } else if (!currentPosition.value) {
        alert("현재 위치 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("선호하는 거리를 선택해주세요.");
      }
    };

    onMounted(() => {
      getUserLocation();
    });

    return {
      selectedOption,
      distanceOptions,
      currentPosition,
      selectOption,
      goToNext,
    };
  },
};
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
  margin-top: 100px;
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
