<template>
  <div class="selection-container">
    <div class="header">
      <h2 class="title">어느 정도 거리의 운동<br /> 시설을 원하시나요?</h2>
      <p class="subtitle">스포츠강좌이용권 시설, 강좌를 추천해 드립니다.</p>
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

    <!-- 로딩 오버레이 -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-spinner"></div>
      <p>GPT가 질문 목록을 고민하는 중...</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import apiClient from "@/axios/apiClient.js";

export default {
  setup() {
    const selectedOption = ref(null);
    const isLoading = ref(false); // 로딩 상태 관리
    const distanceOptions = reactive([
      { label: "도보 30분 이내", radiusKm: 1.7 },
      { label: "도보 50분 이내", radiusKm: 2.2 },
      { label: "대중교통 30분 이내", radiusKm: 3.2 },
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

        isLoading.value = true; // 로딩 시작
        try {
          const response = await apiClient.post(
            "facilities/nearby",
            locationRequest
          );
          navigateToQuestion(response.data);
        } catch (error) {
          console.error("API 요청 오류:", error);
          alert("시설 정보를 가져오는 데 문제가 발생했습니다.");
        } finally {
          isLoading.value = false; // 로딩 종료
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
      isLoading, // 로딩 상태 반환
    };
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
  margin-top: 100px;
}

.title {
  font-size: 26px;
  color: #333333;
  margin-bottom: 40px;
}

.subtitle {
  font-size: 16px;
  color: #666666;
}

/* 로딩 오버레이 스타일 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  z-index: 1000;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
