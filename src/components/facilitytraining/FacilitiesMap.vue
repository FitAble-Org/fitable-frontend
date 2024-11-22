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
      <div class="content-container">

        <div class="facility-info">

          <h2 class="facility-name">{{ selectedLocation.fcltyNm }}</h2>
          <div class="facility-details">
            <p class="facility-address">
              <i class="fas fa-map-marker-alt"></i> {{ selectedLocation.fcltyAddr }}
            </p>
            <p class="facility-detail">{{ selectedLocation.itemNm }}</p>
          </div>
          <button class="navigate-button" @click="navigateToFacility">
            길찾기
          </button>


        </div>
      
      <div class="lecture-info">
        <p class="lecture-title">
          {{ selectedLocation.fcltyCourseSdivNm || "강좌 정보 없음" }}
        </p>
        <p class="lecture-time">운영 시간: 09:00 ~ 18:00</p>
        <button class="add-button" @click="showPopup(selectedLocation)">
          추가하기
        </button>
      </div>

      <!-- 블로그 리뷰 섹션 -->
      <div v-if="blogReviews.length" class="blog-info">
        <h2 class="blog-review">블로그 리뷰 {{ blogReviews.length }}</h2>
        <ul class="review-list">
          <li
            v-for="review in blogReviews"
            :key="review.link"
            class="review-item"
            @click="openBlogLink(review.link)"
          >
            <img
              src="https://via.placeholder.com/80"
              alt="블로그 썸네일"
              class="review-thumbnail"
            />
            <div class="review-content">
              <!-- sanitizeText 함수로 HTML 태그 제거 후 표시 -->
              <p class="review-title">{{ sanitizeText(review.title) }}</p>
              <p class="review-description">{{ sanitizeText(review.description) }}</p>
              <p class="review-blogger">
                작성자: {{ sanitizeText(review.bloggername) }} | 작성일: {{ formatDate(review.postdate) }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      </div>
    </div>
    <AddToCalendarPopup
      :isVisible="isPopupVisible"
      :exercise="selectedExercise"
      exerciseType="외부운동"
      @close="closePopup"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import apiClient from "@/axios/apiClient.js";
import AddToCalendarPopup from "@/components/popup/AddToCalendarPopup.vue";

const router = useRouter();
const route = useRoute();
const map = ref(null);
const selectedLocation = ref(null);
const facilities = ref([]);
const blogReviews = ref([]); // 블로그 리뷰 데이터

const isPopupVisible = ref(false);
const selectedExercise = ref(null);

// 이전 페이지에서 전달된 itemName 값 사용
const itemName = route.query.itemName || "";

const infoHeight = ref(300); // 기본 높이 설정
const MIN_HEIGHT = 250; // 최소 높이 설정
let isDragging = false;

// 날짜 포맷 함수 (연도-월-일 형식으로 변환)
const formatDate = (dateString) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return `${year}-${month}-${day}`;
};

// 텍스트에서 HTML 태그 제거 함수
const sanitizeText = (text) => {
  return text.replace(/<\/?[^>]+(>|$)/g, ""); // HTML 태그 제거
};

const navigateToFacility = () => {
  const location = selectedLocation.value;

  if (!location || !location.fcltyYCrdntValue || !location.fcltyXCrdntValue) {
    alert("위치 정보가 올바르지 않습니다.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const currentLat = position.coords.latitude;
      const currentLng = position.coords.longitude;

      // 카카오맵 길찾기 URL 생성
      const kakaoUrl = `https://map.kakao.com/link/from/현재위치,${currentLat},${currentLng}/to/${location.fcltyNm},${location.fcltyYCrdntValue},${location.fcltyXCrdntValue}`;
      window.open(kakaoUrl, "_blank");
    },
    (error) => {
      console.error("현재 위치를 가져오는 데 실패했습니다.", error);
      alert("현재 위치를 가져올 수 없습니다. 위치 설정을 확인해주세요.");
    }
  );
};


// 블로그 리뷰 데이터 가져오기
const fetchBlogReviews = async (facilityName, facilityAddress) => {
  try {
    const query = `${facilityAddress} ${facilityName}`; // 주소와 시설명을 결합
    const response = await apiClient.get("/facilities/reviews/blog", {
      params: { query, display: 3 },
    });
    blogReviews.value = response.data || []; // 데이터가 없으면 빈 배열
    console.log("블로그 리뷰 데이터:", blogReviews.value);
  } catch (error) {
    console.error("블로그 리뷰를 가져오는 데 실패했습니다:", error);
    alert("블로그 리뷰 데이터를 불러오는 데 문제가 발생했습니다.");
    blogReviews.value = [];
  }
};

