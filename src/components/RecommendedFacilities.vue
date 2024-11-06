<template>
    <div class="map-view-container">
      <button class="back-button" @click="goBack">← 추천 시설 및 강좌</button>
      <div ref="map" class="map-container"></div>
      <div v-if="selectedLocation" class="location-info">
        <h2>{{ selectedLocation.title }}</h2>
        <p>{{ selectedLocation.address }}</p>
        <p>{{ selectedLocation.detail }}</p>
        <button class="navigate-button">길찾기</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const map = ref(null);
  const selectedLocation = ref(null);
  
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
    map.value = new kakao.maps.Map(map.value, {
      center: new kakao.maps.LatLng(37.5665, 126.9780), // 지도의 중심 좌표
      level: 3, // 지도 확대 레벨
    });
  
    // 마커 생성 및 클릭 이벤트 추가
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
    display: flex;
    align-items: center;
  }
  
  .map-container {
    width: 100%;
    height: 70%;
  }
  
  .location-info {
    background-color: #ffffff;
    padding: 20px;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px 10px 0 0;
  }
  
  .location-info h2 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
  
  .location-info p {
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
  }
  </style>
  