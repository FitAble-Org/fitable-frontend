<template>
  <div class="map-view-container">
    <button class="back-button" @click="goBack">← 추천 시설 및 강좌</button>
    <div ref="map" class="map-container"></div>
    <div v-if="selectedLocation" class="location-info" :style="{ height: `${infoHeight}px` }">
      <div class="drag-handle" @mousedown="startDrag" @touchstart="startDrag"></div>
      <h2 class="facility-name">{{ selectedLocation.fcltyNm }}</h2>
      <div class="facility-details">
        <p class="facility-address">
          <i class="fas fa-map-marker-alt"></i> {{ selectedLocation.fcltyAddr }}
        </p>
        <p class="facility-detail">{{ selectedLocation.itemNm }}</p>
      </div>
      <button class="navigate-button">길찾기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const map = ref(null);
const selectedLocation = ref(null);
const infoHeight = ref(300);
const MIN_HEIGHT = 250;

let isDragging = false;

// 시설 정보 받기
const facilities = JSON.parse(route.query.facilities || '[]');

// 뒤로가기 버튼 기능
const goBack = () => {
  router.push({ name: 'RecommendedExercise' });
};

// 지도 초기화 및 시설 마커 표시
onMounted(() => {
  // 사용자의 현재 위치 요청 및 지도 초기화
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const centerPosition = new kakao.maps.LatLng(userLat, userLng);

        // 지도 초기화
        map.value = new kakao.maps.Map(map.value, {
          center: centerPosition,
          level: 3,
        });

        // 현재 위치 마커 추가
        const userMarker = new kakao.maps.Marker({
          position: centerPosition,
          title: '현재 위치',
        });
        userMarker.setMap(map.value);

        // 시설 데이터에서 각 위치에 마커 추가
        facilities.forEach((facility) => {
          const markerPosition = new kakao.maps.LatLng(facility.fcltyYCrdntValue, facility.fcltyXCrdntValue);
          const marker = new kakao.maps.Marker({ position: markerPosition });

          marker.setMap(map.value);
          kakao.maps.event.addListener(marker, 'click', () => {
            selectedLocation.value = facility;
          });
        });
      },
      (error) => {
        console.error("현재 위치를 불러올 수 없습니다.", error);
      }
    );
  } else {
    console.error("위치 정보가 지원되지 않는 브라우저입니다.");
  }
});

// 드래그 시작
const startDrag = (event) => {
  isDragging = true;
  event.preventDefault();
  document.addEventListener('mousemove', onDrag, { passive: false });
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('touchend', stopDrag);
};

// 드래그 중
const onDrag = (event) => {
  if (isDragging) {
    const clientY = event.clientY || (event.touches && event.touches[0].clientY);
    if (clientY) {
      const newHeight = window.innerHeight - clientY;
      infoHeight.value = Math.max(newHeight, MIN_HEIGHT);
    }
  }
};

// 드래그 종료
const stopDrag = () => {
  isDragging = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', stopDrag);
};
</script>

<style scoped>
.map-view-container {
  position: relative;
  width: 100%;
  height: 100vh;
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
  padding: 0 20px 20px 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;
  z-index: 1000;
  overflow-y: auto;
  max-height: 80vh;
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

.facility-address, .facility-detail {
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
  top: 45px;
  right: 20px;
}

.drag-handle {
  width: 100%;
  text-align: center;
  height: 45px;
  border-radius: 10px;
  cursor: ns-resize;
  margin: auto;
}
</style>
