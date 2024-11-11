<template>
  <div class="map-view-container">
    <button class="back-button" @click="goBack">← 추천 시설 및 강좌</button>
    <div ref="map" class="map-container"></div>
    <div v-if="selectedLocation" class="location-info">
      <h2 class="facility-name">{{ selectedLocation.fcltyNm }}</h2>
      <p class="facility-address">{{ selectedLocation.fcltyAddr }}</p>
      <p class="facility-detail">{{ selectedLocation.itemNm }}</p>
      <button class="navigate-button">길찾기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true; // 세션 유지 설정

export default {
  data() {
    return {
      facilities: [], // 시설 데이터를 저장할 배열
      selectedLocation: null,
      userPosition: null, // 사용자 현재 위치
      itemName: this.$route.query.itemName || '', // 전달된 itemName
    };
  },
  mounted() {
    this.getUserLocation();
  },
  methods: {
    // 사용자 위치를 가져와 지도의 초기 중심을 설정하고 시설 데이터를 로드
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            this.initializeMap();
            this.fetchFacilities();
          },
          (error) => {
            console.error("위치 정보를 가져오지 못했습니다:", error);
          }
        );
      } else {
        alert("위치 정보를 사용할 수 없는 브라우저입니다.");
      }
    },
    // 지도 초기화
    initializeMap() {
      const container = this.$refs.map;
      const options = {
        center: new kakao.maps.LatLng(
          this.userPosition.latitude,
          this.userPosition.longitude
        ),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    // itemName을 사용하여 백엔드에서 시설 데이터 가져오기
    fetchFacilities() {
    axios
      .get('/api/facilities/filter', {
        params: { itemName: this.itemName },
        withCredentials: true,
      })
      .then((response) => {
        this.facilities = response.data;
        this.addMarkers();
      })
      .catch((error) => {
        console.error("시설 데이터를 가져오는 데 실패했습니다:", error);
        alert("시설 데이터를 불러오는 데 문제가 발생했습니다. 다시 시도해주세요.");
      });
}
,
    // 지도에 마커 추가
    addMarkers() {
      this.facilities.forEach((facility) => {
        const markerPosition = new kakao.maps.LatLng(
          facility.fcltyYCrdntValue,
          facility.fcltyXCrdntValue
        );
        const marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(this.map);
        kakao.maps.event.addListener(marker, 'click', () => {
          this.selectedLocation = facility;
        });
      });
    },
    goBack() {
      this.$router.push({ name: 'RecommendedExercise' });
    },
  },
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
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;
  overflow-y: auto;
}
</style>