// 리뷰 클릭 시 해당 블로그 링크 열기
const openBlogLink = (link) => {
  window.open(link, "_blank");
};

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
    center: new kakao.maps.LatLng(centerLat, centerLng),
    level: 5,
  };
  map.value = new kakao.maps.Map(container, options);

  // 사용자 위치 마커
  const currentPosition = new kakao.maps.LatLng(centerLat, centerLng);
  const imageSrc =
    "https://img.icons8.com/emoji/48/000000/blue-circle-emoji.png";
  const imageSize = new kakao.maps.Size(24, 24);
  const imageOption = { offset: new kakao.maps.Point(12, 12) };

  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  const currentMarker = new kakao.maps.Marker({
    position: currentPosition,
    image: markerImage,
  });
  currentMarker.setMap(map.value);

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
      fcltyYCrdntValue: facility.fcltyYCrdntValue,
      fcltyXCrdntValue: facility.fcltyXCrdntValue,
    };

    fetchBlogReviews(facility.fcltyAddr, facility.fcltyNm); // 리뷰 데이터 가져오기
  });

  });
};

// 시설 데이터 가져오기
const fetchFacilities = async (lat, lng) => {
  try {
    const response = await apiClient.get("facilities/filter", {
      params: { itemName: route.query.itemName || "", latitude: lat, longitude: lng },
    });
    facilities.value = response.data;
    initializeMap(facilities.value, lat, lng);
  } catch (error) {
    console.error("시설 데이터를 가져오는 데 실패했습니다:", error);
    alert("시설 데이터를 불러오는 데 문제가 발생했습니다.");
  }
};


onMounted(() => {
  const loadKakaoMap = () => {
    if (window.kakao && kakao.maps) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          fetchFacilities(lat, lng);
        },
        (error) => {
          console.error("위치 정보를 가져오지 못했습니다:", error);
        }
      );
    } else {
      console.error("Kakao Maps 스크립트가 아직 로드되지 않았습니다.");
    }
  };

  if (typeof kakao === "undefined") {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY`;
    script.onload = () => {
      loadKakaoMap();
    };
    script.onerror = () => {
      console.error("Kakao Maps 스크립트 로드 실패");
    };
    document.head.appendChild(script);
  } else {
    loadKakaoMap();
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

.blog-reviews {
}

.review-list {
  list-style: none;
  padding: 0;
}

.review-item {
  display: flex;
  margin-bottom: 15px;
}

.review-thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.review-content {
  flex: 1;
}

.review-title {
  font-size: 16px;
  margin: 0 0 5px;
}

.review-description {
  font-size: 14px;
  color: #555;
}

.review-blogger {
  font-size: 12px;
  color: #777;
}
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
  display: flex; /* 유연한 레이아웃 */
  flex-direction: column; /* 세로 방향 정렬 */
  position: absolute;
  background-color: #ffffff;
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* max-width: 100%; */
  box-sizing: border-box;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px 10px 0 0;
  z-index: 1000;
  height: auto; /* 동적 높이 */
  overflow: hidden; 
  max-height: 80vh; /* 최대 높이를 화면의 80%로 제한 */

}

.facility-info {
  margin-top: 10px;
  position: relative;
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
  top: 0px;
  right: 0px;
}

.lecture-info {
  border-top: 1px solid #ddd;
  padding-top: 15px;
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

.blog-info {
  border-top: 1px solid #ddd;
  padding-top: 20px;
  margin-top: 20px;
  position: relative;
}

.blog-review {
  font-size: 18px;
  color: #333;
  margin: 0 0 10px;
  padding-bottom: 10px;
  font-weight: bold;
  padding-top: 5px;
}

/* 스크롤 가능하도록 콘텐츠 컨테이너 스타일 추가 */
.content-container {
  overflow-y: auto;
  flex-grow: 1;
  padding: 10px;
}

/* 스크롤바 스타일 */
.content-container::-webkit-scrollbar {
  width: 0px;
}

</style>
