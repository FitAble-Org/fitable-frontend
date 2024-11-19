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
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.fitable.kro.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios 요청 인터셉터 설정
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Authorization 헤더 추가
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Axios 응답 인터셉터 설정 (토큰 만료 시 처리)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshResponse = await axios.post(
          "https://api.fitable.kro.kr/api/users/refresh",
          { refreshToken: localStorage.getItem("refreshToken") }
        );
        const newAccessToken = refreshResponse.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // 이전 요청 재시도
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error("리프레시 토큰 갱신 실패:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

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
