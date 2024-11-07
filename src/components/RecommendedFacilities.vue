<template>
    <div class="map-view-container">
      <button class="back-button" @click="goBack">← 추천 시설 및 강좌</button>
      <div ref="map" class="map-container"></div>
      <div v-if="selectedLocation" class="location-info" :style="{ height: `${infoHeight}px` }">
        <div class="drag-handle" @pointerdown="startDrag"></div>
        <h2 class="facility-name">{{ selectedLocation.title }}</h2>
        <div class="facility-details">
          <p class="facility-address">
            <i class="fas fa-map-marker-alt"></i> {{ selectedLocation.address }}
          </p>
          <p class="facility-detail">{{ selectedLocation.detail }}</p>
        </div>
        <button class="navigate-button">길찾기</button>
        <div class="lecture-info">
          <p class="lecture-title">탁구 강좌</p>
          <p class="lecture-time">화, 10 ~ 11시</p>
          <button class="add-button">추가하기</button>
        </div>
        <div class="lecture-info">
          <p class="lecture-title">탁구 강좌</p>
          <p class="lecture-time">화, 10 ~ 11시</p>
          <button class="add-button">추가하기</button>
        </div>
        <div class="lecture-info">
          <p class="lecture-title">탁구 강좌</p>
          <p class="lecture-time">화, 10 ~ 11시</p>
          <button class="add-button">추가하기</button>
        </div>
        <div class="lecture-info">
          <p class="lecture-title">탁구 강좌</p>
          <p class="lecture-time">화, 10 ~ 11시</p>
          <button class="add-button">추가하기</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const map = ref(null);
  const selectedLocation = ref(null);

  const infoHeight = ref(300); // 기본 높이 설정
  const MIN_HEIGHT = 250; // 최소 높이 설정

  let isDragging = false;


  // 드래그 시작 함수
  const startDrag = (event) => {
    isDragging = true;
    event.preventDefault(); // 기본 동작 방지 (모바일 스크롤)
    // 터치와 마우스 이벤트 모두 등록, passive: false로 스크롤 방지
    document.addEventListener('pointermove', onDrag, { passive: false });
    document.addEventListener('pointerup', stopDrag);
  };

// 드래그 중 함수
  const onDrag = (event) => {
    if (isDragging) {
      // 터치 이벤트와 마우스 이벤트의 clientY 값을 얻음
      const clientY = event.clientY || (event.touches && event.touches[0].clientY);
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
    document.removeEventListener('pointermove', onDrag);
    document.removeEventListener('pointerup', stopDrag);
  };
  // 표시할 위치 목록
  const locations = [
    {
      title: '머신 헬스트레이닝',
      address: '서울특별시 강남구 도봉동',
      detail: '4층 한숲 스포츠센터',
      lat: 37.5665,
      lng: 126.9780,
    },
    {
      title: '탁구 강좌',
      address: '서울특별시 강남구 강좌동',
      detail: '화, 10 ~ 11시',
      lat: 37.5655,
      lng: 126.9769,
    },
  ];
  
  // 뒤로가기 동작
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push({ name: 'OutdoorExercise' });
    }
  };
  
  onMounted(() => {
    // 지도 초기화
    const container = map.value;
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 3,
    };
    map.value = new kakao.maps.Map(container, options);
  
    // 현재 위치 표시
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const currentPosition = new kakao.maps.LatLng(lat, lng);
  
        // 파란색 동그라미 현재 위치 마커 이미지 설정
        const imageSrc = 'https://img.icons8.com/emoji/48/000000/blue-circle-emoji.png'; // 파란색 동그라미 마커 이미지
        const imageSize = new kakao.maps.Size(24, 24); // 이미지 크기
        const imageOption = { offset: new kakao.maps.Point(12, 12) }; // 마커 중심 조정
  
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        const marker = new kakao.maps.Marker({
          position: currentPosition,
          image: markerImage, // 커스텀 마커 이미지 설정
        });
  
        marker.setMap(map.value);
        map.value.setCenter(currentPosition);
      });
    }
  
    // 위치 목록에 대한 마커 생성 및 클릭 이벤트 추가
    locations.forEach((location) => {
      const markerPosition = new kakao.maps.LatLng(location.lat, location.lng);
      const marker = new kakao.maps.Marker({ position: markerPosition });
  
      marker.setMap(map.value);
  
      kakao.maps.event.addListener(marker, 'click', () => {
        selectedLocation.value = location;
      });
    });
  });
  </script>
  
  <style scoped>
  .map-view-container {
    position: relative;
    width: 100%;
    /* 전체 높이를 화면에 맞춤 */
    /* height: 100%;  */

    height: 100vh;
    /* overflow: hidden; */
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
    overflow-y: auto; /* 세로 스크롤 활성화 */
    max-height: 80vh; /* 최대 높이를 제한하여 줄어들 때 스크롤 필요 */
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
    top: 35px;
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
  width: 50%;
  text-align: center;
  height: 5px;
  border-radius: 10px;
  cursor: ns-resize;
  background-color: #e9e9e9;
  margin: auto;
  margin-bottom: 10px;
  }
  </style>
  