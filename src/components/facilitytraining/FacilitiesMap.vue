<template>
  <div class="map-view-container">
    <div class="map-header">
      <button class="back-button" @click="goBack">← 추천 시설 및 강좌</button>
    </div>
    <div ref="map" class="map-container"></div>
    <div
      v-if="selectedLocation"
      class="location-info"
      :style="{ height: `${infoHeight}px` }"
    >
      <div
        class="drag-handle"
        @mousedown="startDrag"
        @touchstart="startDrag"
      ></div>
      <h2 class="facility-name">{{ selectedLocation.fcltyNm }}</h2>
      <div class="facility-details">
        <p class="facility-address">
          <i class="fas fa-map-marker-alt"></i> {{ selectedLocation.fcltyAddr }}
        </p>
        <p class="facility-detail">{{ selectedLocation.itemNm }}</p>
      </div>
      <button class="navigate-button">길찾기</button>
      <div class="lecture-info">
        <p class="lecture-title">
          {{ selectedLocation.fcltyCourseSdivNm || "강좌 정보 없음" }}
        </p>
        <p class="lecture-time">운영 시간: 09:00 ~ 18:00</p>
        <!-- 예시 시간 -->
        <button class="add-button" @click="showPopup(selectedLocation)">
          추가하기
        </button>
      </div>
    </div>
  </div>
  <Popup
    :isVisible="isPopupVisible"
    :exercise="selectedExercise"
    exerciseType="외부운동"
    @close="closePopup"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import apiClient from "@/axios/apiClient.js";
import Popup from "@/components/Popup.vue";

const router = useRouter();
const route = useRoute();
const map = ref(null);
const selectedLocation = ref(null);
const facilities = ref([]);

const isPopupVisible = ref(false);
const selectedExercise = ref(null);

// 이전 페이지에서 전달된 itemName 값 사용
const itemName = route.query.itemName || "";

const infoHeight = ref(300); // 기본 높이 설정
const MIN_HEIGHT = 250; // 최소 높이 설정
let isDragging = false;

// 뒤로가기 동작
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    router.push({ name: "OutdoorExercise" });
  }
};

// 현재 위치 마커 추가 및 지도 중심 설정
const initializeMap = (facilityLocations, centerLat, centerLng) => {
  const container = map.value;
  const options = {
    center: new kakao.maps.LatLng(centerLat, centerLng), // 사용자 현재 위치를 초기 중심으로 설정
    level: 5,
  };
  map.value = new kakao.maps.Map(container, options);

  // 사용자 위치 마커 (파란색 원형 마커)
  const currentPosition = new kakao.maps.LatLng(centerLat, centerLng);
  const imageSrc =
    "https://img.icons8.com/emoji/48/000000/blue-circle-emoji.png"; // 파란색 원형 아이콘 이미지 URL
  const imageSize = new kakao.maps.Size(24, 24); // 크기
  const imageOption = { offset: new kakao.maps.Point(12, 12) }; // 오프셋 (중심 조정)

  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  const currentMarker = new kakao.maps.Marker({
    position: currentPosition,
    image: markerImage, // 커스텀 이미지 적용
  });
  currentMarker.setMap(map.value); // 마커 지도에 표시

  // 시설 위치 마커 추가
  facilityLocations.forEach((facility) => {
    const markerPosition = new kakao.maps.LatLng(
      facility.fcltyYCrdntValue,
      facility.fcltyXCrdntValue
    );
    const marker = new kakao.maps.Marker({ position: markerPosition });

    marker.setMap(map.value);

    // 마커 클릭 이벤트
    kakao.maps.event.addListener(marker, "click", () => {
      selectedLocation.value = {
        exerciseId: facility.id,
        fcltyNm: facility.fcltyNm,
        fcltyAddr: facility.fcltyAddr,
        itemNm: facility.itemNm,
        fcltyCourseSdivNm: facility.fcltyCourseSdivNm,
      }; // 선택된 시설 정보 업데이트
    });
  });
};

// 시설 데이터 가져오기
const fetchFacilities = async (lat, lng) => {
  try {
    const response = await apiClient.get("facilities/filter", {
      params: { itemName, latitude: lat, longitude: lng }, // itemName과 현재 위치를 사용하여 요청
    });
    facilities.value = response.data;
    console.log("Fetched facilities:", facilities.value); // 응답값을 로그로 남김
    initializeMap(facilities.value, lat, lng); // 지도 초기화 및 마커 추가
  } catch (error) {
    console.error("시설 데이터를 가져오는 데 실패했습니다:", error);
    alert("시설 데이터를 불러오는 데 문제가 발생했습니다.");
  }
};

onMounted(() => {
  // 사용자 현재 위치 가져오기
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        fetchFacilities(lat, lng); // 현재 위치를 기반으로 시설 요청 및 지도 초기화
      },
      (error) => {
        console.error("위치 정보를 가져오지 못했습니다:", error);
      }
    );
  } else {
    alert("위치 정보를 사용할 수 없는 브라우저입니다.");
  }
});

function showPopup(exercise) {
  selectedExercise.value = exercise;
  isPopupVisible.value = true;
}

function closePopup() {
  isPopupVisible.value = false;
  selectedExercise.value = null;
}

// 드래그 시작 함수
const startDrag = (event) => {
  isDragging = true;
  event.preventDefault(); // 기본 동작 방지 (모바일 스크롤)
  // 터치와 마우스 이벤트 모두 등록, passive: false로 스크롤 방지
  document.addEventListener("mousemove", onDrag, { passive: false });
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchmove", onDrag, { passive: false });
  document.addEventListener("touchend", stopDrag);
};

// 드래그 중 함수
const onDrag = (event) => {
  if (isDragging) {
    // 터치 이벤트와 마우스 이벤트의 clientY 값을 얻음
    const clientY =
      event.clientY || (event.touches && event.touches[0].clientY);
    if (clientY) {
      const newHeight = window.innerHeight - clientY;
      infoHeight.value = Math.max(newHeight, MIN_HEIGHT); // 최소 높이를 MIN_HEIGHT로 제한
    }
  }
};

// 드래그 종료 함수
const stopDrag = () => {
  isDragging = false;
  // 모든 이벤트 제거
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchmove", onDrag);
  document.removeEventListener("touchend", stopDrag);
};
</script>

<style scoped>
.map-view-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.map-header {
  position: absolute;
  z-index: 1000;
  height: 100px;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8) 40%,
    rgba(255, 255, 255, 0) 80%
  );
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 1000;
}

.map-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.location-info {
  background-color: #ffffff;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;
  z-index: 1000;
}

.facility-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px;
}

.facility-details {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.facility-address,
.facility-detail {
  color: #777;
  font-size: 14px;
  margin: 5px 0;
}

.navigate-button {
  background-color: #e6f4ff;
  color: #0099ff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  top: 50px;
  right: 20px;
}

.lecture-info {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 10px;
  position: relative;
}

.lecture-title {
  color: #333;
  font-size: 16px;
  margin: 5px 0;
}

.lecture-time {
  color: #777;
  font-size: 14px;
}

.add-button {
  background-color: #e0f7e9;
  color: #00c853;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  top: 10px;
  right: 0;
}

.drag-handle {
  width: 100%;
  text-align: center;
  height: 35px;
  border-radius: 10px;
  cursor: ns-resize;
  /* background-color: #e9e9e9; */
  margin: auto;
}
</style>
